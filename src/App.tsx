import { useState } from 'react';
import HookForm from './components/HookForm';
import HooksDisplay from './components/HooksDisplay';
import ColorBends from './components/ColorBends';
import DecryptedText from './components/DecryptedText';
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
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 z-0 w-screen h-screen bg-black">
        <ColorBends
          colors={['#FFFFFF', '#D8D8DF', '#A1A1AA']}
          rotation={0}
          speed={0.2}
          autoRotate={0}
          scale={1}
          frequency={1}
          warpStrength={1}
          mouseInfluence={1}
          parallax={0.5}
          noise={0.1}
          transparent
        />
      </div>

      {/* Content overlay */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-20">
          {/* Header Section */}
          <div className="text-center mb-20 animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
              <DecryptedText
                text="Create Viral Hooks in Seconds"
                speed={60}
                maxIterations={15}
                sequential={true}
                revealDirection="start"
                useOriginalCharsOnly={true}
                animateOn="view"
                parentClassName="text-transparent"
                className="text-transparent"
                encryptedClassName="text-gray-600"
                style={{
                  backgroundImage: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(200,200,210,0.9) 25%, rgba(140,140,155,0.85) 50%, rgba(80,80,95,0.8) 75%, rgba(30,30,45,0.75) 100%)',
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                  backgroundAttachment: 'fixed',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.2))',
                  display: 'inline-block',
                  width: '100%'
                }}
              />
            </h1>

            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-medium">
              Generate engaging hooks for your videos using advanced AI. Just describe your video and pick a tone.
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10 items-start">
            {/* Form Section - Left */}
            <div className="lg:col-span-1 animate-slide-left">
              <HookForm onGenerate={handleGenerateHooks} isLoading={isLoading} />
            </div>

            {/* Results Section - Right */}
            <div className="lg:col-span-2 animate-slide-right">
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
    </div>
  );
}

export default App;
