// ============================================================
// PollRequest — Reactive State Management
// Simple Proxy-based state store with event-driven updates
// ============================================================

/**
 * Create a reactive state store.
 * Listeners are notified when any property changes.
 */
function createStore(initialState = {}) {
  const listeners = new Map();
  let state = { ...initialState };

  const proxy = new Proxy(state, {
    set(target, property, value) {
      const oldValue = target[property];
      target[property] = value;

      // Notify listeners for this specific property
      if (listeners.has(property)) {
        listeners.get(property).forEach(fn => fn(value, oldValue));
      }

      // Notify wildcard listeners
      if (listeners.has('*')) {
        listeners.get('*').forEach(fn => fn(property, value, oldValue));
      }

      return true;
    },

    get(target, property) {
      return target[property];
    },
  });

  return {
    state: proxy,

    /**
     * Subscribe to changes on a specific property
     * @param {string} property - Property name to watch, or '*' for all
     * @param {Function} callback - Called with (newValue, oldValue)
     * @returns {Function} Unsubscribe function
     */
    subscribe(property, callback) {
      if (!listeners.has(property)) {
        listeners.set(property, new Set());
      }
      listeners.get(property).add(callback);

      // Return unsubscribe function
      return () => {
        listeners.get(property).delete(callback);
        if (listeners.get(property).size === 0) {
          listeners.delete(property);
        }
      };
    },

    /**
     * Update multiple properties at once
     */
    update(updates) {
      Object.entries(updates).forEach(([key, value]) => {
        proxy[key] = value;
      });
    },

    /**
     * Get a snapshot of the current state
     */
    getState() {
      return { ...state };
    },

    /**
     * Reset state to initial values
     */
    reset() {
      Object.keys(state).forEach(key => {
        delete state[key];
      });
      Object.entries(initialState).forEach(([key, value]) => {
        proxy[key] = value;
      });
    },

    /**
     * Remove all listeners
     */
    clearListeners() {
      listeners.clear();
    },
  };
}

// ── App-wide stores ─────────────────────────────────────────

// User / auth state
export const userStore = createStore({
  uid: null,
  name: null,
  icon: null,
  isHost: false,
  isAuthenticated: false,
});

// Current game session state
export const sessionStore = createStore({
  sessionId: null,
  joinCode: null,
  status: null,           // 'lobby' | 'active' | 'reviewing' | 'ended'
  currentQuestionIndex: -1,
  currentQuestionState: null, // 'showing' | 'accepting' | 'paused' | 'results'
  questionIds: [],
  players: {},
  timerEnd: null,
  timerPaused: false,
  timerRemaining: null,
  currentQuestion: null,
  responses: [],
  theme: 'light',
});

// UI state
export const uiStore = createStore({
  currentScreen: null,
  loading: false,
  error: null,
});

// Host app state (courses, etc)
export const hostStore = createStore({
  activeCourseId: localStorage.getItem('pollrequest_courseId') || null,
});

// Persist active course changes
hostStore.subscribe('activeCourseId', (newId) => {
  if (newId) {
    localStorage.setItem('pollrequest_courseId', newId);
  } else {
    localStorage.removeItem('pollrequest_courseId');
  }
});
