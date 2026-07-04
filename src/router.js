// ============================================================
// PollRequest — Hash-Based Router
// Lightweight SPA router using location.hash
// ============================================================

class Router {
  constructor() {
    this.routes = new Map();
    this.currentRoute = null;
    this.currentCleanup = null;
    this.beforeEachHook = null;

    window.addEventListener('hashchange', () => this.handleRoute());
  }

  /**
   * Register a route
   * @param {string} path - Route path (e.g., '/host/dashboard')
   * @param {Function} handler - Function that returns HTML or renders the screen
   */
  addRoute(path, handler) {
    this.routes.set(path, handler);
    return this;
  }

  /**
   * Set a global before-each navigation guard
   * @param {Function} hook - (to, from) => boolean. Return false to cancel navigation.
   */
  beforeEach(hook) {
    this.beforeEachHook = hook;
    return this;
  }

  /**
   * Navigate to a route
   * @param {string} path - Route path
   */
  navigate(path) {
    window.location.hash = path;
  }

  /**
   * Get current route path
   */
  getCurrentPath() {
    return window.location.hash.slice(1) || '/';
  }

  /**
   * Get route parameters from path (simple pattern matching)
   * e.g., route '/session/:id' matches hash '/session/abc123'
   */
  matchRoute(pattern, path) {
    const patternParts = pattern.split('/');
    const pathParts = path.split('/');

    if (patternParts.length !== pathParts.length) return null;

    const params = {};
    for (let i = 0; i < patternParts.length; i++) {
      if (patternParts[i].startsWith(':')) {
        params[patternParts[i].slice(1)] = pathParts[i];
      } else if (patternParts[i] !== pathParts[i]) {
        return null;
      }
    }
    return params;
  }

  /**
   * Handle the current route
   */
  async handleRoute() {
    const path = this.getCurrentPath();

    // Run before-each hook
    if (this.beforeEachHook) {
      const allowed = await this.beforeEachHook(path, this.currentRoute);
      if (allowed === false) return;
    }

    // Clean up previous route
    if (this.currentCleanup && typeof this.currentCleanup === 'function') {
      this.currentCleanup();
      this.currentCleanup = null;
    }

    // Try exact match first
    if (this.routes.has(path)) {
      this.currentRoute = path;
      const result = await this.routes.get(path)({});
      if (typeof result === 'function') {
        this.currentCleanup = result;
      }
      return;
    }

    // Try pattern matching
    for (const [pattern, handler] of this.routes) {
      const params = this.matchRoute(pattern, path);
      if (params) {
        this.currentRoute = path;
        const result = await handler(params);
        if (typeof result === 'function') {
          this.currentCleanup = result;
        }
        return;
      }
    }

    // No matching route — redirect to home
    console.warn(`No route found for: ${path}`);
    this.navigate('/');
  }

  /**
   * Start the router (handle initial route)
   */
  start() {
    this.handleRoute();
    return this;
  }
}

// Singleton instance
export const router = new Router();
export default router;
