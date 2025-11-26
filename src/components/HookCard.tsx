import { useState } from 'react';
import { getScoreColor, getScoreBgColor } from '../utils/colorMap';
import type { Hook } from '../types/hooks';

interface HookCardProps {
  hook: Hook;
}

const HookCard = ({ hook }: HookCardProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(hook.hook);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  return (
    <div className={`p-6 rounded-xl border transition-all duration-200 hover:shadow-lg hover:scale-105 ` + getScoreBgColor(hook.score) + ` border-white/20 hover:border-white/40`}>
      <div className="flex items-start justify-between gap-3 mb-4">
        <p className="text-white flex-1 leading-relaxed text-lg font-medium">{hook.hook}</p>
        <button
          onClick={handleCopy}
          className="ml-2 px-4 py-2 bg-white/20 hover:bg-white/40 rounded-lg text-sm text-white font-semibold transition-all duration-200 flex-shrink-0"
        >
          {copied ? '✓ Copied!' : '📋 Copy'}
        </button>
      </div>
      <div className="flex items-center justify-between">
        <div className={`text-lg font-bold ` + getScoreColor(hook.score)}>
          Score: {hook.score}/100
        </div>
        <div className="text-xs text-white/60">
          {hook.score >= 71 ? '🔥 Hot' : hook.score >= 41 ? '⭐ Good' : '💡 Decent'}
        </div>
      </div>
    </div>
  );
};

export default HookCard;
