export interface Lesson {
  id: string;
  title: string;
  description: string;
  type: '2d' | '3d' | 'text';
  content: string;
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Grade {
  id: string;
  title: string;
  description: string;
  modules: Module[];
}

export const curriculum: Grade[] = [
  {
    id: 'ef6',
    title: '6º Ano - Ensino Fundamental',
    description: 'Terra e Universo, Matéria e Energia, Vida e Evolução.',
    modules: [
      {
        id: 'bim1',
        title: '1º Bimestre',
        lessons: [
          {
            id: 'big-bang-sistema-solar',
            title: 'Big Bang e Sistema Solar',
            description: 'A origem do Universo, método científico e os corpos celestes do Sistema Solar.',
            type: '3d',
            content: 'solar-system'
          },
          {
            id: 'terra-primitiva',
            title: 'Terra Primitiva e Tempo Geológico',
            description: 'Formação do planeta Terra e a diferença entre tempo histórico e geológico.',
            type: '2d',
            content: 'terra-primitiva'
          },
          {
            id: 'movimentos-terra-lua',
            title: 'Movimentos da Terra e da Lua',
            description: 'Rotação, translação, fases da Lua e eclipses.',
            type: '3d',
            content: 'moon-phases'
          },
          {
            id: 'estacoes-ano',
            title: 'Estações do Ano e Vida na Terra',
            description: 'Solstício, equinócio e as condições para a existência de vida.',
            type: '2d',
            content: 'seasons-simulator'
          },
          {
            id: 'simulador-gravidade',
            title: 'Simulador de Gravidade e Órbitas',
            description: 'Ajuste a velocidade e massa de um planeta para entender como a gravidade mantém as órbitas.',
            type: '2d',
            content: 'gravity-simulator'
          }
        ]
      },
      {
        id: 'bim2',
        title: '2º Bimestre',
        lessons: [
          {
            id: 'camadas-terra',
            title: 'Camadas da Terra e Atmosfera',
            description: 'Litosfera, hidrosfera, atmosfera e biosfera.',
            type: '3d',
            content: 'earth-layers'
          },
          {
            id: 'estados-materia',
            title: 'Estados Físicos e Ciclo da Água',
            description: 'Estados de organização da matéria e a distribuição da água no planeta.',
            type: '2d',
            content: 'matter-states'
          },
          {
            id: 'rochas-solo',
            title: 'Tipos de Rochas e Formação do Solo',
            description: 'Rochas magmáticas, sedimentares, metamórficas e o processo de fossilização.',
            type: '2d',
            content: 'rock-cycle'
          },
          {
            id: 'misturas',
            title: 'Substâncias e Separação de Misturas',
            description: 'Substâncias puras, misturas homogêneas/heterogêneas e transformações químicas.',
            type: '2d',
            content: 'mixture-separation'
          }
        ]
      }
    ]
  },
  {
    id: 'ef7',
    title: '7º Ano - Ensino Fundamental',
    description: 'Placas Tectônicas, Máquinas Simples, Ecossistemas.',
    modules: [
      {
        id: 'bim1',
        title: '1º Bimestre',
        lessons: [
          {
            id: 'placas-tectonicas',
            title: 'Simulador de Placas Tectônicas',
            description: 'Faça as placas colidirem ou se afastarem para ver a formação de montanhas, vulcões e terremotos.',
            type: '2d',
            content: 'tectonic-plates'
          },
          {
            id: 'atmosfera',
            title: 'Máquina do Clima',
            description: 'Controle a temperatura do oceano, a umidade e os ventos para tentar formar um furacão.',
            type: '2d',
            content: 'weather-machine'
          },
          {
            id: 'maquinas-simples',
            title: 'Máquinas Simples e Força',
            description: 'Alavancas, plano inclinado, roda, eixo e polia.',
            type: '2d',
            content: 'simple-machines'
          },
          {
            id: 'calor-temperatura',
            title: 'Calor, Temperatura e Máquinas Térmicas',
            description: 'Propagação de calor, equilíbrio termodinâmico e desenvolvimento tecnológico.',
            type: '2d',
            content: 'thermal-machine'
          }
        ]
      },
      {
        id: 'bim2',
        title: '2º Bimestre',
        lessons: [
          {
            id: 'efeito-estufa',
            title: 'Combustíveis Fósseis e Efeito Estufa',
            description: 'Desmatamento, queimadas, mudanças climáticas e eventos extremos.',
            type: '2d',
            content: 'greenhouse-effect'
          },
          {
            id: 'sustentabilidade',
            title: 'Sustentabilidade e Agenda 2030',
            description: 'Objetivos do desenvolvimento sustentável e conscientização ambiental.',
            type: '2d',
            content: 'sustainability-city'
          },
          {
            id: 'microrganismos',
            title: 'Microscópio Virtual',
            description: 'Coloque lâminas virtuais e gire a lente para ver células em 10x, 40x e 100x de aumento.',
            type: '2d',
            content: 'microscope-view'
          },
          {
            id: 'biomas',
            title: 'Ecossistemas e Biomas Brasileiros',
            description: 'Fatores bióticos/abióticos, invertebrados, vertebrados e diversidade das plantas.',
            type: '2d',
            content: 'biomes'
          },
          {
            id: 'dissecacao-virtual',
            title: 'Dissecação Virtual e Anatomia',
            description: 'Explore a anatomia interna de um anfíbio removendo camadas virtuais.',
            type: '2d',
            content: 'virtual-dissection'
          },
          {
            id: 'fabrica-fotossintese',
            title: 'Fábrica de Fotossíntese',
            description: 'Ajuste a Luz, Água e CO₂ para ver a planta crescer e produzir Oxigênio.',
            type: '2d',
            content: 'photosynthesis-lab'
          }
        ]
      }
    ]
  },
  {
    id: 'ef8',
    title: '8º Ano - Ensino Fundamental',
    description: 'Corpo Humano, Reprodução, Saúde.',
    modules: [
      {
        id: 'bim1',
        title: '1º Bimestre',
        lessons: [
          {
            id: 'puberdade',
            title: 'Adolescência, Puberdade e Sistemas',
            description: 'Mudanças físicas e o desenvolvimento dos sistemas nervoso e endócrino.',
            type: '2d',
            content: 'puberty-simulator'
          },
          {
            id: 'reproducao',
            title: 'Reprodução Assexuada e Sexuada',
            description: 'Mitose, meiose, cuidado parental e estratégias de reprodução das plantas.',
            type: '2d',
            content: 'reproduction-sim'
          },
          {
            id: 'ists',
            title: 'Saúde Reprodutiva e ISTs',
            description: 'Sistema genital, métodos contraceptivos, HPV, Sífilis e HIV/aids.',
            type: '2d',
            content: 'ist-prevention'
          },
          {
            id: 'drogas',
            title: 'Drogas: Efeitos e Prevenção',
            description: 'Substâncias psicoativas, tabagismo, alcoolismo e vulnerabilidade.',
            type: '2d',
            content: 'drugs-brain'
          }
        ]
      },
      {
        id: 'bim2',
        title: '2º Bimestre',
        lessons: [
          {
            id: 'sistema-digestorio',
            title: 'Nutrição e Sistema Digestório',
            description: 'Macronutrientes, micronutrientes, leitura de rótulos e o processo de digestão.',
            type: '3d',
            content: 'digestive-system'
          },
          {
            id: 'sistema-respiratorio',
            title: 'Sistema Respiratório',
            description: 'Inspiração, expiração e os impactos da poluição atmosférica.',
            type: '3d',
            content: 'respiratory-system'
          },
          {
            id: 'sistema-cardiovascular',
            title: 'Sistema Cardiovascular e Imune',
            description: 'Coração, sangue, vasos sanguíneos e o funcionamento do sistema imunológico.',
            type: '2d',
            content: 'cardiovascular-system'
          },
          {
            id: 'dcnt',
            title: 'Doenças Crônicas Não Transmissíveis',
            description: 'Pressão arterial e campanhas de prevenção.',
            type: '2d',
            content: 'dcnt-sim'
          }
        ]
      }
    ]
  },
  {
    id: 'ef9',
    title: '9º Ano - Ensino Fundamental',
    description: 'Química, Física, Genética e Evolução.',
    modules: [
      {
        id: 'bim1',
        title: '1º Bimestre',
        lessons: [
          {
            id: 'metodo-cientifico',
            title: 'O que é Ciência e Método Científico',
            description: 'Etapas da investigação científica e acesso à informação.',
            type: '2d',
            content: 'scientific-method'
          },
          {
            id: 'modelos-atomicos',
            title: 'Modelos Atômicos e Tabela Periódica',
            description: 'Evolução dos modelos atômicos e organização dos elementos químicos.',
            type: '3d',
            content: 'atom-model'
          },
          {
            id: 'reacoes-quimicas',
            title: 'Reações Químicas e Leis Ponderais',
            description: 'Substâncias, Lei de Lavoisier e Lei de Proust.',
            type: '2d',
            content: 'chemical-reactions'
          },
          {
            id: 'ondas',
            title: 'Ondas e Espectro Eletromagnético',
            description: 'Ondas mecânicas/eletromagnéticas, som, luz e radiação.',
            type: '2d',
            content: 'wave-simulator'
          },
          {
            id: 'laboratorio-misturas',
            title: 'Laboratório de Misturas Químicas',
            description: 'Experimente misturar elementos da tabela periódica e veja as reações.',
            type: '2d',
            content: 'chemistry-mixer'
          },
          {
            id: 'laboratorio-circuitos',
            title: 'Laboratório de Circuitos Elétricos',
            description: 'Monte circuitos com pilhas, fios e lâmpadas para entender voltagem e corrente.',
            type: '2d',
            content: 'circuit-builder'
          },
          {
            id: 'optica-lasers',
            title: 'Óptica e Lasers',
            description: 'Experimente a reflexão e refração da luz usando espelhos, prismas e lentes.',
            type: '2d',
            content: 'optics-lab'
          },
          {
            id: 'tanque-densidade',
            title: 'Tanque de Densidade e Empuxo',
            description: 'Descubra o que afunda e o que boia baseado na densidade dos materiais.',
            type: '2d',
            content: 'density-tank'
          },
          {
            id: 'laboratorio-ph',
            title: 'Laboratório de pH (Ácidos e Bases)',
            description: 'Use o papel indicador para descobrir se substâncias do dia a dia são ácidas ou básicas.',
            type: '2d',
            content: 'ph-lab'
          },
          {
            id: 'pista-skate-energia',
            title: 'Pista de Skate (Conservação de Energia)',
            description: 'Observe a transformação entre Energia Potencial e Energia Cinética.',
            type: '2d',
            content: 'energy-skate-park'
          },
          {
            id: 'canhao-projeteis',
            title: 'Canhão de Projéteis (Cinemática)',
            description: 'Ajuste o ângulo e a força para ver a trajetória parabólica de um lançamento.',
            type: '2d',
            content: 'projectile-cannon'
          }
        ]
      },
      {
        id: 'bim2',
        title: '2º Bimestre',
        lessons: [
          {
            id: 'dna',
            title: 'Célula, DNA e Divisão Celular',
            description: 'Estrutura do DNA, genes, cromossomos, mitose e meiose.',
            type: '3d',
            content: 'dna-model'
          },
          {
            id: 'mendel',
            title: 'Leis de Mendel e Hereditariedade',
            description: 'Transmissão de características, codominância e heredogramas.',
            type: '2d',
            content: 'mendel-lab'
          },
          {
            id: 'biotecnologia',
            title: 'Biotecnologia e OGMs',
            description: 'Organismos geneticamente modificados, clonagem e bioética.',
            type: '2d',
            content: 'biotech-lab'
          },
          {
            id: 'evolucao',
            title: 'Evolução: Lamarck, Darwin e Seleção Natural',
            description: 'História das ideias evolutivas, cladogramas e biodiversidade.',
            type: '2d',
            content: 'natural-selection'
          },
          {
            id: 'criador-mutantes',
            title: 'Criador de Mutantes (Genética)',
            description: 'Cruze alienígenas usando as Leis de Mendel para entender genes dominantes e recessivos.',
            type: '2d',
            content: 'mutant-creator'
          }
        ]
      }
    ]
  },
  {
    id: 'em1',
    title: '1ª Série - Ensino Médio',
    description: 'Ecologia, Energia e Sustentabilidade.',
    modules: [
      {
        id: 'bim1',
        title: '1º Bimestre',
        lessons: [
          {
            id: 'ecologia',
            title: 'Ecologia e Fluxo de Energia',
            description: 'Fatores bióticos/abióticos, cadeias alimentares e sucessão ecológica.',
            type: '2d',
            content: 'food-web'
          },
          {
            id: 'ciclos-biogeoquimicos',
            title: 'Ciclos Biogeoquímicos',
            description: 'O ciclo da água, carbono e nitrogênio.',
            type: '2d',
            content: 'biogeochemical-cycles'
          },
          {
            id: 'construtor-ecossistemas',
            title: 'Construtor de Ecossistemas',
            description: 'Equilibre a quantidade de plantas, presas e predadores em um ambiente.',
            type: '2d',
            content: 'ecosystem-builder'
          }
        ]
      },
      {
        id: 'bim2',
        title: '2º Bimestre',
        lessons: [
          {
            id: 'impactos-ambientais',
            title: 'Impactos Socioambientais',
            description: 'Aquecimento global, matriz energética e poluição ambiental.',
            type: '2d',
            content: 'environmental-impacts'
          },
          {
            id: 'mudancas-climaticas',
            title: 'Mudanças Climáticas e Aquecimento Global',
            description: 'Efeito estufa, eventos extremos e Agenda 2030.',
            type: 'text',
            content: 'theory'
          },
          {
            id: 'fontes-energia',
            title: 'Fontes de Energia Renováveis',
            description: 'Matrizes energéticas e transição energética sustentável.',
            type: 'text',
            content: 'theory'
          },
          {
            id: 'poluicao-saude',
            title: 'Poluição Ambiental e Saúde',
            description: 'Impactos sistêmicos da poluição, bioacumulação e biomagnificação.',
            type: 'text',
            content: 'theory'
          }
        ]
      }
    ]
  },
  {
    id: 'em2',
    title: '2ª Série - Ensino Médio',
    description: 'Radiação, Divisão Celular, Intervenções Humanas.',
    modules: [
      {
        id: 'bim1',
        title: '1º Bimestre',
        lessons: [
          {
            id: 'radiacao-celula',
            title: 'Radiação e Divisão Celular',
            description: 'Riscos da radiação, mitose, meiose e origem de cânceres.',
            type: '3d',
            content: 'cell-division'
          },
          {
            id: 'ciclo-celular-cancer',
            title: 'Ciclo Celular e Câncer',
            description: 'Mitose, mutações no DNA e a origem do câncer.',
            type: 'text',
            content: 'theory'
          }
        ]
      },
      {
        id: 'bim2',
        title: '2º Bimestre',
        lessons: [
          {
            id: 'biodiversidade',
            title: 'Biodiversidade e Intervenções Humanas',
            description: 'Defensivos agrícolas, transgênicos, bioética e conservação.',
            type: '2d',
            content: 'biodiversity-impact'
          },
          {
            id: 'intervencoes-ecossistemas',
            title: 'Intervenções nos Ecossistemas',
            description: 'Zoonoses, bioacumulação e perda de habitat.',
            type: 'text',
            content: 'theory'
          }
        ]
      }
    ]
  },
  {
    id: 'em3',
    title: '3ª Série - Ensino Médio',
    description: 'Revisão e Aprofundamento para o ENEM.',
    modules: [
      {
        id: 'bim1',
        title: '1º Bimestre',
        lessons: [
          {
            id: 'simulado-interativo',
            title: 'Simulado Interativo - Ciências da Natureza',
            description: 'Teste seus conhecimentos em todas as áreas para o ENEM.',
            type: 'text',
            content: 'quiz'
          }
        ]
      }
    ]
  }
];

