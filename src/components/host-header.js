import { getUiIcon } from '../utils/constants.js';
import { hostStore } from '../state.js';
import { getAllCourses, createCourse, ensureDefaultCourse } from '../services/course-service.js';
import router from '../router.js';

export async function renderHostHeader(containerId = null) {
  // Ensure default course exists if this is the first load
  await ensureDefaultCourse();

  const courses = await getAllCourses();
  let activeCourseId = hostStore.state.activeCourseId;
  
  if (!activeCourseId || !courses.find(c => c.id === activeCourseId)) {
    activeCourseId = courses[0]?.id;
    hostStore.update({ activeCourseId });
  }

  const courseOptions = courses.map(c => `
    <option value="${c.id}" ${c.id === activeCourseId ? 'selected' : ''}>
      ${c.name}
    </option>
  `).join('');

  const html = `
    <header class="host-header">
      <div class="host-header__brand" style="cursor:pointer;" id="hh-brand">
        ${getUiIcon('code', 28)}
        <span class="text-gradient">PollRequest</span>
      </div>
      
      <div class="host-header__center" style="display: flex; gap: 0.5rem; align-items: center;">
        <select id="hh-course-select" class="input" style="width: 200px; padding: 0.5rem; background: var(--bg-elevated); border: 1px solid var(--border-color); color: var(--text-primary); border-radius: var(--radius-md);">
          ${courses.length === 0 ? '<option value="" disabled selected>No courses found</option>' : ''}
          ${courseOptions}
        </select>
        <button class="btn btn--icon btn--ghost" id="hh-new-course" title="Add Course" style="padding: 0.5rem;">
          ${getUiIcon('plus', 20)}
        </button>
        <button class="btn btn--icon btn--ghost" id="hh-manage-courses" title="Manage Course" style="padding: 0.5rem;">
          ${getUiIcon('settings', 20)}
        </button>
      </div>

      <div class="host-header__actions">
        <button class="btn btn--secondary" id="hh-logout">
          ${getUiIcon('logOut', 20)}
          Logout
        </button>
      </div>
    </header>
  `;

  if (containerId) {
    const el = document.getElementById(containerId);
    if (el) el.innerHTML = html;
  }

  return html;
}

// ── Global Event Delegation ──────────────────────────────
// This ensures the events work regardless of when the HTML is inserted into the DOM.
import { showModal } from './modal.js';

document.addEventListener('click', async (e) => {
  if (e.target) {
    if (e.target.id === 'hh-brand' || e.target.closest('#hh-brand')) {
      router.navigate('/host/dashboard');
    }
    if (e.target.id === 'hh-logout' || e.target.closest('#hh-logout')) {
      sessionStorage.removeItem('pollrequest_host');
      router.navigate('/host/login');
    }
    if (e.target.id === 'hh-new-course' || e.target.closest('#hh-new-course')) {
      showModal({
        title: 'Create New Course',
        content: `
          <div style="margin-bottom: 1rem;">
            <label class="label">Course Name</label>
            <input type="text" id="new-course-name" class="input" placeholder="e.g. CSCD 210" autocomplete="off" />
          </div>
        `,
        confirmText: 'Create',
        onConfirm: async () => {
          const input = document.getElementById('new-course-name');
          const name = input ? input.value.trim() : '';
          if (name) {
            try {
              const newId = await createCourse({ name });
              hostStore.update({ activeCourseId: newId });
              window.location.reload();
            } catch (err) {
              alert("Failed to create course. Check your Firestore permissions.");
            }
          }
        }
      });
      setTimeout(() => document.getElementById('new-course-name')?.focus(), 100);
    }
    if (e.target.id === 'hh-manage-courses' || e.target.closest('#hh-manage-courses')) {
      if (!hostStore.state.activeCourseId) {
        showModal({ title: 'Error', content: 'No active course to manage.', showCancel: false });
        return;
      }
      const courses = await getAllCourses();
      const activeC = courses.find(c => c.id === hostStore.state.activeCourseId);
      if (activeC) {
        showModal({
          title: `Manage Course`,
          content: `
            <div style="margin-bottom: 1rem;">
              <label class="label">Rename Course</label>
              <div style="display:flex; gap:0.5rem;">
                <input type="text" id="rename-course-input" class="input" value="${activeC.name}" autocomplete="off" />
                <button class="btn btn--primary" id="btn-rename-course">Save</button>
              </div>
            </div>
            <hr style="border-color: var(--border-color); margin: 1.5rem 0;" />
            <div style="margin-bottom: 1rem;">
              <label class="label" style="color: var(--error);">Danger Zone</label>
              <p style="font-size: 0.875rem; color: var(--text-secondary); margin-bottom: 0.5rem;">
                Deleting a course will not delete the questions, but they will be orphaned.
              </p>
              <button class="btn btn--danger" id="btn-delete-course">Delete Course</button>
            </div>
          `,
          showCancel: false,
          confirmText: 'Done',
          onConfirm: () => {}
        });
        
        setTimeout(() => {
          document.getElementById('btn-rename-course')?.addEventListener('click', async () => {
             const newName = document.getElementById('rename-course-input')?.value.trim();
             if (newName && newName !== activeC.name) {
                try {
                   const { updateCourse } = await import('../services/course-service.js');
                   await updateCourse(activeC.id, { name: newName });
                   window.location.reload();
                } catch(e) {
                   alert("Failed to rename course.");
                }
             }
          });
          document.getElementById('btn-delete-course')?.addEventListener('click', () => {
             // Close current modal to open a new confirmation one
             const closeBtn = document.querySelector('.modal-overlay--visible #modal-confirm-btn');
             if (closeBtn) closeBtn.click();

             setTimeout(() => {
               showModal({
                 title: 'Delete Course?',
                 content: `Are you SURE you want to delete "${activeC.name}"?`,
                 danger: true,
                 confirmText: 'Yes, Delete',
                 onConfirm: async () => {
                    try {
                       const { deleteCourse } = await import('../services/course-service.js');
                       await deleteCourse(activeC.id);
                       hostStore.update({ activeCourseId: null });
                       window.location.reload();
                    } catch(e) {
                       alert("Failed to delete course.");
                    }
                 }
               });
             }, 300);
          });
        }, 100);
      }
    }
  }
});

document.addEventListener('change', async (e) => {
  if (e.target && e.target.id === 'hh-course-select') {
    const val = e.target.value;
    if (val) {
      hostStore.update({ activeCourseId: val });
      window.location.reload(); 
    }
  }
});
