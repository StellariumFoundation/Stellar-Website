import React, { useState } from 'react';
import { MOCK_QUIZZES } from '../data';

export function QuizScreen() {
  const [activeQuiz, setActiveQuiz] = useState<typeof MOCK_QUIZZES[0] | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const startQuiz = (quiz: typeof MOCK_QUIZZES[0]) => {
    setActiveQuiz(quiz);
    setCurrentIndex(0);
    setScore(0);
    setIsFinished(false);
  };

  const handleAnswer = (selectedIndex: number) => {
    if (!activeQuiz) return;
    
    if (selectedIndex === activeQuiz.questions[currentIndex].correctIndex) {
      setScore(s => s + 1);
    }
    
    if (currentIndex < activeQuiz.questions.length - 1) {
      setCurrentIndex(i => i + 1);
    } else {
      setIsFinished(true);
    }
  };

  if (activeQuiz) {
    if (isFinished) {
      return (
        <div className="flex flex-col h-full items-center p-6 justify-center">
           <h2 className="text-3xl text-[var(--color-primary)] font-bold">Assessment Complete</h2>
           <p className="text-gray-400 mt-2">{activeQuiz.topicName}</p>
           
           <div className="text-6xl font-black text-white mt-8">{score} / {activeQuiz.questions.length}</div>
           <p className="text-gray-400 uppercase tracking-widest text-sm mt-2">Correct Answers</p>

           <div className="mt-16 w-full max-w-sm space-y-4">
              <button 
                onClick={() => startQuiz(activeQuiz)}
                className="w-full bg-white text-black py-4 rounded-full font-bold uppercase tracking-wider hover:bg-gray-200"
              >
                Retake Quiz
              </button>
              <button 
                onClick={() => setActiveQuiz(null)}
                className="w-full border border-white/20 text-white py-4 rounded-full font-semibold uppercase tracking-wider hover:bg-white/10"
              >
                Return to Topics
              </button>
           </div>
        </div>
      );
    }

    const question = activeQuiz.questions[currentIndex];
    const progress = ((currentIndex) / activeQuiz.questions.length) * 100;

    return (
      <div className="flex flex-col h-full w-full p-6 pt-12 items-center max-w-lg mx-auto">
         <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden mb-4">
            <div className="h-full bg-[var(--color-primary)] transition-all duration-300" style={{ width: `${progress}%` }} />
         </div>
         <p className="text-sm text-gray-500 font-semibold mb-8 uppercase">Question {currentIndex + 1} of {activeQuiz.questions.length}</p>

         <h3 className="text-2xl font-bold text-center text-white mb-12 leading-relaxed">
           {question.text}
         </h3>

         <div className="w-full space-y-3">
           {question.options.map((option, idx) => (
             <button
               key={idx}
               onClick={() => handleAnswer(idx)}
               className="w-full bg-white text-black py-4 px-6 rounded-xl font-medium text-center hover:bg-gray-200 active:scale-[0.98] transition-all shadow-sm"
             >
               {option}
             </button>
           ))}
         </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full overflow-y-auto w-full p-6 items-center">
      <h1 className="text-2xl text-[var(--color-primary)] font-bold text-center mt-2">
        Knowledge Base
      </h1>
      <p className="text-center text-sm text-gray-400 mt-4 max-w-sm leading-relaxed">
        Master the principles of the Foundation. Select a module below to test your understanding.
      </p>

      <div className="grid grid-cols-2 gap-4 w-full max-w-md mt-10">
        {MOCK_QUIZZES.map((quiz, idx) => (
          <button
            key={idx}
            onClick={() => startQuiz(quiz)}
            className="aspect-square bg-[#1E1E1E] border border-white/10 rounded-2xl flex items-center justify-center p-4 hover:border-white/30 transition-colors"
          >
            <span className="text-[var(--color-primary)] font-bold text-center uppercase tracking-wider text-sm">{quiz.topicName}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
