import React, { useState, useMemo } from 'react';
import { MOCK_BOOKS } from '../data';
import { ArrowLeft, BookOpen, ExternalLink, Download } from 'lucide-react';
import Markdown from 'react-markdown';

export function LibraryScreen() {
  const [selectedBook, setSelectedBook] = useState<typeof MOCK_BOOKS[0] | null>(null);

  // Match the Kotlin logic which groups books by title vs category in production, 
  // but for the web demo we'll just display them in a list or grouped by a static logic.
  // Our MOCK_BOOKS has the index and a few books.

  if (selectedBook) {
    return (
      <div className="flex flex-col h-full bg-transparent">
        <div className="flex items-center p-4 border-b border-white/10 sticky top-0 bg-black/60 backdrop-blur-md z-10 safe-top">
          <button onClick={() => setSelectedBook(null)} className="p-2 text-white hover:text-gray-300">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-lg font-semibold text-white ml-4 truncate flex-1 text-center pr-10">
            {selectedBook.title}
          </h1>
        </div>
        <div className="flex-1 overflow-y-auto p-6 md:p-12 pb-32 flex flex-col items-center">
          <div className="prose prose-invert prose-p:font-sans prose-headings:font-serif prose-a:text-[var(--color-tertiary)] max-w-2xl w-full">
            <Markdown>{selectedBook.content}</Markdown>
          </div>
          
          {selectedBook.notionUrl && (
            <a 
              href={selectedBook.notionUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-12 px-6 py-3 bg-[var(--color-tertiary)] text-black font-semibold rounded-full hover:bg-[var(--color-tertiary)]/90 transition-colors"
            >
              Read Original on Notion
            </a>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full overflow-y-auto w-full p-6 items-center">
      <h1 className="text-3xl text-[var(--color-primary)] font-normal text-center mt-2">
        Stellarium Library
      </h1>

      <div className="w-full max-w-md mt-6 space-y-6 pb-24">
        
        {/* PDF Section (Simulated) */}
        <div>
          <h2 className="text-lg font-semibold text-[var(--color-tertiary)] text-center mb-4 uppercase tracking-wider text-sm">
            Official Books (PDF)
          </h2>
          <div className="bg-[var(--color-surface)] border border-white/10 rounded-2xl p-6 flex flex-col items-center">
             <BookOpen size={48} className="text-white mb-4" />
             <span className="text-lg font-bold text-white mb-4">The Stellarium Book</span>
             <div className="flex gap-4 mb-6">
                <button className="flex items-center gap-2 px-4 py-2 bg-[var(--color-tertiary)]/20 text-[var(--color-tertiary)] rounded-full text-sm font-medium">
                  <ExternalLink size={16} /> Open
                </button>
                <button className="flex items-center gap-2 px-4 py-2 border border-white/20 text-gray-200 rounded-full text-sm font-medium">
                  <Download size={16} /> Save
                </button>
             </div>
             <div className="flex gap-6 w-full justify-center border-t border-white/10 pt-4">
                <a href="https://www.amazon.com/dp/B0FLPSQ6ZS" target="_blank" rel="noopener noreferrer" className="text-xs text-[var(--color-tertiary)] uppercase font-semibold">Buy on Amazon</a>
                <a href="https://www.everand.com/book/897831454/The-Stellarium-Book" target="_blank" rel="noopener noreferrer" className="text-xs text-[var(--color-tertiary)] uppercase font-semibold">Read on Everand</a>
             </div>
          </div>
        </div>

        <div className="h-px bg-white/10 w-full" />

        {/* Text Section */}
        <div>
          <h2 className="text-lg font-semibold text-[var(--color-tertiary)] text-center mb-4 uppercase tracking-wider text-sm">
            Digital Texts
          </h2>
          <div className="space-y-4">
            {MOCK_BOOKS.map((book, idx) => (
              <button 
                key={idx}
                onClick={() => setSelectedBook(book)}
                className="w-full bg-[var(--color-surface)] border border-white/5 hover:border-white/20 transition-colors p-6 rounded-2xl flex flex-col items-center active:scale-95 transition-transform"
              >
                 <span className="text-md font-bold text-white text-center">{book.title}</span>
                 {book.commentFromIndex && (
                    <span className="text-xs text-[var(--color-on-background)] mt-2 italic text-center">{book.commentFromIndex}</span>
                 )}
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}