// website/components/FaqAccordion.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import type { Faq } from "@/lib/site";

export default function FaqAccordion({ items }: { items: Faq[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="space-y-2">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div
            key={item.q}
            className="border border-[#1DD3B0]/12 bg-[#0D1526]/40 transition-colors duration-200 hover:border-[#1DD3B0]/25"
          >
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left cursor-pointer"
            >
              <span className="font-[var(--font-rajdhani)] text-base md:text-lg font-bold tracking-[0.04em] text-[#E8EAF6]">
                {item.q}
              </span>
              <Plus
                className={`w-4 h-4 shrink-0 text-[#1DD3B0] transition-transform duration-300 ${
                  isOpen ? "rotate-45" : "rotate-0"
                }`}
              />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <p className="font-[var(--font-inter)] text-sm text-[#9AA7BE] leading-relaxed px-5 pb-5">
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
