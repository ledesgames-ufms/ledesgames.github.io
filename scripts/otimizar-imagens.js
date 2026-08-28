import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pastaEntrada = path.join(__dirname, '../src/assets');
const pastaSaida = path.join(__dirname, '../src/assets/otimizadas');

if (!fs.existsSync(pastaSaida)) {
  fs.mkdirSync(pastaSaida, { recursive: true });
}

async function otimizarImagens() {
  const arquivos = fs.readdirSync(pastaEntrada);

  for (const arquivo of arquivos) {
    if (arquivo.match(/\.(png|jpg|jpeg|webp)$/i)) {
      const caminhoEntrada = path.join(pastaEntrada, arquivo);
      const nomeSemExtensao = path.parse(arquivo).name;
      const caminhoSaida = path.join(pastaSaida, `${nomeSemExtensao}.webp`);

      console.log(`Convertendo e redimensionando: ${arquivo}...`);

      try {
        await sharp(caminhoEntrada)
          .resize({ width: 1200, withoutEnlargement: true })
          .webp({ quality: 80 })
          .toFile(caminhoSaida);
        
        console.log(`Sucesso: ${nomeSemExtensao}.webp atualizado!`);
      } catch (erro) {
        console.error(`Erro ao converter ${arquivo}:`, erro);
      }
    }
  }
  console.log('Todas as imagens foram otimizadas e redimensionadas!');
}

otimizarImagens();