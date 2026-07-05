// ============================================================
// PollRequest — Host Login Screen
// Simple admin password entry
// ============================================================

import router from '../../router.js';
import { db } from '../../firebase.js';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { hashPassword, showToast } from '../../utils/helpers.js';
import { getUiIcon } from '../../utils/constants.js';

const ADMIN_DOC = 'config/admin';

export async function renderHostLogin() {
  const app = document.getElementById('app');

  app.innerHTML = `
    <div class="join-screen screen">
      <button class="btn btn--ghost" id="btn-back" style="position:absolute;top:1rem;left:1rem;">
        ${getUiIcon('arrowLeft', 20)} Back
      </button>

      <div class="landing-logo" style="margin-bottom:2rem;">
        <h2>Teacher Login</h2>
        <p class="text-muted">Enter the admin password</p>
      </div>

      <div class="join-screen__form" id="login-form">
        <input
          type="password"
          class="input input--lg"
          id="admin-password"
          placeholder="Password"
          autocomplete="current-password"
          style="text-align:center;"
        />
        <button class="btn btn--primary btn--lg btn--full" id="btn-login">
          Enter
        </button>
        <div id="login-error" class="text-center" style="color:var(--error);font-size:0.875rem;min-height:1.25rem;"></div>
      </div>

      <div id="setup-section" style="display:none;width:100%;max-width:350px;">
        <div class="card" style="text-align:center;">
          <h3 style="margin-bottom:0.5rem;">First Time Setup</h3>
          <p class="text-muted text-sm" style="margin-bottom:1rem;">Create your admin password</p>
          <input
            type="password"
            class="input input--lg"
            id="new-password"
            placeholder="Create password"
            style="text-align:center;margin-bottom:0.75rem;"
          />
          <input
            type="password"
            class="input input--lg"
            id="confirm-password"
            placeholder="Confirm password"
            style="text-align:center;margin-bottom:1rem;"
          />
          <button class="btn btn--primary btn--full" id="btn-setup">Set Password</button>
        </div>
      </div>
    </div>
  `;

  const passwordInput = document.getElementById('admin-password');
  const errorEl = document.getElementById('login-error');
  const loginForm = document.getElementById('login-form');
  const setupSection = document.getElementById('setup-section');

  // Check if admin password is already set
  let adminHash = null;
  try {
    const adminDoc = await getDoc(doc(db, ADMIN_DOC));
    if (adminDoc.exists()) {
      adminHash = adminDoc.data().passwordHash;
    } else {
      // First time — show setup
      loginForm.style.display = 'none';
      setupSection.style.display = 'block';
    }
  } catch (err) {
    // Firebase not configured or offline — allow bypass for development
    console.warn('Could not check admin config:', err.message);
    showToast('Firebase not connected. Using dev mode.', 'warning');
    // Allow entry without password in dev mode
    setTimeout(() => {
      sessionStorage.setItem('pollrequest_host', 'true');
      router.navigate('/host/dashboard');
    }, 500);
    return;
  }

  // Back button
  document.getElementById('btn-back').addEventListener('click', () => {
    router.navigate('/');
  });

  document.getElementById('btn-login').addEventListener('click', async () => {
    const password = passwordInput.value;
    if (!password) {
      errorEl.textContent = 'Please enter a password';
      return;
    }

    try {
      const hash = await hashPassword(password);
      if (hash === adminHash) {
        sessionStorage.setItem('pollrequest_host', 'true');
        router.navigate('/host/dashboard');
      } else {
        errorEl.textContent = 'Incorrect password';
        passwordInput.value = '';
        passwordInput.focus();
      }
    } catch (e) {
      console.warn('Login hash failed (likely insecure context):', e);
      showToast('Insecure context detected. Bypassing login for dev mode.', 'warning');
      sessionStorage.setItem('pollrequest_host', 'true');
      router.navigate('/host/dashboard');
    }
  });

  // Enter key to login
  passwordInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      document.getElementById('btn-login').click();
    }
  });

  // First-time setup
  document.getElementById('btn-setup')?.addEventListener('click', async () => {
    const newPass = document.getElementById('new-password').value;
    const confirmPass = document.getElementById('confirm-password').value;

    if (!newPass || newPass.length < 4) {
      showToast('Password must be at least 4 characters', 'error');
      return;
    }
    if (newPass !== confirmPass) {
      showToast('Passwords do not match', 'error');
      return;
    }

    try {
      const hash = await hashPassword(newPass);
      await setDoc(doc(db, ADMIN_DOC), { passwordHash: hash });
      sessionStorage.setItem('pollrequest_host', 'true');
      showToast('Admin password created!', 'success');
      router.navigate('/host/dashboard');
    } catch (e) {
      console.warn('Setup hash failed (likely insecure context):', e);
      showToast('Insecure context detected. Bypassing setup for dev mode.', 'warning');
      sessionStorage.setItem('pollrequest_host', 'true');
      router.navigate('/host/dashboard');
    }
  });

  // Focus the input
  passwordInput?.focus();
}
