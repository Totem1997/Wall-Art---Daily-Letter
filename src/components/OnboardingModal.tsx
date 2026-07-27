import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ThemeConfig } from '../types';
import { HeartIcon } from './BotanicalDecorations';

interface OnboardingModalProps {
  currentTheme: ThemeConfig;
  onSaveName: (name: string) => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({ currentTheme, onSaveName }) => {
  const [nameInput, setNameInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = nameInput.trim();
    onSaveName(cleanName || 'Friend');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.92, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md p-8 rounded-2xl paper-card shadow-2xl relative overflow-hidden text-center"
        style={{ backgroundColor: currentTheme.cardBg }}
      >
        <div className="flex justify-center mb-4">
          <div 
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{ backgroundColor: currentTheme.secondary }}
          >
            <HeartIcon className="w-5 h-5" color={currentTheme.waxSeal} />
          </div>
        </div>

        <h2 
          className="font-serif-display text-2xl font-bold mb-2"
          style={{ color: currentTheme.textColor }}
        >
          Welcome, Friend
        </h2>

        <p 
          className="font-serif-body text-sm leading-relaxed mb-6 opacity-85"
          style={{ color: currentTheme.textColor }}
        >
          We'll use your first name to personalize your quiet daily letters. No accounts, passwords, or emails.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-sans-clean uppercase tracking-widest mb-1.5 opacity-60 text-left">
              What is your first name?
            </label>
            <input
              type="text"
              placeholder="e.g. Sophie"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-stone-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-200/50 text-base font-serif-body text-stone-800 transition-all"
              autoFocus
              maxLength={24}
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 px-6 rounded-xl text-white font-serif-display text-lg font-medium shadow-md transition-all active:scale-[0.98] hover:shadow-lg"
            style={{ backgroundColor: currentTheme.primary }}
          >
            Begin Your Daily Ritual
          </button>
        </form>

        <p className="mt-4 text-xs font-serif-body italic opacity-60">
          You can change this anytime.
        </p>
      </motion.div>
    </div>
  );
};
