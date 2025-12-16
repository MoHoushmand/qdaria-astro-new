import { type TestimonialItem } from "../types/configDataTypes";

import BowTiedFocus from "../../assets/images/BowTiedFocus.jpg";
import TravisB from "../../assets/images/travis-b.png";
import Isaac from "../../assets/images/isaac_saas.jpg";
import Aniket from "../../assets/images/aniket_p.jpg";
import David from "../../assets/images/david-g-davedev.png";
import Damiano from "../../assets/images/damiano.jpg";

// Note: These are vision statements about topological quantum computing, not endorsements of existing products
export const testimonialData: TestimonialItem[] = [
  {
    avatar: Aniket,
    name: "Industry Perspective",
    title: "Quantum Computing Research",
    testimonial: "Topological quantum computing using Fibonacci anyons represents one of the most promising paths toward fault-tolerant quantum systems. This approach could fundamentally change how we think about qubit stability."
  },
  {
    avatar: BowTiedFocus,
    name: "Academic Viewpoint",
    title: "Theoretical Physics",
    testimonial: "The topological approach to quantum computing offers inherent error protection that conventional methods struggle to achieve. Research in this area could unlock scalable quantum architectures."
  },
  {
    avatar: TravisB,
    name: "Research Insight",
    title: "Quantum Technology",
    testimonial: "Fibonacci anyons have unique mathematical properties that make them theoretically ideal for universal quantum computation. Advancing this research is critical for the field."
  },
  {
    avatar: Isaac,
    name: "Future Applications",
    title: "Quantum Algorithms",
    testimonial: "Once topological qubits are realized, they could enable quantum algorithms to run with unprecedented reliability, opening doors for optimization, simulation, and cryptography applications."
  },
  {
    avatar: David,
    name: "Technology Vision",
    title: "Quantum Innovation",
    testimonial: "The race toward practical quantum computing requires exploring all promising approaches. Topological methods offer a compelling path that deserves continued investment and research."
  },
  {
    avatar: Damiano,
    name: "Industry Outlook",
    title: "Enterprise Technology",
    testimonial: "Organizations preparing for the quantum era should understand different qubit technologies. Topological approaches promise easier scaling and better coherence for future enterprise applications."
  }
];

export default testimonialData;
