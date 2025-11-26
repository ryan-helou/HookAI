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
    <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-md rounded-lg p-8">
      <h2 className="text-2xl font-bold text-white mb-6">Create Your Hooks</h2>

      <div className="mb-6">
        <label className="block text-white text-sm font-medium mb-2">
          Video Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe what your video is about..."
          className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/60 transition"
          rows={5}
          disabled={isLoading}
        />
      </div>

      <div className="mb-6">
        <label className="block text-white text-sm font-medium mb-2">
          Tone
        </label>
        <select
          value={tone}
          onChange={(e) => setTone(e.target.value as Tone)}
          className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none focus:border-white/60 transition"
          disabled={isLoading}
        >
          {TONES.map((t) => (
            <option key={t} value={t} className="bg-gray-800">
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        disabled={isLoading || !description.trim()}
        className="w-full bg-white text-purple-600 font-bold py-3 rounded-lg hover:bg-gray-100 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
      >
        {isLoading ? 'Generating...' : 'Generate Hooks'}
      </button>
    </form>
  );
};

// Static method for generating hooks (called from App.tsx)
HookForm.generateHooks = generateHooks;

export default HookForm;
