"use client";

import { TRUST_MICROCOPY } from "@/data/microcopy";
import { useEffect, useState } from "react";

type TrustMicrocopyProps = {
  className?: string;
};

export default function TrustMicrocopy({ className = "" }: TrustMicrocopyProps) {
  const [line, setLine] = useState<string>(TRUST_MICROCOPY[0]);

  useEffect(() => {
    const index = Math.floor(Math.random() * TRUST_MICROCOPY.length);
    setLine(TRUST_MICROCOPY[index]!);
  }, []);

  return (
    <p
      className={`font-outfit text-xs leading-relaxed text-zinc-500 sm:text-sm ${className}`}
      aria-live="polite"
    >
      {line}
    </p>
  );
}
