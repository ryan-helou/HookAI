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
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Create Hooks</h2>
      <p className="text-gray-600 text-sm mb-8">Tell us about your video</p>

      {/* Description field */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <label className="block text-gray-900 text-sm font-semibold">
            What's your video about?
          </label>
          <span className="text-gray-500 text-xs">{description.length}/500</span>
        </div>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value.slice(0, 500))}
          placeholder="E.g., A tutorial on making sourdough bread, A fitness transformation story..."
          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:bg-white transition-all resize-none text-base"
          rows={4}
          disabled={isLoading}
        />
      </div>

      {/* Tone selector */}
      <div className="mb-8">
        <label className="block text-gray-900 text-sm font-semibold mb-3">
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
                  ? 'bg-blue-600 text-white border border-blue-700'
                  : 'bg-gray-100 text-gray-900 border border-gray-200 hover:border-gray-300 hover:bg-gray-50'
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
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
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
    </form>
  );
};

// Static method for generating hooks (called from App.tsx)
HookForm.generateHooks = generateHooks;

export default HookForm;
