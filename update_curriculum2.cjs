const fs = require('fs');

const file = 'src/data/curriculum.ts';
let content = fs.readFileSync(file, 'utf8');

const updates = {
  'Adolescência, Puberdade e Sistemas': { type: '2d', content: 'puberty-simulator' },
  'O que é Ciência e Método Científico': { type: '2d', content: 'scientific-method' }
};

for (const [title, data] of Object.entries(updates)) {
  const regex = new RegExp(`title:\\s*'${title}',\\s*description:\\s*'[^']*',\\s*type:\\s*'[^']*',\\s*content:\\s*'[^']*'`, 'g');
  content = content.replace(regex, (match) => {
    return match.replace(/type:\s*'[^']*'/, `type: '${data.type}'`).replace(/content:\s*'[^']*'/, `content: '${data.content}'`);
  });
}

fs.writeFileSync(file, content);
console.log('Updated curriculum.ts with Puberty and Scientific Method');
