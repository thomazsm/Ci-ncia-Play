const fs = require('fs');

const file = 'src/data/curriculum.ts';
let content = fs.readFileSync(file, 'utf8');

// Replace the existing content for 'Substâncias e Separação de Misturas' to use the new mixer, 
// or we can just add a new lesson. Let's add a new lesson to the 9th grade module 1.

// Find the 9th grade, module 'quimica-fisica-basica'
const targetModuleRegex = /(id:\s*'quimica-fisica-basica',\s*title:\s*'Introdução à Química e Física',\s*lessons:\s*\[)/;

const newLesson = `
          {
            id: 'laboratorio-misturas',
            title: 'Laboratório de Misturas Químicas',
            description: 'Experimente misturar elementos da tabela periódica e veja as reações.',
            type: '2d',
            content: 'chemistry-mixer'
          },`;

content = content.replace(targetModuleRegex, `$1${newLesson}`);

fs.writeFileSync(file, content);
console.log('Updated curriculum.ts with Chemistry Mixer');
