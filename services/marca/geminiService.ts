
import { GoogleGenAI } from "@google/genai";
import { FeedbackType, MarcaField, ChatMessage, CoachResponse } from "../../types/marca";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const FIELD_CONFIG = {
  [MarcaField.MOMENT]: {
    name: "MOMENTO",
    goal: "Contextualizar",
    question: "Olá! Vamos começar pelo 'M' de Momento. Para o feedback ser justo, ele precisa ser situado no tempo e espaço. \n\nConte-me: **Quando e onde** essa situação aconteceu especificamente? (Ex: 'Na reunião de ontem...', 'No e-mail de hoje cedo...')"
  },
  [MarcaField.ACTION]: {
    name: "AÇÃO",
    goal: "Fatos observáveis",
    question: "Agora vamos para o 'A' de Ação. Aqui precisamos ser como uma câmera filmadora: apenas fatos, sem julgamentos (evite termos como 'foi grosso' ou 'foi proativo'). \n\nO que a pessoa **fez ou falou** exatamente? Descreva o comportamento."
  },
  [MarcaField.REACTION]: {
    name: "REAÇÃO",
    goal: "Impacto imediato",
    question: "Chegamos no 'R' de Reação. O feedback precisa mostrar o efeito da ação.\n\nQual foi o **impacto imediato** do comportamento? As pessoas ficaram em silêncio? O cliente reclamou? O projeto atrasou?"
  },
  [MarcaField.CONSEQUENCE]: {
    name: "CONSEQUÊNCIA",
    goal: "Impacto futuro",
    question: "Vamos falar do 'C' de Consequência. Aqui conectamos o fato ao negócio ou carreira.\n\nSe isso continuar acontecendo, qual será o **impacto a longo prazo**? Como isso afeta a reputação dele(a) ou os resultados da equipe?"
  },
  [MarcaField.ALTERNATIVE]: {
    name: "ALTERNATIVA",
    goal: "Futuro desejado",
    question: "Para finalizar, o 'A' de Alternativa. O feedback serve para gerar mudança ou reforço.\n\nO que você espera que essa pessoa **faça diferente** (ou continue fazendo) da próxima vez que isso ocorrer?"
  },
};

export const getInitialCoachMessage = (field: MarcaField): string => {
  return FIELD_CONFIG[field].question;
};

export const consultWithCoach = async (
  field: MarcaField,
  feedbackType: FeedbackType,
  history: ChatMessage[]
): Promise<CoachResponse> => {
  try {
    const config = FIELD_CONFIG[field];
    
    // Converte histórico para formato de prompt
    const conversation = history.map(h => `${h.role === 'user' ? 'Líder' : 'Coach'}: ${h.text}`).join('\n');

    const prompt = `
      Você é um Mentor Sênior de Liderança especializado na metodologia MARCA.
      
      CONTEXTO ATUAL:
      - Estamos focados apenas na letra: "${config.name}" (${config.goal}).
      - Tipo de Feedback: ${feedbackType}.
      
      SUA MISSÃO:
      1. Converse com o líder para extrair os fatos necessários para este campo específico.
      2. Se o líder for vago (ex: "ele foi grosso"), faça perguntas investigativas curtas (ex: "O que ele disse exatamente?").
      3. Seja breve, empático e direto. Não dê palestras longas.
      4. Quando você tiver informações suficientes para escrever uma frase profissional para este campo, gere o "draft".
      
      FORMATO DE RESPOSTA (JSON OBRIGATÓRIO):
      {
        "message": "Sua resposta conversacional aqui...",
        "draft": "O texto final sugerido para o formulário (ou null se ainda precisa de mais info)"
      }

      HISTÓRICO DA CONVERSA:
      ${conversation}
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: { 
        responseMimeType: "application/json",
        systemInstruction: "Você é um coach experiente, calmo e focado em Comunicação Não-Violenta. Ajude o usuário a ser específico."
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return JSON.parse(text) as CoachResponse;

  } catch (error) {
    console.error("Gemini Chat Error:", error);
    return {
      message: "Tive um problema de conexão. Pode repetir?",
      draft: null
    };
  }
};

// Mantido para compatibilidade de tipos, caso necessário
export const getFieldAdvice = async (
  field: MarcaField,
  feedbackType: FeedbackType,
  value: string
): Promise<{ advice: string; example: string }> => {
    return { advice: "deprecated", example: "deprecated" };
};

export const refineMarcaText = async (
  field: MarcaField,
  feedbackType: FeedbackType,
  userDraft: string
): Promise<string> => {
   return userDraft; 
};

