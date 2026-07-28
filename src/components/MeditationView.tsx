import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { MeditationItem, ThemeConfig } from '../types';
import { ChevronLeft, Play, Pause, RotateCcw, RotateCw, Heart, Volume2 } from 'lucide-react';
import { BotanicalBranchLeft, HeartIcon } from './BotanicalDecorations';

interface MeditationViewProps {
  meditation: MeditationItem;
  currentTheme: ThemeConfig;
  onBack: () => void;
  onIncrementMinutes: (mins: number) => void;
}

export const MeditationView: React.FC<MeditationViewProps> = ({
  meditation,
  currentTheme,
  onBack,
  onIncrementMinutes
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);
  const totalSeconds = meditation.duration * 60;

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Simulation timer for playback progress
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= totalSeconds) {
            setIsPlaying(false);
            onIncrementMinutes(meditation.duration);
            return totalSeconds;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, totalSeconds, meditation.duration, onIncrementMinutes]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const skipSeconds = (seconds: number) => {
    setCurrentTime((prev) => Math.max(0, Math.min(totalSeconds, prev + seconds)));
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = Math.floor(secs % 60);
    return `${mins.toString().padStart(2, '0')}:${remainder.toString().padStart(2, '0')}`;
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-xl mx-auto px-4 sm:px-6 py-6"
    >
      {/* Top Header Bar */}
      <div className="flex items-center justify-between mb-6">
        <button 
          onClick={onBack}
          aria-label="Back to Choose Today's Companion"
          className="p-2 rounded-full hover:bg-black/5 active:scale-95 transition-all text-xs font-sans-clean font-medium flex items-center gap-1 cursor-pointer"
          style={{ color: currentTheme.textColor }}
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Choose Today's Companion</span>
        </button>

        <button 
          onClick={() => setIsFavorited(!isFavorited)}
          aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
          className="p-2 rounded-full hover:bg-black/5 active:scale-95 transition-all cursor-pointer"
          style={{ color: currentTheme.textColor }}
        >
          <Heart className={`w-5 h-5 ${isFavorited ? 'fill-rose-500 text-rose-500' : 'opacity-60'}`} />
        </button>
      </div>

      {/* Watercolor Illustration Banner */}
      <div className="w-full h-56 sm:h-64 rounded-3xl overflow-hidden relative shadow-md mb-6 bg-gradient-to-b from-amber-100/60 via-amber-200/40 to-amber-50/80 border border-amber-200/50 flex flex-col items-center justify-center p-6 text-center">
        {/* Sun & Hills Watercolor Vector Graphics */}
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-300 via-rose-200 to-amber-50 pointer-events-none" />
        
        {/* Soft Botanical Trees framing top artwork */}
        <div className="absolute left-2 top-2 opacity-50 pointer-events-none">
          <BotanicalBranchLeft className="w-16 h-28" color={currentTheme.botanical} />
        </div>

        {/* Sun illustration */}
        <div className="relative z-10 w-24 h-24 rounded-full bg-gradient-to-t from-amber-300 to-amber-100 shadow-lg flex items-center justify-center border-2 border-white/80 my-auto">
          <div className="w-16 h-16 rounded-full bg-amber-400/20 animate-pulse" />
        </div>

        <div className="relative z-10 font-serif-display text-sm tracking-widest uppercase opacity-70 mt-2" style={{ color: currentTheme.textColor }}>
          QUIET MEDITATION
        </div>
      </div>

      {/* Title & Description */}
      <div className="text-center mb-6">
        <h2 
          className="font-serif-display text-2xl sm:text-3xl font-semibold mb-2"
          style={{ color: currentTheme.textColor }}
        >
          {meditation.title}
        </h2>
        <p 
          className="font-serif-body text-xs sm:text-sm max-w-md mx-auto leading-relaxed opacity-80"
          style={{ color: currentTheme.textColor }}
        >
          {meditation.description}
        </p>
      </div>

      {/* Embedded Audio Player Card */}
      <div 
        className="w-full p-6 sm:p-8 rounded-3xl paper-card shadow-sm border mb-6 relative overflow-hidden"
        style={{ backgroundColor: currentTheme.cardBg }}
      >
        {/* Scrub Bar */}
        <div className="space-y-2 mb-6">
          <input 
            type="range"
            min={0}
            max={totalSeconds}
            value={currentTime}
            onChange={(e) => setCurrentTime(Number(e.target.value))}
            className="w-full h-1.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-amber-600 focus:outline-none"
          />
          <div className="flex justify-between text-xs font-mono opacity-60" style={{ color: currentTheme.textColor }}>
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(totalSeconds)}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-6 sm:gap-8">
          <button 
            onClick={() => skipSeconds(-15)}
            aria-label="Rewind 15 seconds"
            className="p-3 rounded-full hover:bg-black/5 active:scale-95 transition-all relative group cursor-pointer"
            style={{ color: currentTheme.textColor }}
            title="Rewind 15 seconds"
          >
            <RotateCcw className="w-6 h-6 opacity-80" />
            <span className="absolute inset-0 flex items-center justify-center text-[9px] font-mono font-bold pt-1">15</span>
          </button>

          <button 
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause meditation audio" : "Play meditation audio"}
            className="w-16 h-16 sm:w-18 sm:h-18 rounded-full shadow-lg flex items-center justify-center text-white transition-all active:scale-95 hover:shadow-xl cursor-pointer"
            style={{ backgroundColor: currentTheme.primary }}
          >
            {isPlaying ? (
              <Pause className="w-8 h-8 fill-current" />
            ) : (
              <Play className="w-8 h-8 fill-current ml-1" />
            )}
          </button>

          <button 
            onClick={() => skipSeconds(15)}
            aria-label="Forward 15 seconds"
            className="p-3 rounded-full hover:bg-black/5 active:scale-95 transition-all relative group cursor-pointer"
            style={{ color: currentTheme.textColor }}
            title="Forward 15 seconds"
          >
            <RotateCw className="w-6 h-6 opacity-80" />
            <span className="absolute inset-0 flex items-center justify-center text-[9px] font-mono font-bold pt-1">15</span>
          </button>
        </div>

        {/* Audio.com badge */}
        <div className="mt-6 pt-4 border-t border-stone-200/50 flex items-center justify-center gap-2 text-[11px] font-sans-clean opacity-60" style={{ color: currentTheme.textColor }}>
          <Volume2 className="w-3.5 h-3.5" />
          <span>Audio by audio.com</span>
        </div>
      </div>

      {/* Remember Card */}
      <div 
        className="w-full p-5 rounded-2xl paper-card shadow-xs border flex items-start gap-4"
        style={{ backgroundColor: currentTheme.cardBg }}
      >
        <div className="p-2 rounded-xl" style={{ backgroundColor: currentTheme.secondary }}>
          <HeartIcon className="w-4 h-4" color={currentTheme.primary} />
        </div>
        <div>
          <span className="text-xs font-sans-clean uppercase tracking-wider block font-semibold opacity-60 mb-0.5" style={{ color: currentTheme.textColor }}>
            Remember
          </span>
          <p className="font-serif-body text-xs sm:text-sm italic opacity-85 leading-snug" style={{ color: currentTheme.textColor }}>
            "{meditation.quote}"
          </p>
        </div>
      </div>

    </motion.div>
  );
};
