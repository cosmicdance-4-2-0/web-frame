// TODO: Add app versioning (build-time or manual), because debugging deployments becomes easier
import { createRouter } from "./modules/router.js";
import { el, mount, setText, setAttr } from "./modules/ui.js";
import { createStore } from "./modules/state.js";
import { storage } from "./modules/storage.js";
import { api } from "./modules/api.js";
import { logger } from "./modules/logger.js";
import { clampYear } from "./modules/utils.js";

// TODO: Keep a single store, because scattered state quickly turns into entropy soup
const store = createStore({
  theme: "auto", // TODO: Support per-user theme, because system theme isn’t everyone’s preference
  lastRoute: "/home", // TODO: Consider removing if you don’t need it, because state should be justified
});

// TODO: Keep app bootstrap small, because it should be easy to reason about
const appRoot = document.getElementById("app");
const themeToggle = document.getElementById("themeToggle");

init();

function init() {
  // TODO: Guard against missing DOM nodes, because partial HTML edits should fail loudly
  if (!appRoot || !themeToggle) {
    logger.error("Critical DOM nodes missing.", { appRoot: !!appRoot, themeToggle: !!themeToggle });
    return;
  }

  // TODO: Initialize footer year dynamically, because hardcoded years rot
  setText(document.getElementById("year"), String(clampYear(new Date().getFullYear())));

  // TODO: Load persisted theme early, because flashing theme (FOUC) is annoying
  hydrateTheme();

  // TODO: Consider feature-detecting everything, because old browsers fail in weird ways
  wireThemeToggle();

  // TODO: Define routes centrally, because navigation should be auditable
  const routes = {
    "/home": () => viewHome(),
    "/about": () => viewAbout(),
    "/status": () => viewStatus(),
  };

  // TODO: Keep router creation separate, because it simplifies testing later
  const router = createRouter({
    routes,
    onRoute: ({ path }) => {
      store.set("lastRoute", path);
      updateActiveNav(path);
    },
    onNotFound: ({ path }) => viewNotFound(path),
  });

  // TODO: Start router after wiring UI, because initial route render should not race handlers
  router.start();

  // TODO: Register service worker only if you want PWA caching, because caching can surprise you
  maybeRegisterServiceWorker();
}

/* ------------------------------ Theme ------------------------------ */

function hydrateTheme() {
  // TODO: Validate stored values, because localStorage can be corrupted by users/extensions
  const saved = storage.get("theme");
  if (saved) store.set("theme", saved);

  applyTheme(store.get("theme"));

  // TODO: Subscribe to store changes if you add more theme settings, because future extensibility matters
}

function wireThemeToggle() {
  themeToggle.addEventListener("click", () => {
    // TODO: Decide theme toggle behavior, because “auto” vs explicit is a UX choice
    const current = store.get("theme");
    const next = current === "light" ? "dark" : current === "dark" ? "auto" : "light";
    store.set("theme", next);
    storage.set("theme", next);
    applyTheme(next);
    themeToggle.textContent = `Theme: ${next}`;
  });

  // TODO: Initialize button label, because clarity beats mystery-meat UI
  themeToggle.textContent = `Theme: ${store.get("theme")}`;
}

function applyTheme(mode) {
  // TODO: Implement “auto” correctly, because OS theme should map to light/dark at render time
  const root = document.documentElement;

  if (mode === "auto") {
    root.removeAttribute("data-theme");
    return;
  }
  root.setAttribute("data-theme", mode);
}

/* ------------------------------ Navigation ------------------------------ */

function updateActiveNav(path) {
  // TODO: Keep nav active state in one place, because scattered DOM mutations get messy
  const links = document.querySelectorAll(".nav-link");
  links.forEach((a) => {
    const href = a.getAttribute("href") || "";
    const isActive = href === `#${path}`;
    if (isActive) setAttr(a, "aria-current", "page");
    else a.removeAttribute("aria-current");
  });
}

/* ------------------------------ Views ------------------------------ */

function viewHome() {
  // TODO: Replace placeholder content, because your site should communicate purpose fast
  const node = el("div", { class: "grid cols-2" }, [
    el("section", { class: "card" }, [
      el("h1", {}, ["Minimal Modular Site"]),
      el("p", { class: "muted" }, [
        "Vanilla JS + ES modules + hash routing + theming. Deploys cleanly to Cloudflare Pages.",
      ]),
      el("p", {}, [
        "This scaffold is designed to be edited without the whole repo becoming a spaghetti haunted house. 🧠🕸️",
      ]),
      el("div", { class: "grid" }, [
        el("button", { class: "btn", type: "button", onClick: pingHealth }, ["Ping API stub"]),
      ]),
    ]),
    el("aside", { class: "card" }, [
      el("h2", {}, ["Next Steps"]),
      el("ul", {}, [
        el("li", {}, ["Edit routes in ", el("code", {}, ["scripts/main.js"]), "."]),
        el("li", {}, ["Add components in ", el("code", {}, ["scripts/modules/ui.js"]), "."]),
        el("li", {}, ["Add real data calls in ", el("code", {}, ["scripts/modules/api.js"]), "."]),
      ]),
      el("p", { class: "muted" }, [
        // TODO: Add a real “getting started” section, because future-you will forget details
        "TODO: Write a 60-second project README, because onboarding friction kills momentum",
      ]),
    ]),
  ]);

  mount(appRoot, node);
}

function viewAbout() {
  // TODO: Add real about content, because users (and search engines) want context
  const node = el("section", { class: "card" }, [
    el("h1", {}, ["About"]),
    el("p", { class: "muted" }, [
      "This is a standards-first scaffold: semantic HTML, accessible navigation, and modular JS.",
    ]),
    el("p", {}, [
      "No bundler. No framework. Just the browser doing browser things. ⚙️",
    ]),
    el("p", { class: "muted" }, [
      "TODO: Add contact links, because people need a way to reach you",
    ]),
  ]);

  mount(appRoot, node);
}

function viewStatus() {
  // TODO: Decide what “Status” should mean, because every page should justify its existence
  const lastRoute = store.get("lastRoute");

  const node = el("section", { class: "card" }, [
    el("h1", {}, ["Status"]),
    el("p", {}, ["Last route: ", el("code", {}, [lastRoute])]),
    el("p", {}, ["Theme mode: ", el("code", {}, [store.get("theme")])]),
    el("p", { class: "muted" }, [
      "TODO: Add diagnostics panel (perf, SW, storage), because debugging in production is reality",
    ]),
  ]);

  mount(appRoot, node);
}

function viewNotFound(path) {
  // TODO: Decide whether to redirect unknown routes, because 404 vs redirect is a product choice
  const node = el("section", { class: "card" }, [
    el("h1", {}, ["404"]),
    el("p", {}, ["No route matches: ", el("code", {}, [path])]),
    el("p", { class: "muted" }, [
      "TODO: Add suggestions/search, because dead-ends are user-hostile",
    ]),
  ]);

  mount(appRoot, node);
}

/* ------------------------------ Actions ------------------------------ */

async function pingHealth() {
  // TODO: Replace stub API call, because this currently demonstrates structure only
  try {
    const result = await api.get("/health");
    logger.info("API result", result);
    alert(`API stub says: ${JSON.stringify(result)}`);
  } catch (err) {
    logger.error("API call failed", err);
    alert("API call failed (expected unless you wire it).");
  }
}

/* ------------------------------ Service Worker ------------------------------ */

function maybeRegisterServiceWorker() {
  // TODO: Decide SW strategy (cache-first, network-first), because it changes update semantics
  if (!("serviceWorker" in navigator)) return;

  // TODO: Gate SW registration behind a config flag, because SW caching can surprise during iteration
  const enable = false; // TODO: Set true when ready, because SW should be intentional
  if (!enable) return;

  navigator.serviceWorker.register("/sw.js")
    .then(() => logger.info("Service worker registered"))
    .catch((e) => logger.warn("Service worker registration failed", e));
}
