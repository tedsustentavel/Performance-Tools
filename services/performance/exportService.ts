import { DadosAvaliacao, Notas, GrupoCompetencia } from '../../types/performance';
import { 
  competenciasComportamentais, 
  competenciasTecnicas, 
  competenciasLideranca,
  getComportamentos 
} from '../../constants/performance';
import html2pdf from 'html2pdf.js';

export const gerarMarkdown = (dados: DadosAvaliacao, notas: Notas, temLideranca: boolean): string => {
  const { nomeColaborador, cargoColaborador, unidade, nomeGestor, cargoGestor, dataAvaliacao } = dados;
  
  const calcMedia = (comps: GrupoCompetencia) => {
    let t = 0, c = 0;
    Object.values(comps).forEach(comp => comp.dimensoes.forEach(d => { if (notas[d.id]) { t += notas[d.id]; c++; } }));
    return c > 0 ? (t / c).toFixed(1) : '—';
  };
  
  const totalNotas = Object.values(notas).filter(v => v > 0);
  const mediaGeral = totalNotas.length > 0 ? (totalNotas.reduce((a,b) => a+b, 0) / totalNotas.length).toFixed(1) : '—';
  const percentual = totalNotas.length > 0 ? (((totalNotas.reduce((a,b) => a+b, 0) / totalNotas.length) - 1) / 4 * 100).toFixed(0) : '0';

  // Lógica de Inteligência para Markdown
  const pontosFortes: { nome: string; nota: number }[] = [];
  const pontosDesenvolvimento: { nome: string; nota: number }[] = [];

  const processarGrupo = (grupo: GrupoCompetencia) => {
    Object.values(grupo).forEach(comp => {
      comp.dimensoes.forEach(dim => {
        const nota = notas[dim.id];
        if (nota >= 4) {
          pontosFortes.push({ nome: dim.nome, nota });
        } else if (nota <= 3 && nota > 0) {
          pontosDesenvolvimento.push({ nome: dim.nome, nota });
        }
      });
    });
  };

  processarGrupo(competenciasComportamentais);
  processarGrupo(competenciasTecnicas);
  if (temLideranca) processarGrupo(competenciasLideranca);

  pontosDesenvolvimento.sort((a, b) => a.nota - b.nota);
  pontosFortes.sort((a, b) => b.nota - a.nota);

  let md = `# 📊 Relatório de Avaliação de Competências\n`;
  md += `## T&D Sustentável\n\n`;
  md += `**Data de Geração:** ${new Date().toLocaleDateString('pt-BR')}\n\n`;
  md += `---\n\n`;
  
  md += `## 📋 Informações da Avaliação\n\n`;
  md += `| Campo | Informação |\n`;
  md += `|-------|------------|\n`;
  md += `| **Colaborador Avaliado** | ${nomeColaborador} |\n`;
  md += `| **Cargo** | ${cargoColaborador.charAt(0).toUpperCase() + cargoColaborador.slice(1)} |\n`;
  md += `| **Unidade** | ${unidade} |\n`;
  md += `| **Gestor Responsável** | ${nomeGestor} |\n`;
  md += `| **Cargo do Gestor** | ${cargoGestor} |\n`;
  md += `| **Data da Avaliação** | ${new Date(dataAvaliacao).toLocaleDateString('pt-BR')} |\n\n`;
  
  md += `---\n\n`;
  md += `## 🧠 Análise do Especialista\n\n`;
  
  const media = parseFloat(mediaGeral);
  let textoIntro = "";
  
  if (media >= 4.5) {
    md += `### 🌟 Perfil de Alta Performance\n\n`;
    textoIntro = "O colaborador apresenta um desempenho excepcional, superando consistentemente as expectativas da função. Este perfil é uma referência técnica e comportamental.";
  } else if (media >= 3.5) {
    md += `### ✅ Perfil Sólido e Consistente\n\n`;
    textoIntro = "O colaborador entrega resultados sólidos e atende plenamente ao esperado para o cargo. Demonstra competência técnica e alinhamento cultural.";
  } else if (media >= 2.5) {
    md += `### ⚠️ Perfil em Desenvolvimento\n\n`;
    textoIntro = "O colaborador atende parcialmente às expectativas, entregando o básico, mas com inconsistências relevantes. É um momento crucial para alinhamento.";
  } else {
    md += `### 🔴 Perfil com Desempenho Insuficiente\n\n`;
    textoIntro = "O desempenho atual está significativamente abaixo do esperado para a função, impactando a equipe e os resultados. Requer intervenção imediata.";
  }
  md += `${textoIntro}\n\n`;

  md += `### 🌟 Destaques e Fortalezas\n`;
  if (pontosFortes.length > 0) {
    pontosFortes.slice(0, 5).forEach(p => md += `- **${p.nome}** (Nota: ${p.nota})\n`);
  } else {
    md += `_Nenhum destaque (nota 4 ou 5) identificado._\n`;
  }
  md += `\n`;

  md += `### 🚀 Oportunidades de Desenvolvimento\n`;
  if (pontosDesenvolvimento.length > 0) {
    pontosDesenvolvimento.slice(0, 5).forEach(p => md += `- **${p.nome}** (Nota: ${p.nota})\n`);
  } else {
    md += `_Nenhum ponto crítico (nota 1, 2 ou 3) identificado._\n`;
  }
  md += `\n---\n\n`;

  md += `## 📈 Indicadores Quantitativos\n\n`;
  md += `- **Pontuação Geral:** ${mediaGeral}/5.0 (**${percentual}%**)\n`;
  md += `- **Média Comportamental:** ${calcMedia(competenciasComportamentais)}/5.0\n`;
  md += `- **Média Técnica:** ${calcMedia(competenciasTecnicas)}/5.0\n`;
  if (temLideranca) md += `- **Média Liderança:** ${calcMedia(competenciasLideranca)}/5.0\n`;
  md += `\n`;
  
  md += `---\n\n`;

  const renderGrupo = (titulo: string, icon: string, comps: GrupoCompetencia) => {
    md += `## ${icon} ${titulo}\n\n`;
    Object.values(comps).forEach(comp => {
      // Create a temporary object for calcMedia to work on a single competency
      const tempComp: GrupoCompetencia = { [comp.nome]: comp };
      const mediaComp = calcMedia(tempComp);
      md += `### ${comp.icon} ${comp.nome} - Média: ${mediaComp}/5.0\n\n`;
      md += `| Dimensão | Nota | Descrição do Nível Atingido |\n`;
      md += `|----------|------|-----------------------------|\n`;
      comp.dimensoes.forEach(d => {
        const nota = notas[d.id] || '—';
        const desc = nota !== '—' ? getComportamentos(d.id)[nota as number] : 'Não avaliado';
        md += `| **${d.nome}** | ${nota === '—' ? '—' : `**${nota}**/5`} | ${desc} |\n`;
      });
      md += `\n`;
    });
  };

  renderGrupo('Competências Comportamentais', '🎯', competenciasComportamentais);
  renderGrupo('Competências Técnicas', '🔧', competenciasTecnicas);
  if (temLideranca) renderGrupo('Competências de Liderança', '👑', competenciasLideranca);

  md += `---\n\n`;
  md += `## 💡 Plano de Ação (PDI)\n\n`;
  md += `> Utilize esta seção para registrar os combinados da reunião de feedback.\n\n`;
  md += `### 1. Ações para Fortalecer Pontos Fortes\n`;
  md += `\n\n`;
  md += `### 2. Ações para Corrigir Pontos de Desenvolvimento\n`;
  md += `\n\n`;
  md += `---\n\n`;
  md += `### Assinaturas\n\n`;
  md += `**Colaborador:** ___________________________ Data: ___/___/___\n\n`;
  md += `**Gestor:** ___________________________ Data: ___/___/___\n\n`;
  md += `---\n\n`;
  md += `*Relatório gerado automaticamente pelo Sistema de Avaliação de Competências - T&D Sustentável*\n`;
  
  return md;
};

export const gerarPDF = async (dados: DadosAvaliacao): Promise<void> => {
  const elemento = document.getElementById('relatorio-container');
  
  if (!elemento) {
    throw new Error('Elemento do relatório não encontrado');
  }

  const opcoes = {
    margin: [10, 10, 10, 10],
    filename: `Avaliacao_${dados.nomeColaborador.replace(/\s+/g, '_')}_${dados.dataAvaliacao}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { 
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff'
    },
    jsPDF: { 
      unit: 'mm', 
      format: 'a4', 
      orientation: 'portrait' 
    },
    pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
  };

  try {
    await html2pdf().set(opcoes).from(elemento).save();
  } catch (error) {
    console.error('Erro ao gerar PDF:', error);
    throw new Error('Erro ao gerar PDF. Tente novamente.');
  }
};