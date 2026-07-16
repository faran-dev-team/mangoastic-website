/**
 * Single GSAP + ScrollTrigger registration for the marketing site.
 * Avoids repeated registerPlugin calls across every animated section
 * (same animations — less module-init / HMR churn).
 */
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

let scrollTriggerRegistered = false;

export function ensureGsapScrollTrigger(): typeof gsap {
  if (typeof window === "undefined") {
    return gsap;
  }
  if (!scrollTriggerRegistered) {
    gsap.registerPlugin(ScrollTrigger);
    scrollTriggerRegistered = true;
  }
  return gsap;
}

export { gsap, ScrollTrigger };
