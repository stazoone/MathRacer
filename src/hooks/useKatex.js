// this file holds the purpose of rendering katex when called

import { useCallback, useEffect, useState } from 'react';

const SCRIPT_ID = 'katex-js';
const SCRIPT_URL =
  'https://cdn.jsdelivr.net/npm/katex@0.16.10/dist/katex.min.js';

// ensures the KaTeX script is present on the page and resolves when it has loaded.
function ensureKatexScript() {
  // error that appears if app is launched not in a browser
  if (typeof window === 'undefined') {
    return Promise.reject(new Error('KaTeX requires a browser environment.'));
  }


  const existingScript = document.getElementById(SCRIPT_ID);

  if (existingScript) {
    return new Promise((resolve, reject) => {
      if (window.katex) {
        resolve(window.katex);
        return;
      }

      existingScript.addEventListener('load', () => resolve(window.katex));
      existingScript.addEventListener('error', (event) =>
        reject(new Error(`Failed to load KaTeX: ${event.message || 'unknown'}`)),
      );
    });
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.id = SCRIPT_ID;
    script.src = SCRIPT_URL;
    script.async = true;

    script.addEventListener('load', () => {
      if (window.katex) {
        resolve(window.katex);
      } else {
        reject(new Error('KaTeX script loaded but window.katex is undefined.'));
      }
    });

    script.addEventListener('error', () =>
      reject(new Error('Failed to load the KaTeX script.')),
    );

    document.body.appendChild(script);
  });
}

// hook to load katex once and expose a renderer helper.

export default function useKatex() {
  const [katexReady, setKatexReady] = useState(
    typeof window !== 'undefined' && Boolean(window.katex),
  );

  useEffect(() => {
    if (katexReady) {
      return;
    }

    let isMounted = true;

    ensureKatexScript()
      .then(() => {
        if (isMounted) {
          setKatexReady(true);
        }
      })
      .catch((error) => {
        console.error(error);
      });

    return () => {
      isMounted = false;
    };
  }, [katexReady]);

  const renderKatex = useCallback(
    (element, expression, options = {}) => {
      if (!element) {
        return;
      }

      if (!expression) {
        element.textContent = '';
        return;
      }

      if (!katexReady || !window.katex) {
        element.textContent = expression;
        return;
      }

      try {
        window.katex.render(expression, element, {
          throwOnError: false,
          ...options,
        });
      } catch (error) {
        console.error('KaTeX render error:', error);
        element.textContent = expression;
      }
    },
    [katexReady],
  );

  return {
    katexReady,
    renderKatex,
  };
}
