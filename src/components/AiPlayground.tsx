import React, { useState } from 'react';
import { Sparkles, Send, Loader2, CheckCircle2 } from 'lucide-react';
import { generateIdeaOrPitch } from '../services/api';
import type { AiPromptResponse } from '../services/api';

export const AiPlayground: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AiPromptResponse | null>(null);

  const QUICK_PROMPTS = [
    'AI tool for Community College course registration',
    'Food waste reduction on campus',
    'Study group finder for calculus & CS',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || loading) return;

    setLoading(true);
    try {
      const res = await generateIdeaOrPitch({
        prompt,
        systemContext: 'You are an energetic HackCC hackathon brainstorming assistant helping college students build MVPs.',
      });
      setResult(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800/80 border border-slate-700/60 p-6 shadow-xl relative">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-bold text-white text-base">Interactive AI Feature Sandbox</h3>
            <p className="text-xs text-slate-400">Pre-wired React component ready for your team to build on</p>
          </div>
        </div>
        
        {result?.isMock ? (
          <span className="text-xs px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20 font-medium">
            Mock Mode (No Key Needed)
          </span>
        ) : result ? (
          <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-medium">
            Live AI Connected ({result.latencyMs}ms)
          </span>
        ) : null}
      </div>

      {/* Quick Prompts */}
      <div className="flex flex-wrap gap-2 mb-3">
        <span className="text-xs text-slate-500 self-center font-medium">Quick ideas:</span>
        {QUICK_PROMPTS.map((qp, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setPrompt(qp)}
            className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-2.5 py-1 rounded-lg border border-slate-700 transition-colors cursor-pointer"
          >
            {qp}
          </button>
        ))}
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe an app idea, problem, or feature..."
          className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
        />
        <button
          type="submit"
          disabled={loading || !prompt.trim()}
          className="px-4 py-2.5 bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-slate-950 font-semibold rounded-xl text-sm flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-cyan-500/20"
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
          <span>Generate</span>
        </button>
      </form>

      {/* Output Display */}
      {result && (
        <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 text-sm text-slate-300 relative space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 border-b border-slate-800/80 pb-2">
            <span className="font-mono text-cyan-400">Response output:</span>
            <span>Latency: {result.latencyMs}ms</span>
          </div>
          <div className="whitespace-pre-line text-xs sm:text-sm leading-relaxed text-slate-200">
            {result.content}
          </div>
        </div>
      )}

      <p className="text-xs text-slate-500 mt-3 flex items-center gap-1.5">
        <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
        <span>Check <code>src/services/api.ts</code> to customize prompts or plug in your own endpoints & database.</span>
      </p>
    </div>
  );
};
