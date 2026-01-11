// TODO: Add subscriptions by key, because per-key listeners reduce unnecessary updates

export function createStore(initial = {}) {
  let state = { ...initial };
  const listeners = new Set();

  function get(key) {
    return state[key];
  }

  function set(key, value) {
    // TODO: Add structural sharing / immutability patterns, because complex state benefits from discipline
    state = { ...state, [key]: value };
    listeners.forEach((fn) => fn({ key, value, state }));
  }

  function subscribe(fn) {
    // TODO: Validate listener types, because “undefined is not a function” is not a personality
    listeners.add(fn);
    return () => listeners.delete(fn);
  }

  return { get, set, subscribe };
}
