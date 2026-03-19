"use client";

/**
 * ZipThreatRadar
 * Recharts RadarChart with Severity + Urgency overlaid series,
 * 3 stat cards, and a pulsing urgency callout.
 * Dark theme. Astro island compatible.
 *
 * Usage in Astro:
 *   import ZipThreatRadar from '@components/Blog/charts/ZipThreatRadar';
 *   <ZipThreatRadar client:visible />
 */

import React, { useEffect, useState } from "react";
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// ─── Data ────────────────────────────────────────────────────────────────────

const THREAT_SEVERITY = [
  { threat: "HNDL Attacks", severity: 95, urgency: 90 },
  { threat: "SS7 Exploits", severity: 85, urgency: 95 },
  { threat: "Quantum Decrypt", severity: 100, urgency: 70 },
  { threat: "Supply Chain", severity: 75, urgency: 80 },
  { threat: "Insider Threat", severity: 65, urgency: 60 },
  { threat: "Zero-Day PQC", severity: 80, urgency: 50 },
];

interface StatCard {
  value: string;
  label: string;
  sub: string;
  accent: string;
  shadow: string;
}

const STAT_CARDS: StatCard[] = [
  {
    value: "2030–2035",
    label: "Q-Day Estimate",
    sub: "Cryptographically-relevant quantum computer",
    accent: "#ef4444",
    shadow: "rgba(239,68,68,0.25)",
  },
  {
    value: "Active NOW",
    label: "HNDL Attacks",
    sub: "Harvest Now, Decrypt Later in operation",
    accent: "#f97316",
    shadow: "rgba(249,115,22,0.25)",
  },
  {
    value: "$4.88M",
    label: "Avg Breach Cost",
    sub: "IBM Cost of a Data Breach Report 2024",
    accent: "#eab308",
    shadow: "rgba(234,179,8,0.25)",
  },
];

// ─── Custom tooltip ───────────────────────────────────────────────────────────

interface TooltipPayloadItem {
  name: string;
  value: number;
  color: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  label?: string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div
      style={{
        background: "rgba(0,2,18,0.96)",
        border: "1px solid rgba(239,68,68,0.35)",
        borderRadius: 8,
        padding: "10px 14px",
        color: "#fff",
        fontSize: 13,
        minWidth: 160,
      }}
    >
      <div style={{ fontWeight: 700, marginBottom: 6, color: "rgba(255,255,255,0.9)" }}>
        {label}
      </div>
      {payload.map((item) => (
        <div
          key={item.name}
          style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}
        >
          <span
            style={{
              display: "inline-block",
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: item.color,
            }}
          />
          <span style={{ color: "rgba(255,255,255,0.65)", flex: 1 }}>{item.name}</span>
          <strong style={{ color: item.color }}>{item.value}%</strong>
        </div>
      ))}
    </div>
  );
};

// ─── Pulsing dot ─────────────────────────────────────────────────────────────

const PulsingDot: React.FC = () => {
  const [phase, setPhase] = useState(false);
  useEffect(() => {
    const id = setInterval(() => setPhase((p) => !p), 900);
    return () => clearInterval(id);
  }, []);

  return (
    <span
      style={{
        display: "inline-block",
        width: 10,
        height: 10,
        borderRadius: "50%",
        background: "#ef4444",
        boxShadow: phase
          ? "0 0 0 6px rgba(239,68,68,0.25), 0 0 14px rgba(239,68,68,0.5)"
          : "0 0 0 0px rgba(239,68,68,0), 0 0 6px rgba(239,68,68,0.3)",
        transition: "box-shadow 0.9s ease",
        flexShrink: 0,
        marginRight: 10,
        marginTop: 1,
      }}
    />
  );
};

// ─── Component ───────────────────────────────────────────────────────────────

const ZipThreatRadar: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      style={{
        position: "relative",
        margin: "2.5rem 0",
        background: "rgba(0,2,18,0.45)",
        border: "1px solid rgba(239,68,68,0.22)",
        borderRadius: 14,
        boxShadow: "0 4px 32px rgba(239,68,68,0.08)",
        overflow: "hidden",
        fontFamily: "inherit",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "1.25rem 1.5rem 0.85rem",
          borderBottom: "1px solid rgba(239,68,68,0.15)",
        }}
      >
        <h3
          style={{
            margin: 0,
            fontSize: "1.2rem",
            fontWeight: 700,
            background: "linear-gradient(135deg,#ef4444 0%,#f97316 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Threat Severity Radar
        </h3>
        <p
          style={{
            margin: "0.35rem 0 0",
            fontSize: "0.82rem",
            color: "rgba(255,255,255,0.4)",
          }}
        >
          Severity vs. Urgency across active quantum and classical threat vectors
        </p>
      </div>

      {/* Radar chart */}
      <div
        style={{
          padding: "1rem 1.5rem 0.5rem",
          opacity: mounted ? 1 : 0,
          transition: "opacity 0.5s ease",
        }}
      >
        <ResponsiveContainer width="100%" height={360}>
          <RadarChart data={THREAT_SEVERITY} margin={{ top: 12, right: 30, bottom: 12, left: 30 }}>
            <defs>
              <filter id="glow-radar" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <PolarGrid
              stroke="rgba(255,255,255,0.1)"
              gridType="polygon"
            />
            <PolarAngleAxis
              dataKey="threat"
              tick={{
                fill: "rgba(255,255,255,0.7)",
                fontSize: 12,
                fontWeight: 500,
              }}
            />
            <PolarRadiusAxis
              angle={30}
              domain={[0, 100]}
              tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 10 }}
              tickCount={5}
              axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
            />

            <Radar
              name="Severity"
              dataKey="severity"
              stroke="#ef4444"
              strokeWidth={2}
              fill="#ef4444"
              fillOpacity={0.35}
              dot={{ fill: "#ef4444", r: 4 }}
              filter="url(#glow-radar)"
            />
            <Radar
              name="Urgency"
              dataKey="urgency"
              stroke="#f97316"
              strokeWidth={2}
              fill="#f97316"
              fillOpacity={0.25}
              dot={{ fill: "#f97316", r: 4 }}
            />

            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{
                paddingTop: 12,
                color: "rgba(255,255,255,0.65)",
                fontSize: 13,
              }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Stat cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))",
          gap: "0.75rem",
          padding: "0.5rem 1.5rem 1.25rem",
        }}
      >
        {STAT_CARDS.map((card, i) => (
          <div
            key={card.label}
            style={{
              padding: "1rem 1.1rem",
              background: "rgba(0,2,18,0.55)",
              border: `1px solid ${card.accent}33`,
              borderRadius: 10,
              boxShadow: `0 0 20px ${card.shadow}`,
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(12px)",
              transition: `opacity 0.4s ${i * 120 + 200}ms ease, transform 0.4s ${i * 120 + 200}ms ease`,
            }}
          >
            <div
              style={{
                fontSize: "1.35rem",
                fontWeight: 800,
                color: card.accent,
                lineHeight: 1.1,
                marginBottom: 4,
                letterSpacing: "-0.02em",
              }}
            >
              {card.value}
            </div>
            <div
              style={{
                fontSize: "0.8rem",
                fontWeight: 700,
                color: "rgba(255,255,255,0.85)",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                marginBottom: 5,
              }}
            >
              {card.label}
            </div>
            <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.4)", lineHeight: 1.4 }}>
              {card.sub}
            </div>
          </div>
        ))}
      </div>

      {/* Urgency callout */}
      <div
        style={{
          margin: "0 1.5rem 1.5rem",
          padding: "0.85rem 1.1rem",
          background: "rgba(239,68,68,0.07)",
          border: "1px solid rgba(239,68,68,0.3)",
          borderRadius: 10,
          display: "flex",
          alignItems: "flex-start",
        }}
      >
        <PulsingDot />
        <p
          style={{
            margin: 0,
            fontSize: "0.88rem",
            lineHeight: 1.55,
            color: "rgba(255,255,255,0.8)",
          }}
        >
          <strong style={{ color: "#ef4444" }}>CNSA 2.0 deadline: 2027.</strong>{" "}
          Every day of delay increases exposure. Organizations that have not begun PQC migration face
          non-compliance penalties and active harvest-now-decrypt-later data exfiltration risk.
        </p>
      </div>
    </section>
  );
};

export default ZipThreatRadar;
