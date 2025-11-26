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
    <div className="min-h-screen">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <div className="pt-8 md:pt-16 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 md:mb-20 animate-fade-in">
              <div className="mb-4 inline-block">
                <div className="text-6xl md:text-7xl font-black bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  HookAI
                </div>
              </div>
              <p className="text-lg md:text-xl text-gray-300 font-light max-w-2xl mx-auto">
                Create viral hooks for your videos in seconds using AI
              </p>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 px-4 md:px-8 pb-8 md:pb-16">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 items-start">
              {/* Form - Left side */}
              <div className="lg:col-span-1 animate-slide-left">
                <HookForm onGenerate={handleGenerateHooks} isLoading={isLoading} />
              </div>

              {/* Results - Right side */}
              <div className="lg:col-span-2 animate-slide-right">
                <HooksDisplay hooks={hooks} isLoading={isLoading} onRegenerate={handleRegenerate} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
