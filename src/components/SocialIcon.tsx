import React from 'react';
import {
  Github,
  Linkedin,
  Twitter,
  Mail,
  Globe,
  Code,
  Terminal,
  FileText,
  ExternalLink,
  Share2,
} from 'lucide-react';
import { SocialLink, IconType } from '../types';

interface SocialIconProps {
  link?: Partial<SocialLink>;
  iconType?: IconType;
  customIconUrl?: string;
  title?: string;
  className?: string;
  size?: number;
  strokeWidth?: number;
}

export const SocialIcon: React.FC<SocialIconProps> = ({
  link,
  iconType,
  customIconUrl,
  title,
  className = 'w-5 h-5',
  size = 20,
  strokeWidth = 2,
}) => {
  const resolvedIconType = iconType || link?.iconType;
  const resolvedCustomUrl = customIconUrl || link?.customIconUrl;
  const resolvedTitle = title || link?.title || 'External link';

  // If custom icon URL or image is provided
  if (resolvedCustomUrl) {
    return (
      <img
        src={resolvedCustomUrl}
        alt={resolvedTitle}
        referrerPolicy="no-referrer"
        className={`${className} object-contain rounded-sm`}
        style={{ width: size, height: size }}
        onError={(e) => {
          // fallback to globe if image fails to load
          e.currentTarget.style.display = 'none';
        }}
      />
    );
  }

  switch (resolvedIconType) {
    case 'github':
      return <Github className={className} size={size} strokeWidth={strokeWidth} />;
    case 'linkedin':
      return <Linkedin className={className} size={size} strokeWidth={strokeWidth} />;
    case 'twitter':
      return <Twitter className={className} size={size} strokeWidth={strokeWidth} />;
    case 'mail':
      return <Mail className={className} size={size} strokeWidth={strokeWidth} />;
    case 'globe':
      return <Globe className={className} size={size} strokeWidth={strokeWidth} />;
    case 'code':
      return <Code className={className} size={size} strokeWidth={strokeWidth} />;
    case 'terminal':
      return <Terminal className={className} size={size} strokeWidth={strokeWidth} />;
    case 'file-text':
      return <FileText className={className} size={size} strokeWidth={strokeWidth} />;
    case 'external':
      return <ExternalLink className={className} size={size} strokeWidth={strokeWidth} />;
    default:
      return <Share2 className={className} size={size} strokeWidth={strokeWidth} />;
  }
};
