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
      
      <div class="host-header__center">
        <select id="hh-course-select" class="input" style="width: 200px; padding: 0.5rem; background: var(--bg-elevated); border: 1px solid var(--border-color); color: var(--text-primary); border-radius: var(--radius-md);">
          ${courseOptions}
          <option value="new_course">+ New Course...</option>
        </select>
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

  // Attach event listeners after a brief timeout to ensure DOM insertion if returning HTML
  setTimeout(() => {
    const brand = document.getElementById('hh-brand');
    const logout = document.getElementById('hh-logout');
    const courseSelect = document.getElementById('hh-course-select');

    if (brand) brand.addEventListener('click', () => router.navigate('/host/dashboard'));
    if (logout) logout.addEventListener('click', () => {
      sessionStorage.removeItem('pollrequest_host');
      router.navigate('/host/login');
    });

    if (courseSelect) {
      courseSelect.addEventListener('change', async (e) => {
        const val = e.target.value;
        if (val === 'new_course') {
          // Reset select back to active
          e.target.value = hostStore.state.activeCourseId;
          
          const name = prompt("Enter new course name:");
          if (name && name.trim()) {
            try {
              const newId = await createCourse({ name: name.trim() });
              hostStore.update({ activeCourseId: newId });
              // The active screen should handle reloading, or we can just reload the window
              window.location.reload();
            } catch (err) {
              alert("Failed to create course");
            }
          }
        } else {
          hostStore.update({ activeCourseId: val });
          // The active screen should subscribe to hostStore to reload, or we simply reload the page
          window.location.reload(); 
        }
      });
    }
  }, 0);

  return html;
}
