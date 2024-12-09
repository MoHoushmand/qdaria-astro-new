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
    text: "Whitepaper",
    link: "/whitepaper",
  },
  {
    text: "Pitch",
    link: "/pitch",
  }
];

export default navData;
