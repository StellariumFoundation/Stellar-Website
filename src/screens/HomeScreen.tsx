import React, { useState } from 'react';
import { HOME_TOPICS } from '../data';
import { BottomSheet } from '../components/BottomSheet';
import { FileText, Download, Eye, ArrowLeft, Facebook, Instagram, Twitter, Send } from 'lucide-react';
import Markdown from 'react-markdown';
import { RESUME_MARKDOWN } from '../data/resume';

const TikTokIcon = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

export function HomeScreen() {
  const [selectedTopic, setSelectedTopic] = useState<typeof HOME_TOPICS[0] | null>(null);
  const [showResume, setShowResume] = useState(false);

  if (showResume) {
    return (
      <div className="flex flex-col h-full bg-transparent overflow-hidden">
        <div className="flex items-center p-4 border-b border-white/10 sticky top-0 bg-black/60 backdrop-blur-md z-10 safe-top">
          <button onClick={() => setShowResume(false)} className="p-2 text-white hover:text-gray-300">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-lg font-semibold text-white ml-4 truncate flex-1 text-center pr-10 hover:text-[var(--color-tertiary)] transition-colors">
            John Victor - Resume
          </h1>
        </div>
        <div className="flex-1 overflow-y-auto p-6 md:p-12 pb-32 flex flex-col items-center max-w-3xl mx-auto w-full">
          <div className="w-full">
            <Markdown
              components={{
                h1: ({node, ...props}) => <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white text-center mt-8 mb-4 leading-tight" {...props} />,
                h2: ({node, ...props}) => <h2 className="text-2xl sm:text-3xl font-serif font-semibold text-[var(--color-tertiary)] text-center mt-10 mb-6 border-b border-[var(--color-tertiary)]/20 pb-4" {...props} />,
                h3: ({node, ...props}) => <h3 className="text-xl font-serif font-medium text-[var(--color-secondary)] mt-8 mb-4 border-l-2 border-[var(--color-secondary)] pl-3" {...props} />,
                p: ({node, ...props}) => <p className="text-base sm:text-lg leading-relaxed text-[var(--color-on-background)] mb-6 font-sans" {...props} />,
                a: ({node, ...props}) => <a className="text-[var(--color-tertiary)] hover:text-white underline decoration-[var(--color-tertiary)]/50 underline-offset-4 transition-colors font-semibold" {...props} />,
                strong: ({node, ...props}) => <strong className="font-bold text-white" {...props} />,
                ul: ({node, ...props}) => <ul className="space-y-3 mb-8 ml-4 list-none" {...props} />,
                li: ({node, ...props}) => <li className="flex items-start text-base sm:text-lg text-[var(--color-on-background)] before:content-['✦'] before:text-[var(--color-secondary)] before:mr-3 before:font-bold" {...props} />,
                hr: ({node, ...props}) => <hr className="border-t border-white/10 my-8" {...props} />,
              }}
            >
              {RESUME_MARKDOWN}
            </Markdown>
          </div>
          <a
            href="/resume.pdf"
            download="John_Victor_Resume.pdf"
            className="mt-12 px-8 py-3 bg-[var(--color-tertiary)] text-black font-semibold rounded-full hover:bg-[var(--color-tertiary)]/90 transition-colors shadow-[0_0_15px_rgba(0,255,255,0.3)] flex items-center gap-2"
          >
            <Download size={20} /> Download PDF Version
          </a>
        </div>
      </div>
    );
  }

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
      </div>

      <p className="mt-8 text-center font-bold text-[var(--color-secondary)] text-lg max-w-sm">
        An institution to propel global wealth creation and wellness.
      </p>

      <p className="mt-4 text-center text-sm text-[var(--color-on-surface)] opacity-80 leading-relaxed max-w-md">
        Through high-profile advising, technology, wisdom, and innovative fortitude, we implement commoditizing solutions in business, policy, finance, personal wealth creation, relationships, and branding.
      </p>

      <p className="mt-10 text-center text-[var(--color-tertiary)] text-sm font-medium uppercase tracking-wider">
        How would you like to interact?
      </p>

      <div className="grid grid-cols-3 gap-3 w-full max-w-md mt-6">
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

      <div className="mt-10 w-full max-w-md flex flex-col items-center border-t border-white/10 pt-8">
        <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-on-surface)] mb-4">Founder Profile</h3>
        <div className="flex gap-4 w-full justify-center">
          <button 
            onClick={() => setShowResume(true)}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-[var(--color-surface)] border border-white/10 text-white rounded-xl text-sm font-medium hover:bg-white/5 transition-colors"
          >
            <Eye size={18} className="text-[var(--color-tertiary)]" /> Read Resume
          </button>
          <a 
            href="/resume.pdf" 
            download="John_Victor_Resume.pdf"
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-[var(--color-surface)] border border-white/10 text-white rounded-xl text-sm font-medium hover:bg-white/5 transition-colors"
          >
            <Download size={18} className="text-[var(--color-secondary)]" /> Download PDF
          </a>
        </div>
      </div>

      <div className="mt-10 mb-24 w-full max-w-md flex flex-col items-center border-t border-white/10 pt-8">
        <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-on-surface)] mb-6">Connect With Us</h3>
        
        <div className="grid grid-cols-2 gap-3 w-full">
          <a href="https://www.facebook.com/share/1EcFgbNBXF/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-[var(--color-surface)] border border-white/5 rounded-xl hover:bg-white/5 transition-colors group">
            <Facebook size={20} className="text-[#1877F2] group-hover:scale-110 transition-transform" />
            <span className="text-xs font-medium text-white">Facebook</span>
          </a>
          
          <a href="https://www.instagram.com/john.victor.the.one" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-[var(--color-surface)] border border-white/5 rounded-xl hover:bg-white/5 transition-colors group">
            <Instagram size={20} className="text-[#E1306C] group-hover:scale-110 transition-transform" />
            <span className="text-xs font-medium text-white truncate">Instagram</span>
          </a>

          <a href="https://tiktok.com/@johnvictorone" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-[var(--color-surface)] border border-white/5 rounded-xl hover:bg-white/5 transition-colors group">
            <TikTokIcon size={20} className="text-white group-hover:scale-110 transition-transform" />
            <span className="text-xs font-medium text-white truncate">John (TikTok)</span>
          </a>

          <a href="https://tiktok.com/@stellarium.foundation" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-[var(--color-surface)] border border-white/5 rounded-xl hover:bg-white/5 transition-colors group">
            <TikTokIcon size={20} className="text-white group-hover:scale-110 transition-transform" />
            <span className="text-xs font-medium text-white truncate">Stellarium (TikTok)</span>
          </a>

          <a href="https://t.me/JohnVictorOne" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-[var(--color-surface)] border border-white/5 rounded-xl hover:bg-white/5 transition-colors group">
            <Send size={20} className="text-[#0088cc] group-hover:scale-110 transition-transform" />
            <span className="text-xs font-medium text-white truncate">John (Telegram)</span>
          </a>

          <a href="https://t.me/StellariumActions" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-[var(--color-surface)] border border-white/5 rounded-xl hover:bg-white/5 transition-colors group">
            <Send size={20} className="text-[#0088cc] group-hover:scale-110 transition-transform" />
            <span className="text-xs font-medium text-white truncate">Stellarium (Telegram)</span>
          </a>

          <a href="https://x.com/StellarFou4749" target="_blank" rel="noopener noreferrer" className="col-span-2 flex items-center justify-center gap-3 p-3 bg-[var(--color-surface)] border border-white/5 rounded-xl hover:bg-white/5 transition-colors group">
            <Twitter size={20} className="text-white group-hover:scale-110 transition-transform" />
            <span className="text-xs font-medium text-white">X (Twitter)</span>
          </a>
        </div>
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
