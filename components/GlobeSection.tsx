"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import SectionLabel from "./SectionLabel";

const Globe = dynamic(() => import("react-globe.gl"), { ssr: false });

const LIVED = [
  { city: "Tokyo", country: "Japan", lat: 35.6762, lng: 139.6503, label: "現在" },
  { city: "Birmingham", country: "UK", lat: 52.4862, lng: -1.8904, label: "居住歴" },
  { city: "Canberra", country: "Australia", lat: -35.2809, lng: 149.1300, label: "居住歴" },
  { city: "New York", country: "USA", lat: 40.7128, lng: -74.006, label: "居住歴" },
];

const VISITED = [
  { city: "Stockholm", country: "Sweden", lat: 59.3293, lng: 18.0686 },
  { city: "Helsinki", country: "Finland", lat: 60.1699, lng: 24.9384 },
  { city: "Tallinn", country: "Estonia", lat: 59.4370, lng: 24.7536 },
  { city: "Vilnius", country: "Lithuania", lat: 54.6872, lng: 25.2797 },
  { city: "Warsaw", country: "Poland", lat: 52.2297, lng: 21.0122 },
  { city: "Budapest", country: "Hungary", lat: 47.4979, lng: 19.0402 },
  { city: "Vienna", country: "Austria", lat: 48.2082, lng: 16.3738 },
  { city: "Luxembourg", country: "Luxembourg", lat: 49.6117, lng: 6.1319 },
  { city: "Frankfurt", country: "Germany", lat: 50.1109, lng: 8.6821 },
  { city: "Copenhagen", country: "Denmark", lat: 55.6761, lng: 12.5683 },
  { city: "Sydney", country: "Australia", lat: -33.8688, lng: 151.2093 },
  { city: "Melbourne", country: "Australia", lat: -37.8136, lng: 144.9631 },
  { city: "Gold Coast", country: "Australia", lat: -28.0167, lng: 153.4000 },
];

const ALL_POINTS = [
  ...LIVED.map((d) => ({ ...d, type: "lived" })),
  ...VISITED.map((d) => ({ ...d, type: "visited" })),
];

const ARCS = LIVED.slice(1).map((dest) => ({
  startLat: LIVED[0].lat,
  startLng: LIVED[0].lng,
  endLat: dest.lat,
  endLng: dest.lng,
  color: ["#00ff88", "#00ff8844"],
}));

export default function GlobeSection() {
  const globeRef = useRef<any>(null);
  const [ready, setReady] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState(400);

  useEffect(() => {
    const update = () => {
      if (containerRef.current) {
        setSize(Math.min(containerRef.current.offsetWidth, 560));
      }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    if (!globeRef.current || !ready) return;
    const ctrl = globeRef.current.controls();
    ctrl.autoRotate = true;
    ctrl.autoRotateSpeed = 0.5;
    ctrl.enableZoom = false;
    globeRef.current.pointOfView({ lat: 30, lng: 60, altitude: 2.0 }, 0);
  }, [ready]);

  return (
    <section className="py-24 px-5 max-w-5xl mx-auto">
      <SectionLabel>World Map</SectionLabel>
      <h2 className="font-mono text-2xl md:text-3xl font-bold text-[#e2e2e2] mt-2 mb-3">
        居住 & 旅行歴
      </h2>
      <p className="text-[#44aa77] text-sm mb-10 max-w-lg">
        4都市に居住、17都市を訪問。世界を肌で知ることがアイデアの源泉。
      </p>

      <div className="flex flex-col lg:flex-row items-start gap-10">
        {/* Globe */}
        <div ref={containerRef} className="w-full lg:w-auto flex-shrink-0 flex justify-center">
          <div style={{ width: size, height: size }} className="relative">
            <div className="absolute inset-0 rounded-full border border-[#00ff88]/10 animate-ping pointer-events-none" style={{ animationDuration: "3s" }} />
            <div className="absolute inset-6 rounded-full border border-[#00ff88]/5 animate-ping pointer-events-none" style={{ animationDuration: "4.5s", animationDelay: "1.2s" }} />
            <Globe
              ref={globeRef}
              width={size}
              height={size}
              backgroundColor="rgba(0,0,0,0)"
              globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
              atmosphereColor="#00ff88"
              atmosphereAltitude={0.15}
              pointsData={ALL_POINTS}
              pointLat="lat"
              pointLng="lng"
              pointAltitude={(d: any) => d.type === "lived" ? 0.06 : 0.02}
              pointRadius={(d: any) => d.type === "lived" ? 0.7 : 0.35}
              pointColor={(d: any) => d.type === "lived" ? "#00ff88" : "#00aaff"}
              pointLabel={(d: any) =>
                `<div style="background:#0a0a0a;border:1px solid ${d.type === "lived" ? "#00ff88" : "#00aaff"};padding:4px 10px;border-radius:4px;font-family:monospace;font-size:11px;color:${d.type === "lived" ? "#00ff88" : "#00aaff"}">${d.city}<br/><span style="color:#666">${d.country}${d.label ? " · " + d.label : " · 訪問"}</span></div>`
              }
              arcsData={ARCS}
              arcStartLat="startLat"
              arcStartLng="startLng"
              arcEndLat="endLat"
              arcEndLng="endLng"
              arcColor="color"
              arcDashLength={0.4}
              arcDashGap={0.2}
              arcDashAnimateTime={2000}
              arcStroke={0.4}
              onGlobeReady={() => setReady(true)}
            />
          </div>
        </div>

        {/* Lists */}
        <div className="w-full flex-1 space-y-6">
          {/* Lived */}
          <div>
            <p className="font-mono text-[#00ff88] text-xs tracking-wider mb-3">// 居住歴</p>
            <div className="space-y-2">
              {LIVED.map((loc, i) => (
                <motion.div
                  key={loc.city}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  className="flex items-center gap-3 border border-[#1e1e1e] rounded-lg px-4 py-3 bg-[#0f0f0f] hover:border-[#00ff88]/30 transition-colors"
                >
                  <span className="text-[#00ff88] text-xs">●</span>
                  <span className="font-mono text-[#e2e2e2] text-sm flex-1">{loc.city}</span>
                  <span className="font-mono text-[#00cc66] text-xs">{loc.country}</span>
                  <span className={`font-mono text-[9px] px-1.5 py-0.5 rounded border ${loc.label === "現在" ? "text-[#00ff88] border-[#00ff88]/30" : "text-[#00cc66] border-[#333]"}`}>
                    {loc.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Visited */}
          <div>
            <p className="font-mono text-[#00aaff] text-xs tracking-wider mb-3">// 訪問歴</p>
            <div className="flex flex-wrap gap-2">
              {VISITED.map((loc, i) => (
                <motion.span
                  key={loc.city}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04, duration: 0.3 }}
                  className="font-mono text-xs text-[#00aaff] border border-[#00aaff]/20 rounded px-2.5 py-1 bg-[#00aaff]/5 hover:border-[#00aaff]/50 transition-colors cursor-default"
                >
                  {loc.city}
                </motion.span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
