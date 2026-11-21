import React, { useState, useEffect } from 'react';
import { Clock, AlertCircle } from 'lucide-react';

interface CountdownTimerProps {
  targetDateString?: string;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDateString }) => {
  const [timeLeft, setTimeLeft] = useState<{
    hours: number;
    minutes: number;
    seconds: number;
    isPast: boolean;
  }>({ hours: 24, minutes: 0, seconds: 0, isPast: false });

  useEffect(() => {
    // If target date provided, use it; otherwise default to 24 hours from session start
    const target = targetDateString
      ? new Date(targetDateString).getTime()
      : Date.now() + 24 * 60 * 60 * 1000;

    const interval = setInterval(() => {
      const now = Date.now();
      const diff = target - now;

      if (diff <= 0) {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0, isPast: true });
        clearInterval(interval);
      } else {
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setTimeLeft({ hours, minutes, seconds, isPast: false });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDateString]);

  const pad = (n: number) => n.toString().padStart(2, '0');

  return (
    <div className="rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800/80 border border-slate-700/60 p-5 shadow-xl relative overflow-hidden">
      <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none"></div>

      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-cyan-400" />
          <h3 className="font-semibold text-slate-200 text-sm tracking-wide uppercase">Submission Deadline</h3>
        </div>
        <span className="text-xs px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 font-mono">
          Devpost Countdown
        </span>
      </div>

      {timeLeft.isPast ? (
        <div className="flex items-center gap-2 text-rose-400 font-medium py-2">
          <AlertCircle className="h-5 w-5" />
          <span>Hackathon submissions are officially closed! Good luck to all teams.</span>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-3 text-center my-1">
          <div className="bg-slate-950/60 rounded-xl p-3 border border-slate-800">
            <div className="text-2xl sm:text-3xl font-black font-mono text-cyan-400">{pad(timeLeft.hours)}</div>
            <div className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold mt-1">Hours</div>
          </div>
          <div className="bg-slate-950/60 rounded-xl p-3 border border-slate-800">
            <div className="text-2xl sm:text-3xl font-black font-mono text-cyan-300">{pad(timeLeft.minutes)}</div>
            <div className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold mt-1">Minutes</div>
          </div>
          <div className="bg-slate-950/60 rounded-xl p-3 border border-slate-800">
            <div className="text-2xl sm:text-3xl font-black font-mono text-indigo-400">{pad(timeLeft.seconds)}</div>
            <div className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold mt-1">Seconds</div>
          </div>
        </div>
      )}

      <p className="text-xs text-slate-400 mt-3 flex items-center gap-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-amber-400"></span>
        <span>Tip: Record your demo video <strong>at least 2 hours before</strong> the buzzer!</span>
      </p>
    </div>
  );
};
