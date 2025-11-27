import { useState } from 'react';
import type { Hook } from '../types/hooks';

interface HookCardProps {
  hook: Hook;
}

const HookCard = ({ hook }: HookCardProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      // Copy plain text version (without markdown) for templates, or regular hook text
      const textToCopy = hook.hookPlain || hook.hook;
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  // Parse markdown to display bold text
  const renderHookText = () => {
    const text = hook.hook;
    // Replace **text** with <strong> tags and keep other text as-is
    const parts = text.split(/\*\*([^*]+)\*\*/g);
    return parts.map((part, i) =>
      i % 2 === 1 ? <strong key={i} className="font-bold">{part}</strong> : part
    );
  };

  const getScoreBadge = (score: number) => {
    if (score >= 80) return { label: 'Viral', color: 'bg-emerald-50 text-emerald-700', icon: '⭐' };
    if (score >= 60) return { label: '⚡ Hot', color: 'bg-amber-50 text-amber-700', icon: '💪' };
    if (score >= 40) return { label: '⭐ Good', color: 'bg-orange-50 text-orange-700', icon: '👍' };
    return { label: '💡 Decent', color: 'bg-rose-50 text-rose-700', icon: '📌' };
  };

  const badge = getScoreBadge(hook.score);

  return (
    <div className="bg-white/50 backdrop-blur-md rounded-xl p-3 sm:p-4 border border-white/20 ring-1 ring-white/10 hover:bg-white/80 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      {/* Score and badge header */}
      <div className="flex items-start justify-between gap-2 sm:gap-3 mb-2 sm:mb-3">
        <div className="flex-1 min-w-0">
          <div className="text-2xl sm:text-3xl font-black text-gray-900">
            {hook.score}
          </div>
          <div className="flex flex-wrap items-center gap-1 sm:gap-2 mt-1">
            <span className={`inline-flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2 py-0.5 rounded-full text-xs font-bold ${badge.color}`}>
              {badge.icon} <span className="hidden sm:inline">{badge.label}</span>
            </span>
            {hook.isTemplate && (
              <span className="inline-flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-700">
                <span className="hidden sm:inline">Template</span><span className="sm:hidden">📌</span>
              </span>
            )}
            {!hook.isTemplate && (
              <span className="inline-flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2 py-0.5 rounded-full text-xs font-bold bg-purple-100 text-purple-700">
                <span className="hidden sm:inline">✨ Original</span><span className="sm:hidden">✨</span>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Hook text */}
      <p className="text-gray-900 leading-snug text-xs sm:text-sm font-semibold mb-2 sm:mb-3">
        "{renderHookText()}"
      </p>

      {/* Copy button */}
      <button
        onClick={handleCopy}
        className={`w-full px-2 sm:px-3 py-1.5 sm:py-2 bg-black/90 backdrop-blur-md hover:bg-gray-800 text-white text-xs font-bold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg ${
          copied ? 'ring-2 ring-emerald-400' : ''
        }`}
      >
        {copied ? '✓ Copied!' : '📋 Copy'}
      </button>
    </div>
  );
};

export default HookCard;
