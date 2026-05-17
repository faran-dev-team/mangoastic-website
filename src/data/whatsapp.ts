/** D2C order line — use on “Order on WhatsApp” / shop CTAs only. */
export const WHATSAPP_ORDER_PHONE = "923214567890";
export const WHATSAPP_ORDER_URL = `https://wa.me/${WHATSAPP_ORDER_PHONE}`;

/** B2B / corporate — contact page corporate card & corporate page quotes. */
export const WHATSAPP_CORPORATE_PHONE = "923412764104";

export function whatsappOrderUrl(text?: string): string {
  if (!text?.trim()) return WHATSAPP_ORDER_URL;
  return `${WHATSAPP_ORDER_URL}?text=${encodeURIComponent(text)}`;
}

export function whatsappCorporateUrl(text: string): string {
  return `https://wa.me/${WHATSAPP_CORPORATE_PHONE}?text=${encodeURIComponent(text)}`;
}
