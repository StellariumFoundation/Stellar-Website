import React, { useState } from 'react';
import { Home, Book, FileQuestion, CircleDollarSign, Mail } from 'lucide-react';
import { HomeScreen } from './screens/HomeScreen';
import { LibraryScreen } from './screens/LibraryScreen';
import { QuizScreen } from './screens/QuizScreen';
import { SponsorScreen } from './screens/SponsorScreen';
import { ContactScreen } from './screens/ContactScreen';

type Tab = 'home' | 'books' | 'quiz' | 'sponsor' | 'contact';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('home');

  return (
    <div className="flex flex-col h-screen w-full bg-transparent">
      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden relative">
        {activeTab === 'home' && <HomeScreen />}
        {activeTab === 'books' && <LibraryScreen />}
        {activeTab === 'quiz' && <QuizScreen />}
        {activeTab === 'sponsor' && <SponsorScreen />}
        {activeTab === 'contact' && <ContactScreen />}
      </div>

      {/* Bottom Navigation */}
      <div className="bg-black/70 backdrop-blur-md border-t border-white/5 safe-bottom z-50">
        <div className="flex justify-around items-center h-16 px-2 max-w-lg mx-auto">
          <NavButton 
            icon={Home} 
            label="Home" 
            isActive={activeTab === 'home'} 
            onClick={() => setActiveTab('home')} 
          />
          <NavButton 
            icon={Book} 
            label="Library" 
            isActive={activeTab === 'books'} 
            onClick={() => setActiveTab('books')} 
          />
          <NavButton 
            icon={FileQuestion} 
            label="Quiz" 
            isActive={activeTab === 'quiz'} 
            onClick={() => setActiveTab('quiz')} 
          />
          <NavButton 
            icon={CircleDollarSign} 
            label="Sponsor" 
            isActive={activeTab === 'sponsor'} 
            onClick={() => setActiveTab('sponsor')} 
          />
          <NavButton 
            icon={Mail} 
            label="Contact" 
            isActive={activeTab === 'contact'} 
            onClick={() => setActiveTab('contact')} 
          />
        </div>
      </div>
    </div>
  );
}

function NavButton({ 
  icon: Icon, 
  label, 
  isActive, 
  onClick 
}: { 
  icon: React.ElementType, 
  label: string, 
  isActive: boolean, 
  onClick: () => void 
}) {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors relative ${
        isActive ? 'text-[var(--color-tertiary)]' : 'text-gray-400 hover:text-white'
      }`}
    >
      <div className="relative p-1 rounded-full z-10">
        {isActive && (
          <div className="absolute inset-0 bg-[var(--color-tertiary)]/20 blur-md rounded-full" />
        )}
        <Icon size={22} strokeWidth={isActive ? 2.5 : 2} className="relative z-10" />
      </div>
      <span className="text-[10px] font-medium tracking-wide">
        {label}
      </span>
    </button>
  );
}
