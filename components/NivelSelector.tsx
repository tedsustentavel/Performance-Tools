import React from 'react';
import { getComportamentos } from '../constants';

interface NivelSelectorProps {
  value: number;
  onChange: (value: number) => void;
  cor: string;
  dimensaoId: string;
}

export const NivelSelector: React.FC<NivelSelectorProps> = ({ value, onChange, cor, dimensaoId }) => {
  const comportamentos = getComportamentos(dimensaoId);
  return (
    <div className="mt-3 space-y-1.5">
      {[1, 2, 3, 4, 5].map(n => (
        <div
          key={n}
          onClick={() => onChange(n)}
          className={`p-3 rounded-xl cursor-pointer transition-all border-2 ${value === n ? 'shadow-md' : 'hover:bg-gray-50'}`}
          style={{ 
            borderColor: value === n ? cor : 'transparent',
            background: value === n ? `${cor}10` : 'white'
          }}
        >
          <div className="flex items-start gap-3">
            <span 
              className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-white font-bold text-sm"
              style={{ background: n <= 2 ? '#FF3B30' : n === 3 ? '#FF9500' : '#34C759' }}
            >
              {n}
            </span>
            <p className="text-xs text-gray-700 leading-relaxed flex-1">{comportamentos[n]}</p>
            {value === n && <span className="text-lg">✓</span>}
          </div>
        </div>
      ))}
    </div>
  );
};