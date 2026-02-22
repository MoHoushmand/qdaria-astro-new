export interface Book {
  title: string;
  author: string;
  level: 'c-level' | 'leadership' | 'specialist' | 'all';
  category: string;
  isbn?: string;
  description: string;
}

export const readingProgram: Book[] = [
  // C-Level
  {
    title: 'Built to Last',
    author: 'Jim Collins',
    level: 'c-level',
    category: 'Strategy',
    description: 'Visionary companies and what makes them tick.',
  },
  {
    title: 'Good to Great',
    author: 'Jim Collins',
    level: 'c-level',
    category: 'Strategy',
    description: "Why some companies make the leap and others don't.",
  },
  {
    title: 'Zero to One',
    author: 'Peter Thiel',
    level: 'c-level',
    category: 'Innovation',
    description: 'Notes on startups, or how to build the future.',
  },
  {
    title: "The Innovator's Dilemma",
    author: 'Clayton Christensen',
    level: 'c-level',
    category: 'Innovation',
    description: 'When new technologies cause great firms to fail.',
  },
  {
    title: 'Thinking, Fast and Slow',
    author: 'Daniel Kahneman',
    level: 'c-level',
    category: 'Decision Making',
    description: 'The two systems that drive the way we think.',
  },
  {
    title: 'Quantum Computing: An Applied Approach',
    author: 'Jack Hidary',
    level: 'c-level',
    category: 'Quantum',
    description: 'Comprehensive guide to quantum computing applications.',
  },

  // Leadership
  {
    title: 'The Lean Startup',
    author: 'Eric Ries',
    level: 'leadership',
    category: 'Methodology',
    description: "How today's entrepreneurs use continuous innovation.",
  },
  {
    title: 'Measure What Matters',
    author: 'John Doerr',
    level: 'leadership',
    category: 'Management',
    description: 'OKRs: the simple idea that drives 10x growth.',
  },
  {
    title: 'Drive',
    author: 'Daniel Pink',
    level: 'leadership',
    category: 'Motivation',
    description: 'The surprising truth about what motivates us.',
  },
  {
    title: 'Team of Teams',
    author: 'Stanley McChrystal',
    level: 'leadership',
    category: 'Leadership',
    description: 'New rules of engagement for a complex world.',
  },

  // Specialists
  {
    title: 'Deep Work',
    author: 'Cal Newport',
    level: 'specialist',
    category: 'Productivity',
    description: 'Rules for focused success in a distracted world.',
  },
  {
    title: 'Atomic Habits',
    author: 'James Clear',
    level: 'specialist',
    category: 'Productivity',
    description: 'An easy and proven way to build good habits.',
  },
  {
    title: 'The Art of War',
    author: 'Sun Tzu',
    level: 'specialist',
    category: 'Strategy',
    description: 'Ancient military treatise with business applications.',
  },
  {
    title: 'Range',
    author: 'David Epstein',
    level: 'specialist',
    category: 'Development',
    description: 'Why generalists triumph in a specialized world.',
  },

  // All
  {
    title: 'MBA Personal Development',
    author: 'Various',
    level: 'all',
    category: 'Education',
    description:
      'MBA opportunity references and resources. 1 book/month mandate for all team members.',
  },
];

export const readingPolicy = {
  booksPerMonth: 1,
  mbaOpportunity: true,
  description:
    "All QDaria team members are expected to read at least 1 book per month from their tier's recommended list.",
};
