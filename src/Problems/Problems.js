/*
this file contains several lists containing sets of problems and their solutions.
these problems will be displayed using the KaTeX library: https://katex.org/docs/supported .
temporarily these will all be in one list for testing.
*/

// this array holds the list of problems and their answers. 
// each object in the array represents a single problem, with the 'problem' key holding the KaTeX formatted string for the question,
// and the 'answer' key holding the KaTeX formatted string for the solution.
export const PROBLEMS = [
    {problem: '2+2', answer: '4'},
    {problem: '\\sqrt{64}', answer: '8'}, 
    {problem: '\\frac{6}{3}', answer:'2'},
    {problem: '\\det\\begin{vmatrix} 5 & 2 \\\\ 4 & 7 \\end{vmatrix}', answer:'27'},
    {problem: '4 \\times 5', answer: '20'},
    {problem: '\\frac{d}{dx}(x^4)', answer: '4x^3'},
    {problem: '\\frac{d}{dx}(\\cos x)', answer: '-\\sin x'},
    {problem: '\\frac{d}{dx}(e^x)', answer: 'e^x'},
    {problem: '\\frac{d}{dx}(\\ln x)', answer: '\\frac{1}{x}'},
    {problem: '\\frac{d}{dx}(5x^2 + 3x - 7)', answer: '10x + 3'},
    {problem: '\\frac{d}{dx}(\\sqrt{x})', answer: '\\frac{1}{2\\sqrt{x}}'},
    {problem: '\\int 2x dx', answer: 'x^2 + C'},
    {problem: '\\int \\cos x dx', answer: '\\sin x + C'},
    {problem: '\\int e^x dx', answer: 'e^x+C'},
    {problem: '\\int \\frac{1}{x} dx', answer: '\\ln\\left|x\\right| + C'},
    {problem: '\\int_{0}^{1} x^3 dx', answer: '\\frac{1}{4}'},
    {problem: '\\int_{0}^{\\pi} \\sin x dx', answer: '2'},
    {problem: '\\det\\begin{vmatrix} 1 & 2 \\\\ 3 & 4 \\end{vmatrix}', answer: '-2'},
    {problem: '\\begin{pmatrix} 1 & 0 \\\\ 0 & 1 \\end{pmatrix} \\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}', answer: '\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}'},
    {problem: '\\sin(\\frac{\\pi}{2})', answer: '1'},
    {problem: '\\cos(0)', answer: '1'},
    {problem: '\\tan(\\frac{\\pi}{4})', answer: '1'},
    {problem: '\\sin^2(x) + \\cos^2(x)', answer: '1'},
    {problem: '\\lim_{x \\to 0} \\frac{\\sin x}{x}', answer: '1'},
    {problem: '\\lim_{x \\to \\infty} \\frac{1}{x}', answer: '0'},
    {problem: '\\sum_{n=0}^{\\infty} \\frac{1}{2^n}', answer: '2'},
    {problem: 'i^2', answer: '-1'},
    {problem: '(1+i)(1-i)', answer: '2'},
    {problem: '\\log_b(b^x)', answer: 'x'},
    {problem: '\\binom{4}{2}', answer: '6'},
    {problem: '3!', answer: '6'},
]
