// src/hooks/useKatex.js
import { useEffect, useState } from 'react';
import katex from 'katex';

// this custom hook provides a way to render mathematical expressions using the KaTeX library.
const useKatex = () => {
  const [katexReady, setKatexReady] = useState(false);

  useEffect(() => {
    // no specific initialization needed for katex,
    // but we can use this to indicate that the hook is ready.
    setKatexReady(true);
  }, []);

  // this function takes an HTML element, a string of text containing a mathematical expression, and a set of options,
  // and then uses KaTeX to render the expression within that element.
  const renderKatex = (element, text, options) => {
    if (element) {
      katex.render(text, element, options);
    }
  };

  return { renderKatex, katexReady };
};

export default useKatex;