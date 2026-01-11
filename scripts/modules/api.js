// TODO: Replace stubbed endpoints with real ones, because this currently demonstrates shape only

import { logger } from "./logger.js";

const BASE = ""; // TODO: Set API base URL (or keep empty), because deployments differ by environment

export const api = {
  async get(path) {
    // TODO: Add timeout + abort controller, because hung requests ruin UX
    if (path === "/health") {
      // TODO: Remove stub, because production should talk to real services (or not pretend)
      return { ok: true, time: new Date().toISOString(), note: "stub response" };
    }

    const url = BASE + path;
    const res = await fetch(url, {
      method: "GET",
      headers: {
        // TODO: Add auth headers only when needed, because storing secrets client-side is risky
        "Accept": "application/json",
      },
    });

    if (!res.ok) {
      logger.warn("API GET failed", { url, status: res.status });
      throw new Error(`GET ${url} failed: ${res.status}`);
    }

    // TODO: Handle non-JSON responses, because not all endpoints return JSON
    return res.json();
  },
};
