import { type navLinkItem } from "../types/configDataTypes";

interface FooterSection {
  title: string;
  links: navLinkItem[];
}

export const footerData: FooterSection[] = [
  {
    title: "Quantum Technology",
    links: [
      {
        text: "Fibonacci Anyons",
        link: "/technology/fibonacci-anyons"
      },
      {
        text: "Quantum Architecture",
        link: "/technology/quantum-architecture"
      },
      {
        text: "Error Correction",
        link: "/technology/error-correction"
      },
      {
        text: "Cloud Platform",
        link: "/technology/cloud-platform"
      }
    ]
  },
  {
    title: "Applications",
    links: [
      {
        text: "Quantum Chemistry",
        link: "/applications/chemistry"
      },
      {
        text: "Optimization",
        link: "/applications/optimization"
      },
      {
        text: "Machine Learning",
        link: "/applications/machine-learning"
      },
      {
        text: "Cryptography",
        link: "/applications/cryptography"
      }
    ]
  },
  {
    title: "Resources",
    links: [
      {
        text: "Whitepaper",
        link: "/whitepaper"
      },
      {
        text: "Documentation",
        link: "/documentation"
      },
      {
        text: "Research Papers",
        link: "/research"
      },
      {
        text: "Blog",
        link: "/blog"
      }
    ]
  },
  {
    title: "Company",
    links: [
      {
        text: "About Us",
        link: "/about"
      },
      {
        text: "Careers",
        link: "/careers"
      },
      {
        text: "Contact",
        link: "/contact"
      },
      {
        text: "Research Portal",
        link: "/portal"
      }
    ]
  }
];

export default footerData;
