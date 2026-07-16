"use client";

import { Heart, Truck, CheckCircle, Phone } from "lucide-react";
import { motion, Variants } from "framer-motion";

const features = [
  {
    icon: Heart,
    title: "Hand-picked yesterday",
    description: "Fresh from our orchard",
  },
  {
    icon: Truck,
    title: "Same-day dispatch in Islamabad, Pindi, Lahore, Karachi",
    description: "Quick delivery to your door",
  },
  {
    icon: CheckCircle,
    title: "100% replacement on quality",
    description: "We stand by our fruit",
  },
  {
    icon: Phone,
    title: "We call when your box arrives",
    description: "Personalized service always",
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
    },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: "easeOut",
    },
  },
};

export default function Features() {
  return (
    <section className="relative overflow-hidden bg-black px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
      {/* Ambient Background Glow */}
      <div className="absolute left-[-10%] top-0 h-[280px] w-[280px] rounded-full bg-mango/10 blur-3xl" />

      <div className="absolute bottom-[-20%] right-[-10%] h-[320px] w-[320px] rounded-full bg-orange-500/10 blur-3xl" />

      {/* Top Gradient Divider */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
      >
        {features.map((feature, index) => {
          const Icon = feature.icon;

          return (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{
                y: -8,
                scale: 1.02,
              }}
              transition={{
                type: "spring",
                stiffness: 220,
                damping: 18,
              }}
              className="group relative overflow-hidden rounded-3xl border border-white/5 bg-white/[0.03] p-6 backdrop-blur-xl"
            >
              {/* Hover Glow */}
              <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <div className="absolute inset-0 bg-gradient-to-br from-mango/10 via-transparent to-orange-500/5" />
              </div>

              {/* Subtle Border Glow */}
              <div className="absolute inset-0 rounded-3xl border border-transparent transition-all duration-500 group-hover:border-mango/20" />

              {/* Icon */}
              <div className="relative z-10 mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-mango/20 bg-mango/10">
                <Icon className="h-7 w-7 text-mango" strokeWidth={1.7} />
              </div>

              {/* Content */}
              <div className="relative z-10">
                <h3 className="font-outfit text-sm font-semibold leading-relaxed text-white">
                  {feature.title}
                </h3>

                <p className="mt-3 font-outfit text-xs leading-relaxed text-zinc-400">
                  {feature.description}
                </p>
              </div>

              {/* Premium Shine */}
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
                <div className="absolute -left-[120%] top-0 h-full w-[80%] rotate-12 bg-gradient-to-r from-transparent via-white/10 to-transparent transition-all duration-1000 group-hover:left-[140%]" />
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
