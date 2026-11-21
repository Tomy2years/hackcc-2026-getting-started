export interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatarUrl?: string;
  college?: string;
  github?: string;
}

export interface ProjectPitch {
  title: string;
  tagline: string;
  category: 'AI/ML' | 'Social Good' | 'Innovation' | 'Game Dev' | 'General';
  problem: string;
  solution: string;
  techStack: string[];
}

export interface GitHelpItem {
  id: string;
  title: string;
  scenario: string;
  commands: string[];
  explanation: string;
  caution?: string;
}
