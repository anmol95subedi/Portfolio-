import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Briefcase } from 'lucide-react';
import { Experience } from '../types';

interface ExperienceSectionProps {
  experience: Experience[];
}

const ExpCardItem: React.FC<{ item: Experience; index: number }> = ({ item, index }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.28, delay: (index % 4) * 0.04, ease: [0.16, 1, 0.3, 1] }}
      className="p-6 rounded-xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#101726]/60 shadow-sm hover:border-slate-300 dark:hover:border-slate-700 transition-all"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 overflow-hidden flex items-center justify-center shrink-0">
            {item.image && !imgError ? (
              <img
                src={item.image}
                alt={item.org}
                className="w-full h-full object-contain p-1 rounded-lg"
                onError={() => setImgError(true)}
              />
            ) : (
              <Briefcase className="w-4 h-4 text-blue-500 dark:text-blue-400" />
            )}
          </div>
          <div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              {item.role}
            </h3>
            <div className="text-sm font-medium text-blue-500 dark:text-blue-400">
              {item.org}
            </div>
          </div>
        </div>
        <div className="text-xs font-mono font-medium text-slate-500 dark:text-slate-400 sm:text-right">
          {item.dates}
        </div>
      </div>
      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mt-3 pl-0 sm:pl-13">
        {item.desc}
      </p>
    </motion.div>
  );
};

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ experience }) => {
  return (
    <section id="experience" className="py-16 sm:py-20 border-t border-slate-200 dark:border-slate-800/80">
      <div className="max-w-5xl mx-auto px-6 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Experience
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
            Professional roles, engineering internships, and leadership contributions.
          </p>
        </div>

        <div className="space-y-6">
          {experience.map((item, idx) => (
            <ExpCardItem key={item.id} item={item} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};
