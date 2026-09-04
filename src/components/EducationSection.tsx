import React from 'react';
import { motion } from 'motion/react';
import { GraduationCap } from 'lucide-react';
import { Education } from '../types';

interface EducationSectionProps {
  education: Education[];
}

export const EducationSection: React.FC<EducationSectionProps> = ({ education }) => {
  return (
    <section id="education" className="py-16 sm:py-20 border-t border-slate-200 dark:border-slate-800/80">
      <div className="max-w-5xl mx-auto px-6 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Education
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
            Academic qualifications and degrees.
          </p>
        </div>

        <div className="space-y-4">
          {education.map((edu, idx) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.28, delay: idx * 0.04, ease: [0.16, 1, 0.3, 1] }}
              className="p-6 rounded-xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#101726]/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm hover:border-slate-300 dark:hover:border-slate-700 transition-all"
            >
              <div className="flex items-start sm:items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 text-blue-500 dark:text-blue-400 flex items-center justify-center shrink-0 mt-0.5 sm:mt-0">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-white">
                    {edu.degree}
                  </h3>
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    {edu.org}
                  </div>
                </div>
              </div>
              <div className="text-xs font-mono font-medium text-slate-500 dark:text-slate-400 pl-13 sm:pl-0">
                {edu.when}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
