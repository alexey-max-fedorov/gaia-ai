// website/components/SectionHeading.tsx
"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

export default function SectionHeading({
  label,
  title,
  description,
  align = "left",
  className = "",
}: {
  label: string;
  title: ReactNode;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  const alignment = align === "center" ? "text-center mx-auto items-center" : "text-left";
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6 }}
      className={`flex flex-col ${alignment} ${className}`}
    >
      <p className="font-[var(--font-ibm-mono)] text-[9px] tracking-[0.45em] text-[#1DD3B0]/50 uppercase mb-4">
        {label}
      </p>
      <h2 className="font-[var(--font-rajdhani)] text-3xl md:text-4xl font-bold tracking-[0.1em] text-[#E8EAF6] leading-tight">
        {title}
      </h2>
      {description && (
        <p
          className={`font-[var(--font-inter)] text-[#9AA7BE] text-sm md:text-base leading-relaxed mt-3 max-w-xl ${
            align === "center" ? "mx-auto" : ""
          }`}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}
