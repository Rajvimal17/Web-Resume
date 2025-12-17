export interface ContactInfo {
  location: string;
  phone: string;
  email: string;
  linkedin: string;
  twitter: string;
}

export interface Experience {
  role: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  bullets: string[];
  keyOutcome: string; // For "Last 5 Innings" summary
  image?: string; 
}

export interface Project {
  title: string;
  subtitle: string;
  description: string;
  metrics: string[];
  image?: string;
}

export interface ImpactMetric {
  value: string;
  label: string;
  description: string;
  company?: string; // New: To show where it was achieved
  image?: string;   // New: Background visual
}

export interface SkillItem {
  name: string;
  useCase: string;
  example: string;
}

export interface SkillCategory {
  name: string;
  items: SkillItem[];
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string; // Emoji or Lucide icon name
  color: string;
}

export interface LatestUpdate {
  date: string;
  text: string;
  type: 'achievement' | 'role' | 'skill';
}

export interface ResumeData {
  name: string;
  title: string;
  tagline: string;
  contact: ContactInfo;
  summary: string;
  impactMetrics: ImpactMetric[];
  skillCategories: SkillCategory[];
  experience: Experience[];
  leadershipHighlights: string[];
  projects: Project[];
  education: {
    degree: string;
    institution: string;
    year: string;
  };
  tools: string[];
  languages: string[];
  badges: Badge[]; // New
  latestUpdates: LatestUpdate[]; // New
  emergingSkills: string[]; // New
}

export interface AiFeedbackResponse {
  score: number;
  strengths: string[];
  growthPlan: string[]; // Renamed from weaknesses to avoid negative connotation
  suggestions: string[];
}