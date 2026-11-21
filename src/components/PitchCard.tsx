import React, { useState } from 'react';
import { Check, Copy, Rocket } from 'lucide-react';

export const PitchCard: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [category, setCategory] = useState('AI/ML');
  const [projectName, setProjectName] = useState('My Awesome Project');
  const [problem, setProblem] = useState('Community college students struggle with finding peer mentors across different campuses.');
  const [solution, setSolution] = useState('An intelligent matching platform with automated study scheduling and real-time collaboration.');

  const handleCopyPitch = () => {
    const text = `## 🏆 Project: ${projectName}
**Category:** ${category}

### 💡 Inspiration & Problem
${problem}

### 🚀 What it does & Solution
${solution}

### 🛠️ Built With
- React 19 + TypeScript + Vite
- Tailwind CSS
- Pre-configured HackCC CI & Secret Guard
- Deployed via Vercel / Netlify

### 🧠 What We Learned
Overcoming merge conflicts with team Git workflows and building a cohesive full-stack MVP in 24 hours.`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800/80 border border-slate-700/60 p-6 shadow-xl relative">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <Rocket className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-bold text-white text-base">Project Pitch & Devpost Builder</h3>
            <p className="text-xs text-slate-400">Prepare your submission text early to avoid the last-minute scramble</p>
          </div>
        </div>

        <button
          onClick={handleCopyPitch}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-all cursor-pointer shadow-lg shadow-indigo-600/20"
        >
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          <span>{copied ? 'Copied Pitch!' : 'Copy Devpost Template'}</span>
        </button>
      </div>

      <div className="space-y-3 text-xs">
        <div>
          <label className="block text-slate-400 font-semibold mb-1 uppercase tracking-wider text-[10px]">
            Target HackCC Category
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {['Overall Innovation', 'AI/ML', 'Social Good', 'Game Dev / Creative'].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className={`py-1.5 px-2.5 rounded-lg border text-center transition-all cursor-pointer font-medium ${
                  category === cat
                    ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <div>
            <label className="block text-slate-400 font-semibold mb-1 uppercase tracking-wider text-[10px]">
              Project Name
            </label>
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500 text-xs"
            />
          </div>
          <div>
            <label className="block text-slate-400 font-semibold mb-1 uppercase tracking-wider text-[10px]">
              The Problem (1-2 sentences)
            </label>
            <input
              type="text"
              value={problem}
              onChange={(e) => setProblem(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500 text-xs"
            />
          </div>
        </div>

        <div>
          <label className="block text-slate-400 font-semibold mb-1 uppercase tracking-wider text-[10px]">
            The Solution / What Your App Does
          </label>
          <input
            type="text"
            value={solution}
            onChange={(e) => setSolution(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500 text-xs"
          />
        </div>
      </div>
    </div>
  );
};
