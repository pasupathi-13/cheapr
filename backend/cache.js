/**
 * Simple in-memory caching manager for Cheaprr Scraper API
 */

class Cache {
  constructor(ttlMinutes = 60) {
    this.store = new Map();
    this.ttl = ttlMinutes * 60 * 1000; // convert to milliseconds
  }

  /**
   * Set cache entry
   * @param {string} key 
   * @param {any} value 
   */
  set(key, value) {
    const expiry = Date.now() + this.ttl;
    this.store.set(key, { value, expiry });
  }

  /**
   * Get cache entry if not expired
   * @param {string} key 
   * @returns {any|null}
   */
  get(key) {
    const entry = this.store.get(key);
    if (!entry) return null;

    if (Date.now() > entry.expiry) {
      this.store.delete(key);
      return null;
    }

    return entry.value;
  }

  /**
   * Clear all expired entries
   */
  cleanup() {
    const now = Date.now();
    for (const [key, entry] of this.store.entries()) {
      if (now > entry.expiry) {
        this.store.delete(key);
      }
    }
  }
}

module.exports = Cache;
