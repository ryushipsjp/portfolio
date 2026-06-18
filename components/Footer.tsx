export default function Footer() {
  return (
    <footer className="border-t border-[#1e1e1e] py-8 px-5">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-mono text-[#333] text-xs">
          © 2025 ryusu. All rights reserved.
        </p>
        <p className="font-mono text-[#222] text-xs">
          Built with Next.js · Tailwind · Framer Motion
        </p>
      </div>
    </footer>
  );
}
