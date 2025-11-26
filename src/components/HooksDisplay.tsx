import HookCard from './HookCard';
import type { Hook } from '../types/hooks';

interface HooksDisplayProps {
  hooks: Hook[];
  isLoading: boolean;
  onRegenerate: () => Promise<void>;
}

const HooksDisplay = ({ hooks, isLoading, onRegenerate }: HooksDisplayProps) => {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Generated Hooks</h2>
          {hooks.length > 0 && (
            <p className="text-gray-600 text-sm mt-2">{hooks.length} hooks ready to use</p>
          )}
        </div>
        {hooks.length > 0 && (
          <button
            onClick={onRegenerate}
            disabled={isLoading}
            className="flex items-center gap-2 px-4 md:px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg font-bold text-sm transition-all duration-200"
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
        <div className="flex items-center justify-center py-16">
          <div className="flex flex-col items-center gap-4">
            <div className="w-10 h-10 border-3 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
            <p className="text-gray-900 text-lg font-semibold">Creating your hooks...</p>
            <p className="text-gray-600 text-sm">This usually takes a few seconds</p>
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
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <HookCard hook={hook} />
            </div>
          ))}
        </div>
      )}

      {/* Empty state */}
      {!isLoading && hooks.length === 0 && (
        <div className="flex items-center justify-center py-16">
          <div className="text-center">
            <p className="text-6xl mb-4">✨</p>
            <p className="text-gray-900 text-lg font-semibold mb-2">No hooks yet</p>
            <p className="text-gray-600 text-sm">Create a hook by filling the form on the left</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default HooksDisplay;
