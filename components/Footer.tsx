export default function Footer() {
  return (
    <footer className="border-t border-[#16281a] py-8 px-5">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-mono text-[#555] text-xs">
          © 2025 Ryusuke Mori. All rights reserved.
        </p>
        <p className="font-mono text-[#444] text-xs">
          Built with Next.js · Tailwind · Framer Motion
        </p>
      </div>
    </footer>
  );
}
