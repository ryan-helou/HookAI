import HookCard from './HookCard';
import type { Hook } from '../types/hooks';

interface HooksDisplayProps {
  hooks: Hook[];
  isLoading: boolean;
  onRegenerate: () => Promise<void>;
}

const HooksDisplay = ({ hooks, isLoading, onRegenerate }: HooksDisplayProps) => {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Generated Hooks</h2>
          {hooks.length > 0 && (
            <p className="text-gray-600 text-sm font-medium mt-2">{hooks.length} amazing hooks ready</p>
          )}
        </div>
        {hooks.length > 0 && (
          <button
            onClick={onRegenerate}
            disabled={isLoading}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-bold text-sm transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span className="hidden sm:inline">Regenerating...</span>
              </>
            ) : (
              <>
                <span>🔄</span>
                <span className="hidden sm:inline">Regenerate</span>
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
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full animate-spin" style={{ animationDuration: '3s' }}></div>
              <div className="absolute inset-2 bg-white rounded-full"></div>
            </div>
            <p className="text-gray-900 text-lg font-bold text-center">Creating your hooks...</p>
            <p className="text-gray-600 text-sm text-center">This usually takes a few seconds</p>
          </div>
        </div>
      )}

      {/* Hooks list */}
      {hooks.length > 0 && (
        <div className="space-y-4">
          {hooks.map((hook, index) => (
            <div
              key={index}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 75}ms` }}
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
            <div className="text-6xl mb-4 animate-bounce" style={{ animationDuration: '2s' }}>
              ✨
            </div>
            <p className="text-gray-900 text-lg font-bold mb-2">No hooks yet</p>
            <p className="text-gray-600 text-sm font-medium">
              Fill out the form to generate your first set of hooks
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default HooksDisplay;
