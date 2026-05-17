/**
 * Email & WhatsApp copy — wire to ESP / WhatsApp API when backend is ready.
 */

export const WELCOME_EMAIL = {
  subject: "Welcome to the orchard.",
  body: `Hi {first_name},

Thanks for joining us. Mangoistic is a small family business with a big orchard near Multan. We pick by hand, we reject 40 percent of what we pick, and we ship the rest in boxes designed to feel like gifts.

Here's PKR 300 off your first order. Code: ORCHARD300

Use it on any box — Classic, Family, the Gift Edit, anything. It expires in 14 days because mango season is short and we want you eating ours, not someone else's.

Order on the site or just reply on WhatsApp.

— Measm and the Mangoistic team`,
} as const;

export const ORDER_CONFIRMATION_WHATSAPP = `Hi {first_name} — your Mangoistic order is confirmed.

Order: {order_id} • {box_name} • PKR {amount} • Delivery: {date} ({slot})

Our team will message you 30 minutes before the rider arrives. If anything changes, you'll hear from us first.`;

export const DAY_6_RESEND_WHATSAPP = `Hi {first_name} — checking in. Your box should be down to the last few by now.

If you want a fresh one delivered tomorrow, tap below. Same box, same price, no friction.

[ Reorder my Classic 7kg → ]`;

export const QUALITY_ISSUE_RECOVERY_WHATSAPP = `Hi {first_name} — really sorry about this. Sending a replacement box out tomorrow morning. You don't need to do anything. Thank you for sending the photo so quickly, it helps us figure out what went wrong.

— Mangoistic team`;
