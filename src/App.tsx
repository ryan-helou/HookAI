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
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-pink-600 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">🎬 HookAI</h1>
          <p className="text-xl text-white/80">Generate engaging viral hooks for your videos</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <HookForm onGenerate={handleGenerateHooks} isLoading={isLoading} />
          </div>
          <div>
            <HooksDisplay hooks={hooks} isLoading={isLoading} onRegenerate={handleRegenerate} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
