export default function SectionLabel({ children }: { children: string }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <span className="font-mono text-[#00ff88] text-xs">//</span>
      <span className="font-mono text-[#555] text-xs tracking-widest uppercase">
        {children}
      </span>
    </div>
  );
}
