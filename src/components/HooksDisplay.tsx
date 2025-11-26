import HookCard from './HookCard';
import type { Hook } from '../types/hooks';

interface HooksDisplayProps {
  hooks: Hook[];
  isLoading: boolean;
  onRegenerate: () => Promise<void>;
}

const HooksDisplay = ({ hooks, isLoading, onRegenerate }: HooksDisplayProps) => {
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-lg p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Generated Hooks</h2>
        {hooks.length > 0 && (
          <button
            onClick={onRegenerate}
            disabled={isLoading}
            className="px-4 py-2 bg-white/20 hover:bg-white/30 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg transition text-sm font-medium"
          >
            {isLoading ? 'Regenerating...' : 'Regenerate'}
          </button>
        )}
      </div>

      {isLoading && !hooks.length && (
        <div className="flex items-center justify-center py-12">
          <div className="flex flex-col items-center gap-4">
            <div className="w-8 h-8 border-3 border-white/30 border-t-white rounded-full animate-spin" />
            <p className="text-white/70">Generating hooks...</p>
          </div>
        </div>
      )}

      {hooks.length > 0 && (
        <div className="space-y-3">
          {hooks.map((hook, index) => (
            <HookCard key={index} hook={hook} />
          ))}
        </div>
      )}

      {!isLoading && hooks.length === 0 && (
        <div className="flex items-center justify-center py-12">
          <p className="text-white/50 text-center">Enter a description and select a tone to generate hooks</p>
        </div>
      )}
    </div>
  );
};

export default HooksDisplay;
