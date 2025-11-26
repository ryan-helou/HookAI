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
    <div className={`${bgColor} rounded-2xl p-6 border-2 ${borderColor} hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}>
      {/* Score and badge header */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex-1">
          <div className={`text-4xl font-black ${scoreColor} mb-2`}>
            {hook.score}
          </div>
          <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${badge.color}`}>
            {badge.icon} {badge.label}
          </span>
        </div>
      </div>

      {/* Hook text */}
      <p className="text-gray-900 leading-relaxed text-base font-semibold mb-6">
        "{hook.hook}"
      </p>

      {/* Copy button */}
      <button
        onClick={handleCopy}
        className={`w-full px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-sm font-bold rounded-xl transition-all duration-200 shadow-md hover:shadow-lg ${
          copied ? 'ring-2 ring-emerald-400' : ''
        }`}
      >
        {copied ? '✓ Copied to clipboard!' : '📋 Copy Hook'}
      </button>
    </div>
  );
};

export default HookCard;
