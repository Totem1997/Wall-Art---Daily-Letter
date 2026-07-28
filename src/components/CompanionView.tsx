import React from 'react';
import { motion } from 'motion/react';
import { MeditationItem, ThemeConfig } from '../types';
import meditationsData from '../data/Meditation.json';
import { Sun, Leaf, BookOpen, Flower2, Moon, Feather, ChevronRight, Info } from 'lucide-react';
import { BotanicalBranchLeft, HeartIcon } from './BotanicalDecorations';

interface CompanionViewProps {
  currentTheme: ThemeConfig;
  meditationMinutes: number;
  onSelectMeditation: (item: MeditationItem) => void;
  onBackToLetter: () => void;
}

export const CompanionView: React.FC<CompanionViewProps> = ({
  currentTheme,
  meditationMinutes,
  onSelectMeditation,
  onBackToLetter
}) => {
  const getStampIcon = (iconName: string) => {
    switch (iconName) {
      case 'sun': return <Sun className="w-8 h-8 text-amber-700/80 stroke-[1.5]" />;
      case 'leaf': return <Leaf className="w-8 h-8 text-emerald-800/80 stroke-[1.5]" />;
      case 'book': return <BookOpen className="w-8 h-8 text-indigo-800/80 stroke-[1.5]" />;
      case 'flower': return <Flower2 className="w-8 h-8 text-rose-800/80 stroke-[1.5]" />;
      case 'moon': return <Moon className="w-8 h-8 text-slate-800/80 stroke-[1.5]" />;
      case 'bird': return <Feather className="w-8 h-8 text-teal-800/80 stroke-[1.5]" />;
      default: return <Sun className="w-8 h-8 text-amber-700/80 stroke-[1.5]" />;
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-xl mx-auto px-4 sm:px-6 py-6"
    >
      {/* Title & Header */}
      <div className="text-center mb-8 relative">
        <button 
          onClick={onBackToLetter}
          aria-label="Back to Letter"
          className="absolute left-0 top-1 text-xs font-sans-clean font-medium opacity-70 hover:opacity-100 transition-opacity flex items-center gap-1 cursor-pointer"
          style={{ color: currentTheme.textColor }}
        >
          ← Back to Letter
        </button>

        <h2 
          className="font-serif-display text-2xl sm:text-3xl font-semibold tracking-tight"
          style={{ color: currentTheme.textColor }}
        >
          Choose Today's Companion
        </h2>
        <p className="font-serif-body text-xs sm:text-sm italic opacity-75 mt-1" style={{ color: currentTheme.accent }}>
          How are you feeling today? ♡
        </p>
      </div>

      {/* 2x3 Stamp Grid */}
      <div className="grid grid-cols-2 gap-4 sm:gap-6 mb-8">
        {meditationsData.map((item, idx) => {
          const meditation = item as MeditationItem;
          return (
            <motion.div
              key={meditation.id}
              role="button"
              tabIndex={0}
              aria-label={`Select ${meditation.title} meditation companion, ${meditation.durationText}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.06, duration: 0.4 }}
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelectMeditation(meditation)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onSelectMeditation(meditation); }}
              className="cursor-pointer relative rounded-xl p-4 sm:p-5 flex flex-col items-center justify-between text-center bg-gradient-to-b stamp-border shadow-sm group transition-all focus:outline-none focus:ring-2 focus:ring-amber-300"
              style={{
                backgroundColor: currentTheme.cardBg,
                borderColor: meditation.stampColor
              }}
            >
              {/* Top Perforated Corner Accents */}
              <div className="w-full flex items-center justify-between text-[9px] font-mono opacity-50 mb-2">
                <span>✦</span>
                <span className="uppercase tracking-widest">STAMP</span>
                <span>✦</span>
              </div>

              {/* Watercolor Icon Container */}
              <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br ${meditation.bgGradient} flex items-center justify-center my-2 shadow-inner border border-white/60 group-hover:scale-105 transition-transform`}>
                {getStampIcon(meditation.icon)}
              </div>

              {/* Title & Duration */}
              <div className="mt-2 space-y-1">
                <h3 
                  className="font-serif-display text-base sm:text-lg font-semibold leading-snug"
                  style={{ color: currentTheme.textColor }}
                >
                  {meditation.title}
                </h3>
                <span 
                  className="inline-block text-[10px] sm:text-xs font-sans-clean font-semibold tracking-widest px-2.5 py-0.5 rounded-full bg-stone-100 border border-stone-200/80 opacity-80"
                  style={{ color: currentTheme.textColor }}
                >
                  {meditation.durationText}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Minutes Invested Counter Card */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="w-full p-6 rounded-2xl paper-card shadow-sm border flex items-center justify-between relative overflow-hidden"
        style={{ backgroundColor: currentTheme.cardBg }}
      >
        <div className="flex items-center gap-4">
          <div 
            className="w-12 h-12 rounded-2xl flex items-center justify-center border"
            style={{ 
              backgroundColor: currentTheme.secondary,
              borderColor: currentTheme.primary
            }}
          >
            <BotanicalBranchLeft className="w-7 h-10" color={currentTheme.primary} />
          </div>

          <div>
            <span className="text-xs font-sans-clean uppercase tracking-wider block opacity-70 mb-0.5" style={{ color: currentTheme.textColor }}>
              Minutes Invested In Yourself
            </span>
            <div className="flex items-baseline gap-2">
              <span className="font-serif-display text-3xl font-bold" style={{ color: currentTheme.textColor }}>
                {meditationMinutes}
              </span>
              <span className="font-serif-body text-sm opacity-75" style={{ color: currentTheme.textColor }}>
                minutes
              </span>
            </div>
          </div>
        </div>

        <ChevronRight className="w-5 h-5 opacity-40" style={{ color: currentTheme.textColor }} />
      </motion.div>

      {/* Bottom Warm Thank You Note */}
      <div className="text-center mt-6">
        <p className="font-serif-body text-xs sm:text-sm italic opacity-70 flex items-center justify-center gap-1.5" style={{ color: currentTheme.textColor }}>
          <span>Thank you for taking care of you.</span>
          <HeartIcon className="w-3.5 h-3.5 inline" color={currentTheme.primary} />
        </p>
      </div>

    </motion.div>
  );
};
