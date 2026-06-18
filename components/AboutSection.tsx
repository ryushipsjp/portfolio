"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import SectionLabel from "./SectionLabel";

const HIGHLIGHTS = [
  {
    tag: "広告代理店",
    desc: "キャンペーン管理・レポート作成をAIで完全自動化。実務で成果を出してきた。",
  },
  {
    tag: "個人開発",
    desc: "Claude Code + 5種のMCPサーバーによる複合自動化エージェントを設計・運用。",
  },
  {
    tag: "Google Workspace",
    desc: "Gmail・Drive・Sheets・Calendarを横断するワークフロー自動化システムを構築。",
  },
];

export default function AboutSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" ref={ref} className="py-24 px-5 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <SectionLabel>About</SectionLabel>

        {/* Profile card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="flex items-center gap-5 bg-[#091508] border border-[#16281a] rounded-2xl p-5 mt-8 mb-10 max-w-sm"
        >
          {/* Avatar */}
          <div className="relative flex-shrink-0 w-20 h-20 rounded-full overflow-hidden border-2 border-[#00ff88]/30 bg-[#0d1e0e]">
            <Image
              src="/avatar.png"
              alt="ryusu avatar"
              fill
              className="object-cover object-top scale-[1.15]"
              priority
            />
          </div>

          {/* Info */}
          <div>
            <div className="flex items-center gap-2 mb-1">
              <p className="font-mono font-bold text-[#00ff88] text-base">Ryusuke Mori</p>
              <span className="font-mono text-[10px] text-[#00ff88] border border-[#00ff88]/40 rounded-full px-2 py-0.5">
                Available
              </span>
            </div>
            <p className="font-mono text-[#888] text-xs mb-2">Automation Designer</p>
            <div className="flex flex-wrap gap-1.5">
              {["広告代理店", "Claude Code", "MCP"].map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[9px] text-[#777] border border-[#333] rounded px-1.5 py-0.5"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Left */}
          <div>
            <h2 className="font-mono text-2xl md:text-3xl font-bold text-[#e2e2e2] leading-snug mb-6">
              広告の現場と<br />
              AIエンジニアリングを
              <br />
              <span className="text-[#00ff88]">両軸で持つ。</span>
            </h2>
            <p className="text-[#666] text-sm leading-relaxed mb-4">
              Amazon Japanでブランドの売上成長に従事。転職後の現在は、
              広告系でAIによる業務フローの自動化に従事している。
            </p>
            <p className="text-[#666] text-sm leading-relaxed mb-6">
              Claude Code + MCPを核に、Google Workspaceを横断する
              複合自動化システムを設計・運用。ビジネス感覚と
              技術実装の両軸で課題を解決します。
            </p>
            <a
              href="#contact"
              className="inline-flex font-mono text-xs text-[#00ff88] border border-[#00ff88] px-5 py-2.5 rounded hover:bg-[#00ff88] hover:text-[#060e08] transition-all duration-200"
            >
              話を聞いてみる →
            </a>
          </div>

          {/* Right */}
          <div className="space-y-3">
            {HIGHLIGHTS.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.12, duration: 0.5 }}
                className="border border-[#16281a] rounded-lg p-4 bg-[#091508] hover:border-[#00ff88]/30 transition-colors duration-300"
              >
                <p className="font-mono text-[#00ff88] text-xs mb-2">{item.tag}</p>
                <p className="text-[#777] text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
