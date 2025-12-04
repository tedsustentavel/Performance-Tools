import React, { useState, useMemo } from 'react';
import { Competencia, Notas } from '../../types/performance';
import { NivelSelector } from './NivelSelector';

interface CompetenciaCardProps {
  competencia: Competencia;
  notas: Notas;
  setNotas: (notas: Notas) => void;
}

export const CompetenciaCard: React.FC<CompetenciaCardProps> = ({ competencia, notas, setNotas }) => {
  const [expanded, setExpanded] = useState(true);
  const mediaComp = useMemo(() => {
    const vals = competencia.dimensoes.map(d => notas[d.id]).filter(v => v > 0);
    return vals.length > 0 ? (vals.reduce((a,b) => a+b, 0) / vals.length).toFixed(1) : null;
  }, [competencia.dimensoes, notas]);
  
  return (
    <div className="bg-white rounded-2xl p-5 mb-4 shadow-sm border border-gray-100">
      <button onClick={() => setExpanded(!expanded)} className="w-full flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{competencia.icon}</span>
          <span className="font-semibold text-gray-900">{competencia.nome}</span>
          {mediaComp && <span className="px-2 py-0.5 rounded-full text-xs font-bold text-white" style={{ background: competencia.cor }}>{mediaComp}</span>}
        </div>
        <span className="text-gray-400 text-xl">{expanded ? '−' : '+'}</span>
      </button>
      {expanded && (
        <div className="mt-4 space-y-6">
          {competencia.dimensoes.map(dim => (
            <div key={dim.id} className="pl-3 border-l-4" style={{ borderColor: competencia.cor }}>
              <div className="text-sm font-semibold text-gray-800">{dim.nome}</div>
              <div className="text-xs text-gray-500 italic mt-1 mb-2">{dim.def}</div>
              <NivelSelector 
                value={notas[dim.id] || 0} 
                onChange={(v) => setNotas({ ...notas, [dim.id]: v })} 
                cor={competencia.cor} 
                dimensaoId={dim.id} 
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};