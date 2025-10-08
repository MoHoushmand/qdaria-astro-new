import { type navItem } from "../types/configDataTypes";

export const navData: navItem[] = [
  {
    text: "Company",
    dropdown: [
      {
        text: "About Us",
        link: "/about",
      },
      {
        text: "Team",
        link: "/team",
      },
      {
        text: "Careers",
        link: "/careers",
      },
      {
        text: "Contact",
        link: "/contact",
      }
    ],
  },
  {
    text: "Solutions",
    dropdown: [
      {
        text: "Quantum Hardware",
        link: "/solutions/quantum-hardware",
      },
      {
        text: "Fibonacci Anyons",
        link: "/solutions/fibonacci-anyons",
      },
      {
        text: "Error Correction",
        link: "/solutions/error-correction",
      },
      {
        text: "Q-AI Integration",
        link: "/solutions/q-ai",
      }
    ],
  },
  {
    text: "Ecosystem",
    dropdown: [
      {
        text: "Research",
        link: "/ecosystem/research",
      },
      {
        text: "Collaborators",
        link: "/collaborators",
      },
      {
        text: "Developer Tools",
        link: "/ecosystem/developer-tools",
      },
      {
        text: "Documentation",
        link: "/docs",
      }
    ],
  },
  {
    text: "Resources",
    dropdown: [
      {
        text: "Blog",
        link: "/blog",
      },
      {
        text: "Media",
        link: "/media",
      },
      {
        text: "Publications",
        link: "/publications",
      },
      {
        text: "Events",
        link: "/events",
      }
    ],
  },
  {
    text: "Invest",
    dropdown: [
      {
        text: "Pitch Deck",
        link: "/invest/pitch",
        description: "Series A funding pitch presentation"
      },
      {
        text: "Business Plan",
        link: "/invest/business-plan",
        description: "Comprehensive business strategy and financial projections"
      },
      {
        text: "Whitepaper",
        link: "/invest/whitepaper",
        description: "Technical whitepaper and platform architecture"
      },
      {
        text: "Growth Analytics",
        link: "/invest/growth-analytics",
        description: "Market analysis and growth metrics"
      },
      {
        text: "Investors",
        link: "/invest/investors",
        description: "Investment opportunities and partnerships"
      }
    ],
  }
];

export default navData;
