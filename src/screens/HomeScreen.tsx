import React, { useState } from 'react';
import { HOME_TOPICS } from '../data';
import { BottomSheet } from '../components/BottomSheet';
import { FileText } from 'lucide-react';

export function HomeScreen() {
  const [selectedTopic, setSelectedTopic] = useState<typeof HOME_TOPICS[0] | null>(null);

  return (
    <div className="flex flex-col h-full overflow-y-auto w-full p-4 items-center">
      <h1 className="text-3xl font-normal text-center mt-6 uppercase tracking-wider">
        Stellarium Foundation
      </h1>
      
      <div className="mt-4 flex flex-col sm:flex-row gap-3 items-center">
        <a 
          href="https://stellariumfoundation.github.io/Stellarium-App/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="px-4 py-2 border border-[var(--color-tertiary)] bg-[var(--color-tertiary)]/10 text-[var(--color-tertiary)] rounded-md text-xs font-bold uppercase tracking-widest hover:bg-[var(--color-tertiary)]/20 transition-colors w-full sm:w-auto text-center flex items-center justify-center gap-2"
        >
          Download Mobile App
        </a>
        <a 
          href="/resume.pdf" 
          target="_blank" 
          rel="noopener noreferrer"
          className="px-4 py-2 border border-white/30 text-white rounded-md text-xs font-medium uppercase tracking-widest hover:bg-[var(--color-surface)] transition-colors w-full sm:w-auto text-center flex items-center justify-center gap-2"
        >
          <FileText size={16} /> John Victor's Resume
        </a>
      </div>

      <p className="mt-8 text-center font-bold text-[var(--color-secondary)] text-lg max-w-sm">
        An institution to propel global wealth creation and wellness.
      </p>

      <p className="mt-4 text-center text-sm text-[var(--color-on-surface)] opacity-80 leading-relaxed max-w-md">
        Through high-profile advising, technology, wisdom, and innovative fortitude, we implement commoditizing solutions in business, policy, finance, personal wealth creation, relationships, and branding.
      </p>

      <p className="mt-8 text-center text-[var(--color-tertiary)] text-sm font-medium uppercase tracking-wider">
        How would you like to interact?
      </p>

      <div className="grid grid-cols-3 gap-3 w-full max-w-md mt-6 pb-24">
        {HOME_TOPICS.map(topic => {
          const Icon = topic.icon;
          return (
            <button
              key={topic.id}
              onClick={() => setSelectedTopic(topic)}
              className="flex flex-col items-center justify-center p-4 h-24 bg-[var(--color-surface)] rounded-xl border border-white/5 shadow-md active:scale-95 transition-transform"
            >
              <Icon size={28} className="text-[var(--color-secondary)] mb-2" />
              <span className="text-[10px] font-bold text-[var(--color-on-surface)] uppercase tracking-wide">{topic.title}</span>
            </button>
          )
        })}
      </div>

      <BottomSheet isOpen={selectedTopic !== null} onClose={() => setSelectedTopic(null)}>
        {selectedTopic && (
          <div className="flex flex-col items-center">
            {React.createElement(selectedTopic.icon, { size: 56, className: "text-white" })}
            <h2 className="text-2xl font-bold text-white mt-6 text-center">{selectedTopic.subtitle}</h2>
            
            <div className="mt-8 space-y-4 text-[var(--color-on-surface)] text-[15px] leading-relaxed text-center whitespace-pre-wrap">
              {selectedTopic.description}
            </div>
            <div className="h-12" />
          </div>
        )}
      </BottomSheet>
    </div>
  );
}
