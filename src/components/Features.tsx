"use client";

import { Heart, Truck, CheckCircle, Phone } from "lucide-react";

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

export default function Features() {
  return (
    <section className="bg-black px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div
              key={index}
              className="flex flex-col items-center text-center sm:items-start sm:text-left"
            >
              <Icon
                className="mb-4 h-10 w-10 text-amber-500"
                strokeWidth={1.5}
              />
              <h3 className="font-outfit text-sm font-semibold text-white">
                {feature.title}
              </h3>
              <p className="mt-2 font-outfit text-xs text-gray-400">
                {feature.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
