const fs = require('fs');

const file = 'src/data/curriculum.ts';
let content = fs.readFileSync(file, 'utf8');

// 1. GravitySimulator -> ef6 bim1
const targetEf6Bim1 = /(id:\s*'estacoes-ano',\s*title:\s*'Estações do Ano e Vida na Terra',\s*description:\s*'Solstício, equinócio e as condições para a existência de vida.',\s*type:\s*'2d',\s*content:\s*'seasons-simulator'\s*})/;
const newGravity = `,
          {
            id: 'simulador-gravidade',
            title: 'Simulador de Gravidade e Órbitas',
            description: 'Ajuste a velocidade e massa de um planeta para entender como a gravidade mantém as órbitas.',
            type: '2d',
            content: 'gravity-simulator'
          }`;
content = content.replace(targetEf6Bim1, `$1${newGravity}`);

// 2. GasLaws -> ef6 bim2
const targetEf6Bim2 = /(id:\s*'estados-materia',\s*title:\s*'Estados Físicos da Matéria',\s*description:\s*'Sólido, líquido, gasoso e as mudanças de estado.',\s*type:\s*'2d',\s*content:\s*'states-of-matter'\s*})/;
const newGasLaws = `,
          {
            id: 'leis-gases',
            title: 'Seringa de Gases (Leis dos Gases)',
            description: 'Altere a temperatura e o volume para ver como a pressão e a agitação das moléculas mudam.',
            type: '2d',
            content: 'gas-laws'
          }`;
content = content.replace(targetEf6Bim2, `$1${newGasLaws}`);

// 3. PhotosynthesisLab -> ef7 bim2
const targetEf7Bim2 = /(id:\s*'dissecacao-virtual',\s*title:\s*'Dissecação Virtual e Anatomia',\s*description:\s*'Explore a anatomia interna de um anfíbio removendo camadas virtuais.',\s*type:\s*'2d',\s*content:\s*'virtual-dissection'\s*})/;
const newPhotosynthesis = `,
          {
            id: 'fabrica-fotossintese',
            title: 'Fábrica de Fotossíntese',
            description: 'Ajuste a Luz, Água e CO₂ para ver a planta crescer e produzir Oxigênio.',
            type: '2d',
            content: 'photosynthesis-lab'
          }`;
content = content.replace(targetEf7Bim2, `$1${newPhotosynthesis}`);

// 4. BloodTyping -> ef8 bim2
const targetEf8Bim2 = /(id:\s*'dcnt',\s*title:\s*'Doenças Crônicas Não Transmissíveis',\s*description:\s*'Obesidade, diabetes, hipertensão e a importância de hábitos saudáveis.',\s*type:\s*'2d',\s*content:\s*'dcnt-sim'\s*})/;
const newBloodTyping = `,
          {
            id: 'tipagem-sanguinea',
            title: 'Tipagem Sanguínea',
            description: 'Pingue reagentes nas amostras de sangue para descobrir o tipo sanguíneo do paciente.',
            type: '2d',
            content: 'blood-typing'
          }`;
content = content.replace(targetEf8Bim2, `$1${newBloodTyping}`);

// 5, 6, 7. DensityTank, PhLab, EnergySkatePark -> ef9 bim1
const targetEf9Bim1 = /(id:\s*'optica-lasers',\s*title:\s*'Óptica e Lasers',\s*description:\s*'Experimente a reflexão e refração da luz usando espelhos, prismas e lentes.',\s*type:\s*'2d',\s*content:\s*'optics-lab'\s*})/;
const newEf9Labs = `,
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
          }`;
content = content.replace(targetEf9Bim1, `$1${newEf9Labs}`);

fs.writeFileSync(file, content);
console.log('Updated curriculum.ts with the remaining 7 labs');
