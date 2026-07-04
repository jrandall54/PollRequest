// ============================================================
// PollRequest — Code Block Component
// Syntax-highlighted code display using Prism.js
// ============================================================

import Prism from 'prismjs';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-cpp';
import 'prismjs/components/prism-csharp';

/**
 * Render a syntax-highlighted code block
 * @param {string} code - The code string
 * @param {string} language - Language for highlighting (e.g., 'java')
 * @returns {string} HTML string
 */
export function renderCodeBlock(code, language = 'java') {
  if (!code) return '';

  // Map common language names
  const langMap = {
    'java': 'java',
    'python': 'python',
    'py': 'python',
    'javascript': 'javascript',
    'js': 'javascript',
    'c': 'c',
    'cpp': 'cpp',
    'c++': 'cpp',
    'csharp': 'csharp',
    'c#': 'csharp',
  };

  const lang = langMap[language?.toLowerCase()] || 'java';

  let highlighted;
  try {
    const grammar = Prism.languages[lang];
    if (grammar) {
      highlighted = Prism.highlight(code, grammar, lang);
    } else {
      highlighted = escapeHtml(code);
    }
  } catch {
    highlighted = escapeHtml(code);
  }

  return `
    <div class="code-block-wrap">
      <div class="code-block-header">
        <span class="code-block-lang">${language || 'code'}</span>
      </div>
      <pre class="language-${lang}"><code class="language-${lang}">${highlighted}</code></pre>
    </div>
  `;
}

/**
 * Escape HTML characters for safe display
 */
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
