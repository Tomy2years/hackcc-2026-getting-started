import React, { useState } from 'react';
import { X, Copy, Check, GitBranch, AlertTriangle, ShieldCheck } from 'lucide-react';
import type { GitHelpItem } from '../types';

interface GitGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GIT_SCENARIOS: GitHelpItem[] = [
  {
    id: 'start-feature',
    title: '1. Start a New Feature (Never code on main!)',
    scenario: 'You are about to build a new component or page with your team.',
    commands: [
      'git checkout main',
      'git pull origin main',
      'git checkout -b feature/my-feature-name'
    ],
    explanation: 'Always branch off the latest main. Name branches clearly (e.g., feature/login-page, fix/navbar-bug).',
  },
  {
    id: 'sync-changes',
    title: '2. Teammate Pushed Code (Safe Sync)',
    scenario: 'Your teammate just merged a PR into main, and you need their updates without losing your work.',
    commands: [
      'git stash',
      'git pull origin main',
      'git stash pop'
    ],
    explanation: 'Stashing safely tucks your uncommitted edits away, downloads fresh code from GitHub, and reapplies your changes.',
  },
  {
    id: 'push-pr',
    title: '3. Push Your Work & Create a Pull Request',
    scenario: 'Your feature works locally and you want your teammates to merge it.',
    commands: [
      'npm run check:secrets',
      'git add .',
      'git commit -m "feat: add user dashboard UI"',
      'git push -u origin feature/my-feature-name'
    ],
    explanation: 'Run check:secrets first to protect your team from leaked API keys! Then push and click the PR link in your terminal.',
  },
  {
    id: 'secret-rescue',
    title: '4. Panic: Accidentally Staged or Committed .env / API Key',
    scenario: 'You accidentally staged or committed your private .env file before pushing.',
    commands: [
      'git rm --cached .env',
      'git commit -m "fix: untrack .env file from git"',
      'npm run check:secrets'
    ],
    explanation: 'Removes the file from git tracking while keeping the local file on your computer intact. Remember to add it to .gitignore!',
    caution: 'If you already pushed an API key to a public GitHub repo, revoke and rotate that API key immediately in your provider dashboard.'
  },
  {
    id: 'conflict-rescue',
    title: '5. Merge Conflict Emergency Exit',
    scenario: 'Git says "CONFLICT" and you are not ready to merge right now.',
    commands: [
      'git merge --abort',
      '# OR if in a rebase:',
      'git rebase --abort'
    ],
    explanation: 'Safely resets your git state back to before the attempted merge, so nothing is destroyed.',
  }
];

export const GitGuideModal: React.FC<GitGuideModalProps> = ({ isOpen, onClose }) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl relative my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400">
              <GitBranch className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">HackCC Team Git Emergency Guide</h2>
              <p className="text-xs text-slate-400">Tested workflows to prevent merge conflicts and leaked keys</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-5">
          
          <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-start gap-3 text-emerald-300 text-xs">
            <ShieldCheck className="h-5 w-5 shrink-0 text-emerald-400 mt-0.5" />
            <div>
              <span className="font-semibold block mb-0.5">Golden Rule of Online Hackathons:</span>
              Never push directly to the <code className="bg-emerald-950/60 px-1 py-0.5 rounded font-mono">main</code> branch! Every teammate works on their own branch and opens a Pull Request on GitHub.
            </div>
          </div>

          <div className="space-y-4">
            {GIT_SCENARIOS.map((item) => (
              <div key={item.id} className="border border-slate-800 rounded-xl bg-slate-950/60 p-4">
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <h3 className="font-semibold text-slate-200 text-sm">{item.title}</h3>
                  <button
                    onClick={() => handleCopy(item.id, item.commands.join('\n'))}
                    className="flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 px-2 py-1 rounded bg-slate-800/80 hover:bg-slate-800 transition-colors"
                  >
                    {copiedId === item.id ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-400" />
                        <span className="text-emerald-400 font-mono">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>Copy Commands</span>
                      </>
                    )}
                  </button>
                </div>

                <p className="text-xs text-slate-400 mb-2.5">{item.scenario}</p>

                {/* Code block */}
                <div className="bg-slate-900 rounded-lg p-3 font-mono text-xs text-cyan-300 border border-slate-800/80 overflow-x-auto space-y-1">
                  {item.commands.map((cmd, i) => (
                    <div key={i} className={cmd.startsWith('#') ? 'text-slate-500 italic' : ''}>
                      {cmd}
                    </div>
                  ))}
                </div>

                <p className="text-xs text-slate-400 mt-2.5">{item.explanation}</p>

                {item.caution && (
                  <div className="mt-2 text-xs text-rose-400/90 flex items-start gap-1.5 bg-rose-500/10 p-2 rounded-lg border border-rose-500/20">
                    <AlertTriangle className="h-4 w-4 shrink-0 text-rose-400" />
                    <span>{item.caution}</span>
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs sm:text-sm font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-white transition-colors"
          >
            Close Guide
          </button>
        </div>

      </div>
    </div>
  );
};
