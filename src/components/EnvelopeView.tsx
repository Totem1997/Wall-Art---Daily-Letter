import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ThemeConfig } from '../types';
import { BotanicalBranchLeft, BotanicalBranchRight, HeartIcon, SparkleIcon } from './BotanicalDecorations';
import { playWaxSealCrackSound, playPaperSlideSound } from '../utils/audio';

interface EnvelopeViewProps {
  currentTheme: ThemeConfig;
  formattedDate: string;
  onOpenLetter: () => void;
  headerTagline: string;
}

export const EnvelopeView: React.FC<EnvelopeViewProps> = ({
  currentTheme,
  formattedDate,
  onOpenLetter,
  headerTagline
}) => {
  const [isOpening, setIsOpening] = useState(false);

  const handleEnvelopeClick = () => {
    if (isOpening) return;
    setIsOpening(true);
    playWaxSealCrackSound();
    
    // Play paper slide sound shortly after wax crack
    setTimeout(() => {
      playPaperSlideSound();
    }, 400);

    // Navigate after animation completes (~1.4 seconds)
    setTimeout(() => {
      onOpenLetter();
    }, 1400);
  };

  return (
    <div className="w-full max-w-lg mx-auto px-5 py-4 flex flex-col items-center justify-between min-h-[calc(100vh-80px)] select-none">
      
      {/* Top Date Header */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mt-2 mb-4"
      >
        <span 
          className="text-xs font-sans-clean tracking-[0.25em] uppercase font-semibold block mb-1 opacity-60"
          style={{ color: currentTheme.accent }}
        >
          TODAY'S LETTER
        </span>
        <h2 
          className="font-serif-display text-3xl sm:text-4xl font-semibold tracking-tight"
          style={{ color: currentTheme.textColor }}
        >
          {formattedDate}
        </h2>
        <div className="flex items-center justify-center gap-2 mt-2">
          <HeartIcon className="w-3.5 h-3.5 opacity-60" color={currentTheme.primary} />
        </div>
      </motion.div>

      {/* Main Hero Envelope Area */}
      <div className="relative w-full max-w-md my-auto flex flex-col items-center justify-center py-6">
        
        {/* Botanical Background Accents */}
        <div className="absolute -left-3 top-8 opacity-30 pointer-events-none">
          <BotanicalBranchLeft className="w-16 h-28" color={currentTheme.botanical} />
        </div>
        <div className="absolute -right-3 top-8 opacity-30 pointer-events-none">
          <BotanicalBranchRight className="w-16 h-28" color={currentTheme.botanical} />
        </div>

        {/* Envelope Container */}
        <motion.div
          onClick={handleEnvelopeClick}
          whileHover={{ scale: isOpening ? 1 : 1.02 }}
          whileTap={{ scale: isOpening ? 1 : 0.98 }}
          className="relative w-[300px] sm:w-[340px] h-[220px] sm:h-[240px] cursor-pointer group"
        >
          {/* Envelope Shadow */}
          <div className="absolute inset-0 rounded-2xl envelope-shadow transition-shadow duration-300 group-hover:shadow-2xl" />

          {/* Envelope Back Base */}
          <div 
            className="absolute inset-0 rounded-2xl overflow-hidden border border-stone-300/60 shadow-inner"
            style={{ backgroundColor: currentTheme.envelopeBg }}
          >
            {/* Paper Texture Pattern */}
            <div className="absolute inset-0 opacity-40 paper-texture" />
          </div>

          {/* Letter Peek inside Envelope */}
          <AnimatePresence>
            <motion.div
              initial={{ y: 0, opacity: 0.9 }}
              animate={isOpening ? { y: -130, scale: 1.05, opacity: 1 } : { y: 0, opacity: 0.9 }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
              className="absolute left-6 right-6 top-4 h-[180px] bg-[#FFFDF9] rounded-xl p-5 border border-amber-200/60 shadow-md flex flex-col justify-between"
            >
              <div className="space-y-2 opacity-50">
                <div className="h-2 w-24 bg-stone-300 rounded" />
                <div className="h-1.5 w-full bg-stone-200 rounded" />
                <div className="h-1.5 w-4/5 bg-stone-200 rounded" />
              </div>
              <div className="text-right">
                <span className="font-handwriting text-stone-400 text-sm">With warmth ♡</span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Envelope Pocket Front V-Fold */}
          <div 
            className="absolute bottom-0 left-0 right-0 h-[150px] sm:h-[160px] rounded-b-2xl border-t border-stone-300/40 shadow-sm"
            style={{ 
              backgroundColor: currentTheme.envelopeBg,
              clipPath: 'polygon(0% 0%, 50% 45%, 100% 0%, 100% 100%, 0% 100%)'
            }}
          >
            <div className="absolute inset-0 paper-texture opacity-30" />
          </div>

          {/* Envelope Flap Top Triangle */}
          <motion.div
            initial={{ rotateX: 0 }}
            animate={isOpening ? { rotateX: 180, zIndex: 0 } : { rotateX: 0, zIndex: 20 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            style={{ transformOrigin: 'top center' }}
            className="absolute top-0 left-0 right-0 h-[120px] sm:h-[130px] rounded-t-2xl z-20"
          >
            <div 
              className="w-full h-full shadow-sm"
              style={{ 
                backgroundColor: currentTheme.envelopeFlap,
                clipPath: 'polygon(0% 0%, 100% 0%, 50% 85%)'
              }}
            >
              <div className="absolute inset-0 paper-texture opacity-20" />
            </div>
          </motion.div>

          {/* Wax Seal Centered */}
          <AnimatePresence>
            {!isOpening ? (
              <motion.div
                initial={{ scale: 1 }}
                exit={{ scale: 1.25, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute left-1/2 top-[95px] sm:top-[105px] -translate-x-1/2 z-30 flex items-center justify-center"
              >
                <div 
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-lg flex items-center justify-center border-2 transition-transform duration-300 group-hover:scale-105"
                  style={{ 
                    backgroundColor: currentTheme.waxSeal,
                    borderColor: currentTheme.waxSealBorder,
                    boxShadow: '0 6px 16px rgba(90, 40, 40, 0.25), inset 0 2px 4px rgba(255, 255, 255, 0.3)'
                  }}
                >
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-white/30 flex items-center justify-center">
                    <HeartIcon className="w-5 h-5 text-white/90 drop-shadow-sm" />
                  </div>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </motion.div>

        {/* Tap Instruction */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-8 text-center"
        >
          <div className="inline-flex items-center gap-2 text-stone-600">
            <span className="font-serif-display text-lg sm:text-xl font-medium tracking-wide">
              {isOpening ? "Opening your letter..." : "Tap the envelope to open your letter"}
            </span>
            {!isOpening && (
              <SparkleIcon className="w-4 h-4 animate-pulse" color={currentTheme.primary} />
            )}
          </div>
        </motion.div>
      </div>

      {/* Bottom Quiet Card */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="w-full mt-auto mb-2 p-5 rounded-2xl paper-card text-center border shadow-sm relative overflow-hidden"
        style={{ backgroundColor: currentTheme.cardBg }}
      >
        <p className="font-serif-display text-base sm:text-lg font-semibold mb-1" style={{ color: currentTheme.textColor }}>
          A new letter is waiting for you.
        </p>
        <p className="font-serif-body text-xs sm:text-sm italic opacity-80" style={{ color: currentTheme.accent }}>
          Take a moment for yourself. ♡
        </p>
      </motion.div>

    </div>
  );
};
