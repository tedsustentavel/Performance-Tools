import { Cargo, Comportamentos, GrupoCompetencia } from './types';

export const cargos: Cargo[] = [
  { value: "auxiliar", label: "Auxiliar", lideranca: false },
  { value: "assistente", label: "Assistente", lideranca: false },
  { value: "analista", label: "Analista", lideranca: false },
  { value: "especialista", label: "Especialista", lideranca: false },
  { value: "encarregado", label: "Encarregado", lideranca: true },
  { value: "supervisor", label: "Supervisor", lideranca: true },
  { value: "coordenador", label: "Coordenador", lideranca: true },
  { value: "gerente", label: "Gerente", lideranca: true },
  { value: "diretor", label: "Diretor", lideranca: true }
];

export const comportamentosComportamentais: Comportamentos = {
  "1.1": {
    1: "Demonstra desânimo frequente que afeta o próprio trabalho. Aguarda ser direcionado mesmo para tarefas rotineiras. Evita assumir responsabilidades além do mínimo. Precisa de estímulo externo constante.",
    2: "Executa o que é solicitado mas raramente vai além. Toma iniciativa ocasionalmente, geralmente em situações confortáveis. Energia oscila - alguns dias produtivo, outros desengajado.",
    3: "Mantém disposição adequada na maior parte do tempo. Toma iniciativa em situações rotineiras sem precisar ser acionado. Comunica quando está com dificuldade. Cumpre responsabilidades de forma autônoma.",
    4: "Demonstra alta disposição de forma consistente, mesmo em períodos de maior demanda. Busca ativamente formas de contribuir além do esperado. Influencia positivamente a energia de colegas.",
    5: "Mantém alta energia mesmo em períodos prolongados de pressão. Identifica e age sobre oportunidades antes de serem solicitadas. É referência de proatividade para outras áreas."
  },
  "1.2": {
    1: "Dispersa-se frequentemente durante o trabalho. Inicia tarefas sem completá-las. Perde tempo com atividades não relacionadas ao trabalho. Entrega muito abaixo do esperado.",
    2: "Consegue manter foco em tarefas simples e de curta duração. Distrai-se com facilidade em atividades mais longas. Produtividade inconsistente. Dificuldade em identificar prioridades.",
    3: "Mantém foco adequado nas tarefas rotineiras. Entrega no ritmo esperado para o cargo. Gerencia distrações comuns. Sabe diferenciar urgente de importante na maioria das situações.",
    4: "Mantém alto foco mesmo em tarefas complexas ou de longa duração. Produtividade consistentemente acima da média. Gerencia múltiplas demandas sem perder qualidade. Prioriza com clareza.",
    5: "Mantém foco em qualquer contexto, incluindo ambientes com muitas interrupções. Produtividade alta e sustentável. Consegue ajudar outros a melhorarem seu foco."
  },
  "1.3": {
    1: "Descumpre compromissos básicos com frequência. Atribui atrasos a fatores externos sem reflexão. Não comunica problemas até ser cobrado. Trata entregas como favor, não obrigação.",
    2: "Cumpre parte dos compromissos, mas falha em outros. Comunica problemas de forma reativa, quando já impactou alguém. Assume responsabilidade parcialmente. Precisa de acompanhamento.",
    3: "Cumpre a maioria dos compromissos dentro do prazo. Comunica impedimentos geralmente a tempo de replanejar. Assume responsabilidade adequada. É considerado confiável pela equipe.",
    4: "É altamente confiável - raramente descumpre compromissos. Comunica riscos proativamente, antes de virarem problema. Assume total responsabilidade pelos seus resultados.",
    5: "Confiabilidade é marca registrada - se comprometeu, vai entregar. Antecipa problemas e já apresenta soluções. Inspira senso de responsabilidade nos colegas."
  },
  "2.1": {
    1: "Comunicação frequentemente confusa ou incompleta. Omite informações importantes. Evita conversas necessárias. Cria mal-entendidos. Diz o que acha que o outro quer ouvir.",
    2: "Comunica o básico quando solicitado, mas falta contexto. Informações incompletas que geram retrabalho. Desconforto visível com conversas diretas - tende a rodeios.",
    3: "Comunica com clareza adequada em situações rotineiras. Fornece contexto relevante para decisões. Informa proativamente o essencial. Consegue ter conversas diretas quando necessário.",
    4: "Comunicação clara e completa de forma consistente. Antecipa que informações serão necessárias. Confortável com conversas difíceis - conduz com respeito mas sem rodeios.",
    5: "Comunicação que elimina ambiguidades - as pessoas entendem de primeira. Explica assuntos complexos de forma simples. Cria ambiente onde outros se sentem seguros para serem diretos."
  },
  "2.2": {
    1: "Não assume erros mesmo quando evidentes. Sempre encontra fatores externos ou outras pessoas para responsabilizar. Defensivo quando questionado. Repete os mesmos erros.",
    2: "Assume erros apenas quando não há alternativa. Justificativas extensas acompanham qualquer admissão. Dificuldade em separar 'errei' de 'sou incompetente'. Aprendizado lento.",
    3: "Assume erros de forma adequada quando ocorrem. Explica o que aconteceu sem justificar excessivamente. Consegue reconhecer a própria parte sem se diminuir. Aprende com erros.",
    4: "Assume erros prontamente, sem necessidade de ser confrontado. Faz análise produtiva do que falhou e implementa correções rapidamente. Transforma erros em aprendizado visível.",
    5: "Assume erros de forma que inspira outros a fazerem o mesmo. Compartilha aprendizados de falhas com a equipe. Cria ambiente onde assumir erro é visto como força."
  },
  "2.3": {
    1: "Evita dar feedback ou o faz de forma agressiva/destrutiva. Muito defensivo ao receber - reage como ataque pessoal. Não muda comportamento após receber feedback.",
    2: "Dá feedback superficial ou vago - difícil de agir sobre ele. Desconforto visível tanto ao dar quanto ao receber. Defensividade moderada. Mudanças comportamentais inconsistentes.",
    3: "Dá feedback construtivo quando solicitado ou em situações que claramente precisam. Recebe feedback sem defensividade excessiva. Implementa mudanças quando concorda.",
    4: "Busca ativamente feedback para seu próprio desenvolvimento. Oferece feedback construtivo proativamente. Recebe críticas com abertura genuína. Mudanças visíveis e consistentes.",
    5: "Dá feedback que efetivamente transforma comportamento das pessoas. Modela vulnerabilidade ao receber feedback. Cria ciclos de feedback que aceleram desenvolvimento coletivo."
  },
  "3.1": {
    1: "Resiste a aprender coisas novas. Mantém-se deliberadamente na zona de conforto. Repete abordagens que não funcionam. Não busca desenvolvimento. Justifica estagnação.",
    2: "Aprende quando obrigado ou quando não há alternativa. Desenvolvimento reativo - só busca quando o gap fica crítico. Aplicação limitada de novos conhecimentos. Progresso lento.",
    3: "Busca aprender de forma consistente dentro das oportunidades disponíveis. Aplica novos conhecimentos adequadamente. Confortável com desafios de aprendizado. Evolução visível.",
    4: "Aprendizado autodirigido - busca desenvolvimento além do que é oferecido. Procura ativamente desafios para crescer. Aplicação rápida e eficaz. Evolução acelerada e consistente.",
    5: "Aprendizado é característica marcante. Cria oportunidades próprias de desenvolvimento. Compartilha o que aprende de forma que acelera também o time. É exemplo de evolução contínua."
  },
  "3.2": {
    1: "Resiste ativamente a mudanças. Performance cai drasticamente quando rotina muda. Reclama frequentemente. Dificulta implementação de mudanças. Não funciona fora do familiar.",
    2: "Aceita mudanças com relutância visível. Adaptação lenta - demora semanas para ajustar. Produtividade cai significativamente. Foco excessivo no desconforto ao invés da solução.",
    3: "Adapta-se adequadamente a mudanças rotineiras. Mantém produtividade em transições planejadas. Reconhece desconforto mas continua funcionando. Tempo de ajuste razoável.",
    4: "Adapta-se rapidamente mesmo a mudanças significativas e não planejadas. Produtividade mantida ou aumentada durante transições. Consegue ver oportunidades em mudanças.",
    5: "Prospera em ambientes de mudança constante. Antecipa necessidades de adaptação e se prepara. Lidera transições ajudando a equipe a navegar mudanças."
  },
  "3.3": {
    1: "Performance cai drasticamente sob qualquer pressão. Usa dificuldades externas como justificativa recorrente para não entregar. Não busca suporte nem quando precisa claramente.",
    2: "Dificuldade com pressão moderada - performance cai visivelmente. Busca suporte apenas quando já está em crise. Dificuldade em diferenciar dificuldade real de desculpa.",
    3: "Mantém performance adequada sob pressão rotineira da função. Reconhece quando precisa de suporte e comunica. Consegue diferenciar dificuldade real de justificativa.",
    4: "Alta resiliência sob pressão significativa - mantém qualidade mesmo em períodos intensos. Busca e utiliza suporte de forma inteligente. Processa dificuldades como aprendizado.",
    5: "Resiliência que inspira o time - mantém a calma e o foco quando outros estão perdendo. Transforma pressão em combustível para crescimento. Ajuda outros a desenvolverem resiliência."
  },
  "4.1": {
    1: "Foco em parecer ocupado ao invés de gerar resultado. Entregas frequentemente incompletas ou sem utilidade. Não diferencia atividade de impacto. Confunde esforço com resultado.",
    2: "Confunde atividade com resultado - trabalha muito mas entrega pouco valor. Entregas básicas com qualidade inconsistente. Pouca reflexão sobre o impacto real do seu trabalho.",
    3: "Foco adequado em resultados da sua função. Entregas com qualidade esperada e que geram valor. Compreende o impacto do seu trabalho no contexto maior. Resultados consistentes.",
    4: "Forte orientação a resultados de alto impacto. Entregas consistentemente acima do esperado. Priorização sofisticada - foca no que mais gera valor. Referência de entrega.",
    5: "Orientação a resultados que eleva o padrão da equipe. Maximiza valor em qualquer contexto. Consegue priorizar de forma que outros aprendem com ele. Resultados excepcionais."
  },
  "4.2": {
    1: "Trabalha de forma isolada mesmo quando prejudica o coletivo. Não oferece ajuda nem quando tem capacidade. Não pede ajuda nem quando precisa. Compete de forma prejudicial.",
    2: "Colaboração mínima e apenas quando cobrado. Oferece ajuda superficial que não resolve de fato. Pede ajuda apenas em situação de desespero. Dificuldade para trabalhar em conjunto.",
    3: "Colabora adequadamente quando solicitado. Oferece ajuda quando percebe que pode contribuir. Pede suporte quando necessário sem excesso. Contribuição positiva para o ambiente.",
    4: "Colaboração proativa e genuína - oferece ajuda antes de ser pedido. Equilibra bem ajudar e pedir ajuda. Fortalece capacidades dos colegas através da colaboração.",
    5: "Colaboração que multiplica resultados - quando ajuda, o resultado é maior do que se cada um fizesse sozinho. Cria ambiente onde todos se ajudam. É procurado para colaborar."
  },
  "4.3": {
    1: "Visão exclusivamente da própria tarefa. Não considera como seu trabalho afeta outros. Toma decisões que prejudicam outras áreas. Não avisa quando seu atraso vai impactar alguém.",
    2: "Consciência limitada a impactos óbvios e imediatos. Considera outros apenas quando alertado. Decisões focadas só na própria área mesmo quando claramente afetam outras.",
    3: "Compreende os impactos diretos de suas ações em outros. Considera o time e áreas próximas nas decisões. Comunica quando suas limitações ou atrasos vão afetar alguém.",
    4: "Consciência de impactos diretos e indiretos. Decisões que consideram o sistema, não apenas sua parte. Antecipa efeitos em outras áreas antes que causem problema.",
    5: "Consciência sistêmica que identifica conexões não óbvias. Decisões que otimizam o resultado coletivo. Ajuda outros a desenvolverem visão sistêmica. Pensa em termos de empresa."
  }
};

export const comportamentosTecnicos: Comportamentos = {
  "T1.1": {
    1: "Não domina conceitos básicos da função. Conhecimento insuficiente para tarefas elementares. Não compreende fundamentos da área. Precisa de orientação constante até para o básico.",
    2: "Domina apenas conceitos mais simples. Conhecimento limitado a situações rotineiras e procedimentos decorados. Dificuldade quando precisa adaptar. Faz mas não sabe explicar por quê.",
    3: "Domina adequadamente os conceitos e técnicas essenciais da função. Conhecimento sólido que permite executar trabalho rotineiro com autonomia. Consegue explicar o 'porquê' das técnicas.",
    4: "Domínio avançado tanto teórico quanto prático. Conhecimento que permite lidar com situações complexas e não-rotineiras. Referência técnica na equipe - outros consultam para tirar dúvidas.",
    5: "Domínio abrangente de toda a área técnica. Conhecimento que inclui aspectos avançados e especializados. Referência técnica na empresa. Consegue ensinar desde o básico até o avançado."
  },
  "T1.2": {
    1: "Estagnação técnica. Não busca atualização. Usa técnicas ultrapassadas mesmo quando existem alternativas melhores. Resiste a aprender novos métodos. Conhecimento defasado.",
    2: "Atualização apenas quando forçado ou quando não há alternativa. Aprende novas técnicas com muita lentidão. Conhecimento limitado de evoluções da área.",
    3: "Aproveita oportunidades de atualização disponíveis (treinamentos, orientações). Aprende e aplica novas técnicas quando orientado. Aberto a novos métodos. Evolução visível.",
    4: "Busca ativamente conhecimento além do que é oferecido. Aprende por conta própria através de cursos, vídeos, leituras. Domina e aplica novas técnicas rapidamente. Compartilha novidades.",
    5: "Está sempre à frente nas práticas da área. Não apenas acompanha mas traz inovações. Evolução técnica que inspira a equipe. Reconhecido como alguém que está sempre atualizado."
  },
  "T1.3": {
    1: "Não consegue aplicar conhecimento na prática. Paralisa diante de problemas básicos. Não identifica causas de problemas mesmo quando óbvias. Dependência total de outros.",
    2: "Aplica conhecimento apenas em situações muito simples e já conhecidas. Resolve apenas problemas óbvios seguindo orientação. Diagnóstico superficial. Dificuldade com situações novas.",
    3: "Aplica conhecimento adequadamente em situações rotineiras. Resolve problemas comuns com autonomia. Diagnóstico correto de causas principais na maioria dos casos.",
    4: "Aplica conhecimento com competência em situações complexas e variadas. Resolve problemas difíceis com criatividade e eficácia. Diagnóstico preciso mesmo de questões não óbvias.",
    5: "Aplicação de conhecimento técnico em qualquer contexto. Resolve problemas que outros não conseguiram. Diagnóstico profundo de causas raiz em situações complexas. É procurado para os casos mais difíceis."
  },
  "T2.1": {
    1: "Não conhece processos básicos da função. Executa tarefas de forma desorganizada sem seguir procedimentos. Não sabe a quem reportar ou encaminhar demandas. Gera retrabalho constante.",
    2: "Conhece apenas processos mais simples. Segue procedimentos quando explicitamente instruído. Dificuldade em lembrar fluxos com múltiplas etapas. Precisa consultar constantemente.",
    3: "Conhece adequadamente os principais processos e procedimentos da função. Executa fluxos rotineiros com autonomia. Compreende sequências lógicas e razões por trás dos procedimentos.",
    4: "Domínio avançado de todos os processos da função incluindo situações excepcionais. Executa e adapta procedimentos conforme contexto. Identifica e propõe melhorias processuais.",
    5: "Domínio completo de processos que permite otimização. Não apenas executa mas melhora processos de forma que beneficia outros. Cria documentação e metodologias que viram padrão."
  },
  "T2.2": {
    1: "Não consegue usar funcionalidades básicas dos sistemas. Opera sem compreender o que está fazendo. Gera erros frequentes nos sistemas. Evita usar ferramentas por não saber operá-las.",
    2: "Usa apenas funcionalidades básicas de forma mecânica. Dificuldade com qualquer variação do procedimento padrão. Lento e inseguro ao navegar. Comete erros com frequência.",
    3: "Domina adequadamente as funcionalidades principais dos sistemas da função. Navega com autonomia em situações rotineiras. Compreende lógica básica dos sistemas. Comete poucos erros.",
    4: "Domínio avançado dos sistemas incluindo funcionalidades complexas. Navega com velocidade e segurança. Raramente comete erros. Explora recursos avançados. Frequentemente ajuda outros.",
    5: "Domínio completo que permite maximizar potencial dos sistemas. Não apenas usa mas otimiza configurações. Identifica e reporta bugs ou melhorias. Referência técnica de sistemas na área."
  },
  "T2.3": {
    1: "Não usa ferramentas de organização pessoal. Agenda desorganizada ou inexistente. Perde prazos constantemente por desorganização. Não responde mensagens importantes.",
    2: "Uso mínimo e inconsistente de ferramentas organizacionais. Agenda desatualizada com conflitos frequentes. Esquece compromissos regularmente. Organização insuficiente.",
    3: "Usa adequadamente ferramentas básicas de organização pessoal. Agenda atualizada e geralmente sem conflitos. Mantém lista funcional de tarefas. Cumpre compromissos na maioria das vezes.",
    4: "Uso eficiente de ferramentas de produtividade. Agenda bem organizada. Sistema funcional de gestão de tarefas com priorização clara. Comunicação sempre responsiva.",
    5: "Sistema integrado de ferramentas que maximiza produtividade. Nunca perde compromissos ou prazos. Organização que serve de exemplo. Consegue compartilhar métodos que ajudam outros."
  },
  "T2.4": {
    1: "Não sabe quem acionar em outras áreas mesmo para questões básicas. Trabalha de forma isolada sem compreender impactos. Gera gargalos por não saber navegar a organização.",
    2: "Conhece apenas contatos óbvios e mais diretos. Aciona outras áreas de forma genérica sem compreender fluxos específicos. Frequentemente direciona demandas para pessoas erradas.",
    3: "Conhece os principais fluxos que conectam sua área com outras. Sabe quem acionar para demandas rotineiras e como formalizar solicitações adequadamente.",
    4: "Compreensão abrangente de fluxos interfuncionais incluindo situações complexas. Antecipa necessidades de coordenação. Aciona proativamente áreas relevantes antes que problemas surjam.",
    5: "Domínio do sistema organizacional completo. Identifica e ajuda a corrigir gargalos interfuncionais. Cria pontes entre áreas. Consultado para questões complexas que envolvem múltiplas áreas."
  },
  "T3.1": {
    1: "Entregas repletas de erros graves e frequentes. Qualidade muito abaixo do aceitável. Falta de atenção a detalhes mesmo críticos. Retrabalho constante. Trabalho precisa ser refeito.",
    2: "Entregas com qualidade inconsistente e frequentemente abaixo do esperado. Erros recorrentes em aspectos importantes. Retrabalho comum. Verificação superficial do próprio trabalho.",
    3: "Entregas com qualidade adequada e consistente. Erros ocasionais mas geralmente não graves. Atenção apropriada aos detalhes críticos. Retrabalho mínimo. Padrão confiável.",
    4: "Entregas de alta qualidade de forma consistente. Erros raros e menores. Atenção a detalhes incluindo aspectos não óbvios. Praticamente sem retrabalho. Entregas usadas como referência.",
    5: "Entregas de qualidade que definem padrão de excelência. Precisão técnica mesmo sob pressão. Zero retrabalho de forma consistente. Trabalho usado como referência e benchmark."
  },
  "T3.2": {
    1: "Muito lento mesmo em tarefas básicas. Produtividade muito abaixo do esperado. Desperdiça tempo e recursos de forma evidente. Não consegue priorizar. Gera gargalos para outros.",
    2: "Velocidade limitada em tarefas técnicas. Produtividade abaixo do esperado. Uso ineficiente de tempo por falta de método. Priorização fraca. Frequentemente atrasa entregas.",
    3: "Velocidade adequada em tarefas rotineiras. Produtividade no padrão esperado para o cargo. Uso razoável de tempo sem desperdícios evidentes. Cumpre prazos regularmente.",
    4: "Alta velocidade sem comprometer qualidade. Produtividade acima do esperado de forma consistente. Otimização de tempo e recursos. Priorização que maximiza impacto.",
    5: "Velocidade alta mantendo excelência. Produtividade que se destaca. Maximiza recursos disponíveis. Entrega rápido E bem. Consegue ajudar outros a serem mais eficientes."
  },
  "T3.3": {
    1: "Trabalho completamente caótico. Não planeja atividades. Perde arquivos, informações e prazos constantemente. Não consegue encontrar informações quando necessário. Opera em modo crise.",
    2: "Organização mínima e inconsistente. Planejamento limitado resulta em surpresas. Frequentemente não encontra arquivos ou informações. Desorganização prejudica entregas.",
    3: "Organização adequada que permite trabalho funcional. Planeja atividades principais com antecedência. Mantém arquivos e informações acessíveis. Gerencia múltiplas demandas sem caos.",
    4: "Organização que maximiza eficiência. Planeja considerando dependências e contingências. Sistema de organização de informações que funciona bem. Referência de organização.",
    5: "Sistema integrado de organização. Planejamento que antecipa cenários. Metodologia pessoal de organização que pode ser ensinada. Acesso instantâneo a qualquer informação."
  },
  "T4.1": {
    1: "Não ensina o que sabe ou ensina de forma confusa/incorreta. Não tem paciência para desenvolver outros. Guarda conhecimento por insegurança. Impacto negativo no desenvolvimento do time.",
    2: "Ensina apenas aspectos muito básicos com dificuldade. Explicações superficiais ou incompletas. Paciência limitada. Compartilha conhecimento apenas quando pressionado.",
    3: "Ensina adequadamente técnicas da área quando solicitado ou quando claramente necessário. Explicações suficientemente claras. Paciência razoável. Colegas efetivamente aprendem.",
    4: "Ensina proativamente, não apenas quando solicitado. Explicações claras de conceitos complexos. Paciência e didática evidente. Acelera visivelmente desenvolvimento de colegas.",
    5: "Ensino que efetivamente forma profissionais competentes. Forma pessoas que se tornam referências. Cria materiais ou metodologias de ensino. Multiplica capacidade técnica da área."
  },
  "T4.2": {
    1: "Não documenta nada do seu trabalho. Conhecimento existe apenas na própria cabeça. Não contribui para processos. Conhecimento se perde quando não está disponível.",
    2: "Documentação mínima e apenas quando cobrado. Materiais criados são confusos ou incompletos. Raramente propõe melhorias. Pouca consciência de como experiência pode gerar aprendizados.",
    3: "Documenta aspectos principais do trabalho quando relevante. Cria materiais de referência claros o suficiente para consulta. Propõe melhorias ocasionalmente baseadas em experiência.",
    4: "Documenta proativamente conhecimentos e soluções importantes. Cria materiais de qualidade que se tornam referência. Propõe ativamente melhorias processuais significativas.",
    5: "Documentação que se torna repositório oficial de conhecimento. Cria materiais e processos que definem padrão. Identifica e implementa melhorias com impacto sistêmico."
  }
};

export const comportamentosLideranca: Comportamentos = {
  "L1.1": {
    1: "Foco exclusivo em resultados imediatos, sem investir tempo no desenvolvimento do time. Não reconhece potenciais. Pessoas não evoluem sob sua gestão. Time estagnado.",
    2: "Desenvolvimento reativo - orienta apenas quando solicitado. Reconhece apenas potenciais óbvios. Planos genéricos de desenvolvimento que não são acompanhados.",
    3: "Investe regularmente no desenvolvimento do time. Identifica potenciais e áreas de melhoria de cada pessoa. Cria oportunidades adequadas de crescimento. Evolução visível das pessoas.",
    4: "Prioriza ativamente o desenvolvimento de pessoas. Planos individualizados e desafiadores para cada membro. Identifica potenciais não óbvios. Pessoas crescem de forma acelerada.",
    5: "Desenvolvimento de time como marca registrada. Forma pessoas que se tornam referências. Histórico comprovado de pessoas que cresceram significativamente sob sua liderança."
  },
  "L1.2": {
    1: "Evita dar feedback. Quando dá, é vago ou agressivo. Não conduz avaliações adequadamente. Pessoas não sabem onde estão nem o que precisam melhorar. Surpresas nas avaliações.",
    2: "Feedback genérico e inconsistente. Avaliações superficiais. Evita conversas difíceis. Foco em aspectos negativos sem direcionamento construtivo. Impacto limitado.",
    3: "Fornece feedback específico e construtivo regularmente. Conduz avaliações estruturadas. Equilibra reconhecimento e desenvolvimento. Tem conversas difíceis quando necessário.",
    4: "Feedback de alta qualidade que efetivamente muda comportamentos. Avaliações profundas e acionáveis. Confortável com conversas difíceis. Pessoas evoluem visivelmente.",
    5: "Feedback que transforma trajetórias profissionais. Conversas que geram clareza e motivação. Cria ciclos de feedback no time que aceleram desenvolvimento coletivo."
  },
  "L1.3": {
    1: "Microgerenciamento extremo ou abandono total. Não delega, ou delega sem acompanhamento. Sobrecarregado com tarefas operacionais que deveria delegar. Time sem autonomia. É gargalo.",
    2: "Delega apenas tarefas triviais. Supervisão excessiva que sufoca. Dificuldade em soltar controle. Atribuições inadequadas às capacidades das pessoas.",
    3: "Delega adequadamente tarefas e responsabilidades. Fornece orientação equilibrada. Supervisão apropriada ao contexto. Desenvolve pessoas através de desafios proporcionais.",
    4: "Delegação que maximiza desenvolvimento e resultados. Equilibra autonomia e suporte conforme maturidade de cada pessoa. Desafios calibrados para crescimento acelerado.",
    5: "Delegação que cria autonomia real no time. Time funciona bem mesmo quando líder não está presente. Pessoas assumem responsabilidades crescentes naturalmente."
  },
  "L2.1": {
    1: "Planejamento caótico ou inexistente. Não considera capacidade real do time. Prazos irrealistas constantes. Recursos mal alocados. Trabalho sempre em modo crise. Time queimado.",
    2: "Planejamento básico e reativo. Subestima sistematicamente complexidade e tempo. Organização inconsistente. Crises frequentes por falta de previsão. Eficiência baixa.",
    3: "Planeja adequadamente trabalhos rotineiros. Considera capacidade e recursos disponíveis. Organização consistente. Prazos geralmente realistas. Crises ocasionais mas gerenciáveis.",
    4: "Planejamento estratégico e consistentemente preciso. Antecipa obstáculos e ajusta proativamente. Organização eficiente de recursos. Alta eficiência de execução.",
    5: "Planejamento que maximiza resultados e bem-estar do time simultaneamente. Previsão precisa mesmo em ambientes complexos. Ritmo sustentável de alta performance."
  },
  "L2.2": {
    1: "Evita decisões até ser forçado. Ou decide de forma impulsiva sem considerar impactos. Não assume responsabilidade por decisões ruins. Paralisa operação ou causa caos.",
    2: "Decisões lentas e excessivamente dependentes de consenso. Análise superficial. Considera apenas variáveis óbvias. Desconforto significativo com incerteza.",
    3: "Decide em tempo adequado com análise apropriada. Considera informações relevantes e impactos principais. Confortável com nível razoável de incerteza. Qualidade adequada.",
    4: "Decisões consistentemente boas com velocidade apropriada. Análise que considera riscos e oportunidades. Confortável decidindo com informação incompleta. Alta taxa de acerto.",
    5: "Decisões de qualidade mesmo sob pressão e incerteza. Velocidade que não compromete qualidade. Considera múltiplas variáveis simultaneamente. Reconhecido como bom julgamento."
  },
  "L2.3": {
    1: "Evita conflitos até explodirem. Intervenções que pioram situações. Não identifica tensões crescentes. Permite que ambiente se deteriore. Conflitos escalam constantemente.",
    2: "Reconhece conflitos óbvios mas intervém tarde. Abordagem simplista. Mediação superficial. Resolve sintomas mas não causas. Mesmos conflitos voltam a aparecer.",
    3: "Identifica e endereça conflitos em tempo adequado. Media de forma equilibrada. Aborda causas principais. Resoluções que funcionam. Mantém ambiente funcional e saudável.",
    4: "Antecipa e previne conflitos desnecessários. Mediação que transforma divergências em oportunidades. Resoluções duradouras. Fortalece relacionamentos através da gestão.",
    5: "Transforma conflitos complexos em avanços. Cria cultura onde divergências são tratadas de forma construtiva. Procurado para mediar situações difíceis em outras áreas."
  },
  "L3.1": {
    1: "Visão exclusivamente da própria área. Decisões que otimizam sua parte mas prejudicam outras. Não percebe conexões com outras áreas. Pensamento isolado.",
    2: "Consciência limitada de algumas conexões diretas. Considera impactos óbvios em áreas próximas. Pensamento predominantemente tático. Otimização local com pouca consideração do sistema.",
    3: "Compreende interconexões principais. Considera impactos em múltiplas áreas nas decisões. Equilibra necessidades da parte com necessidades do todo. Pensamento adequadamente sistêmico.",
    4: "Pensamento sistêmico consistente. Identifica conexões não óbvias. Antecipa impactos indiretos. Decisões que otimizam o sistema como um todo. Visão integrada.",
    5: "Enxerga o sistema completo. Identifica onde intervir para máximo impacto. Decisões que melhoram dinâmicas organizacionais. Ajuda outros líderes a desenvolverem visão sistêmica."
  },
  "L3.2": {
    1: "Trabalho da área desconectado de objetivos maiores. Não compreende estratégia da empresa. Foco exclusivo em atividades sem considerar propósito. Não traduz estratégia para o time.",
    2: "Conhecimento superficial da estratégia. Conexão fraca entre trabalho e objetivos maiores. Tradução limitada para o time. Foco predominantemente operacional.",
    3: "Compreende estratégia da empresa e conecta com trabalho da área. Traduz adequadamente objetivos estratégicos em ações. Mantém time alinhado com direcionamento maior.",
    4: "Forte alinhamento estratégico em todas as decisões. Traduz estratégia de forma clara e inspiradora para o time. Identifica e corrige desvios rapidamente.",
    5: "Alinhamento estratégico natural. Contribui ativamente para refinamento da estratégia quando apropriado. Consegue explicar para qualquer pessoa como trabalho conecta com objetivos."
  },
  "L3.3": {
    1: "Mantém status quo rigidamente. Resiste a mudanças e melhorias. Não questiona processos ineficientes mesmo quando óbvios. Bloqueia ideias de inovação. Área estagnada.",
    2: "Aceita melhorias óbvias quando pressionado. Inovação limitada a ajustes superficiais. Questionamento mínimo de processos. Mudanças lentas e incrementais.",
    3: "Implementa melhorias consistentes em processos existentes. Aberto a inovações viáveis. Questiona e ajusta processos ineficientes. Cria espaço para experimentação.",
    4: "Busca ativamente oportunidades de melhoria e inovação. Questiona paradigmas estabelecidos quando faz sentido. Implementa mudanças significativas com eficácia.",
    5: "Inovação e melhoria como características da área. Questiona fundamentos quando necessário e cria novas abordagens. Área é reconhecida como referência de inovação e eficácia."
  }
};

export const competenciasComportamentais: GrupoCompetencia = {
  energia: { nome: "Energia", icon: "⚡", cor: "#FF9500", dimensoes: [
    { id: "1.1", nome: "Disposição e Iniciativa", def: "Capacidade de trazer energia para o trabalho, tomar iniciativa e agir proativamente sem necessidade de direcionamento constante." },
    { id: "1.2", nome: "Foco e Produtividade", def: "Capacidade de manter concentração nas tarefas, gerenciar distrações e entregar resultados com consistência." },
    { id: "1.3", nome: "Responsabilidade com Entregas", def: "Confiabilidade no cumprimento de compromissos, comunicação proativa de impedimentos e senso de dono sobre resultados." }
  ]},
  transparencia: { nome: "Transparência", icon: "🔍", cor: "#5856D6", dimensoes: [
    { id: "2.1", nome: "Comunicação Direta e Clara", def: "Capacidade de transmitir informações de forma objetiva, completa e sem ambiguidades, incluindo conversas difíceis." },
    { id: "2.2", nome: "Responsabilização por Resultados", def: "Capacidade de assumir erros de forma produtiva, sem defensividade, e transformá-los em aprendizado." },
    { id: "2.3", nome: "Feedback Construtivo", def: "Capacidade de dar e receber feedback de forma que gera crescimento, sem agressividade ou defensividade." }
  ]},
  antifragilidade: { nome: "Antifragilidade", icon: "💪", cor: "#34C759", dimensoes: [
    { id: "3.1", nome: "Aprendizado Contínuo", def: "Busca ativa por evolução, disposição para sair da zona de conforto e aplicação prática de novos conhecimentos." },
    { id: "3.2", nome: "Adaptabilidade a Mudanças", def: "Capacidade de se ajustar rapidamente a novas situações mantendo produtividade e identificando oportunidades." },
    { id: "3.3", nome: "Resiliência Produtiva", def: "Capacidade de manter performance sob pressão, processar dificuldades de forma saudável e buscar suporte quando necessário." }
  ]},
  impacto: { nome: "Impacto", icon: "🎯", cor: "#FF2D55", dimensoes: [
    { id: "4.1", nome: "Orientação a Resultados", def: "Foco em entregas que geram valor real, diferenciando atividade de impacto e priorizando o que mais importa." },
    { id: "4.2", nome: "Colaboração Efetiva", def: "Capacidade de trabalhar de forma integrada com outros, oferecendo e pedindo ajuda de forma equilibrada." },
    { id: "4.3", nome: "Consciência Sistêmica", def: "Compreensão de como o próprio trabalho impacta outros e capacidade de tomar decisões considerando o todo." }
  ]}
};

export const competenciasTecnicas: GrupoCompetencia = {
  dominio: { nome: "Domínio Técnico", icon: "🎓", cor: "#007AFF", dimensoes: [
    { id: "T1.1", nome: "Conhecimento Teórico e Prático", def: "Domínio dos conceitos, técnicas e fundamentos da área de atuação, tanto na teoria quanto na prática." },
    { id: "T1.2", nome: "Atualização e Evolução Técnica", def: "Busca ativa por atualização profissional, aprendizado de novas técnicas e acompanhamento das evoluções da área." },
    { id: "T1.3", nome: "Aplicação e Resolução de Problemas", def: "Capacidade de aplicar conhecimento técnico para resolver problemas reais, diagnosticar causas e encontrar soluções." }
  ]},
  processos: { nome: "Processos\ne\nSistemas", icon: "📋", cor: "#5AC8FA", dimensoes: [
    { id: "T2.1", nome: "Domínio de Processos da Função", def: "Conhecimento dos procedimentos, fluxos e metodologias relacionados à função, executando-os com autonomia." },
    { id: "T2.2", nome: "Uso de ERPs e Sistemas", def: "Domínio das ferramentas tecnológicas e sistemas utilizados na função, navegando com segurança e eficiência." },
    { id: "T2.3", nome: "Ferramentas de Produtividade", def: "Uso eficiente de ferramentas de organização pessoal como agenda, e-mail e gestão de tarefas." },
    { id: "T2.4", nome: "Fluxos Interfuncionais", def: "Compreensão de como a área se conecta com outras e conhecimento de quem acionar para diferentes demandas." }
  ]},
  execucao: { nome: "Execução e Entrega", icon: "⚡", cor: "#FF9500", dimensoes: [
    { id: "T3.1", nome: "Qualidade e Precisão", def: "Padrão de excelência nas entregas, atenção a detalhes críticos e minimização de erros e retrabalho." },
    { id: "T3.2", nome: "Eficiência e Produtividade", def: "Velocidade adequada na execução de tarefas sem comprometer qualidade, otimizando tempo e recursos." },
    { id: "T3.3", nome: "Organização do Trabalho", def: "Capacidade de planejar atividades, organizar informações e gerenciar múltiplas demandas de forma estruturada." }
  ]},
  multiplicacao: { nome: "Multiplicação\nde\nImpacto", icon: "🎯", cor: "#AF52DE", dimensoes: [
    { id: "T4.1", nome: "Transferência de Conhecimento", def: "Capacidade de ensinar e desenvolver outros, compartilhando conhecimento de forma clara e acelerando o desenvolvimento da equipe." },
    { id: "T4.2", nome: "Documentação e Melhoria", def: "Documentação de conhecimentos e processos de forma que outros possam utilizar, além de propor melhorias com base na experiência." }
  ]}
};

export const competenciasLideranca: GrupoCompetencia = {
  pessoas: { nome: "Gestão de Pessoas", icon: "👥", cor: "#FF2D55", dimensoes: [
    { id: "L1.1", nome: "Desenvolvimento de Time", def: "Capacidade de identificar potenciais e criar oportunidades de crescimento, investindo ativamente no desenvolvimento das pessoas." },
    { id: "L1.2", nome: "Feedback e Avaliação Efetiva", def: "Habilidade de dar feedback de qualidade que transforma performance e conduzir avaliações que geram clareza e direcionamento." },
    { id: "L1.3", nome: "Delegação Estratégica", def: "Capacidade de distribuir responsabilidades de forma que maximiza tanto resultados quanto desenvolvimento das pessoas." }
  ]},
  processosGestao: { nome: "Gestão de Processos", icon: "⚙️", cor: "#64D2FF", dimensoes: [
    { id: "L2.1", nome: "Planejamento e Organização", def: "Habilidade de estruturar trabalho e recursos de forma eficiente, com prazos realistas e considerando capacidade do time." },
    { id: "L2.2", nome: "Tomada de Decisão", def: "Capacidade de decidir com velocidade e qualidade apropriadas, considerando múltiplas variáveis e confortável com incerteza." },
    { id: "L2.3", nome: "Gestão de Conflitos", def: "Habilidade de identificar e resolver divergências de forma construtiva, transformando conflitos em oportunidades de melhoria." }
  ]},
  visao: { nome: "Visão Estratégica", icon: "🎯", cor: "#BF5AF2", dimensoes: [
    { id: "L3.1", nome: "Pensamento Sistêmico", def: "Capacidade de compreender interconexões entre áreas e otimizar o sistema como um todo, não apenas a própria parte." },
    { id: "L3.2", nome: "Alinhamento Estratégico", def: "Habilidade de conectar o trabalho da área com objetivos estratégicos maiores e traduzir estratégia para o time." },
    { id: "L3.3", nome: "Inovação e Melhoria Contínua", def: "Capacidade de questionar status quo, implementar melhorias significativas e criar ambiente de experimentação e inovação." }
  ]}
};

export const getComportamentos = (id: string) => {
  if (id.startsWith('L')) return comportamentosLideranca[id];
  if (id.startsWith('T')) return comportamentosTecnicos[id];
  return comportamentosComportamentais[id];
};