'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyIndustryApplicationsComponent = KeyIndustryApplicationsComponent;
var react_1 = require("react");
var card_1 = require("@/components/ui/card");
var tabs_1 = require("@/components/ui/tabs");
var framer_motion_1 = require("framer-motion");
var lucide_react_1 = require("lucide-react");
var industries = [
    {
        name: "Financial Services",
        icon: lucide_react_1.DollarSign,
        applications: [
            "Portfolio optimization",
            "Risk analysis and management",
            "High-frequency trading algorithms",
            "Fraud detection and prevention",
        ],
        description: "Quantum computing can revolutionize financial modeling, risk assessment, and trading strategies, potentially saving billions and creating new opportunities."
    },
    {
        name: "Healthcare",
        icon: lucide_react_1.Heart,
        applications: [
            "Drug discovery and development",
            "Protein folding simulations",
            "Personalized medicine",
            "Medical imaging enhancement",
        ],
        description: "In healthcare, quantum computing could dramatically accelerate drug discovery, optimize treatment plans, and enhance medical imaging, leading to better patient outcomes."
    },
    {
        name: "Cybersecurity",
        icon: lucide_react_1.Shield,
        applications: [
            "Quantum-resistant cryptography",
            "Secure communications",
            "Threat detection and analysis",
            "Quantum key distribution",
        ],
        description: "As quantum computers threaten current encryption methods, they also offer solutions for unbreakable encryption and advanced threat detection."
    },
    {
        name: "Logistics",
        icon: lucide_react_1.Truck,
        applications: [
            "Supply chain optimization",
            "Route planning and optimization",
            "Inventory management",
            "Demand forecasting",
        ],
        description: "Quantum algorithms can solve complex optimization problems in logistics, potentially reducing costs and improving efficiency across global supply chains."
    },
    {
        name: "Energy",
        icon: lucide_react_1.Zap,
        applications: [
            "Grid optimization",
            "Battery technology research",
            "Climate modeling",
            "Energy trading strategies",
        ],
        description: "In the energy sector, quantum computing could optimize power grids, accelerate the development of new energy technologies, and improve climate modeling accuracy."
    },
];
function KeyIndustryApplicationsComponent() {
    var _a = (0, react_1.useState)(industries[0].name), selectedIndustry = _a[0], setSelectedIndustry = _a[1];
    return (<card_1.Card className="w-full bg-gray-800 text-white border-2 border-blue-400">
      <card_1.CardHeader>
        <card_1.CardTitle className="text-2xl font-semibold text-blue-300">Key Industry Applications</card_1.CardTitle>
      </card_1.CardHeader>
      <card_1.CardContent>
        <tabs_1.Tabs value={selectedIndustry} onValueChange={setSelectedIndustry} className="w-full">
          <tabs_1.TabsList className="grid w-full grid-cols-5 bg-gray-700 mb-4">
            {industries.map(function (industry) { return (<tabs_1.TabsTrigger key={industry.name} value={industry.name} className="data-[state=active]:bg-blue-600">
                <industry.icon className="w-5 h-5 mr-2"/>
                {industry.name}
              </tabs_1.TabsTrigger>); })}
          </tabs_1.TabsList>
          <framer_motion_1.AnimatePresence mode="wait">
            {industries.map(function (industry) { return (<tabs_1.TabsContent key={industry.name} value={industry.name}>
                <framer_motion_1.motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}>
                  <h3 className="text-xl font-bold mb-4 text-blue-300">{industry.name} Applications</h3>
                  <p className="text-gray-300 mb-4">{industry.description}</p>
                  <ul className="list-disc list-inside space-y-2">
                    {industry.applications.map(function (app, index) { return (<framer_motion_1.motion.li key={index} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }} className="text-gray-200">
                        {app}
                      </framer_motion_1.motion.li>); })}
                  </ul>
                </framer_motion_1.motion.div>
              </tabs_1.TabsContent>); })}
          </framer_motion_1.AnimatePresence>
        </tabs_1.Tabs>
      </card_1.CardContent>
    </card_1.Card>);
}
