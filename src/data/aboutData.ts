export interface Milestone {
  year: string;
  title: string;
  icon: 'laptop' | 'code' | 'cube' | 'rocket' | string;
  description?: string;
}

export interface BeliefItem {
  id: string;
  label: string;
  checked: boolean;
}

export interface ServiceItem {
  id: string;
  label: string;
  icon: 'globe' | 'layers' | 'puzzle' | 'book' | string;
}

export interface FunFactItem {
  id: string;
  text: string;
  doodle?: 'coffee' | 'moon' | 'pencil' | 'sparkles' | 'heart' | 'game';
}

export interface AboutData {
  header: {
    badgeText: string;
    sectionTitle: string;
    description: string;
  };
  whoAmI: {
    title: string;
    description: string;
    roleHighlight: string;
    rotation?: number;
  };
  beliefs: {
    title: string;
    items: BeliefItem[];
    rotation?: number;
  };
  character: {
    image: string;
    alt: string;
    mugLabel?: string;
    quote: string;
    author?: string;
  };
  journey: {
    title: string;
    story: string;
    milestones: Milestone[];
  };
  whatIDo: {
    title: string;
    items: ServiceItem[];
  };
  polaroid: {
    image: string;
    caption: string;
    alt?: string;
    rotation?: number;
  };
  funFacts: {
    title: string;
    facts: FunFactItem[];
  };
  doodles: {
    showPencil: boolean;
    showBulb: boolean;
    showPlant: boolean;
    showTape: boolean;
    showClip: boolean;
  };
  resume: {
    showButton: boolean;
    buttonText: string;
    subText?: string;
    fileUrl: string;
    fileName?: string;
  };
}

export const DEFAULT_ABOUT_DATA: AboutData = {
  header: {
    badgeText: '[ 03 — Story & Philosophy ]',
    sectionTitle: 'About & Practice',
    description: 'A tactile glance inside my engineering sketchbook, philosophy, and learning milestones.',
  },
  whoAmI: {
    title: 'WHO AM I?',
    roleHighlight: 'Full Stack Developer',
    description:
      "I'm a passionate Full Stack Developer who loves building clean, user-friendly and impactful digital experiences.",
    rotation: -2.5,
  },
  beliefs: {
    title: 'I BELIEVE IN',
    items: [
      { id: 'b1', label: 'Clean Code', checked: true },
      { id: 'b2', label: 'Continuous Learning', checked: true },
      { id: 'b3', label: 'Minimal Design', checked: true },
      { id: 'b4', label: 'Solving Real Problems', checked: true },
    ],
    rotation: 1.5,
  },
  character: {
    image: '/images/sketchbook_character.jpg',
    alt: 'Developer sketch wearing sunglasses, hoodie, sneakers, sitting on chair with coffee mug',
    mugLabel: 'LATTE',
    quote: "Code is not just what I write, it's how I solve problems and make ideas real.",
    author: 'Pratham',
  },
 journey: {
  title: "MY JOURNEY",

  story:
    "I started coding in 2023 with a simple curiosity about how software works. That curiosity quickly turned into a passion for building things, solving problems, and exploring new technologies.",

  milestones: [
    {
      year: "2023",
      title: "Started Coding",
      icon: "laptop",
      description:
        "Started with programming fundamentals, problem solving, and building my first applications.",
    },
    {
      year: "2024",
      title: "Explored Development",
      icon: "code",
      description:
        "Dived into web development, learning React, Node.js, databases, APIs, and modern UI principles.",
    },
    {
      year: "2025",
      title: "Built Real Projects",
      icon: "cube",
      description:
        "Built full-stack applications and learned to design, develop, deploy, and improve real-world products.",
    },
    {
      year: "2026+",
      title: "Exploring AI",
      icon: "rocket",
      description:
        "Expanding into AI engineering, LLM applications, RAG systems, vector databases, and intelligent software.",
    },
  ],
},
  whatIDo: {
    title: 'WHAT I DO',
    items: [
      { id: 'w1', label: 'Full Stack Web Development', icon: 'globe' },
      { id: 'w2', label: 'Building Scalable Web Apps', icon: 'layers' },
      { id: 'w3', label: 'Problem Solving', icon: 'puzzle' },
      { id: 'w4', label: 'Learning New Technologies', icon: 'book' },
      { id: 'w5' , label: 'Exploring AI', icon: 'rocket'},
    ],
  },
  polaroid: {
    image: '/images/sketchbook_polaroid.jpg',
    caption: 'KEEP EXPLORING',
    alt: 'Cross-hatch ink mountain landscape sketch',
    rotation: 2.5,
  },
  funFacts: {
    title: 'FUN FACTS',
    facts: [
      { id: 'f1', text: 'I love minimalist & clean designs', doodle: 'sparkles' },
      { id: 'f2', text: 'I enjoy coffee while coding', doodle: 'coffee' },
      { id: 'f3', text: "I'm a night owl", doodle: 'moon' },
      { id: 'f4', text: 'I love to watch movies/series and play chess in my free time', doodle: 'pencil' },
    ],
  },
  doodles: {
    showPencil: true,
    showBulb: true,
    showPlant: true,
    showTape: true,
    showClip: true,
  },
  resume: {
    showButton: true,
    buttonText: 'Download Resume',
    subText: 'PDF • Updated 2026',
    fileUrl: '/resume.pdf',
    fileName: 'Pratham_Resume.pdf',
  },
};
