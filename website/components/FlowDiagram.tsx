// website/components/FlowDiagram.tsx
"use client";

import { motion } from "framer-motion";
import { SPACE_FILES } from "@/lib/site";

const gate = SPACE_FILES.find((f) => f.deploy === "paste")!;
const uploads = SPACE_FILES.filter((f) => f.deploy === "upload");

function Node({
  file,
  role,
  summary,
  tag,
  accent,
  index,
}: {
  file: string;
  role: string;
  summary: string;
  tag: string;
  accent: "teal" | "blue";
  index: number;
}) {
  const code = accent === "teal" ? "text-[#1DD3B0]" : "text-[#7DD3FC]";
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ delay: 0.2 + index * 0.12, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="group relative h-full overflow-hidden border border-[#1DD3B0]/18 bg-[#0D1526]/70 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#1DD3B0]/45 hover:shadow-[0_10px_40px_-12px_rgba(29,211,176,0.35)]"
    >
      <div
        aria-hidden
        className="absolute top-0 left-0 right-0 h-px opacity-50"
        style={{ background: "linear-gradient(90deg, #1DD3B0, transparent)" }}
      />
      <span className="inline-block font-[var(--font-ibm-mono)] text-[7px] tracking-[0.3em] text-[#1DD3B0]/55 uppercase border border-[#1DD3B0]/22 px-1.5 py-0.5 mb-3">
        {tag}
      </span>
      <code className={`block font-[var(--font-ibm-mono)] text-sm ${code} mb-1`}>{file}</code>
      <p className="font-[var(--font-rajdhani)] text-[10px] font-bold tracking-[0.2em] text-[#E8EAF6]/55 uppercase mb-2">
        {role}
      </p>
      <p className="font-[var(--font-inter)] text-xs text-[#8A98B0] leading-relaxed">{summary}</p>
    </motion.div>
  );
}

const lineGrad = { background: "linear-gradient(180deg, #1DD3B0, rgba(29,211,176,0.15))" };

export default function FlowDiagram() {
  return (
    <div className="relative">
      {/* Gate node */}
      <div className="max-w-md mx-auto">
        <Node
          file={gate.file}
          role={gate.role}
          summary={gate.summary}
          tag="PASTE → SPACE INSTRUCTIONS"
          accent="teal"
          index={0}
        />
      </div>

      {/* Vertical stem from gate */}
      <div className="flex justify-center">
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-px h-10 origin-top"
          style={lineGrad}
        />
      </div>

      {/* Horizontal bus (md+) */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
        className="hidden md:block h-px w-2/3 mx-auto origin-center"
        style={{ background: "linear-gradient(90deg, transparent, #1DD3B0, transparent)" }}
      />

      {/* Three engine nodes with drop lines */}
      <div className="grid md:grid-cols-3 gap-4 md:gap-5 mt-0">
        {uploads.map((f, i) => (
          <div key={f.id} className="flex flex-col items-center">
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.4, ease: "easeOut" }}
              className="hidden md:block w-px h-8 origin-top"
              style={lineGrad}
            />
            {/* Mobile connector */}
            <div className="md:hidden flex justify-center w-full">
              <div className="w-px h-6" style={lineGrad} />
            </div>
            <div className="w-full">
              <Node
                file={f.file}
                role={f.role}
                summary={f.summary}
                tag="UPLOAD → SPACE FILE"
                accent="blue"
                index={i + 1}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
