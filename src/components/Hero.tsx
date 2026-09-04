import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin } from 'lucide-react';
import { Profile, SocialLink } from '../types';
import { SocialIcon } from './SocialIcon';

interface HeroProps {
  profile: Profile;
  socialLinks: SocialLink[];
}

const getSocialButtonClasses = (iconType?: string, id?: string) => {
  const type = (iconType || id || '').toLowerCase();
  if (type.includes('github')) {
    return 'text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:border-slate-400 dark:hover:border-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800/90 hover:shadow-md hover:shadow-slate-500/10';
  }
  if (type.includes('linkedin')) {
    return 'text-slate-700 dark:text-slate-300 hover:text-[#0a66c2] dark:hover:text-[#388bfd] hover:border-[#0a66c2]/50 hover:bg-[#0a66c2]/10 dark:hover:bg-[#0a66c2]/15 hover:shadow-md hover:shadow-blue-500/10';
  }
  if (type.includes('mail') || type.includes('email')) {
    return 'text-slate-700 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 hover:border-sky-400 dark:hover:border-sky-500/50 hover:bg-sky-50 dark:hover:bg-sky-500/10 hover:shadow-md hover:shadow-sky-500/10';
  }
  return 'text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-400 dark:hover:border-blue-500/50 hover:bg-blue-50 dark:hover:bg-blue-500/10 hover:shadow-md hover:shadow-blue-500/10';
};

export const Hero: React.FC<HeroProps> = ({ profile, socialLinks }) => {
  const [avatarError, setAvatarError] = useState(false);
  const activeSocials = (socialLinks || []).filter((s) => s && s.enabled);
  const initials = profile.initials || profile.brandSymbol || 'AS';

  return (
    <section id="hero" className="pt-12 sm:pt-16 md:pt-20 pb-16 sm:pb-24">
      <div className="max-w-5xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Text & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            {/* Status matching original layout */}
            {profile.status && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 font-normal"
              >
                <span
                  className={`w-2 h-2 rounded-full shrink-0 ${
                    profile.statusActive
                      ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]'
                      : 'bg-slate-500'
                  }`}
                />
                <span>{profile.status}</span>
              </motion.div>
            )}

            {/* Main Name Heading */}
            <motion.h1
              id="hero-name"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28, delay: 0.03, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1]"
            >
              {profile.name}
            </motion.h1>

            {/* Role / Headline in distinct accent blue */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="text-xl sm:text-2xl font-semibold text-blue-500 dark:text-blue-400"
            >
              {profile.role}
            </motion.div>

            {/* Location matching image 3 and 4 with red pin */}
            {profile.location && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.28, delay: 0.09, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 font-normal"
              >
                <span className="text-base select-none leading-none inline-block">📍</span>
                <span>{profile.location}</span>
              </motion.div>
            )}

            {/* Bio text */}
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed font-normal"
            >
              {profile.bio}
            </motion.p>

            {/* CTA Buttons Row */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-3 pt-2"
            >
              <motion.a
                id="cta-projects"
                href="#projects"
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.97 }}
                className="px-6 py-2.5 rounded-lg font-medium text-sm text-white bg-blue-600 hover:bg-blue-500 shadow-md shadow-blue-600/20 transition-all inline-flex items-center justify-center cursor-pointer"
              >
                View Projects
              </motion.a>

              <motion.a
                id="cta-contact"
                href="#contact"
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.97 }}
                className="px-6 py-2.5 rounded-lg font-medium text-sm text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700/80 hover:bg-slate-100 dark:hover:bg-slate-800/40 hover:border-slate-400 dark:hover:border-slate-600 transition-all inline-flex items-center justify-center cursor-pointer"
              >
                Contact Me
              </motion.a>
            </motion.div>

            {/* Social Icons Row */}
            {activeSocials.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.28, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-3 pt-3"
              >
                {activeSocials.map((social) => (
                  <motion.a
                    key={social.id}
                    id={`social-link-${social.id}`}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.07, y: -1.5 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-11 h-11 rounded-xl border border-slate-300 dark:border-slate-800/90 bg-white dark:bg-[#121927] flex items-center justify-center shadow-sm transition-all duration-150 cursor-pointer ${getSocialButtonClasses(
                      social.iconType,
                      social.id
                    )}`}
                    title={social.title}
                    aria-label={social.title}
                  >
                    <SocialIcon link={social} size={21} strokeWidth={2.1} />
                  </motion.a>
                ))}
              </motion.div>
            )}
          </div>

          {/* Right Column: Avatar Box */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-92 md:h-92 rounded-3xl overflow-hidden shadow-2xl border border-slate-200/80 dark:border-slate-800/80 group"
            >
              {profile.avatar && !avatarError ? (
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  onError={() => setAvatarError(true)}
                />
              ) : (
                /* Elegant gradient card with initials */
                <div className="w-full h-full bg-gradient-to-br from-[#1e293b] via-[#151f33] to-[#1e1b4b] flex items-center justify-center select-none">
                  <span className="text-7xl sm:text-8xl font-black text-white/90 tracking-tight drop-shadow-md">
                    {initials}
                  </span>
                  <div className="absolute inset-0 bg-blue-500/5 backdrop-blur-[1px] pointer-events-none" />
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
