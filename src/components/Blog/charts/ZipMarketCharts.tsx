"use client";

/**
 * ZipMarketCharts - Market opportunity visualization for Zipminator blog post
 *
 * Usage in Astro:
 *   import ZipMarketCharts from '@/components/Blog/charts/ZipMarketCharts';
 *   <ZipMarketCharts client:visible />
 */

import React, { useEffect, useRef, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  AreaChart,
  Area,
  ReferenceLine,
  ResponsiveContainer,
  LabelList,
} from "recharts";

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const MARKET_ANALYSTS = [
  { firm: "MarketsandMarkets", tam2025: 2.1, tam2034: 17.3, cagr: 30 },
  { firm: "ABI Research", tam2025: 0.4, tam2034: 13.2, cagr: 46 },
  { firm: "Global Market Insights", tam2025: 0.7, tam2034: 16.1, cagr: 35 },
  { firm: "Precedence Research", tam2025: 1.7, tam2034: 30.0, cagr: 33 },
  { firm: "Fortune Business Insights", tam2025: 0.5, tam2034: 15.8, cagr: 38 },
  { firm: "Grand View Research", tam2025: 0.6, tam2034: 20.1, cagr: 41 },
  { firm: "Mordor Intelligence", tam2025: 1.2, tam2034: 18.7, cagr: 32 },
];

const MARKET_GROWTH_DATA = [
  { year: "2024", tam: 0.9 },
  { year: "2025", tam: 1.2 },
  { year: "2026", tam: 1.8 },
  { year: "2027", tam: 2.8 },
  { year: "2028", tam: 4.5 },
  { year: "2029", tam: 7.2 },
  { year: "2030", tam: 10.5 },
  { year: "2031", tam: 13.0 },
  { year: "2032", tam: 15.5 },
  { year: "2033", tam: 17.5 },
  { year: "2034", tam: 18.7 },
];

// Short labels so they fit on the bar chart x-axis
const BAR_DATA = MARKET_ANALYSTS.map((a) => ({
  firm: a.firm.split(" ")[0], // First word only for brevity
  fullFirm: a.firm,
  value: a.tam2034,
  cagr: a.cagr,
}));

const TAM_SAM_SOM = [
  {
    label: "TAM",
    value: "$17–30B",
    desc: "Total PQC market by 2034",
    color: "#6366f1",
    borderColor: "rgba(99,102,241,0.5)",
    bgColor: "rgba(99,102,241,0.12)",
    width: "100%",
  },
  {
    label: "SAM",
    value: "$5–10B",
    desc: "Consumer + SMB PQC security tools",
    color: "#8b5cf6",
    borderColor: "rgba(139,92,246,0.5)",
    bgColor: "rgba(139,92,246,0.10)",
    width: "72%",
  },
  {
    label: "SOM",
    value: "$200M–1B",
    desc: "PQC super-app for privacy-conscious users",
    color: "#a78bfa",
    borderColor: "rgba(167,139,250,0.5)",
    bgColor: "rgba(167,139,250,0.08)",
    width: "42%",
  },
];

// ---------------------------------------------------------------------------
// Shared style constants
// ---------------------------------------------------------------------------

const AXIS_COLOR = "#6b7280"; // gray-500
const GRID_COLOR = "rgba(255,255,255,0.06)";
const TEXT_COLOR = "#9ca3af"; // gray-400

// Bar gradient colours — five stops across indigo/violet spectrum
const BAR_COLORS = [
  "#6366f1",
  "#7c3aed",
  "#8b5cf6",
  "#6d28d9",
  "#5b21b6",
  "#7c3aed",
  "#6366f1",
];

// ---------------------------------------------------------------------------
// Animated counter hook
// ---------------------------------------------------------------------------

function useCountUp(target: number, active: boolean, duration = 1800): string {
  const [current, setCurrent] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!active) return;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(eased * target);
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setCurrent(target);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [active, target, duration]);

  return current.toFixed(1);
}

// ---------------------------------------------------------------------------
// Custom tooltip components
// ---------------------------------------------------------------------------

interface BarTooltipPayload {
  payload?: { fullFirm?: string; value?: number; cagr?: number };
}

const BarTooltipContent = ({ active, payload }: { active?: boolean; payload?: BarTooltipPayload[] }) => {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  if (!d) return null;
  return (
    <div
      style={{
        background: "rgba(0,2,18,0.92)",
        border: "1px solid rgba(99,102,241,0.4)",
        borderRadius: 8,
        padding: "10px 14px",
        fontSize: 13,
        color: "#e5e7eb",
      }}
    >
      <div style={{ fontWeight: 700, marginBottom: 4, color: "#c4b5fd" }}>
        {d.fullFirm}
      </div>
      <div>
        2034 TAM:{" "}
        <span style={{ color: "#818cf8", fontWeight: 700 }}>
          ${d.value}B
        </span>
      </div>
      <div>
        CAGR:{" "}
        <span style={{ color: "#a3e635", fontWeight: 700 }}>{d.cagr}%</span>
      </div>
    </div>
  );
};

interface AreaTooltipPayload {
  payload?: { year?: string; tam?: number };
}

const AreaTooltipContent = ({ active, payload }: { active?: boolean; payload?: AreaTooltipPayload[] }) => {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  if (!d) return null;
  return (
    <div
      style={{
        background: "rgba(0,2,18,0.92)",
        border: "1px solid rgba(99,102,241,0.4)",
        borderRadius: 8,
        padding: "10px 14px",
        fontSize: 13,
        color: "#e5e7eb",
      }}
    >
      <div style={{ fontWeight: 700, marginBottom: 4, color: "#c4b5fd" }}>
        {d.year}
      </div>
      <div>
        Market size:{" "}
        <span style={{ color: "#818cf8", fontWeight: 700 }}>${d.tam}B</span>
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function SectionHeader({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        marginBottom: "1rem",
        paddingBottom: "0.625rem",
        borderBottom: "1px solid rgba(99,102,241,0.2)",
      }}
    >
      <h3
        style={{
          margin: 0,
          fontSize: "1.1rem",
          fontWeight: 700,
          background: "linear-gradient(135deg, #818cf8 0%, #a78bfa 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        {children}
      </h3>
    </div>
  );
}

// Custom bar label that renders "$XB" above each bar
const BarTopLabel = (props: {
  x?: number;
  y?: number;
  width?: number;
  value?: number;
}) => {
  const { x = 0, y = 0, width = 0, value } = props;
  if (value === undefined) return null;
  return (
    <text
      x={x + width / 2}
      y={y - 5}
      textAnchor="middle"
      fill="#c4b5fd"
      fontSize={11}
      fontWeight={700}
    >
      ${value}B
    </text>
  );
};

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export default function ZipMarketCharts() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const animatedValue = useCountUp(18.7, visible);

  const cardStyle: React.CSSProperties = {
    position: "relative",
    marginBottom: "1.5rem",
    padding: "1.25rem 1.5rem",
    background: "rgba(0,2,18,0.45)",
    border: "1px solid rgba(99,102,241,0.25)",
    borderRadius: 12,
    boxShadow: "0 4px 24px rgba(99,102,241,0.10)",
  };

  return (
    <div ref={containerRef} style={{ fontFamily: "inherit" }}>
      {/* ------------------------------------------------------------------ */}
      {/* 1. Animated headline counter                                        */}
      {/* ------------------------------------------------------------------ */}
      <div
        style={{
          ...cardStyle,
          textAlign: "center",
          padding: "1.5rem",
          marginBottom: "1.5rem",
        }}
      >
        <p
          style={{
            margin: "0 0 0.25rem",
            fontSize: "0.8rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: AXIS_COLOR,
            fontWeight: 600,
          }}
        >
          PQC market projected size by 2034
        </p>
        <div
          style={{
            fontSize: "clamp(2.5rem, 8vw, 4rem)",
            fontWeight: 800,
            lineHeight: 1,
            background: "linear-gradient(135deg, #6366f1 0%, #a78bfa 60%, #c4b5fd 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            transition: "opacity 0.3s",
            opacity: visible ? 1 : 0,
          }}
        >
          ${animatedValue}B
        </div>
        <p
          style={{
            margin: "0.5rem 0 0",
            fontSize: "0.85rem",
            color: TEXT_COLOR,
          }}
        >
          Per Mordor Intelligence — consensus range <strong style={{ color: "#c4b5fd" }}>$13–30B</strong> across 7 analyst firms
        </p>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* 2. Bar chart — analyst 2034 TAM projections                         */}
      {/* ------------------------------------------------------------------ */}
      <div style={cardStyle}>
        <SectionHeader>2034 TAM Projections by Analyst Firm ($B)</SectionHeader>
        <div style={{ width: "100%", height: 280 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={BAR_DATA}
              margin={{ top: 28, right: 16, left: 0, bottom: 4 }}
              barCategoryGap="28%"
            >
              <defs>
                {BAR_DATA.map((_, i) => (
                  <linearGradient
                    key={i}
                    id={`barGrad${i}`}
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor={BAR_COLORS[i]} stopOpacity={0.95} />
                    <stop offset="100%" stopColor={BAR_COLORS[i]} stopOpacity={0.45} />
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid vertical={false} stroke={GRID_COLOR} />
              <XAxis
                dataKey="firm"
                tick={{ fill: TEXT_COLOR, fontSize: 11 }}
                axisLine={{ stroke: AXIS_COLOR }}
                tickLine={false}
              />
              <YAxis
                tickFormatter={(v: number) => `$${v}B`}
                tick={{ fill: TEXT_COLOR, fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                width={46}
              />
              <Tooltip
                content={<BarTooltipContent />}
                cursor={{ fill: "rgba(99,102,241,0.07)" }}
              />
              <Bar dataKey="value" radius={[4, 4, 0, 0]} maxBarSize={52}>
                {BAR_DATA.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={`url(#barGrad${index})`}
                  />
                ))}
                <LabelList content={<BarTopLabel />} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <p
          style={{
            margin: "0.5rem 0 0",
            fontSize: "0.75rem",
            color: "#6b7280",
            textAlign: "right",
          }}
        >
          Source: industry analyst reports 2024–2025
        </p>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* 3. Area chart — TAM growth curve 2024–2034                          */}
      {/* ------------------------------------------------------------------ */}
      <div style={cardStyle}>
        <SectionHeader>PQC Market Growth Trajectory 2024–2034 ($B)</SectionHeader>

        {/* Reference line legend */}
        <div
          style={{
            display: "flex",
            gap: "1.25rem",
            flexWrap: "wrap",
            marginBottom: "0.75rem",
          }}
        >
          {[
            { color: "#ef4444", label: "CNSA 2.0 Deadline (2027)" },
            { color: "#f59e0b", label: "Q-Day Window (2030)" },
            { color: "#22c55e", label: "Full Migration (2034)" },
          ].map((item) => (
            <div
              key={item.label}
              style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: TEXT_COLOR }}
            >
              <span
                style={{
                  display: "inline-block",
                  width: 20,
                  height: 2,
                  background: item.color,
                  borderTop: `2px dashed ${item.color}`,
                }}
              />
              {item.label}
            </div>
          ))}
        </div>

        <div style={{ width: "100%", height: 280 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={MARKET_GROWTH_DATA}
              margin={{ top: 16, right: 16, left: 0, bottom: 4 }}
            >
              <defs>
                <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity={0.55} />
                  <stop offset="65%" stopColor="#6366f1" stopOpacity={0.12} />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke={GRID_COLOR} />
              <XAxis
                dataKey="year"
                tick={{ fill: TEXT_COLOR, fontSize: 11 }}
                axisLine={{ stroke: AXIS_COLOR }}
                tickLine={false}
              />
              <YAxis
                tickFormatter={(v: number) => `$${v}B`}
                tick={{ fill: TEXT_COLOR, fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                width={46}
              />
              <Tooltip
                content={<AreaTooltipContent />}
                cursor={{ stroke: "rgba(99,102,241,0.4)", strokeWidth: 1 }}
              />
              {/* CNSA 2.0 */}
              <ReferenceLine
                x="2027"
                stroke="#ef4444"
                strokeDasharray="5 4"
                strokeWidth={1.5}
                label={{ value: "CNSA 2.0", position: "insideTopRight", fill: "#ef4444", fontSize: 10, dy: -4 }}
              />
              {/* Q-Day Window */}
              <ReferenceLine
                x="2030"
                stroke="#f59e0b"
                strokeDasharray="5 4"
                strokeWidth={1.5}
                label={{ value: "Q-Day", position: "insideTopRight", fill: "#f59e0b", fontSize: 10, dy: -4 }}
              />
              {/* Full Migration */}
              <ReferenceLine
                x="2034"
                stroke="#22c55e"
                strokeDasharray="5 4"
                strokeWidth={1.5}
                label={{ value: "Full Migration", position: "insideTopLeft", fill: "#22c55e", fontSize: 10, dy: -4 }}
              />
              <Area
                type="monotone"
                dataKey="tam"
                stroke="#6366f1"
                strokeWidth={2.5}
                fill="url(#areaGrad)"
                dot={{ fill: "#6366f1", strokeWidth: 0, r: 3 }}
                activeDot={{ fill: "#c4b5fd", r: 5, strokeWidth: 0 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* 4. TAM / SAM / SOM concentric bars                                  */}
      {/* ------------------------------------------------------------------ */}
      <div style={cardStyle}>
        <SectionHeader>Market Addressability: TAM / SAM / SOM</SectionHeader>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {TAM_SAM_SOM.map((tier) => (
            <div
              key={tier.label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                padding: "0.875rem 1.125rem",
                borderRadius: 8,
                background: tier.bgColor,
                border: `1px solid ${tier.borderColor}`,
                width: tier.width,
                minWidth: "min(100%, 260px)",
                transition: "transform 0.25s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = "translateX(4px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = "translateX(0)";
              }}
            >
              <span
                style={{
                  fontWeight: 700,
                  fontSize: "0.75rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "rgba(255,255,255,0.55)",
                  minWidth: "2.5rem",
                }}
              >
                {tier.label}
              </span>
              <span
                style={{
                  fontWeight: 800,
                  fontSize: "1.15rem",
                  color: tier.color,
                  minWidth: "7.5rem",
                }}
              >
                {tier.value}
              </span>
              <span
                style={{
                  fontSize: "0.82rem",
                  color: "rgba(255,255,255,0.6)",
                }}
              >
                {tier.desc}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
