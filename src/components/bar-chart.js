// ============================================================
// PollRequest — Bar Chart Component
// Animated bar chart for displaying answer distributions
// ============================================================

/**
 * Render an animated bar chart
 * @param {HTMLElement} container
 * @param {object} options
 */
export function renderBarChart(container, options = {}) {
  const {
    data = [],          // [{ label, value, color, isCorrect }]
    maxValue = null,    // Auto-calculated if null
    direction = 'horizontal', // 'horizontal' or 'vertical'
    animate = true,
    showValues = true,
    showPercent = false,
    total = null,
  } = options;

  const max = maxValue || Math.max(...data.map(d => d.value), 1);
  const computedTotal = total || data.reduce((s, d) => s + d.value, 0);

  if (direction === 'horizontal') {
    container.innerHTML = `
      <div class="bar-chart-h">
        ${data.map((d, i) => {
          const pct = max > 0 ? (d.value / max) * 100 : 0;
          const displayPct = computedTotal > 0 ? Math.round((d.value / computedTotal) * 100) : 0;
          return `
            <div class="results-bar stagger-${i + 1}" style="animation-delay:${i * 0.1}s">
              <div class="results-bar__label" style="background:var(--answer-${d.color || 'a'})">
                ${d.label || ''}
              </div>
              <div class="results-bar__track">
                <div class="results-bar__fill" style="
                  width:${animate ? 0 : pct}%;
                  background:var(--answer-${d.color || 'a'});
                  ${animate ? `animation: barGrow 0.8s ease ${i * 0.1}s forwards; width:${pct}%;` : ''}
                ">
                  ${d.isCorrect ? `
                    <span style="margin-left:auto;display:flex;align-items:center;color:white;filter:drop-shadow(0 1px 2px rgba(0,0,0,0.5));">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </span>` : ''}
                </div>
              </div>
              <div class="results-bar__count">
                ${showPercent ? `${displayPct}%` : d.value}
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  } else {
    // Vertical bar chart
    container.innerHTML = `
      <div class="bar-chart-v" style="display:flex;align-items:flex-end;justify-content:center;gap:1rem;height:200px;">
        ${data.map((d, i) => {
          const pct = max > 0 ? (d.value / max) * 100 : 0;
          return `
            <div style="display:flex;flex-direction:column;align-items:center;gap:0.5rem;flex:1;max-width:80px;">
              ${showValues ? `<span style="font-weight:700;font-size:0.875rem;">${d.value}</span>` : ''}
              <div style="
                width:100%;
                height:${pct}%;
                min-height:4px;
                background:var(--answer-${d.color || 'a'});
                border-radius:var(--radius-sm) var(--radius-sm) 0 0;
                ${animate ? `animation:barGrowVertical 0.8s ease ${i * 0.1}s forwards;transform-origin:bottom;` : ''}
              "></div>
              <span style="font-weight:600;font-size:0.875rem;color:var(--text-secondary);">${d.label}</span>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }
}
