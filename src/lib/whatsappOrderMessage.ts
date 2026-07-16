/**
 * Builds a premium WhatsApp order confirmation message.
 * Encoding is handled by whatsappLink() — pass the raw string.
 *
 * Uses WhatsApp-native formatting only: *bold*, bullets, emojis.
 */

export type WhatsAppOrderMessageInput = {
  orderId: string;
  customerName: string;
  phoneNumber: string;
  city: string;
  address: string;
  landmark?: string;
  notes?: string;
  mangoName: string;
  boxSize: string;
  quantity: number;
  ripeness: string;
  addons: string[];
  totalPrice: number;
};

export function formatPkrAmount(amount: number): string {
  return amount.toLocaleString("en-PK");
}

export function buildOrderWhatsAppMessage(
  input: WhatsAppOrderMessageInput,
): string {
  const landmark = input.landmark?.trim() ?? "";
  const notes = input.notes?.trim() ?? "";
  const addons =
    input.addons.length > 0 ? input.addons.join(", ") : "None";

  const deliveryLines = [
    `• City: ${input.city}`,
    `• Address: ${input.address}`,
    ...(landmark ? [`• Landmark: ${landmark}`] : []),
    ...(notes ? [`• Notes: ${notes}`] : []),
  ];

  return [
    "🥭 *Mangostic Order*",
    "",
    "🆔 *Order ID*",
    input.orderId,
    "",
    "👤 *Customer Details*",
    `• Name: ${input.customerName}`,
    `• Phone: ${input.phoneNumber}`,
    "",
    "📍 *Delivery Details*",
    ...deliveryLines,
    "",
    "🥭 *Order Details*",
    `• Mango: ${input.mangoName}`,
    `• Box: ${input.boxSize}`,
    `• Quantity: ${input.quantity}`,
    `• Ripeness: ${input.ripeness}`,
    `• Add-ons: ${addons}`,
    "",
    "💰 *Total Amount*",
    `PKR ${formatPkrAmount(input.totalPrice)}`,
    "",
    "Thank you for choosing *Mangostic*! 🌿",
  ].join("\n");
}
