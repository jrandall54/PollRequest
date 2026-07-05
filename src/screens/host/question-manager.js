// ============================================================
// PollRequest — Question Manager Screen
// CRUD interface for managing the question bank
// ============================================================

import router from '../../router.js';
import { getUiIcon } from '../../utils/constants.js';
import { getAllQuestions, createQuestion, updateQuestion, deleteQuestion, deleteAllQuestions, deleteBank, getBanks } from '../../services/question-service.js';
import { getCourseById, updateCourse } from '../../services/course-service.js';
import { importFromFile } from '../../services/import-service.js';
import { showModal } from '../../components/modal.js';
import { showToast } from '../../utils/helpers.js';
import { DIFFICULTIES, DEFAULT_TIME_LIMIT } from '../../utils/constants.js';
import { renderHostHeader } from '../../components/host-header.js';
import { hostStore } from '../../state.js';

export async function renderQuestionManager() {
  const app = document.getElementById('app');
  let questions = [];
  let courseTypes = ['Predict Output', 'Select All That Apply', 'True / False', 'Conceptual'];
  let sortCol = 'createdAt';
  let sortAsc = false;
  let collapsedBanks = new Set();
  let headerHtml = '';

  try {
    headerHtml = await renderHostHeader();
    const courseId = hostStore.state.activeCourseId;
    questions = await getAllQuestions(courseId);
    if (courseId !== 'default' && courseId) {
      const course = await getCourseById(courseId);
      if (course && course.questionTypes) {
        courseTypes = course.questionTypes;
      } else if (course) {
        // Initialize if not present
        await updateCourse(courseId, { questionTypes: courseTypes });
      }
    }
  } catch (e) {
    console.warn('Could not load questions:', e);
  }

  renderPage();

  function sortQuestions() {
    questions.sort((a, b) => {
      let valA = a[sortCol];
      let valB = b[sortCol];
      
      if (sortCol === 'choices') {
        valA = a.choices?.length || 0;
        valB = b.choices?.length || 0;
      }
      if (sortCol === 'text' || sortCol === 'type') {
        valA = (valA || '').toLowerCase();
        valB = (valB || '').toLowerCase();
      }
      
      if (valA < valB) return sortAsc ? -1 : 1;
      if (valA > valB) return sortAsc ? 1 : -1;
      return 0;
    });
  }

  function renderPage() {
    sortQuestions();

    const banksMap = {};
    questions.forEach(q => {
      const b = q.bank || q.category || 'Custom Questions';
      if (!banksMap[b]) banksMap[b] = [];
      banksMap[b].push(q);
    });
    const banks = Object.keys(banksMap).sort();

    app.innerHTML = `
      <div class="host-layout screen">
        ${headerHtml}

        <div class="screen-subheader" style="padding: 1rem 2rem; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-color); background: var(--bg-secondary);">
          <button class="btn btn--ghost btn--sm" id="btn-back">
            ${getUiIcon('arrowLeft', 18)} Dashboard
          </button>
          <h3 style="margin: 0;">Question Manager</h3>
          <div style="display:flex;gap:0.5rem;">
            <button class="btn btn--danger btn--sm" id="btn-clear-bank">
              ${getUiIcon('trash', 16)} Clear Bank
            </button>
            <button class="btn btn--secondary btn--sm" id="btn-manage-types">
              ${getUiIcon('settings', 16)} Manage Types
            </button>
            <button class="btn btn--secondary btn--sm" id="btn-import">
              ${getUiIcon('upload', 16)} Import
            </button>
            <button class="btn btn--primary btn--sm" id="btn-add">
              ${getUiIcon('plus', 16)} Add Question
            </button>
          </div>
        </div>

        <main class="host-content">
          <div class="question-manager container">
            ${questions.length === 0 ? `
              <div class="empty-state" style="padding:4rem 1rem;">
                <div class="empty-state__icon">${getUiIcon('fileText', 64)}</div>
                <div class="empty-state__title">No questions yet</div>
                <div class="empty-state__text">Add questions manually or import from a Markdown / JSON file.</div>
              </div>
            ` : `
              <div class="question-manager__toolbar" style="display:flex; justify-content:space-between; align-items:center;">
                <span class="text-muted text-sm">${questions.length} question${questions.length !== 1 ? 's' : ''} across ${banks.length} sub-bank${banks.length !== 1 ? 's' : ''}</span>
                <button class="btn btn--secondary btn--sm" id="btn-move-bulk" disabled>
                  ${getUiIcon('folder', 14)} Move Selected (<span id="bulk-count">0</span>)
                </button>
              </div>

              ${banks.map((bank, bankIndex) => {
                const isCollapsed = collapsedBanks.has(bank);
                const bankId = `bank-${bankIndex}`;
                
                // Group by type
                const typesMap = {};
                banksMap[bank].forEach(q => {
                  const t = q.type || 'Uncategorized';
                  if (!typesMap[t]) typesMap[t] = [];
                  typesMap[t].push(q);
                });
                const sortedTypes = Object.keys(typesMap).sort();

                return `
                <div class="card" style="margin-top: 2rem; padding: 0; overflow: hidden; border: 1px solid var(--border-color);">
                  <div class="bank-header" data-bank="${escapeHtml(bank)}" data-target="${bankId}" style="padding: 1rem 1.5rem; background: var(--bg-tertiary); display: flex; justify-content: space-between; align-items: center; border-bottom: ${isCollapsed ? 'none' : '1px solid var(--border-color)'}; cursor: pointer; user-select: none;">
                    <div style="display:flex; align-items:center; gap:1rem;">
                      <span class="bank-chevron" style="display:inline-flex; align-items:center; justify-content:center; width:24px; height:24px; transition:transform 0.2s; transform:${isCollapsed ? 'rotate(-90deg)' : 'rotate(0)'}; color:var(--text-secondary);">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                      </span>
                      <input type="checkbox" class="bank-select-all custom-checkbox" data-bank="${escapeHtml(bank)}" title="Select all in ${escapeHtml(bank)}" onclick="event.stopPropagation()" />
                      <h3 style="margin:0;font-size:1.15rem;font-weight:600;">${escapeHtml(bank)}</h3>
                      <span class="badge badge--neutral">${banksMap[bank].length}</span>
                    </div>
                    <button class="btn btn--ghost btn--icon btn-delete-bank" data-bank="${escapeHtml(bank)}" title="Delete Sub-Bank" style="color:var(--error);" onclick="event.stopPropagation()">
                      ${getUiIcon('trash', 16)}
                    </button>
                  </div>
                  <div class="table-wrap" id="${bankId}" style="display: ${isCollapsed ? 'none' : 'block'}; padding: 0.5rem 1rem 1rem 1rem;">
                    <table class="table" style="margin:0;">
                      <thead>
                        <tr>
                          <th style="width: 48px; padding-left: 0.5rem;"></th>
                          <th class="sortable" data-sort="text" style="width:50%;cursor:pointer;">Question ${sortCol === 'text' ? (sortAsc ? '↑' : '↓') : ''}</th>
                          <th class="sortable" data-sort="difficulty" style="cursor:pointer;">Difficulty ${sortCol === 'difficulty' ? (sortAsc ? '↑' : '↓') : ''}</th>
                          <th class="sortable" data-sort="timeLimit" style="cursor:pointer;">Time ${sortCol === 'timeLimit' ? (sortAsc ? '↑' : '↓') : ''}</th>
                          <th style="width:80px; text-align:right; padding-right:1rem;">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        ${sortedTypes.map(type => `
                          <tr>
                            <td colspan="5" style="background: var(--bg-tertiary); padding: 0.5rem 1rem; border-top: 1px solid var(--border-color); border-bottom: 1px solid var(--border-color);">
                              <strong style="color: var(--text-secondary); font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.5px;">${escapeHtml(type)}</strong>
                            </td>
                          </tr>
                          ${typesMap[type].map(q => `
                            <tr data-id="${q.id}">
                              <td style="padding-left: 0.5rem;">
                                <input type="checkbox" class="q-select-cb custom-checkbox" data-id="${q.id}" data-bank="${escapeHtml(bank)}" />
                              </td>
                              <td>
                                ${q.title ? `<div style="font-weight:700;font-size:1rem;color:var(--text-primary);margin-bottom:0.25rem;">${escapeHtml(q.title)}</div>` : ''}
                                <div style="font-weight:${q.title ? '400' : '500'};font-size:0.95rem;color:var(--text-primary);">${escapeHtml(q.text.length > 70 ? q.text.substring(0, 70) + '...' : q.text)}</div>
                                <div style="display:flex;gap:0.35rem;margin-top:0.5rem;flex-wrap:wrap;">
                                  ${(q.tags || []).map(t => `<span class="badge badge--neutral" style="font-size:0.7rem;">${escapeHtml(t)}</span>`).join('')}
                                  ${q.codeSnippet ? '<span class="badge badge--neutral" style="font-size:0.7rem;">&lt;/&gt; Code</span>' : ''}
                                </div>
                              </td>
                              <td><span class="badge ${q.difficulty === 'easy' ? 'badge--success' : q.difficulty === 'hard' ? 'badge--error' : 'badge--warning'}">${q.difficulty || 'medium'}</span></td>
                              <td>${q.timeLimit || 30}s</td>
                              <td style="text-align:right; padding-right:1rem;">
                                <div style="display:flex;gap:0.25rem;justify-content:flex-end;">
                                  <button class="btn btn--ghost btn--icon btn-edit" data-id="${q.id}" title="Edit">
                                    ${getUiIcon('edit', 16)}
                                  </button>
                                  <button class="btn btn--ghost btn--icon btn-delete" data-id="${q.id}" title="Delete" style="color:var(--error);">
                                    ${getUiIcon('trash', 16)}
                                  </button>
                                </div>
                              </td>
                            </tr>
                          `).join('')}
                        `).join('')}
                      </tbody>
                    </table>
                  </div>
                </div>
              `;
              }).join('')}
            `}
          </div>
        </main>
      </div>
    `;

    // Event listeners
    document.getElementById('btn-back')?.addEventListener('click', () => router.navigate('/host/dashboard'));
    document.getElementById('btn-add')?.addEventListener('click', () => showQuestionForm());
    document.getElementById('btn-manage-types')?.addEventListener('click', () => showManageTypesModal());
    document.getElementById('btn-import')?.addEventListener('click', () => handleImport());
    document.getElementById('btn-clear-bank')?.addEventListener('click', () => handleClearBank());

    // Bulk Move Logic
    const qCheckboxes = document.querySelectorAll('.q-select-cb');
    const bankCheckboxes = document.querySelectorAll('.bank-select-all');
    const bulkBtn = document.getElementById('btn-move-bulk');
    const bulkCount = document.getElementById('bulk-count');
    
    function updateBulkBtn() {
      const selected = document.querySelectorAll('.q-select-cb:checked').length;
      bulkCount.textContent = selected;
      bulkBtn.disabled = selected === 0;
    }

    qCheckboxes.forEach(cb => {
      cb.addEventListener('change', () => {
        const bank = cb.dataset.bank;
        const bankCb = document.querySelector(`.bank-select-all[data-bank="${escapeHtml(bank)}"]`);
        const allInBank = document.querySelectorAll(`.q-select-cb[data-bank="${escapeHtml(bank)}"]`);
        const allChecked = Array.from(allInBank).every(c => c.checked);
        bankCb.checked = allChecked;
        updateBulkBtn();
      });
    });

    bankCheckboxes.forEach(cb => {
      cb.addEventListener('change', () => {
        const bank = cb.dataset.bank;
        const allInBank = document.querySelectorAll(`.q-select-cb[data-bank="${escapeHtml(bank)}"]`);
        allInBank.forEach(qcb => qcb.checked = cb.checked);
        updateBulkBtn();
      });
    });

    bulkBtn?.addEventListener('click', async () => {
      const selectedIds = Array.from(document.querySelectorAll('.q-select-cb:checked')).map(cb => cb.dataset.id);
      if (selectedIds.length === 0) return;
      
      const banks = await getBanks(hostStore.state.activeCourseId);
      
      showModal({
        title: 'Move Questions to Sub-Bank',
        content: `
          <div class="input-group">
            <label>Select an existing Sub-Bank</label>
            <select class="select" id="bulk-move-existing">
              <option value="">-- Choose existing --</option>
              ${banks.map(b => `<option value="${escapeHtml(b)}">${escapeHtml(b)}</option>`).join('')}
            </select>
          </div>
          <div style="text-align:center;margin:0.5rem 0;">OR</div>
          <div class="input-group">
            <label>Create a new Sub-Bank</label>
            <input class="input" id="bulk-move-new" placeholder="e.g., Week 2 Quiz" />
          </div>
        `,
        confirmText: 'Move Questions',
        onConfirm: async () => {
          const existing = document.getElementById('bulk-move-existing').value;
          const newBank = document.getElementById('bulk-move-new').value.trim();
          const targetBank = newBank || existing;
          
          if (!targetBank) {
            showToast('Please select or type a Sub-Bank name', 'error');
            return false;
          }
          
          app.innerHTML = '<div class="flex-center screen"><div class="spinner"></div></div>';
          for (const qid of selectedIds) {
            await updateQuestion(qid, { bank: targetBank });
          }
          showToast(`Moved ${selectedIds.length} questions to ${targetBank}`, 'success');
          
          questions = await getAllQuestions(hostStore.state.activeCourseId);
          renderPage();
        }
      });
    });

    document.querySelectorAll('.btn-delete-bank').forEach(btn => {
      btn.addEventListener('click', () => {
        const bank = btn.dataset.bank;
        showModal({
          title: 'Delete Sub-Bank',
          content: `<p>Are you sure you want to delete the Sub-Bank <strong>${escapeHtml(bank)}</strong>?</p><p class="text-muted" style="margin-top:0.5rem;">This will permanently delete all questions within this bank.</p>`,
          danger: true,
          confirmText: 'Delete Everything',
          onConfirm: async () => {
            await deleteBank(hostStore.state.activeCourseId, bank);
            showToast(`Deleted Sub-Bank ${bank}`, 'success');
            questions = await getAllQuestions(hostStore.state.activeCourseId);
            renderPage();
          }
        });
      });
    });

    document.querySelectorAll('.bank-header').forEach(header => {
      header.addEventListener('click', () => {
        const bank = header.dataset.bank;
        const targetId = header.dataset.target;
        const wrap = document.getElementById(targetId);
        const chevron = header.querySelector('.bank-chevron');
        
        if (collapsedBanks.has(bank)) {
          collapsedBanks.delete(bank);
          wrap.style.display = 'block';
          header.style.borderBottom = '1px solid var(--border-color)';
          if (chevron) chevron.style.transform = 'rotate(0)';
        } else {
          collapsedBanks.add(bank);
          wrap.style.display = 'none';
          header.style.borderBottom = 'none';
          if (chevron) chevron.style.transform = 'rotate(-90deg)';
        }
      });
    });

    document.querySelectorAll('.sortable').forEach(th => {
      th.addEventListener('click', () => {
        const col = th.dataset.sort;
        if (sortCol === col) {
          sortAsc = !sortAsc;
        } else {
          sortCol = col;
          sortAsc = true;
        }
        renderPage();
      });
    });

    document.querySelectorAll('.btn-edit').forEach(btn => {
      btn.addEventListener('click', () => {
        const q = questions.find(q => q.id === btn.dataset.id);
        if (q) showQuestionForm(q);
      });
    });

    document.querySelectorAll('.btn-delete').forEach(btn => {
      btn.addEventListener('click', () => handleDelete(btn.dataset.id));
    });
  }

  function showQuestionForm(existing = null) {
    const isEdit = !!existing;
    const hasMain = !!existing?.codeSnippetMain;

    const formContent = document.createElement('div');
    formContent.innerHTML = `
      <datalist id="question-types-list">
        ${courseTypes.map(t => `<option value="${escapeHtml(t)}"></option>`).join('')}
      </datalist>
      <div style="display:flex;flex-direction:column;gap:1rem;">
        <div class="input-group">
          <label>Question Title (optional)</label>
          <input class="input" id="qf-title" placeholder="e.g., Loop Basics" value="${existing?.title || ''}" />
        </div>
        <div class="input-group">
          <label>Question Text</label>
          <textarea class="textarea" id="qf-text" rows="2" placeholder="What will this code output?">${existing?.text || ''}</textarea>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;">
          <div class="input-group">
            <label>Sub-Bank</label>
            <input class="input" id="qf-bank" placeholder="e.g., Custom Questions" value="${existing?.bank || existing?.category || 'Custom Questions'}" />
          </div>
          <div class="input-group">
            <label>Question Type</label>
            <input class="input" id="qf-type" list="question-types-list" placeholder="e.g., Predict Output" value="${existing?.type || 'Predict Output'}" />
          </div>
        </div>
        <div style="display:grid;grid-template-columns:2fr 1fr;gap:1rem;">
          <div class="input-group">
            <label>Tags (comma-separated)</label>
            <input class="input" id="qf-tags" placeholder="e.g., loops, arrays" value="${(existing?.tags || []).join(', ')}" />
          </div>
          <div class="input-group">
            <label>Difficulty</label>
            <select class="select" id="qf-difficulty">
              ${DIFFICULTIES.map(d => `<option value="${d}" ${existing?.difficulty === d ? 'selected' : ''}>${d}</option>`).join('')}
            </select>
          </div>
        </div>

        <div style="display:flex;align-items:center;gap:0.5rem;margin-top:0.5rem;">
          <input type="checkbox" id="qf-split-code" ${hasMain ? 'checked' : ''} style="width:1rem;height:1rem;" />
          <label for="qf-split-code" style="font-weight:600;">Split into Class & Main snippets</label>
        </div>

        <div id="qf-code-section" class="${hasMain ? 'dual-snippets' : ''}" style="margin: 0;">
          <div class="input-group" id="qf-code-class-container" style="margin: 0; width: 100%;">
            <label id="lbl-qf-code">${hasMain ? 'Class Definition (optional)' : 'Code Snippet (optional)'}</label>
            <div class="live-editor-container">
              <textarea class="live-editor-textarea" id="qf-code" spellcheck="false" placeholder="e.g., class MyClass { ... }">${existing?.codeSnippet || ''}</textarea>
              <pre class="live-editor-pre" aria-hidden="true"><code class="language-java" id="qf-code-highlight"></code></pre>
            </div>
          </div>
          
          <div class="input-group" id="qf-code-main-container" style="margin: 0; width: 100%; display: ${hasMain ? 'flex' : 'none'};">
            <label>Main Method (optional)</label>
            <div class="live-editor-container">
              <textarea class="live-editor-textarea" id="qf-code-main" spellcheck="false" placeholder="e.g., public static void main(String[] args) { ... }">${existing?.codeSnippetMain || 'public static void main(String[] args) {\n    \n}'}</textarea>
              <pre class="live-editor-pre" aria-hidden="true"><code class="language-java" id="qf-code-main-highlight"></code></pre>
            </div>
          </div>
        </div>

        <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-top:0.5rem;">
          <div class="input-group">
            <label>Code Language</label>
            <input class="input" id="qf-lang" placeholder="java" value="${existing?.codeLanguage || 'java'}" />
          </div>
          <div class="input-group">
            <label>Time Limit (seconds)</label>
            <input class="input" id="qf-time" type="number" min="5" max="120" value="${existing?.timeLimit || DEFAULT_TIME_LIMIT}" />
          </div>
        </div>
        <div class="input-group">
          <label>Choices (check the correct answer${existing?.multiSelect ? 's' : ''})</label>
          <div id="qf-choices" style="display:flex;flex-direction:column;gap:0.5rem;">
            ${(existing?.choices || [{ text: '', isCorrect: false }, { text: '', isCorrect: false }, { text: '', isCorrect: false }, { text: '', isCorrect: false }])
              .map((c, i) => choiceRow(i, c.text, c.isCorrect)).join('')}
          </div>
          <button class="btn btn--ghost btn--sm" id="qf-add-choice" type="button" style="margin-top:0.5rem;">
            ${getUiIcon('plus', 14)} Add Choice
          </button>
        </div>
        <div class="input-group">
          <label>Explanation (optional)</label>
          <textarea class="textarea" id="qf-explanation" rows="2" placeholder="The answer is B because...">${existing?.explanation || ''}</textarea>
        </div>
      </div>
    `;

    const modal = showModal({
      title: isEdit ? 'Edit Question' : 'New Question',
      content: formContent,
      confirmText: isEdit ? 'Save Changes' : 'Create Question',
      size: 'large',
      onConfirm: async () => {
        const data = getFormData();
        if (!data) return false;
        
        try {
          if (isEdit) {
            await updateQuestion(existing.id, data);
            showToast('Question updated', 'success');
          } else {
            await createQuestion(data, hostStore.state.activeCourseId);
            showToast('Question created', 'success');
          }
          questions = await getAllQuestions(hostStore.state.activeCourseId);
          renderPage();
          return true;
        } catch (e) {
          showToast('Error: ' + e.message, 'error');
          return false;
        }
      },
    });

    // Add choice button
    modal.element.querySelector('#qf-add-choice').addEventListener('click', () => {
      const container = modal.element.querySelector('#qf-choices');
      const count = container.children.length;
      if (count >= 6) {
        showToast('Maximum 6 choices', 'warning');
        return;
      }
      container.insertAdjacentHTML('beforeend', choiceRow(count, '', false));
    });

    // Toggle split code snippets
    const splitToggle = modal.element.querySelector('#qf-split-code');
    const codeSection = modal.element.querySelector('#qf-code-section');
    const codeMainContainer = modal.element.querySelector('#qf-code-main-container');
    const lblCode = modal.element.querySelector('#lbl-qf-code');
    
    splitToggle.addEventListener('change', (e) => {
      if (e.target.checked) {
        codeSection.classList.add('dual-snippets');
        codeMainContainer.style.display = 'flex';
        lblCode.textContent = 'Class Definition (optional)';
      } else {
        codeSection.classList.remove('dual-snippets');
        codeMainContainer.style.display = 'none';
        lblCode.textContent = 'Code Snippet (optional)';
      }
    });

    // Sync live editors
    function setupLiveEditor(textareaId, highlightId) {
      const textarea = modal.element.querySelector('#' + textareaId);
      const highlight = modal.element.querySelector('#' + highlightId);
      const pre = highlight.parentElement;

      function sync() {
        let text = textarea.value;
        if (text[text.length - 1] === '\n') {
          text += ' ';
        }
        highlight.textContent = text;
        if (window.Prism) {
          window.Prism.highlightElement(highlight);
        }
      }

      textarea.addEventListener('input', sync);
      textarea.addEventListener('scroll', () => {
        pre.scrollTop = textarea.scrollTop;
        pre.scrollLeft = textarea.scrollLeft;
      });
      sync();
    }

    setupLiveEditor('qf-code', 'qf-code-highlight');
    setupLiveEditor('qf-code-main', 'qf-code-main-highlight');
  }

  function choiceRow(index, text, isCorrect) {
    return `
      <div style="display:flex;gap:0.5rem;align-items:center;">
        <input type="checkbox" class="qf-correct" ${isCorrect ? 'checked' : ''} style="width:1.25rem;height:1.25rem;accent-color:var(--success);" />
        <input class="input qf-choice-text" placeholder="Choice ${index + 1}" value="${escapeHtml(text)}" style="flex:1;" />
        ${index >= 2 ? `<button class="btn btn--ghost btn--icon qf-remove-choice" type="button">${getUiIcon('x', 14)}</button>` : ''}
      </div>
    `;
  }

  function getFormData() {
    const text = document.getElementById('qf-text')?.value.trim();
    if (!text) {
      showToast('Question text is required', 'warning');
      return null;
    }

    const choiceEls = document.querySelectorAll('.qf-choice-text');
    const correctEls = document.querySelectorAll('.qf-correct');
    const choices = [];
    choiceEls.forEach((el, i) => {
      const t = el.value.trim();
      if (t) {
        choices.push({ text: t, isCorrect: correctEls[i]?.checked || false });
      }
    });

    if (choices.length < 2) {
      showToast('At least 2 choices required', 'warning');
      return null;
    }
    if (!choices.some(c => c.isCorrect)) {
      showToast('At least one correct answer required', 'warning');
      return null;
    }

    const codeSnippet = document.getElementById('qf-code')?.value || null;
    const isSplit = document.getElementById('qf-split-code')?.checked;
    const codeSnippetMain = isSplit ? (document.getElementById('qf-code-main')?.value || null) : null;
    
    const multiSelect = choices.filter(c => c.isCorrect).length > 1;

    const tagsInput = document.getElementById('qf-tags')?.value.trim() || '';
    const tags = tagsInput ? tagsInput.split(',').map(t => t.trim()).filter(Boolean) : [];

    return {
      title: document.getElementById('qf-title')?.value.trim() || null,
      type: document.getElementById('qf-type')?.value.trim() || 'Predict Output',
      tags,
      text,
      codeSnippet,
      codeSnippetMain,
      codeLanguage: document.getElementById('qf-lang')?.value.trim() || null,
      choices,
      multiSelect,
      timeLimit: parseInt(document.getElementById('qf-time')?.value) || DEFAULT_TIME_LIMIT,
      explanation: document.getElementById('qf-explanation')?.value.trim() || null,
      bank: document.getElementById('qf-bank')?.value.trim() || 'Custom Questions',
      difficulty: document.getElementById('qf-difficulty')?.value || 'medium',
    };
  }

  function handleDelete(id) {
    showModal({
      title: 'Delete Question',
      content: '<p>Are you sure you want to delete this question? This cannot be undone.</p>',
      confirmText: 'Delete',
      danger: true,
      onConfirm: async () => {
        try {
          await deleteQuestion(id);
          questions = questions.filter(q => q.id !== id);
          showToast('Question deleted', 'success');
          renderPage();
          return true;
        } catch (e) {
          showToast('Error: ' + e.message, 'error');
          return false;
        }
      },
    });
  }

  function handleClearBank() {
    if (questions.length === 0) {
      showToast('Question bank is already empty', 'info');
      return;
    }
    showModal({
      title: 'Clear Question Bank',
      content: '<p>Are you sure you want to delete ALL questions in the bank? This action is permanent and cannot be undone.</p>',
      confirmText: 'Clear Bank',
      danger: true,
      onConfirm: async () => {
        try {
          await deleteAllQuestions(hostStore.state.activeCourseId);
          questions = [];
          showToast('Question bank cleared', 'success');
          renderPage();
          return true;
        } catch (e) {
          showToast('Error: ' + e.message, 'error');
          return false;
        }
      },
    });
  }

  function handleImport() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.md,.markdown,.json';
    input.addEventListener('change', async () => {
      const file = input.files[0];
      if (!file) return;

      if (questions.length > 0) {
        showModal({
          title: 'Import Questions',
          content: '<p>You already have questions in the bank. Do you want to clear the existing questions before importing, or append the new questions?</p>',
          confirmText: 'Clear & Import',
          cancelText: 'Append',
          danger: true,
          onConfirm: async () => {
            await doImport(file, true);
            return true;
          },
          onCancel: async () => {
            await doImport(file, false);
            return true;
          }
        });
      } else {
        await doImport(file, false);
      }
    });
    input.click();
  }

  async function doImport(file, clearFirst) {
    try {
      const activeCourseId = hostStore.state.activeCourseId;
      if (clearFirst) {
        await deleteAllQuestions(activeCourseId);
      }
      const result = await importFromFile(file, activeCourseId);
      showToast(`Imported ${result.imported} question${result.imported !== 1 ? 's' : ''}${result.skipped ? `, ${result.skipped} skipped` : ''}`, 'success');
      questions = await getAllQuestions(activeCourseId);
      renderPage();
    } catch (e) {
      showToast('Import error: ' + e.message, 'error');
    }
  }
  function showManageTypesModal() {
    let tempTypes = [...courseTypes];
    
    function renderTypesList() {
      return tempTypes.map((type, idx) => `
        <div style="display:flex; justify-content:space-between; align-items:center; padding: 0.5rem; border: 1px solid var(--border-color); border-radius: 4px; margin-bottom: 0.5rem;">
          <span>${escapeHtml(type)}</span>
          <button class="btn btn--ghost btn--icon btn-del-type" data-idx="${idx}" style="color:var(--error);" title="Remove Type">
            ${getUiIcon('trash', 14)}
          </button>
        </div>
      `).join('');
    }

    const content = document.createElement('div');
    content.innerHTML = `
      <div style="margin-bottom: 1rem;">
        <p class="text-muted" style="margin-bottom: 1rem;">Manage the types available in the Question Type dropdown. Questions currently using deleted types will retain their type until updated.</p>
        <div id="types-list" style="max-height: 200px; overflow-y: auto; margin-bottom: 1rem;">
          ${renderTypesList()}
        </div>
        <div style="display:flex; gap: 0.5rem;">
          <input type="text" id="new-type-input" class="input" placeholder="New type name..." style="flex:1;" />
          <button class="btn btn--secondary" id="btn-add-type">Add Type</button>
        </div>
      </div>
    `;

    showModal({
      title: 'Manage Question Types',
      content: content.innerHTML,
      confirmText: 'Save Changes',
      onOpen: (modalEl) => {
        const listEl = modalEl.querySelector('#types-list');
        const inputEl = modalEl.querySelector('#new-type-input');
        const addBtn = modalEl.querySelector('#btn-add-type');

        const attachTypeListeners = () => {
          modalEl.querySelectorAll('.btn-del-type').forEach(btn => {
            btn.addEventListener('click', (e) => {
              const idx = parseInt(e.currentTarget.dataset.idx, 10);
              tempTypes.splice(idx, 1);
              listEl.innerHTML = renderTypesList();
              attachTypeListeners();
            });
          });
        };
        attachTypeListeners();

        addBtn.addEventListener('click', () => {
          const val = inputEl.value.trim();
          if (val && !tempTypes.includes(val)) {
            tempTypes.push(val);
            tempTypes.sort();
            inputEl.value = '';
            listEl.innerHTML = renderTypesList();
            attachTypeListeners();
          }
        });
      },
      onConfirm: async () => {
        try {
          const courseId = hostStore.state.activeCourseId;
          if (courseId && courseId !== 'default') {
            await updateCourse(courseId, { questionTypes: tempTypes });
          }
          courseTypes = tempTypes;
          showToast('Question types updated', 'success');
          renderPage();
        } catch (e) {
          showToast('Failed to update types: ' + e.message, 'error');
        }
      }
    });
  }
}

function escapeHtml(text) {
  const el = document.createElement('span');
  el.textContent = text || '';
  return el.innerHTML;
}
