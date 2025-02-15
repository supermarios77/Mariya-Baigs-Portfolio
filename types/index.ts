export interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  link: string;
  color: string;
  githubUrl?: string;
  liveUrl?: string;
  coverImage?: string;
}

export interface SocialLink {
  name: string;
  icon: any;
  color: string;
  url: string;
}

export interface Stat {
  title: string;
  value: string;
  color: string;
} 