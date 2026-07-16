/**
 * Lightweight admin toast bus — success / error feedback (Phase 7.2).
 * Non-blocking; auto-dismiss handled by the host.
 */

export type AdminToastTone = "success" | "error";

export type AdminToastPayload = {
  id: number;
  tone: AdminToastTone;
  title: string;
  description?: string;
  durationMs: number;
};

type Listener = (toast: AdminToastPayload) => void;

const listeners = new Set<Listener>();
let toastId = 0;

export function showAdminToast(input: {
  tone: AdminToastTone;
  title: string;
  description?: string;
  durationMs?: number;
}): void {
  toastId += 1;
  const payload: AdminToastPayload = {
    id: toastId,
    tone: input.tone,
    title: input.title,
    description: input.description,
    durationMs: input.durationMs ?? (input.tone === "success" ? 2800 : 4200),
  };
  listeners.forEach((listener) => listener(payload));
}

export function subscribeAdminToast(listener: Listener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}
