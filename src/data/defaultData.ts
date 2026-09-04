import { PortfolioData } from '../types';

export const STORAGE_KEY = 'portfolioData_v2';

export const DEFAULT_PORTFOLIO_DATA: PortfolioData = {
  profile: {
    name: 'Anmol Subedi',
    brandSymbol: 'AN',
    initials: 'AN',
    role: 'Aspiring Platform Engineer / SRE',
    location: 'Kathmandu, Nepal',
    status: 'Open to opportunities',
    statusActive: true,
    bio: 'Computer Engineering student at IOE Thapathali Campus with a focus on cloud-native infrastructure, site reliability, and platform engineering. I like systems that stay up and infrastructure that explains itself.',
    avatar: '',
  },
  socialLinks: [
    {
      id: 'github',
      title: 'GitHub',
      url: 'https://github.com/anmolsubedi',
      iconType: 'github',
      enabled: true,
    },
    {
      id: 'linkedin',
      title: 'LinkedIn',
      url: 'https://linkedin.com/in/anmolsubedi',
      iconType: 'linkedin',
      enabled: true,
    },
    {
      id: 'email',
      title: 'Email',
      url: 'mailto:anmol97subedi@gmail.com',
      iconType: 'mail',
      enabled: true,
    },
  ],
  skills: [
    {
      id: '1',
      name: 'Linux & Shell Scripting',
      level: 'Daily Driver',
      hours: '850+ hrs practiced',
      image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg',
    },
    {
      id: '2',
      name: 'Docker & Containers',
      level: 'Proficient',
      hours: '650+ hrs invested',
      image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
    },
    {
      id: '3',
      name: 'Go & Systems Programming',
      level: 'In progress',
      hours: '480+ hrs practiced',
      image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg',
    },
    {
      id: '4',
      name: 'Kubernetes & Cloud Native',
      level: 'In progress',
      hours: '420+ hrs invested',
      image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg',
    },
    {
      id: '5',
      name: 'Networking & Observability',
      level: 'Intermediate',
      hours: '520+ hrs practiced',
      image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prometheus/prometheus-original.svg',
    },
    {
      id: '6',
      name: 'AWS & Infrastructure as Code',
      level: 'Intermediate',
      hours: '380+ hrs invested',
      image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg',
    },
    {
      id: '7',
      name: 'CI/CD Pipelines & GitOps',
      level: 'Proficient',
      hours: '450+ hrs practiced',
      image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/githubactions/githubactions-original.svg',
    },
  ],
  experience: [
    {
      id: '1',
      role: 'Platform & Systems Engineering Intern',
      org: 'Cloud Native Tech',
      dates: 'Jun 2025 — Aug 2025',
      desc: 'Configured automated Kubernetes monitoring, authored container lifecycle pipelines, and integrated alert dispatchers with Prometheus & Grafana.',
      image: '',
    },
    {
      id: '2',
      role: 'Systems & Infrastructure Lead',
      org: 'IOE Computer Engineering Society',
      dates: '2024 — Present',
      desc: 'Administering campus lab Linux infrastructure, managing developer workshops on Docker/Kubernetes, and coordinating student tech symposiums.',
      image: '',
    },
  ],
  projects: [
    {
      id: '1',
      name: 'Server Health Monitor',
      desc: 'Zero-dependency automated daemon watching CPU, memory, and disk thresholds, auto-purging historical logs, and dispatching webhook alerts to Telegram.',
      tags: ['bash', 'systemd', 'linux', 'automation'],
      url: 'https://github.com/anmolsubedi/server-health-monitor',
      githubUrl: 'https://github.com/anmolsubedi',
    },
    {
      id: '2',
      name: 'Multi-Region Health Checker',
      desc: 'High-throughput Go CLI utility performing concurrent TCP/HTTP pings across globally distributed endpoints with latency percentile metrics and color-coded CLI output.',
      tags: ['go', 'cli', 'concurrency', 'networking'],
      url: 'https://github.com/anmolsubedi/multi-region-checker',
      githubUrl: 'https://github.com/anmolsubedi',
    },
    {
      id: '3',
      name: 'Dockerized API Stack',
      desc: 'Go REST API integrated with PostgreSQL connection pooling and Redis in-memory cache, packaged into minimal multi-stage scratch containers with Docker Compose.',
      tags: ['docker', 'go', 'postgres', 'redis'],
      url: 'https://github.com/anmolsubedi/dockerized-api-stack',
      githubUrl: 'https://github.com/anmolsubedi',
    },
  ],
  education: [
    {
      id: '1',
      degree: 'B.E. Computer Engineering',
      org: 'IOE Thapathali Campus, Tribhuvan University',
      when: '2022 — 2026',
    },
  ],
  messages: [],
  theme: 'dark',
  siteFavicon: '',
  siteTitle: 'Anmol Subedi — Portfolio',
  adminPin: '2026',
  hideAdminButton: false,
};

export function loadPortfolioData(): PortfolioData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PORTFOLIO_DATA;
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_PORTFOLIO_DATA,
      ...parsed,
      profile: {
        ...DEFAULT_PORTFOLIO_DATA.profile,
        ...(parsed.profile || {}),
        status: (parsed.profile?.status && !parsed.profile.status.includes('Graduating'))
          ? parsed.profile.status
          : 'Open to opportunities',
        location: parsed.profile?.location || 'Kathmandu, Nepal',
      },
      socialLinks: parsed.socialLinks || DEFAULT_PORTFOLIO_DATA.socialLinks,
      skills: (parsed.skills || DEFAULT_PORTFOLIO_DATA.skills).map((s: any, idx: number) => ({
        ...s,
        hours: s.hours || (DEFAULT_PORTFOLIO_DATA.skills[idx]?.hours ?? '450+ hrs invested'),
        image: s.image || DEFAULT_PORTFOLIO_DATA.skills[idx]?.image || '',
      })),
      experience: parsed.experience || DEFAULT_PORTFOLIO_DATA.experience,
      projects: parsed.projects || DEFAULT_PORTFOLIO_DATA.projects,
      education: parsed.education || DEFAULT_PORTFOLIO_DATA.education,
      messages: parsed.messages || [],
      adminPin: parsed.adminPin || DEFAULT_PORTFOLIO_DATA.adminPin || '2026',
      hideAdminButton: parsed.hideAdminButton ?? DEFAULT_PORTFOLIO_DATA.hideAdminButton ?? false,
    };
  } catch (err) {
    console.error('Error loading portfolio data from localStorage:', err);
    return DEFAULT_PORTFOLIO_DATA;
  }
}

export function savePortfolioData(data: PortfolioData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (err) {
    console.error('Error saving portfolio data to localStorage:', err);
  }
}
