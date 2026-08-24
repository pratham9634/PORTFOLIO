export type NoteCategory = 'all' | 'stats' | 'achievements' | 'certifications';

export interface CodingProfile {
  platform: 'LeetCode' | 'GeeksforGeeks' | 'Codeforces' | 'CodeChef' | 'AtCoder';
  username: string;
  profileUrl: string;
  accentColor: string;
  badgeText: string;
  primaryStat: {
    label: string;
    value: string;
  };
  contestRating?: string;
  contestsCount?: string;
  breakdown: {
    label: string;
    value: string | number;
    color?: string;
  }[];
  highlight: string;
  noteColor: 'yellow' | 'cyan' | 'green' | 'amber' | 'lavender' | 'rose';
  rotation: number;
  pinColor: 'red' | 'blue' | 'yellow' | 'green';
}

export interface AchievementItem {
  id: string;
  title: string;
  event: string;
  date: string;
  rankBadge: string;
  description: string;
  tags: string[];
  link?: string;
  noteColor: 'yellow' | 'cyan' | 'green' | 'amber' | 'lavender' | 'rose';
  rotation: number;
  pinColor: 'red' | 'blue' | 'yellow' | 'green';
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  credentialId?: string;
  skills: string[];
  verifyUrl: string;
  badgeIcon: 'cloud' | 'code' | 'ai' | 'security' | 'database';
  noteColor: 'yellow' | 'cyan' | 'green' | 'amber' | 'lavender' | 'rose';
  rotation: number;
  pinColor: 'red' | 'blue' | 'yellow' | 'green';
}

export const CODING_PROFILES: CodingProfile[] = [
  {
    platform: 'LeetCode',
    username: 'prathampetwal100',
    profileUrl: 'https://leetcode.com/u/prathampetwal100/',
    accentColor: '#f59e0b',
    badgeText: 'Knight • Top 10% Global',
    primaryStat: {
      label: 'DSA Questions Solved',
      value: '1300+',
    },
    contestRating: '1800+ Rating',
    contestsCount: '30+ Contests',
    breakdown: [
      { label: 'Rating', value: '1800+', color: '#f59e0b' },
      { label: 'Contests', value: '30+', color: '#8b5cf6' },
      { label: 'Rank', value: 'Top 10%', color: '#10b981' },
    ],
    highlight: '1300+ DSA questions solved with 1800+ contest rating across 30+ live contests',
    noteColor: 'yellow',
    rotation: -2,
    pinColor: 'red',
  },
  {
    platform: 'GeeksforGeeks',
    username: 'prathampetwal100',
    profileUrl: 'https://www.geeksforgeeks.org/profile/prathampetwal100',
    accentColor: '#16a34a',
    badgeText: 'Top 3 in College Leaderboard',
    primaryStat: {
      label: 'Questions Solved',
      value: '700+',
    },
    contestRating: '1700+ Rating',
    contestsCount: '15+ Contests',
    breakdown: [
      { label: 'Rating', value: '1700+', color: '#16a34a' },
      { label: 'Contests', value: '15+', color: '#0284c7' },
      { label: 'Campus', value: 'Top 3', color: '#f59e0b' },
    ],
    highlight: 'Shivalik College of Engineering (SCE) Dehradun • 700+ questions & 1700+ rating',
    noteColor: 'green',
    rotation: 2.2,
    pinColor: 'green',
  },
  {
    platform: 'Codeforces',
    username: 'pratham100',
    profileUrl: 'https://codeforces.com/profile/pratham100',
    accentColor: '#0284c7',
    badgeText: 'Pupil • Rated Coder',
    primaryStat: {
      label: 'Peak Contest Rating',
      value: '1000+',
    },
    contestRating: '1000+ Rating',
    contestsCount: '10+ Contests',
    breakdown: [
      { label: 'Rating', value: '1000+', color: '#0284c7' },
      { label: 'Solved', value: '100+', color: '#10b981' },
      { label: 'Contests', value: '10+', color: '#8b5cf6' },
    ],
    highlight: '1000+ rating with 100+ questions solved in live competitive rounds',
    noteColor: 'cyan',
    rotation: -2.8,
    pinColor: 'blue',
  },
  {
    platform: 'CodeChef',
    username: 'pratham_chef',
    profileUrl: 'https://www.codechef.com/users/pratham_chef',
    accentColor: '#8b5cf6',
    badgeText: 'Div 3 Competitor',
    primaryStat: {
      label: 'Contest Rating',
      value: '1300+',
    },
    contestRating: '1300+ Rating',
    contestsCount: '10+ Contests',
    breakdown: [
      { label: 'Rating', value: '1300+', color: '#8b5cf6' },
      { label: 'Contests', value: '10+', color: '#0284c7' },
      { label: 'Division', value: 'Div 3', color: '#f59e0b' },
    ],
    highlight: '1300+ rating with 10+ contests participated in speed algorithmic challenges',
    noteColor: 'amber',
    rotation: 1.6,
    pinColor: 'yellow',
  },
  {
    platform: 'AtCoder',
    username: 'Pratham100',
    profileUrl: 'https://atcoder.jp/users/Pratham100',
    accentColor: '#ec4899',
    badgeText: 'ABC Rated Coder',
    primaryStat: {
      label: 'Contest Rating',
      value: '600+',
    },
    contestRating: '600+ Rating',
    contestsCount: '10+ Contests',
    breakdown: [
      { label: 'Rating', value: '600+', color: '#ec4899' },
      { label: 'Contests', value: '10+', color: '#0284c7' },
      { label: 'Platform', value: 'AtCoder', color: '#10b981' },
    ],
    highlight: '600+ rating across 10+ AtCoder Beginner Contests (ABC)',
    noteColor: 'rose',
    rotation: -1.5,
    pinColor: 'red',
  },
];

export const ACHIEVEMENTS: AchievementItem[] = [
  {
    id: 'ach-gfg-top3',
    title: 'Top 3 in College — GFG Campus Leaderboard',
    event: 'Shivalik College of Engineering (SCE) Dehradun',
    date: '2024 — 2025',
    rankBadge: '🏆 Top 3 College Rank',
    description:
      'Ranked among the Top 3 engineering students on the GeeksforGeeks Campus Leaderboard with 700+ problems solved, 1700+ rating, and consistent campus contest rankings.',
    tags: ['GeeksforGeeks', 'Campus Leader', '700+ Solved', 'DSA & Algorithms'],
    link: 'https://www.geeksforgeeks.org/profile/prathampetwal100',
    noteColor: 'green',
    rotation: -1.8,
    pinColor: 'green',
  },
  {
    id: 'ach-leetcode-top10',
    title: 'Ranked in the Top 10% on LeetCode Globally',
    event: 'LeetCode Official Contests & Weekly Rounds',
    date: '2024 — 2026',
    rankBadge: '🌟 Top 10% Global Rank',
    description:
      'Achieved an 1800+ contest rating across 30+ official LeetCode contests, successfully solving 1300+ DSA questions spanning Graphs, Dynamic Programming, Trees, and Complex Algorithms.',
    tags: ['LeetCode', '1300+ Solved', '1800+ Rating', 'Knight Rank'],
    link: 'https://leetcode.com/u/prathampetwal100/',
    noteColor: 'yellow',
    rotation: 2.2,
    pinColor: 'red',
  },
];

export const CERTIFICATIONS: CertificationItem[] = [
  {
    id: 'cert-nptel-ml',
    title: 'Introduction to Machine Learning',
    issuer: 'NPTEL • IIT Kharagpur',
    issueDate: 'NPTEL Certification',
    skills: ['Machine Learning', 'Supervised Learning', 'Neural Networks', 'Regression & Classification', 'Python'],
    verifyUrl: 'https://drive.google.com/file/d/1hTjBUXnw88dQ6j3tAlPCPY8AxSrqAP8J/view?usp=drivesdk',
    badgeIcon: 'ai',
    noteColor: 'lavender',
    rotation: -2,
    pinColor: 'red',
  },
  {
    id: 'cert-gfg-mongo',
    title: 'MongoDB Certificate by GeeksforGeeks',
    issuer: 'GeeksforGeeks (GFG)',
    issueDate: 'Course Completion',
    skills: ['MongoDB', 'NoSQL', 'Document Modeling', 'Aggregation Pipelines', 'CRUD Operations'],
    verifyUrl: 'https://drive.google.com/file/d/1hKWfv-dNh9PaBENN15jMRwURaPJP84X4/view?usp=drivesdk',
    badgeIcon: 'database',
    noteColor: 'cyan',
    rotation: 2.2,
    pinColor: 'green',
  },
];
