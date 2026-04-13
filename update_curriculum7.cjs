const fs = require('fs');

const file = 'src/data/curriculum.ts';
let content = fs.readFileSync(file, 'utf8');

// Update Microscope -> ef7 bim2 (microrganismos)
// The lesson 'microrganismos' already exists, we just need to ensure its content is 'microscope-view' and type is '2d'
// Let's replace the whole microrganismos block just in case
const targetMicro = /(id:\s*'microrganismos',\s*title:\s*'Diversidade da Vida: Microrganismos',\s*description:\s*'Vírus, bactérias, fungos e as doenças causadas por eles.',\s*type:\s*'[^']+',\s*content:\s*'[^']+'\s*})/;
const newMicro = `id: 'microrganismos',
            title: 'Microscópio Virtual',
            description: 'Coloque lâminas virtuais e gire a lente para ver células em 10x, 40x e 100x de aumento.',
            type: '2d',
            content: 'microscope-view'
          }`;
content = content.replace(targetMicro, newMicro);

// Update TectonicPlates -> ef7 bim1 (placas-tectonicas)
const targetTectonic = /(id:\s*'placas-tectonicas',\s*title:\s*'Placas Tectônicas e Deriva Continental',\s*description:\s*'A estrutura interna da Terra, terremotos e vulcões.',\s*type:\s*'[^']+',\s*content:\s*'[^']+'\s*})/;
const newTectonic = `id: 'placas-tectonicas',
            title: 'Simulador de Placas Tectônicas',
            description: 'Faça as placas colidirem ou se afastarem para ver a formação de montanhas, vulcões e terremotos.',
            type: '2d',
            content: 'tectonic-plates'
          }`;
content = content.replace(targetTectonic, newTectonic);

// Update WeatherMachine -> ef7 bim1 (atmosfera)
const targetWeather = /(id:\s*'atmosfera',\s*title:\s*'Atmosfera e Clima',\s*description:\s*'Composição do ar, pressão atmosférica e previsão do tempo.',\s*type:\s*'[^']+',\s*content:\s*'[^']+'\s*})/;
const newWeather = `id: 'atmosfera',
            title: 'Máquina do Clima',
            description: 'Controle a temperatura do oceano, a umidade e os ventos para tentar formar um furacão.',
            type: '2d',
            content: 'weather-machine'
          }`;
content = content.replace(targetWeather, newWeather);

fs.writeFileSync(file, content);
console.log('Updated curriculum.ts with Microscope, TectonicPlates, and WeatherMachine');
