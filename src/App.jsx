import React, { useCallback, useMemo, useRef, useState, useEffect } from 'react';
import 'katex/dist/katex.min.css';
import useKatex from './hooks/useKatex';
import { PROBLEMS } from './Problems/Problems';
import 'mathlive';
import './components/MathQuiz.css';

// this function takes an array of problems and shuffles them
// to ensure that the order is randomized each time the quiz is taken.
const shuffleProblems = (problems) => {
  const shuffled = [...problems];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [
      shuffled[swapIndex],
      shuffled[index],
    ];
  }

  return shuffled;
};

// this is the main component for the math quiz.
// it handles the display of problems, user input, and feedback.
function MathQuiz() {
  const { renderKatex, katexReady } = useKatex();
  const mathfieldRef = useRef(null);

  const [problemOrder, setProblemOrder] = useState(() =>
    shuffleProblems(PROBLEMS),
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [status, setStatus] = useState('idle');
  const [isComplete, setIsComplete] = useState(false);
  const [resetCounter, setResetCounter] = useState(0);

  const problemRef = useRef(null);
  const currentProblem = problemOrder[currentIndex];
  const totalProblems = problemOrder.length;

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();

      if (!currentProblem) {
        return;
      }

      const userAnswer = mathfieldRef.current.value;
      const normalizedAnswer = userAnswer.replace(/\s+/g, '').replace(/[{}]/g, '').toLowerCase();
      const normalizedCorrectAnswer = currentProblem.answer.replace(/\s+/g, '').replace(/[{}]/g, '').toLowerCase();
      const isCorrect = normalizedAnswer === normalizedCorrectAnswer;

      if (!isCorrect) {
        setStatus('incorrect');
        return;
      }

      const nextIndex = currentIndex + 1;

      setStatus('correct');

      if (nextIndex >= totalProblems) {
        setTimeout(() => {
          setIsComplete(true);
        }, 500);
        return;
      }

      setTimeout(() => {
        setCurrentIndex(nextIndex);
        mathfieldRef.current.value = '';
        setStatus('idle');
      }, 500);
    },
    [currentIndex, currentProblem, totalProblems],
  );

  useEffect(() => {
    const mathfield = mathfieldRef.current;
    if (mathfield) {
      mathfield.executeCommand('showVirtualKeyboard');
      const reOpenKeyboard = () => mathfield.executeCommand('showVirtualKeyboard');
      mathfield.addEventListener('focus', reOpenKeyboard);

      const handleKeyDown = (ev) => {
        if (ev.key === 'Enter') {
          handleSubmit(ev);
        }
      };
      mathfield.addEventListener('keydown', handleKeyDown);

      return () => {
        mathfield.removeEventListener('focus', reOpenKeyboard);
        mathfield.removeEventListener('keydown', handleKeyDown);
      }
    }
  }, [handleSubmit]);

  useEffect(() => {
    if (!currentProblem) {
      return;
    }

    renderKatex(problemRef.current, currentProblem.problem, {
      displayMode: true,
    });
  }, [currentProblem, renderKatex]);

  const feedbackMessage = useMemo(() => {
    if (status === 'correct') {
      return { tone: 'success', text: 'Correct! Nice work.' };
    }

    if (status === 'incorrect') {
      return { tone: 'error', text: 'Not quite. Try again.' };
    }

    return null;
  }, [status]);

  if (!currentProblem) {
    return (
      <section className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md text-center">
        <p className="text-gray-600">No problems available.</p>
      </section>
    );
  }

  if (isComplete) {
    return (
      <section className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md text-center space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">Quiz complete!</h2>
        <p className="text-gray-600">Great job—you solved every problem.</p>
        <button
          type="button"
          onClick={() => {
            setProblemOrder(shuffleProblems(PROBLEMS));
            setCurrentIndex(0);
            setStatus('idle');
            setIsComplete(false);
            setResetCounter(c => c + 1);
          }}
          className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
        >
          Try Again
        </button>
      </section>
    );
  }

  return (
    <section className="calculator-container p-6 max-w-2xl mx-auto bg-white rounded-lg shadow-md space-y-6">
      <header className="space-y-1">
        <h2 className="text-xl font-semibold text-gray-800">
          Problem {currentIndex + 1} of {totalProblems}
        </h2>
        {!katexReady && (
          <p className="text-sm text-gray-500">Loading math renderer…</p>
        )}
      </header>

      <div className="text-3xl text-center p-4 bg-gray-50 rounded min-h-[60px] flex items-center justify-center">
        <div ref={problemRef} />
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <math-field
          key={resetCounter}
          ref={mathfieldRef}
          style={{display: 'block', width: '100%'}}
          use-virtual-keyboard
          virtual-keyboard-mode="manual"
        ></math-field>

        <button
          type="submit"
          className="inline-flex w-full items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
        >
          Check Answer
        </button>
      </form>

      {feedbackMessage && (
        <p
          className={`text-center text-lg font-medium ${
            feedbackMessage.tone === 'success'
              ? 'text-green-600'
              : 'text-red-600'
          }`}
        >
          {feedbackMessage.text}
        </p>
      )}
    </section>
  );
}


// this is the main app component.
// it sets up the main layout of the application and includes the MathQuiz component.
export default function App() {
  return (
    <main className="min-h-screen bg-gray-100 py-12">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-8 px-4">
        <header className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-gray-900">MathRacer</h1>
        </header>
        <MathQuiz />
      </div>
    </main>
  );
}
