// ============================================================
// PollRequest — Timer Component
// Circular countdown timer with warning/danger states
// ============================================================

/**
 * Create a circular countdown timer
 * @param {HTMLElement} container - Element to render into
 * @param {object} options
 * @returns {object} Timer controller { start, pause, resume, stop, getRemaining }
 */
export function createTimer(container, options = {}) {
  const {
    totalSeconds = 30,
    onTick = () => {},
    onComplete = () => {},
    warningThreshold = 10,
    dangerThreshold = 5,
    size = 'normal', // 'normal', 'large', 'small'
  } = options;

  const sizeMap = {
    small: { width: 60, stroke: 4, fontSize: '1.25rem' },
    normal: { width: 100, stroke: 6, fontSize: '2rem' },
    large: { width: 160, stroke: 8, fontSize: '3rem' },
  };

  const s = sizeMap[size] || sizeMap.normal;
  const radius = (s.width - s.stroke * 2) / 2;
  const circumference = 2 * Math.PI * radius;

  let remaining = totalSeconds;
  let intervalId = null;
  let isPaused = false;
  let startTime = null;
  let pausedAt = null;

  // Render the timer
  container.innerHTML = `
    <div class="timer" id="timer-component" style="width:${s.width}px;height:${s.width}px;position:relative;">
      <svg width="${s.width}" height="${s.width}" style="transform:rotate(-90deg)">
        <circle
          cx="${s.width / 2}" cy="${s.width / 2}" r="${radius}"
          fill="none"
          stroke="var(--timer-track)"
          stroke-width="${s.stroke}"
        />
        <circle
          id="timer-ring"
          cx="${s.width / 2}" cy="${s.width / 2}" r="${radius}"
          fill="none"
          stroke="var(--timer-ring)"
          stroke-width="${s.stroke}"
          stroke-linecap="round"
          stroke-dasharray="${circumference}"
          stroke-dashoffset="0"
          style="transition: stroke-dashoffset 0.25s linear, stroke 0.3s ease"
        />
      </svg>
      <div id="timer-text" style="
        position:absolute;
        inset:0;
        display:flex;
        align-items:center;
        justify-content:center;
        font-family:'JetBrains Mono',monospace;
        font-weight:800;
        font-size:${s.fontSize};
      ">${totalSeconds}</div>
    </div>
  `;

  const ring = container.querySelector('#timer-ring');
  const text = container.querySelector('#timer-text');
  const timerEl = container.querySelector('#timer-component');

  function updateDisplay() {
    const fraction = remaining / totalSeconds;
    const offset = circumference * (1 - fraction);
    ring.style.strokeDashoffset = offset;
    text.textContent = Math.ceil(remaining);

    // Color states
    if (remaining <= dangerThreshold) {
      ring.style.stroke = 'var(--timer-danger)';
      text.style.color = 'var(--timer-danger)';
      timerEl.style.animation = 'timerPulse 0.5s ease infinite';
    } else if (remaining <= warningThreshold) {
      ring.style.stroke = 'var(--timer-warning)';
      text.style.color = 'var(--timer-warning)';
      timerEl.style.animation = 'none';
    } else {
      ring.style.stroke = 'var(--timer-ring)';
      text.style.color = 'inherit';
      timerEl.style.animation = 'none';
    }

    onTick(Math.ceil(remaining));
  }

  function tick() {
    if (isPaused) return;

    const elapsed = (Date.now() - startTime) / 1000;
    remaining = Math.max(0, totalSeconds - elapsed);

    updateDisplay();

    if (remaining <= 0) {
      stop();
      onComplete();
    }
  }

  function start() {
    startTime = Date.now();
    remaining = totalSeconds;
    isPaused = false;
    updateDisplay();
    intervalId = setInterval(tick, 100); // Update 10 times/sec for smooth animation
  }

  function startFromRemaining(secondsLeft) {
    startTime = Date.now() - (totalSeconds - secondsLeft) * 1000;
    remaining = secondsLeft;
    isPaused = false;
    updateDisplay();
    if (intervalId) clearInterval(intervalId);
    intervalId = setInterval(tick, 100);
  }

  function pause() {
    isPaused = true;
    pausedAt = remaining;
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
    timerEl.style.animation = 'none';
    timerEl.style.opacity = '0.6';
  }

  function resume() {
    if (!isPaused) return;
    isPaused = false;
    startTime = Date.now() - (totalSeconds - pausedAt) * 1000;
    timerEl.style.opacity = '1';
    intervalId = setInterval(tick, 100);
  }

  function stop() {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
    isPaused = false;
  }

  function setRemaining(seconds) {
    remaining = seconds;
    updateDisplay();
  }

  function getRemaining() {
    return Math.ceil(remaining);
  }

  function destroy() {
    stop();
    container.innerHTML = '';
  }

  return {
    start,
    startFromRemaining,
    pause,
    resume,
    stop,
    setRemaining,
    getRemaining,
    destroy,
  };
}
