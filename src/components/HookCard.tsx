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
    if (score >= 80) return { label: '🔥 Viral', color: 'text-pink-400' };
    if (score >= 70) return { label: '⚡ Hot', color: 'text-orange-400' };
    if (score >= 50) return { label: '⭐ Good', color: 'text-blue-400' };
    return { label: '💡 Decent', color: 'text-gray-400' };
  };

  const badge = getScoreBadge(hook.score);

  return (
    <div className="group relative overflow-hidden rounded-lg transition-all duration-300 hover:scale-105">
      {/* Gradient border */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/0 via-purple-600/20 to-blue-600/0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      {/* Card background */}
      <div className="relative bg-gray-900/40 backdrop-blur-md border border-gray-700/30 rounded-lg p-5 transition-all duration-300 hover:bg-gray-900/60 hover:border-gray-600/50">
        {/* Score indicator - top right */}
        <div className="absolute top-4 right-4 flex flex-col items-end gap-1">
          <div className={`text-2xl font-bold ${getScoreColor(hook.score)}`}>
            {hook.score}
          </div>
          <div className={`text-xs font-semibold ${badge.color}`}>
            {badge.label}
          </div>
        </div>

        {/* Hook text */}
        <p className="text-white leading-relaxed text-base pr-24 mb-4">
          "{hook.hook}"
        </p>

        {/* Copy button */}
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600/40 to-blue-600/40 hover:from-purple-600/60 hover:to-blue-600/60 border border-purple-500/30 rounded-lg text-sm text-white font-semibold transition-all duration-200"
        >
          {copied ? (
            <>
              <span>✓</span>
              <span>Copied!</span>
            </>
          ) : (
            <>
              <span>📋</span>
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default HookCard;
