import React from 'react';
import { Hook } from '../../types/hooks';
import { HookCard } from './HookCard';

interface HooksDisplayProps {
  hooks: Hook[];
  isLoading?: boolean;
  onRegenerateClick?: () => void;
}

export const HooksDisplay: React.FC<HooksDisplayProps> = ({ hooks, isLoading, onRegenerateClick }) => {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="bg-gray-200 rounded-lg h-32 animate-pulse" />
        ))}
      </div>
    );
  }

  if (hooks.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p className="text-lg">No hooks generated yet</p>
        <p className="text-sm">Enter a video topic to generate your first set of hooks</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">Top {hooks.length} Hooks</h2>
        {onRegenerateClick && (
          <button
            onClick={onRegenerateClick}
            className="px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg hover:shadow-lg transition-shadow"
          >
            🔄 Regenerate
          </button>
        )}
      </div>

      <div className="grid gap-4">
        {hooks.map((hook) => (
          <HookCard key={hook.id || `${hook.rank}`} hook={hook} />
        ))}
      </div>
    </div>
  );
};
