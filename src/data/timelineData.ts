export type TimelineCategory = 'all' | 'internship' | 'education';

export interface TimelineItem {
  id: string;
  category: 'internship' | 'education';
  period: string;
  year: string;
  role: string;
  organization: string;
  location: string;
  badge: string;
  stamp: string;
  stampColor: string;
  accentColor: string;
  accentBg: string;
  description: string;
  highlights: string[];
  skills: string[];
  metrics?: { label: string; value: string };
  rotate: number;
  noteSticky?: {
    text: string;
    author?: string;
    color: string;
  };
}

/**
 * Clean & Concise Timeline Items in Descending Chronological Order (Latest -> Oldest)
 */
export const TIMELINE_DATA: TimelineItem[] = [
  {
    id: 'timeline-internship',
    category: 'internship',
    period: 'June 2026 — July 2026',
    year: '2026',
    role: 'Full Stack & LLM Applications Intern',
    organization: 'ARGenie',
    location: 'Dehradun, India',
    badge: 'Industry Internship',
    stamp: 'COMPLETED',
    stampColor: '#059669', // Emerald
    accentColor: '#059669',
    accentBg: 'bg-emerald-500/10 text-emerald-800 border-emerald-300',
    description:
      'Engineered enterprise RAG pipelines, multilingual vector search, and an automated LLM evaluation platform.',
    highlights: [
      'Developed LLM-powered RAG pipelines with FastAPI, Qdrant & multilingual embeddings for 10,000+ Japanese/English PDF pages.',
      'Improved retrieval performance to ~80–90% accuracy by optimizing chunking strategies, metadata schemas, and reranking.',
      'Built a Chatbot Evaluation Platform in FastAPI & React for standardized multi-metric LLM validation.',
    ],
    skills: ['FastAPI', 'Qdrant', 'RAG Pipelines', 'React', 'Embeddings', 'Python', 'LLM Evaluation'],
    metrics: { label: 'Retrieval Accuracy', value: '80–90%' },
    rotate: -1.4,
    noteSticky: {
      text: '⚡ Processed 10k+ pages and engineered full-stack RAG evaluation suite.',
      color: '#fef08a', // Yellow Post-it
    },
  },
  {
    id: 'timeline-college',
    category: 'education',
    period: 'Aug 2023 — July 2027',
    year: '2023–2027',
    role: 'B.Tech in Computer Science & Engineering (AI & ML)',
    organization: 'Shivalik College Of Engineering',
    location: 'Dehradun, Uttarakhand',
    badge: 'Undergraduate Degree',
    stamp: 'PURSUING',
    stampColor: '#2563eb', // Blue
    accentColor: '#2563eb',
    accentBg: 'bg-blue-500/10 text-blue-800 border-blue-300',
    description:
      'Pursuing B.Tech in CSE with specialization in Artificial Intelligence & Machine Learning with strong core computer science foundation.',
    highlights: [
      'Core Coursework: Data Structures & Algorithms, Operating Systems, Computer Networks, Database Management Systems, Object Oriented Programming.',
      'Specialized studies in Machine Learning architectures, neural representations, and scalable full-stack development.',
      'Building practical AI engineering projects and actively participating in technical workshops.',
    ],
    skills: ['Data Structures & Algorithms', 'Operating Systems', 'Computer Networks', 'DBMS', 'OOP', 'AI & ML'],
    metrics: { label: 'Specialization', value: 'AI & ML Track' },
    rotate: 1.2,
    noteSticky: {
      text: '🎓 Focused on AI/ML applications, distributed computing & core software engineering.',
      color: '#dbeafe', // Light Blue Post-it
    },
  },
  {
    id: 'timeline-schooling-12th',
    category: 'education',
    period: 'Completed',
    year: 'Class XII',
    role: 'Senior Secondary Education (Class XII)',
    organization: 'Viveka Academy Sr. Sec. School',
    location: 'Uttarakhand Board',
    badge: 'Senior Secondary School',
    stamp: 'PASSED',
    stampColor: '#9333ea', // Purple
    accentColor: '#9333ea',
    accentBg: 'bg-purple-500/10 text-purple-800 border-purple-300',
    description:
      'Completed Senior Secondary Education under the Uttarakhand Board with strong fundamentals in analytical sciences and mathematics.',
    highlights: [
      'Gained strong analytical reasoning and foundational problem-solving in Mathematics and Science.',
      'Developed early curiosity in computing logic, algorithms, and technology.',
      'Active participant in academic competitions and school extracurricular activities.',
    ],
    skills: ['Mathematics', 'Science Stream', 'Analytical Problem Solving', 'Logic'],
    metrics: { label: 'Board', value: 'Uttarakhand Board' },
    rotate: -1.0,
    noteSticky: {
      text: '📝 Solid science & mathematical grounding that led into engineering studies.',
      color: '#f3e8ff', // Violet Post-it
    },
  },
];
