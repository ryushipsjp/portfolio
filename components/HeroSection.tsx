"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const TERMINAL_LINES = [
  { type: "cmd", text: "whoami" },
  { type: "out", text: "Ryusuke Mori — Automation Designer" },
  { type: "cmd", text: "status --freelance" },
  { type: "out", text: "✓  Available for new projects" },
];

export default function HeroSection() {
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [cursor, setCursor] = useState(true);

  useEffect(() => {
    const id = setInterval(() => setCursor((c) => !c), 530);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (lineIdx >= TERMINAL_LINES.length) return;
    const line = TERMINAL_LINES[lineIdx];
    if (charIdx < line.text.length) {
      const delay = line.type === "cmd" ? 55 : 22;
      const t = setTimeout(() => setCharIdx((c) => c + 1), delay);
      return () => clearTimeout(t);
    }
    const pause = line.type === "cmd" ? 280 : 480;
    const t = setTimeout(() => {
      setLineIdx((i) => i + 1);
      setCharIdx(0);
    }, pause);
    return () => clearTimeout(t);
  }, [lineIdx, charIdx]);

  return (
    <section className="min-h-screen flex flex-col justify-center px-5 pt-24 pb-16 max-w-5xl mx-auto">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="mb-10"
      >
        <p className="font-mono text-[#666] text-xs tracking-[0.3em] uppercase mb-4">
          // Portfolio 2025
        </p>
        <h1 className="font-mono text-[clamp(2.2rem,8vw,4.5rem)] font-bold leading-[1.1] text-[#e2e2e2] mb-5">
          Build smarter.
          <br />
          <span className="text-[#00ff88]">Automate more.</span>
        </h1>
        <p className="text-[#666] text-base md:text-lg max-w-md leading-relaxed">
          広告代理店発のAI自動化エンジニア。<br />
          実務経験とコードで、業務を根本から変える。
        </p>
      </motion.div>

      {/* Terminal window */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.25 }}
        className="bg-[#0f0f0f] border border-[#1e1e1e] rounded-xl overflow-hidden w-full max-w-lg"
      >
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-3 bg-[#161616] border-b border-[#1e1e1e]">
          <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
          <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
          <span className="font-mono text-[#555] text-xs ml-2">
            ryusu — zsh
          </span>
        </div>

        {/* Body */}
        <div className="p-5 font-mono text-sm min-h-[190px] space-y-1">
          {TERMINAL_LINES.slice(0, lineIdx).map((line, i) => (
            <div key={i}>
              {line.type === "cmd" ? (
                <p className="text-[#e2e2e2]">
                  <span className="text-[#00ff88] select-none">$ </span>
                  {line.text}
                </p>
              ) : (
                <p className="text-[#00ff88] pl-4 pb-1">{line.text}</p>
              )}
            </div>
          ))}
          {lineIdx < TERMINAL_LINES.length && (
            <div>
              {TERMINAL_LINES[lineIdx].type === "cmd" ? (
                <p className="text-[#e2e2e2]">
                  <span className="text-[#00ff88] select-none">$ </span>
                  {TERMINAL_LINES[lineIdx].text.slice(0, charIdx)}
                  <span
                    className={`inline-block w-[7px] h-[14px] bg-[#00ff88] align-middle translate-y-[-1px] ml-[1px] transition-opacity ${
                      cursor ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </p>
              ) : (
                <p className="text-[#00ff88] pl-4">
                  {TERMINAL_LINES[lineIdx].text.slice(0, charIdx)}
                  <span
                    className={`inline-block w-[7px] h-[14px] bg-[#00ff88] align-middle translate-y-[-1px] ml-[1px] transition-opacity ${
                      cursor ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </p>
              )}
            </div>
          )}
          {lineIdx >= TERMINAL_LINES.length && (
            <p className="text-[#e2e2e2]">
              <span className="text-[#00ff88] select-none">$ </span>
              <span
                className={`inline-block w-[7px] h-[14px] bg-[#00ff88] align-middle translate-y-[-1px] transition-opacity ${
                  cursor ? "opacity-100" : "opacity-0"
                }`}
              />
            </p>
          )}
        </div>
      </motion.div>

      {/* Stats row */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.0, duration: 0.8 }}
        className="flex gap-8 mt-12"
      >
        {[
          { n: "3+", l: "年のAI活用" },
          { n: "10+", l: "自動化プロジェクト" },
          { n: "5", l: "MCP連携サービス" },
        ].map((s) => (
          <div key={s.l}>
            <p className="font-mono text-2xl font-bold text-[#00ff88]">{s.n}</p>
            <p className="text-[#666] text-xs mt-1">{s.l}</p>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
