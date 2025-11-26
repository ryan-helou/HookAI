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
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-purple-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-6xl md:text-7xl font-black text-white mb-4 tracking-tight">
            🎬 HookAI
          </h1>
          <p className="text-xl md:text-2xl text-purple-100 font-light">
            Generate viral hooks for your videos instantly
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-1 animate-fade-in">
            <HookForm onGenerate={handleGenerateHooks} isLoading={isLoading} />
          </div>
          <div className="lg:col-span-2 animate-fade-in">
            <HooksDisplay hooks={hooks} isLoading={isLoading} onRegenerate={handleRegenerate} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
