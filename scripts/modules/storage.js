// TODO: Add namespacing/versioning, because schema changes will happen

const KEY_PREFIX = "my-site:"; // TODO: Rename prefix, because multiple projects may share a domain/localStorage

export const storage = {
  get(key) {
    try {
      const raw = localStorage.getItem(KEY_PREFIX + key);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch {
      // TODO: Add logging, because storage failures are useful signals
      return null;
    }
  },

  set(key, value) {
    try {
      localStorage.setItem(KEY_PREFIX + key, JSON.stringify(value));
    } catch {
      // TODO: Handle quota errors explicitly, because users can fill storage
    }
  },

  remove(key) {
    // TODO: Consider defensive try/catch, because storage can throw in private mode
    localStorage.removeItem(KEY_PREFIX + key);
  },
};
