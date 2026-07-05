// ============================================================
// PollRequest — Question Manager Screen
// CRUD interface for managing the question bank
// ============================================================

import router from '../../router.js';
import { getUiIcon } from '../../utils/constants.js';
import { getAllQuestions, createQuestion, updateQuestion, deleteQuestion, deleteAllQuestions } from '../../services/question-service.js';
import { importFromFile } from '../../services/import-service.js';
import { showModal } from '../../components/modal.js';
import { showToast } from '../../utils/helpers.js';
import { DIFFICULTIES, DEFAULT_TIME_LIMIT } from '../../utils/constants.js';

export async function renderQuestionManager() {
  const app = document.getElementById('app');
  let questions = [];
  let sortCol = 'createdAt';
  let sortAsc = false;

  try {
    questions = await getAllQuestions();
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
      if (sortCol === 'text') {
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

    app.innerHTML = `
      <div class="host-layout screen">
        <header class="host-header">
          <button class="btn btn--ghost btn--sm" id="btn-back">
            ${getUiIcon('arrowLeft', 18)} Dashboard
          </button>
          <h3>Question Manager</h3>
          <div style="display:flex;gap:0.5rem;">
            <button class="btn btn--danger btn--sm" id="btn-clear-bank">
              ${getUiIcon('trash', 16)} Clear Bank
            </button>
            <button class="btn btn--secondary btn--sm" id="btn-import">
              ${getUiIcon('upload', 16)} Import
            </button>
            <button class="btn btn--primary btn--sm" id="btn-add">
              ${getUiIcon('plus', 16)} Add Question
            </button>
          </div>
        </header>

        <main class="host-content">
          <div class="question-manager container">
            ${questions.length === 0 ? `
              <div class="empty-state" style="padding:4rem 1rem;">
                <div class="empty-state__icon">${getUiIcon('fileText', 64)}</div>
                <div class="empty-state__title">No questions yet</div>
                <div class="empty-state__text">Add questions manually or import from a Markdown / JSON file.</div>
              </div>
            ` : `
              <div class="question-manager__toolbar">
                <span class="text-muted text-sm">${questions.length} question${questions.length !== 1 ? 's' : ''}</span>
              </div>
              <div class="table-wrap">
                <table class="table">
                  <thead>
                    <tr>
                      <th class="sortable" data-sort="text" style="width:50%;cursor:pointer;">Question ${sortCol === 'text' ? (sortAsc ? '↑' : '↓') : ''}</th>
                      <th class="sortable" data-sort="category" style="cursor:pointer;">Category ${sortCol === 'category' ? (sortAsc ? '↑' : '↓') : ''}</th>
                      <th class="sortable" data-sort="difficulty" style="cursor:pointer;">Difficulty ${sortCol === 'difficulty' ? (sortAsc ? '↑' : '↓') : ''}</th>
                      <th class="sortable" data-sort="timeLimit" style="cursor:pointer;">Time ${sortCol === 'timeLimit' ? (sortAsc ? '↑' : '↓') : ''}</th>
                      <th class="sortable" data-sort="choices" style="cursor:pointer;">Choices ${sortCol === 'choices' ? (sortAsc ? '↑' : '↓') : ''}</th>
                      <th style="width:80px;">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${questions.map(q => `
                      <tr data-id="${q.id}">
                        <td>
                          <div style="font-weight:500;">${escapeHtml(q.text.length > 60 ? q.text.substring(0, 60) + '...' : q.text)}</div>
                          ${q.codeSnippet ? '<span class="badge badge--neutral" style="margin-top:0.25rem;">Has code</span>' : ''}
                        </td>
                        <td><span class="badge badge--primary">${q.category || 'general'}</span></td>
                        <td><span class="badge ${q.difficulty === 'easy' ? 'badge--success' : q.difficulty === 'hard' ? 'badge--error' : 'badge--warning'}">${q.difficulty || 'medium'}</span></td>
                        <td>${q.timeLimit || 30}s</td>
                        <td>${q.choices?.length || 0}</td>
                        <td>
                          <div style="display:flex;gap:0.25rem;">
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
                  </tbody>
                </table>
              </div>
            `}
          </div>
        </main>
      </div>
    `;

    // Event listeners
    document.getElementById('btn-back')?.addEventListener('click', () => router.navigate('/host/dashboard'));
    document.getElementById('btn-add')?.addEventListener('click', () => showQuestionForm());
    document.getElementById('btn-import')?.addEventListener('click', () => handleImport());
    document.getElementById('btn-clear-bank')?.addEventListener('click', () => handleClearBank());

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
      <div style="display:flex;flex-direction:column;gap:1rem;">
        <div class="input-group">
          <label>Question Text</label>
          <textarea class="textarea" id="qf-text" rows="3" placeholder="What will this code output?">${existing?.text || ''}</textarea>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;">
          <div class="input-group">
            <label>Category</label>
            <input class="input" id="qf-category" placeholder="e.g., loops" value="${existing?.category || ''}" />
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
            await createQuestion(data);
            showToast('Question created', 'success');
          }
          questions = await getAllQuestions();
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

    return {
      text,
      codeSnippet,
      codeSnippetMain,
      codeLanguage: document.getElementById('qf-lang')?.value.trim() || null,
      choices,
      multiSelect,
      timeLimit: parseInt(document.getElementById('qf-time')?.value) || DEFAULT_TIME_LIMIT,
      explanation: document.getElementById('qf-explanation')?.value.trim() || null,
      category: document.getElementById('qf-category')?.value.trim() || 'general',
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
          await deleteAllQuestions();
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
      if (clearFirst) {
        await deleteAllQuestions();
      }
      const result = await importFromFile(file);
      showToast(`Imported ${result.imported} question${result.imported !== 1 ? 's' : ''}${result.skipped ? `, ${result.skipped} skipped` : ''}`, 'success');
      questions = await getAllQuestions();
      renderPage();
    } catch (e) {
      showToast('Import error: ' + e.message, 'error');
    }
  }
}

function escapeHtml(text) {
  const el = document.createElement('span');
  el.textContent = text || '';
  return el.innerHTML;
}
