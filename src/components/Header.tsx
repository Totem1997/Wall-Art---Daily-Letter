import React from 'react';
import { Menu } from 'lucide-react';
import { ThemeConfig } from '../types';

interface HeaderProps {
  currentTheme: ThemeConfig;
  onOpenArchive?: () => void;
  onOpenSettings: () => void;
  soundEnabled?: boolean;
  onToggleSound?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTheme,
  onOpenSettings
}) => {
  return (
    <header className="w-full max-w-xl mx-auto px-6 pt-5 pb-3 flex items-center justify-between select-none transition-colors duration-500">
      {/* Top Left Title - Single Line */}
      <div className="flex items-center">
        <h1 
          className="font-serif-display text-base sm:text-lg font-semibold tracking-wide whitespace-nowrap transition-colors duration-500"
          style={{ color: currentTheme.textColor }}
        >
          Daily Letter Companion
        </h1>
      </div>

      {/* Top Right Actions */}
      <div className="flex items-center gap-1">
        <button
          onClick={onOpenSettings}
          aria-label="Menu & Settings"
          className="p-2.5 rounded-full hover:bg-black/5 active:scale-95 transition-all text-xs"
          style={{ color: currentTheme.textColor }}
          title="Menu & Settings"
        >
          <Menu className="w-5 h-5 opacity-85" />
        </button>
      </div>
    </header>
  );
};
