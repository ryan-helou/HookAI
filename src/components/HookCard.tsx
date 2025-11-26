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
    <div className={`p-4 rounded-lg ` + getScoreBgColor(hook.score) + ` border border-white/20 hover:border-white/40 transition`}>
      <div className="flex items-start justify-between mb-3">
        <p className="text-white flex-1 leading-relaxed">{hook.hook}</p>
        <button
          onClick={handleCopy}
          className="ml-2 px-3 py-1 bg-white/20 hover:bg-white/30 rounded text-sm text-white transition flex-shrink-0"
        >
          {copied ? '✓' : 'Copy'}
        </button>
      </div>
      <div className={`text-sm font-bold ` + getScoreColor(hook.score)}>
        Score: {hook.score}
      </div>
    </div>
  );
};

export default HookCard;
