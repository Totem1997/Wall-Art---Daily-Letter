import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ThemeConfig, Letter } from '../types';
import themesData from '../data/Theme.json';
import { X, Palette, User, RefreshCw, Check } from 'lucide-react';

interface ArchiveDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentTheme: ThemeConfig;
  onSelectTheme: (themeId: string) => void;
  userName: string;
  onUpdateName: (name: string) => void;
  onSelectLetter?: (letter: Letter) => void;
  onResetApp: () => void;
}

export const ArchiveDrawer: React.FC<ArchiveDrawerProps> = ({
  isOpen,
  onClose,
  currentTheme,
  onSelectTheme,
  userName,
  onUpdateName,
  onResetApp
}) => {
  const [activeTab, setActiveTab] = useState<'themes' | 'profile'>('themes');
  const [editingName, setEditingName] = useState(userName);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-lg max-h-[85vh] rounded-3xl paper-card shadow-2xl flex flex-col overflow-hidden border"
          style={{ backgroundColor: currentTheme.cardBg }}
        >
          {/* Header */}
          <div className="p-5 border-b border-stone-200/60 flex items-center justify-between">
            <h3 className="font-serif-display text-xl font-semibold" style={{ color: currentTheme.textColor }}>
              Settings & Personalization
            </h3>
            <button 
              onClick={onClose}
              aria-label="Close modal"
              className="p-2 rounded-full hover:bg-stone-200/50 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5 opacity-60" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-stone-200/60 bg-stone-50/50 p-1 text-xs font-sans-clean font-medium">
            <button
              onClick={() => setActiveTab('themes')}
              className={`flex-1 py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'themes' ? 'bg-white shadow-xs font-semibold' : 'opacity-60 hover:opacity-100'
              }`}
              style={{ color: currentTheme.textColor }}
            >
              <Palette className="w-3.5 h-3.5" />
              <span>Themes</span>
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className={`flex-1 py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'profile' ? 'bg-white shadow-xs font-semibold' : 'opacity-60 hover:opacity-100'
              }`}
              style={{ color: currentTheme.textColor }}
            >
              <User className="w-3.5 h-3.5" />
              <span>Personalize</span>
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-6 overflow-y-auto space-y-4 flex-1">
            {/* Themes Tab */}
            {activeTab === 'themes' && (
              <div className="space-y-3">
                <p className="font-serif-body text-xs opacity-75 mb-3">
                  Rotate your stationery palette. Only colors change—the calm layout remains identical.
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {themesData.map((t) => {
                    const isSelected = t.id === currentTheme.id;
                    return (
                      <div
                        key={t.id}
                        onClick={() => onSelectTheme(t.id)}
                        className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                          isSelected ? 'border-2 shadow-sm ring-1 ring-amber-300' : 'hover:border-stone-400 opacity-80'
                        }`}
                        style={{ backgroundColor: t.cardBg, borderColor: isSelected ? t.primary : '#E5E7EB' }}
                      >
                        <div className="flex items-center gap-2.5">
                          <div 
                            className="w-5 h-5 rounded-full shadow-xs border border-white"
                            style={{ backgroundColor: t.primary }}
                          />
                          <span className="font-serif-display text-sm font-semibold" style={{ color: t.textColor }}>
                            {t.name}
                          </span>
                        </div>
                        {isSelected && <Check className="w-4 h-4" style={{ color: t.primary }} />}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-sans-clean uppercase tracking-wider mb-2 opacity-70">
                    Your First Name
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={editingName}
                      onChange={(e) => setEditingName(e.target.value)}
                      className="flex-1 px-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50/50 font-serif-body text-sm"
                      maxLength={24}
                    />
                    <button
                      onClick={() => onUpdateName(editingName || 'Friend')}
                      className="px-4 py-2.5 rounded-xl text-white font-serif-display text-sm font-medium shadow-xs"
                      style={{ backgroundColor: currentTheme.primary }}
                    >
                      Save
                    </button>
                  </div>
                </div>

                <div className="pt-4 border-t border-stone-200/60 space-y-2">
                  <span className="block text-xs font-sans-clean uppercase tracking-wider opacity-60">
                    Reset Experience
                  </span>
                  <button
                    onClick={() => {
                      if (confirm("Reset all saved progress and first name?")) {
                        onResetApp();
                        onClose();
                      }
                    }}
                    className="w-full py-2.5 px-4 rounded-xl border border-rose-200 bg-rose-50/40 text-rose-700 font-sans-clean text-xs font-semibold flex items-center justify-center gap-2 hover:bg-rose-100/50 transition-colors"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Reset Local Data</span>
                  </button>
                </div>
              </div>
            )}

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
