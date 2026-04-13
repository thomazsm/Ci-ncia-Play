import { GradeAssessments } from '../types';

export const grade7Assessments: GradeAssessments = {
  bimester1: {
    id: 'bim1',
    title: 'Avaliação do 1º Bimestre',
    description: 'Teste seus conhecimentos sobre Placas Tectônicas e Deriva Continental.',
    questions: [
      {
        id: 'q1',
        text: 'A teoria da Deriva Continental, proposta por Alfred Wegener, inicialmente não foi aceita pela comunidade científica porque:',
        options: [
          'Os fósseis encontrados na América do Sul e na África eram de espécies completamente diferentes.',
          'Wegener não conseguiu explicar qual força seria capaz de mover massas continentais tão colossais.',
          'O contorno dos continentes não se encaixava perfeitamente como um quebra-cabeça.',
          'Acreditava-se que a Terra era oca e não possuía um manto pastoso.'
        ],
        correctAnswer: 1,
        explanation: 'Wegener tinha evidências fósseis e geológicas, mas faltava o mecanismo motor. Só mais tarde, com a descoberta das correntes de convecção no manto, a teoria das Placas Tectônicas validou suas ideias.'
      },
      {
        id: 'q2',
        text: 'Quando duas placas tectônicas convergem (colidem) e uma delas é mais densa que a outra, ocorre um processo geológico conhecido como:',
        options: [
          'Subducção, onde a placa mais densa mergulha sob a menos densa, retornando ao manto.',
          'Afastamento, criando uma nova crosta oceânica no fundo do mar.',
          'Falha transformante, onde as placas deslizam lateralmente sem destruir a crosta.',
          'Erosão tectônica, onde ambas as placas se pulverizam formando cadeias de montanhas.'
        ],
        correctAnswer: 0,
        explanation: 'Na subducção, a placa oceânica (mais densa) afunda sob a placa continental (menos densa), gerando fossas oceânicas, terremotos e vulcanismo.'
      },
      {
        id: 'q3',
        text: 'A Cordilheira dos Andes, na América do Sul, é um exemplo clássico de formação geológica resultante de:',
        options: [
          'Afastamento entre a Placa Sul-Americana e a Placa Africana.',
          'Deslizamento lateral entre a Placa de Nazca e a Placa do Pacífico.',
          'Colisão convergente entre a Placa de Nazca (oceânica) e a Placa Sul-Americana (continental).',
          'Acúmulo de sedimentos marinhos ao longo de bilhões de anos.'
        ],
        correctAnswer: 2,
        explanation: 'A placa de Nazca mergulha sob a placa Sul-Americana (subducção). O atrito e o enrugamento da crosta continental formaram a Cordilheira dos Andes.'
      },
      {
        id: 'q4',
        text: 'As máquinas simples foram fundamentais para o desenvolvimento humano. Uma alavanca interfixa é caracterizada por ter:',
        options: [
          'A força potente (esforço) localizada entre o ponto de apoio e a força resistente (carga).',
          'A força resistente (carga) localizada entre o ponto de apoio e a força potente (esforço).',
          'O ponto de apoio localizado entre a força potente (esforço) e a força resistente (carga).',
          'A ausência de um ponto de apoio fixo.'
        ],
        correctAnswer: 2,
        explanation: 'Na alavanca interfixa, o apoio fica no meio. Exemplos clássicos são a tesoura, o alicate e a gangorra.'
      },
      {
        id: 'q5',
        text: 'Ao utilizar um plano inclinado (rampa) para elevar um objeto pesado até um caminhão, a principal vantagem mecânica obtida é:',
        options: [
          'A redução do trabalho total realizado para mover o objeto.',
          'A diminuição da força necessária para erguer o objeto, embora a distância percorrida seja maior.',
          'O aumento da velocidade com que o objeto é elevado.',
          'A eliminação total da força de atrito entre o objeto e a superfície.'
        ],
        correctAnswer: 1,
        explanation: 'Máquinas simples não diminuem o trabalho total (Energia), mas distribuem a força. A rampa exige menos força (esforço), mas o objeto precisa percorrer uma distância maior.'
      },
      {
        id: 'q6',
        text: 'A diferença fundamental entre calor e temperatura é que:',
        options: [
          'Calor é a medida da agitação das moléculas, enquanto temperatura é a energia transferida.',
          'Temperatura é a energia térmica em trânsito, enquanto calor é o estado térmico de um corpo.',
          'Calor é a energia térmica em trânsito entre corpos com temperaturas diferentes, enquanto temperatura mede o grau de agitação molecular.',
          'Não há diferença, ambos são medidos em graus Celsius.'
        ],
        correctAnswer: 2,
        explanation: 'Temperatura é uma propriedade do corpo (agitação das partículas). Calor é a energia que flui do corpo mais quente para o mais frio.'
      },
      {
        id: 'q7',
        text: 'Ao segurar uma colher de metal que está dentro de uma panela com sopa quente, sua mão logo sente o calor. Esse processo de propagação térmica ocorre principalmente por:',
        options: [
          'Convecção, pois o ar quente ao redor da panela aquece a colher.',
          'Irradiação, pois a sopa emite ondas eletromagnéticas que aquecem o metal.',
          'Condução, pois a energia térmica é transferida de partícula para partícula ao longo do metal sólido.',
          'Sublimação, pois o vapor da sopa se condensa na colher.'
        ],
        correctAnswer: 2,
        explanation: 'A condução térmica ocorre principalmente em sólidos, onde a agitação das moléculas mais quentes é transmitida para as vizinhas, propagando o calor ao longo do material.'
      },
      {
        id: 'q8',
        text: 'O funcionamento de uma geladeira baseia-se no princípio de que o ar frio desce e o ar quente sobe. Esse movimento de fluidos devido à diferença de densidade é chamado de:',
        options: [
          'Condução térmica.',
          'Convecção térmica.',
          'Irradiação térmica.',
          'Isolamento térmico.'
        ],
        correctAnswer: 1,
        explanation: 'A convecção ocorre em líquidos e gases. O fluido quente (menos denso) sobe, e o fluido frio (mais denso) desce, criando correntes de convecção.'
      },
      {
        id: 'q9',
        text: 'O calor do Sol chega à Terra atravessando o vácuo do espaço. Qual é o único processo de propagação de calor que pode ocorrer no vácuo?',
        options: [
          'Condução.',
          'Convecção.',
          'Irradiação (ou Radiação).',
          'Dilatação.'
        ],
        correctAnswer: 2,
        explanation: 'A irradiação térmica ocorre através de ondas eletromagnéticas (como a luz infravermelha), que não precisam de um meio material para se propagar.'
      },
      {
        id: 'q10',
        text: 'As máquinas térmicas, como os motores a combustão dos carros, revolucionaram a indústria. O princípio básico de funcionamento de uma máquina térmica é:',
        options: [
          'Converter energia elétrica em energia térmica sem perdas.',
          'Transformar calor (energia térmica) em trabalho (energia mecânica), sempre com alguma perda de calor para o ambiente.',
          'Criar energia a partir do movimento perpétuo de engrenagens.',
          'Absorver calor do ambiente frio e transferi-lo para um ambiente quente espontaneamente.'
        ],
        correctAnswer: 1,
        explanation: 'Máquinas térmicas operam em ciclos, retirando calor de uma fonte quente, convertendo parte dele em trabalho (movimento) e rejeitando o restante para uma fonte fria (ambiente).'
      }
    ]
  },
  bimester2: {
    id: 'bim2',
    title: 'Avaliação do 2º Bimestre',
    description: 'Teste seus conhecimentos sobre Ecossistemas e Biomas Brasileiros.',
    questions: [
      {
        id: 'q1',
        text: 'O Efeito Estufa é frequentemente tratado como um problema ambiental, mas, na verdade, ele é um fenômeno natural. Qual é a sua importância fundamental para a Terra?',
        options: [
          'Ele impede que os raios ultravioleta do Sol atinjam a superfície terrestre.',
          'Ele retém parte do calor irradiado pela Terra, mantendo a temperatura do planeta adequada para a existência de vida líquida.',
          'Ele é responsável por gerar os ventos alísios que resfriam os oceanos.',
          'Ele consome o excesso de gás carbônico através da fotossíntese nas altas camadas da atmosfera.'
        ],
        correctAnswer: 1,
        explanation: 'O efeito estufa natural é vital. Sem ele, a Terra seria um planeta congelado. O problema atual é a intensificação desse efeito devido à ação humana.'
      },
      {
        id: 'q2',
        text: 'A intensificação do Efeito Estufa, que leva ao Aquecimento Global, é causada principalmente pelo aumento da concentração de gases de efeito estufa (GEE) na atmosfera. Qual das atividades abaixo é a maior responsável por esse aumento?',
        options: [
          'A respiração natural de todos os seres vivos do planeta.',
          'A evaporação da água dos oceanos durante o verão.',
          'A queima de combustíveis fósseis (carvão, petróleo, gás natural) e o desmatamento.',
          'O uso excessivo de energia solar e eólica em países desenvolvidos.'
        ],
        correctAnswer: 2,
        explanation: 'A queima de combustíveis fósseis libera enormes quantidades de CO2 que estavam armazenadas no subsolo há milhões de anos. O desmatamento reduz a absorção desse CO2 pelas plantas.'
      },
      {
        id: 'q3',
        text: 'A Agenda 2030 da ONU estabelece 17 Objetivos de Desenvolvimento Sustentável (ODS). O conceito central de "Desenvolvimento Sustentável" significa:',
        options: [
          'Paralisar completamente o crescimento econômico e industrial para preservar a natureza intacta.',
          'Explorar os recursos naturais ao máximo no presente para garantir riqueza e resolver a pobreza rapidamente.',
          'Atender às necessidades da geração atual sem comprometer a capacidade das gerações futuras de atenderem às suas próprias necessidades.',
          'Focar exclusivamente na preservação de espécies animais ameaçadas de extinção.'
        ],
        correctAnswer: 2,
        explanation: 'Sustentabilidade é o equilíbrio entre o desenvolvimento econômico, a equidade social e a preservação ambiental, pensando no longo prazo.'
      },
      {
        id: 'q4',
        text: 'Um ecossistema é formado pela interação entre fatores bióticos e abióticos. Assinale a alternativa que contém apenas fatores abióticos:',
        options: [
          'Plantas, animais, fungos e bactérias.',
          'Luz solar, temperatura, água, solo e nutrientes.',
          'Predadores, presas, umidade e vento.',
          'Árvores, rochas, rios e pássaros.'
        ],
        correctAnswer: 1,
        explanation: 'Fatores abióticos (sem vida) são os componentes físicos e químicos do ambiente que influenciam os seres vivos (fatores bióticos).'
      },
      {
        id: 'q5',
        text: 'O Brasil possui uma enorme diversidade de biomas. Qual bioma brasileiro é caracterizado por um clima semiárido, vegetação adaptada à seca (xerófila) com folhas modificadas em espinhos e caules que armazenam água?',
        options: [
          'Floresta Amazônica.',
          'Cerrado.',
          'Mata Atlântica.',
          'Caatinga.'
        ],
        correctAnswer: 3,
        explanation: 'A Caatinga é um bioma exclusivamente brasileiro, adaptado a longos períodos de seca, com plantas como os cactos (mandacaru, xique-xique).'
      },
      {
        id: 'q6',
        text: 'O Cerrado é frequentemente chamado de "berço das águas" ou "caixa d\'água do Brasil". Isso se deve ao fato de que:',
        options: [
          'É o bioma que recebe a maior quantidade de chuvas durante todo o ano.',
          'Suas árvores de raízes profundas absorvem a água da chuva, alimentando os grandes aquíferos que formam as principais bacias hidrográficas do país.',
          'Possui os maiores lagos naturais de água doce da América do Sul.',
          'Sua vegetação rasteira impede a evaporação da água do solo.'
        ],
        correctAnswer: 1,
        explanation: 'As raízes profundas do Cerrado funcionam como uma esponja, infiltrando a água da chuva no solo e recarregando aquíferos (como o Guarani e o Bambuí), que nascem rios importantes.'
      },
      {
        id: 'q7',
        text: 'A fotossíntese é um processo vital para a manutenção da vida na Terra. Durante esse processo, as plantas absorvem _____ e liberam _____.',
        options: [
          'Gás oxigênio (O2) / Gás carbônico (CO2).',
          'Gás carbônico (CO2) / Gás oxigênio (O2).',
          'Nitrogênio (N2) / Gás carbônico (CO2).',
          'Gás oxigênio (O2) / Vapor d\'água (H2O).'
        ],
        correctAnswer: 1,
        explanation: 'Na fotossíntese, as plantas utilizam a luz solar para transformar gás carbônico e água em glicose (energia) e liberam gás oxigênio como subproduto.'
      },
      {
        id: 'q8',
        text: 'Os microrganismos, como bactérias e fungos, desempenham um papel ecológico fundamental nos ecossistemas. Eles atuam principalmente como:',
        options: [
          'Produtores primários, gerando energia para toda a cadeia alimentar.',
          'Consumidores secundários, controlando a população de herbívoros.',
          'Decompositores, reciclando a matéria orgânica morta e devolvendo nutrientes ao solo.',
          'Parasitas, destruindo a biodiversidade local.'
        ],
        correctAnswer: 2,
        explanation: 'A decomposição é essencial para a reciclagem de nutrientes. Sem fungos e bactérias decompositoras, a matéria orgânica se acumularia e o solo ficaria infértil.'
      },
      {
        id: 'q9',
        text: 'A Mata Atlântica é um dos biomas mais ameaçados do mundo (hotspot de biodiversidade). A principal causa histórica e atual da sua degradação é:',
        options: [
          'A expansão natural de áreas desérticas devido às mudanças climáticas globais.',
          'A ocupação humana desordenada, urbanização, industrialização e expansão agrícola desde a colonização.',
          'A introdução de espécies invasoras que predaram a fauna local.',
          'A ocorrência frequente de incêndios naturais causados por raios durante a seca.'
        ],
        correctAnswer: 1,
        explanation: 'A Mata Atlântica cobre a costa brasileira, onde se concentra a maior parte da população, das cidades e da indústria do país, sofrendo intenso desmatamento há séculos.'
      },
      {
        id: 'q10',
        text: 'Ao observar uma célula vegetal ao microscópio, uma estrutura verde se destaca, sendo responsável pela captação da luz solar. Essa estrutura é o:',
        options: [
          'Núcleo.',
          'Mitocôndria.',
          'Cloroplasto.',
          'Ribossomo.'
        ],
        correctAnswer: 2,
        explanation: 'Os cloroplastos são organelas presentes nas células vegetais que contêm clorofila, o pigmento verde responsável por absorver a luz solar para a fotossíntese.'
      }
    ]
  }
};
