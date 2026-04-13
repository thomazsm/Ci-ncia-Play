const fs = require('fs');

const file = 'src/data/curriculum.ts';
let content = fs.readFileSync(file, 'utf8');

// Add Circuit Builder to 8th grade physics module
const targetModule8thPhysics = /(id:\s*'fisica-basica',\s*title:\s*'Introdução à Física',\s*lessons:\s*\[)/;
const newLessonCircuit = `
          {
            id: 'laboratorio-circuitos',
            title: 'Laboratório de Circuitos Elétricos',
            description: 'Monte circuitos com pilhas, fios e lâmpadas para entender voltagem e corrente.',
            type: '2d',
            content: 'circuit-builder'
          },`;
content = content.replace(targetModule8thPhysics, `$1${newLessonCircuit}`);

// Add Virtual Dissection to 7th grade biology module
const targetModule7thBio = /(id:\s*'diversidade-vida',\s*title:\s*'Diversidade da Vida',\s*lessons:\s*\[)/;
const newLessonDissection = `
          {
            id: 'dissecacao-virtual',
            title: 'Dissecação Virtual e Anatomia',
            description: 'Explore a anatomia interna de um anfíbio removendo camadas virtuais.',
            type: '2d',
            content: 'virtual-dissection'
          },`;
content = content.replace(targetModule7thBio, `$1${newLessonDissection}`);

// Add Ecosystem Builder to 7th grade ecology module
const targetModule7thEco = /(id:\s*'ecologia-sustentabilidade',\s*title:\s*'Ecologia e Sustentabilidade',\s*lessons:\s*\[)/;
const newLessonEcosystem = `
          {
            id: 'construtor-ecossistemas',
            title: 'Construtor de Ecossistemas',
            description: 'Equilibre a quantidade de plantas, presas e predadores em um ambiente.',
            type: '2d',
            content: 'ecosystem-builder'
          },`;
content = content.replace(targetModule7thEco, `$1${newLessonEcosystem}`);

// Add Optics Lab to 9th grade physics module
const targetModule9thPhysics = /(id:\s*'quimica-fisica-basica',\s*title:\s*'Introdução à Química e Física',\s*lessons:\s*\[)/;
const newLessonOptics = `
          {
            id: 'optica-lasers',
            title: 'Óptica e Lasers',
            description: 'Experimente a reflexão e refração da luz usando espelhos, prismas e lentes.',
            type: '2d',
            content: 'optics-lab'
          },`;
content = content.replace(targetModule9thPhysics, `$1${newLessonOptics}`);

// Add Mutant Creator to 9th grade genetics module
const targetModule9thGenetics = /(id:\s*'genetica-evolucao',\s*title:\s*'Genética e Evolução',\s*lessons:\s*\[)/;
const newLessonMutant = `
          {
            id: 'criador-mutantes',
            title: 'Criador de Mutantes (Genética)',
            description: 'Cruze alienígenas usando as Leis de Mendel para entender genes dominantes e recessivos.',
            type: '2d',
            content: 'mutant-creator'
          },`;
content = content.replace(targetModule9thGenetics, `$1${newLessonMutant}`);

fs.writeFileSync(file, content);
console.log('Updated curriculum.ts with all 5 new labs');
