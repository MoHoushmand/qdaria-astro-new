"use client";

/**
 * ZipFinancialCharts - Revenue projections + module breakdown for Zipminator
 *
 * Usage in Astro:
 *   import ZipFinancialCharts from '@/components/Blog/charts/ZipFinancialCharts';
 *   <ZipFinancialCharts client:visible />
 */

import React, { useEffect, useRef, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell,
  Sector,
} from "recharts";

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const REVENUE_PROJECTIONS = {
  conservative: [
    { year: "2026", revenue: 0.1, users: 2000 },
    { year: "2027", revenue: 0.8, users: 12000 },
    { year: "2028", revenue: 2.5, users: 40000 },
    { year: "2029", revenue: 8.0, users: 100000 },
    { year: "2030", revenue: 20.0, users: 250000 },
  ],
  base: [
    { year: "2026", revenue: 0.2, users: 5000 },
    { year: "2027", revenue: 1.5, users: 25000 },
    { year: "2028", revenue: 5.0, users: 80000 },
    { year: "2029", revenue: 15.0, users: 200000 },
    { year: "2030", revenue: 40.0, users: 500000 },
  ],
  upside: [
    { year: "2026", revenue: 0.5, users: 10000 },
    { year: "2027", revenue: 3.0, users: 50000 },
    { year: "2028", revenue: 12.0, users: 150000 },
    { year: "2029", revenue: 35.0, users: 400000 },
    { year: "2030", revenue: 80.0, users: 1000000 },
  ],
};

// Merge three scenarios onto a single timeline for recharts
const YEARS = ["2026", "2027", "2028", "2029", "2030"];

const COMBINED_DATA = YEARS.map((year, i) => ({
  year,
  conservative: REVENUE_PROJECTIONS.conservative[i].revenue,
  base: REVENUE_PROJECTIONS.base[i].revenue,
  upside: REVENUE_PROJECTIONS.upside[i].revenue,
  baseUsers: REVENUE_PROJECTIONS.base[i].users,
}));

const REVENUE_MODULES = [
  { name: "PQC Messenger", share: 25 },
  { name: "Q-VPN", share: 20 },
  { name: "Enterprise API", share: 20 },
  { name: "Quantum Mail", share: 15 },
  { name: "ZipBrowser", share: 10 },
  { name: "QRNG Engine", share: 10 },
];

// ---------------------------------------------------------------------------
// Colour palette
// ---------------------------------------------------------------------------

const AXIS_COLOR = "#6b7280";
const GRID_COLOR = "rgba(255,255,255,0.06)";
const TEXT_COLOR = "#9ca3af";

const SCENARIO_COLORS = {
  conservative: "#3b82f6", // blue-500
  base: "#6366f1", // indigo-500
  upside: "#22c55e", // green-500
};

const PIE_COLORS = [
  "#6366f1",
  "#8b5cf6",
  "#a78bfa",
  "#7c3aed",
  "#4f46e5",
  "#3b82f6",
];

// ---------------------------------------------------------------------------
// Scenario scenario toggle
// ---------------------------------------------------------------------------

type Scenario = "all" | "conservative" | "base" | "upside";

const SCENARIO_META: {
  key: Scenario;
  label: string;
  subLabel: string;
  color: string;
  highlight?: boolean;
}[] = [
  {
    key: "all",
    label: "All Scenarios",
    subLabel: "Overlay view",
    color: "#9ca3af",
  },
  {
    key: "conservative",
    label: "Conservative",
    subLabel: "$20M by 2030",
    color: SCENARIO_COLORS.conservative,
  },
  {
    key: "base",
    label: "Base Case",
    subLabel: "$40M by 2030",
    color: SCENARIO_COLORS.base,
    highlight: true,
  },
  {
    key: "upside",
    label: "Upside",
    subLabel: "$80M by 2030",
    color: SCENARIO_COLORS.upside,
  },
];

// ---------------------------------------------------------------------------
// Custom tooltips
// ---------------------------------------------------------------------------

interface AreaPayload {
  payload?: {
    year?: string;
    conservative?: number;
    base?: number;
    upside?: number;
    baseUsers?: number;
  };
  dataKey?: string;
  value?: number;
  color?: string;
}

const ScenarioTooltip = ({
  active,
  payload,
}: {
  active?: boolean;
  payload?: AreaPayload[];
}) => {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  if (!d) return null;

  const rows: { label: string; value: number | undefined; color: string }[] = [
    { label: "Upside", value: d.upside, color: SCENARIO_COLORS.upside },
    { label: "Base Case", value: d.base, color: SCENARIO_COLORS.base },
    { label: "Conservative", value: d.conservative, color: SCENARIO_COLORS.conservative },
  ];

  return (
    <div
      style={{
        background: "rgba(0,2,18,0.94)",
        border: "1px solid rgba(99,102,241,0.4)",
        borderRadius: 8,
        padding: "10px 14px",
        fontSize: 13,
        color: "#e5e7eb",
        minWidth: 180,
      }}
    >
      <div
        style={{
          fontWeight: 700,
          marginBottom: 6,
          color: "#c4b5fd",
          fontSize: 14,
        }}
      >
        {d.year}
      </div>
      {rows.map(
        (r) =>
          r.value !== undefined && (
            <div
              key={r.label}
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: 12,
                marginBottom: 3,
              }}
            >
              <span style={{ color: TEXT_COLOR }}>{r.label}</span>
              <span style={{ color: r.color, fontWeight: 700 }}>
                ${r.value}M
              </span>
            </div>
          )
      )}
      {d.baseUsers !== undefined && (
        <div
          style={{
            marginTop: 6,
            paddingTop: 6,
            borderTop: "1px solid rgba(255,255,255,0.08)",
            color: TEXT_COLOR,
            fontSize: 11,
          }}
        >
          Base users:{" "}
          <span style={{ color: "#e5e7eb" }}>
            {d.baseUsers.toLocaleString()}
          </span>
        </div>
      )}
    </div>
  );
};

// ---------------------------------------------------------------------------
// Active Pie Sector (expanded on hover)
// ---------------------------------------------------------------------------

interface ActiveShapeProps {
  cx?: number;
  cy?: number;
  midAngle?: number;
  innerRadius?: number;
  outerRadius?: number;
  startAngle?: number;
  endAngle?: number;
  fill?: string;
  payload?: { name?: string };
  percent?: number;
  value?: number;
}

const RADIAN = Math.PI / 180;

const ActivePieSlice = (props: ActiveShapeProps) => {
  const {
    cx = 0,
    cy = 0,
    midAngle = 0,
    innerRadius = 0,
    outerRadius = 0,
    startAngle,
    endAngle,
    fill,
    payload,
    percent = 0,
    value = 0,
  } = props;

  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const mx = cx + (outerRadius + 22) * cos;
  const my = cy + (outerRadius + 22) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 14;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text
        x={cx}
        y={cy}
        dy={-6}
        textAnchor="middle"
        fill="#c4b5fd"
        fontSize={13}
        fontWeight={700}
      >
        {payload?.name}
      </text>
      <text
        x={cx}
        y={cy}
        dy={12}
        textAnchor="middle"
        fill="#9ca3af"
        fontSize={12}
      >
        {value}%
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={outerRadius + 5}
        outerRadius={outerRadius + 9}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <path
        d={`M${mx},${my}L${ex},${ey}`}
        stroke={fill}
        strokeWidth={1.5}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} />
      <text
        x={ex + (cos >= 0 ? 6 : -6)}
        y={ey}
        textAnchor={textAnchor}
        fill="#e5e7eb"
        fontSize={11}
        fontWeight={600}
      >
        {(percent * 100).toFixed(0)}%
      </text>
    </g>
  );
};

// ---------------------------------------------------------------------------
// Section header
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

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export default function ZipFinancialCharts() {
  const [activeScenario, setActiveScenario] = useState<Scenario>("all");
  const [activePieIndex, setActivePieIndex] = useState(0);
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
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const cardStyle: React.CSSProperties = {
    position: "relative",
    marginBottom: "1.5rem",
    padding: "1.25rem 1.5rem",
    background: "rgba(0,2,18,0.45)",
    border: "1px solid rgba(99,102,241,0.25)",
    borderRadius: 12,
    boxShadow: "0 4px 24px rgba(99,102,241,0.10)",
  };

  const showConservative =
    activeScenario === "all" || activeScenario === "conservative";
  const showBase = activeScenario === "all" || activeScenario === "base";
  const showUpside = activeScenario === "all" || activeScenario === "upside";

  return (
    <div ref={containerRef} style={{ fontFamily: "inherit" }}>
      {/* ------------------------------------------------------------------ */}
      {/* 1. Scenario selector                                                */}
      {/* ------------------------------------------------------------------ */}
      <div
        style={{
          ...cardStyle,
          padding: "1rem 1.25rem",
          marginBottom: "1.25rem",
        }}
      >
        <p
          style={{
            margin: "0 0 0.75rem",
            fontSize: "0.78rem",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: AXIS_COLOR,
            fontWeight: 600,
          }}
        >
          Revenue scenario
        </p>
        <div
          style={{
            display: "flex",
            gap: "0.625rem",
            flexWrap: "wrap",
          }}
        >
          {SCENARIO_META.map((s) => {
            const isActive = activeScenario === s.key;
            return (
              <button
                key={s.key}
                onClick={() => setActiveScenario(s.key)}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: 2,
                  padding: "0.5rem 0.875rem",
                  borderRadius: 8,
                  border: `1px solid ${isActive ? s.color : "rgba(255,255,255,0.1)"}`,
                  background: isActive
                    ? `rgba(${hexToRgbStr(s.color)},0.15)`
                    : "rgba(0,2,18,0.4)",
                  cursor: "pointer",
                  transition: "all 0.18s ease",
                  outline: "none",
                  minWidth: 110,
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    (e.currentTarget as HTMLButtonElement).style.borderColor = s.color;
                    (e.currentTarget as HTMLButtonElement).style.background = `rgba(${hexToRgbStr(s.color)},0.07)`;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    (e.currentTarget as HTMLButtonElement).style.borderColor =
                      "rgba(255,255,255,0.1)";
                    (e.currentTarget as HTMLButtonElement).style.background =
                      "rgba(0,2,18,0.4)";
                  }
                }}
              >
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    fontWeight: 700,
                    fontSize: 13,
                    color: isActive ? s.color : "rgba(255,255,255,0.75)",
                  }}
                >
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: s.color,
                      flexShrink: 0,
                    }}
                  />
                  {s.label}
                </span>
                <span
                  style={{
                    fontSize: 11,
                    color: "rgba(255,255,255,0.45)",
                    paddingLeft: 14,
                  }}
                >
                  {s.subLabel}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* 2. Area chart — overlaid scenarios                                  */}
      {/* ------------------------------------------------------------------ */}
      <div style={cardStyle}>
        <SectionHeader>Revenue Projections 2026–2030 ($M ARR)</SectionHeader>

        <div style={{ width: "100%", height: 320, opacity: visible ? 1 : 0, transition: "opacity 0.5s" }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={COMBINED_DATA}
              margin={{ top: 12, right: 16, left: 4, bottom: 4 }}
            >
              <defs>
                <linearGradient id="gradConservative" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={SCENARIO_COLORS.conservative} stopOpacity={0.45} />
                  <stop offset="100%" stopColor={SCENARIO_COLORS.conservative} stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradBase" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={SCENARIO_COLORS.base} stopOpacity={0.5} />
                  <stop offset="100%" stopColor={SCENARIO_COLORS.base} stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradUpside" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={SCENARIO_COLORS.upside} stopOpacity={0.4} />
                  <stop offset="100%" stopColor={SCENARIO_COLORS.upside} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke={GRID_COLOR} />
              <XAxis
                dataKey="year"
                tick={{ fill: TEXT_COLOR, fontSize: 12 }}
                axisLine={{ stroke: AXIS_COLOR }}
                tickLine={false}
              />
              <YAxis
                tickFormatter={(v: number) => `$${v}M`}
                tick={{ fill: TEXT_COLOR, fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                width={50}
              />
              <Tooltip content={<ScenarioTooltip />} cursor={{ stroke: "rgba(99,102,241,0.3)", strokeWidth: 1 }} />
              {/* Break-even reference line */}
              <ReferenceLine
                x="2028"
                stroke="#ef4444"
                strokeDasharray="5 4"
                strokeWidth={1.5}
                label={{
                  value: "Break-even",
                  position: "insideTopRight",
                  fill: "#ef4444",
                  fontSize: 10,
                  dy: -4,
                }}
              />

              {/* Conservative */}
              {showConservative && (
                <Area
                  type="monotone"
                  dataKey="conservative"
                  name="Conservative"
                  stroke={SCENARIO_COLORS.conservative}
                  strokeWidth={showBase || showUpside ? 1.5 : 2.5}
                  strokeDasharray={activeScenario === "all" ? "4 3" : undefined}
                  fill="url(#gradConservative)"
                  dot={false}
                  activeDot={{ r: 4, strokeWidth: 0, fill: SCENARIO_COLORS.conservative }}
                />
              )}

              {/* Base */}
              {showBase && (
                <Area
                  type="monotone"
                  dataKey="base"
                  name="Base Case"
                  stroke={SCENARIO_COLORS.base}
                  strokeWidth={activeScenario === "base" || activeScenario === "all" ? 2.5 : 1.5}
                  fill="url(#gradBase)"
                  dot={false}
                  activeDot={{ r: 5, strokeWidth: 0, fill: "#c4b5fd" }}
                />
              )}

              {/* Upside */}
              {showUpside && (
                <Area
                  type="monotone"
                  dataKey="upside"
                  name="Upside"
                  stroke={SCENARIO_COLORS.upside}
                  strokeWidth={activeScenario === "upside" ? 2.5 : showBase ? 1.5 : 2.5}
                  fill="url(#gradUpside)"
                  dot={false}
                  activeDot={{ r: 4, strokeWidth: 0, fill: SCENARIO_COLORS.upside }}
                />
              )}
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Inline legend */}
        <div
          style={{
            display: "flex",
            gap: "1.25rem",
            flexWrap: "wrap",
            marginTop: "0.625rem",
          }}
        >
          {Object.entries(SCENARIO_COLORS).map(([key, color]) => (
            <div
              key={key}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontSize: 12,
                color:
                  activeScenario === "all" || activeScenario === key
                    ? "rgba(255,255,255,0.8)"
                    : "rgba(255,255,255,0.3)",
                transition: "color 0.2s",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  width: 20,
                  height: 2,
                  background: color,
                }}
              />
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </div>
          ))}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              fontSize: 12,
              color: "rgba(239,68,68,0.85)",
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: 20,
                height: 0,
                borderTop: "2px dashed #ef4444",
              }}
            />
            Break-even (2028)
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* 3. Donut pie — revenue module breakdown                             */}
      {/* ------------------------------------------------------------------ */}
      <div style={cardStyle}>
        <SectionHeader>Revenue Module Breakdown</SectionHeader>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1rem",
            alignItems: "center",
          }}
        >
          {/* Pie */}
          <div
            style={{
              width: "100%",
              height: 240,
              opacity: visible ? 1 : 0,
              transition: "opacity 0.6s 0.2s",
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  activeIndex={activePieIndex}
                  activeShape={ActivePieSlice as (props: unknown) => JSX.Element}
                  data={REVENUE_MODULES}
                  cx="50%"
                  cy="50%"
                  innerRadius={58}
                  outerRadius={90}
                  dataKey="share"
                  onMouseEnter={(_, index) => setActivePieIndex(index)}
                  strokeWidth={0}
                >
                  {REVENUE_MODULES.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={PIE_COLORS[index % PIE_COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Legend list */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
            }}
          >
            {REVENUE_MODULES.map((mod, i) => (
              <div
                key={mod.name}
                onMouseEnter={() => setActivePieIndex(i)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.625rem",
                  padding: "0.375rem 0.625rem",
                  borderRadius: 6,
                  cursor: "default",
                  background:
                    activePieIndex === i
                      ? `rgba(${hexToRgbStr(PIE_COLORS[i])},0.15)`
                      : "transparent",
                  border: `1px solid ${
                    activePieIndex === i
                      ? `rgba(${hexToRgbStr(PIE_COLORS[i])},0.35)`
                      : "transparent"
                  }`,
                  transition: "all 0.18s ease",
                }}
              >
                <span
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 2,
                    background: PIE_COLORS[i % PIE_COLORS.length],
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontSize: 13,
                    color:
                      activePieIndex === i
                        ? "rgba(255,255,255,0.9)"
                        : "rgba(255,255,255,0.65)",
                    flex: 1,
                    fontWeight: activePieIndex === i ? 600 : 400,
                  }}
                >
                  {mod.name}
                </span>
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: PIE_COLORS[i % PIE_COLORS.length],
                    minWidth: "2.25rem",
                    textAlign: "right",
                  }}
                >
                  {mod.share}%
                </span>
              </div>
            ))}
          </div>
        </div>

        <p
          style={{
            margin: "0.75rem 0 0",
            fontSize: "0.75rem",
            color: "#6b7280",
          }}
        >
          Projected revenue contribution per product module at scale (base-case 2030)
        </p>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Utility: hex "#rrggbb" → "r,g,b" string for rgba()
// ---------------------------------------------------------------------------

function hexToRgbStr(hex: string): string {
  const clean = hex.replace("#", "");
  const r = parseInt(clean.substring(0, 2), 16);
  const g = parseInt(clean.substring(2, 4), 16);
  const b = parseInt(clean.substring(4, 6), 16);
  return `${r},${g},${b}`;
}
