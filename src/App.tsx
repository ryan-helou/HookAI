import { useState } from 'react';
import HookForm from './components/HookForm';
import HooksDisplay from './components/HooksDisplay';
import type { Hook, Tone } from './types/hooks';

function App() {
  const [hooks, setHooks] = useState<Hook[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lastDescription, setLastDescription] = useState('');
  const [lastTone, setLastTone] = useState<Tone>('funny');

  const handleGenerateHooks = async (description: string, tone: Tone) => {
    setLastDescription(description);
    setLastTone(tone);
    setIsLoading(true);
    try {
      const generatedHooks = await HookForm.generateHooks(description, tone);
      setHooks(generatedHooks);
    } catch (error) {
      console.error('Failed to generate hooks:', error);
      alert('Failed to generate hooks. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegenerate = async () => {
    await handleGenerateHooks(lastDescription, lastTone);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-purple-50 to-purple-100">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-20">
        {/* Header Section */}
        <div className="text-center mb-20 animate-fade-in">
          <div className="inline-flex items-center justify-center mb-6 px-4 py-2 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full border border-indigo-200">
            <span className="text-sm font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              ✨ AI-Powered Hook Generation
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-6 leading-tight">
            Create Viral <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Hooks</span> in Seconds
          </h1>

          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-medium">
            Generate engaging hooks for your videos using advanced AI. Just describe your video and pick a tone.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-start">
          {/* Form Section - Left */}
          <div className="animate-slide-left">
            <HookForm onGenerate={handleGenerateHooks} isLoading={isLoading} />
          </div>

          {/* Results Section - Right */}
          <div className="animate-slide-right">
            <HooksDisplay hooks={hooks} isLoading={isLoading} onRegenerate={handleRegenerate} />
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-20 pt-12 border-t border-gray-200">
          <p className="text-gray-500 text-sm font-medium">
            Powered by OpenAI GPT-4 • Built for content creators
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
