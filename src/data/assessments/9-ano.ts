import { GradeAssessments } from '../types';

export const grade9Assessments: GradeAssessments = {
  bimester1: {
    id: 'bim1',
    title: 'Avaliação do 1º Bimestre',
    description: 'Teste seus conhecimentos sobre Modelos Atômicos e Tabela Periódica.',
    questions: [
      {
        id: 'q1',
        text: 'A evolução dos modelos atômicos reflete o avanço da ciência. O modelo de Dalton (1808) propunha que os átomos eram esferas maciças e indivisíveis. Qual fenômeno conhecido na época esse modelo NÃO conseguia explicar?',
        options: [
          'A conservação da massa nas reações químicas (Lei de Lavoisier).',
          'As proporções fixas nas quais os elementos se combinam (Lei de Proust).',
          'A natureza elétrica da matéria, como a eletrização por atrito.',
          'O fato de que a matéria ocupa lugar no espaço.'
        ],
        correctAnswer: 2,
        explanation: 'O modelo de Dalton ("bola de bilhar") não previa a existência de cargas elétricas (prótons e elétrons), portanto, não conseguia explicar fenômenos elétricos já observados na época.'
      },
      {
        id: 'q2',
        text: 'J.J. Thomson, ao estudar os raios catódicos, fez uma descoberta que derrubou a ideia de que o átomo era a menor partícula existente. O que ele descobriu e como ficou conhecido seu modelo?',
        options: [
          'Descobriu o núcleo; modelo do "Sistema Planetário".',
          'Descobriu o elétron (partícula negativa); modelo do "Pudim de Passas".',
          'Descobriu o nêutron; modelo da "Nuvem Eletrônica".',
          'Descobriu o próton; modelo da "Bola de Bilhar".'
        ],
        correctAnswer: 1,
        explanation: 'Thomson descobriu que os raios catódicos eram formados por partículas negativas menores que o átomo (elétrons). Seu modelo propunha uma esfera positiva com elétrons incrustados.'
      },
      {
        id: 'q3',
        text: 'O famoso experimento de Rutherford envolveu o bombardeamento de uma finíssima folha de ouro com partículas alfa (positivas). O fato de a grande maioria das partículas atravessar a folha sem desvio o levou a concluir que:',
        options: [
          'O átomo é uma esfera maciça e impenetrável.',
          'Os elétrons estão concentrados no centro do átomo.',
          'O átomo é composto majoritariamente por espaços vazios (a eletrosfera).',
          'A folha de ouro era defeituosa e cheia de buracos visíveis.'
        ],
        correctAnswer: 2,
        explanation: 'Como a maioria das partículas alfa passou direto, Rutherford concluiu que o átomo não era maciço, mas sim formado por um imenso espaço vazio onde os elétrons orbitam um núcleo minúsculo.'
      },
      {
        id: 'q4',
        text: 'Niels Bohr aprimorou o modelo de Rutherford aplicando conceitos da física quântica. Segundo Bohr, o que acontece quando um elétron absorve energia?',
        options: [
          'Ele cai em direção ao núcleo e o átomo colapsa.',
          'Ele salta para uma camada (órbita) mais externa e energética; ao retornar, libera essa energia na forma de luz (fóton).',
          'Ele se transforma em um próton para equilibrar a carga.',
          'Ele para de girar e permanece estático na eletrosfera.'
        ],
        correctAnswer: 1,
        explanation: 'Bohr postulou que os elétrons ocupam níveis de energia quantizados. Ao absorver energia, o elétron "salta" para um nível superior (estado excitado). Ao voltar ao estado fundamental, emite luz (ex: fogos de artifício, letreiros de neon).'
      },
      {
        id: 'q5',
        text: 'O núcleo atômico é extremamente pequeno e denso. Apesar de conter prótons (que têm carga positiva e deveriam se repelir), o núcleo não se desintegra. Qual partícula, descoberta por Chadwick em 1932, é fundamental para a estabilidade do núcleo?',
        options: [
          'O elétron, que neutraliza a carga dos prótons.',
          'O fóton, que atua como uma "cola" luminosa.',
          'O nêutron, que não tem carga elétrica e ajuda a diminuir a repulsão entre os prótons.',
          'O pósitron, que atrai os prótons para o centro.'
        ],
        correctAnswer: 2,
        explanation: 'Os nêutrons (partículas sem carga) atuam como um "isolante" no núcleo, aumentando a força nuclear forte e diminuindo a repulsão eletromagnética entre os prótons.'
      },
      {
        id: 'q6',
        text: 'Um átomo é considerado eletricamente neutro quando:',
        options: [
          'Não possui nem prótons nem elétrons.',
          'O número de nêutrons é igual ao número de prótons.',
          'O número de prótons (cargas positivas) é exatamente igual ao número de elétrons (cargas negativas).',
          'Ele perde todos os seus elétrons da camada de valência.'
        ],
        correctAnswer: 2,
        explanation: 'A neutralidade elétrica ocorre porque as cargas positivas do núcleo (prótons) são anuladas pela mesma quantidade de cargas negativas na eletrosfera (elétrons). Se houver desequilíbrio, o átomo se torna um íon.'
      },
      {
        id: 'q7',
        text: 'A Tabela Periódica moderna, baseada nos trabalhos de Moseley, organiza os elementos químicos de acordo com uma propriedade fundamental. Qual é essa propriedade?',
        options: [
          'Massa atômica crescente (A).',
          'Número atômico crescente (Z), que corresponde ao número de prótons no núcleo.',
          'Ordem alfabética de seus símbolos químicos.',
          'Data de descoberta do elemento.'
        ],
        correctAnswer: 1,
        explanation: 'Diferente de Mendeleev (que usou a massa atômica), Moseley descobriu que as propriedades dos elementos são funções periódicas de seus números atômicos (quantidade de prótons), corrigindo várias anomalias da tabela anterior.'
      },
      {
        id: 'q8',
        text: 'Na Tabela Periódica, os elementos estão dispostos em linhas horizontais (períodos) e colunas verticais (grupos ou famílias). O que os elementos de um mesmo GRUPO (coluna) têm em comum?',
        options: [
          'O mesmo número total de elétrons.',
          'O mesmo número de camadas eletrônicas (níveis de energia).',
          'O mesmo número de elétrons na camada mais externa (camada de valência), o que lhes confere propriedades químicas semelhantes.',
          'O mesmo estado físico (sólido, líquido ou gasoso) em qualquer temperatura.'
        ],
        correctAnswer: 2,
        explanation: 'A semelhança química entre elementos de uma mesma família (ex: Halogênios, Metais Alcalinos) ocorre porque eles possuem a mesma configuração eletrônica na sua última camada, definindo como eles reagem com outros elementos.'
      },
      {
        id: 'q9',
        text: 'Os Gases Nobres (Grupo 18 da Tabela Periódica), como o Hélio, Neônio e Argônio, são conhecidos por sua baixíssima reatividade química. Qual característica atômica explica essa estabilidade?',
        options: [
          'Eles não possuem elétrons na eletrosfera.',
          'Eles possuem a camada de valência completa (geralmente com 8 elétrons, regra do octeto), não precisando ganhar, perder ou compartilhar elétrons.',
          'Eles são formados apenas por nêutrons.',
          'Eles têm uma massa atômica muito elevada, o que os torna inertes.'
        ],
        correctAnswer: 1,
        explanation: 'A estabilidade química está ligada à configuração eletrônica. Os gases nobres já possuem a configuração ideal (camada de valência cheia), sendo o modelo de estabilidade que outros átomos buscam alcançar através de ligações químicas.'
      },
      {
        id: 'q10',
        text: 'Se analisarmos um elemento localizado no 3º período e no Grupo 1 (Metais Alcalinos) da Tabela Periódica (como o Sódio - Na), o que podemos afirmar sobre a estrutura do seu átomo?',
        options: [
          'Ele possui 1 camada eletrônica e 3 elétrons na camada de valência.',
          'Ele possui 3 camadas eletrônicas e 1 elétron na camada de valência.',
          'Ele possui 3 prótons e 1 nêutron.',
          'Ele é um gás nobre com 3 elétrons.'
        ],
        correctAnswer: 1,
        explanation: 'O período (linha horizontal) indica o número de camadas eletrônicas (K, L, M = 3 camadas). O grupo (coluna vertical, para os elementos representativos) indica o número de elétrons na última camada (Grupo 1 = 1 elétron de valência).'
      }
    ]
  },
  bimester2: {
    id: 'bim2',
    title: 'Avaliação do 2º Bimestre',
    description: 'Teste seus conhecimentos sobre Genética, DNA e Leis de Mendel.',
    questions: [
      {
        id: 'q1',
        text: 'O DNA (Ácido Desoxirribonucleico) é a molécula que armazena a informação genética. Sua estrutura em dupla hélice é formada por nucleotídeos. Quais são os três componentes básicos de um nucleotídeo de DNA?',
        options: [
          'Um aminoácido, um lipídio e uma base nitrogenada.',
          'Um grupo fosfato, um açúcar (desoxirribose) e uma base nitrogenada (A, T, C ou G).',
          'Uma proteína, um carboidrato e uma vitamina.',
          'Um grupo sulfato, um açúcar (ribose) e uma base nitrogenada (A, U, C ou G).'
        ],
        correctAnswer: 1,
        explanation: 'O "esqueleto" da fita de DNA é formado pela alternância de fosfato e açúcar (desoxirribose), enquanto os "degraus" da escada são formados pelas bases nitrogenadas pareadas.'
      },
      {
        id: 'q2',
        text: 'A regra de pareamento de bases de Chargaff é fundamental para a estrutura da dupla hélice do DNA e para a sua replicação. Segundo essa regra, como as bases nitrogenadas se ligam entre as duas fitas?',
        options: [
          'Adenina (A) liga-se com Citosina (C); Timina (T) liga-se com Guanina (G).',
          'Adenina (A) liga-se com Adenina (A); Citosina (C) liga-se com Citosina (C).',
          'Adenina (A) liga-se exclusivamente com Timina (T); Citosina (C) liga-se exclusivamente com Guanina (G).',
          'As bases se ligam de forma aleatória, dependendo da temperatura.'
        ],
        correctAnswer: 2,
        explanation: 'O pareamento é estrito devido à forma e ao número de pontes de hidrogênio que se formam: A sempre com T (2 pontes) e C sempre com G (3 pontes). Isso garante que uma fita sirva de molde exato para a outra.'
      },
      {
        id: 'q3',
        text: 'Um gene é frequentemente definido como a unidade fundamental da hereditariedade. Em termos moleculares, o que é exatamente um gene?',
        options: [
          'Uma molécula inteira de DNA enrolada em forma de cromossomo.',
          'Uma sequência específica de nucleotídeos no DNA que contém as instruções (o código) para a síntese de uma proteína ou molécula de RNA funcional.',
          'Uma proteína que determina a cor dos olhos ou do cabelo.',
          'O núcleo da célula onde o DNA está armazenado.'
        ],
        correctAnswer: 1,
        explanation: 'O DNA é como um imenso manual de instruções. Um gene é um "capítulo" específico desse manual que ensina a célula a fabricar uma proteína específica, que por sua vez determinará uma característica (fenótipo).'
      },
      {
        id: 'q4',
        text: 'Gregor Mendel, através de seus experimentos com ervilhas, formulou a Primeira Lei da Genética (Lei da Segregação). Qual é o princípio central dessa lei?',
        options: [
          'As características dos pais se misturam nos filhos, como tintas formando uma nova cor.',
          'Cada característica é determinada por um par de fatores (alelos) que se separam (segregam) durante a formação dos gametas, de modo que cada gameta recebe apenas um fator de cada par.',
          'As características adquiridas durante a vida de um organismo são passadas para seus descendentes.',
          'Apenas as características do pai são transmitidas para a prole.'
        ],
        correctAnswer: 1,
        explanation: 'Mendel deduziu que herdamos duas cópias de cada gene (uma do pai, outra da mãe). Na hora de formarmos nossos próprios espermatozoides ou óvulos (meiose), essas cópias se separam, garantindo a variabilidade genética.'
      },
      {
        id: 'q5',
        text: 'Na genética mendeliana, os termos "dominante" e "recessivo" são cruciais. O que caracteriza um alelo recessivo?',
        options: [
          'É o alelo que causa doenças genéticas graves.',
          'É o alelo que é menos comum na população geral.',
          'É o alelo cuja característica só se manifesta no fenótipo se o indivíduo possuir duas cópias dele (homozigoto recessivo, ex: "aa").',
          'É o alelo que sempre determina a aparência do indivíduo, independentemente do outro alelo presente.'
        ],
        correctAnswer: 2,
        explanation: 'Um alelo recessivo fica "escondido" (mascarado) se estiver na presença de um alelo dominante (heterozigoto, ex: "Aa"). Ele só expressa sua característica se o indivíduo herdar o alelo recessivo de ambos os pais ("aa").'
      },
      {
        id: 'q6',
        text: 'A cor das sementes de ervilha pode ser amarela (alelo dominante V) ou verde (alelo recessivo v). Qual será o fenótipo de uma planta com o genótipo Vv (heterozigota)?',
        options: [
          'Sementes verdes.',
          'Sementes amarelas com manchas verdes.',
          'Sementes de uma cor intermediária (verde-amarelada).',
          'Sementes amarelas.'
        ],
        correctAnswer: 3,
        explanation: 'Como o alelo V (amarelo) é dominante sobre o v (verde), a presença de apenas um alelo V no genótipo heterozigoto (Vv) é suficiente para que a semente seja amarela. O traço verde fica oculto.'
      },
      {
        id: 'q7',
        text: 'Qual é a diferença fundamental entre os conceitos de Genótipo e Fenótipo?',
        options: [
          'Genótipo refere-se às características físicas visíveis; Fenótipo refere-se aos genes ocultos.',
          'Genótipo é a constituição genética de um indivíduo (os alelos que ele possui, ex: Aa); Fenótipo é a expressão observável dessas características (ex: cor dos olhos), que pode ser influenciada pelo ambiente.',
          'Genótipo muda ao longo da vida do indivíduo; Fenótipo permanece inalterado desde o nascimento.',
          'Não há diferença, são sinônimos na biologia moderna.'
        ],
        correctAnswer: 1,
        explanation: 'O genótipo é o "código fonte" (o DNA). O fenótipo é o "software rodando" (a aparência, o comportamento, a fisiologia), que é o resultado da interação do genótipo com os fatores ambientais (nutrição, exposição ao sol, etc.).'
      },
      {
        id: 'q8',
        text: 'Em humanos, o albinismo é uma condição genética determinada por um alelo recessivo (a), enquanto a pigmentação normal é dominante (A). Se um casal, ambos com pigmentação normal mas heterozigotos (Aa), tiver um filho, qual a probabilidade de a criança ser albina?',
        options: [
          '0%',
          '25%',
          '50%',
          '75%'
        ],
        correctAnswer: 1,
        explanation: 'Fazendo o cruzamento (Aa x Aa) no Quadro de Punnett, os possíveis genótipos para o filho são: AA (25%), Aa (50%) e aa (25%). Apenas o genótipo "aa" resulta no fenótipo albino.'
      },
      {
        id: 'q9',
        text: 'O que são cromossomos homólogos?',
        options: [
          'Cromossomos que possuem exatamente a mesma sequência de DNA, letra por letra.',
          'Pares de cromossomos (um herdado do pai e outro da mãe) que possuem o mesmo tamanho, formato e contêm genes para as mesmas características nas mesmas posições (loci).',
          'Cromossomos que determinam o sexo biológico do indivíduo (X e Y).',
          'Cromossomos que sofreram mutações e não funcionam mais.'
        ],
        correctAnswer: 1,
        explanation: 'Células diploides (como as nossas) têm cromossomos aos pares. Os homólogos trazem informações para as mesmas características (ex: cor do cabelo), mas os alelos podem ser diferentes (ex: um para cabelo escuro, outro para claro).'
      },
      {
        id: 'q10',
        text: 'A divisão celular que ocorre na formação dos gametas (espermatozoides e óvulos) é fundamental para a manutenção do número de cromossomos da espécie ao longo das gerações. Como se chama esse processo e qual o seu resultado?',
        options: [
          'Mitose; resulta em duas células com o mesmo número de cromossomos da célula original (diploides).',
          'Meiose; resulta em quatro células com a metade do número de cromossomos da célula original (haploides).',
          'Fecundação; resulta na união de duas células para formar um zigoto.',
          'Clonagem; resulta em cópias idênticas do organismo.'
        ],
        correctAnswer: 1,
        explanation: 'A meiose reduz a ploidia pela metade (de 2n para n). Em humanos, uma célula com 46 cromossomos gera gametas com 23. Assim, quando espermatozoide (23) e óvulo (23) se unem, o zigoto volta a ter 46 cromossomos.'
      }
    ]
  }
};
