import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { UserProfile, ViewScreen, Letter, MeditationItem } from './types';
import { getTodayLetter, getTodayTheme, getFormattedDate, getTodayHeaderTagline } from './utils/date';
import { toggleAmbientSound } from './utils/audio';
import { Header } from './components/Header';
import { EnvelopeView } from './components/EnvelopeView';
import { LetterView } from './components/LetterView';
import { CompanionView } from './components/CompanionView';
import { MeditationView } from './components/MeditationView';
import { OnboardingModal } from './components/OnboardingModal';
import { ArchiveDrawer } from './components/ArchiveDrawer';

const LOCAL_STORAGE_KEY = 'dlc_user_profile_v1';

const DEFAULT_PROFILE: UserProfile = {
  name: '',
  hasOnboarded: false,
  meditationMinutes: 57,
  openedLetterIds: [],
  favoriteStamps: [],
  themeId: undefined,
  soundEnabled: false
};

export default function App() {
  // Load saved profile or initialize
  const [profile, setProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        return { ...DEFAULT_PROFILE, ...JSON.parse(saved) };
      }
    } catch {
      // Ignore localstorage read error
    }
    return DEFAULT_PROFILE;
  });

  const [currentScreen, setCurrentScreen] = useState<ViewScreen>('welcome');
  const [currentLetter, setCurrentLetter] = useState<Letter>(() => getTodayLetter());
  const [selectedMeditation, setSelectedMeditation] = useState<MeditationItem | null>(null);
  const [isArchiveOpen, setIsArchiveOpen] = useState(false);

  // Save profile state whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(profile));
    } catch {
      // Ignore localstorage write error
    }
  }, [profile]);

  // Derive current theme and date
  const currentTheme = getTodayTheme(profile.themeId);
  const formattedDate = getFormattedDate();
  const headerTagline = getTodayHeaderTagline();

  // Handle ambient sound toggle
  const handleToggleSound = () => {
    const nextState = !profile.soundEnabled;
    setProfile(prev => ({ ...prev, soundEnabled: nextState }));
    toggleAmbientSound(nextState);
  };

  // Handle onboarding submission
  const handleSaveName = (name: string) => {
    setProfile(prev => ({
      ...prev,
      name,
      hasOnboarded: true
    }));
  };

  // Handle selecting a letter from archive
  const handleSelectLetterFromArchive = (letter: Letter) => {
    setCurrentLetter(letter);
    setCurrentScreen('letter');
  };

  // Handle theme changes
  const handleSelectTheme = (themeId: string) => {
    setProfile(prev => ({ ...prev, themeId }));
  };

  // Handle incrementing meditation minutes
  const handleIncrementMinutes = (mins: number) => {
    setProfile(prev => ({
      ...prev,
      meditationMinutes: prev.meditationMinutes + mins
    }));
  };

  // Handle reset app
  const handleResetApp = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    setProfile(DEFAULT_PROFILE);
    setCurrentScreen('welcome');
  };

  return (
    <div 
      className="min-h-screen w-full transition-colors duration-700 flex flex-col font-serif-body relative overflow-x-hidden"
      style={{ backgroundColor: currentTheme.bg }}
    >
      {/* Onboarding Modal for First Time Users */}
      {!profile.hasOnboarded && (
        <OnboardingModal
          currentTheme={currentTheme}
          onSaveName={handleSaveName}
        />
      )}

      {/* Top Header */}
      <Header
        currentTheme={currentTheme}
        onOpenArchive={() => setIsArchiveOpen(true)}
        onOpenSettings={() => setIsArchiveOpen(true)}
        soundEnabled={profile.soundEnabled || false}
        onToggleSound={handleToggleSound}
      />

      {/* Main View Container */}
      <main className="flex-1 flex flex-col justify-center">
        <AnimatePresence mode="wait">
          {currentScreen === 'welcome' && (
            <motion.div key="welcome" className="w-full">
              <EnvelopeView
                currentTheme={currentTheme}
                formattedDate={formattedDate}
                headerTagline={headerTagline}
                onOpenLetter={() => setCurrentScreen('letter')}
              />
            </motion.div>
          )}

          {currentScreen === 'letter' && (
            <motion.div key="letter" className="w-full">
              <LetterView
                letter={currentLetter}
                userName={profile.name}
                formattedDate={formattedDate}
                currentTheme={currentTheme}
                onContinue={() => setCurrentScreen('companion')}
              />
            </motion.div>
          )}

          {currentScreen === 'companion' && (
            <motion.div key="companion" className="w-full">
              <CompanionView
                currentTheme={currentTheme}
                meditationMinutes={profile.meditationMinutes}
                onSelectMeditation={(item) => {
                  setSelectedMeditation(item);
                  setCurrentScreen('meditation');
                }}
                onBackToLetter={() => setCurrentScreen('letter')}
              />
            </motion.div>
          )}

          {currentScreen === 'meditation' && selectedMeditation && (
            <motion.div key="meditation" className="w-full">
              <MeditationView
                meditation={selectedMeditation}
                currentTheme={currentTheme}
                onBack={() => setCurrentScreen('companion')}
                onIncrementMinutes={handleIncrementMinutes}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Settings / Archive Drawer */}
      <ArchiveDrawer
        isOpen={isArchiveOpen}
        onClose={() => setIsArchiveOpen(false)}
        currentTheme={currentTheme}
        onSelectTheme={handleSelectTheme}
        userName={profile.name}
        onUpdateName={(name) => setProfile(prev => ({ ...prev, name }))}
        onSelectLetter={handleSelectLetterFromArchive}
        onResetApp={handleResetApp}
      />
    </div>
  );
}
