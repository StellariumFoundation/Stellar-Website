import React, { useState, useEffect } from 'react';
import { ArrowLeft, BookOpen, ExternalLink, Download } from 'lucide-react';
import Markdown from 'react-markdown';

type StellariumDocument = {
  title: string;
  content: string;
  notion_url: string | null;
  comment_from_index: string | null;
};

export function LibraryScreen() {
  const [selectedBook, setSelectedBook] = useState<StellariumDocument | null>(null);
  const [allBooks, setAllBooks] = useState<StellariumDocument[]>([]);
  const [groupedBooks, setGroupedBooks] = useState<Record<string, StellariumDocument[]>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    async function loadBooks() {
      try {
        const res = await fetch('/literature.json');
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        
        const books: StellariumDocument[] = await res.json();
        setAllBooks(books);
        
        // Organize books
        const indexBook = books.find(b => b.title.trim().toLowerCase() === "stellarium literature");
        
        if (!indexBook) {
          setGroupedBooks({ "All Literature": [...books].sort((a, b) => a.title.localeCompare(b.title)) });
          setIsLoading(false);
          return;
        }

        const categorizedMap: Record<string, StellariumDocument[]> = {};
        const booksByTitle: Record<string, StellariumDocument> = {};
        books.forEach(b => {
          booksByTitle[b.title.trim().toLowerCase()] = b;
        });
        
        const assignedTitles = new Set<string>();
        assignedTitles.add(indexBook.title.trim().toLowerCase());

        const lines = indexBook.content.split('\n');
        let currentCategory = "General";
        const linkPattern = /\[(.*?)\]\(.*?\)/;

        for (const line of lines) {
          const trimmed = line.trim();
          
          if (trimmed.startsWith("**") && trimmed.endsWith("**") && trimmed.length > 4) {
            currentCategory = trimmed.substring(2, trimmed.length - 2).trim();
            continue;
          }

          const match = trimmed.match(linkPattern);
          if (match && match[1]) {
            const extractedTitle = match[1].trim();
            const book = booksByTitle[extractedTitle.toLowerCase()];
            
            if (book) {
              if (!categorizedMap[currentCategory]) {
                categorizedMap[currentCategory] = [];
              }
              categorizedMap[currentCategory].push(book);
              assignedTitles.add(book.title.trim().toLowerCase());
            }
          }
        }

        const unassigned = books.filter(b => !assignedTitles.has(b.title.trim().toLowerCase()));
        if (unassigned.length > 0) {
          categorizedMap["Other Resources"] = unassigned;
        }

        setGroupedBooks(categorizedMap);
      } catch (e: any) {
        console.error(e);
        setErrorMsg(`Error loading library. Ensure 'literature.json' exists. ${e.message}`);
      } finally {
        setIsLoading(false);
      }
    }

    loadBooks();
  }, []);

  if (selectedBook) {
    return (
      <div className="flex flex-col h-full bg-transparent overflow-hidden">
        <div className="flex items-center p-4 border-b border-white/10 sticky top-0 bg-black/60 backdrop-blur-md z-10 safe-top">
          <button onClick={() => setSelectedBook(null)} className="p-2 text-white hover:text-gray-300">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-lg font-semibold text-white ml-4 truncate flex-1 text-center pr-10 hover:text-[var(--color-tertiary)] transition-colors">
            {selectedBook.title}
          </h1>
        </div>
        <div className="flex-1 overflow-y-auto p-6 md:p-12 pb-32 flex flex-col items-center max-w-3xl mx-auto w-full">
          <div className="w-full">
            <Markdown
              components={{
                h1: ({node, ...props}) => <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white text-center mt-12 mb-8 leading-tight" {...props} />,
                h2: ({node, ...props}) => <h2 className="text-2xl sm:text-3xl font-serif font-semibold text-[var(--color-tertiary)] text-center mt-10 mb-6 border-b border-[var(--color-tertiary)]/20 pb-4" {...props} />,
                h3: ({node, ...props}) => <h3 className="text-xl font-serif font-medium text-[var(--color-secondary)] text-center mt-8 mb-4" {...props} />,
                p: ({node, ...props}) => <p className="text-base sm:text-lg leading-relaxed text-[var(--color-on-background)] text-center mb-6 mx-auto max-w-2xl font-sans" {...props} />,
                a: ({node, ...props}) => <a className="text-[var(--color-tertiary)] hover:text-white underline decoration-[var(--color-tertiary)]/50 underline-offset-4 transition-colors font-semibold" {...props} />,
                strong: ({node, ...props}) => <strong className="font-bold text-white" {...props} />,
                ul: ({node, ...props}) => <ul className="space-y-3 mb-8 block mx-auto text-left w-full max-w-lg list-none" {...props} />,
                ol: ({node, ...props}) => <ol className="space-y-3 mb-8 block mx-auto text-left w-full max-w-lg list-decimal list-inside text-[var(--color-on-background)]" {...props} />,
                li: ({node, ...props}) => <li className="flex items-start text-base sm:text-lg text-[var(--color-on-background)] before:content-['✦'] before:text-[var(--color-secondary)] before:mr-3 before:font-bold" {...props} />,
                blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-[var(--color-secondary)] pl-6 py-2 my-8 italic text-lg text-white/80 max-w-2xl mx-auto bg-white/5 rounded-r-xl" {...props} />,
              }}
            >
              {selectedBook.content}
            </Markdown>
          </div>
          
          {selectedBook.notion_url && (
            <a 
              href={selectedBook.notion_url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-12 px-6 py-3 bg-[var(--color-tertiary)] text-black font-semibold rounded-full hover:bg-[var(--color-tertiary)]/90 transition-colors shadow-[0_0_15px_rgba(0,255,255,0.3)]"
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
        
        {isLoading && (
          <div className="flex justify-center items-center h-48">
            <div className="w-8 h-8 border-4 border-[var(--color-tertiary)] border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {errorMsg && (
          <div className="text-red-400 text-center p-4 bg-red-900/20 border border-red-900/50 rounded-xl">
            {errorMsg}
          </div>
        )}

        {!isLoading && !errorMsg && (
          <>
            {/* PDF Section (Simulated Download links) */}
            <div>
              <h2 className="text-lg font-bold text-[var(--color-tertiary)] text-center mb-4 text-sm mt-4">
                Official Books (PDF)
              </h2>
              <div className="bg-[var(--color-surface)] border border-white/10 rounded-2xl p-6 flex flex-col items-center">
                 <BookOpen size={48} className="text-[var(--color-primary)] mb-4" />
                 <span className="text-lg font-bold text-white mb-4">The Stellarium Book</span>
                 <div className="flex gap-4 mb-6 w-full justify-center">
                    <a href="/The.Stellarium.Book.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 px-4 py-2 bg-[var(--color-tertiary)]/20 text-[var(--color-tertiary)] rounded-full text-sm font-medium hover:bg-[var(--color-tertiary)]/30 transition-colors w-24">
                      <ExternalLink size={16} /> Open
                    </a>
                    <a href="/The.Stellarium.Book.pdf" download="The.Stellarium.Book.pdf" className="flex items-center justify-center gap-2 px-4 py-2 border border-white/20 text-gray-200 rounded-full text-sm font-medium hover:bg-white/5 transition-colors w-24">
                      <Download size={16} /> Save
                    </a>
                 </div>
                 <div className="flex gap-4 sm:gap-6 w-full justify-center border-t border-white/10 pt-4">
                    <a href="https://www.everand.com/book/897831454/The-Stellarium-Book" target="_blank" rel="noopener noreferrer" className="text-xs text-[var(--color-tertiary)] uppercase font-semibold hover:text-[var(--color-primary)] transition-colors">Read on Everand</a>
                 </div>
              </div>

              <div className="bg-[var(--color-surface)] border border-white/10 rounded-2xl p-6 flex flex-col items-center mt-4">
                 <BookOpen size={48} className="text-[var(--color-primary)] mb-4" />
                 <span className="text-lg font-bold text-white mb-4">The Stellarium Society</span>
                 <div className="flex gap-4 w-full justify-center">
                    <a href="/Stellarium.Society.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 px-4 py-2 bg-[var(--color-tertiary)]/20 text-[var(--color-tertiary)] rounded-full text-sm font-medium hover:bg-[var(--color-tertiary)]/30 transition-colors w-24">
                      <ExternalLink size={16} /> Open
                    </a>
                    <a href="/Stellarium.Society.pdf" download="Stellarium.Society.pdf" className="flex items-center justify-center gap-2 px-4 py-2 border border-white/20 text-gray-200 rounded-full text-sm font-medium hover:bg-white/5 transition-colors w-24">
                      <Download size={16} /> Save
                    </a>
                 </div>
              </div>
            </div>

            <div className="h-px bg-white/10 w-full my-8" />

            {/* Text Section grouped dynamically */}
            <div className="space-y-8">
              {Object.entries(groupedBooks).map(([category, books]) => (
                <div key={category}>
                  <h2 className="text-lg font-bold text-[var(--color-tertiary)] text-center mb-4 flex-1 w-full pt-4">
                    {category}
                  </h2>
                  <div className="space-y-4 w-full">
                    {books.map((book, idx) => (
                      <button 
                        key={idx}
                        onClick={() => setSelectedBook(book)}
                        className="w-full bg-[var(--color-surface)] border border-white/5 hover:border-white/20 transition-colors p-6 rounded-2xl flex flex-col items-center active:scale-95"
                      >
                        <span className="text-md font-bold text-white text-center">{book.title}</span>
                        {book.comment_from_index && (
                          <span className="text-xs text-[var(--color-on-surface)] mt-2 italic text-center">
                            {book.comment_from_index}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}