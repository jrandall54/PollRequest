// ============================================================
// PollRequest — Player Profile Setup Screen
// Name input + icon picker for first-time students
// ============================================================

import router from '../../router.js';
import { getIconSvg } from '../../utils/constants.js';
import { createIconPicker } from '../../components/icon-picker.js';
import { initAuth, saveProfile } from '../../services/student-service.js';
import { joinSession } from '../../services/session-service.js';
import { showToast } from '../../utils/helpers.js';

export async function renderProfileSetup(params) {
  const app = document.getElementById('app');
  const sessionId = params.id;

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

  // Join session
  joinBtn.addEventListener('click', async () => {
    const name = nameInput.value.trim();
    if (!name || !selectedIcon) return;

    joinBtn.disabled = true;
    joinBtn.innerHTML = '<div class="spinner spinner--sm"></div> Joining...';

    try {
      // Authenticate anonymously
      const uid = await initAuth();

      // Save profile
      await saveProfile(uid, { name, icon: selectedIcon });

      // Join the session
      await joinSession(sessionId, { uid, name, icon: selectedIcon });

      router.navigate(`/player/waiting/${sessionId}`);
    } catch (e) {
      showToast('Failed to join: ' + e.message, 'error');
      joinBtn.disabled = false;
      joinBtn.textContent = 'Join Session';
    }
  });

  nameInput.focus();
}
