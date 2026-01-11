// TODO: Add more primitives (modal, toast), because repeated UI code becomes duplication rot

export function el(tag, attrs = {}, children = []) {
  const node = document.createElement(tag);

  // TODO: Support dataset props, because data-* can be useful for testing
  for (const [k, v] of Object.entries(attrs)) {
    if (k === "class") node.className = String(v);
    else if (k === "onClick" && typeof v === "function") node.addEventListener("click", v);
    else if (k === "onInput" && typeof v === "function") node.addEventListener("input", v);
    else node.setAttribute(k, String(v));
  }

  // TODO: Support text nodes directly, because ergonomics matter for rapid iteration
  for (const child of children) {
    if (child == null) continue;
    if (typeof child === "string") node.appendChild(document.createTextNode(child));
    else node.appendChild(child);
  }

  return node;
}

export function mount(root, node) {
  // TODO: Consider diffing instead of replacing, because full rerenders can get expensive later
  root.replaceChildren(node);
}

export function setText(node, text) {
  if (!node) return; // TODO: Prefer throwing in dev, because silent failures hide bugs
  node.textContent = text;
}

export function setAttr(node, name, value) {
  if (!node) return; // TODO: Prefer throwing in dev, because correctness matters
  node.setAttribute(name, value);
}
