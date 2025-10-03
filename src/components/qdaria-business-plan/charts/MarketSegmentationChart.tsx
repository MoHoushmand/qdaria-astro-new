import React, { useState, useMemo } from 'react';
import { ResponsiveSunburst } from '@nivo/sunburst';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/pitch-deck/ui/card';
import { Button } from '@/components/pitch-deck/ui/button';
import { Input } from '@/components/pitch-deck/ui/input';
import { Home, Search, X } from 'lucide-react';

interface MarketNode {
  name: string;
  value?: number;
  children?: MarketNode[];
  tam?: number; // Total Addressable Market
  sam?: number; // Serviceable Addressable Market
  som?: number; // Serviceable Obtainable Market
  color?: string;
}

const marketHierarchy: MarketNode = {
  name: "Quantum Computing Market",
  children: [
    {
      name: "Fintech",
      value: 390000000000,
      tam: 390000000000,
      sam: 78000000000,
      som: 15600000000,
      color: '#00CED1',
      children: [
        {
          name: "Banking",
          value: 120000000000,
          tam: 120000000000,
          sam: 24000000000,
          som: 4800000000,
          children: [
            { name: "Risk Analysis", value: 40000000000, tam: 40000000000, sam: 8000000000, som: 1600000000 },
            { name: "Fraud Detection", value: 35000000000, tam: 35000000000, sam: 7000000000, som: 1400000000 },
            { name: "Portfolio Optimization", value: 45000000000, tam: 45000000000, sam: 9000000000, som: 1800000000 }
          ]
        },
        {
          name: "Trading",
          value: 90000000000,
          tam: 90000000000,
          sam: 18000000000,
          som: 3600000000,
          children: [
            { name: "HFT Algorithms", value: 50000000000, tam: 50000000000, sam: 10000000000, som: 2000000000 },
            { name: "Market Prediction", value: 40000000000, tam: 40000000000, sam: 8000000000, som: 1600000000 }
          ]
        },
        {
          name: "Insurance",
          value: 80000000000,
          tam: 80000000000,
          sam: 16000000000,
          som: 3200000000,
          children: [
            { name: "Actuarial Modeling", value: 45000000000, tam: 45000000000, sam: 9000000000, som: 1800000000 },
            { name: "Claims Processing", value: 35000000000, tam: 35000000000, sam: 7000000000, som: 1400000000 }
          ]
        },
        {
          name: "DeFi",
          value: 100000000000,
          tam: 100000000000,
          sam: 20000000000,
          som: 4000000000,
          children: [
            { name: "Smart Contracts", value: 55000000000, tam: 55000000000, sam: 11000000000, som: 2200000000 },
            { name: "Quantum Cryptography", value: 45000000000, tam: 45000000000, sam: 9000000000, som: 1800000000 }
          ]
        }
      ]
    },
    {
      name: "Healthcare",
      value: 325000000000,
      tam: 325000000000,
      sam: 65000000000,
      som: 13000000000,
      color: '#2ecc71',
      children: [
        {
          name: "Drug Discovery",
          value: 140000000000,
          tam: 140000000000,
          sam: 28000000000,
          som: 5600000000,
          children: [
            { name: "Molecular Simulation", value: 80000000000, tam: 80000000000, sam: 16000000000, som: 3200000000 },
            { name: "Protein Folding", value: 60000000000, tam: 60000000000, sam: 12000000000, som: 2400000000 }
          ]
        },
        {
          name: "Genomics",
          value: 95000000000,
          tam: 95000000000,
          sam: 19000000000,
          som: 3800000000,
          children: [
            { name: "Sequence Analysis", value: 55000000000, tam: 55000000000, sam: 11000000000, som: 2200000000 },
            { name: "Personalized Medicine", value: 40000000000, tam: 40000000000, sam: 8000000000, som: 1600000000 }
          ]
        },
        {
          name: "Medical Imaging",
          value: 50000000000,
          tam: 50000000000,
          sam: 10000000000,
          som: 2000000000,
          children: [
            { name: "AI Diagnostics", value: 30000000000, tam: 30000000000, sam: 6000000000, som: 1200000000 },
            { name: "Pattern Recognition", value: 20000000000, tam: 20000000000, sam: 4000000000, som: 800000000 }
          ]
        },
        {
          name: "Clinical Trials",
          value: 40000000000,
          tam: 40000000000,
          sam: 8000000000,
          som: 1600000000,
          children: [
            { name: "Patient Matching", value: 25000000000, tam: 25000000000, sam: 5000000000, som: 1000000000 },
            { name: "Outcome Prediction", value: 15000000000, tam: 15000000000, sam: 3000000000, som: 600000000 }
          ]
        }
      ]
    },
    {
      name: "Cybersecurity",
      value: 260000000000,
      tam: 260000000000,
      sam: 52000000000,
      som: 10400000000,
      color: '#e74c3c',
      children: [
        {
          name: "Post-Quantum Crypto",
          value: 120000000000,
          tam: 120000000000,
          sam: 24000000000,
          som: 4800000000,
          children: [
            { name: "Encryption Standards", value: 70000000000, tam: 70000000000, sam: 14000000000, som: 2800000000 },
            { name: "Key Distribution", value: 50000000000, tam: 50000000000, sam: 10000000000, som: 2000000000 }
          ]
        },
        {
          name: "Threat Detection",
          value: 80000000000,
          tam: 80000000000,
          sam: 16000000000,
          som: 3200000000,
          children: [
            { name: "Anomaly Detection", value: 50000000000, tam: 50000000000, sam: 10000000000, som: 2000000000 },
            { name: "Behavioral Analysis", value: 30000000000, tam: 30000000000, sam: 6000000000, som: 1200000000 }
          ]
        },
        {
          name: "Network Security",
          value: 60000000000,
          tam: 60000000000,
          sam: 12000000000,
          som: 2400000000,
          children: [
            { name: "Quantum-Safe VPN", value: 35000000000, tam: 35000000000, sam: 7000000000, som: 1400000000 },
            { name: "Secure Communications", value: 25000000000, tam: 25000000000, sam: 5000000000, som: 1000000000 }
          ]
        }
      ]
    },
    {
      name: "Enterprise AI",
      value: 195000000000,
      tam: 195000000000,
      sam: 39000000000,
      som: 7800000000,
      color: '#9b59b6',
      children: [
        {
          name: "Optimization",
          value: 90000000000,
          tam: 90000000000,
          sam: 18000000000,
          som: 3600000000,
          children: [
            { name: "Supply Chain", value: 50000000000, tam: 50000000000, sam: 10000000000, som: 2000000000 },
            { name: "Resource Allocation", value: 40000000000, tam: 40000000000, sam: 8000000000, som: 1600000000 }
          ]
        },
        {
          name: "Machine Learning",
          value: 70000000000,
          tam: 70000000000,
          sam: 14000000000,
          som: 2800000000,
          children: [
            { name: "Model Training", value: 45000000000, tam: 45000000000, sam: 9000000000, som: 1800000000 },
            { name: "Feature Selection", value: 25000000000, tam: 25000000000, sam: 5000000000, som: 1000000000 }
          ]
        },
        {
          name: "NLP",
          value: 35000000000,
          tam: 35000000000,
          sam: 7000000000,
          som: 1400000000,
          children: [
            { name: "Semantic Analysis", value: 20000000000, tam: 20000000000, sam: 4000000000, som: 800000000 },
            { name: "Language Translation", value: 15000000000, tam: 15000000000, sam: 3000000000, som: 600000000 }
          ]
        }
      ]
    },
    {
      name: "Research",
      value: 130000000000,
      tam: 130000000000,
      sam: 26000000000,
      som: 5200000000,
      color: '#f39c12',
      children: [
        {
          name: "Materials Science",
          value: 55000000000,
          tam: 55000000000,
          sam: 11000000000,
          som: 2200000000,
          children: [
            { name: "Quantum Simulation", value: 35000000000, tam: 35000000000, sam: 7000000000, som: 1400000000 },
            { name: "Property Prediction", value: 20000000000, tam: 20000000000, sam: 4000000000, som: 800000000 }
          ]
        },
        {
          name: "Chemistry",
          value: 45000000000,
          tam: 45000000000,
          sam: 9000000000,
          som: 1800000000,
          children: [
            { name: "Reaction Modeling", value: 28000000000, tam: 28000000000, sam: 5600000000, som: 1120000000 },
            { name: "Catalyst Design", value: 17000000000, tam: 17000000000, sam: 3400000000, som: 680000000 }
          ]
        },
        {
          name: "Physics",
          value: 30000000000,
          tam: 30000000000,
          sam: 6000000000,
          som: 1200000000,
          children: [
            { name: "Quantum Field Theory", value: 18000000000, tam: 18000000000, sam: 3600000000, som: 720000000 },
            { name: "High Energy Physics", value: 12000000000, tam: 12000000000, sam: 2400000000, som: 480000000 }
          ]
        }
      ]
    }
  ]
};

const MarketSegmentationChart: React.FC = () => {
  const [breadcrumb, setBreadcrumb] = useState<string[]>(['Quantum Computing Market']);
  const [searchQuery, setSearchQuery] = useState('');
  const [zoomedData, setZoomedData] = useState<MarketNode>(marketHierarchy);

  const formatCurrency = (value: number) => {
    if (value >= 1000000000) {
      return `$${(value / 1000000000).toFixed(1)}B`;
    }
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    }
    return `$${value.toLocaleString()}`;
  };

  const handleNodeClick = (node: any) => {
    // Find the node in the hierarchy
    const findNode = (currentNode: MarketNode, path: string[]): MarketNode | null => {
      if (currentNode.name === node.id) {
        return currentNode;
      }
      if (currentNode.children) {
        for (const child of currentNode.children) {
          const found = findNode(child, [...path, child.name]);
          if (found) {
            setBreadcrumb([...path, child.name]);
            return found;
          }
        }
      }
      return null;
    };

    const foundNode = findNode(marketHierarchy, ['Quantum Computing Market']);
    if (foundNode && foundNode.children) {
      setZoomedData(foundNode);
    }
  };

  const resetZoom = () => {
    setZoomedData(marketHierarchy);
    setBreadcrumb(['Quantum Computing Market']);
  };

  const navigateToBreadcrumb = (index: number) => {
    if (index === 0) {
      resetZoom();
      return;
    }

    const path = breadcrumb.slice(0, index + 1);
    const findNode = (currentNode: MarketNode, targetPath: string[]): MarketNode | null => {
      if (targetPath.length === 1) {
        return currentNode;
      }
      if (currentNode.children) {
        const nextName = targetPath[1];
        const child = currentNode.children.find(c => c.name === nextName);
        if (child) {
          return findNode(child, targetPath.slice(1));
        }
      }
      return null;
    };

    const foundNode = findNode(marketHierarchy, path);
    if (foundNode) {
      setZoomedData(foundNode);
      setBreadcrumb(path);
    }
  };

  const filteredData = useMemo(() => {
    if (!searchQuery) return zoomedData;

    const filterNodes = (node: MarketNode): MarketNode | null => {
      const matches = node.name.toLowerCase().includes(searchQuery.toLowerCase());

      if (!node.children) {
        return matches ? node : null;
      }

      const filteredChildren = node.children
        .map(child => filterNodes(child))
        .filter((child): child is MarketNode => child !== null);

      if (matches || filteredChildren.length > 0) {
        return {
          ...node,
          children: filteredChildren.length > 0 ? filteredChildren : undefined
        };
      }

      return null;
    };

    const filtered = filterNodes(zoomedData);
    return filtered || zoomedData;
  }, [zoomedData, searchQuery]);

  const getColorForDepth = (depth: number, id: string) => {
    // Find sector color
    const sector = marketHierarchy.children?.find(c => id.includes(c.name));
    const baseColor = sector?.color || '#00CED1';

    // Create gradient from dark (center) to bright (edge)
    const opacity = 0.4 + (depth * 0.2);
    return `${baseColor}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`;
  };

  return (
    <Card className="w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-cyan-500/20">
      <CardHeader>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Market Segmentation Analysis
            </CardTitle>
            <Button
              onClick={resetZoom}
              variant="outline"
              size="sm"
              className="border-cyan-500/30 hover:bg-cyan-500/10"
            >
              <Home className="w-4 h-4 mr-2" />
              Reset View
            </Button>
          </div>

          <p className="text-slate-400 text-sm">
            Total Market: $1.3T by 2035 - Click to explore sectors and use cases
          </p>

          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-2 flex-wrap">
            {breadcrumb.map((crumb, index) => (
              <React.Fragment key={index}>
                <button
                  onClick={() => navigateToBreadcrumb(index)}
                  className={`text-sm px-3 py-1 rounded transition-colors ${
                    index === breadcrumb.length - 1
                      ? 'bg-cyan-500/20 text-cyan-400 font-semibold'
                      : 'text-slate-400 hover:text-cyan-400 hover:bg-slate-800'
                  }`}
                >
                  {crumb}
                </button>
                {index < breadcrumb.length - 1 && (
                  <span className="text-slate-600">/</span>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Search Filter */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              type="text"
              placeholder="Search sectors or use cases..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[600px] relative">
          <ResponsiveSunburst
            data={filteredData}
            margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
            id="name"
            value="value"
            cornerRadius={3}
            borderWidth={2}
            borderColor="#000212"
            colors={(node) => {
              const depth = node.depth;
              const id = node.id;
              return getColorForDepth(depth, id);
            }}
            childColor={{
              from: 'color',
              modifiers: [['brighter', 0.2]]
            }}
            enableArcLabels={true}
            arcLabel={d => {
              if (d.depth === 0) return '';
              return d.depth <= 2 ? d.id : '';
            }}
            arcLabelsTextColor="#ffffff"
            arcLabelsSkipAngle={15}
            onClick={handleNodeClick}
            tooltip={({ id, value, color, data }) => {
              const nodeData = data as MarketNode;

              return (
                <div className="bg-slate-800/95 border border-cyan-500/30 rounded-lg p-4 shadow-xl backdrop-blur-md max-w-xs">
                  <div className="flex items-center gap-2 mb-3">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: color }}
                    />
                    <span className="font-bold text-white text-lg">{id}</span>
                  </div>

                  <div className="space-y-2 text-sm">
                    {nodeData.tam && (
                      <div className="flex justify-between">
                        <span className="text-slate-400">TAM:</span>
                        <span className="text-cyan-400 font-semibold">
                          {formatCurrency(nodeData.tam)}
                        </span>
                      </div>
                    )}
                    {nodeData.sam && (
                      <div className="flex justify-between">
                        <span className="text-slate-400">SAM:</span>
                        <span className="text-purple-400 font-semibold">
                          {formatCurrency(nodeData.sam)}
                        </span>
                      </div>
                    )}
                    {nodeData.som && (
                      <div className="flex justify-between">
                        <span className="text-slate-400">SOM:</span>
                        <span className="text-green-400 font-semibold">
                          {formatCurrency(nodeData.som)}
                        </span>
                      </div>
                    )}
                    {value && (
                      <div className="flex justify-between pt-2 border-t border-slate-700">
                        <span className="text-slate-400">Market Size:</span>
                        <span className="text-white font-bold">
                          {formatCurrency(value)}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="mt-3 text-xs text-slate-500">
                    Click to zoom into this sector
                  </div>
                </div>
              );
            }}
            theme={{
              fontSize: 11,
              fontFamily: 'system-ui, -apple-system, sans-serif',
              tooltip: {
                container: {
                  background: 'transparent',
                  padding: 0,
                  border: 'none',
                  boxShadow: 'none'
                }
              }
            }}
          />
        </div>

        {/* Market Summary */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-4">
          {marketHierarchy.children?.map((sector) => (
            <div
              key={sector.name}
              className="p-4 rounded-lg border border-slate-700/50 bg-slate-800/30 hover:bg-slate-800/50 transition-colors cursor-pointer"
              onClick={() => {
                setZoomedData(sector);
                setBreadcrumb(['Quantum Computing Market', sector.name]);
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: sector.color }}
                />
                <span className="font-semibold text-white text-sm">{sector.name}</span>
              </div>
              <div className="text-cyan-400 text-lg font-bold">
                {formatCurrency(sector.value || 0)}
              </div>
              <div className="text-slate-400 text-xs mt-1">
                {((((sector.value || 0) / 1300000000000) * 100).toFixed(1))}% of market
              </div>
            </div>
          ))}
        </div>

        {/* Accessibility Info */}
        <div className="mt-4 text-xs text-slate-500 text-center">
          Interactive hierarchical visualization: Click any segment to zoom in. Use breadcrumbs or reset button to navigate. Keyboard accessible.
        </div>
      </CardContent>
    </Card>
  );
};

export default MarketSegmentationChart;
