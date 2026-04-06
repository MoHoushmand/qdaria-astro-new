import React, { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";
import type { ECharts } from "echarts";

// Dynamically import echarts-gl only on client-side to avoid SSR issues
if (typeof window !== "undefined") {
  import("echarts-gl");
}

interface CompetitorData {
  name: string;
  x: number; // Technology Maturity (0-100)
  y: number; // Market Share (0-10%)
  z: number; // Funding Raised ($M, logarithmic)
  revenue: number; // Annual Revenue ($M)
  stage: "startup" | "growth" | "public";
  tech: string;
  country: string;
}

interface CompanyProfile {
  name: string;
  description: string;
  patents: number;
  teamSize: number;
  founded: number;
}

const competitorsData: CompetitorData[] = [
  {
    name: "QDaria",
    x: 45,
    y: 0.1,
    z: 87,
    revenue: 100,
    stage: "growth",
    tech: "topological",
    country: "Norway",
  },
  {
    name: "IBM Quantum",
    x: 85,
    y: 8,
    z: 6000,
    revenue: 2500,
    stage: "public",
    tech: "superconducting",
    country: "USA",
  },
  {
    name: "Google Quantum AI",
    x: 90,
    y: 9,
    z: 8000,
    revenue: 3000,
    stage: "public",
    tech: "superconducting",
    country: "USA",
  },
  {
    name: "Rigetti",
    x: 70,
    y: 2,
    z: 250,
    revenue: 15,
    stage: "growth",
    tech: "superconducting",
    country: "USA",
  },
  {
    name: "IonQ",
    x: 75,
    y: 3,
    z: 650,
    revenue: 20,
    stage: "public",
    tech: "ion-trap",
    country: "USA",
  },
  {
    name: "D-Wave",
    x: 60,
    y: 1.5,
    z: 350,
    revenue: 10,
    stage: "public",
    tech: "annealing",
    country: "Canada",
  },
  {
    name: "PsiQuantum",
    x: 65,
    y: 1,
    z: 665,
    revenue: 5,
    stage: "growth",
    tech: "photonic",
    country: "USA",
  },
  {
    name: "Xanadu",
    x: 55,
    y: 0.8,
    z: 275,
    revenue: 3,
    stage: "growth",
    tech: "photonic",
    country: "Canada",
  },
  {
    name: "Pasqal",
    x: 50,
    y: 0.5,
    z: 140,
    revenue: 2,
    stage: "startup",
    tech: "neutral-atom",
    country: "France",
  },
  {
    name: "QuEra",
    x: 48,
    y: 0.4,
    z: 37,
    revenue: 1,
    stage: "startup",
    tech: "neutral-atom",
    country: "USA",
  },
  {
    name: "Nord Quantique",
    x: 40,
    y: 0.2,
    z: 8,
    revenue: 0.5,
    stage: "startup",
    tech: "superconducting",
    country: "Canada",
  },
  {
    name: "Atlantic Quantum",
    x: 38,
    y: 0.15,
    z: 9,
    revenue: 0.3,
    stage: "startup",
    tech: "superconducting",
    country: "Netherlands",
  },
  {
    name: "Stealth Competitor A",
    x: 42,
    y: 0.12,
    z: 15,
    revenue: 0.4,
    stage: "startup",
    tech: "topological",
    country: "USA",
  },
  {
    name: "Stealth Competitor B",
    x: 35,
    y: 0.08,
    z: 6,
    revenue: 0.2,
    stage: "startup",
    tech: "silicon-spin",
    country: "Australia",
  },
  {
    name: "Stealth Competitor C",
    x: 30,
    y: 0.05,
    z: 4,
    revenue: 0.1,
    stage: "startup",
    tech: "topological",
    country: "Japan",
  },
];

const companyProfiles: Record<string, CompanyProfile> = {
  QDaria: {
    name: "QDaria",
    description:
      "Researching topological quantum computing with Fibonacci anyon architectures",
    patents: 3,
    teamSize: 12,
    founded: 2024,
  },
  "IBM Quantum": {
    name: "IBM Quantum",
    description: "Global leader in superconducting quantum systems",
    patents: 1200,
    teamSize: 500,
    founded: 2016,
  },
  // Add more as needed
};

interface CompetitiveLandscapeChartProps {
  view?: "3d" | "2d";
  className?: string;
}

export default function CompetitiveLandscapeChart({
  view = "3d",
  className = "",
}: CompetitiveLandscapeChartProps) {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<ECharts | null>(null);
  const [currentView, setCurrentView] = useState<"3d" | "2d">(view);
  const [selectedStage, setSelectedStage] = useState<string>("all");
  const [selectedTech, setSelectedTech] = useState<string>("all");
  const [selectedCompany, setSelectedCompany] = useState<CompetitorData | null>(
    null,
  );
  const [showTrajectory, setShowTrajectory] = useState(true);

  useEffect(() => {
    if (!chartRef.current) return;

    const chart = echarts.init(chartRef.current);
    chartInstance.current = chart;

    const filteredData = competitorsData.filter((d) => {
      if (selectedStage !== "all" && d.stage !== selectedStage) return false;
      if (selectedTech !== "all" && d.tech !== selectedTech) return false;
      return true;
    });

    const getColor = (stage: string, name: string) => {
      if (name === "QDaria") return "#04a3ff";
      switch (stage) {
        case "startup":
          return "#3b82f6";
        case "growth":
          return "#10b981";
        case "public":
          return "#8b5cf6";
        default:
          return "#6b7280";
      }
    };

    const trajectoryData = showTrajectory
      ? [
          [45, 0.1, 12], // 2025 - Series A
          [52, 0.2, 12], // 2026
          [60, 0.5, 37], // 2027 - Series B
          [68, 1.2, 37], // 2028
          [75, 2.0, 87], // 2029 - Series C
          [82, 4.0, 87], // 2030 - $100M revenue (base case)
        ]
      : [];

    if (currentView === "3d") {
      const option = {
        backgroundColor: "#0f1419",
        tooltip: {
          formatter: (params: any) => {
            const data = params.data;
            return `
              <div style="padding: 8px;">
                <strong style="color: ${data.color}; font-size: 16px;">${data.name}</strong><br/>
                <div style="margin-top: 8px; font-size: 13px;">
                  Tech Maturity: ${data.value[0]}/100<br/>
                  Market Share: ${data.value[1]}%<br/>
                  Funding: $${data.value[2]}M<br/>
                  Revenue: $${data.revenue}M<br/>
                  Stage: ${data.stage}<br/>
                  Technology: ${data.tech}
                </div>
              </div>
            `;
          },
          backgroundColor: "rgba(15, 20, 25, 0.95)",
          borderColor: "#04a3ff",
          borderWidth: 1,
          textStyle: {
            color: "#fff",
          },
        },
        grid3D: {
          boxWidth: 100,
          boxDepth: 100,
          boxHeight: 100,
          viewControl: {
            projection: "perspective",
            autoRotate: false,
            distance: 200,
            alpha: 20,
            beta: 40,
          },
          axisPointer: {
            show: true,
            lineStyle: {
              color: "#04a3ff",
              width: 2,
            },
          },
          light: {
            main: {
              intensity: 1.5,
              shadow: true,
            },
            ambient: {
              intensity: 0.4,
            },
          },
        },
        xAxis3D: {
          name: "Technology Maturity",
          type: "value",
          min: 0,
          max: 100,
          nameTextStyle: {
            color: "#04a3ff",
            fontSize: 14,
          },
          axisLine: {
            lineStyle: { color: "#333" },
          },
          axisLabel: {
            color: "#999",
            formatter: "{value}",
          },
          splitLine: {
            lineStyle: { color: "#222" },
          },
        },
        yAxis3D: {
          name: "Market Share (%)",
          type: "value",
          min: 0,
          max: 10,
          nameTextStyle: {
            color: "#00ffd3",
            fontSize: 14,
          },
          axisLine: {
            lineStyle: { color: "#333" },
          },
          axisLabel: {
            color: "#999",
            formatter: "{value}%",
          },
          splitLine: {
            lineStyle: { color: "#222" },
          },
        },
        zAxis3D: {
          name: "Funding ($M, log scale)",
          type: "log",
          min: 1,
          max: 10000,
          nameTextStyle: {
            color: "#a78bfa",
            fontSize: 14,
          },
          axisLine: {
            lineStyle: { color: "#333" },
          },
          axisLabel: {
            color: "#999",
            formatter: (value: number) =>
              value >= 1000 ? `$${(value / 1000).toFixed(0)}B` : `$${value}M`,
          },
          splitLine: {
            lineStyle: { color: "#222" },
          },
        },
        series: [
          {
            type: "scatter3D",
            name: "Competitors",
            data: filteredData.map((d) => ({
              name: d.name,
              value: [d.x, d.y, d.z],
              revenue: d.revenue,
              stage: d.stage,
              tech: d.tech,
              color: getColor(d.stage, d.name),
              itemStyle: {
                color: getColor(d.stage, d.name),
                opacity: d.name === "QDaria" ? 1 : 0.8,
                shadowBlur: d.name === "QDaria" ? 20 : 0,
                shadowColor: d.name === "QDaria" ? "#04a3ff" : "transparent",
              },
              symbolSize: Math.sqrt(d.revenue) * 8,
              emphasis: {
                itemStyle: {
                  shadowBlur: 30,
                  shadowColor: getColor(d.stage, d.name),
                },
              },
            })),
          },
          ...(showTrajectory
            ? [
                {
                  type: "line3D",
                  name: "QDaria Trajectory",
                  data: trajectoryData,
                  lineStyle: {
                    color: "#04a3ff",
                    width: 3,
                    opacity: 0.6,
                  },
                },
              ]
            : []),
        ],
      };

      chart.setOption(option);
    } else {
      // 2D Fallback View
      const option = {
        backgroundColor: "#0f1419",
        tooltip: {
          formatter: (params: any) => {
            const data = params.data;
            return `
              <div style="padding: 8px;">
                <strong style="color: ${data.color}; font-size: 16px;">${data.name}</strong><br/>
                <div style="margin-top: 8px; font-size: 13px;">
                  Tech Maturity: ${data.value[0]}/100<br/>
                  Market Share: ${data.value[1]}%<br/>
                  Funding: $${data.funding}M<br/>
                  Revenue: $${data.revenue}M
                </div>
              </div>
            `;
          },
          backgroundColor: "rgba(15, 20, 25, 0.95)",
          borderColor: "#04a3ff",
          textStyle: { color: "#fff" },
        },
        grid: {
          left: 80,
          right: 40,
          top: 80,
          bottom: 60,
        },
        xAxis: {
          name: "Technology Maturity",
          type: "value",
          min: 0,
          max: 100,
          nameTextStyle: {
            color: "#04a3ff",
            fontSize: 14,
          },
          axisLine: { lineStyle: { color: "#333" } },
          axisLabel: { color: "#999" },
          splitLine: { lineStyle: { color: "#222" } },
        },
        yAxis: {
          name: "Market Share (%)",
          type: "value",
          min: 0,
          max: 10,
          nameTextStyle: {
            color: "#00ffd3",
            fontSize: 14,
          },
          axisLine: { lineStyle: { color: "#333" } },
          axisLabel: { color: "#999", formatter: "{value}%" },
          splitLine: { lineStyle: { color: "#222" } },
        },
        series: [
          {
            type: "scatter",
            data: filteredData.map((d) => ({
              name: d.name,
              value: [d.x, d.y],
              funding: d.z,
              revenue: d.revenue,
              color: getColor(d.stage, d.name),
              itemStyle: {
                color: getColor(d.stage, d.name),
                opacity: d.name === "QDaria" ? 1 : 0.8,
                shadowBlur: d.name === "QDaria" ? 20 : 0,
                shadowColor: d.name === "QDaria" ? "#04a3ff" : "transparent",
              },
              symbolSize: Math.sqrt(d.revenue) * 8,
            })),
          },
        ],
      };

      chart.setOption(option);
    }

    const handleResize = () => chart.resize();
    window.addEventListener("resize", handleResize);

    chart.on("click", (params: any) => {
      const clickedData = filteredData.find((d) => d.name === params.name);
      if (clickedData) {
        setSelectedCompany(clickedData);
      }
    });

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.dispose();
    };
  }, [currentView, selectedStage, selectedTech, showTrajectory]);

  const exportChart = () => {
    if (chartInstance.current) {
      const url = chartInstance.current.getDataURL({
        type: "png",
        pixelRatio: 2,
        backgroundColor: "#0f1419",
      });
      const a = document.createElement("a");
      a.href = url;
      a.download = "competitive-landscape-3d.png";
      a.click();
    }
  };

  return (
    <div className={`relative ${className}`}>
      {/* Controls */}
      <div className="absolute left-4 top-4 z-10 flex flex-wrap gap-2">
        <button
          onClick={() => setCurrentView(currentView === "3d" ? "2d" : "3d")}
          className="rounded-lg bg-gradient-to-r from-[#04a3ff] to-[#00ffd3] px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
          aria-label={`Switch to ${currentView === "3d" ? "2D" : "3D"} view of competitive landscape`}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setCurrentView(currentView === "3d" ? "2d" : "3d");
            }
          }}
        >
          {currentView === "3d" ? "Switch to 2D" : "Switch to 3D"}
        </button>

        <select
          value={selectedStage}
          onChange={(e) => setSelectedStage(e.target.value)}
          className="rounded-lg border border-gray-700 bg-gray-800/90 px-3 py-2 text-sm text-white"
          aria-label="Filter companies by stage: all, startups, growth, or public"
        >
          <option value="all">All Stages</option>
          <option value="startup">Startups</option>
          <option value="growth">Growth</option>
          <option value="public">Public</option>
        </select>

        <select
          value={selectedTech}
          onChange={(e) => setSelectedTech(e.target.value)}
          className="rounded-lg border border-gray-700 bg-gray-800/90 px-3 py-2 text-sm text-white"
          aria-label="Filter companies by technology: all, topological, superconducting, ion trap, photonic, or neutral atom"
        >
          <option value="all">All Technologies</option>
          <option value="topological">Topological</option>
          <option value="superconducting">Superconducting</option>
          <option value="ion-trap">Ion Trap</option>
          <option value="photonic">Photonic</option>
          <option value="neutral-atom">Neutral Atom</option>
        </select>

        <button
          onClick={() => setShowTrajectory(!showTrajectory)}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
            showTrajectory
              ? "bg-[#04a3ff] text-white"
              : "border border-gray-700 bg-gray-800/90 text-gray-300"
          }`}
          aria-pressed={showTrajectory}
          aria-label={`${showTrajectory ? "Hide" : "Show"} QDaria projected growth trajectory from 2025 to 2030`}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setShowTrajectory(!showTrajectory);
            }
          }}
        >
          QDaria Trajectory
        </button>

        <button
          onClick={exportChart}
          className="rounded-lg border border-gray-700 bg-gray-800/90 px-4 py-2 text-sm text-white transition-colors hover:bg-gray-700"
          aria-label="Export competitive landscape chart as PNG image"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              exportChart();
            }
          }}
        >
          Export Image
        </button>
      </div>

      {/* Chart */}
      <div
        ref={chartRef}
        className="h-[600px] w-full rounded-xl"
        role="region"
        aria-label={`${currentView === "3d" ? "3D" : "2D"} competitive landscape showing quantum computing companies by technology maturity, market share, and funding. Displaying ${selectedStage === "all" ? "all stages" : selectedStage + " stage companies"} and ${selectedTech === "all" ? "all technologies" : selectedTech + " technology"}. QDaria positioned at 45% maturity, 0.1% market share with trajectory to 82% maturity and 4% share by 2030`}
        tabIndex={0}
      />

      {/* Strategic Quadrants Legend */}
      <div className="absolute bottom-4 right-4 rounded-lg border border-gray-700 bg-gray-900/90 p-4 text-sm backdrop-blur-sm">
        <h4 className="mb-2 font-semibold text-white">Strategic Quadrants</h4>
        <div className="space-y-1 text-gray-300">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-purple-500"></div>
            <span>Leaders (high maturity + share)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-green-500"></div>
            <span>Challengers (high maturity)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-blue-500"></div>
            <span>Visionaries (high share)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-cyan-400 shadow-lg shadow-cyan-500/50"></div>
            <span>QDaria (niche → visionary)</span>
          </div>
        </div>
      </div>

      {/* Company Profile Card */}
      {selectedCompany && (
        <div className="absolute right-4 top-20 z-20 max-w-sm rounded-xl border-2 border-[#04a3ff] bg-gray-900/95 p-6 backdrop-blur-sm">
          <button
            onClick={() => setSelectedCompany(null)}
            className="absolute right-2 top-2 text-gray-400 hover:text-white"
          >
            ✕
          </button>
          <h3 className="mb-2 text-xl font-bold text-white">
            {selectedCompany.name}
          </h3>
          <div className="space-y-2 text-sm text-gray-300">
            <p>
              <strong>Technology:</strong> {selectedCompany.tech}
            </p>
            <p>
              <strong>Stage:</strong> {selectedCompany.stage}
            </p>
            <p>
              <strong>Country:</strong> {selectedCompany.country}
            </p>
            <p>
              <strong>Maturity:</strong> {selectedCompany.x}/100
            </p>
            <p>
              <strong>Market Share:</strong> {selectedCompany.y}%
            </p>
            <p>
              <strong>Funding:</strong> ${selectedCompany.z}M
            </p>
            <p>
              <strong>Revenue:</strong> ${selectedCompany.revenue}M
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
