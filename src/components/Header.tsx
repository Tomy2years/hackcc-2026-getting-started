import React from 'react';
import { GitBranch, ExternalLink, Terminal } from 'lucide-react';

interface HeaderProps {
  onOpenGitGuide: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenGitGuide }) => {
  return (
    <header className="border-b border-slate-800 bg-slate-900/70 backdrop-blur sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand & Badge */}
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 font-black text-white text-lg">
            CC
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-white text-base tracking-tight">HackCC Starter</span>
              <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Online
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">Community College Hackathon Ready</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onOpenGitGuide}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 transition-all cursor-pointer"
          >
            <GitBranch className="h-4 w-4" />
            <span>Team Git Rescue</span>
          </button>

          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all"
          >
            <Terminal className="h-4 w-4 text-cyan-400" />
            <span className="hidden sm:inline">Use Template</span>
            <ExternalLink className="h-3.5 w-3.5 text-slate-400" />
          </a>
        </div>

      </div>
    </header>
  );
};
