"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionLabel from "./SectionLabel";

const SERVICES = [
  {
    icon: "⚡",
    title: "AI業務自動化",
    desc: "繰り返し業務をAIエージェントで自動化。Claude + MCP の多段階パイプラインで、人手のかかる作業を0に近づけます。",
    tags: ["Claude Code", "MCP", "Python"],
  },
  {
    icon: "📊",
    title: "広告 × AI運用",
    desc: "キャンペーン管理・レポート生成・入稿チェックをAI化。広告代理店での実務経験を活かし、広告運用の効率を根本から改善します。",
    tags: ["Google Ads", "Meta Ads", "自動レポート"],
  },
  {
    icon: "🔗",
    title: "Google Workspace連携",
    desc: "Gmail・Drive・Sheets・Calendarを横断するワークフロー自動化。APIを使ったフル連携で、ツール間の手作業をゼロに。",
    tags: ["Gmail API", "Google Drive", "Sheets"],
  },
];

export default function ServicesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="services" ref={ref} className="py-24 px-5 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <SectionLabel>Services</SectionLabel>
        <h2 className="font-mono text-2xl md:text-3xl font-bold text-[#e2e2e2] mt-2 mb-3">
          提供できること
        </h2>
        <p className="text-[#00cc66] text-sm mb-12 max-w-md">
          実務経験と個人開発の両方から生まれた、即戦力の自動化サービス。
        </p>

        <div className="grid md:grid-cols-3 gap-5">
          {SERVICES.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.12, duration: 0.5 }}
              className="group border border-[#1e1e1e] rounded-xl p-6 bg-[#0f0f0f] hover:border-[#00ff88]/40 hover:bg-[#0f0f0f] transition-all duration-300 cursor-default"
            >
              <span className="text-3xl mb-5 block">{s.icon}</span>
              <h3 className="font-mono text-[#e2e2e2] font-bold text-base mb-3">
                {s.title}
              </h3>
              <p className="text-[#44aa77] text-sm leading-relaxed mb-5">{s.desc}</p>
              <div className="flex flex-wrap gap-2">
                {s.tags.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-[10px] text-[#44aa77] border border-[#222] rounded px-2 py-0.5 group-hover:border-[#00ff88]/20 group-hover:text-[#00ff88]/60 transition-colors duration-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
