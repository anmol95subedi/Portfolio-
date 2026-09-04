export type IconType =
  | 'github'
  | 'linkedin'
  | 'twitter'
  | 'mail'
  | 'globe'
  | 'code'
  | 'terminal'
  | 'file-text'
  | 'external'
  | 'custom';

export interface SocialLink {
  id: string;
  title: string;
  url: string;
  iconType: IconType;
  customIconUrl?: string; // custom image or favicon URL
  enabled: boolean;
}

export interface Profile {
  name: string;
  brandSymbol: string; // The "AS" symbol shown in the navigation bar
  initials: string;
  role: string;
  location: string;
  status: string;
  statusActive: boolean;
  bio: string;
  avatar: string; // Image URL or base64 or empty
}

export interface Skill {
  id: string;
  name: string;
  level?: string;
  image?: string; // Image / logo URL or uploaded data URL
  hours?: string; // e.g., "800+ hrs practiced" or "650 hrs invested"
  progress?: number; // Optional legacy fallback
}

export interface Experience {
  id: string;
  role: string;
  org: string;
  dates: string;
  desc: string;
  image?: string; // Company logo or workplace image URL / base64
}

export interface Project {
  id: string;
  name: string;
  desc: string;
  tags: string[];
  url?: string;
  githubUrl?: string;
  image?: string;
}

export interface Education {
  id: string;
  degree: string;
  org: string;
  when: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  timestamp: string;
  read?: boolean;
}

export interface PortfolioData {
  profile: Profile;
  socialLinks: SocialLink[];
  skills: Skill[];
  experience: Experience[];
  projects: Project[];
  education: Education[];
  messages: ContactMessage[];
  theme: 'dark' | 'light';
  siteFavicon: string;
  siteTitle: string;
  adminPin?: string;
  hideAdminButton?: boolean;
}
