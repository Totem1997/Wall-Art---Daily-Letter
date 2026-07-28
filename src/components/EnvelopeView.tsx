import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ThemeConfig } from '../types';
import { HeartIcon } from './BotanicalDecorations';
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
    }, 250);

    // Navigate after animation completes (~0.9 seconds)
    setTimeout(() => {
      onOpenLetter();
    }, 900);
  };

  return (
    <div className="relative w-full max-w-lg mx-auto px-5 py-2 sm:py-4 flex flex-col items-center justify-between min-h-[calc(100dvh-70px)] sm:min-h-[calc(100vh-80px)] select-none">
      
      {/* Ambient Welcome Screen Gradient Orbs */}
      <div className="absolute inset-0 -z-10 pointer-events-none flex items-center justify-center overflow-hidden">
        <div 
          className="absolute w-[340px] h-[340px] sm:w-[460px] sm:h-[460px] rounded-full blur-3xl opacity-50"
          style={{
            background: `radial-gradient(circle, ${currentTheme.envelopeBg} 0%, ${currentTheme.accent}25 50%, transparent 75%)`
          }}
        />
        <div 
          className="absolute -top-12 -right-12 w-[220px] h-[220px] sm:w-[300px] sm:h-[300px] rounded-full blur-3xl opacity-35"
          style={{
            background: `radial-gradient(circle, ${currentTheme.accent}40 0%, transparent 70%)`
          }}
        />
        <div 
          className="absolute -bottom-10 -left-12 w-[240px] h-[240px] sm:w-[320px] sm:h-[320px] rounded-full blur-3xl opacity-40"
          style={{
            background: `radial-gradient(circle, ${currentTheme.envelopeFlap}60 0%, transparent 70%)`
          }}
        />
      </div>

      {/* Top Date Header */}
      <motion.div 
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mt-1 mb-2 sm:mb-4"
      >
        <span 
          className="text-[11px] sm:text-xs font-sans-clean tracking-[0.25em] uppercase font-semibold block mb-0.5 opacity-60"
          style={{ color: currentTheme.accent }}
        >
          TODAY'S LETTER
        </span>
        <h2 
          className="font-serif-display text-2xl sm:text-4xl font-semibold tracking-tight"
          style={{ color: currentTheme.textColor }}
        >
          {formattedDate}
        </h2>
      </motion.div>

      {/* Main Hero Envelope Area */}
      <div className="relative w-full max-w-md my-auto flex flex-col items-center justify-center py-2 sm:py-6">
        
        {/* Envelope Container */}
        <motion.div
          role="button"
          tabIndex={0}
          aria-label="Tap to open today's letter"
          onClick={handleEnvelopeClick}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleEnvelopeClick(); }}
          whileHover={{ scale: isOpening ? 1 : 1.02 }}
          whileTap={{ scale: isOpening ? 1 : 0.98 }}
          className="relative w-[280px] xs:w-[300px] sm:w-[340px] h-[200px] xs:h-[220px] sm:h-[240px] cursor-pointer group focus:outline-none focus:ring-2 focus:ring-amber-300/50 rounded-2xl"
        >
          {/* Envelope Shadow */}
          <div className="absolute inset-0 rounded-2xl envelope-shadow transition-shadow duration-300 group-hover:shadow-2xl" />

          {/* Envelope Back Base (Interior Warm Paper Lining) */}
          <div 
            className="absolute inset-0 rounded-2xl overflow-hidden border border-amber-900/15 shadow-inner z-1"
            style={{ backgroundColor: currentTheme.envelopeBg }}
          >
            <div className="absolute inset-0 opacity-30 paper-texture" />
            <div className="absolute inset-0 bg-amber-900/[0.02]" /> {/* Warm subtle depth */}
          </div>

          {/* Envelope Left Side Fold */}
          <div 
            className="absolute inset-0 rounded-2xl z-2 pointer-events-none"
            style={{ 
              backgroundColor: currentTheme.envelopeBg,
              clipPath: 'polygon(0% 0%, 46% 50%, 0% 100%)',
              filter: 'brightness(0.97)'
            }}
          >
            <div className="absolute inset-0 paper-texture opacity-25" />
            <div className="absolute inset-0 border-l border-stone-300/30" />
          </div>

          {/* Envelope Right Side Fold */}
          <div 
            className="absolute inset-0 rounded-2xl z-2 pointer-events-none"
            style={{ 
              backgroundColor: currentTheme.envelopeBg,
              clipPath: 'polygon(100% 0%, 54% 50%, 100% 100%)',
              filter: 'brightness(0.96)'
            }}
          >
            <div className="absolute inset-0 paper-texture opacity-25" />
            <div className="absolute inset-0 border-r border-stone-300/30" />
          </div>

          {/* Envelope Flap Top Triangle (Seamlessly attached along top edge) */}
          <motion.div
            initial={{ rotateX: 0 }}
            animate={isOpening ? { rotateX: 180, zIndex: 5 } : { rotateX: 0, zIndex: 25 }}
            transition={{ 
              rotateX: { duration: 0.5, ease: 'easeInOut' },
              zIndex: { delay: isOpening ? 0.22 : 0, duration: 0 }
            }}
            style={{ transformOrigin: 'top center', transformStyle: 'preserve-3d' }}
            className="absolute top-0 left-0 right-0 h-[130px] sm:h-[155px] rounded-t-2xl overflow-hidden"
          >
            <div 
              className="w-full h-full drop-shadow-xs"
              style={{ 
                backgroundColor: currentTheme.envelopeBg,
                clipPath: 'polygon(0% 0%, 100% 0%, 50% 92%)'
              }}
            >
              <div className="absolute inset-0 paper-texture opacity-25" />
            </div>
          </motion.div>

          {/* Letter inside Envelope (Completely hidden when sealed, rises up smoothly when opened) */}
          <motion.div
            initial={{ y: 25, opacity: 0 }}
            animate={isOpening ? { y: -105, scale: 1.03, opacity: 1 } : { y: 25, opacity: 0 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.18 }}
            className="absolute left-5 right-5 sm:left-6 sm:right-6 top-8 sm:top-10 h-[130px] sm:h-[150px] bg-[#FFFDF9] rounded-xl p-4 sm:p-5 border border-amber-200/60 shadow-md z-10 flex flex-col justify-between"
          >
            <div className="space-y-2 opacity-50">
              <div className="h-2 w-20 bg-stone-300 rounded" />
              <div className="h-1.5 w-full bg-stone-200 rounded" />
              <div className="h-1.5 w-4/5 bg-stone-200 rounded" />
            </div>
            <div className="text-right">
              <span className="font-handwriting text-stone-400 text-sm">With warmth ♡</span>
            </div>
          </motion.div>

          {/* Envelope Pocket Front Bottom V-Fold */}
          <div 
            className="absolute bottom-0 left-0 right-0 h-[125px] sm:h-[150px] rounded-b-2xl z-15 pointer-events-none"
            style={{ 
              backgroundColor: currentTheme.envelopeBg,
              clipPath: 'polygon(0% 25%, 50% 48%, 100% 25%, 100% 100%, 0% 100%)',
              filter: 'brightness(0.99)'
            }}
          >
            <div className="absolute inset-0 paper-texture opacity-30" />
            <div className="absolute inset-0 border-t border-stone-300/30" />
          </div>

          {/* Wax Seal Centered with Split Animation */}
          <AnimatePresence>
            {!isOpening ? (
              <motion.div
                initial={{ scale: 1, opacity: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="absolute left-1/2 top-[95px] sm:top-[115px] -translate-x-1/2 z-30 flex items-center justify-center"
              >
                <div 
                  className="w-13 h-13 sm:w-16 sm:h-16 rounded-full shadow-lg flex items-center justify-center border-2 transition-transform duration-300 group-hover:scale-105 cursor-pointer"
                  style={{ 
                    backgroundColor: currentTheme.waxSeal,
                    borderColor: currentTheme.waxSealBorder,
                    boxShadow: '0 6px 16px rgba(90, 40, 40, 0.25), inset 0 2px 4px rgba(255, 255, 255, 0.3)'
                  }}
                >
                  <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full border border-white/30 flex items-center justify-center">
                    <HeartIcon className="w-4 h-4 sm:w-5 sm:h-5 text-white/90 drop-shadow-sm" />
                  </div>
                </div>
              </motion.div>
            ) : (
              /* Split Wax Seal Half Left & Right Animation */
              <div className="absolute left-1/2 top-[95px] sm:top-[115px] -translate-x-1/2 z-30 flex pointer-events-none">
                <motion.div
                  initial={{ x: 0, opacity: 1, rotate: 0 }}
                  animate={{ x: -16, opacity: 0, rotate: -12 }}
                  transition={{ duration: 0.4 }}
                  className="w-6.5 sm:w-8 h-13 sm:h-16 rounded-l-full overflow-hidden border-2 border-r-0"
                  style={{ backgroundColor: currentTheme.waxSeal, borderColor: currentTheme.waxSealBorder }}
                />
                <motion.div
                  initial={{ x: 0, opacity: 1, rotate: 0 }}
                  animate={{ x: 16, opacity: 0, rotate: 12 }}
                  transition={{ duration: 0.4 }}
                  className="w-6.5 sm:w-8 h-13 sm:h-16 rounded-r-full overflow-hidden border-2 border-l-0"
                  style={{ backgroundColor: currentTheme.waxSeal, borderColor: currentTheme.waxSealBorder }}
                />
              </div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Tap Instruction */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mt-6 sm:mt-8 text-center"
        >
          <div className="inline-flex items-center gap-2 text-stone-600">
            <span className="font-serif-display text-base sm:text-xl font-medium tracking-wide">
              {isOpening ? "Opening your letter..." : "Tap the envelope to open your letter"}
            </span>
          </div>
        </motion.div>
      </div>

    </div>
  );
};
