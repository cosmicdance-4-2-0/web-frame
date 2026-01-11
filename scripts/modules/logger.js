// TODO: Add log levels + env gating, because production logs should be intentional

export const logger = {
  info(msg, data) { console.log(`[info] ${msg}`, data ?? ""); },
  warn(msg, data) { console.warn(`[warn] ${msg}`, data ?? ""); },
  error(msg, data) { console.error(`[error] ${msg}`, data ?? ""); },
};
