import React from 'react';
import { Calendar, Volume2, VolumeX, User } from 'lucide-react';
import { ThemeConfig } from '../types';

interface HeaderProps {
  currentTheme: ThemeConfig;
  onOpenArchive: () => void;
  onOpenSettings: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTheme,
  onOpenArchive,
  onOpenSettings,
  soundEnabled,
  onToggleSound
}) => {
  return (
    <header className="w-full max-w-xl mx-auto px-6 pt-5 pb-3 flex items-center justify-between select-none transition-colors duration-500">
      <button
        onClick={onOpenArchive}
        aria-label="View Archive and Past Letters"
        className="p-2.5 rounded-full hover:bg-black/5 active:scale-95 transition-all flex items-center gap-1.5 text-xs font-medium tracking-wide uppercase"
        style={{ color: currentTheme.textColor }}
        title="View Archive & Past Letters"
      >
        <Calendar className="w-4 h-4 opacity-80" />
        <span className="hidden sm:inline font-sans-clean text-[11px] opacity-75">Archive</span>
      </button>

      <div className="text-center">
        <h1 
          className="font-serif-display text-xl sm:text-2xl font-semibold tracking-wide transition-colors duration-500"
          style={{ color: currentTheme.textColor }}
        >
          Daily Letter Companion
        </h1>
      </div>

      <div className="flex items-center gap-1">
        <button
          onClick={onToggleSound}
          aria-label={soundEnabled ? "Mute ambient audio" : "Enable ambient audio"}
          className="p-2.5 rounded-full hover:bg-black/5 active:scale-95 transition-all text-xs"
          style={{ color: currentTheme.textColor }}
          title={soundEnabled ? "Mute ambient audio" : "Enable ambient audio"}
        >
          {soundEnabled ? (
            <Volume2 className="w-4 h-4 opacity-80" />
          ) : (
            <VolumeX className="w-4 h-4 opacity-40" />
          )}
        </button>

        <button
          onClick={onOpenSettings}
          aria-label="Personalization & Themes"
          className="p-2.5 rounded-full hover:bg-black/5 active:scale-95 transition-all text-xs"
          style={{ color: currentTheme.textColor }}
          title="Personalization & Themes"
        >
          <User className="w-4 h-4 opacity-80" />
        </button>
      </div>
    </header>
  );
};
