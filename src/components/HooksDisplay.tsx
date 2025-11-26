import HookCard from './HookCard';
import type { Hook } from '../types/hooks';

interface HooksDisplayProps {
  hooks: Hook[];
  isLoading: boolean;
  onRegenerate: () => Promise<void>;
}

const HooksDisplay = ({ hooks, isLoading, onRegenerate }: HooksDisplayProps) => {
  return (
    <div className="group relative">
      {/* Glow background */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100"></div>

      {/* Card */}
      <div className="relative bg-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 md:p-8 transition-all duration-300 hover:border-gray-600/80">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Generated Hooks</h2>
            {hooks.length > 0 && (
              <p className="text-gray-400 text-sm mt-2">{hooks.length} hooks ready to use</p>
            )}
          </div>
          {hooks.length > 0 && (
            <button
              onClick={onRegenerate}
              disabled={isLoading}
              className="flex items-center gap-2 px-4 md:px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-lg font-bold text-sm transition-all duration-200 shadow-lg hover:shadow-xl hover:shadow-pink-600/20"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span className="hidden sm:inline">Regenerating...</span>
                </>
              ) : (
                <>
                  <span>🔄</span>
                  <span>Regenerate</span>
                </>
              )}
            </button>
          )}
        </div>

        {/* Loading state */}
        {isLoading && !hooks.length && (
          <div className="flex items-center justify-center py-20">
            <div className="flex flex-col items-center gap-4">
              <div className="relative w-16 h-16">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full blur-lg opacity-50 animate-pulse"></div>
                <div className="absolute inset-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full blur-sm opacity-30"></div>
              </div>
              <p className="text-white text-lg font-semibold">Creating your hooks...</p>
              <p className="text-gray-400 text-sm">This usually takes a few seconds</p>
            </div>
          </div>
        )}

        {/* Hooks list */}
        {hooks.length > 0 && (
          <div className="space-y-3">
            {hooks.map((hook, index) => (
              <div
                key={index}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <HookCard hook={hook} />
              </div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!isLoading && hooks.length === 0 && (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <p className="text-6xl mb-4">✨</p>
              <p className="text-white text-lg font-semibold mb-2">No hooks yet</p>
              <p className="text-gray-400 text-sm">Create a hook by filling the form on the left</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HooksDisplay;
