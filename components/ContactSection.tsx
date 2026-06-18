"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionLabel from "./SectionLabel";

export default function ContactSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="contact" ref={ref} className="py-24 px-5 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="border border-[#1e1e1e] rounded-2xl p-8 md:p-14 bg-[#0f0f0f] text-center relative overflow-hidden"
      >
        {/* BG glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#00ff88]/[0.03] rounded-full blur-3xl" />
        </div>

        <SectionLabel>Contact</SectionLabel>

        <h2 className="font-mono text-2xl md:text-4xl font-bold text-[#e2e2e2] mt-4 mb-5 leading-snug">
          自動化で、<br />
          <span className="text-[#00ff88]">あなたのビジネスを変えませんか。</span>
        </h2>
        <p className="text-[#44aa77] text-sm leading-relaxed max-w-md mx-auto mb-10">
          副業・フリーランス案件を受け付けています。
          AI自動化・広告運用効率化・Google Workspace連携など、
          まずはお気軽にご相談ください。
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="mailto:your@email.com"
            className="font-mono text-sm bg-[#00ff88] text-[#0a0a0a] font-bold px-8 py-4 rounded-lg hover:bg-[#00cc6a] transition-colors duration-200"
          >
            メールで相談する →
          </a>
          <a
            href="https://x.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-sm border border-[#1e1e1e] text-[#888] px-8 py-4 rounded-lg hover:border-[#00ff88]/40 hover:text-[#e2e2e2] transition-all duration-200"
          >
            X (Twitter) で DM
          </a>
        </div>

        <p className="font-mono text-[#00cc66] text-xs mt-10">
          返信は通常1〜2営業日以内です
        </p>
      </motion.div>
    </section>
  );
}
