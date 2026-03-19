"use client";

/**
 * ZipCompetitiveCharts
 * Horizontal bar chart (feature coverage score) + CSS-grid feature heatmap
 * + funding comparison section. Dark theme, recharts-powered.
 *
 * Usage in Astro:
 *   import ZipCompetitiveCharts from '@components/Blog/charts/ZipCompetitiveCharts';
 *   <ZipCompetitiveCharts client:visible />
 */

import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  ResponsiveContainer,
} from "recharts";

// ─── Data ────────────────────────────────────────────────────────────────────

type FeatureKey =
  | "messenger"
  | "voip"
  | "vpn"
  | "browser"
  | "email"
  | "qrng"
  | "pqc"
  | "superApp";

const FEATURES: { key: FeatureKey; label: string }[] = [
  { key: "messenger", label: "PQC Messenger" },
  { key: "voip", label: "Quantum VoIP" },
  { key: "vpn", label: "Q-VPN" },
  { key: "browser", label: "Browser" },
  { key: "email", label: "Quantum Mail" },
  { key: "qrng", label: "QRNG" },
  { key: "pqc", label: "Full PQC" },
  { key: "superApp", label: "Super-App" },
];

type FeatureValue = boolean | "partial";

interface Competitor {
  name: string;
  messenger: FeatureValue;
  voip: FeatureValue;
  vpn: FeatureValue;
  browser: FeatureValue;
  email: FeatureValue;
  qrng: FeatureValue;
  pqc: FeatureValue;
  superApp: FeatureValue;
  highlight?: boolean;
}

const COMPETITORS: Competitor[] = [
  {
    name: "Zipminator",
    messenger: true,
    voip: true,
    vpn: true,
    browser: true,
    email: true,
    qrng: true,
    pqc: true,
    superApp: true,
    highlight: true,
  },
  {
    name: "Signal",
    messenger: true,
    voip: true,
    vpn: false,
    browser: false,
    email: false,
    qrng: false,
    pqc: "partial",
    superApp: false,
  },
  {
    name: "ProtonMail",
    messenger: false,
    voip: false,
    vpn: true,
    browser: false,
    email: true,
    qrng: false,
    pqc: "partial",
    superApp: false,
  },
  {
    name: "NordVPN",
    messenger: false,
    voip: false,
    vpn: true,
    browser: false,
    email: false,
    qrng: false,
    pqc: false,
    superApp: false,
  },
  {
    name: "Brave",
    messenger: false,
    voip: false,
    vpn: true,
    browser: true,
    email: false,
    qrng: false,
    pqc: false,
    superApp: false,
  },
  {
    name: "Wire",
    messenger: true,
    voip: true,
    vpn: false,
    browser: false,
    email: false,
    qrng: false,
    pqc: false,
    superApp: false,
  },
  {
    name: "SandboxAQ",
    messenger: false,
    voip: false,
    vpn: false,
    browser: false,
    email: false,
    qrng: false,
    pqc: true,
    superApp: false,
  },
  {
    name: "PQShield",
    messenger: false,
    voip: false,
    vpn: false,
    browser: false,
    email: false,
    qrng: false,
    pqc: true,
    superApp: false,
  },
];

const COMPETITOR_DETAILS = [
  { name: "SandboxAQ", funding: "$950M+", valuation: "$5.75B" },
  { name: "PQShield", funding: "$70M", valuation: "Undisclosed" },
  { name: "ISARA", funding: "$50M+ (acq. by Thales)", valuation: "N/A" },
  { name: "Signal", funding: "$50M+ donations", valuation: "Non-profit" },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function featureScore(c: Competitor): number {
  return FEATURES.reduce((sum, f) => {
    const v = c[f.key];
    return sum + (v === true ? 1 : v === "partial" ? 0.5 : 0);
  }, 0);
}

function cellColor(v: FeatureValue): string {
  if (v === true) return "#22c55e";
  if (v === "partial") return "#f59e0b";
  return "#374151";
}

function cellTextColor(v: FeatureValue): string {
  if (v === true) return "#fff";
  if (v === "partial") return "#1f2937";
  return "#6b7280";
}

function cellLabel(v: FeatureValue): string {
  if (v === true) return "✓";
  if (v === "partial") return "~";
  return "✕";
}

// ─── Bar chart tooltip ────────────────────────────────────────────────────────

interface TooltipProps {
  active?: boolean;
  payload?: Array<{ value: number; payload: { name: string } }>;
}

const CustomTooltip: React.FC<TooltipProps> = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const { value, payload: p } = payload[0];
  return (
    <div
      style={{
        background: "rgba(0,2,18,0.95)",
        border: "1px solid rgba(99,102,241,0.4)",
        borderRadius: 8,
        padding: "8px 14px",
        color: "#fff",
        fontSize: 13,
      }}
    >
      <div style={{ fontWeight: 700, marginBottom: 2 }}>{p.name}</div>
      <div style={{ color: "#a5b4fc" }}>
        Score: <strong>{value}</strong> / 8
      </div>
    </div>
  );
};

// ─── Bar chart label ──────────────────────────────────────────────────────────

interface LabelProps {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  value?: number;
}

const ScoreLabel: React.FC<LabelProps> = ({ x = 0, y = 0, width = 0, height = 0, value = 0 }) => (
  <text
    x={x + width + 8}
    y={y + height / 2}
    dominantBaseline="middle"
    fill="rgba(255,255,255,0.7)"
    fontSize={12}
    fontWeight={600}
  >
    {value}/8
  </text>
);

// ─── Gradient def id ──────────────────────────────────────────────────────────

const GRAD_ZIPMINATOR = "grad-zipminator";
const GRAD_COMPETITOR = "grad-competitor";

// ─── Component ───────────────────────────────────────────────────────────────

const ZipCompetitiveCharts: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Stagger animation trigger
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  const barData = COMPETITORS.map((c) => ({
    name: c.name,
    score: featureScore(c),
    highlight: c.highlight ?? false,
  })).sort((a, b) => b.score - a.score);

  return (
    <section
      style={{
        position: "relative",
        margin: "2.5rem 0",
        background: "rgba(0,2,18,0.45)",
        border: "1px solid rgba(99,102,241,0.28)",
        borderRadius: 14,
        boxShadow: "0 4px 32px rgba(99,102,241,0.1)",
        overflow: "hidden",
        fontFamily: "inherit",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "1.25rem 1.5rem 0.85rem",
          borderBottom: "1px solid rgba(99,102,241,0.18)",
        }}
      >
        <h3
          style={{
            margin: 0,
            fontSize: "1.2rem",
            fontWeight: 700,
            background: "linear-gradient(135deg,#818cf8 0%,#a78bfa 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Competitive Feature Coverage
        </h3>
        <p
          style={{
            margin: "0.35rem 0 0",
            fontSize: "0.82rem",
            color: "rgba(255,255,255,0.45)",
          }}
        >
          Score = number of 8 capability dimensions covered
        </p>
      </div>

      {/* Bar Chart */}
      <div style={{ padding: "1.25rem 1.5rem 0.5rem" }}>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            layout="vertical"
            data={barData}
            margin={{ top: 4, right: 60, left: 16, bottom: 4 }}
          >
            <defs>
              <linearGradient id={GRAD_ZIPMINATOR} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#a855f7" />
              </linearGradient>
              <linearGradient id={GRAD_COMPETITOR} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#374151" />
                <stop offset="100%" stopColor="#4b5563" />
              </linearGradient>
              <filter id="glow-bar" x="-20%" y="-50%" width="140%" height="200%">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <CartesianGrid
              horizontal={false}
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.06)"
            />
            <XAxis
              type="number"
              domain={[0, 8]}
              ticks={[0, 2, 4, 6, 8]}
              tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }}
              axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
              tickLine={false}
            />
            <YAxis
              type="category"
              dataKey="name"
              width={88}
              tick={{ fill: "rgba(255,255,255,0.75)", fontSize: 12, fontWeight: 500 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.04)" }} />
            <Bar dataKey="score" radius={[0, 4, 4, 0]} label={<ScoreLabel />}>
              {barData.map((entry) => (
                <Cell
                  key={entry.name}
                  fill={`url(#${entry.highlight ? GRAD_ZIPMINATOR : GRAD_COMPETITOR})`}
                  filter={entry.highlight ? "url(#glow-bar)" : undefined}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Feature Heatmap */}
      <div style={{ padding: "0.5rem 1.5rem 1.25rem" }}>
        <h4
          style={{
            margin: "0 0 0.85rem",
            fontSize: "0.95rem",
            fontWeight: 600,
            color: "rgba(255,255,255,0.75)",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
          }}
        >
          Feature Heatmap
        </h4>

        {/* Column headers */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `120px repeat(${FEATURES.length}, 1fr)`,
            gap: 4,
            marginBottom: 4,
          }}
        >
          <div />
          {FEATURES.map((f) => (
            <div
              key={f.key}
              style={{
                fontSize: 10,
                fontWeight: 600,
                color: "rgba(255,255,255,0.45)",
                textAlign: "center",
                textTransform: "uppercase",
                letterSpacing: "0.04em",
                lineHeight: 1.3,
                padding: "0 2px",
              }}
            >
              {f.label}
            </div>
          ))}
        </div>

        {/* Rows */}
        {COMPETITORS.map((c, rowIdx) => (
          <div
            key={c.name}
            style={{
              display: "grid",
              gridTemplateColumns: `120px repeat(${FEATURES.length}, 1fr)`,
              gap: 4,
              marginBottom: 4,
            }}
          >
            {/* Row label */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                fontSize: 12,
                fontWeight: c.highlight ? 700 : 500,
                color: c.highlight ? "#818cf8" : "rgba(255,255,255,0.7)",
                paddingRight: 6,
              }}
            >
              {c.highlight && (
                <span
                  style={{
                    display: "inline-block",
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    background: "#818cf8",
                    boxShadow: "0 0 8px rgba(129,140,248,0.7)",
                    marginRight: 6,
                    flexShrink: 0,
                  }}
                />
              )}
              {c.name}
            </div>

            {/* Feature cells */}
            {FEATURES.map((f, colIdx) => {
              const v = c[f.key];
              const delay = mounted ? (rowIdx * FEATURES.length + colIdx) * 18 : 9999;
              return (
                <div
                  key={f.key}
                  title={`${c.name} — ${f.label}: ${v === true ? "Yes" : v === "partial" ? "Partial" : "No"}`}
                  style={{
                    height: 32,
                    borderRadius: 5,
                    background: cellColor(v),
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 13,
                    fontWeight: 700,
                    color: cellTextColor(v),
                    opacity: mounted ? 1 : 0,
                    transform: mounted ? "scale(1)" : "scale(0.6)",
                    transition: `opacity 0.25s ${delay}ms ease, transform 0.25s ${delay}ms ease`,
                    boxShadow:
                      v === true && c.highlight
                        ? "0 0 8px rgba(34,197,94,0.5)"
                        : "none",
                  }}
                >
                  {cellLabel(v)}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div
        style={{
          display: "flex",
          gap: "1.25rem",
          padding: "0 1.5rem 1rem",
          flexWrap: "wrap",
        }}
      >
        {[
          { color: "#22c55e", label: "Full support" },
          { color: "#f59e0b", label: "Partial" },
          { color: "#374151", label: "Not supported" },
        ].map(({ color, label }) => (
          <div key={label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div
              style={{
                width: 14,
                height: 14,
                borderRadius: 3,
                background: color,
              }}
            />
            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.55)" }}>{label}</span>
          </div>
        ))}
      </div>

      {/* Funding comparison */}
      <div
        style={{
          margin: "0 1.5rem 1.5rem",
          padding: "1rem 1.25rem",
          background: "rgba(99,102,241,0.06)",
          border: "1px solid rgba(99,102,241,0.18)",
          borderRadius: 10,
        }}
      >
        <h4
          style={{
            margin: "0 0 0.85rem",
            fontSize: "0.88rem",
            fontWeight: 600,
            color: "rgba(255,255,255,0.6)",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
          }}
        >
          Competitor Funding Snapshot
        </h4>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
            gap: "0.75rem",
          }}
        >
          {COMPETITOR_DETAILS.map((d) => (
            <div
              key={d.name}
              style={{
                padding: "0.65rem 0.9rem",
                background: "rgba(0,2,18,0.5)",
                border: "1px solid rgba(99,102,241,0.14)",
                borderRadius: 8,
              }}
            >
              <div
                style={{ fontSize: 12, fontWeight: 700, color: "#a5b4fc", marginBottom: 4 }}
              >
                {d.name}
              </div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.85)", fontWeight: 600 }}>
                {d.funding}
              </div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>
                Val: {d.valuation}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ZipCompetitiveCharts;
