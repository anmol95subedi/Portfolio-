import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Clock, Cpu } from 'lucide-react';
import { Skill } from '../types';

interface SkillsSectionProps {
  skills: Skill[];
}

const SkillCardItem: React.FC<{ skill: Skill; index: number }> = ({ skill, index }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.28, delay: (index % 3) * 0.04, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -2 }}
      className="p-4 sm:p-5 rounded-xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#101726]/60 shadow-sm hover:border-blue-400 dark:hover:border-blue-500/40 transition-all flex flex-col justify-between"
    >
      <div>
        <div className="flex items-start gap-3.5 mb-3">
          {/* Skill Image / Icon */}
          <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/60 flex items-center justify-center p-1.5 shrink-0 overflow-hidden shadow-inner">
            {skill.image && !imgError ? (
              <img
                src={skill.image}
                alt={skill.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain"
                onError={() => setImgError(true)}
              />
            ) : (
              <Cpu className="w-5 h-5 text-blue-500 dark:text-blue-400" />
            )}
          </div>

          {/* Skill Name & Level */}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-sm text-slate-900 dark:text-white leading-tight truncate">
              {skill.name}
            </h3>
            {skill.level && (
              <span className="inline-block mt-1 text-[11px] font-medium px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300">
                {skill.level}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Hours Practiced / Invested */}
      <div className="pt-3 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-xs">
        <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-blue-500 dark:text-blue-400 shrink-0" />
          <span>Experience</span>
        </span>
        <span className="font-medium font-mono text-blue-600 dark:text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded">
          {skill.hours || '400+ hrs practiced'}
        </span>
      </div>
    </motion.div>
  );
};

export const SkillsSection: React.FC<SkillsSectionProps> = ({ skills }) => {
  return (
    <section id="skills" className="py-16 sm:py-20 border-t border-slate-200 dark:border-slate-800/80">
      <div className="max-w-5xl mx-auto px-6 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Skills
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
            Technologies, tools, and infrastructure competencies with hands-on practice.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {skills.map((skill, idx) => (
            <SkillCardItem key={skill.id} skill={skill} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};
