import HookCard from './HookCard';
import type { Hook } from '../types/hooks';

interface HooksDisplayProps {
  hooks: Hook[];
  isLoading: boolean;
  onRegenerate: () => Promise<void>;
}

const HooksDisplay = ({ hooks, isLoading, onRegenerate }: HooksDisplayProps) => {
  return (
    <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 shadow-2xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-white">Your Hooks</h2>
          <p className="text-purple-100 text-sm mt-1">{hooks.length} viral hooks generated</p>
        </div>
        {hooks.length > 0 && (
          <button
            onClick={onRegenerate}
            disabled={isLoading}
            className="px-6 py-3 bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-300 hover:to-pink-300 disabled:opacity-50 disabled:cursor-not-allowed text-gray-900 rounded-xl transition-all duration-200 text-sm font-bold"
          >
            {isLoading ? '⚡ Regenerating...' : '🔄 Regenerate'}
          </button>
        )}
      </div>

      {isLoading && !hooks.length && (
        <div className="flex items-center justify-center py-16">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-purple-200/30 border-t-purple-400 rounded-full animate-spin" />
            <p className="text-white/70 text-lg">Creating amazing hooks...</p>
            <p className="text-white/40 text-sm">This usually takes a few seconds</p>
          </div>
        </div>
      )}

      {hooks.length > 0 && (
        <div className="space-y-4">
          {hooks.map((hook, index) => (
            <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
              <HookCard hook={hook} />
            </div>
          ))}
        </div>
      )}

      {!isLoading && hooks.length === 0 && (
        <div className="flex items-center justify-center py-16">
          <div className="text-center">
            <p className="text-6xl mb-4">✨</p>
            <p className="text-white/70 text-lg">No hooks generated yet</p>
            <p className="text-white/50 text-sm mt-2">Fill in the form and generate your first set of viral hooks</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default HooksDisplay;
