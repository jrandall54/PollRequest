// ============================================================
// PollRequest — Player Profile Setup Screen
// Name input + icon picker for first-time students
// ============================================================

import router from '../../router.js';
import { getIconSvg } from '../../utils/constants.js';
import { createIconPicker } from '../../components/icon-picker.js';
import { initAuth, reclaimProfile, forceNewIdentity } from '../../services/student-service.js';
import { joinSession, leaveSession } from '../../services/session-service.js';
import { showToast } from '../../utils/helpers.js';
import { userStore } from '../../state.js';

export async function renderProfileSetup(params) {
  const app = document.getElementById('app');
  const idRaw = params.id || '';
  const sessionId = idRaw.split('?')[0];
  const queryParams = idRaw.includes('?') ? new URLSearchParams(idRaw.split('?')[1]) : new URLSearchParams();

  if (!sessionId) {
    router.navigate('/player/join');
    return;
  }

  let selectedIcon = null;

  app.innerHTML = `
    <div class="profile-setup screen">
      <h2 class="profile-setup__title">Create Your Profile</h2>
      <p class="profile-setup__subtitle">Pick a name and an icon to represent you</p>

      <input
        type="text"
        class="profile-name-input"
        id="player-name"
        placeholder="Your name"
        maxlength="20"
        autocomplete="name"
      />

      <div class="profile-icon-label">Choose your icon</div>
      <div id="icon-picker-container"></div>

      <div id="preview-container" style="display:none;">
        <div class="profile-preview">
          <span class="profile-preview__icon" id="preview-icon"></span>
          <span id="preview-name">You</span>
        </div>
      </div>

      <button class="btn btn--primary btn--lg btn--full" id="btn-join" disabled style="margin-top:1rem;max-width:350px;">
        Join Session
      </button>
    </div>
  `;

  // Create icon picker
  const pickerContainer = document.getElementById('icon-picker-container');
  const iconPicker = createIconPicker(pickerContainer, {
    columns: 6,
    onSelect: (iconId) => {
      selectedIcon = iconId;
      updatePreview();
      updateJoinButton();
    },
  });

  const nameInput = document.getElementById('player-name');
  const joinBtn = document.getElementById('btn-join');
  const previewContainer = document.getElementById('preview-container');
  const previewIcon = document.getElementById('preview-icon');
  const previewName = document.getElementById('preview-name');

  nameInput.addEventListener('input', () => {
    updatePreview();
    updateJoinButton();
  });

  function updatePreview() {
    const name = nameInput.value.trim();
    if (name && selectedIcon) {
      previewContainer.style.display = 'block';
      previewIcon.innerHTML = getIconSvg(selectedIcon, 24);
      previewName.textContent = name;
    } else {
      previewContainer.style.display = 'none';
    }
  }

  function updateJoinButton() {
    const name = nameInput.value.trim();
    joinBtn.disabled = !name || !selectedIcon;
  }

  // Handle query errors
  if (queryParams.get('error') === 'name_taken') {
    showToast('Your name is already taken. Please pick another.', 'warning');
  }

  // Pre-fill if they are editing or have cached data
  import('../../state.js').then(({ userStore }) => {
    if (userStore.state.name && queryParams.get('error') !== 'name_taken') {
      nameInput.value = userStore.state.name;
    }
    if (userStore.state.icon) {
      // simulate click on icon
      const iconBtn = document.querySelector(`.icon-btn[data-id="${userStore.state.icon}"]`);
      if (iconBtn) iconBtn.click();
    }
    updatePreview();
    updateJoinButton();
  });

  // Join session
  joinBtn.addEventListener('click', async () => {
    const name = nameInput.value.trim();
    if (!name || !selectedIcon) return;

    joinBtn.disabled = true;
    joinBtn.innerHTML = '<div class="spinner spinner--sm"></div> Joining...';

    try {
      // Authenticate anonymously (get current browser session UID)
      const browserUid = await initAuth();
      let uid = browserUid;

      // Check if this exact name + icon pair already exists in the database
      // If so, we "reclaim" that profile (act as a low-security login)
      const reclaimed = await reclaimProfile(name, selectedIcon);
      if (reclaimed) {
        uid = reclaimed.uid;
      } else if (userStore.state.name && (userStore.state.name !== name || userStore.state.icon !== selectedIcon)) {
        // If we are replacing an existing logged in identity with a brand new one,
        // force a new UID so they don't inherit the previous identity's stats
        uid = await forceNewIdentity();
      }

      // The true joined UID is what was sitting in userStore, OR the browser UID if first time.
      const trueJoinedUid = userStore.state.uid || browserUid;

      // If the UID changed, we need to leave the session with the old UID so we don't leave a ghost in the lobby
      if (uid !== trueJoinedUid) {
        await leaveSession(sessionId, trueJoinedUid);
      }

      // Join the session FIRST to validate name uniqueness
      await joinSession(sessionId, { uid, name, icon: selectedIcon });

      router.navigate(`/player/waiting/${sessionId}`);
    } catch (e) {
      if (e.message === 'name_taken') {
        showToast('This name is already taken in the current session.', 'error');
      } else {
        showToast('Failed to join: ' + e.message, 'error');
      }
      joinBtn.disabled = false;
      joinBtn.textContent = 'Join Session';
    }
  });

  nameInput.focus();
}
