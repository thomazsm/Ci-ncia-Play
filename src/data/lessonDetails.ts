export interface LessonDetails {
  greeting: string;
  explanation: string;
  objectives: string[];
  practicalExamples: string[];
}

export const lessonDetails: Record<string, LessonDetails> = {
  'big-bang': {
    greeting: "Olá! Vamos viajar pelo espaço e entender a origem de tudo.",
    explanation: "O Universo começou a partir de um ponto extremamente quente e denso, que se expandiu rapidamente no evento conhecido como Big Bang. A partir dessa expansão, a matéria começou a se agrupar, formando as primeiras estrelas, galáxias e, eventualmente, o nosso Sistema Solar.",
    objectives: [
      "Compreender a teoria do Big Bang.",
      "Identificar os planetas do Sistema Solar.",
      "Entender a diferença entre planetas rochosos e gasosos."
    ],
    practicalExamples: [
      "Imagine um balão enchendo: assim como os pontos desenhados no balão se afastam, as galáxias se afastam umas das outras.",
      "A gravidade do Sol mantém todos os planetas em órbita, assim como um barbante segura uma bola girando no ar."
    ]
  },
  'fases-lua': {
    greeting: "Pronto para desvendar os mistérios da nossa Lua?",
    explanation: "A Lua não tem luz própria; ela reflete a luz do Sol. Conforme a Lua orbita a Terra, vemos diferentes porções dessa face iluminada, o que chamamos de fases da Lua. Quando a Terra, a Lua e o Sol se alinham perfeitamente, ocorrem os eclipses.",
    objectives: [
      "Identificar as quatro fases principais da Lua.",
      "Compreender a diferença entre eclipse solar e lunar.",
      "Entender o movimento de translação da Lua."
    ],
    practicalExamples: [
      "Use uma lanterna (Sol) e uma bola (Lua) em um quarto escuro para simular as fases.",
      "As marés dos oceanos são diretamente influenciadas pela atração gravitacional da Lua."
    ]
  },
  'camadas-terra': {
    greeting: "Vamos explorar o que existe debaixo dos nossos pés!",
    explanation: "A Terra é dividida em várias camadas. A Crosta (litosfera) é onde vivemos. Abaixo dela está o Manto, feito de rocha quente e pastosa (magma). No centro, temos o Núcleo, que é dividido em externo (líquido) e interno (sólido e extremamente quente).",
    objectives: [
      "Identificar a Crosta, o Manto e o Núcleo.",
      "Compreender as diferenças de temperatura e estado físico das camadas.",
      "Entender como o magma chega à superfície através dos vulcões."
    ],
    practicalExamples: [
      "Pense na Terra como um ovo cozido: a casca é a crosta, a clara é o manto e a gema é o núcleo.",
      "Os terremotos ocorrem devido à movimentação das placas tectônicas na crosta terrestre."
    ]
  },
  'estados-materia': {
    greeting: "Vamos descobrir como a matéria se transforma!",
    explanation: "Tudo ao nosso redor é feito de matéria. Ela pode existir em três estados principais: Sólido (partículas muito unidas e vibrando), Líquido (partículas mais soltas, assumindo a forma do recipiente) e Gasoso (partículas livres e muito agitadas). A temperatura é a chave para essas mudanças!",
    objectives: [
      "Diferenciar os estados sólido, líquido e gasoso.",
      "Entender como a temperatura afeta a agitação das partículas.",
      "Reconhecer os processos de fusão, vaporização, condensação e solidificação."
    ],
    practicalExamples: [
      "O gelo derretendo em um copo de água (fusão).",
      "A água fervendo na panela e virando vapor (vaporização)."
    ]
  },
  'deriva-continental': {
    greeting: "Vamos ver como os continentes se movem como um grande quebra-cabeça!",
    explanation: "A crosta terrestre não é uma peça única, mas sim dividida em várias 'Placas Tectônicas' que flutuam sobre o manto quente. Há milhões de anos, todos os continentes formavam um supercontinente chamado Pangeia. O movimento dessas placas cria montanhas, vulcões e terremotos.",
    objectives: [
      "Compreender a Teoria da Deriva Continental.",
      "Identificar os movimentos convergentes, divergentes e transformantes.",
      "Relacionar o movimento das placas com terremotos e vulcões."
    ],
    practicalExamples: [
      "A Cordilheira dos Andes e o Himalaia foram formados pelo choque (convergência) de placas.",
      "O fundo do Oceano Atlântico está se expandindo devido ao afastamento (divergência) de placas."
    ]
  },
  'biomas-brasileiros': {
    greeting: "Prepare-se para uma expedição pela natureza do Brasil!",
    explanation: "O Brasil possui uma diversidade incrível de paisagens, climas e seres vivos, divididos em seis grandes biomas: Amazônia, Cerrado, Caatinga, Mata Atlântica, Pantanal e Pampa. Cada um tem características únicas de flora (plantas) e fauna (animais) adaptadas ao seu ambiente.",
    objectives: [
      "Identificar os 6 principais biomas brasileiros.",
      "Compreender as características climáticas de cada bioma.",
      "Reconhecer a importância da preservação da biodiversidade."
    ],
    practicalExamples: [
      "As árvores de casca grossa do Cerrado sobrevivem a queimadas naturais.",
      "Os cactos da Caatinga armazenam água para resistir aos longos períodos de seca."
    ]
  },
  'sistema-digestorio': {
    greeting: "Vamos acompanhar a incrível jornada da sua comida!",
    explanation: "O sistema digestório transforma os alimentos que comemos em nutrientes que o corpo pode absorver. A jornada começa na boca (mastigação e saliva), desce pelo esôfago até o estômago (onde os ácidos quebram a comida), passa pelo intestino delgado (absorção de nutrientes) e termina no intestino grosso (absorção de água e formação das fezes).",
    objectives: [
      "Identificar os principais órgãos do sistema digestório.",
      "Compreender as etapas da digestão mecânica e química.",
      "Entender a importância da absorção de nutrientes."
    ],
    practicalExamples: [
      "A saliva quebrando o amido de um pedaço de pão antes mesmo de você engolir.",
      "O estômago roncando quando está vazio e se preparando para receber comida."
    ]
  },
  'sistema-respiratorio': {
    greeting: "Respire fundo! Vamos entender como o oxigênio entra no seu corpo.",
    explanation: "O sistema respiratório é responsável pelas trocas gasosas. Nós inspiramos o oxigênio (O2) do ar, que viaja pela traqueia até os pulmões, chegando aos alvéolos. Lá, o oxigênio entra no sangue e o gás carbônico (CO2) sai do sangue para ser expirado.",
    objectives: [
      "Identificar os órgãos do trato respiratório (traqueia, brônquios, pulmões).",
      "Compreender o processo de hematose (troca gasosa nos alvéolos).",
      "Entender o papel do diafragma na respiração."
    ],
    practicalExamples: [
      "Quando você corre, sua respiração acelera porque seus músculos precisam de mais oxigênio para gerar energia.",
      "O soluço é um espasmo involuntário do músculo diafragma."
    ]
  },
  'modelos-atomicos': {
    greeting: "Vamos viajar para o mundo microscópico dos átomos!",
    explanation: "Toda a matéria é feita de átomos. Ao longo da história, os cientistas criaram modelos para explicar como eles são. Dalton imaginou uma 'bola de bilhar'. Thomson descobriu os elétrons ('pudim de passas'). Rutherford descobriu o núcleo. E Bohr organizou os elétrons em órbitas de energia.",
    objectives: [
      "Conhecer a evolução histórica dos modelos atômicos.",
      "Identificar prótons, nêutrons e elétrons.",
      "Compreender a estrutura de núcleo e eletrosfera."
    ],
    practicalExamples: [
      "A eletricidade que usamos em casa é o fluxo de elétrons se movendo pelos fios.",
      "As cores dos fogos de artifício ocorrem quando os elétrons saltam entre as camadas de energia de Bohr."
    ]
  },
  'tabela-periodica': {
    greeting: "Bem-vindo ao alfabeto do Universo: a Tabela Periódica!",
    explanation: "A Tabela Periódica organiza todos os elementos químicos conhecidos pelo seu número atômico (quantidade de prótons). Elementos na mesma coluna (grupo) têm propriedades químicas semelhantes. Ela é a ferramenta mais poderosa da química!",
    objectives: [
      "Entender a organização da Tabela Periódica (grupos e períodos).",
      "Diferenciar metais, ametais e gases nobres.",
      "Localizar informações como número atômico e símbolo químico."
    ],
    practicalExamples: [
      "O Sódio (Na) e o Cloro (Cl) se unem para formar o sal de cozinha (NaCl).",
      "O gás Hélio (He) é mais leve que o ar, por isso os balões flutuam."
    ]
  },
  'ondas': {
    greeting: "Vamos surfar nas ondas da Física!",
    explanation: "Uma onda é uma perturbação que transporta energia através do espaço ou de um meio, sem transportar matéria. Ondas sonoras precisam de ar ou água para viajar, enquanto ondas eletromagnéticas (como a luz) podem viajar no vácuo do espaço.",
    objectives: [
      "Diferenciar ondas mecânicas de ondas eletromagnéticas.",
      "Compreender os conceitos de amplitude, comprimento de onda e frequência.",
      "Entender a relação entre frequência e velocidade."
    ],
    practicalExamples: [
      "O som de um violão é uma onda mecânica viajando pelo ar.",
      "A luz do Sol e o sinal do Wi-Fi são ondas eletromagnéticas."
    ]
  },
  'dna': {
    greeting: "Vamos decodificar o manual de instruções da vida!",
    explanation: "O DNA (Ácido Desoxirribonucleico) é a molécula que carrega todas as informações genéticas de um ser vivo. Ele tem o formato de uma dupla hélice, como uma escada retorcida, onde os degraus são formados por pares de bases nitrogenadas (A-T e C-G).",
    objectives: [
      "Compreender a estrutura em dupla hélice do DNA.",
      "Identificar as bases nitrogenadas (Adenina, Timina, Citosina, Guanina).",
      "Entender como o DNA armazena informações genéticas."
    ],
    practicalExamples: [
      "A cor dos seus olhos e o formato do seu cabelo estão 'escritos' no seu DNA.",
      "Testes de paternidade comparam o DNA da criança com o dos pais."
    ]
  },
  'mitose-meiose': {
    greeting: "Vamos ver como a vida se multiplica!",
    explanation: "As células precisam se dividir para que possamos crescer e nos curar. A Mitose cria duas células idênticas (para crescimento e renovação). Já a Meiose cria quatro células com metade do DNA (espermatozoides e óvulos), garantindo a diversidade genética na reprodução.",
    objectives: [
      "Diferenciar os processos de Mitose e Meiose.",
      "Compreender as fases da divisão celular (Prófase, Metáfase, Anáfase, Telófase).",
      "Entender a importância da meiose para a variabilidade genética."
    ],
    practicalExamples: [
      "Quando você rala o joelho, suas células fazem mitose para criar nova pele e curar a ferida.",
      "A meiose é o motivo pelo qual você tem características da sua mãe e do seu pai, mas não é idêntico a nenhum deles."
    ]
  },
  'mendel-lab': {
    greeting: "Bem-vindo ao laboratório de genética!",
    explanation: "Gregor Mendel descobriu as leis da hereditariedade cruzando ervilhas. Ele percebeu que algumas características são dominantes (representadas por letras maiúsculas, como 'A') e outras são recessivas (letras minúsculas, 'a'). O Quadro de Punnett nos ajuda a prever as características dos filhos com base nos genes dos pais.",
    objectives: [
      "Compreender os conceitos de gene dominante e recessivo.",
      "Diferenciar genótipo (os genes) de fenótipo (a característica visível).",
      "Utilizar o Quadro de Punnett para calcular probabilidades genéticas."
    ],
    practicalExamples: [
      "Se um pai tem olhos castanhos (dominante) e a mãe tem olhos azuis (recessivo), o Quadro de Punnett mostra a chance do filho ter olhos azuis.",
      "O cruzamento de plantas para obter flores de cores específicas."
    ]
  },
  'ciclos-biogeoquimicos': {
    greeting: "Vamos acompanhar a incrível reciclagem da natureza!",
    explanation: "Na natureza, nada se perde, tudo se transforma. Os ciclos biogeoquímicos mostram como elementos essenciais (como água, carbono e nitrogênio) circulam entre os seres vivos e o meio ambiente. No ciclo da água, por exemplo, a água evapora, condensa nas nuvens e precipita como chuva.",
    objectives: [
      "Compreender as etapas do ciclo da água (evaporação, condensação, precipitação).",
      "Entender a importância da reciclagem de nutrientes na biosfera.",
      "Reconhecer o impacto humano nesses ciclos."
    ],
    practicalExamples: [
      "A transpiração das árvores da Amazônia cria 'rios voadores' que levam chuva para outras regiões do Brasil.",
      "A queima de combustíveis fósseis libera muito carbono, alterando o ciclo natural e causando o aquecimento global."
    ]
  },
  'movimentos-terra': {
    greeting: "Vamos entender como a Terra dança no espaço!",
    explanation: "A Terra realiza movimentos constantes que afetam diretamente a nossa vida. A Rotação (giro em torno do próprio eixo) cria os dias e as noites. A Translação (giro ao redor do Sol), combinada com a inclinação do eixo terrestre, gera as estações do ano. Essa mecânica celeste também explica as fases da Lua e os eclipses.",
    objectives: [
      "Compreender os movimentos de Rotação e Translação.",
      "Relacionar a inclinação do eixo terrestre com as estações do ano.",
      "Entender a interação gravitacional do Sistema Terra-Sol-Lua."
    ],
    practicalExamples: [
      "O movimento aparente do Sol no céu e a mudança das sombras ao longo do dia.",
      "A ocorrência de eclipses solares e lunares devido ao alinhamento dos astros."
    ]
  },
  'sistema-cardiovascular': {
    greeting: "Vamos explorar a grande rede de transporte do seu corpo!",
    explanation: "O sistema cardiovascular (coração, sangue e vasos sanguíneos) é a rede logística que transporta nutrientes e oxigênio para todas as células. Ele trabalha em conjunto com o sistema imune (nosso escudo de defesa) e é diretamente afetado pelo nosso estilo de vida, podendo desenvolver Doenças Crônicas Não Transmissíveis (DCNTs) se não cuidarmos da nossa saúde.",
    objectives: [
      "Compreender o funcionamento do coração e da circulação sanguínea.",
      "Relacionar o sistema circulatório com o sistema imune e a defesa do corpo.",
      "Entender a pressão arterial e prevenir Doenças Crônicas Não Transmissíveis (DCNTs)."
    ],
    practicalExamples: [
      "Aferir a pressão arterial para monitorar a saúde do coração.",
      "Criar campanhas de conscientização sobre os riscos de dietas ultraprocessadas para o sistema cardiovascular."
    ]
  },
  'natureza-ciencia': {
    greeting: "Bem-vindo ao mundo da investigação científica!",
    explanation: "Antes de decorar fórmulas, precisamos entender como a Ciência funciona. A ciência é um processo colaborativo de investigação baseado em evidências. Neste módulo, vamos aprender o método científico, o papel da tecnologia e, principalmente, como avaliar a confiabilidade das fontes para combater a desinformação e as fake news.",
    objectives: [
      "Compreender as etapas do processo de investigação científica.",
      "Avaliar criticamente a confiabilidade de fontes de informação.",
      "Combater a desinformação e as fake news nas Ciências da Natureza."
    ],
    practicalExamples: [
      "Analisar uma notícia de rede social para verificar se possui embasamento científico.",
      "Entender que a ciência é uma construção histórica e colaborativa, não uma verdade absoluta."
    ]
  },
  'reacoes-quimicas': {
    greeting: "Vamos descobrir a matemática por trás das transformações da matéria!",
    explanation: "A química não é mágica, é exata! Quando substâncias reagem, os átomos se reorganizam para formar novos produtos. As Leis Ponderais provam isso: a Lei de Lavoisier mostra que na natureza nada se perde (conservação das massas) e a Lei de Proust mostra que as reações ocorrem em proporções definidas.",
    objectives: [
      "Identificar reagentes, produtos e transformações químicas.",
      "Aplicar a Lei de Conservação das Massas (Lavoisier).",
      "Aplicar a Lei das Proporções Definidas (Proust)."
    ],
    practicalExamples: [
      "A ferrugem em um prego é uma reação química entre o ferro e o oxigênio.",
      "Ao queimar papel em um recipiente fechado, a massa total não muda (Lavoisier)."
    ]
  },
  'biotecnologia': {
    greeting: "Bem-vindo à engenharia da vida!",
    explanation: "A Biotecnologia é o uso de conhecimentos genéticos para manipular a vida. Começamos com a seleção artificial (cruzamentos) e hoje usamos a engenharia genética para criar Organismos Geneticamente Modificados (OGMs), transgênicos e clones. Mas com grande poder vem grande responsabilidade: a Bioética dita os limites dessas tecnologias.",
    objectives: [
      "Diferenciar OGMs de organismos transgênicos.",
      "Compreender os processos de clonagem e seleção artificial.",
      "Debater os limites da manipulação genética usando princípios de Bioética."
    ],
    practicalExamples: [
      "A produção de insulina humana por bactérias geneticamente modificadas.",
      "A criação de sementes transgênicas resistentes a pragas na agricultura."
    ]
  },
  'evolucao': {
    greeting: "Vamos desvendar a história da vida na Terra!",
    explanation: "A Evolução explica como a biodiversidade surgiu. Estudaremos a história do pensamento evolutivo, comparando as ideias de Lamarck e Darwin. Veremos como a Seleção Natural atua sobre a variabilidade genética (DNA), selecionando os indivíduos mais aptos a sobreviver às pressões do ambiente ao longo de milhões de anos.",
    objectives: [
      "Comparar as teorias evolutivas de Lamarck e Darwin.",
      "Compreender o mecanismo da Seleção Natural e a pressão ambiental.",
      "Interpretar cladogramas e relações filogenéticas."
    ],
    practicalExamples: [
      "A resistência de bactérias a antibióticos é um exemplo de seleção natural em tempo real.",
      "O formato dos bicos dos tentilhões de Galápagos adaptados a diferentes tipos de alimentos."
    ]
  },
  'fluxo-energia': {
    greeting: "Vamos rastrear a energia que move o nosso planeta!",
    explanation: "No Ensino Médio, a ecologia se torna sistêmica. O fluxo de matéria e energia começa na fotossíntese e viaja pelas cadeias alimentares. Entender esse metabolismo energético é crucial para prever os impactos das intervenções humanas nos ecossistemas e planejar o uso consciente dos recursos naturais.",
    objectives: [
      "Compreender o fluxo de matéria e energia nas cadeias e teias alimentares.",
      "Relacionar fotossíntese e respiração celular ao metabolismo dos ecossistemas.",
      "Avaliar os impactos das intervenções humanas nos ciclos naturais."
    ],
    practicalExamples: [
      "A energia do Sol sendo convertida em açúcar pelas plantas e depois consumida por herbívoros.",
      "A análise de como o desmatamento interrompe o fluxo de energia em um bioma."
    ]
  },
  'mudancas-climaticas': {
    greeting: "O clima está mudando. Vamos entender a ciência por trás da crise!",
    explanation: "O efeito estufa é um fenômeno natural essencial para a vida, mas a queima massiva de combustíveis fósseis e o desmatamento estão intensificando esse processo. O resultado é o Aquecimento Global e eventos climáticos extremos. A solução exige uma transição energética urgente e o cumprimento da Agenda 2030.",
    objectives: [
      "Diferenciar o efeito estufa natural do aquecimento global antrópico.",
      "Analisar as consequências das emissões de gases de efeito estufa.",
      "Propor soluções baseadas na Agenda 2030 e políticas públicas sustentáveis."
    ],
    practicalExamples: [
      "O aumento da frequência de secas severas e enchentes devido ao desequilíbrio climático.",
      "A criação de campanhas de conscientização sobre a redução da pegada de carbono."
    ]
  },
  'fontes-energia': {
    greeting: "Vamos analisar as matrizes energéticas que sustentam a sociedade!",
    explanation: "Para combater a crise climática, precisamos de energia limpa. Mas toda energia tem um custo. Vamos analisar criticamente as fontes renováveis e não renováveis, comparando as matrizes energéticas brasileira e mundial. Avaliaremos a eficiência, os custos e os impactos socioambientais da geração e distribuição de eletricidade.",
    objectives: [
      "Classificar as fontes de energia em renováveis e não renováveis.",
      "Analisar comparativamente as matrizes energéticas brasileira e mundial.",
      "Avaliar os impactos socioambientais da infraestrutura energética."
    ],
    practicalExamples: [
      "A construção de uma usina hidrelétrica gera energia limpa, mas alaga grandes áreas e afeta comunidades locais.",
      "A instalação de painéis solares como alternativa sustentável de eficiência energética."
    ]
  },
  'poluicao-saude': {
    greeting: "Como a poluição do planeta afeta o seu corpo?",
    explanation: "A poluição ambiental não afeta apenas a natureza; ela é uma questão de saúde pública. Veremos como a poluição atmosférica prejudica os sistemas respiratório e cardiovascular. Além disso, estudaremos a bioacumulação e biomagnificação de agrotóxicos, que contaminam a cadeia alimentar e chegam até o nosso prato.",
    objectives: [
      "Reconhecer os impactos sistêmicos da poluição na saúde humana.",
      "Compreender os processos de bioacumulação e biomagnificação.",
      "Avaliar os riscos dos defensivos agrícolas (agrotóxicos) na cadeia alimentar."
    ],
    practicalExamples: [
      "O acúmulo de metais pesados, como mercúrio, em peixes no topo da cadeia alimentar.",
      "O aumento de doenças cardiovasculares em populações expostas a altos níveis de poluição do ar."
    ]
  },
  'ciclo-celular-cancer': {
    greeting: "Vamos entender a linha tênue entre a cura e a doença nas células.",
    explanation: "A mitose é essencial para o crescimento e a regeneração dos tecidos. No entanto, quando o DNA sofre mutações (como as causadas por radiação ionizante), a célula perde o controle da divisão. O câncer não é um invasor externo, mas sim o nosso próprio ciclo celular ocorrendo de forma descontrolada.",
    objectives: [
      "Relacionar a mitose à manutenção dos tecidos e à origem de cânceres.",
      "Compreender como mutações no DNA afetam o ciclo celular.",
      "Avaliar os riscos da radiação ionizante como agente mutagênico."
    ],
    practicalExamples: [
      "A exposição excessiva aos raios UV do Sol causando mutações no DNA das células da pele.",
      "O uso da radioterapia na medicina, onde a radiação é usada de forma controlada para destruir tumores."
    ]
  },
  'intervencoes-ecossistemas': {
    greeting: "Qual é o preço do nosso modelo de desenvolvimento?",
    explanation: "As intervenções humanas (desmatamento, mineração, monoculturas) desestabilizam a biosfera. A perda de habitat destrói serviços ecossistêmicos e é o gatilho direto para o surgimento de zoonoses (doenças transmitidas de animais para humanos). A preservação da biodiversidade é a nossa maior barreira sanitária.",
    objectives: [
      "Avaliar os impactos de práticas humanas extremas nos ecossistemas.",
      "Relacionar a perda de habitat ao surgimento de zoonoses.",
      "Propor práticas de conservação e manejo da biodiversidade."
    ],
    practicalExamples: [
      "O desmatamento forçando animais silvestres a migrarem para áreas urbanas, trazendo novos vírus.",
      "A crise hídrica causada pela destruição de matas ciliares e nascentes."
    ]
  },
  'simulado-interativo': {
    greeting: "Hora de testar seus conhecimentos para o ENEM!",
    explanation: "O Exame Nacional do Ensino Médio (ENEM) exige não apenas decoreba, mas a capacidade de relacionar conceitos de Biologia, Física e Química com situações do dia a dia. Este simulado traz questões no formato do exame para você treinar e revisar o que aprendeu.",
    objectives: [
      "Revisar conceitos-chave das Ciências da Natureza.",
      "Praticar a interpretação de questões estilo ENEM.",
      "Identificar pontos fortes e áreas que precisam de mais estudo."
    ],
    practicalExamples: [
      "Leia o enunciado com atenção e grife as palavras-chave.",
      "Use as explicações após cada questão para entender o porquê da resposta correta."
    ]
  }
};
