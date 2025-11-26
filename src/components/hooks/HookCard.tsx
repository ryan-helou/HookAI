import React, { useState } from 'react';
import { Hook } from '../../types/hooks';
import { getScoreColor, getScoreLabel } from '../../utils/colorMap';
import { hooksService } from '../../services/hooksService';

interface HookCardProps {
  hook: Hook;
  onCopy?: () => void;
}

export const HookCard: React.FC<HookCardProps> = ({ hook, onCopy }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await hooksService.copyToClipboard(hook.text);
    setCopied(true);
    onCopy?.();
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-lg transition-shadow">
      {/* Header with Rank and Score */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="inline-block w-8 h-8 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center font-bold text-sm">
            #{hook.rank}
          </span>
          <span className="text-xs font-semibold text-gray-600 uppercase">{hook.tone}</span>
        </div>

        <div className="flex items-center gap-2">
          <div className={`w-12 h-12 rounded-lg ${getScoreColor(hook.score)} flex items-center justify-center`}>
            <span className="text-white font-bold text-lg">{hook.score}</span>
          </div>
          <span className="text-xs font-semibold text-gray-600">{getScoreLabel(hook.score)}</span>
        </div>
      </div>

      {/* Hook Text */}
      <p className="text-base text-gray-800 mb-4 leading-relaxed">"{hook.text}"</p>

      {/* Copy Button */}
      <button
        onClick={handleCopy}
        className={`w-full py-2 rounded-lg font-semibold transition-colors ${
          copied
            ? 'bg-green-100 text-green-700'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        {copied ? '✓ Copied!' : 'Copy to Clipboard'}
      </button>
    </div>
  );
};
