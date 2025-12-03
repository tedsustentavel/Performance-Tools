import React from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';

interface RadarChartProps {
  data: any[];
  title: string;
  color: string;
}

export const RadarChartCustom: React.FC<RadarChartProps> = ({ data, title, color }) => (
  <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-5">
    <h4 className="text-sm font-semibold text-gray-800 mb-3 text-center">{title}</h4>
    <ResponsiveContainer width="100%" height={250}>
      <RadarChart data={data}>
        <PolarGrid stroke="#cbd5e1" />
        <PolarAngleAxis 
          dataKey="competencia" 
          tick={{ fill: '#475569', fontSize: 10, fontWeight: 600 }}
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