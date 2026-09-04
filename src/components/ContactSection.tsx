import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send, CheckCircle2, Mail, MapPin, Copy, Check } from 'lucide-react';
import { ContactMessage, Profile, SocialLink } from '../types';
import { SocialIcon } from './SocialIcon';

interface ContactSectionProps {
  profile: Profile;
  socialLinks: SocialLink[];
  onSendMessage: (msg: Omit<ContactMessage, 'id' | 'timestamp'>) => void;
  onShowToast: (msg: string) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  profile,
  socialLinks,
  onSendMessage,
  onShowToast,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const emailLink = socialLinks.find((s) => s.iconType === 'mail')?.url.replace('mailto:', '') || 'anmol97subedi@gmail.com';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      onShowToast('Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      onSendMessage({
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
      });
      setIsSubmitting(false);
      setSubmitted(true);
      setName('');
      setEmail('');
      setMessage('');
      onShowToast('Message received! Thank you for reaching out.');

      // Reset success state after 4 seconds
      setTimeout(() => setSubmitted(false), 4000);
    }, 600);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailLink);
    setCopiedEmail(true);
    onShowToast(`Copied ${emailLink} to clipboard!`);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section id="contact" className="py-20 border-t border-slate-200 dark:border-slate-800/80">
      <div className="max-w-5xl mx-auto px-6 sm:px-8">
        {/* Section Header matching Image 4 */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-3"
          >
            Get In Touch
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.28, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed"
          >
            I'm always interested in new opportunities, SRE challenges, and engineering collaborations.
            Feel free to reach out if you'd like to connect!
          </motion.p>
        </div>

        {/* Contact Form Card matching Image 4 */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.28, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mx-auto rounded-2xl border border-slate-200 dark:border-slate-800/90 bg-white dark:bg-[#101726]/90 p-6 sm:p-10 shadow-xl"
        >
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-10 text-center space-y-3"
            >
              <div className="w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 flex items-center justify-center mx-auto mb-2">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Message Sent Successfully!
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 max-w-sm mx-auto">
                Thanks for getting in touch. Your note has been saved and I will get back to you soon.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-4 text-xs font-medium text-blue-500 dark:text-blue-400 hover:underline cursor-pointer"
              >
                Send another message
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Row 1: Name * and Email * */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-2"
                  >
                    Name *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700/80 bg-slate-50 dark:bg-[#192233] text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-2"
                  >
                    Email *
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@example.com"
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700/80 bg-slate-50 dark:bg-[#192233] text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm transition-colors"
                  />
                </div>
              </div>

              {/* Row 2: Message * */}
              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-2"
                >
                  Message *
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="How can I help you? Let's discuss projects, opportunities, or ideas."
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700/80 bg-slate-50 dark:bg-[#192233] text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm transition-colors resize-y"
                />
              </div>

              {/* Submit button with hover animation matching Image 4 */}
              <div>
                <motion.button
                  id="send-message-btn"
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-sm text-white bg-blue-600 hover:bg-blue-500 disabled:opacity-50 shadow-md shadow-blue-600/20 transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                </motion.button>
              </div>
            </form>
          )}
        </motion.div>

        {/* Quick Contact Info Cards */}
        <div className="max-w-2xl mx-auto mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#101726]/50 flex items-center justify-between">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5" strokeWidth={2.1} />
              </div>
              <div className="truncate">
                <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400">Direct Email</div>
                <a
                  href={`mailto:${emailLink}`}
                  className="text-xs font-semibold text-slate-800 dark:text-slate-200 hover:text-sky-600 dark:hover:text-sky-400 transition-colors truncate block"
                >
                  {emailLink}
                </a>
              </div>
            </div>
            <button
              onClick={handleCopyEmail}
              className="p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors cursor-pointer shrink-0 ml-2"
              title="Copy email"
            >
              {copiedEmail ? <Check className="w-4 h-4 text-emerald-500 dark:text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#101726]/50 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5" strokeWidth={2.1} />
            </div>
            <div>
              <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400">Location</div>
              <div className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                {profile.location || 'Kathmandu, Nepal'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
