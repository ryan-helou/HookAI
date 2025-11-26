import { useState } from 'react';
import { getScoreColor, getScoreBgColor, getScoreBorderColor } from '../utils/colorMap';
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

  const getScoreBadge = (score: number) => {
    if (score >= 80) return { label: '🔥 Viral', color: 'bg-emerald-100 text-emerald-700', icon: '⭐' };
    if (score >= 60) return { label: '⚡ Hot', color: 'bg-amber-100 text-amber-700', icon: '💪' };
    if (score >= 40) return { label: '⭐ Good', color: 'bg-orange-100 text-orange-700', icon: '👍' };
    return { label: '💡 Decent', color: 'bg-rose-100 text-rose-700', icon: '📌' };
  };

  const badge = getScoreBadge(hook.score);
  const scoreColor = getScoreColor(hook.score);
  const bgColor = getScoreBgColor(hook.score);
  const borderColor = getScoreBorderColor(hook.score);

  return (
    <div className={`${bgColor} rounded-xl p-4 border-2 ${borderColor} hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}>
      {/* Score and badge header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1 min-w-0">
          <div className={`text-3xl font-black ${scoreColor}`}>
            {hook.score}
          </div>
          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold ${badge.color} mt-1`}>
            {badge.icon} {badge.label}
          </span>
        </div>
      </div>

      {/* Hook text */}
      <p className="text-gray-900 leading-snug text-sm font-semibold mb-3 line-clamp-2">
        "{hook.hook}"
      </p>

      {/* Copy button */}
      <button
        onClick={handleCopy}
        className={`w-full px-3 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-xs font-bold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg ${
          copied ? 'ring-2 ring-emerald-400' : ''
        }`}
      >
        {copied ? '✓ Copied!' : '📋 Copy'}
      </button>
    </div>
  );
};

export default HookCard;
