import { useState } from 'react';
import { 
  GitBranch, 
  ShieldCheck, 
  CheckCircle, 
  Flame, 
  ExternalLink 
} from 'lucide-react';
import { Header } from './components/Header';
import { CountdownTimer } from './components/CountdownTimer';
import { GitGuideModal } from './components/GitGuideModal';
import { AiPlayground } from './components/AiPlayground';
import { PitchCard } from './components/PitchCard';

export function App() {
  const [gitGuideOpen, setGitGuideOpen] = useState(false);
  const [checklist, setChecklist] = useState<{ id: string; label: string; done: boolean }[]>([
    { id: 'fork', label: 'One teammate creates repo from template & invites team', done: true },
    { id: 'codespace', label: 'Verify everyone has code running (local or Codespaces)', done: true },
    { id: 'branch', label: 'Every teammate creates their own feature branch', done: false },
    { id: 'deploy', label: 'Deploy main to Vercel / Netlify for continuous delivery', done: false },
    { id: 'secrets', label: 'Keep all private API keys in .env (never commit them!)', done: true },
    { id: 'demo', label: 'Record a 2-3 minute demo video before deadline', done: false },
    { id: 'devpost', label: 'Submit project repo, demo video, and pitch to Devpost', done: false },
  ]);

  const toggleCheck = (id: string) => {
    setChecklist(prev => prev.map(item => item.id === id ? { ...item, done: !item.done } : item));
  };

  const completedCount = checklist.filter(c => c.done).length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-slate-950">
      {/* Navigation Header */}
      <Header onOpenGitGuide={() => setGitGuideOpen(true)} />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8">
        
        {/* Hero Section */}
        <div className="relative rounded-3xl bg-gradient-to-r from-cyan-950/60 via-slate-900 to-indigo-950/60 border border-slate-800 p-6 sm:p-10 shadow-2xl overflow-hidden">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
              <Flame className="h-3.5 w-3.5 text-cyan-400" />
              <span>Official HackCC Starter Template</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Build fast. Ship your MVP. <br />
              <span className="bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
                Zero Git nightmares.
              </span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Designed specifically for California Community College hackathons. Pre-configured with 
              React 19, TypeScript, Tailwind CSS, automatic secret-leak prevention, and beginner-friendly team Git workflows.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => setGitGuideOpen(true)}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-cyan-500/25 transition-all cursor-pointer"
              >
                <GitBranch className="h-4 w-4" />
                <span>Open Team Git Guide</span>
              </button>

              <a
                href="#checklist"
                className="px-4 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 font-semibold text-xs sm:text-sm border border-slate-700 flex items-center gap-2 transition-all"
              >
                <CheckCircle className="h-4 w-4 text-emerald-400" />
                <span>View Hackathon Checklist</span>
              </a>
            </div>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left 2 Columns: Interactive Features & Pitch */}
          <div className="lg:col-span-2 space-y-6">
            <CountdownTimer />
            <AiPlayground />
            <PitchCard />
          </div>

          {/* Right Column: Hackathon Survival Checklist & Tools */}
          <div className="space-y-6" id="checklist">
            
            {/* Checklist Card */}
            <div className="rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800/80 border border-slate-700/60 p-5 shadow-xl">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-emerald-400" />
                  <h3 className="font-bold text-white text-sm">Submission Roadmap</h3>
                </div>
                <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-slate-800 text-cyan-300">
                  {completedCount} / {checklist.length}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-950 rounded-full h-2 mb-4 overflow-hidden border border-slate-800">
                <div 
                  className="bg-gradient-to-r from-cyan-500 to-emerald-400 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(completedCount / checklist.length) * 100}%` }}
                ></div>
              </div>

              <div className="space-y-2.5">
                {checklist.map(item => (
                  <div
                    key={item.id}
                    onClick={() => toggleCheck(item.id)}
                    className={`flex items-start gap-2.5 p-2.5 rounded-xl text-xs cursor-pointer border transition-all ${
                      item.done
                        ? 'bg-slate-950/40 border-slate-800/60 text-slate-400'
                        : 'bg-slate-950/90 border-slate-700 text-slate-200 hover:border-slate-600'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={item.done}
                      onChange={() => {}}
                      className="mt-0.5 rounded border-slate-700 text-cyan-500 focus:ring-0 cursor-pointer"
                    />
                    <span className={item.done ? 'line-through text-slate-500' : ''}>
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Git & Safety Card */}
            <div className="rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800/80 border border-slate-700/60 p-5 shadow-xl space-y-3">
              <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
                <ShieldCheck className="h-5 w-5 text-indigo-400" />
                <span>Built-in Git Safeguards</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                This template has an integrated secret scanner. Before every push, simply run:
              </p>
              <div className="bg-slate-950 rounded-lg p-2.5 font-mono text-xs text-cyan-300 border border-slate-800">
                npm run check:secrets
              </div>
              <p className="text-[11px] text-slate-500">
                It checks for OpenAI keys, AWS tokens, and accidental commits of private .env files.
              </p>
            </div>

            {/* Quick Links Card */}
            <div className="rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800/80 border border-slate-700/60 p-5 shadow-xl space-y-3">
              <h3 className="font-bold text-white text-sm">Quick Developer Resources</h3>
              <div className="space-y-2 text-xs">
                <a
                  href="https://vercel.com/new"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-2 rounded-lg bg-slate-950/60 hover:bg-slate-950 text-slate-300 border border-slate-800 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-cyan-400"></span>
                    <span>1-Click Deploy on Vercel</span>
                  </span>
                  <ExternalLink className="h-3.5 w-3.5 text-slate-500" />
                </a>

                <a
                  href="https://tailwindcss.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-2 rounded-lg bg-slate-950/60 hover:bg-slate-950 text-slate-300 border border-slate-800 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-blue-400"></span>
                    <span>Tailwind CSS Cheat Sheet</span>
                  </span>
                  <ExternalLink className="h-3.5 w-3.5 text-slate-500" />
                </a>

                <a
                  href="https://lucide.dev/icons"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-2 rounded-lg bg-slate-950/60 hover:bg-slate-950 text-slate-300 border border-slate-800 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
                    <span>Lucide Icons Directory</span>
                  </span>
                  <ExternalLink className="h-3.5 w-3.5 text-slate-500" />
                </a>
              </div>
            </div>

          </div>

        </div>

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-6 text-center text-xs text-slate-500">
        <p>Built with ❤️ for California Community College students participating in HackCC.</p>
        <p className="mt-1">Empowering the next generation of builders, thinkers, and innovators.</p>
      </footer>

      {/* Git Guide Modal */}
      <GitGuideModal
        isOpen={gitGuideOpen}
        onClose={() => setGitGuideOpen(false)}
      />
    </div>
  );
}
export default App;
