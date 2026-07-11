/**
 * Single source of truth for WhatsApp contact details.
 *
 * To change the number sitewide, edit the fallback below OR set the env var
 * NEXT_PUBLIC_WHATSAPP_NUMBER (and optionally NEXT_PUBLIC_WHATSAPP_CORPORATE_NUMBER)
 * in Render / .env. Numbers must be international format, digits only
 * (e.g. 03126396614 -> 923126396614).
 */

function sanitize(value: string | undefined, fallback: string): string {
  const digits = value?.replace(/\D/g, "");
  return digits && digits.length > 0 ? digits : fallback;
}

/** Direct-to-consumer (orders, support). */
export const WHATSAPP_NUMBER = sanitize(
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER,
  "923126396614",
);

/** Corporate / B2B line. Defaults to the main number until a separate one is set. */
export const WHATSAPP_CORPORATE_NUMBER = sanitize(
  process.env.NEXT_PUBLIC_WHATSAPP_CORPORATE_NUMBER,
  WHATSAPP_NUMBER,
);

/** Base click-to-chat links (no prefilled message). */
export const WHATSAPP_HREF = `https://wa.me/${WHATSAPP_NUMBER}`;
export const WHATSAPP_CORPORATE_HREF = `https://wa.me/${WHATSAPP_CORPORATE_NUMBER}`;

/**
 * Build a wa.me link, optionally with a prefilled (plain-text) message.
 * Pass a raw string — encoding is handled here.
 */
export function whatsappLink(
  message?: string,
  number: string = WHATSAPP_NUMBER,
): string {
  const base = `https://wa.me/${number}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/** Convenience wrapper for the corporate line. */
export function corporateWhatsappLink(message?: string): string {
  return whatsappLink(message, WHATSAPP_CORPORATE_NUMBER);
}

/** Human-readable form, e.g. 923126396614 -> "+92 312 6396614". */
export function formatWhatsAppDisplay(number: string): string {
  if (number.startsWith("92") && number.length === 12) {
    const rest = number.slice(2);
    return `+92 ${rest.slice(0, 3)} ${rest.slice(3)}`;
  }
  return `+${number}`;
}

export const WHATSAPP_DISPLAY = formatWhatsAppDisplay(WHATSAPP_NUMBER);
export const WHATSAPP_CORPORATE_DISPLAY = formatWhatsAppDisplay(
  WHATSAPP_CORPORATE_NUMBER,
);
