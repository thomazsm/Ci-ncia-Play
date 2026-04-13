const fs = require('fs');

const file = 'src/data/curriculum.ts';
let content = fs.readFileSync(file, 'utf8');

// Add ProjectileCannon -> ef9 bim1
const targetEf9Bim1 = /(id:\s*'pista-skate-energia',\s*title:\s*'Pista de Skate \(Conservação de Energia\)',\s*description:\s*'Observe a transformação entre Energia Potencial e Energia Cinética.',\s*type:\s*'2d',\s*content:\s*'energy-skate-park'\s*})/;
const newProjectile = `,
          {
            id: 'canhao-projeteis',
            title: 'Canhão de Projéteis (Cinemática)',
            description: 'Ajuste o ângulo e a força para ver a trajetória parabólica de um lançamento.',
            type: '2d',
            content: 'projectile-cannon'
          }`;
content = content.replace(targetEf9Bim1, `$1${newProjectile}`);

fs.writeFileSync(file, content);
console.log('Updated curriculum.ts with ProjectileCannon');
