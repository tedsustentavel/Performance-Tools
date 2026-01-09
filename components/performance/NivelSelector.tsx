import React from 'react';
import { getComportamentos } from '../../constants/performance';

interface NivelSelectorProps {
  value: number;
  onChange: (value: number) => void;
  cor: string;
  dimensaoId: string;
  comentario?: string;
  onComentarioChange?: (dimensaoId: string, comentario: string) => void;
  destacado?: boolean;
  onDestaqueToggle?: (dimensaoId: string) => void;
}

export const NivelSelector: React.FC<NivelSelectorProps> = ({ 
  value, 
  onChange, 
  cor, 
  dimensaoId,
  comentario = '',
  onComentarioChange,
  destacado = false,
  onDestaqueToggle
}) => {
  const comportamentos = getComportamentos(dimensaoId);
  
  return (
    <div className="space-y-4">
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

      {value > 0 && (
        <div className="space-y-3 pt-3 border-t border-gray-200">
          {onDestaqueToggle && (
            <button
              onClick={() => onDestaqueToggle(dimensaoId)}
              className={`w-full py-2.5 px-4 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                destacado 
                  ? 'bg-yellow-100 text-yellow-700 border-2 border-yellow-300' 
                  : 'bg-gray-50 text-gray-600 border-2 border-gray-200 hover:bg-gray-100'
              }`}
            >
              <span className="text-lg">{destacado ? '⭐' : '☆'}</span>
              <span>{destacado ? 'Destacado' : 'Destacar esta competência'}</span>
            </button>
          )}

          {onComentarioChange && (
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-2">
                💬 Comentário (opcional)
              </label>
              <textarea
                value={comentario}
                onChange={(e) => onComentarioChange(dimensaoId, e.target.value)}
                placeholder="Adicione observações sobre esta avaliação..."
                className="w-full px-3 py-2 rounded-xl bg-gray-50 text-sm focus:ring-2 focus:ring-blue-500 outline-none border border-gray-200 resize-none"
                rows={3}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};