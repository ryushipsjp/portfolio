"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionLabel from "./SectionLabel";

const WORKS = [
  {
    num: "01",
    title: "市場調査エージェント",
    desc: "毎朝7時に自動起動。Perplexity で最新情報を収集 → Gemini で分析 → Google Drive に整理保存。完全ノーオペレーションで朝には結果が揃っている。",
    tags: ["Perplexity", "Gemini", "Google Drive", "Task Scheduler"],
    type: "個人開発",
  },
  {
    num: "02",
    title: "キャンペーン管理自動化",
    desc: "広告代理店での実務案件。入稿チェック・日次レポート生成・アラート通知をAI化。週15時間かかっていた作業を90%削減した。",
    tags: ["Claude", "Google Sheets", "Gmail API", "広告API"],
    type: "実務",
  },
  {
    num: "03",
    title: "MCP複合自動化システム",
    desc: "Claude Code + 5種のMCPサーバー（Perplexity・Gemini・Gmail・Drive・Sheets）を組み合わせた多段階パイプライン。自然言語で複雑な業務フローを実行。",
    tags: ["Claude Code", "MCP", "TypeScript", "Node.js"],
    type: "個人開発",
  },
];

export default function WorksSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="works" ref={ref} className="py-24 px-5 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <SectionLabel>Works</SectionLabel>
        <h2 className="font-mono text-2xl md:text-3xl font-bold text-[#e2e2e2] mt-2 mb-3">
          実績・プロジェクト
        </h2>
        <p className="text-[#555] text-sm mb-12 max-w-md">
          実務と個人開発で積み上げた、リアルな自動化の実績。
        </p>

        <div className="space-y-5">
          {WORKS.map((w, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.13, duration: 0.5 }}
              className="group border border-[#16281a] rounded-xl p-6 bg-[#091508] hover:border-[#00ff88]/30 transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row md:items-start gap-4">
                <div className="flex-shrink-0">
                  <span className="font-mono text-[#222] text-4xl font-bold group-hover:text-[#00ff88]/20 transition-colors duration-300">
                    {w.num}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <h3 className="font-mono text-[#e2e2e2] font-bold text-base">
                      {w.title}
                    </h3>
                    <span className="font-mono text-[10px] text-[#00ff88] border border-[#00ff88]/30 rounded px-2 py-0.5">
                      {w.type}
                    </span>
                  </div>
                  <p className="text-[#666] text-sm leading-relaxed mb-4">
                    {w.desc}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {w.tags.map((t) => (
                      <span
                        key={t}
                        className="font-mono text-[10px] text-[#666] border border-[#16281a] rounded px-2 py-0.5"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
