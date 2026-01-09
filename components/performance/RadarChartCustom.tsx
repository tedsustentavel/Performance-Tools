import React from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';

interface RadarChartProps {
  data: any[];
  title: string;
  color: string;
}

// Função para renderizar ticks com quebras de linha
const renderCustomTick = (props: any) => {
  const { x, y, payload } = props;
  const text = payload.value;
  const lines = text.split('\n');
  
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={lines.length > 1 ? -(lines.length - 1) * 6 : 0}
        textAnchor="middle"
        fill="#475569"
        fontSize={10}
        fontWeight={600}
      >
        {lines.map((line: string, index: number) => (
          <tspan key={index} x={0} dy={index === 0 ? 0 : 12}>
            {line}
          </tspan>
        ))}
      </text>
    </g>
  );
};

export const RadarChartCustom: React.FC<RadarChartProps> = ({ data, title, color }) => (
  <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-5">
    <h4 className="text-sm font-semibold text-gray-800 mb-3 text-center">{title}</h4>
    <ResponsiveContainer width="100%" height={250}>
      <RadarChart data={data}>
        <PolarGrid stroke="#cbd5e1" />
        <PolarAngleAxis 
          dataKey="competencia" 
          tick={renderCustomTick}
        />
        <PolarRadiusAxis angle={90} domain={[0, 5]} tick={{ fill: '#94a3b8', fontSize: 9 }} />
        <Radar 
          name="Nota" 
          dataKey="valor" 
          stroke={color} 
          fill={color} 
          fillOpacity={0.6}
        />
      </RadarChart>
    </ResponsiveContainer>
    <div className="text-center mt-2">
      <span className="text-xs text-gray-500">Escala: 1 a 5</span>
    </div>
  </div>
);