import React from 'react';

interface BotanicalProps {
  className?: string;
  color?: string;
}

export const BotanicalBranchLeft: React.FC<BotanicalProps> = ({ className = "w-12 h-20", color = "currentColor" }) => (
  <svg viewBox="0 0 50 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M45 95 C 40 70, 30 40, 10 5" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M38 72 C 25 68, 15 62, 10 55 C 18 53, 28 58, 38 72 Z" fill={color} fillOpacity="0.12" stroke={color} strokeWidth="1.2"/>
    <path d="M30 52 C 18 46, 10 38, 5 30 C 14 30, 22 36, 30 52 Z" fill={color} fillOpacity="0.12" stroke={color} strokeWidth="1.2"/>
    <path d="M20 30 C 12 22, 8 15, 3 8 C 10 10, 16 18, 20 30 Z" fill={color} fillOpacity="0.12" stroke={color} strokeWidth="1.2"/>
    <path d="M42 85 C 48 78, 48 68, 45 62 C 39 68, 38 78, 42 85 Z" fill={color} fillOpacity="0.1" stroke={color} strokeWidth="1.2"/>
  </svg>
);

export const BotanicalBranchRight: React.FC<BotanicalProps> = ({ className = "w-12 h-20", color = "currentColor" }) => (
  <svg viewBox="0 0 50 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M5 95 C 10 70, 20 40, 40 5" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M12 72 C 25 68, 35 62, 40 55 C 32 53, 22 58, 12 72 Z" fill={color} fillOpacity="0.12" stroke={color} strokeWidth="1.2"/>
    <path d="M20 52 C 32 46, 40 38, 45 30 C 36 30, 28 36, 20 52 Z" fill={color} fillOpacity="0.12" stroke={color} strokeWidth="1.2"/>
    <path d="M30 30 C 38 22, 42 15, 47 8 C 40 10, 34 18, 30 30 Z" fill={color} fillOpacity="0.12" stroke={color} strokeWidth="1.2"/>
    <path d="M8 85 C 2 78, 2 68, 5 62 C 11 68, 12 78, 8 85 Z" fill={color} fillOpacity="0.1" stroke={color} strokeWidth="1.2"/>
  </svg>
);

export const FloralCornerDecoration: React.FC<BotanicalProps> = ({ className = "w-16 h-16", color = "currentColor" }) => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M5 75 C 25 60, 50 40, 75 5" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="20" cy="55" r="4" fill={color} fillOpacity="0.2" stroke={color} strokeWidth="1"/>
    <circle cx="40" cy="35" r="5" fill={color} fillOpacity="0.2" stroke={color} strokeWidth="1"/>
    <circle cx="60" cy="18" r="3" fill={color} fillOpacity="0.2" stroke={color} strokeWidth="1"/>
    <path d="M20 55 C 10 45, 12 30, 25 35 C 30 48, 25 52, 20 55 Z" fill={color} fillOpacity="0.1" stroke={color} strokeWidth="1"/>
    <path d="M40 35 C 35 20, 50 15, 52 28 C 48 35, 42 37, 40 35 Z" fill={color} fillOpacity="0.1" stroke={color} strokeWidth="1"/>
  </svg>
);

export const PostmarkStamp: React.FC<BotanicalProps> = ({ className = "w-20 h-20", color = "currentColor" }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="50" cy="50" r="42" stroke={color} strokeWidth="1.5" strokeDasharray="4 2"/>
    <circle cx="50" cy="50" r="36" stroke={color} strokeWidth="1"/>
    <path d="M20 50 H 80" stroke={color} strokeWidth="0.8"/>
    <path d="M22 43 H 78" stroke={color} strokeWidth="0.5"/>
    <path d="M22 57 H 78" stroke={color} strokeWidth="0.5"/>
    <text x="50" y="36" textAnchor="middle" fill={color} fontSize="8" fontFamily="sans-serif" letterSpacing="1.5" fontWeight="600">TAKE CARE</text>
    <text x="50" y="68" textAnchor="middle" fill={color} fontSize="8" fontFamily="sans-serif" letterSpacing="1.5" fontWeight="600">OF YOU</text>
    <path d="M50 47 L 53 53 L 47 53 Z" fill={color}/>
    <path d="M50 50 C 47 48, 45 46, 47 44 C 49 42, 50 45, 50 46 C 50 45, 51 42, 53 44 C 55 46, 53 48, 50 50 Z" fill={color}/>
  </svg>
);

export const HeartIcon: React.FC<BotanicalProps> = ({ className = "w-4 h-4", color = "currentColor" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={{ color }}>
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
  </svg>
);

export const SparkleIcon: React.FC<BotanicalProps> = ({ className = "w-4 h-4", color = "currentColor" }) => (
  <svg viewBox="0 0 24 24" fill={color} className={className}>
    <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"/>
  </svg>
);
