import { useState } from 'react';
import { getScoreColor } from '../utils/colorMap';
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
    if (score >= 80) return { label: '🔥 Viral', color: 'bg-pink-100 text-pink-700' };
    if (score >= 70) return { label: '⚡ Hot', color: 'bg-orange-100 text-orange-700' };
    if (score >= 50) return { label: '⭐ Good', color: 'bg-blue-100 text-blue-700' };
    return { label: '💡 Decent', color: 'bg-gray-100 text-gray-700' };
  };

  const badge = getScoreBadge(hook.score);
  const scoreColor = getScoreColor(hook.score);

  return (
    <div className="bg-white rounded-xl p-5 border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200">
      {/* Header with score */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <p className="text-gray-900 leading-relaxed text-base flex-1">
          "{hook.hook}"
        </p>
        <div className="flex-shrink-0 text-right">
          <div className={`text-2xl font-bold ${scoreColor}`}>
            {hook.score}
          </div>
        </div>
      </div>

      {/* Badge and copy button */}
      <div className="flex items-center justify-between gap-2">
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${badge.color}`}>
          {badge.label}
        </span>
        <button
          onClick={handleCopy}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-all duration-200"
        >
          {copied ? '✓ Copied!' : '📋 Copy'}
        </button>
      </div>
    </div>
  );
};

export default HookCard;
