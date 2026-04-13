import { GradeAssessments } from '../types';

export const grade8Assessments: GradeAssessments = {
  bimester1: {
    id: 'bim1',
    title: 'Avaliação do 1º Bimestre',
    description: 'Teste seus conhecimentos sobre o Sistema Digestório.',
    questions: [
      {
        id: 'q1',
        text: 'A digestão é um processo complexo que envolve transformações mecânicas e químicas. Qual das alternativas melhor descreve o objetivo final da digestão química?',
        options: [
          'Triturar os alimentos em pedaços menores para facilitar a passagem pelo trato gastrointestinal.',
          'Converter macromoléculas complexas (como amido e proteínas) em micromoléculas (como glicose e aminoácidos) que podem atravessar a membrana das células.',
          'Extrair apenas a água e os sais minerais dos alimentos ingeridos.',
          'Produzir energia térmica diretamente no estômago para manter a temperatura corporal.'
        ],
        correctAnswer: 1,
        explanation: 'A digestão química, realizada por enzimas, quebra grandes moléculas de nutrientes em unidades básicas e solúveis, permitindo que sejam absorvidas pelo sangue e utilizadas pelas células.'
      },
      {
        id: 'q2',
        text: 'Ao mastigar um pedaço de pão por um longo tempo, é possível notar um sabor levemente adocicado. Isso ocorre porque:',
        options: [
          'O pão absorve o açúcar presente naturalmente na saliva.',
          'A mastigação prolongada libera o glúten, que tem sabor doce.',
          'A enzima amilase salivar (ptialina) começa a quebrar o amido do pão em moléculas menores de açúcar (maltose).',
          'As papilas gustativas se adaptam ao sabor salgado e passam a perceber o doce.'
        ],
        correctAnswer: 2,
        explanation: 'A digestão dos carboidratos começa na boca. A amilase salivar quebra o amido (um polissacarídeo sem sabor doce) em maltose (um dissacarídeo com sabor levemente doce).'
      },
      {
        id: 'q3',
        text: 'O esôfago é um tubo muscular que conecta a faringe ao estômago. Como o alimento consegue chegar ao estômago mesmo se uma pessoa estiver de cabeça para baixo?',
        options: [
          'Devido à força da gravidade que atua sobre o bolo alimentar.',
          'Através de contrações musculares rítmicas e involuntárias chamadas movimentos peristálticos.',
          'Pela pressão do ar inspirado que empurra o alimento para baixo.',
          'Pela ação de cílios microscópicos que varrem o alimento em direção ao estômago.'
        ],
        correctAnswer: 1,
        explanation: 'Os movimentos peristálticos são ondas de contração da musculatura lisa do tubo digestório que empurram o alimento de forma ativa, independentemente da gravidade.'
      },
      {
        id: 'q4',
        text: 'O estômago produz o suco gástrico, que é altamente ácido devido à presença de ácido clorídrico (HCl). Qual é a principal função dessa acidez extrema?',
        options: [
          'Digerir completamente os carboidratos e lipídios.',
          'Proteger a parede do estômago contra úlceras.',
          'Atuar como um bactericida e proporcionar o pH ideal para a ativação da enzima pepsina, que inicia a digestão de proteínas.',
          'Neutralizar a alcalinidade da saliva que desce com o bolo alimentar.'
        ],
        correctAnswer: 2,
        explanation: 'O HCl mata a maioria dos microrganismos ingeridos e converte o pepsinogênio (inativo) em pepsina (ativa), que só funciona em ambiente muito ácido para quebrar proteínas.'
      },
      {
        id: 'q5',
        text: 'A bile é uma secreção fundamental para a digestão, embora não contenha enzimas digestivas. Qual é a sua origem e sua função específica?',
        options: [
          'Produzida pela vesícula biliar, atua na quebra química de proteínas.',
          'Produzida pelo pâncreas, atua na neutralização da acidez do quimo.',
          'Produzida pelo fígado, atua emulsificando as gorduras (lipídios), transformando-as em gotículas menores para facilitar a ação das lípases.',
          'Produzida pelo intestino delgado, atua na absorção de vitaminas.'
        ],
        correctAnswer: 2,
        explanation: 'O fígado produz a bile (armazenada na vesícula). Ela age como um "detergente", separando grandes gotas de gordura em gotículas menores (emulsificação), aumentando a área de contato para as enzimas (lípases).'
      },
      {
        id: 'q6',
        text: 'O intestino delgado é o principal local de absorção de nutrientes. Para maximizar essa absorção, sua parede interna possui uma adaptação anatômica específica, que são:',
        options: [
          'Glândulas que produzem muco espesso para reter os nutrientes.',
          'Dobras, vilosidades e microvilosidades que aumentam drasticamente a área de superfície de contato com o alimento.',
          'Músculos extremamente fortes que espremem os nutrientes para dentro do sangue.',
          'Uma camada de bactérias simbióticas que transportam os nutrientes ativamente.'
        ],
        correctAnswer: 1,
        explanation: 'As vilosidades (dobras da mucosa) e microvilosidades (dobras da membrana das células) aumentam a área de absorção do intestino delgado em centenas de vezes.'
      },
      {
        id: 'q7',
        text: 'O pâncreas é uma glândula anexa de função mista. No contexto da digestão (função exócrina), qual é o papel do suco pancreático liberado no duodeno?',
        options: [
          'Apenas neutralizar a acidez do quimo vindo do estômago.',
          'Fornecer uma mistura rica em enzimas (como amilase, lípase e tripsina) e bicarbonato de sódio para digerir carboidratos, lipídios e proteínas em ambiente alcalino.',
          'Produzir insulina para ajudar as células do intestino a absorverem glicose.',
          'Armazenar a bile até o momento da digestão.'
        ],
        correctAnswer: 1,
        explanation: 'O suco pancreático contém enzimas cruciais para finalizar a digestão de todos os tipos de macronutrientes e bicarbonato para neutralizar o ácido do estômago, criando o pH ideal para essas enzimas.'
      },
      {
        id: 'q8',
        text: 'A doença celíaca é uma reação imunológica ao glúten que causa inflamação e danifica as vilosidades do intestino delgado. Qual é a consequência direta desse dano para o paciente?',
        options: [
          'Aumento da produção de suco gástrico, causando úlceras.',
          'Dificuldade na mastigação e deglutição dos alimentos.',
          'Má absorção de nutrientes, levando a desnutrição, perda de peso e fadiga.',
          'Incapacidade de produzir bile pelo fígado.'
        ],
        correctAnswer: 2,
        explanation: 'Como as vilosidades são responsáveis pela absorção, sua destruição (atrofia) impede que os nutrientes passem para o sangue, causando deficiências nutricionais graves.'
      },
      {
        id: 'q9',
        text: 'O intestino grosso não secreta enzimas digestivas. Suas principais funções na fase final da digestão incluem:',
        options: [
          'A digestão final de proteínas e a absorção de aminoácidos.',
          'A reabsorção de água e sais minerais, a formação do bolo fecal e a abrigar a flora intestinal (microbiota) que produz certas vitaminas.',
          'A produção de bile e o armazenamento de glicogênio.',
          'A absorção exclusiva de gorduras através dos vasos linfáticos.'
        ],
        correctAnswer: 1,
        explanation: 'O intestino grosso recupera a água usada na digestão, compacta os resíduos em fezes e abriga bactérias benéficas que fermentam restos não digeridos e sintetizam vitaminas (como a vitamina K).'
      },
      {
        id: 'q10',
        text: 'A epiglote é uma estrutura cartilaginosa localizada na faringe. Qual problema ocorreria frequentemente se a epiglote não funcionasse corretamente?',
        options: [
          'O alimento retornaria do estômago para o esôfago (refluxo).',
          'O ar inspirado iria para o estômago, causando inchaço.',
          'O alimento e os líquidos poderiam entrar na traqueia e nos pulmões, causando engasgos e risco de asfixia ou pneumonia.',
          'A pessoa perderia a capacidade de sentir o sabor dos alimentos.'
        ],
        correctAnswer: 2,
        explanation: 'A epiglote funciona como uma "tampa" que fecha a entrada da laringe/traqueia durante a deglutição, garantindo que o alimento vá para o esôfago e não para as vias respiratórias.'
      }
    ]
  },
  bimester2: {
    id: 'bim2',
    title: 'Avaliação do 2º Bimestre',
    description: 'Teste seus conhecimentos sobre o Sistema Respiratório.',
    questions: [
      {
        id: 'q1',
        text: 'A respiração humana envolve dois processos distintos: a ventilação pulmonar e a respiração celular. Qual é a relação entre eles?',
        options: [
          'São processos independentes; a ventilação ocorre nos pulmões e a respiração celular ocorre apenas no coração.',
          'A ventilação pulmonar capta o O2 do ambiente, que é transportado pelo sangue até as células, onde ocorre a respiração celular para produzir energia (ATP), gerando CO2 que é expelido pela ventilação.',
          'A respiração celular produz oxigênio que é utilizado pela ventilação pulmonar para inflar os pulmões.',
          'Ambos os processos ocorrem exclusivamente dentro dos alvéolos pulmonares.'
        ],
        correctAnswer: 1,
        explanation: 'A ventilação (inspirar/expirar) é o processo mecânico de troca de gases com o ambiente. A respiração celular é o processo químico dentro das células que usa o O2 para extrair energia da glicose, produzindo CO2 como resíduo.'
      },
      {
        id: 'q2',
        text: 'Ao inspirarmos pelo nariz, o ar passa pelas cavidades nasais antes de seguir para a faringe. Qual é a importância fisiológica dessa passagem?',
        options: [
          'Aumentar a velocidade do ar para que chegue mais rápido aos pulmões.',
          'Resfriar o ar para evitar queimaduras nos alvéolos.',
          'Filtrar impurezas através dos pelos e muco, além de umedecer e aquecer o ar graças à rica rede de vasos sanguíneos.',
          'Extrair o oxigênio do ar antes que ele chegue à traqueia.'
        ],
        correctAnswer: 2,
        explanation: 'As cavidades nasais preparam o ar para os pulmões: os pelos e o muco retêm partículas e microrganismos, enquanto os capilares sanguíneos aquecem o ar, e o muco o umedece.'
      },
      {
        id: 'q3',
        text: 'A traqueia é um tubo que conduz o ar para os pulmões. Ela é revestida internamente por um epitélio ciliado e produtor de muco. Qual é a função desses cílios?',
        options: [
          'Absorver o oxigênio diretamente para a corrente sanguínea.',
          'Produzir sons quando o ar passa rapidamente por eles.',
          'Bater constantemente para varrer o muco (com impurezas aprisionadas) para cima, em direção à faringe, para ser engolido ou expectorado.',
          'Aumentar a superfície de contato para aquecer o ar.'
        ],
        correctAnswer: 2,
        explanation: 'O muco da traqueia aprisiona poeira e bactérias que passaram pelo nariz. Os cílios funcionam como uma "escada rolante", empurrando esse muco sujo para fora das vias respiratórias inferiores.'
      },
      {
        id: 'q4',
        text: 'A hematose é o processo de troca gasosa que ocorre nos pulmões. Onde exatamente ela acontece e qual é o mecanismo físico envolvido?',
        options: [
          'Ocorre nos brônquios, através de transporte ativo que gasta energia.',
          'Ocorre na laringe, por meio da contração muscular.',
          'Ocorre nos alvéolos pulmonares, através da difusão simples (os gases passam do meio mais concentrado para o menos concentrado).',
          'Ocorre na cavidade pleural, por osmose.'
        ],
        correctAnswer: 2,
        explanation: 'A hematose ocorre nos milhões de alvéolos (sacos de ar muito finos cercados por capilares). O O2, mais concentrado no alvéolo, difunde-se para o sangue; o CO2, mais concentrado no sangue, difunde-se para o alvéolo.'
      },
      {
        id: 'q5',
        text: 'A mecânica respiratória depende da variação de volume e pressão na caixa torácica. Durante a inspiração (entrada de ar), o que ocorre com o diafragma e os músculos intercostais?',
        options: [
          'Ambos relaxam, diminuindo o volume torácico e expulsando o ar.',
          'O diafragma se contrai (abaixa) e os músculos intercostais se contraem (elevam as costelas), aumentando o volume torácico e diminuindo a pressão interna.',
          'O diafragma relaxa (sobe) e os músculos intercostais se contraem, mantendo a pressão constante.',
          'Apenas o diafragma se move, enquanto as costelas permanecem fixas.'
        ],
        correctAnswer: 1,
        explanation: 'Para o ar entrar (inspiração), a pressão dentro dos pulmões deve ser menor que a pressão atmosférica. Isso é conseguido aumentando o volume da caixa torácica através da contração do diafragma e dos intercostais.'
      },
      {
        id: 'q6',
        text: 'O monóxido de carbono (CO), liberado na queima incompleta de combustíveis, é um gás extremamente tóxico. Por que a inalação de CO pode ser fatal?',
        options: [
          'Porque ele destrói os alvéolos pulmonares instantaneamente.',
          'Porque ele paralisa o músculo do diafragma, impedindo a respiração.',
          'Porque ele se liga à hemoglobina do sangue com muito mais afinidade que o oxigênio, impedindo o transporte de O2 para as células (asfixia química).',
          'Porque ele causa uma reação alérgica severa na traqueia, fechando a passagem de ar.'
        ],
        correctAnswer: 2,
        explanation: 'A hemoglobina (proteína dos glóbulos vermelhos) transporta o O2. O CO se liga à hemoglobina de forma muito estável, "ocupando o lugar" do O2 e impedindo que as células recebam oxigênio.'
      },
      {
        id: 'q7',
        text: 'A asma é uma doença respiratória crônica caracterizada por crises de falta de ar, chiado no peito e tosse. O que ocorre nas vias aéreas durante uma crise de asma?',
        options: [
          'Os alvéolos se rompem, diminuindo a área de troca gasosa.',
          'A traqueia colapsa devido à fraqueza dos anéis cartilaginosos.',
          'Ocorre inflamação, inchaço e contração da musculatura dos bronquíolos (broncoespasmo), além de aumento da produção de muco, estreitando a passagem do ar.',
          'O diafragma sofre espasmos incontroláveis (soluços severos).'
        ],
        correctAnswer: 2,
        explanation: 'Na asma, as vias aéreas inferiores (bronquíolos) ficam hiper-reativas. Durante uma crise, elas se inflamam, contraem e produzem muito muco, dificultando severamente a passagem do ar, especialmente na expiração.'
      },
      {
        id: 'q8',
        text: 'O controle do ritmo respiratório é involuntário, embora possamos controlá-lo conscientemente por curtos períodos. Qual estrutura do sistema nervoso central é o principal responsável por esse controle automático?',
        options: [
          'O cerebelo.',
          'O bulbo raquidiano (ou medula oblonga).',
          'O córtex cerebral frontal.',
          'A medula espinhal lombar.'
        ],
        correctAnswer: 1,
        explanation: 'O bulbo possui o centro respiratório, que monitora principalmente a concentração de gás carbônico (CO2) e o pH do sangue para ajustar a frequência e a profundidade da respiração.'
      },
      {
        id: 'q9',
        text: 'Se você prender a respiração por muito tempo, sentirá uma necessidade incontrolável de voltar a respirar. O principal estímulo químico que força essa resposta do cérebro é:',
        options: [
          'A falta extrema de oxigênio (O2) no cérebro.',
          'O aumento da concentração de gás carbônico (CO2) no sangue, que torna o sangue mais ácido.',
          'A diminuição da pressão arterial.',
          'O acúmulo de ácido lático nos pulmões.'
        ],
        correctAnswer: 1,
        explanation: 'O centro respiratório no bulbo é muito mais sensível ao aumento de CO2 (e consequente queda do pH sanguíneo) do que à falta de O2. É o acúmulo de CO2 que dispara o reflexo de inspirar.'
      },
      {
        id: 'q10',
        text: 'Os pulmões são revestidos por uma membrana dupla que os protege e facilita seu movimento dentro da caixa torácica durante a respiração. O nome dessa membrana é:',
        options: [
          'Pericárdio.',
          'Peritônio.',
          'Pleura.',
          'Meninge.'
        ],
        correctAnswer: 2,
        explanation: 'A pleura possui duas camadas (visceral, colada ao pulmão, e parietal, colada à caixa torácica) com um líquido lubrificante entre elas, permitindo que os pulmões deslizem suavemente durante a ventilação.'
      }
    ]
  }
};
