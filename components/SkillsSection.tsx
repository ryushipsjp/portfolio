"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionLabel from "./SectionLabel";

const SKILL_GROUPS = [
  {
    category: "AI / LLM",
    skills: ["Claude / Claude Code", "Gemini Pro", "GPT-4o", "Perplexity"],
  },
  {
    category: "Automation",
    skills: ["MCP (Model Context Protocol)", "Python", "TypeScript", "REST API連携"],
  },
  {
    category: "Google Workspace",
    skills: ["Gmail API", "Google Drive API", "Google Sheets API", "Calendar API"],
  },
  {
    category: "Ad-Tech",
    skills: ["Google Ads", "Meta Ads", "キャンペーン管理", "広告レポート自動化"],
  },
  {
    category: "Infra / Tools",
    skills: ["PowerShell", "Windows Task Scheduler", "Next.js", "Tailwind CSS"],
  },
];

export default function SkillsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="skills" ref={ref} className="py-24 px-5 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <SectionLabel>Skills</SectionLabel>
        <h2 className="font-mono text-2xl md:text-3xl font-bold text-[#e2e2e2] mt-2 mb-3">
          技術スタック
        </h2>
        <p className="text-[#00cc66] text-sm mb-12 max-w-md">
          実務と個人開発で実際に使い込んだツール・技術のみを記載。
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SKILL_GROUPS.map((group, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.08 + i * 0.09, duration: 0.5 }}
              className="border border-[#1e1e1e] rounded-xl p-5 bg-[#0f0f0f]"
            >
              <p className="font-mono text-[#00ff88] text-xs mb-4 tracking-wider">
                {group.category}
              </p>
              <ul className="space-y-2">
                {group.skills.map((skill) => (
                  <li key={skill} className="flex items-center gap-2">
                    <span className="text-[#00ff88] text-xs">▸</span>
                    <span className="text-[#777] text-sm">{skill}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
