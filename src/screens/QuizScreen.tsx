import React, { useState, useEffect } from 'react';

// Data Models
type Question = {
  text: string;
  options: string[];
  correctIndex: number;
};

type QuizCategory = {
  name: string;
  questions: Question[];
};

type QuizSession = {
  categoryName: string;
  questions: Question[];
};

export function QuizScreen() {
  const [categories, setCategories] = useState<QuizCategory[]>([]);
  const [activeQuizSession, setActiveQuizSession] = useState<QuizSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Load JSON Data & Create "All" Category
  useEffect(() => {
    async function loadQuizzes() {
      try {
        const res = await fetch('/quizzes.json');
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        
        const rootObject = await res.json();
        const topicsArray = rootObject.topics || [];
        
        const loadedCategories: QuizCategory[] = topicsArray.map((topicObj: any) => ({
          name: topicObj.topicName,
          questions: topicObj.questions.map((qObj: any) => ({
            text: String(qObj.text),
            options: Array.isArray(qObj.options) ? qObj.options.map(String) : [],
            correctIndex: Number(qObj.correctIndex)
          }))
        }));

        const allQuestions = loadedCategories.flatMap(c => c.questions);
        const generalCategory: QuizCategory = {
          name: "General Knowledge (All Topics)",
          questions: allQuestions
        };

        setCategories([generalCategory, ...loadedCategories]);
      } catch (e: any) {
        console.error(e);
        setErrorMessage(`Error loading quizzes: ${e.message}`);
      } finally {
        setIsLoading(false);
      }
    }

    loadQuizzes();
  }, []);

  const handleRetake = () => {
    if (!activeQuizSession) return;
    const currentCatName = activeQuizSession.categoryName;
    const originalCategory = categories.find(c => c.name === currentCatName);
    
    if (originalCategory) {
      const shuffled = [...originalCategory.questions].sort(() => 0.5 - Math.random()).slice(0, 15);
      setActiveQuizSession({
        categoryName: originalCategory.name,
        questions: shuffled
      });
    }
  };

  const startQuiz = (category: QuizCategory) => {
    const shuffled = [...category.questions].sort(() => 0.5 - Math.random()).slice(0, 15);
    setActiveQuizSession({
      categoryName: category.name,
      questions: shuffled
    });
  };

  if (activeQuizSession) {
    return (
      <QuizSessionView 
        session={activeQuizSession} 
        onReturnToMenu={() => setActiveQuizSession(null)} 
        onRetake={handleRetake} 
      />
    );
  }

  return (
    <QuizMenu 
      categories={categories} 
      isLoading={isLoading} 
      error={errorMessage} 
      onCategorySelected={startQuiz} 
    />
  );
}

function QuizMenu({
  categories,
  isLoading,
  error,
  onCategorySelected
}: {
  categories: QuizCategory[];
  isLoading: boolean;
  error: string | null;
  onCategorySelected: (category: QuizCategory) => void;
}) {
  return (
    <div className="flex flex-col h-full overflow-y-auto w-full p-6 items-center">
      <h1 className="text-3xl font-normal text-[var(--color-primary)] text-center mt-2">
        Stellarium Knowledge Base
      </h1>
      <p className="text-center text-[var(--color-on-surface)] mt-4 max-w-sm leading-relaxed text-sm">
        Master the principles of the Foundation. Select a module below or choose 'General Knowledge' to test yourself on everything.
      </p>

      {isLoading && (
        <div className="flex-1 flex items-center justify-center mt-12 w-full">
          <div className="w-8 h-8 border-4 border-[var(--color-tertiary)] border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {error && (
        <div className="flex-1 flex items-center justify-center mt-12 text-red-400">
          {error}
        </div>
      )}

      {!isLoading && !error && (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-2xl mt-10 pb-24">
          {categories.map((category, idx) => {
            const isGeneral = category.name.includes("General Knowledge");
            return (
              <button
                key={idx}
                onClick={() => onCategorySelected(category)}
                className={`aspect-square border rounded-2xl flex items-center justify-center p-4 transition-colors ${
                  isGeneral 
                    ? 'bg-[var(--color-tertiary)]/20 border-[var(--color-tertiary)]/50 hover:bg-[var(--color-tertiary)]/30' 
                    : 'bg-[var(--color-surface)] border-white/10 hover:border-[var(--color-tertiary)]'
                } ${isGeneral ? 'col-span-full aspect-auto h-24' : ''}`}
              >
                <span className={`font-bold text-center uppercase tracking-wider text-sm ${
                  isGeneral ? 'text-[var(--color-tertiary)]' : 'text-[var(--color-secondary)]'
                }`}>
                  {category.name}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

function QuizSessionView({
  session,
  onReturnToMenu,
  onRetake
}: {
  session: QuizSession;
  onReturnToMenu: () => void;
  onRetake: () => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  // Reset state when session changes
  useEffect(() => {
    setCurrentIndex(0);
    setScore(0);
    setIsFinished(false);
  }, [session]);

  const handleAnswer = (selectedIndex: number) => {
    const question = session.questions[currentIndex];
    
    if (selectedIndex === question.correctIndex) {
      setScore(s => s + 1);
    }
    
    if (currentIndex < session.questions.length - 1) {
      setCurrentIndex(i => i + 1);
    } else {
      setIsFinished(true);
    }
  };

  if (isFinished || session.questions.length === 0) {
    return (
      <div className="flex flex-col h-full items-center p-6 justify-center">
         <h2 className="text-3xl text-[var(--color-primary)] font-normal text-center">Assessment Complete</h2>
         <p className="text-[var(--color-tertiary)] mt-2 font-bold text-center">{session.categoryName}</p>
         
         <div className="text-6xl font-black text-white mt-8">{score} / {session.questions.length}</div>
         <p className="text-[var(--color-on-surface)] uppercase tracking-widest text-sm mt-2">Correct Answers</p>

         <div className="mt-16 w-full max-w-sm space-y-4">
            <button 
              onClick={onRetake}
              className="w-full bg-[var(--color-tertiary)] text-black py-4 rounded-full font-bold uppercase tracking-wider hover:bg-[var(--color-tertiary)]/90 active:scale-[0.98] transition-transform"
            >
              Retake Quiz (New Questions)
            </button>
            <button 
              onClick={onReturnToMenu}
              className="w-full border border-white/20 text-white py-4 rounded-full font-semibold uppercase tracking-wider hover:bg-white/10 active:scale-[0.98] transition-transform"
            >
              Return to Topics
            </button>
         </div>
      </div>
    );
  }

  const question = session.questions[currentIndex];
  const progress = ((currentIndex + 1) / session.questions.length) * 100;

  return (
     <div className="flex flex-col h-full overflow-y-auto w-full p-6 pt-12 items-center max-w-xl mx-auto pb-24">
       <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden mb-4">
          <div className="h-full bg-[var(--color-tertiary)] transition-all duration-300" style={{ width: `${progress}%` }} />
       </div>
       <p className="text-xs text-[var(--color-tertiary)] font-bold mb-8 uppercase tracking-widest">
         Question {currentIndex + 1} of {session.questions.length}
       </p>

       <h3 className="text-2xl font-bold text-center text-white mb-12 leading-relaxed">
         {question.text}
       </h3>

       <div className="w-full space-y-3">
         {question.options.map((option, idx) => (
           <button
             key={idx}
             onClick={() => handleAnswer(idx)}
             className="w-full bg-white text-black py-4 px-6 rounded-xl font-bold text-center hover:bg-gray-200 active:scale-[0.98] transition-all shadow-sm"
           >
             {option}
           </button>
         ))}
       </div>
    </div>
  );
}

