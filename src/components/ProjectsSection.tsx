import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ExternalLink, Github, FolderGit2 } from 'lucide-react';
import { Project } from '../types';

interface ProjectsSectionProps {
  projects: Project[];
}

const ProjCardItem: React.FC<{ proj: Project; index: number }> = ({ proj, index }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.28, delay: (index % 3) * 0.04, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -2 }}
      className="flex flex-col justify-between rounded-xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#101726]/60 overflow-hidden shadow-sm hover:border-slate-300 dark:hover:border-slate-700 transition-all group"
    >
      {proj.image && !imgError && (
        <div className="w-full h-44 overflow-hidden bg-slate-100 dark:bg-slate-900">
          <img
            src={proj.image}
            alt={proj.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={() => setImgError(true)}
          />
        </div>
      )}

      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-2">
              <FolderGit2 className="w-4 h-4 text-blue-500 dark:text-blue-400 shrink-0" />
              <h3 className="font-bold text-base text-slate-900 dark:text-white line-clamp-1">
                {proj.name}
              </h3>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
            {proj.desc}
          </p>
        </div>

        <div>
          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {proj.tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700/50"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="flex items-center gap-3 pt-2 border-t border-slate-100 dark:border-slate-800/60">
            {proj.url && (
              <a
                href={proj.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
              >
                <span>View project</span>
                <ExternalLink className="w-3.5 h-3.5" strokeWidth={2.2} />
              </a>
            )}
            {proj.githubUrl && (
              <a
                href={proj.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-colors ml-auto"
                title="Source Code"
              >
                <Github className="w-3.5 h-3.5" strokeWidth={2.2} />
                <span>Code</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects }) => {
  return (
    <section id="projects" className="py-16 sm:py-20 border-t border-slate-200 dark:border-slate-800/80">
      <div className="max-w-5xl mx-auto px-6 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Projects
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
            Featured open-source software, cloud tools, and engineering systems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((proj, idx) => (
            <ProjCardItem key={proj.id} proj={proj} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};
