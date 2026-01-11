// TODO: Add route param support (e.g., /post/:id), because dynamic pages will want it

export function createRouter({ routes, onRoute, onNotFound }) {
  // TODO: Validate route table, because silent failures waste hours
  if (!routes || typeof routes !== "object") throw new Error("routes must be an object");

  function getPath() {
    // TODO: Decide whether to support query strings, because they’re useful for stateful pages
    const hash = window.location.hash || "#/home";
    const path = hash.startsWith("#") ? hash.slice(1) : hash;
    return normalize(path);
  }

  function normalize(path) {
    // TODO: Normalize trailing slashes consistently, because routing edge cases are annoying
    if (!path.startsWith("/")) return `/${path}`;
    return path;
  }

  function render() {
    const path = getPath();
    const view = routes[path];

    if (typeof view === "function") {
      onRoute?.({ path });
      view();
      return;
    }

    onNotFound?.({ path });
  }

  function start() {
    // TODO: Handle hashchange only, because this is a hash router by design (no server config needed)
    window.addEventListener("hashchange", render);
    render();
  }

  return { start };
}
