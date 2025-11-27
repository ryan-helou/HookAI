import { useState } from 'react';
import { generateHooks } from '../services/openaiService';
import type { Tone } from '../types/hooks';

interface HookFormProps {
  onGenerate: (description: string, tone: Tone) => Promise<void>;
  isLoading: boolean;
}

const HookForm = ({ onGenerate, isLoading }: HookFormProps) => {
  const [description, setDescription] = useState('');
  const DEFAULT_TONE: Tone = 'urgent';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (description.trim()) {
      await onGenerate(description, DEFAULT_TONE);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && description.trim() && !isLoading) {
      e.preventDefault();
      handleSubmit({ preventDefault: () => {} } as React.FormEvent);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white/70 backdrop-blur-lg rounded-2xl p-5 sm:p-6 md:p-8 border border-white/20 ring-1 ring-white/10 hover:shadow-lg transition-all duration-200">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">
          Generate Hooks
        </h2>
        <p className="text-xs sm:text-sm md:text-base text-gray-600 font-medium">
          Describe your video and get 5 killer hooks
        </p>
      </div>

      {/* Description field */}
      <div className="mb-6 sm:mb-8">
        <div className="mb-3">
          <label className="block text-gray-900 text-xs sm:text-sm font-semibold">
            What's your video about?
          </label>
        </div>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="E.g., A tutorial on making sourdough bread, a fitness transformation story, or a productivity hack..."
          className="w-full px-3 sm:px-4 py-3 sm:py-4 bg-white/50 border border-gray-300/30 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-400 transition-all resize-none text-sm sm:text-base font-medium"
          rows={4}
          disabled={isLoading}
        />
      </div>

      {/* Submit button */}
      <button
        type="submit"
        disabled={isLoading || !description.trim()}
        className="w-full bg-black hover:bg-gray-800 text-white font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl text-sm sm:text-base"
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-3">
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            <span>Generating amazing hooks...</span>
          </span>
        ) : (
          <span>✨ Generate Hooks</span>
        )}
      </button>
    </form>
  );
};

// Static method for generating hooks (called from App.tsx)
HookForm.generateHooks = generateHooks;

export default HookForm;
