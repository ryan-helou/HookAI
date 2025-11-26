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
    <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 shadow-2xl hover:bg-white/10 transition-all duration-300">
      <h2 className="text-2xl font-bold text-white mb-2">Create Your Hooks</h2>
      <p className="text-purple-100 text-sm mb-8">Describe your video and choose a tone</p>

      <div className="mb-8">
        <label className="block text-white text-sm font-semibold mb-3">
          📝 Video Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe what your video is about... (e.g., 'A tutorial on how to make the perfect pizza')"
          className="w-full px-5 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-white/50 focus:bg-white/15 transition resize-none"
          rows={4}
          disabled={isLoading}
        />
        <p className="text-white/50 text-xs mt-2">{description.length}/500</p>
      </div>

      <div className="mb-8">
        <label className="block text-white text-sm font-semibold mb-3">
          🎭 Tone
        </label>
        <select
          value={tone}
          onChange={(e) => setTone(e.target.value as Tone)}
          className="w-full px-5 py-4 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-white/50 focus:bg-white/15 transition cursor-pointer"
          disabled={isLoading}
        >
          {TONES.map((t) => (
            <option key={t} value={t} className="bg-gray-900">
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        disabled={isLoading || !description.trim()}
        className="w-full bg-gradient-to-r from-blue-400 to-cyan-400 text-gray-900 font-bold py-4 rounded-xl hover:shadow-lg hover:from-blue-300 hover:to-cyan-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 text-lg"
      >
        {isLoading ? '⚡ Generating...' : '🚀 Generate Hooks'}
      </button>
    </form>
  );
};

// Static method for generating hooks (called from App.tsx)
HookForm.generateHooks = generateHooks;

export default HookForm;
