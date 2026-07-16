/**
 * Lightweight admin logger — development-only console, silent in production.
 * Avoids leaking operational details to end users.
 */
const isDev = process.env.NODE_ENV !== "production";

export const logger = {
  error(message: string, meta?: Record<string, unknown>): void {
    if (!isDev) {
      return;
    }
    // eslint-disable-next-line no-console
    console.error(`[admin] ${message}`, meta ?? "");
  },
};
