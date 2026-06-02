// website/components/Step.tsx
import { ReactNode } from "react";
import { ExternalLink } from "lucide-react";

export default function Step({
  num,
  title,
  children,
  action,
}: {
  num: string;
  title: string;
  children?: ReactNode;
  action?: { label: string; href: string };
}) {
  return (
    <div className="relative flex gap-4">
      <div
        className="relative z-10 shrink-0 w-12 h-12 flex items-center justify-center border font-[var(--font-ibm-mono)] text-[9px] tracking-[0.2em] text-[#1DD3B0]"
        style={{ backgroundColor: "#080C18", borderColor: "rgba(29,211,176,0.35)", boxShadow: "0 0 10px rgba(29,211,176,0.12)" }}
      >
        {num}
      </div>
      <div
        className="relative flex-1 p-5 border border-[#1DD3B0]/10 hover:border-[#1DD3B0]/28 transition-colors duration-200"
        style={{ backgroundColor: "rgba(13,21,38,0.55)" }}
      >
        <div className="absolute top-0 left-0 right-0 h-px opacity-22" style={{ background: "linear-gradient(90deg, #1DD3B0, transparent)" }} />
        <h3 className="font-[var(--font-rajdhani)] text-base font-bold tracking-[0.15em] text-[#E8EAF6] mb-1.5">{title}</h3>
        <div className="font-[var(--font-inter)] text-xs text-[#B0B8CC] leading-relaxed">{children}</div>
        {action && (
          <a
            href={action.href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-1.5 font-[var(--font-ibm-mono)] text-[8px] tracking-[0.3em] text-[#1DD3B0]/55 hover:text-[#1DD3B0] transition-colors uppercase"
          >
            {action.label}
            <ExternalLink className="w-2.5 h-2.5" />
          </a>
        )}
      </div>
    </div>
  );
}
