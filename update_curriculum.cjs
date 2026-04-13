const fs = require('fs');

const file = 'src/data/curriculum.ts';
let content = fs.readFileSync(file, 'utf8');

const updates = {
  'Terra Primitiva e Tempo Geológico': { type: '2d', content: 'terra-primitiva' },
  'Estações do Ano e Vida na Terra': { type: '2d', content: 'seasons-simulator' },
  'Tipos de Rochas e Formação do Solo': { type: '2d', content: 'rock-cycle' },
  'Substâncias e Separação de Misturas': { type: '2d', content: 'mixture-separation' },
  'Atmosfera, Camada de Ozônio e Pressão': { type: '2d', content: 'atmosphere-layers' },
  'Máquinas Simples e Força': { type: '2d', content: 'simple-machines' },
  'Calor, Temperatura e Máquinas Térmicas': { type: '2d', content: 'thermal-machine' },
  'Combustíveis Fósseis e Efeito Estufa': { type: '2d', content: 'greenhouse-effect' },
  'Sustentabilidade e Agenda 2030': { type: '2d', content: 'sustainability-city' },
  'Diversidade da Vida: Microrganismos': { type: '2d', content: 'microscope-view' },
  'Reprodução Assexuada e Sexuada': { type: '2d', content: 'reproduction-sim' },
  'Saúde Reprodutiva e ISTs': { type: '2d', content: 'ist-prevention' },
  'Drogas: Efeitos e Prevenção': { type: '2d', content: 'drugs-brain' },
  'Sistema Cardiovascular e Imune': { type: '2d', content: 'cardiovascular-system' },
  'Doenças Crônicas Não Transmissíveis': { type: '2d', content: 'dcnt-sim' },
  'Reações Químicas e Leis Ponderais': { type: '2d', content: 'chemical-reactions' },
  'Leis de Mendel e Hereditariedade': { type: '2d', content: 'mendel-lab' },
  'Biotecnologia e OGMs': { type: '2d', content: 'biotech-lab' },
  'Evolução: Lamarck, Darwin e Seleção Natural': { type: '2d', content: 'natural-selection' },
  'Ecologia e Fluxo de Energia': { type: '2d', content: 'food-web' },
  'Impactos Socioambientais': { type: '2d', content: 'environmental-impacts' },
  'Biodiversidade e Intervenções Humanas': { type: '2d', content: 'biodiversity-impact' }
};

for (const [title, data] of Object.entries(updates)) {
  const regex = new RegExp(`title:\\s*'${title}',\\s*description:\\s*'[^']*',\\s*type:\\s*'[^']*',\\s*content:\\s*'[^']*'`, 'g');
  content = content.replace(regex, (match) => {
    return match.replace(/type:\s*'[^']*'/, `type: '${data.type}'`).replace(/content:\s*'[^']*'/, `content: '${data.content}'`);
  });
}

fs.writeFileSync(file, content);
console.log('Updated curriculum.ts');
