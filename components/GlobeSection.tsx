"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import SectionLabel from "./SectionLabel";

const Globe = dynamic(() => import("react-globe.gl"), { ssr: false });

const LOCATIONS = [
  { city: "Tokyo", country: "Japan", lat: 35.6762, lng: 139.6503, period: "現在" },
  { city: "London", country: "UK", lat: 51.5074, lng: -0.1278, period: "居住歴" },
  { city: "Sydney", country: "Australia", lat: -33.8688, lng: 151.2093, period: "居住歴" },
  { city: "New York", country: "USA", lat: 40.7128, lng: -74.006, period: "居住歴" },
];

const ARCS = LOCATIONS.slice(1).map((dest) => ({
  startLat: LOCATIONS[0].lat,
  startLng: LOCATIONS[0].lng,
  endLat: dest.lat,
  endLng: dest.lng,
  color: ["#00ff88", "#00ff8855"],
}));

export default function GlobeSection() {
  const globeRef = useRef<any>(null);
  const [ready, setReady] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState(400);

  useEffect(() => {
    const update = () => {
      if (containerRef.current) {
        const w = containerRef.current.offsetWidth;
        setSize(Math.min(w, 560));
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
    ctrl.autoRotateSpeed = 0.6;
    ctrl.enableZoom = false;
    globeRef.current.pointOfView({ lat: 25, lng: 120, altitude: 2.2 }, 0);
  }, [ready]);

  return (
    <section className="py-24 px-5 max-w-5xl mx-auto">
      <SectionLabel>Lived In</SectionLabel>
      <h2 className="font-mono text-2xl md:text-3xl font-bold text-[#e2e2e2] mt-2 mb-3">
        居住歴
      </h2>
      <p className="text-[#666] text-sm mb-10 max-w-md">
        東京・ロンドン・シドニー・ニューヨーク。4都市を渡り歩いた経験が視点の幅をつくる。
      </p>

      <div className="flex flex-col md:flex-row items-center gap-10">
        {/* Globe */}
        <div ref={containerRef} className="w-full md:w-auto flex-shrink-0 flex justify-center">
          <div
            style={{ width: size, height: size }}
            className="relative"
          >
            {/* Spy scan ring */}
            <div className="absolute inset-0 rounded-full border border-[#00ff88]/10 animate-ping pointer-events-none" style={{ animationDuration: "3s" }} />
            <div className="absolute inset-4 rounded-full border border-[#00ff88]/5 animate-ping pointer-events-none" style={{ animationDuration: "4s", animationDelay: "1s" }} />

            <Globe
              ref={globeRef}
              width={size}
              height={size}
              backgroundColor="rgba(0,0,0,0)"
              globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
              atmosphereColor="#00ff88"
              atmosphereAltitude={0.15}
              pointsData={LOCATIONS}
              pointLat="lat"
              pointLng="lng"
              pointAltitude={0.04}
              pointRadius={0.6}
              pointColor={() => "#00ff88"}
              pointLabel={(d: any) =>
                `<div style="background:#0a0a0a;border:1px solid #00ff88;padding:4px 8px;border-radius:4px;font-family:monospace;font-size:11px;color:#00ff88">${d.city}<br/><span style="color:#666">${d.country} · ${d.period}</span></div>`
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

        {/* City list */}
        <div className="w-full md:flex-1 space-y-3">
          {LOCATIONS.map((loc, i) => (
            <motion.div
              key={loc.city}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="flex items-center gap-4 border border-[#1e1e1e] rounded-lg px-5 py-4 bg-[#0f0f0f] hover:border-[#00ff88]/30 transition-colors duration-300"
            >
              <span className="font-mono text-[#00ff88] text-lg">●</span>
              <div className="flex-1">
                <p className="font-mono text-[#e2e2e2] font-bold text-sm">{loc.city}</p>
                <p className="font-mono text-[#666] text-xs">{loc.country}</p>
              </div>
              <span className={`font-mono text-[10px] px-2 py-0.5 rounded border ${loc.period === "現在" ? "text-[#00ff88] border-[#00ff88]/40" : "text-[#666] border-[#333]"}`}>
                {loc.period}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
