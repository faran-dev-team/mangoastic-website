"use client";

import { FormEvent, useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";

const CORPORATE_B2B_WHATSAPP =
  "https://wa.me/923412764104?text=" +
  encodeURIComponent("Hi Mangoastic — I'd like to speak with your B2B corporate gifting team.");

const QUANTITY_OPTIONS = [
  { value: "25-50", label: "25–50 boxes" },
  { value: "51-100", label: "51–100 boxes" },
  { value: "101-200", label: "101–200 boxes" },
  { value: "200+", label: "200+ boxes" },
] as const;

const DELIVERY_CITIES = [
  "Islamabad",
  "Rawalpindi",
  "Lahore",
  "Karachi",
  "Multan",
  "Faisalabad",
  "Other",
] as const;

type QuantityValue = (typeof QUANTITY_OPTIONS)[number]["value"];

function buildQuoteWhatsAppMessage(data: {
  company: string;
  name: string;
  whatsapp: string;
  email: string;
  quantity: string;
  deliveryDate: string;
  cities: string[];
  requirements: string;
}) {
  const lines = [
    "Corporate gifting quote request",
    "",
    `Company: ${data.company}`,
    `Name: ${data.name}`,
    `WhatsApp: ${data.whatsapp}`,
    `Email: ${data.email}`,
    `Approx. quantity: ${data.quantity}`,
    `Target delivery: ${data.deliveryDate || "Not specified"}`,
    `Cities: ${data.cities.join(", ")}`,
  ];
  if (data.requirements.trim()) {
    lines.push("", `Special requirements: ${data.requirements.trim()}`);
  }
  return lines.join("\n");
}

export default function CorporateLeadAndClosing() {
  const [company, setCompany] = useState("");
  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");
  const [quantity, setQuantity] = useState<QuantityValue | "">("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [cities, setCities] = useState<string[]>([]);
  const [requirements, setRequirements] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [minDeliveryDate, setMinDeliveryDate] = useState<string>();

  useEffect(() => {
    setMinDeliveryDate(new Date().toISOString().split("T")[0]);
  }, []);

  function toggleCity(city: string) {
    setCities((prev) =>
      prev.includes(city) ? prev.filter((c) => c !== city) : [...prev, city],
    );
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (!company.trim() || !name.trim() || !whatsapp.trim() || !email.trim()) {
      setError("Please fill in all required fields.");
      return;
    }
    if (!quantity) {
      setError("Please select an approximate box quantity.");
      return;
    }
    if (cities.length === 0) {
      setError("Please select at least one city.");
      return;
    }

    const formData = {
      company: company.trim(),
      name: name.trim(),
      whatsapp: whatsapp.trim(),
      email: email.trim(),
      quantity,
      deliveryDate: deliveryDate || null,
      cities,
      requirements: requirements.trim() || null,
    };

    console.log("[Corporate quote form]", formData);

    const message = buildQuoteWhatsAppMessage({
      company: formData.company,
      name: formData.name,
      whatsapp: formData.whatsapp,
      email: formData.email,
      quantity: formData.quantity,
      deliveryDate: formData.deliveryDate ?? "",
      cities: formData.cities,
      requirements: formData.requirements ?? "",
    });

    window.open(
      `https://wa.me/923412764104?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer",
    );
    setSubmitted(true);
  }

  const inputClass =
    "mt-1.5 w-full rounded-lg border border-zinc-700 bg-zinc-900/80 px-4 py-3 font-outfit text-sm text-white placeholder:text-zinc-500 outline-none transition focus:border-mango/50 focus:ring-1 focus:ring-mango/30";
  const labelClass =
    "block font-outfit text-xs font-medium uppercase tracking-[0.1em] text-zinc-400";

  return (
    <section className="border-t border-zinc-800/80 bg-black">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16 md:px-8 md:py-20">
        <p className="font-outfit text-[10px] font-semibold uppercase tracking-[0.22em] text-mango sm:text-xs">
          Get a quote
        </p>
        <h2
          id="corporate-lead-heading"
          className="mt-3 font-sirelia text-2xl font-normal tracking-tight text-white sm:text-3xl"
        >
          Tell us what you need
        </h2>
        <p className="mt-3 max-w-xl font-outfit text-sm text-zinc-400 sm:text-base">
          We respond within 4 hours on business days.
        </p>

        {submitted ? (
          <div
            className="mt-10 rounded-2xl border border-mango/30 bg-zinc-950/80 p-8 sm:p-10"
            role="status"
          >
            <p className="font-sirelia text-xl text-white sm:text-2xl">
              Thank you — we&apos;ve opened WhatsApp with your details.
            </p>
            <p className="mt-3 font-outfit text-sm leading-relaxed text-zinc-300 sm:text-base">
              Send the message to complete your request. We&apos;ll confirm pricing
              and delivery within 4 hours.
            </p>
            <button
              type="button"
              onClick={() => setSubmitted(false)}
              className="mt-6 font-outfit text-sm font-semibold text-mango underline-offset-2 hover:underline"
            >
              Submit another request
            </button>
          </div>
        ) : (
          <form
            onSubmit={onSubmit}
            className="mt-10 grid gap-6 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-7"
            noValidate
          >
            <div>
              <label htmlFor="corp-company" className={labelClass}>
                Company name <span className="text-mango">*</span>
              </label>
              <input
                id="corp-company"
                name="company"
                type="text"
                required
                autoComplete="organization"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="corp-name" className={labelClass}>
                Your name <span className="text-mango">*</span>
              </label>
              <input
                id="corp-name"
                name="name"
                type="text"
                required
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="corp-whatsapp" className={labelClass}>
                WhatsApp number <span className="text-mango">*</span>
              </label>
              <input
                id="corp-whatsapp"
                name="whatsapp"
                type="tel"
                required
                autoComplete="tel"
                placeholder="+92 300 0000000"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="corp-email" className={labelClass}>
                Email <span className="text-mango">*</span>
              </label>
              <input
                id="corp-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="corp-quantity" className={labelClass}>
                Approximate box quantity <span className="text-mango">*</span>
              </label>
              <select
                id="corp-quantity"
                name="quantity"
                required
                value={quantity}
                onChange={(e) =>
                  setQuantity(e.target.value as QuantityValue | "")
                }
                className={`${inputClass} cursor-pointer`}
              >
                <option value="" disabled>
                  Select range
                </option>
                {QUANTITY_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="corp-delivery-date" className={labelClass}>
                Target delivery date
              </label>
              <input
                id="corp-delivery-date"
                name="deliveryDate"
                type="date"
                min={minDeliveryDate}
                value={deliveryDate}
                onChange={(e) => setDeliveryDate(e.target.value)}
                className={`${inputClass} [color-scheme:dark]`}
              />
            </div>

            <fieldset className="sm:col-span-2">
              <legend className={labelClass}>
                City / cities <span className="text-mango">*</span>
              </legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {DELIVERY_CITIES.map((city) => {
                  const selected = cities.includes(city);
                  return (
                    <button
                      key={city}
                      type="button"
                      onClick={() => toggleCity(city)}
                      className={`rounded-full border px-4 py-2 font-outfit text-xs font-medium transition sm:text-sm ${
                        selected
                          ? "border-mango bg-mango/15 text-mango"
                          : "border-zinc-700 text-zinc-300 hover:border-zinc-500 hover:text-white"
                      }`}
                      aria-pressed={selected}
                    >
                      {city}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <div className="sm:col-span-2">
              <label htmlFor="corp-requirements" className={labelClass}>
                Special requirements{" "}
                <span className="normal-case tracking-normal text-zinc-500">
                  (optional)
                </span>
              </label>
              <textarea
                id="corp-requirements"
                name="requirements"
                rows={4}
                value={requirements}
                onChange={(e) => setRequirements(e.target.value)}
                placeholder="Logo files, delivery windows, recipient list format…"
                className={`${inputClass} resize-y min-h-[7rem]`}
              />
            </div>

            {error && (
              <p
                className="sm:col-span-2 font-outfit text-sm text-red-400"
                role="alert"
              >
                {error}
              </p>
            )}

            <div className="sm:col-span-2">
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center rounded-full bg-mango px-8 py-4 font-outfit text-sm font-bold uppercase tracking-[0.08em] text-black shadow-[0_0_28px_-4px_rgba(255,163,10,0.45)] transition hover:bg-mango/90 sm:w-auto sm:min-w-[280px]"
              >
                Get My Quote — within 4 hours
              </button>
            </div>
          </form>
        )}
      </div>

      <div className="mx-auto mt-16 flex max-w-6xl flex-col items-center border-t border-zinc-800/80 px-4 pt-14 text-center sm:mt-20 sm:px-6 sm:pt-16 md:px-8 md:pt-20">
        <p className="max-w-2xl font-outfit text-base leading-relaxed text-zinc-300 sm:text-lg">
          Or skip the form and just WhatsApp our B2B line. We answer.
        </p>
        <a
          href={CORPORATE_B2B_WHATSAPP}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-8 inline-flex items-center justify-center gap-2 rounded-full border border-white/40 bg-white/5 px-8 py-4 font-outfit text-sm font-semibold text-white backdrop-blur-sm transition hover:border-white/60 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50"
        >
          <MessageCircle
            className="h-5 w-5 shrink-0 text-white transition-colors duration-300 group-hover:text-mango"
            strokeWidth={2.25}
          />
          WhatsApp Our B2B Line
        </a>
      </div>
    </section>
  );
}
