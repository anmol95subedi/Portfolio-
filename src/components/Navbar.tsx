import React, { useState, useEffect, useRef } from 'react';
import { Sun, Moon, Menu, X, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Profile } from '../types';

interface NavbarProps {
  profile: Profile;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  onOpenAdmin: () => void;
  activeSection: string;
  hideAdminButton?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  profile,
  theme,
  onToggleTheme,
  onOpenAdmin,
  activeSection,
  hideAdminButton,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [avatarError, setAvatarError] = useState(false);
  const logoClicksRef = useRef(0);
  const logoTimeoutRef = useRef<any>(null);

  const handleLogoClick = (e: React.MouseEvent) => {
    logoClicksRef.current += 1;
    if (logoTimeoutRef.current) clearTimeout(logoTimeoutRef.current);
    if (logoClicksRef.current >= 3) {
      e.preventDefault();
      logoClicksRef.current = 0;
      onOpenAdmin();
      return;
    }
    logoTimeoutRef.current = setTimeout(() => {
      logoClicksRef.current = 0;
    }, 600);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Education', href: '#education' },
    { name: 'Contact', href: '#contact', isPill: true },
  ];

  const brandSymbol = profile.brandSymbol || profile.initials || 'AS';

  return (
    <header
      id="main-header"
      className={`sticky top-0 z-40 transition-all duration-200 ${
        scrolled
          ? 'bg-white/92 dark:bg-[#070b13]/92 backdrop-blur-md shadow-sm border-b border-slate-200 dark:border-slate-800/70'
          : 'bg-white/80 dark:bg-[#070b13]/80 backdrop-blur-sm border-b border-slate-200/80 dark:border-slate-800/50'
      }`}
    >
      {/* 
        Container strictly matches hero section container (max-w-5xl mx-auto px-6 sm:px-8).
        This guarantees the "AS" symbol is left-justified exactly aligned with the hero text.
      */}
      <div className="max-w-5xl mx-auto px-6 sm:px-8 h-18 sm:h-20 flex items-center justify-between">
        {/* Left: Avatar / Logo strictly without name text */}
        <div className="flex items-center">
          <a
            id="brand-logo"
            href="#"
            onClick={handleLogoClick}
            className="flex items-center text-base sm:text-lg font-bold tracking-tight text-slate-900 dark:text-white transition-colors"
            title={`${profile.name} - Home (Triple-click for Admin)`}
          >
            {profile.avatar && !avatarError ? (
              <img
                src={profile.avatar}
                alt={profile.name}
                className="w-8 h-8 rounded-md object-cover border border-slate-300 dark:border-slate-700/60 shrink-0"
                onError={() => setAvatarError(true)}
              />
            ) : (
              <div className="w-8 h-8 rounded-md bg-slate-100 dark:bg-[#0f1728] border border-slate-300 dark:border-slate-700/80 flex items-center justify-center text-xs font-bold text-slate-900 dark:text-white shrink-0">
                {brandSymbol}
              </div>
            )}
          </a>
        </div>

        {/* Center / Right: Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            if (link.isPill) {
              return (
                <motion.a
                  key={link.name}
                  id={`nav-link-${link.name.toLowerCase()}`}
                  href={link.href}
                  whileHover={{ scale: 1.04, y: -1 }}
                  whileTap={{ scale: 0.96 }}
                  className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-blue-600/20 text-blue-500 dark:text-blue-400 border border-blue-500/40 shadow-sm shadow-blue-500/10'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800/50 hover:border-slate-300 dark:hover:border-slate-700/60 border border-transparent'
                  }`}
                >
                  {link.name}
                </motion.a>
              );
            }

            return (
              <motion.a
                key={link.name}
                id={`nav-link-${link.name.toLowerCase()}`}
                href={link.href}
                whileHover={{ y: -1.5 }}
                className={`relative py-1 transition-colors ${
                  isActive
                    ? 'text-blue-500 dark:text-blue-400 font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {link.name}
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </motion.a>
            );
          })}
        </nav>

        {/* Right side icon controls: Theme toggle, Admin trigger, Mobile hamburger */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Theme Toggle without animation */}
          <button
            id="theme-toggle-btn"
            onClick={onToggleTheme}
            className="w-9 h-9 rounded-lg border border-slate-300 dark:border-slate-700/80 bg-slate-100 dark:bg-[#0f1728] flex items-center justify-center text-slate-700 dark:text-slate-300 hover:border-slate-400 dark:hover:border-slate-600 hover:bg-slate-200 dark:hover:bg-[#151f33] transition-colors cursor-pointer"
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-slate-700" />
            )}
          </button>

          {/* Admin Panel quick button (hidden if stealth mode is enabled) */}
          {!hideAdminButton && (
            <button
              id="admin-toggle-btn"
              onClick={onOpenAdmin}
              className="w-9 h-9 rounded-lg border border-slate-300 dark:border-slate-700/80 bg-slate-100 dark:bg-[#0f1728] flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-slate-400 dark:hover:border-slate-600 hover:bg-slate-200 dark:hover:bg-[#151f33] transition-colors cursor-pointer"
              title="Open Admin Panel"
              aria-label="Open Admin Panel"
            >
              <Settings className="w-4 h-4" />
            </button>
          )}

          {/* Mobile Menu Toggle Button */}
          <motion.button
            id="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            className="md:hidden w-9 h-9 rounded-lg border border-slate-300/80 dark:border-slate-700/60 bg-slate-100/80 dark:bg-slate-800/40 flex items-center justify-center text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-all cursor-pointer"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Responsive Dropdown Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-nav-dropdown"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-b border-slate-200 dark:border-slate-800/80 bg-white/95 dark:bg-[#070b13]/95 backdrop-blur-xl px-6 py-4 space-y-2"
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-base font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-600/20 text-blue-500 dark:text-blue-400 border border-blue-500/30'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/50'
                  }`}
                >
                  <span>{link.name}</span>
                  {link.isPill && (
                    <span className="text-xs bg-blue-600/30 text-blue-400 px-2 py-0.5 rounded-full">
                      Direct
                    </span>
                  )}
                </a>
              );
            })}

            <div className="pt-2 mt-2 border-t border-slate-200 dark:border-slate-800/60 flex items-center justify-between">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Administration</span>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="flex items-center gap-1.5 text-xs text-blue-500 dark:text-blue-400 font-medium px-2.5 py-1.5 rounded-md hover:bg-blue-100 dark:hover:bg-blue-900/20 transition-colors"
              >
                <Settings className="w-3.5 h-3.5" />
                <span>Admin Panel</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
