import React, { useState, useEffect } from 'react';
import { Clock, Flame, Calendar } from 'lucide-react';

interface CountdownTimerProps {
  targetDate?: string; // default "2027-02-14T06:00:00"
  compact?: boolean;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({
  targetDate = '2027-02-14T06:00:00',
  compact = false,
}) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false,
  });

  useEffect(() => {
    const target = new Date(targetDate).getTime();

    const calculate = () => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isExpired: false });
    };

    calculate();
    const interval = setInterval(calculate, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  if (compact) {
    return (
      <div className="inline-flex items-center gap-1.5 font-mono text-xs font-black bg-zinc-950 text-yellow-400 px-3 py-1 rounded-full border border-yellow-400/40 shadow-inner">
        <Clock className="w-3.5 h-3.5 text-yellow-400 animate-pulse" />
        <span>
          {timeLeft.days}d {String(timeLeft.hours).padStart(2, '0')}h : {String(timeLeft.minutes).padStart(2, '0')}m : {String(timeLeft.seconds).padStart(2, '0')}s
        </span>
      </div>
    );
  }

  return (
    <div className="bg-zinc-950 p-4 sm:p-6 rounded-2xl border border-zinc-800 space-y-3 shadow-xl">
      <div className="flex items-center justify-between text-xs font-bold text-zinc-400 border-b border-zinc-800/80 pb-2">
        <span className="flex items-center gap-1.5 text-yellow-400 uppercase tracking-widest font-black">
          <Flame className="w-4 h-4 fill-yellow-400 animate-bounce text-yellow-400" />
          Cuenta Regresiva Evento
        </span>
        <span className="flex items-center gap-1 font-mono text-zinc-300">
          <Calendar className="w-3.5 h-3.5 text-yellow-400" />
          14 de Febrero, 2027
        </span>
      </div>

      <div className="grid grid-cols-4 gap-2 text-center font-mono">
        <div className="bg-zinc-900 border border-zinc-800 p-2 sm:p-3 rounded-xl">
          <span className="block text-xl sm:text-3xl font-black text-yellow-400">
            {timeLeft.days}
          </span>
          <span className="text-[10px] sm:text-xs text-zinc-400 font-sans uppercase font-bold">
            Días
          </span>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 p-2 sm:p-3 rounded-xl">
          <span className="block text-xl sm:text-3xl font-black text-white">
            {String(timeLeft.hours).padStart(2, '0')}
          </span>
          <span className="text-[10px] sm:text-xs text-zinc-400 font-sans uppercase font-bold">
            Horas
          </span>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 p-2 sm:p-3 rounded-xl">
          <span className="block text-xl sm:text-3xl font-black text-white">
            {String(timeLeft.minutes).padStart(2, '0')}
          </span>
          <span className="text-[10px] sm:text-xs text-zinc-400 font-sans uppercase font-bold">
            Min
          </span>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 p-2 sm:p-3 rounded-xl bg-yellow-400/10 border-yellow-400/40">
          <span className="block text-xl sm:text-3xl font-black text-yellow-400">
            {String(timeLeft.seconds).padStart(2, '0')}
          </span>
          <span className="text-[10px] sm:text-xs text-yellow-400 font-sans uppercase font-bold">
            Seg
          </span>
        </div>
      </div>
    </div>
  );
};
