import React, { useState } from 'react';
import { HOME_TOPICS } from '../data';
import { BottomSheet } from '../components/BottomSheet';

export function HomeScreen() {
  const [selectedTopic, setSelectedTopic] = useState<typeof HOME_TOPICS[0] | null>(null);

  return (
    <div className="flex flex-col h-full overflow-y-auto w-full p-4 items-center">
      <h1 className="text-2xl text-[var(--color-primary)] font-bold text-center mt-6 uppercase tracking-wider">
        Stellarium Foundation
      </h1>
      
      <div className="mt-4">
        <a 
          href="https://www.stellarium.ddns-ip.net/home" 
          target="_blank" 
          rel="noopener noreferrer"
          className="px-4 py-2 border border-blue-400/30 text-[var(--color-primary)] rounded-md text-xs font-medium uppercase tracking-widest hover:bg-white/5 transition-colors"
        >
          Visit Official Website
        </a>
      </div>

      <p className="mt-8 text-center font-bold text-[#EEEEEE] text-lg max-w-sm">
        An institution to propel global wealth creation and wellness.
      </p>

      <p className="mt-4 text-center text-sm text-gray-400 leading-relaxed max-w-md">
        Through high-profile advising, technology, wisdom, and innovative fortitude, we implement commoditizing solutions in business, policy, finance, personal wealth creation, relationships, and branding.
      </p>

      <p className="mt-8 text-center text-[var(--color-primary)] opacity-80 text-sm font-medium uppercase tracking-wider">
        How would you like to interact?
      </p>

      <div className="grid grid-cols-3 gap-3 w-full max-w-md mt-6 pb-24">
        {HOME_TOPICS.map(topic => {
          const Icon = topic.icon;
          return (
            <button
              key={topic.id}
              onClick={() => setSelectedTopic(topic)}
              className="flex flex-col items-center justify-center p-4 h-24 bg-[#1E1E1E] rounded-xl border border-white/5 shadow-md active:scale-95 transition-transform"
            >
              <Icon size={28} className="text-gray-400 mb-2" />
              <span className="text-[10px] font-bold text-gray-200 uppercase tracking-wide">{topic.title}</span>
            </button>
          )
        })}
      </div>

      <BottomSheet isOpen={selectedTopic !== null} onClose={() => setSelectedTopic(null)}>
        {selectedTopic && (
          <div className="flex flex-col items-center">
            {React.createElement(selectedTopic.icon, { size: 56, className: "text-[var(--color-primary)]" })}
            <h2 className="text-2xl font-bold text-[var(--color-primary)] mt-6 text-center">{selectedTopic.subtitle}</h2>
            
            <div className="mt-8 space-y-4 text-[#EEEEEE] text-[15px] leading-relaxed text-center whitespace-pre-wrap">
              {selectedTopic.description}
            </div>
            <div className="h-12" />
          </div>
        )}
      </BottomSheet>
    </div>
  );
}
