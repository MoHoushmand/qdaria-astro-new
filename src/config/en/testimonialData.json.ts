import { type TestimonialItem } from "../types/configDataTypes";

import BowTiedFocus from "@images/BowTiedFocus.jpg";
import TravisB from "@images/travis-b.png";
import Isaac from "@images/isaac_saas.jpg";
import Aniket from "@images/aniket_p.jpg";
import David from "@images/david-g-davedev.png";
import Damiano from "@images/damiano.jpg";

export const testimonialData: TestimonialItem[] = [
  {
    avatar: Aniket,
    name: "Dr. Sarah Chen",
    title: "Quantum Research Director, BlueFors",
    testimonial: "QDaria's Fibonacci anyon platform represents a fundamental breakthrough in quantum computing. Their topological protection approach achieves unprecedented stability in quantum operations."
  },
  {
    avatar: BowTiedFocus,
    name: "Prof. Michael Schmidt",
    title: "Head of Quantum Computing, ETH Zürich",
    testimonial: "The coherence times and error rates we've observed in QDaria's system are remarkable. Their topological approach could be the key to scaling quantum computers."
  },
  {
    avatar: TravisB,
    name: "Dr. James Wilson",
    title: "Chief Scientist, Rigetti Computing",
    testimonial: "QDaria's innovative use of Fibonacci anyons for quantum computation is impressive. Their platform shows great promise for achieving quantum advantage in real-world applications."
  },
  {
    avatar: Isaac,
    name: "Dr. Elena Rodriguez",
    title: "Quantum Applications Lead, QM9",
    testimonial: "We've successfully implemented quantum optimization algorithms on QDaria's platform. The stability and coherence times are unlike anything we've seen before."
  },
  {
    avatar: David,
    name: "Dr. Thomas Anderson",
    title: "Research Director, Z Quantum Labs",
    testimonial: "QDaria's topological quantum computing platform has enabled us to explore entirely new approaches to quantum simulation. The results are extremely promising."
  },
  {
    avatar: Damiano,
    name: "Dr. Maria Petrov",
    title: "Head of Quantum Research, CTD Systems",
    testimonial: "The integration of QDaria's quantum platform with our existing systems has been seamless. Their cloud interface and development tools are exceptionally well-designed."
  }
];

export default testimonialData;
