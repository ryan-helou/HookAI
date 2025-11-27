import HookCard from './HookCard';
import type { Hook } from '../types/hooks';

interface HooksDisplayProps {
  hooks: Hook[];
  isLoading: boolean;
  onRegenerate: () => Promise<void>;
}

const HooksDisplay = ({ hooks, isLoading, onRegenerate }: HooksDisplayProps) => {
  // Separate hooks by section
  const templates = hooks.filter((h) => h.section === 'templates');
  const originals = hooks.filter((h) => h.section === 'created');

  return (
    <div className="bg-white/60 backdrop-blur-xl rounded-2xl p-8 border border-white/20 ring-1 ring-white/10">
      {/* Header */}
      <div className="flex items-center justify-between mb-10 pb-6 border-b border-gray-200/50">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Your Hooks</h2>
          {hooks.length > 0 && (
            <p className="text-gray-600 text-sm font-medium mt-2">{templates.length} proven templates + {originals.length} original creations</p>
          )}
        </div>
        {hooks.length > 0 && (
          <button
            onClick={onRegenerate}
            disabled={isLoading}
            className="flex items-center gap-2 px-6 py-3 bg-black hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-bold text-sm transition-all duration-200 shadow-lg hover:shadow-xl"
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
              <div className="absolute inset-0 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full animate-spin" style={{ animationDuration: '3s' }}></div>
              <div className="absolute inset-2 bg-white/60 rounded-full"></div>
            </div>
            <p className="text-gray-900 text-lg font-bold text-center">Creating your hooks...</p>
            <p className="text-gray-600 text-sm text-center">Finding proven templates & generating originals...</p>
          </div>
        </div>
      )}

      {/* Hooks sections */}
      {hooks.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Top 3 Templates Section */}
          {templates.length > 0 && (
            <div>
              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-900">Top 3 Proven Templates</h3>
                <p className="text-gray-600 text-xs font-medium mt-1">Battle-tested hooks that work</p>
              </div>
              <div className="space-y-4">
                {templates.map((hook, index) => (
                  <div
                    key={`template-${index}`}
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 75}ms` }}
                  >
                    <HookCard hook={hook} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* AI's Original Creations Section */}
          {originals.length > 0 && (
            <div>
              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-900">AI's Original Creations</h3>
                <p className="text-gray-600 text-xs font-medium mt-1">Unique, never-before-seen hooks</p>
              </div>
              <div className="space-y-4">
                {originals.map((hook, index) => (
                  <div
                    key={`original-${index}`}
                    className="animate-fade-in"
                    style={{ animationDelay: `${(templates.length + index) * 75}ms` }}
                  >
                    <HookCard hook={hook} />
                  </div>
                ))}
              </div>
            </div>
          )}
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
