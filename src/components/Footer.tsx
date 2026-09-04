import React from 'react';
import { Settings } from 'lucide-react';
import { Profile } from '../types';

interface FooterProps {
  profile: Profile;
  onOpenAdmin: () => void;
  hideAdminButton?: boolean;
}

export const Footer: React.FC<FooterProps> = ({ profile, onOpenAdmin, hideAdminButton }) => {
  return (
    <footer className="py-12 border-t border-slate-200 dark:border-slate-800/60">
      <div className="max-w-5xl mx-auto px-6 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <div>
          <span>{profile.name}</span>
          <span className="mx-2">·</span>
          <span>Aspiring Platform Engineer</span>
        </div>

        {!hideAdminButton && (
          <div className="flex items-center gap-4">
            <button
              onClick={onOpenAdmin}
              className="hover:text-blue-500 dark:hover:text-blue-400 text-slate-500 dark:text-slate-400 border-b border-dotted border-slate-300 dark:border-slate-600 hover:border-blue-500 dark:hover:border-blue-400 transition-colors inline-flex items-center gap-1.5 cursor-pointer pb-0.5"
            >
              <Settings className="w-3 h-3" />
              <span>edit this site</span>
            </button>
          </div>
        )}
      </div>
    </footer>
  );
};
