"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { ArrowRight, MessageCircle } from "lucide-react";
import { motion, useReducedMotion, Variants } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 36, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.85, ease: "easeOut" },
  },
};

const CORPORATE_B2B_WHATSAPP =
  "https://wa.me/923214567890?text=" +
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
  const sectionRef = useRef<HTMLElement | null>(null);
  const closingRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

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

  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".corp-closing-reveal",
        { opacity: 0, y: 50, filter: "blur(10px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.1,
          ease: "power3.out",
          stagger: 0.14,
          scrollTrigger: {
            trigger: closingRef.current,
            start: "top 85%",
            once: true,
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

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
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-t border-zinc-800/80 bg-black"
    >
      <motion.div
        className="corp-form-glow absolute left-1/2 top-[20%] h-[320px] w-[320px] -translate-x-1/2 rounded-full bg-mango/8 blur-3xl"
        animate={prefersReducedMotion ? undefined : { y: [0, -16, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute inset-x-0 top-0 h-px origin-left bg-gradient-to-r from-transparent via-white/10 to-transparent"
      />

      <motion.div className="relative z-10 mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16 md:px-8 md:py-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.p
            variants={fadeUp}
            className="font-outfit text-[10px] font-semibold uppercase tracking-[0.22em] text-mango sm:text-xs"
          >
            Get a quote
          </motion.p>
          <motion.h2
            variants={fadeUp}
            id="corporate-lead-heading"
            className="mt-3 font-sirelia text-2xl font-normal tracking-tight text-white sm:text-3xl"
          >
            Tell us what you need
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-3 max-w-xl font-outfit text-sm text-zinc-400 sm:text-base"
          >
            We respond within 4 hours on business days.
          </motion.p>
        </motion.div>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
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
              className="mt-6 cursor-pointer font-outfit text-sm font-semibold text-mango underline-offset-2 hover:underline"
            >
              Submit another request
            </button>
          </motion.div>
        ) : (
          <motion.form
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            onSubmit={onSubmit}
            className="mt-10 grid gap-6 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-7"
            noValidate
          >
            <motion.div variants={fadeUp}>
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
            </motion.div>

            <motion.div variants={fadeUp}>
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
            </motion.div>

            <motion.div variants={fadeUp}>
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
            </motion.div>

            <motion.div variants={fadeUp}>
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
            </motion.div>

            <motion.div variants={fadeUp}>
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
            </motion.div>

            <motion.div variants={fadeUp}>
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
            </motion.div>

            <motion.fieldset variants={fadeUp} className="sm:col-span-2">
              <legend className={labelClass}>
                City / cities <span className="text-mango">*</span>
              </legend>
              <motion.div
                variants={containerVariants}
                className="mt-3 flex flex-wrap gap-2"
              >
                {DELIVERY_CITIES.map((city) => {
                  const selected = cities.includes(city);
                  return (
                    <motion.button
                      key={city}
                      type="button"
                      variants={fadeUp}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => toggleCity(city)}
                      className={`cursor-pointer rounded-full border px-4 py-2 font-outfit text-xs font-medium transition sm:text-sm ${
                        selected
                          ? "border-mango bg-mango/15 text-mango"
                          : "border-zinc-700 text-zinc-300 hover:border-zinc-500 hover:text-white"
                      }`}
                      aria-pressed={selected}
                    >
                      {city}
                    </motion.button>
                  );
                })}
              </motion.div>
            </motion.fieldset>

            <motion.div variants={fadeUp} className="sm:col-span-2">
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
            </motion.div>

            {error && (
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="sm:col-span-2 font-outfit text-sm text-red-400"
                role="alert"
              >
                {error}
              </motion.p>
            )}

            <motion.div variants={fadeUp} className="sm:col-span-2">
              <button
                type="submit"
                className="group relative inline-flex cursor-pointer items-center justify-center overflow-hidden rounded-full bg-mango px-8 py-4 font-outfit text-sm font-semibold text-black shadow-[0_0_40px_-10px_rgba(255,163,10,0.55)] transition-all duration-500 hover:scale-[1.03] hover:shadow-[0_0_60px_-8px_rgba(255,163,10,0.8)] w-full sm:w-auto sm:min-w-[280px]"
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
                <span className="relative z-10 flex items-center gap-2.5">
                  Get My Quote — within 4 hours
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5"
                    strokeWidth={2.5}
                  />
                </span>
              </button>
            </motion.div>
          </motion.form>
        )}
      </motion.div>

      <motion.div
        ref={closingRef}
        className="relative z-10 mx-auto mt-16 flex max-w-6xl flex-col items-center border-t border-zinc-800/80 px-4 pt-14 text-center sm:mt-20 sm:px-6 sm:pt-16 md:px-8 md:pt-20"
      >
        <p className="corp-closing-reveal max-w-2xl font-outfit text-base leading-relaxed text-zinc-300 sm:text-lg">
          Or skip the form and just WhatsApp our B2B line. We answer.
        </p>
        <motion.a
          href={CORPORATE_B2B_WHATSAPP}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.03, y: -4 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 320, damping: 20 }}
          className="corp-closing-reveal group mt-8 inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border border-white/40 bg-white/5 px-8 py-4 font-outfit text-sm font-semibold text-white backdrop-blur-sm transition hover:border-white/60 hover:bg-white/10 hover:shadow-[0_0_35px_-12px_rgba(255,163,10,0.35)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50"
        >
          <MessageCircle
            className="h-5 w-5 shrink-0 text-white transition-colors duration-300 group-hover:text-mango"
            strokeWidth={2.25}
          />
          WhatsApp Our B2B Line
        </motion.a>
      </motion.div>
    </section>
  );
}
