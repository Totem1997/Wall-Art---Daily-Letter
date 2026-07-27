import React from 'react';
import { motion } from 'motion/react';
import { Letter, ThemeConfig } from '../types';
import { FloralCornerDecoration, PostmarkStamp, BotanicalBranchLeft, BotanicalBranchRight } from './BotanicalDecorations';
import { getRandomSignature } from '../utils/date';
import { ArrowRight } from 'lucide-react';

interface LetterViewProps {
  letter: Letter;
  userName: string;
  formattedDate: string;
  currentTheme: ThemeConfig;
  onContinue: () => void;
}

export const LetterView: React.FC<LetterViewProps> = ({
  letter,
  userName,
  formattedDate,
  currentTheme,
  onContinue
}) => {
  const signature = getRandomSignature();
  
  // Split letter body by double newlines into distinct paragraphs
  const paragraphs = letter.body.split('\n\n').filter(p => p.trim().length > 0);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-xl mx-auto px-4 sm:px-6 py-6"
    >
      {/* Letter Paper Container */}
      <div 
        className="relative w-full p-6 sm:p-10 rounded-2xl paper-card shadow-xl border overflow-hidden my-2"
        style={{ backgroundColor: currentTheme.cardBg }}
      >
        {/* Subtle Paper Texture overlay */}
        <div className="absolute inset-0 paper-texture opacity-30 pointer-events-none" />

        {/* Top Right Cancellations & Stamps */}
        <div className="absolute top-4 right-4 sm:top-6 sm:right-6 flex items-center gap-2 opacity-85 pointer-events-none">
          <PostmarkStamp className="w-16 h-16 sm:w-20 sm:w-20" color={currentTheme.botanical} />
          <div 
            className="w-10 h-12 sm:w-12 sm:h-14 rounded-md border-2 border-dashed p-1 flex flex-col items-center justify-between text-[10px] font-sans-clean font-semibold shadow-xs"
            style={{ 
              borderColor: currentTheme.primary,
              backgroundColor: currentTheme.stampBg,
              color: currentTheme.textColor
            }}
          >
            <span className="text-[8px] uppercase tracking-tighter opacity-70">USA</span>
            <div className="w-5 h-5 rounded-full bg-rose-200/50 flex items-center justify-center my-auto">
              ♡
            </div>
            <span className="text-[8px] font-mono">15c</span>
          </div>
        </div>

        {/* Top Left Botanical Corner Decoration */}
        <div className="absolute top-2 left-2 opacity-40 pointer-events-none">
          <FloralCornerDecoration className="w-16 h-16 sm:w-20 sm:h-20" color={currentTheme.botanical} />
        </div>

        {/* Date Header */}
        <div className="pt-8 sm:pt-10 mb-6 border-b border-stone-200/60 pb-4">
          <p className="font-serif-display text-sm tracking-widest uppercase opacity-60" style={{ color: currentTheme.textColor }}>
            {formattedDate}
          </p>
        </div>

        {/* Greeting */}
        <div className="mb-6">
          <h3 
            className="font-serif-display text-2xl sm:text-3xl font-semibold tracking-tight"
            style={{ color: currentTheme.textColor }}
          >
            Dear {userName && userName !== 'Friend' ? userName : 'Friend'},
          </h3>
          <div className="w-2 h-2 rounded-full mt-2" style={{ backgroundColor: currentTheme.primary }} />
        </div>

        {/* Body Paragraphs */}
        <div className="space-y-5 font-serif-body text-base sm:text-lg leading-relaxed text-stone-800 tracking-wide opacity-90">
          {paragraphs.map((paragraph, idx) => (
            <p key={idx} className="whitespace-pre-line">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Bottom Signature Section */}
        <div className="mt-10 pt-6 border-t border-stone-200/50 flex flex-col items-end">
          <p className="font-serif-body text-sm opacity-70 mb-1" style={{ color: currentTheme.textColor }}>
            With warmth,
          </p>
          <p 
            className="font-handwriting text-3xl sm:text-4xl text-right font-medium tracking-wide"
            style={{ color: currentTheme.accent }}
          >
            {signature.replace("With warmth, ", "").replace("Thinking of you, ", "")}
          </p>
        </div>

        {/* Bottom Left Botanical Decoration */}
        <div className="absolute bottom-2 left-2 opacity-35 pointer-events-none">
          <BotanicalBranchLeft className="w-16 h-24" color={currentTheme.botanical} />
        </div>
      </div>

      {/* Action Button & Coffee Note */}
      <div className="mt-8 flex flex-col items-center space-y-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onContinue}
          className="w-full sm:w-auto px-8 py-4 rounded-2xl text-white font-serif-display text-lg font-medium shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-3 cursor-pointer"
          style={{ backgroundColor: currentTheme.primary }}
        >
          <span>Continue to Today's Companion</span>
          <ArrowRight className="w-5 h-5" />
        </motion.button>

        <div className="flex items-center gap-2 text-stone-600 text-xs sm:text-sm font-serif-body opacity-80 pt-2">
          <span className="text-base">☕</span>
          <span>Read your letter as you sip your coffee.</span>
        </div>
      </div>
    </motion.div>
  );
};
