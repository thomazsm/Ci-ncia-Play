import { GradeAssessments } from '../types';

export const grade6Assessments: GradeAssessments = {
  bimester1: {
    id: 'bim1',
    title: 'Avaliação do 1º Bimestre',
    description: 'Teste seus conhecimentos sobre a Terra, o Universo e a estrutura do nosso planeta.',
    questions: [
      {
        id: 'q1',
        text: 'A teoria do Big Bang é frequentemente descrita como uma "explosão", mas na astrofísica moderna, ela é mais precisamente compreendida como:',
        options: [
          'Uma colisão cataclísmica entre duas galáxias primordiais que gerou toda a matéria.',
          'Um processo contínuo de expansão do espaço-tempo a partir de um estado de altíssima densidade e temperatura.',
          'A queima instantânea de gases hidrogênio e hélio no centro do universo observável.',
          'Um evento cíclico de contração e expansão térmica que ocorre a cada bilhão de anos.'
        ],
        correctAnswer: 1,
        explanation: 'O Big Bang não foi uma explosão no espaço, mas sim a expansão do próprio espaço a partir de um estado inicial extremamente denso e quente.'
      },
      {
        id: 'q2',
        text: 'Ao observar o Sistema Solar, notamos que os planetas rochosos estão mais próximos do Sol, enquanto os gigantes gasosos estão mais distantes. Isso ocorre principalmente porque:',
        options: [
          'A força gravitacional do Sol atrai materiais mais pesados (rochas) para perto e repele os gases para longe.',
          'Os planetas gasosos se formaram primeiro e empurraram os planetas rochosos para o centro do sistema.',
          'O vento solar e as altas temperaturas varreram os gases leves para a periferia do sistema durante sua formação.',
          'Os asteroides do cinturão principal bloquearam a passagem de gases para a região interna do Sistema Solar.'
        ],
        correctAnswer: 2,
        explanation: 'Durante a formação do Sistema Solar, o calor do jovem Sol e o vento solar empurraram os elementos mais leves (gases) para longe, permitindo que apenas materiais sólidos e densos formassem planetas próximos.'
      },
      {
        id: 'q3',
        text: 'O tempo geológico é medido em escalas de milhões ou bilhões de anos. Qual evento marca a transição da Terra Primitiva para um planeta capaz de abrigar as primeiras formas de vida?',
        options: [
          'O resfriamento da crosta terrestre e a consequente formação dos primeiros oceanos de água líquida.',
          'A extinção dos grandes répteis, que abriu espaço para o desenvolvimento de microrganismos.',
          'A separação do supercontinente Pangeia em massas de terra menores.',
          'O surgimento da camada de ozônio, que ocorreu logo após a formação do núcleo metálico.'
        ],
        correctAnswer: 0,
        explanation: 'A vida como conhecemos depende de água líquida. O resfriamento da Terra permitiu a condensação do vapor d\'água e a formação dos oceanos primordiais, berço das primeiras células.'
      },
      {
        id: 'q4',
        text: 'Durante o movimento de translação da Terra, observamos a ocorrência dos solstícios e equinócios. Um equinócio é caracterizado por:',
        options: [
          'Dias significativamente mais longos que as noites no hemisfério sul.',
          'A inclinação máxima do eixo da Terra em direção ao Sol, gerando o verão.',
          'Distribuição igualitária da luz solar entre os dois hemisférios, resultando em dias e noites com a mesma duração.',
          'O momento em que a Terra atinge o ponto mais distante de sua órbita elíptica.'
        ],
        correctAnswer: 2,
        explanation: 'No equinócio (do latim "noite igual"), os raios solares incidem perpendicularmente à Linha do Equador, fazendo com que o dia e a noite tenham durações iguais em todo o planeta.'
      },
      {
        id: 'q5',
        text: 'A ocorrência de eclipses solares e lunares não acontece todos os meses porque:',
        options: [
          'A Lua emite luz própria em algumas épocas do ano, ofuscando a sombra da Terra.',
          'O plano da órbita da Lua ao redor da Terra é ligeiramente inclinado em relação ao plano da órbita da Terra ao redor do Sol.',
          'A velocidade de rotação da Terra varia, desencontrando o alinhamento perfeito.',
          'O Sol muda de posição no centro do Sistema Solar durante as mudanças de estação.'
        ],
        correctAnswer: 1,
        explanation: 'A órbita lunar tem uma inclinação de cerca de 5 graus em relação à órbita terrestre (eclíptica). Eclipses só ocorrem quando a Lua cruza esse plano (nodos) durante as fases Nova ou Cheia.'
      },
      {
        id: 'q6',
        text: 'A litosfera terrestre não é uma casca contínua, mas sim fragmentada em placas tectônicas. O movimento dessas placas é impulsionado principalmente por:',
        options: [
          'Correntes de convecção no manto terrestre, geradas pelo calor interno do planeta.',
          'A atração gravitacional exercida pela Lua sobre a crosta sólida.',
          'A rotação acelerada do núcleo interno de ferro sólido.',
          'O impacto constante de meteoritos na superfície ao longo de milhões de anos.'
        ],
        correctAnswer: 0,
        explanation: 'O magma no manto aquece, fica menos denso e sobe; ao esfriar perto da crosta, desce. Esse ciclo (correntes de convecção) funciona como uma esteira rolante que move as placas tectônicas.'
      },
      {
        id: 'q7',
        text: 'Ao analisar a estrutura interna da Terra, os cientistas utilizam ondas sísmicas. O que a mudança de velocidade dessas ondas revela sobre o Núcleo Externo?',
        options: [
          'Que ele é composto de rochas sedimentares altamente compactadas.',
          'Que ele se encontra no estado líquido, pois certos tipos de ondas sísmicas não se propagam em líquidos.',
          'Que ele é oco e preenchido por gases nobres sob alta pressão.',
          'Que sua temperatura é inferior à da crosta terrestre.'
        ],
        correctAnswer: 1,
        explanation: 'As ondas sísmicas "S" (secundárias) não atravessam meios líquidos. Como elas não são detectadas no lado oposto do planeta após um terremoto, conclui-se que o núcleo externo é líquido.'
      },
      {
        id: 'q8',
        text: 'A gravidade é a força que mantém os planetas em órbita. Se a massa do Sol dobrasse repentinamente, o que aconteceria com a órbita da Terra (assumindo que a velocidade da Terra não mudasse)?',
        options: [
          'A Terra escaparia do Sistema Solar em uma linha reta.',
          'A órbita não sofreria alteração, pois a massa da Terra continuaria a mesma.',
          'A Terra seria atraída com mais força, espiralando em direção ao Sol ou assumindo uma órbita muito mais próxima.',
          'A Terra passaria a girar no sentido anti-horário.'
        ],
        correctAnswer: 2,
        explanation: 'A força gravitacional é diretamente proporcional à massa dos corpos. Com o dobro da massa solar, a atração seria muito maior, puxando a Terra para uma órbita mais interna ou até mesmo para uma colisão.'
      },
      {
        id: 'q9',
        text: 'O método científico baseia-se na observação, formulação de hipóteses e experimentação. Uma hipótese científica deve ser, obrigatoriamente:',
        options: [
          'Uma verdade absoluta e inquestionável desde o início.',
          'Testável e passível de ser refutada (falsificável) através de experimentos ou observações.',
          'Aprovada por um conselho de cientistas antes de ser formulada.',
          'Baseada em crenças populares para ter relevância social.'
        ],
        correctAnswer: 1,
        explanation: 'Uma hipótese é uma explicação provisória. Para ser científica, deve ser possível desenhar um teste que possa provar que ela está errada (falsificabilidade).'
      },
      {
        id: 'q10',
        text: 'A biosfera é a camada da Terra onde existe vida. Ela é um sistema complexo que depende da interação direta entre:',
        options: [
          'Apenas a hidrosfera e a atmosfera, pois o solo é inerte.',
          'O núcleo interno e o manto, que fornecem calor para os seres vivos.',
          'A litosfera (solo/rochas), a hidrosfera (água) e a atmosfera (gases).',
          'O vácuo espacial e a camada de ozônio.'
        ],
        correctAnswer: 2,
        explanation: 'A biosfera não é uma camada isolada, mas a intersecção onde a água (hidrosfera), o ar (atmosfera) e o solo (litosfera) se encontram e criam condições para a vida.'
      }
    ]
  },
  bimester2: {
    id: 'bim2',
    title: 'Avaliação do 2º Bimestre',
    description: 'Teste seus conhecimentos sobre Matéria, Energia e Estados Físicos.',
    questions: [
      {
        id: 'q1',
        text: 'A matéria pode ser classificada em substâncias puras ou misturas. Uma substância pura se diferencia de uma mistura porque:',
        options: [
          'Possui propriedades físicas constantes, como ponto de fusão e ebulição bem definidos.',
          'É sempre encontrada no estado sólido na natureza.',
          'Pode ser separada em seus componentes por métodos físicos simples, como filtração.',
          'É formada por apenas um tipo de átomo, independentemente das moléculas.'
        ],
        correctAnswer: 0,
        explanation: 'Substâncias puras (como a água destilada) mudam de estado físico em temperaturas exatas e constantes. Misturas (como água com sal) têm pontos de fusão e ebulição variáveis.'
      },
      {
        id: 'q2',
        text: 'Ao preparar um café coado, utilizamos água quente para extrair os compostos do pó de café e, em seguida, passamos o líquido por um filtro de papel. Os processos de separação de misturas envolvidos são, respectivamente:',
        options: [
          'Decantação e Evaporação.',
          'Extração e Filtração.',
          'Destilação e Centrifugação.',
          'Sublimação e Catação.'
        ],
        correctAnswer: 1,
        explanation: 'A água quente "extrai" os compostos solúveis do pó (extração). O filtro de papel separa a parte líquida da parte sólida insolúvel (filtração).'
      },
      {
        id: 'q3',
        text: 'O ciclo da água é fundamental para a manutenção da vida. A etapa em que a água passa do estado gasoso para o líquido, formando as nuvens, é chamada de:',
        options: [
          'Evapotranspiração.',
          'Infiltração.',
          'Condensação.',
          'Precipitação.'
        ],
        correctAnswer: 2,
        explanation: 'O vapor d\'água quente sobe, encontra camadas mais frias na atmosfera, perde calor e se condensa, voltando ao estado líquido em forma de gotículas que compõem as nuvens.'
      },
      {
        id: 'q4',
        text: 'O granito é uma rocha muito utilizada em pias e pisos. Ao observá-lo, notamos diferentes "pedrinhas" de cores distintas (quartzo, feldspato e mica). Classificamos o granito como:',
        options: [
          'Uma substância pura simples.',
          'Uma mistura homogênea.',
          'Uma mistura heterogênea.',
          'Uma substância pura composta.'
        ],
        correctAnswer: 2,
        explanation: 'Como podemos ver visualmente os diferentes componentes (fases) que formam o granito, ele é classificado como uma mistura heterogênea sólida.'
      },
      {
        id: 'q5',
        text: 'As rochas sedimentares frequentemente contêm fósseis. Isso ocorre porque o processo de formação dessas rochas envolve:',
        options: [
          'O resfriamento rápido de lava vulcânica, aprisionando os animais instantaneamente.',
          'A deposição lenta e contínua de camadas de sedimentos, que soterram restos de organismos antes que se decomponham totalmente.',
          'A exposição de rochas antigas a altas pressões e temperaturas no interior da crosta.',
          'A cristalização de minerais em cavernas profundas.'
        ],
        correctAnswer: 1,
        explanation: 'Fósseis se formam quando restos de seres vivos são rapidamente cobertos por sedimentos (areia, lama). Com o tempo, esses sedimentos se compactam e viram rochas sedimentares, preservando o molde ou os restos do organismo.'
      },
      {
        id: 'q6',
        text: 'Durante o processo de destilação simples, utilizado para separar misturas homogêneas de sólido e líquido (como água e sal), ocorrem duas mudanças de estado físico em sequência. São elas:',
        options: [
          'Fusão seguida de Solidificação.',
          'Vaporização seguida de Condensação.',
          'Sublimação seguida de Fusão.',
          'Condensação seguida de Evaporação.'
        ],
        correctAnswer: 1,
        explanation: 'Na destilação, a mistura é aquecida até o líquido virar vapor (vaporização). Esse vapor passa por um tubo resfriado, onde volta a ser líquido (condensação) e é recolhido em outro frasco.'
      },
      {
        id: 'q7',
        text: 'O modelo de partículas explica os estados físicos da matéria. Em um gás contido em um balão, as partículas estão:',
        options: [
          'Fortemente unidas, vibrando em posições fixas.',
          'Deslizando umas sobre as outras, mantendo um volume constante.',
          'Afastadas umas das outras, movendo-se rapidamente e colidindo com as paredes do balão.',
          'Concentradas apenas no fundo do balão devido à gravidade.'
        ],
        correctAnswer: 2,
        explanation: 'No estado gasoso, a força de atração entre as partículas é quase nula. Elas têm alta energia cinética, movendo-se livremente e ocupando todo o volume disponível.'
      },
      {
        id: 'q8',
        text: 'O ciclo das rochas demonstra que a litosfera é dinâmica. Uma rocha magmática pode se transformar em uma rocha metamórfica se for submetida a:',
        options: [
          'Erosão pelo vento e pela chuva na superfície.',
          'Derretimento completo até virar magma novamente.',
          'Altas pressões e temperaturas no interior da crosta, sem chegar a derreter.',
          'Quebra em pequenos sedimentos transportados por rios.'
        ],
        correctAnswer: 2,
        explanation: 'O metamorfismo ocorre quando rochas preexistentes sofrem mudanças em sua estrutura mineralógica devido ao aumento extremo de pressão e temperatura, mas permanecendo no estado sólido.'
      },
      {
        id: 'q9',
        text: 'A naftalina, usada em armários para espantar insetos, "desaparece" com o tempo sem deixar manchas líquidas. Esse fenômeno é um exemplo de:',
        options: [
          'Evaporação.',
          'Fusão.',
          'Sublimação.',
          'Condensação.'
        ],
        correctAnswer: 2,
        explanation: 'A sublimação é a passagem direta do estado sólido para o gasoso, sem passar pelo estado líquido. A naftalina e o gelo seco são exemplos clássicos.'
      },
      {
        id: 'q10',
        text: 'Em uma estação de tratamento de água (ETA), a etapa de "floculação" adiciona produtos químicos à água para que as impurezas se juntem em flocos maiores. A etapa seguinte, onde esses flocos pesados vão para o fundo do tanque, é chamada de:',
        options: [
          'Filtração.',
          'Decantação.',
          'Destilação.',
          'Centrifugação.'
        ],
        correctAnswer: 1,
        explanation: 'A decantação é um processo de separação baseado na diferença de densidade. Os flocos de sujeira, sendo mais densos que a água, depositam-se no fundo do tanque pela ação da gravidade.'
      }
    ]
  }
};
