/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  loadPortfolioData,
  savePortfolioData,
  DEFAULT_PORTFOLIO_DATA,
} from './data/defaultData';
import { PortfolioData, ContactMessage } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SkillsSection } from './components/SkillsSection';
import { ExperienceSection } from './components/ExperienceSection';
import { ProjectsSection } from './components/ProjectsSection';
import { EducationSection } from './components/EducationSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { AdminPanel } from './components/AdminPanel';
import { AdminAuthModal } from './components/AdminAuthModal';
import { BackToTop } from './components/BackToTop';
import { Toast } from './components/Toast';

export default function App() {
  const [data, setData] = useState<PortfolioData>(() => loadPortfolioData());
  const [theme, setTheme] = useState<'dark' | 'light'>(() => data.theme || 'dark');
  const [adminOpen, setAdminOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('admin_auth') === 'true';
    } catch {
      return false;
    }
  });
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState('hero');

  // Synchronize theme attribute on <html> element
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }, [theme]);

  // Synchronize document title and favicon
  useEffect(() => {
    const title = data.siteTitle || `${data.profile.name} — Portfolio`;
    document.title = title;

    // Update favicon
    const faviconLink = document.getElementById('dynamic-favicon') as HTMLLinkElement | null;
    if (faviconLink) {
      if (data.siteFavicon) {
        faviconLink.href = data.siteFavicon;
      } else {
        const symbol = data.profile.brandSymbol || data.profile.initials || 'AS';
        faviconLink.href = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="25" fill="%232563eb"/><text y="65" x="50" text-anchor="middle" font-size="50" font-weight="bold" fill="white" font-family="system-ui, sans-serif">${symbol}</text></svg>`;
      }
    }
  }, [data.siteTitle, data.siteFavicon, data.profile.name, data.profile.brandSymbol, data.profile.initials]);

  // Track active section on scroll
  useEffect(() => {
    const sectionIds = ['hero', 'skills', 'experience', 'projects', 'education', 'contact'];
    const handleScroll = () => {
      const scrollPos = window.scrollY + 180;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 2800);
  };

  const handleToggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    const updated = { ...data, theme: next };
    setData(updated);
    savePortfolioData(updated);
  };

  const handleUpdateData = (newData: PortfolioData) => {
    setData(newData);
    savePortfolioData(newData);
  };

  const handleResetData = () => {
    setData(DEFAULT_PORTFOLIO_DATA);
    savePortfolioData(DEFAULT_PORTFOLIO_DATA);
    showToast('Reset portfolio back to default settings');
  };

  const handleOpenAdmin = () => {
    let authValid = false;
    try {
      authValid = sessionStorage.getItem('admin_auth') === 'true';
    } catch {}

    if (isAuthenticated || authValid) {
      setIsAuthenticated(true);
      setAdminOpen(true);
    } else {
      setAuthModalOpen(true);
    }
  };

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
    setAuthModalOpen(false);
    setAdminOpen(true);
    showToast('Admin panel unlocked');
  };

  const handleLogout = () => {
    try {
      sessionStorage.removeItem('admin_auth');
    } catch {}
    setIsAuthenticated(false);
    setAdminOpen(false);
    showToast('Admin panel locked');
  };

  // Keyboard shortcut listener for Ctrl+Shift+A / Cmd+Shift+A & URL param detection
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        handleOpenAdmin();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    if (window.location.search.includes('admin')) {
      handleOpenAdmin();
    }

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAuthenticated]);

  const handleSendMessage = (msg: Omit<ContactMessage, 'id' | 'timestamp'>) => {
    const newMsg: ContactMessage = {
      ...msg,
      id: 'msg_' + Date.now(),
      timestamp: new Date().toLocaleString(),
      read: false,
    };
    const updatedMessages = [newMsg, ...(data.messages || [])];
    const updated = { ...data, messages: updatedMessages };
    setData(updated);
    savePortfolioData(updated);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#070b13] text-slate-900 dark:text-[#e6edf3] transition-colors duration-200 selection:bg-blue-600 selection:text-white">
      {/* 
        Fixed / Sticky Navigation Bar
        Features Arjan Subedi inspired left-justified "AS" brand symbol directly vertically aligned with the hero text.
        Full name "Anmol Subedi" removed from navbar as requested.
        Pill highlight for Contact.
        Hover animations on all icons & links.
        Mobile responsive view cleanly adapted.
      */}
      <Navbar
        profile={data.profile}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        onOpenAdmin={handleOpenAdmin}
        activeSection={activeSection}
        hideAdminButton={data.hideAdminButton && !isAuthenticated}
      />

      {/* Main Content Sections */}
      <main>
        <Hero profile={data.profile} socialLinks={data.socialLinks} />
        <SkillsSection skills={data.skills} />
        <ExperienceSection experience={data.experience} />
        <ProjectsSection projects={data.projects} />
        <EducationSection education={data.education} />
        <ContactSection
          profile={data.profile}
          socialLinks={data.socialLinks}
          onSendMessage={handleSendMessage}
          onShowToast={showToast}
        />
      </main>

      {/* Footer */}
      <Footer
        profile={data.profile}
        onOpenAdmin={handleOpenAdmin}
        hideAdminButton={data.hideAdminButton && !isAuthenticated}
      />

      {/* Admin Panel Drawer / Dialog */}
      <AdminPanel
        isOpen={adminOpen}
        onClose={() => setAdminOpen(false)}
        data={data}
        onUpdateData={handleUpdateData}
        onShowToast={showToast}
        onResetData={handleResetData}
        onLogout={handleLogout}
      />

      {/* Master Admin Security PIN Authentication Modal */}
      <AdminAuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onSuccess={handleAuthSuccess}
        currentPin={data.adminPin || '2026'}
      />

      {/* Floating Back-to-Top Button (matching Image 4 sample) */}
      <BackToTop />

      {/* Feedback Toast */}
      <Toast message={toastMessage} />
    </div>
  );
}

