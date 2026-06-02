// website/components/SectionLabel.tsx
export default function SectionLabel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`font-[var(--font-ibm-mono)] text-[9px] tracking-[0.45em] text-[#1DD3B0]/50 uppercase ${className}`}>
      {children}
    </p>
  );
}
