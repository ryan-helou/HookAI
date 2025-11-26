import React from 'react';
import { Tone, TONE_DESCRIPTIONS, TONES } from '../../utils/constants';

interface ToneSelectorProps {
  selectedTone: Tone;
  onToneChange: (tone: Tone) => void;
  disabled?: boolean;
}

export const ToneSelector: React.FC<ToneSelectorProps> = ({
  selectedTone,
  onToneChange,
  disabled = false,
}) => {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">Select Tone</label>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {TONES.map((tone) => (
          <button
            key={tone}
            onClick={() => !disabled && onToneChange(tone)}
            disabled={disabled}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedTone === tone
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            } disabled:opacity-50`}
            title={TONE_DESCRIPTIONS[tone]}
          >
            {tone}
          </button>
        ))}
      </div>
    </div>
  );
};
