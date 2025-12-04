# Hub de Ferramentas para Gestores

Suite completa de ferramentas de gestão de pessoas integrada em uma única aplicação.

## 🎯 Ferramentas Disponíveis

### 1. Avaliação de Competências
Sistema completo de avaliação T&D com relatórios visuais e gráficos de radar.

**Características:**
- 12 Competências Comportamentais
- 12 Competências Técnicas
- 9 Competências de Liderança (quando aplicável)
- Relatórios em PDF e Markdown
- Salvamento automático de progresso
- Gráficos de radar por grupo de competências

### 2. MARCA Pro Feedback
Ferramenta de feedback estruturado usando metodologia MARCA com assistência de IA.

**Características:**
- Coaching conversacional com IA (Google Gemini)
- Metodologia MARCA (Momento, Ação, Reação, Consequência, Alternativa)
- Comunicação Não-Violenta
- Export em PDF e Markdown
- Histórico de feedbacks salvos localmente

## 🚀 Como Usar

### Pré-requisitos

- Node.js 18+
- Chave de API do Google Gemini (para o MARCA Pro Feedback)

### Instalação

```bash
# Instalar dependências
npm install

# Configurar chave da API do Gemini
# Copie .env.local e adicione sua chave
cp .env.local .env.local
# Edite o arquivo e adicione: API_KEY=sua_chave_aqui
```

### Desenvolvimento

```bash
# Rodar em modo desenvolvimento
npm run dev
```

### Build para Produção

```bash
# Gerar build otimizado
npm run build

# Preview do build
npm run preview
```

## 📁 Estrutura do Projeto

```
performance/
├── pages/
│   ├── Home.tsx                    # Dashboard do hub
│   ├── PerformanceApp.tsx          # Avaliação de Competências
│   └── MarcaProApp.tsx             # MARCA Pro Feedback
├── components/
│   ├── shared/                     # Componentes compartilhados
│   ├── performance/                # Componentes de Avaliação
│   └── marca/                      # Componentes do MARCA Pro
├── services/
│   ├── performance/                # Serviços de exportação
│   └── marca/                      # Serviços Gemini AI
├── types/
│   ├── performance.ts              # Types da Avaliação
│   └── marca.ts                    # Types do MARCA Pro
└── constants/
    ├── performance.ts              # Competências e comportamentos
    └── marca.ts                    # (futuro)
```

## 🔒 Privacidade

- Todos os dados são armazenados localmente no navegador (localStorage)
- Nenhum dado é enviado para servidores externos (exceto para a IA do MARCA Pro durante o chat)
- Os dados podem ser exportados a qualquer momento

## 🛠️ Tecnologias

- React 19
- TypeScript 5.8
- Vite 6.2
- Tailwind CSS
- Recharts (gráficos)
- Google Gemini AI
- html2pdf.js

## 📝 Navegação

A aplicação usa hash routing para navegação entre ferramentas:

- `#/` → Home do hub
- `#/performance` → Avaliação de Competências
- `#/marca-pro` → MARCA Pro Feedback

## 🌐 Deploy

O projeto está configurado para deploy no Vercel. Certifique-se de adicionar a variável de ambiente `API_KEY` no painel do Vercel.

## 📄 Licença

Uso interno - T&D Sustentável
