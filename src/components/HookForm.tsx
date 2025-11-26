import { useState } from 'react';
import { generateHooks } from '../services/openaiService';
import type { Tone } from '../types/hooks';

interface HookFormProps {
  onGenerate: (description: string, tone: Tone) => Promise<void>;
  isLoading: boolean;
}

const TONES: Tone[] = ['funny', 'dramatic', 'inspirational', 'urgent', 'casual', 'professional'];

const HookForm = ({ onGenerate, isLoading }: HookFormProps) => {
  const [description, setDescription] = useState('');
  const [tone, setTone] = useState<Tone>('funny');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (description.trim()) {
      await onGenerate(description, tone);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="group relative">
      {/* Glow background */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100"></div>

      {/* Card */}
      <div className="relative bg-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 md:p-8 transition-all duration-300 hover:border-gray-600/80">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Create Hooks</h2>
        <p className="text-gray-400 text-sm mb-8">Tell us about your video</p>

        {/* Description field */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <label className="block text-white text-sm font-semibold">
              What's your video about?
            </label>
            <span className="text-gray-500 text-xs">{description.length}/500</span>
          </div>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value.slice(0, 500))}
            placeholder="E.g., A tutorial on making sourdough bread, A fitness transformation story..."
            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:bg-gray-800/80 transition-all resize-none"
            rows={4}
            disabled={isLoading}
          />
        </div>

        {/* Tone selector */}
        <div className="mb-8">
          <label className="block text-white text-sm font-semibold mb-3">
            Choose your tone
          </label>
          <div className="grid grid-cols-2 gap-2">
            {TONES.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTone(t)}
                disabled={isLoading}
                className={`px-4 py-3 rounded-lg font-medium text-sm transition-all ${
                  tone === t
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white border border-purple-400/50'
                    : 'bg-gray-800/30 text-gray-300 border border-gray-700/30 hover:border-gray-600/50 hover:bg-gray-800/50'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={isLoading || !description.trim()}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold py-3 md:py-4 rounded-lg transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed shadow-lg hover:shadow-xl hover:shadow-purple-600/20"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              Generating...
            </span>
          ) : (
            '✨ Generate Hooks'
          )}
        </button>
      </div>
    </form>
  );
};

// Static method for generating hooks (called from App.tsx)
HookForm.generateHooks = generateHooks;

export default HookForm;
