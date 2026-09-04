import React, { useState, useEffect } from 'react';
import {
  User,
  Share2,
  Cpu,
  Briefcase,
  FolderGit2,
  GraduationCap,
  Mail,
  Plus,
  Trash2,
  Upload,
  Download,
  RotateCcw,
  ExternalLink,
  Clock,
  Image as ImageIcon,
  Check,
  X,
  Sparkles,
  Shield,
  Lock,
  LogOut,
  KeyRound,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import {
  PortfolioData,
  SocialLink,
  Skill,
  Experience,
  Project,
  Education,
  IconType,
} from '../types';
import { SocialIcon } from './SocialIcon';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  data: PortfolioData;
  onUpdateData: (newData: PortfolioData) => void;
  onShowToast: (msg: string) => void;
  onResetData: () => void;
  onLogout?: () => void;
}

type AdminTab =
  | 'profile'
  | 'socials'
  | 'skills'
  | 'experience'
  | 'projects'
  | 'education'
  | 'contact'
  | 'security';

export const AdminPanel: React.FC<AdminPanelProps> = ({
  isOpen,
  onClose,
  data,
  onUpdateData,
  onShowToast,
  onResetData,
  onLogout,
}) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('profile');
  const [statusMsg, setStatusMsg] = useState('');

  // Editable local state mirroring the original data
  const [profile, setProfile] = useState(data.profile);
  const [socialLinks, setSocialLinks] = useState(data.socialLinks);
  const [skills, setSkills] = useState(data.skills);
  const [experience, setExperience] = useState(data.experience);
  const [projects, setProjects] = useState(data.projects);
  const [education, setEducation] = useState(data.education);
  const [siteFavicon, setSiteFavicon] = useState(data.siteFavicon || '');
  const [siteTitle, setSiteTitle] = useState(data.siteTitle || '');
  const [adminPin, setAdminPin] = useState(data.adminPin || '2026');
  const [hideAdminButton, setHideAdminButton] = useState(data.hideAdminButton || false);

  // Keep admin panel inputs in sync with live data when opened or reset
  useEffect(() => {
    if (isOpen) {
      setProfile(data.profile);
      setSocialLinks(data.socialLinks);
      setSkills(data.skills);
      setExperience(data.experience);
      setProjects(data.projects);
      setEducation(data.education);
      setSiteFavicon(data.siteFavicon || '');
      setSiteTitle(data.siteTitle || '');
      setAdminPin(data.adminPin || '2026');
      setHideAdminButton(data.hideAdminButton || false);
    }
  }, [isOpen, data]);

  // Draft state for new items
  const [newSocial, setNewSocial] = useState<{
    title: string;
    url: string;
    iconType: IconType;
    customIconUrl: string;
  }>({
    title: '',
    url: '',
    iconType: 'github',
    customIconUrl: '',
  });

  const [newSkill, setNewSkill] = useState<{
    name: string;
    hours: string;
    level: string;
    image: string;
  }>({
    name: '',
    hours: '',
    level: 'Proficient',
    image: '',
  });

  const [newExp, setNewExp] = useState({
    role: '',
    org: '',
    dates: '',
    desc: '',
    image: '',
  });
  const [newProj, setNewProj] = useState({
    name: '',
    desc: '',
    tags: '',
    url: '',
    githubUrl: '',
    image: '',
  });
  const [newEdu, setNewEdu] = useState({ degree: '', org: '', when: '' });

  // Update helper for status message
  const triggerStatus = (msg: string) => {
    setStatusMsg(msg);
    setTimeout(() => {
      setStatusMsg((prev) => (prev === msg ? '' : prev));
    }, 3000);
  };

  // Avatar file upload handler
  const handleAvatarFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const res = event.target?.result as string;
      setProfile((prev) => ({ ...prev, avatar: res }));
      triggerStatus('Avatar updated');
      onShowToast('Avatar uploaded successfully');
    };
    reader.readAsDataURL(file);
  };

  // Site favicon file upload handler
  const handleFaviconFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const res = event.target?.result as string;
      setSiteFavicon(res);
      triggerStatus('Favicon updated');
      onShowToast('Site favicon updated');
    };
    reader.readAsDataURL(file);
  };

  // Skill image upload handler
  const handleSkillImageFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const res = event.target?.result as string;
      setNewSkill((prev) => ({ ...prev, image: res }));
    };
    reader.readAsDataURL(file);
  };

  // Project image upload handler
  const handleProjImageFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const res = event.target?.result as string;
      setNewProj((prev) => ({ ...prev, image: res }));
    };
    reader.readAsDataURL(file);
  };

  // Social custom icon upload handler
  const handleSocialIconFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const res = event.target?.result as string;
      setNewSocial((prev) => ({ ...prev, iconType: 'custom', customIconUrl: res }));
    };
    reader.readAsDataURL(file);
  };

  // Social Links management
  const handleAddSocial = () => {
    if (!newSocial.title.trim() || !newSocial.url.trim()) {
      onShowToast('Platform name and URL are required.');
      return;
    }
    const item: SocialLink = {
      id: 'social_' + Date.now(),
      title: newSocial.title.trim(),
      url: newSocial.url.trim(),
      iconType: newSocial.iconType,
      customIconUrl: newSocial.customIconUrl.trim() || undefined,
      enabled: true,
    };
    setSocialLinks([...socialLinks, item]);
    setNewSocial({ title: '', url: '', iconType: 'github', customIconUrl: '' });
    triggerStatus('Social link added');
    onShowToast(`Added link: ${item.title}`);
  };

  const handleToggleSocial = (id: string) => {
    setSocialLinks(
      socialLinks.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s))
    );
  };

  const handleDeleteSocial = (id: string) => {
    setSocialLinks(socialLinks.filter((s) => s.id !== id));
    triggerStatus('Social link removed');
  };

  // Skills management with images and hours invested/practiced
  const handleAddSkill = () => {
    if (!newSkill.name.trim()) {
      onShowToast('Skill name is required.');
      return;
    }
    const skillItem: Skill = {
      id: 'skill_' + Date.now(),
      name: newSkill.name.trim(),
      hours: newSkill.hours.trim() || '400+ hrs practiced',
      level: newSkill.level.trim() || 'Proficient',
      image: newSkill.image.trim() || undefined,
    };
    setSkills([...skills, skillItem]);
    setNewSkill({ name: '', hours: '', level: 'Proficient', image: '' });
    triggerStatus('Skill added');
    onShowToast(`Added skill: ${skillItem.name}`);
  };

  const handleDeleteSkill = (id: string) => {
    setSkills(skills.filter((s) => s.id !== id));
    triggerStatus('Skill removed');
  };

  // Experience management with image support
  const handleExpImageFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setNewExp((prev) => ({ ...prev, image: reader.result as string }));
    };
    reader.readAsDataURL(file);
  };

  const handleUpdateExpImage = (id: string, imageUrl: string) => {
    setExperience(
      experience.map((e) => (e.id === id ? { ...e, image: imageUrl } : e))
    );
    triggerStatus('Experience image updated');
  };

  const handleExpItemFile = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      handleUpdateExpImage(id, reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleAddExp = () => {
    if (!newExp.role.trim() || !newExp.org.trim()) {
      onShowToast('Role and organization are required.');
      return;
    }
    const expItem: Experience = {
      id: 'exp_' + Date.now(),
      role: newExp.role.trim(),
      org: newExp.org.trim(),
      dates: newExp.dates.trim() || 'Present',
      desc: newExp.desc.trim(),
      image: newExp.image.trim() || undefined,
    };
    setExperience([...experience, expItem]);
    setNewExp({ role: '', org: '', dates: '', desc: '', image: '' });
    triggerStatus('Experience added');
    onShowToast('Added experience entry');
  };

  const handleDeleteExp = (id: string) => {
    setExperience(experience.filter((e) => e.id !== id));
    triggerStatus('Experience removed');
  };

  // Projects management
  const handleAddProj = () => {
    if (!newProj.name.trim()) {
      onShowToast('Project name is required.');
      return;
    }
    const projItem: Project = {
      id: 'proj_' + Date.now(),
      name: newProj.name.trim(),
      desc: newProj.desc.trim(),
      tags: newProj.tags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
      url: newProj.url.trim() || undefined,
      githubUrl: newProj.githubUrl.trim() || undefined,
      image: newProj.image.trim() || undefined,
    };
    setProjects([...projects, projItem]);
    setNewProj({ name: '', desc: '', tags: '', url: '', githubUrl: '', image: '' });
    triggerStatus('Project added');
    onShowToast(`Added project: ${projItem.name}`);
  };

  const handleDeleteProj = (id: string) => {
    setProjects(projects.filter((p) => p.id !== id));
    triggerStatus('Project removed');
  };

  // Education management
  const handleAddEdu = () => {
    if (!newEdu.degree.trim()) {
      onShowToast('Degree or program is required.');
      return;
    }
    const eduItem: Education = {
      id: 'edu_' + Date.now(),
      degree: newEdu.degree.trim(),
      org: newEdu.org.trim(),
      when: newEdu.when.trim(),
    };
    setEducation([...education, eduItem]);
    setNewEdu({ degree: '', org: '', when: '' });
    triggerStatus('Education added');
    onShowToast('Added education entry');
  };

  const handleDeleteEdu = (id: string) => {
    setEducation(education.filter((e) => e.id !== id));
    triggerStatus('Education removed');
  };

  // Export JSON
  const handleExportJSON = () => {
    const fullData: PortfolioData = {
      ...data,
      profile,
      socialLinks,
      skills,
      experience,
      projects,
      education,
      siteFavicon,
      siteTitle,
    };
    const blob = new Blob([JSON.stringify(fullData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `portfolio-${profile.name.toLowerCase().replace(/\s+/g, '-')}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    triggerStatus('JSON exported');
    onShowToast('Exported portfolio JSON');
  };

  // Import JSON
  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed.profile) {
          setProfile(parsed.profile);
          setSocialLinks(parsed.socialLinks || []);
          setSkills(parsed.skills || []);
          setExperience(parsed.experience || []);
          setProjects(parsed.projects || []);
          setEducation(parsed.education || []);
          setSiteFavicon(parsed.siteFavicon || '');
          setSiteTitle(parsed.siteTitle || '');
          if (parsed.adminPin) setAdminPin(parsed.adminPin);
          if (parsed.hideAdminButton !== undefined) setHideAdminButton(parsed.hideAdminButton);
          onUpdateData(parsed);
          triggerStatus('Data imported & applied');
          onShowToast('Portfolio imported successfully');
        } else {
          onShowToast('Invalid portfolio file structure.');
        }
      } catch (err) {
        onShowToast('Failed to parse JSON file.');
      }
    };
    reader.readAsText(file);
  };

  // Save changes
  const handleSave = () => {
    const updated: PortfolioData = {
      ...data,
      profile,
      socialLinks,
      skills,
      experience,
      projects,
      education,
      siteFavicon,
      siteTitle,
      adminPin,
      hideAdminButton,
    };
    onUpdateData(updated);
    triggerStatus('Saved successfully!');
    onShowToast('Changes saved to live portfolio');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/75 backdrop-blur-sm">
        <motion.div
          id="admin-modal"
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          className="w-full max-w-5xl h-[92vh] rounded-xl border border-slate-700/80 bg-[#121927] text-[#e6edf3] shadow-2xl flex flex-col overflow-hidden"
          style={{ background: 'var(--card-bg)', color: 'var(--text)', borderColor: 'var(--border)' }}
        >
          {/* Top Actions matching original admin.html layout */}
          <div className="top-actions flex items-center justify-end gap-2">
            <button
              className="btn-sm"
              onClick={onClose}
              title="Return to live portfolio"
            >
              View live site ↗
            </button>

            <button
              className="btn-sm"
              onClick={handleExportJSON}
              title="Download JSON backup"
            >
              Export JSON
            </button>

            <label className="btn-sm file-btn" title="Restore from JSON backup">
              <span>Import JSON</span>
              <input
                type="file"
                accept="application/json"
                onChange={handleImportJSON}
              />
            </label>

            <button
              className="btn-sm danger"
              onClick={onResetData}
              title="Reset all fields to defaults"
            >
              Reset all
            </button>

            {onLogout && (
              <button
                className="btn-sm"
                onClick={() => {
                  onLogout();
                  onClose();
                }}
                title="Lock Admin Panel & require PIN"
              >
                <Lock className="w-3 h-3 text-amber-400" />
                <span>Lock</span>
              </button>
            )}
          </div>

          {/* Admin Shell: Sidebar + Main Content Area */}
          <div className="admin-shell flex-1 overflow-hidden">
            {/* Admin Sidebar matching original screenshot */}
            <div className="admin-sidebar shrink-0">
              <div className="brand">
                <span>⚙ Admin</span>
              </div>

              <button
                className={`admin-tab ${activeTab === 'profile' ? 'active' : ''}`}
                onClick={() => setActiveTab('profile')}
              >
                <span>Profile</span>
              </button>

              <button
                className={`admin-tab ${activeTab === 'skills' ? 'active' : ''}`}
                onClick={() => setActiveTab('skills')}
              >
                <span>Skills</span>
              </button>

              <button
                className={`admin-tab ${activeTab === 'experience' ? 'active' : ''}`}
                onClick={() => setActiveTab('experience')}
              >
                <span>Experience</span>
              </button>

              <button
                className={`admin-tab ${activeTab === 'projects' ? 'active' : ''}`}
                onClick={() => setActiveTab('projects')}
              >
                <span>Projects</span>
              </button>

              <button
                className={`admin-tab ${activeTab === 'education' ? 'active' : ''}`}
                onClick={() => setActiveTab('education')}
              >
                <span>Education</span>
              </button>

              <button
                className={`admin-tab ${activeTab === 'contact' ? 'active' : ''}`}
                onClick={() => setActiveTab('contact')}
              >
                <span>Contact</span>
                {data.messages && data.messages.length > 0 && (
                  <span className="ml-auto px-1.5 py-0.2 bg-blue-600 text-white rounded-full text-[10px] font-bold">
                    {data.messages.length}
                  </span>
                )}
              </button>

              <button
                className={`admin-tab ${activeTab === 'socials' ? 'active' : ''}`}
                onClick={() => setActiveTab('socials')}
              >
                <span>Social Links</span>
              </button>

              <button
                className={`admin-tab ${activeTab === 'security' ? 'active' : ''}`}
                onClick={() => setActiveTab('security')}
              >
                <div className="flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-blue-400" />
                  <span>Security & Access</span>
                </div>
              </button>
            </div>

            {/* Admin Main Area */}
            <div className="admin-main flex-1 overflow-y-auto">
              {/* TAB: PROFILE & BRANDING */}
              {activeTab === 'profile' && (
                <div>
                  <h2 className="text-2xl font-bold mb-1 text-white">Profile</h2>
                  <p className="text-sm text-slate-400 mb-6">
                    This is what shows in the hero section and the nav bar.
                  </p>

                  {/* Photo row matching image 1 */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-lg bg-[#070b14] border border-[#172236] overflow-hidden flex items-center justify-center shrink-0">
                      {profile.avatar ? (
                        <img
                          src={profile.avatar}
                          alt="Avatar"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-xl font-bold text-slate-400">
                          {profile.initials || 'AN'}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <label className="btn-sm file-btn">
                        <span>Change photo</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleAvatarFile}
                        />
                      </label>

                      {profile.avatar && (
                        <button
                          type="button"
                          className="btn-sm"
                          onClick={() => {
                            setProfile({ ...profile, avatar: '' });
                            triggerStatus('Photo removed');
                          }}
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Full name</label>
                    <input
                      type="text"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      placeholder="Anmol Subedi"
                    />
                  </div>

                  <div className="form-group">
                    <label>Initials (shown if no photo)</label>
                    <input
                      type="text"
                      maxLength={6}
                      value={profile.initials || profile.brandSymbol || 'AN'}
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          initials: e.target.value,
                          brandSymbol: e.target.value,
                        })
                      }
                      placeholder="AN"
                    />
                  </div>

                  <div className="form-group">
                    <label>Role / headline</label>
                    <input
                      type="text"
                      value={profile.role}
                      onChange={(e) => setProfile({ ...profile, role: e.target.value })}
                      placeholder="Aspiring Platform Engineer / SRE"
                    />
                  </div>

                  <div className="form-group">
                    <label>Location</label>
                    <input
                      type="text"
                      value={profile.location}
                      onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                      placeholder="Kathmandu, Nepal"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="form-group">
                      <label>Status text</label>
                      <input
                        type="text"
                        value={profile.status}
                        onChange={(e) => setProfile({ ...profile, status: e.target.value })}
                        placeholder="Open to opportunities"
                      />
                    </div>

                    <div className="form-group">
                      <label>Status dot</label>
                      <select
                        value={profile.statusActive ? 'active' : 'inactive'}
                        onChange={(e) =>
                          setProfile({
                            ...profile,
                            statusActive: e.target.value === 'active',
                          })
                        }
                      >
                        <option value="active">Active (green)</option>
                        <option value="inactive">Inactive (gray)</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Short bio</label>
                    <textarea
                      rows={3}
                      value={profile.bio}
                      onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                      placeholder="Computer Engineering student at IOE Thapathali Campus..."
                    />
                  </div>

                  {/* FAVICON UPLOAD SECTION */}
                  <div className="item-card mt-6">
                    <div className="flex items-center gap-2 mb-2 font-bold text-sm text-white">
                      <Sparkles className="w-4 h-4 text-blue-400" />
                      <span>Site Favicon</span>
                    </div>
                    <p className="text-xs text-slate-400 mb-4">
                      Upload an image or icon to customize the favicon shown in browser tabs.
                    </p>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                      {/* Current Favicon Preview */}
                      <div className="w-14 h-14 rounded-xl border border-slate-700 bg-slate-800/80 flex items-center justify-center p-2 shrink-0 overflow-hidden shadow-inner">
                        {siteFavicon ? (
                          <img
                            src={siteFavicon}
                            alt="Favicon preview"
                            className="w-full h-full object-contain"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white text-base">
                            {profile.brandSymbol || 'AS'}
                          </div>
                        )}
                      </div>

                      <div className="flex-1 w-full space-y-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <label className="btn-sm file-btn primary">
                            <Upload className="w-3.5 h-3.5" />
                            <span>Upload Favicon</span>
                            <input
                              type="file"
                              accept="image/png,image/x-icon,image/svg+xml,image/jpeg"
                              onChange={handleFaviconFile}
                            />
                          </label>

                          {siteFavicon && (
                            <button
                              type="button"
                              className="btn-sm"
                              onClick={() => {
                                setSiteFavicon('');
                                triggerStatus('Favicon reset to default symbol');
                              }}
                            >
                              Reset to default
                            </button>
                          )}
                        </div>

                        <input
                          type="text"
                          value={siteFavicon}
                          onChange={(e) => setSiteFavicon(e.target.value)}
                          placeholder="Or paste favicon image URL..."
                          className="text-xs py-1.5"
                        />
                      </div>
                    </div>
                  </div>

                  {/* AVATAR UPLOAD SECTION */}
                  <div className="item-card mt-4">
                    <div className="flex items-center gap-2 mb-2 font-bold text-sm text-white">
                      <User className="w-4 h-4 text-blue-400" />
                      <span>Profile Avatar / Photo</span>
                    </div>
                    <p className="text-xs text-slate-400 mb-4">
                      Upload your profile photo. If empty, the stylized monogram card ({profile.brandSymbol || 'AS'}) is displayed.
                    </p>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                      <div className="w-14 h-14 rounded-xl border border-slate-700 bg-slate-800/80 flex items-center justify-center p-1 shrink-0 overflow-hidden">
                        {profile.avatar ? (
                          <img
                            src={profile.avatar}
                            alt="Avatar preview"
                            className="w-full h-full object-cover rounded-lg"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-lg bg-slate-800 text-blue-400 font-bold flex items-center justify-center text-sm border border-slate-700">
                            {profile.brandSymbol || 'AS'}
                          </div>
                        )}
                      </div>

                      <div className="flex-1 w-full space-y-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <label className="btn-sm file-btn primary">
                            <Upload className="w-3.5 h-3.5" />
                            <span>Upload Avatar Photo</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleAvatarFile}
                            />
                          </label>

                          {profile.avatar && (
                            <button
                              type="button"
                              className="btn-sm"
                              onClick={() => setProfile({ ...profile, avatar: '' })}
                            >
                              Remove photo
                            </button>
                          )}
                        </div>

                        <input
                          type="text"
                          value={profile.avatar}
                          onChange={(e) => setProfile({ ...profile, avatar: e.target.value })}
                          placeholder="Or paste avatar image URL..."
                          className="text-xs py-1.5"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: SOCIAL LINKS (Manage GitHub, LinkedIn, etc.) */}
              {activeTab === 'socials' && (
                <div>
                  <h3 className="text-lg font-bold mb-2 text-white">Manage Social Media Links</h3>
                  <p className="text-xs text-slate-400 mb-4">
                    Configure your links for GitHub, LinkedIn, Twitter, Email, or add custom platforms. These appear on the hero card and contact footer.
                  </p>

                  {/* List of existing social links */}
                  <div className="space-y-3 mb-6">
                    {socialLinks.map((link) => (
                      <div
                        key={link.id}
                        className={`item-card flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                          !link.enabled ? 'opacity-60 border-dashed' : ''
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-blue-400 shrink-0">
                            <SocialIcon
                              link={link}
                              iconType={link?.iconType}
                              customIconUrl={link?.customIconUrl}
                              className="w-4 h-4"
                            />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-semibold text-sm text-white">{link.title}</h4>
                              {!link.enabled && (
                                <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                                  Hidden
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-slate-400 truncate max-w-sm sm:max-w-md">
                              {link.url}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 self-end sm:self-auto">
                          <button
                            type="button"
                            className="btn-sm"
                            onClick={() => handleToggleSocial(link.id)}
                          >
                            {link.enabled ? 'Disable' : 'Enable'}
                          </button>
                          <button
                            type="button"
                            className="btn-sm danger"
                            onClick={() => handleDeleteSocial(link.id)}
                            title="Delete link"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Add New Social Link Form */}
                  <div className="item-card border-blue-500/30">
                    <h4 className="font-bold text-sm text-white mb-3 flex items-center gap-2">
                      <Plus className="w-4 h-4 text-blue-400" />
                      <span>Add Social Link</span>
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="form-group mb-2">
                        <label>Platform / Label</label>
                        <input
                          type="text"
                          value={newSocial.title}
                          onChange={(e) => setNewSocial({ ...newSocial, title: e.target.value })}
                          placeholder="e.g. GitHub, LinkedIn, X"
                        />
                      </div>

                      <div className="form-group mb-2">
                        <label>Icon Style</label>
                        <select
                          value={newSocial.iconType}
                          onChange={(e) =>
                            setNewSocial({ ...newSocial, iconType: e.target.value as IconType })
                          }
                        >
                          <option value="github">GitHub</option>
                          <option value="linkedin">LinkedIn</option>
                          <option value="twitter">Twitter / X</option>
                          <option value="mail">Email (mailto:)</option>
                          <option value="globe">Website / Globe</option>
                          <option value="code">Code / LeetCode</option>
                          <option value="terminal">Terminal</option>
                          <option value="custom">Custom Favicon / Image</option>
                        </select>
                      </div>
                    </div>

                    <div className="form-group mb-2">
                      <label>Profile or Resource URL</label>
                      <input
                        type="url"
                        value={newSocial.url}
                        onChange={(e) => setNewSocial({ ...newSocial, url: e.target.value })}
                        placeholder="https://github.com/username or https://linkedin.com/in/username"
                      />
                    </div>

                    {newSocial.iconType === 'custom' && (
                      <div className="form-group mb-2">
                        <label>Custom Icon Image or Favicon URL</label>
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={newSocial.customIconUrl}
                            onChange={(e) =>
                              setNewSocial({ ...newSocial, customIconUrl: e.target.value })
                            }
                            placeholder="https://example.com/icon.svg or upload file"
                          />
                          <label className="btn-sm file-btn shrink-0">
                            <Upload className="w-3.5 h-3.5" />
                            <span>Upload</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleSocialIconFile}
                            />
                          </label>
                        </div>
                      </div>
                    )}

                    <div className="mt-3 flex justify-end">
                      <button
                        type="button"
                        className="btn-sm primary"
                        onClick={handleAddSocial}
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Social Link</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: SKILLS (With image upload and hours practiced/invested, replacing % bar) */}
              {activeTab === 'skills' && (
                <div>
                  <h3 className="text-lg font-bold mb-2 text-white">Skills Management</h3>
                  <p className="text-xs text-slate-400 mb-4">
                    Add tech skills with custom icons/images and hours practiced or invested.
                  </p>

                  {/* List of existing skills */}
                  <div className="space-y-3 mb-6">
                    {skills.map((skill) => (
                      <div
                        key={skill.id}
                        className="item-card flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center p-1.5 shrink-0 overflow-hidden">
                            {skill.image ? (
                              <img
                                src={skill.image}
                                alt={skill.name}
                                referrerPolicy="no-referrer"
                                className="w-full h-full object-contain"
                              />
                            ) : (
                              <Cpu className="w-5 h-5 text-blue-400" />
                            )}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-semibold text-sm text-white">{skill.name}</h4>
                              {skill.level && (
                                <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                                  {skill.level}
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-blue-400 flex items-center gap-1 mt-0.5 font-mono">
                              <Clock className="w-3 h-3" />
                              <span>{skill.hours || '400+ hrs practiced'}</span>
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 self-end sm:self-auto">
                          <button
                            type="button"
                            className="btn-sm danger"
                            onClick={() => handleDeleteSkill(skill.id)}
                            title="Delete skill"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Remove</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Add New Skill Form */}
                  <div className="item-card border-blue-500/30">
                    <h4 className="font-bold text-sm text-white mb-3 flex items-center gap-2">
                      <Plus className="w-4 h-4 text-blue-400" />
                      <span>Add New Skill</span>
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="form-group mb-2">
                        <label>Skill Name *</label>
                        <input
                          type="text"
                          value={newSkill.name}
                          onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                          placeholder="e.g. Docker & Containers"
                        />
                      </div>

                      <div className="form-group mb-2">
                        <label>Hours Practiced / Invested *</label>
                        <input
                          type="text"
                          value={newSkill.hours}
                          onChange={(e) => setNewSkill({ ...newSkill, hours: e.target.value })}
                          placeholder="e.g. 650+ hrs invested or 500 hrs practiced"
                        />
                        <div className="hint">Replaces the % bar with realistic practice time.</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="form-group mb-2">
                        <label>Proficiency / Level</label>
                        <input
                          type="text"
                          value={newSkill.level}
                          onChange={(e) => setNewSkill({ ...newSkill, level: e.target.value })}
                          placeholder="e.g. Daily Driver, Advanced, Proficient, Learning"
                        />
                      </div>

                      <div className="form-group mb-2">
                        <label>Skill Logo / Image</label>
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={newSkill.image}
                            onChange={(e) => setNewSkill({ ...newSkill, image: e.target.value })}
                            placeholder="Image URL or upload file..."
                            className="text-xs"
                          />
                          <label className="btn-sm file-btn shrink-0">
                            <Upload className="w-3.5 h-3.5" />
                            <span>Upload</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleSkillImageFile}
                            />
                          </label>
                        </div>
                      </div>
                    </div>

                    {newSkill.image && (
                      <div className="mt-2 mb-2 flex items-center gap-2">
                        <span className="text-xs text-slate-400">Preview:</span>
                        <div className="w-8 h-8 rounded border border-slate-700 p-1 bg-slate-800">
                          <img
                            src={newSkill.image}
                            alt="Skill preview"
                            className="w-full h-full object-contain"
                          />
                        </div>
                      </div>
                    )}

                    <div className="mt-3 flex justify-end">
                      <button
                        type="button"
                        className="btn-sm primary"
                        onClick={handleAddSkill}
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Skill</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: EXPERIENCE */}
              {activeTab === 'experience' && (
                <div>
                  <h3 className="text-lg font-bold mb-2 text-white">Experience</h3>
                  <p className="text-xs text-slate-400 mb-4">
                    Manage your work history, internships, and leadership roles.
                  </p>

                  <div className="space-y-3 mb-6">
                    {experience.map((exp) => (
                      <div key={exp.id} className="item-card">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                          <div className="flex items-start gap-3 w-full">
                            {/* Experience Image Thumbnail / Preview */}
                            <div className="w-12 h-12 rounded-lg bg-[#070b14] border border-[#172236] overflow-hidden flex items-center justify-center shrink-0 mt-0.5">
                              {exp.image ? (
                                <img
                                  src={exp.image}
                                  alt={exp.org}
                                  className="w-full h-full object-contain p-1"
                                />
                              ) : (
                                <Briefcase className="w-5 h-5 text-blue-400" />
                              )}
                            </div>

                            <div className="flex-1 min-w-0">
                              <h4 className="font-bold text-sm text-white">{exp.role}</h4>
                              <div className="text-xs text-blue-400 font-medium">
                                {exp.org} · <span className="text-slate-400">{exp.dates}</span>
                              </div>
                              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                                {exp.desc}
                              </p>

                              {/* Experience Image Options */}
                              <div className="mt-3 pt-3 border-t border-[#172236]/80 flex flex-wrap items-center gap-2">
                                <label className="btn-sm file-btn text-xs py-1" title="Upload company logo or photo">
                                  <span>{exp.image ? 'Change image' : 'Add image'}</span>
                                  <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleExpItemFile(exp.id, e)}
                                  />
                                </label>

                                <input
                                  type="text"
                                  className="text-xs py-1 px-2.5 flex-1 min-w-[140px] max-w-xs"
                                  placeholder="Or image URL..."
                                  value={exp.image || ''}
                                  onChange={(e) => handleUpdateExpImage(exp.id, e.target.value)}
                                />

                                {exp.image && (
                                  <button
                                    type="button"
                                    className="btn-sm text-xs py-1"
                                    onClick={() => handleUpdateExpImage(exp.id, '')}
                                    title="Remove image"
                                  >
                                    Remove image
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>

                          <button
                            type="button"
                            className="btn-sm danger self-end sm:self-auto shrink-0"
                            onClick={() => handleDeleteExp(exp.id)}
                            title="Delete entry"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Add Experience Form */}
                  <div className="item-card border-blue-500/30">
                    <h4 className="font-bold text-sm text-white mb-3 flex items-center gap-2">
                      <Plus className="w-4 h-4 text-blue-400" />
                      <span>Add Experience</span>
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="form-group mb-2">
                        <label>Role / Title *</label>
                        <input
                          type="text"
                          value={newExp.role}
                          onChange={(e) => setNewExp({ ...newExp, role: e.target.value })}
                          placeholder="e.g. Platform Engineering Intern"
                        />
                      </div>
                      <div className="form-group mb-2">
                        <label>Organization / Company *</label>
                        <input
                          type="text"
                          value={newExp.org}
                          onChange={(e) => setNewExp({ ...newExp, org: e.target.value })}
                          placeholder="e.g. Cloud Native Tech"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="form-group mb-2">
                        <label>Dates</label>
                        <input
                          type="text"
                          value={newExp.dates}
                          onChange={(e) => setNewExp({ ...newExp, dates: e.target.value })}
                          placeholder="e.g. Jun 2025 — Aug 2025"
                        />
                      </div>

                      {/* Image option for new experience */}
                      <div className="form-group mb-2">
                        <label>Experience Logo / Image</label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={newExp.image}
                            onChange={(e) => setNewExp({ ...newExp, image: e.target.value })}
                            placeholder="Image URL or upload"
                            className="flex-1"
                          />
                          <label className="btn-sm file-btn shrink-0" title="Upload local image">
                            <Upload className="w-3.5 h-3.5" />
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleExpImageFile}
                            />
                          </label>
                        </div>
                      </div>
                    </div>

                    {newExp.image && (
                      <div className="mt-1 mb-2 flex items-center gap-2">
                        <span className="text-xs text-slate-400">Image Preview:</span>
                        <div className="w-8 h-8 rounded border border-slate-700 p-1 bg-slate-800 flex items-center justify-center">
                          <img
                            src={newExp.image}
                            alt="Experience preview"
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <button
                          type="button"
                          className="text-xs text-slate-400 hover:text-red-400 transition-colors"
                          onClick={() => setNewExp({ ...newExp, image: '' })}
                        >
                          Clear
                        </button>
                      </div>
                    )}

                    <div className="form-group mb-2">
                      <label>Description</label>
                      <textarea
                        rows={2}
                        value={newExp.desc}
                        onChange={(e) => setNewExp({ ...newExp, desc: e.target.value })}
                        placeholder="Brief summary of duties and accomplishments..."
                      />
                    </div>

                    <div className="mt-3 flex justify-end">
                      <button
                        type="button"
                        className="btn-sm primary"
                        onClick={handleAddExp}
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Experience</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: PROJECTS */}
              {activeTab === 'projects' && (
                <div>
                  <h3 className="text-lg font-bold mb-2 text-white">Projects</h3>
                  <p className="text-xs text-slate-400 mb-4">
                    Showcase your featured tools, utilities, and infrastructure implementations.
                  </p>

                  <div className="space-y-3 mb-6">
                    {projects.map((proj) => (
                      <div key={proj.id} className="item-card">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                          <div className="flex-1">
                            <h4 className="font-bold text-sm text-white">{proj.name}</h4>
                            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                              {proj.desc}
                            </p>

                            <div className="flex flex-wrap gap-1.5 mt-2">
                              {proj.tags.map((tag, i) => (
                                <span
                                  key={i}
                                  className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>

                            <div className="flex items-center gap-3 mt-3 text-xs">
                              {proj.githubUrl && (
                                <a
                                  href={proj.githubUrl}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-blue-400 hover:underline flex items-center gap-1"
                                >
                                  <span>GitHub</span>
                                  <ExternalLink className="w-3 h-3" />
                                </a>
                              )}
                              {proj.url && (
                                <a
                                  href={proj.url}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-emerald-400 hover:underline flex items-center gap-1"
                                >
                                  <span>Live Demo</span>
                                  <ExternalLink className="w-3 h-3" />
                                </a>
                              )}
                            </div>
                          </div>

                          <button
                            type="button"
                            className="btn-sm danger shrink-0 self-end sm:self-auto"
                            onClick={() => handleDeleteProj(proj.id)}
                            title="Delete project"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Add Project Form */}
                  <div className="item-card border-blue-500/30">
                    <h4 className="font-bold text-sm text-white mb-3 flex items-center gap-2">
                      <Plus className="w-4 h-4 text-blue-400" />
                      <span>Add Project</span>
                    </h4>

                    <div className="form-group mb-2">
                      <label>Project Title *</label>
                      <input
                        type="text"
                        value={newProj.name}
                        onChange={(e) => setNewProj({ ...newProj, name: e.target.value })}
                        placeholder="e.g. Server Health Monitor"
                      />
                    </div>

                    <div className="form-group mb-2">
                      <label>Description</label>
                      <textarea
                        rows={2}
                        value={newProj.desc}
                        onChange={(e) => setNewProj({ ...newProj, desc: e.target.value })}
                        placeholder="What problem does it solve and what tech does it use?"
                      />
                    </div>

                    <div className="form-group mb-2">
                      <label>Tags (comma separated)</label>
                      <input
                        type="text"
                        value={newProj.tags}
                        onChange={(e) => setNewProj({ ...newProj, tags: e.target.value })}
                        placeholder="e.g. bash, systemd, linux, docker"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="form-group mb-2">
                        <label>GitHub Repository URL</label>
                        <input
                          type="url"
                          value={newProj.githubUrl}
                          onChange={(e) => setNewProj({ ...newProj, githubUrl: e.target.value })}
                          placeholder="https://github.com/..."
                        />
                      </div>
                      <div className="form-group mb-2">
                        <label>Live URL / Demo</label>
                        <input
                          type="url"
                          value={newProj.url}
                          onChange={(e) => setNewProj({ ...newProj, url: e.target.value })}
                          placeholder="https://..."
                        />
                      </div>
                    </div>

                    <div className="form-group mb-2">
                      <label>Project Image / Screenshot</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={newProj.image}
                          onChange={(e) => setNewProj({ ...newProj, image: e.target.value })}
                          placeholder="Image URL or upload screenshot..."
                        />
                        <label className="btn-sm file-btn shrink-0">
                          <Upload className="w-3.5 h-3.5" />
                          <span>Upload</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleProjImageFile}
                          />
                        </label>
                      </div>
                    </div>

                    <div className="mt-3 flex justify-end">
                      <button
                        type="button"
                        className="btn-sm primary"
                        onClick={handleAddProj}
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Project</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: EDUCATION */}
              {activeTab === 'education' && (
                <div>
                  <h3 className="text-lg font-bold mb-2 text-white">Education</h3>
                  <p className="text-xs text-slate-400 mb-4">
                    Degree programs, universities, and academic milestones.
                  </p>

                  <div className="space-y-3 mb-6">
                    {education.map((edu) => (
                      <div key={edu.id} className="item-card">
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <h4 className="font-bold text-sm text-white">{edu.degree}</h4>
                            <div className="text-xs text-blue-400 mt-0.5">
                              {edu.org} · <span className="text-slate-400">{edu.when}</span>
                            </div>
                          </div>
                          <button
                            type="button"
                            className="btn-sm danger shrink-0"
                            onClick={() => handleDeleteEdu(edu.id)}
                            title="Delete education entry"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Add Education Form */}
                  <div className="item-card border-blue-500/30">
                    <h4 className="font-bold text-sm text-white mb-3 flex items-center gap-2">
                      <Plus className="w-4 h-4 text-blue-400" />
                      <span>Add Education</span>
                    </h4>

                    <div className="form-group mb-2">
                      <label>Degree / Program *</label>
                      <input
                        type="text"
                        value={newEdu.degree}
                        onChange={(e) => setNewEdu({ ...newEdu, degree: e.target.value })}
                        placeholder="e.g. B.E. Computer Engineering"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="form-group mb-2">
                        <label>University / Campus</label>
                        <input
                          type="text"
                          value={newEdu.org}
                          onChange={(e) => setNewEdu({ ...newEdu, org: e.target.value })}
                          placeholder="e.g. IOE Thapathali Campus"
                        />
                      </div>
                      <div className="form-group mb-2">
                        <label>Years / Graduation</label>
                        <input
                          type="text"
                          value={newEdu.when}
                          onChange={(e) => setNewEdu({ ...newEdu, when: e.target.value })}
                          placeholder="e.g. 2022 — 2026"
                        />
                      </div>
                    </div>

                    <div className="mt-3 flex justify-end">
                      <button
                        type="button"
                        className="btn-sm primary"
                        onClick={handleAddEdu}
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Education</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: CONTACT & MESSAGES */}
              {activeTab === 'contact' && (
                <div>
                  <h3 className="text-lg font-bold mb-2 text-white">Contact & Received Messages</h3>
                  <p className="text-xs text-slate-400 mb-4">
                    Inquiries submitted via the "Get In Touch" form on your live site.
                  </p>

                  {(!data.messages || data.messages.length === 0) ? (
                    <div className="item-card text-center py-8 text-slate-400 text-xs">
                      <Mail className="w-8 h-8 mx-auto mb-2 text-slate-500 opacity-60" />
                      <p>No messages received yet.</p>
                      <p className="text-slate-500 mt-1">
                        Submissions from your "Get In Touch" section will appear here.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {data.messages.map((m) => (
                        <div key={m.id} className="item-card">
                          <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
                            <span className="font-semibold text-white text-sm">{m.name}</span>
                            <span className="font-mono">{m.timestamp}</span>
                          </div>
                          <div className="text-xs text-blue-400 mb-2 font-mono">
                            <a href={`mailto:${m.email}`} className="hover:underline">
                              {m.email}
                            </a>
                          </div>
                          <p className="text-xs text-slate-200 whitespace-pre-wrap bg-slate-900/50 p-2.5 rounded border border-slate-800">
                            {m.message}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB: SECURITY & GITHUB ACCESS */}
              {activeTab === 'security' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold mb-1 text-white flex items-center gap-2">
                      <Shield className="w-5 h-5 text-blue-400" />
                      <span>Security & Owner Access</span>
                    </h3>
                    <p className="text-xs text-slate-400">
                      Configure your master PIN and visibility settings to keep visitors out of the admin panel.
                    </p>
                  </div>

                  {/* Master PIN Configuration */}
                  <div className="item-card space-y-3">
                    <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                      <KeyRound className="w-4 h-4 text-blue-400" />
                      <span>Admin Master PIN / Password</span>
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Anyone attempting to access the Admin Panel will be challenged for this PIN.
                    </p>
                    <div className="max-w-xs">
                      <label className="text-xs text-slate-300 font-medium block mb-1">
                        Current PIN
                      </label>
                      <input
                        type="text"
                        value={adminPin}
                        onChange={(e) => setAdminPin(e.target.value)}
                        placeholder="e.g. 2026"
                        className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700 text-white font-mono text-sm focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Stealth Mode Toggle */}
                  <div className="item-card space-y-3">
                    <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                      <Lock className="w-4 h-4 text-amber-400" />
                      <span>Stealth Mode (Public Visibility)</span>
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      When enabled, the Settings gear button in the navigation bar and the "edit this site" footer link are completely hidden from normal visitors.
                    </p>

                    <label className="flex items-start gap-3 p-3 rounded-lg bg-slate-900/70 border border-slate-800 cursor-pointer hover:border-slate-700 transition-colors">
                      <input
                        type="checkbox"
                        checked={hideAdminButton}
                        onChange={(e) => setHideAdminButton(e.target.checked)}
                        className="mt-0.5 rounded border-slate-700 text-blue-600 focus:ring-blue-500 shrink-0 cursor-pointer"
                      />
                      <div>
                        <span className="text-xs font-semibold text-white block">
                          Hide admin buttons from public view (Recommended for GitHub Pages)
                        </span>
                        <span className="text-[11px] text-slate-400 block mt-0.5">
                          Visitors won't see any edit or settings buttons on your portfolio.
                        </span>
                      </div>
                    </label>
                  </div>

                  {/* Secret Owner Access Shortcuts */}
                  <div className="item-card space-y-2 bg-blue-950/20 border-blue-900/40">
                    <h4 className="text-xs font-bold text-blue-400 uppercase tracking-wider">
                      How only YOU can open the Admin Panel:
                    </h4>
                    <ul className="text-xs text-slate-300 space-y-2 list-disc list-inside">
                      <li>
                        <strong>Keyboard Shortcut:</strong> Press <kbd className="px-1.5 py-0.5 bg-slate-800 rounded font-mono text-[10px] text-slate-200">Ctrl</kbd> + <kbd className="px-1.5 py-0.5 bg-slate-800 rounded font-mono text-[10px] text-slate-200">Shift</kbd> + <kbd className="px-1.5 py-0.5 bg-slate-800 rounded font-mono text-[10px] text-slate-200">A</kbd> (or <kbd className="px-1.5 py-0.5 bg-slate-800 rounded font-mono text-[10px] text-slate-200">Cmd</kbd> on Mac) anywhere on your website.
                      </li>
                      <li>
                        <strong>Secret Logo Gesture:</strong> Rapidly triple-click your brand symbol (<span className="font-mono text-blue-400">AN</span>) in the top-left of the navbar.
                      </li>
                      <li>
                        <strong>Secret URL Param:</strong> Visit your site with <span className="font-mono text-emerald-400">?admin</span> appended to the URL (e.g. <span className="font-mono text-slate-400">anmolsubedi.github.io/?admin</span>).
                      </li>
                    </ul>
                  </div>

                  {/* GitHub Pages Persistence Guide */}
                  <div className="item-card space-y-2">
                    <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                      Hosting on GitHub Pages Explained
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      GitHub Pages hosts static websites. When you edit here in the browser, changes are saved to your browser's local storage.
                    </p>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      To permanently publish edits for <strong>all visitors on the web</strong>:
                    </p>
                    <ol className="text-xs text-slate-300 space-y-1.5 list-decimal list-inside pl-1">
                      <li>Click the <strong className="text-blue-400">Export JSON</strong> button in the top bar to save your configuration.</li>
                      <li>Or, copy the exported JSON to <span className="font-mono text-slate-400">src/data/defaultData.ts</span> and push to GitHub (`git push origin main`).</li>
                    </ol>
                  </div>
                </div>
              )}

              {/* Sticky Save Bar matching original admin.html layout */}
              <div className="save-bar">
                <span className="status-msg flex items-center gap-1.5 text-emerald-400">
                  {statusMsg && (
                    <>
                      <Check className="w-4 h-4" />
                      <span>{statusMsg}</span>
                    </>
                  )}
                </span>
                <button
                  type="button"
                  className="btn-sm primary"
                  onClick={handleSave}
                  style={{ padding: '0.5rem 1.25rem' }}
                >
                  <Check className="w-4 h-4" />
                  <span>Save changes</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
