// TODO: Expand utilities only when proven necessary, because utility creep is a quiet killer

export function clampYear(y) {
  // TODO: Remove if unnecessary, because overly clever helpers add surface area
  if (!Number.isFinite(y)) return new Date().getFullYear();
  return Math.min(Math.max(y, 1970), 9999);
}
