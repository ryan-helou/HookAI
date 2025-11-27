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

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-200">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Generate Hooks
        </h2>
        <p className="text-gray-600 text-base font-medium">
          Describe your video and get 5 killer hooks
        </p>
      </div>

      {/* Description field */}
      <div className="mb-8">
        <div className="mb-3">
          <label className="block text-gray-900 text-sm font-semibold">
            What's your video about?
          </label>
        </div>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="E.g., A tutorial on making sourdough bread, a fitness transformation story, or a productivity hack..."
          className="w-full px-4 py-4 bg-white border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all resize-none text-base font-medium"
          rows={5}
          disabled={isLoading}
        />
      </div>

      {/* Submit button */}
      <button
        type="submit"
        disabled={isLoading || !description.trim()}
        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl text-lg"
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
