import jurupariImg from '@/assets/otimizadas/game-jurupari.webp';
import pantanalWordImg from '@/assets/otimizadas/game-pantanal-word.webp';
import theseusImg from '@/assets/otimizadas/game-theseus.webp';
import museumImg from '@/assets/otimizadas/game-museum.webp';
import macroPlanetImg from '@/assets/otimizadas/game-macro-planet.webp';
import motoDisasterImg from '@/assets/otimizadas/game-moto-disaster.webp';

export interface Game {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  image: string;
  videoUrl?: string;
  playUrl?: string;
  isFeatured?: boolean;
  released?: boolean;
  developmentDates?: {
    start: string;
    release: string;
  };
  team?: {
    name: string;
    role: string;
  }[];
}

export const games: Game[] = [
  {
    id: 1,
    title: 'Museu das Mulheres Negras',
    released: true,
    description: 'Experiência cultural e educativa interativa.',
    longDescription: 'Uma experiência imersiva que celebra as contribuições de mulheres negras na história.',
    tags: ['Educativo', 'Cultural', 'Interativo'],
    image: museumImg,
    videoUrl: null, // Exemplo: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    playUrl: 'https://ledesgames.itch.io/mulheres',
    developmentDates: {
      start: 'Fevereiro 2024',
      release: 'Dezembro 2024'
    },
    team: [
      { name: 'Gilvan Ferreira', role: 'Desenvolvimento' },
      { name: 'Lara Perius', role: 'UI Design, Ilustração' },
      { name: 'Miguel Albuquerque', role: 'Composição, Sound Design' }
    ]
  },
  {
    id: 2,
    title: 'Pantanal Word',
    released: true,
    description: 'Jogo educativo de palavras ambientado no Pantanal.',
    longDescription: 'Aprenda sobre o vocabulário do Pantanal enquanto se diverte com desafios de palavras.',
    tags: ['Educativo', 'Puzzle', 'Palavras'],
    image: pantanalWordImg,
    videoUrl: null,
    playUrl: 'https://ledesgames.itch.io/pantanal',
    developmentDates: {
      start: 'Fevereiro 2024',
      release: 'Dezembro 2024'
    },
    team: [
      { name: 'Gilvan Ferreira', role: 'Desenvolvimento' },
      { name: 'Lara Perius', role: 'UI Design, Ilustração' },
      { name: 'Miguel Albuquerque', role: 'Composição, Sound Design' }
    ]
  },
  {
    id: 3,
    title: "Theseus' Odyssey",
    released: true,
    isFeatured: true, 
    description: 'Aventura mitológica inspirada na Grécia Antiga.',
    longDescription: 'Embarque em uma jornada épica através da mitologia grega.',
    tags: ['Aventura', 'Mitologia', 'Ação'],
    image: theseusImg,
    videoUrl: null,
    playUrl: 'https://ledesgames.itch.io/theseus',
    developmentDates: {
      start: 'Março 2025',
      release: ''
    },
    team: [
      { name: 'Gilvan Ferreira', role: 'Direção, Desenvolvimento' },
      { name: 'Lara Perius', role: 'Direção de Arte, UI Design' },
      { name: 'Miguel Albuquerque', role: 'Direção de Áudio, Composição, Sound Design' },
      { name: 'Arthur de Andrade', role: 'Ilustração, Animação' },
      { name: 'Nathan Rezende', role: 'Ilustração, Animação' },
      { name: 'Pedro Neto', role: 'Ilustração' },
      { name: 'Vinícius Oliveira', role: 'Ilustração' },
      { name: 'João Deboni', role: 'Sound Design, Dublagem' },
      { name: 'Caio Kwiatkoski', role: 'Composição' },
      { name: 'Guilherme Haddad', role: 'Dublagem' },
      { name: 'Joana vitória', role: 'Dublagem' },
      { name: 'Karen Centurion', role: 'Dublagem' },
      { name: 'Marcelo Henrique', role: 'Dublagem' },
      { name: 'Monalisa Malheiros', role: 'Dublagem' },
      { name: 'Vitor Zan', role: 'Dublagem' }
    ]
  },
  {
    id: 4,
    title: 'Projeto Jurupari',
    released: false,
    isFeatured: false, 
    description: 'Um survival horror de exploração ambientado no vasto bioma do Pantanal.',
    longDescription: 'Explore um Pantanal brasileiro assombrado pelo folclore local. Investigue, descubra segredos e interaja com a fauna local em uma experiência única.',
    tags: ['Survival', 'Exploração', 'Terror', '3D'],
    image: jurupariImg,
    videoUrl: null,
    playUrl: 'https://ledesgames.itch.io/pantanal3d',
    developmentDates: {
      start: 'Janeio 2026',
      release: ''
    },
    team: [
      { name: 'Arthur de Andrade', role: 'Desenvolvimento, Modelagem 3D, Ilustração, Animação' },
      { name: 'Nathan Rezende', role: 'Desenvolvimento,Modelagem 3D, Ilustração, Animação' },
    ]
  },
  {
    id: 5,
    title: 'Macro Planet',
    released: false,
    isFeatured: false, 
    description: 'Em breve mais informações.',
    longDescription: 'Detalhes sobre mecânicas, história e desenvolvimento.',
    tags: ['Gerenciamento', 'Exploração'],
    image: macroPlanetImg,
    videoUrl: null,
    playUrl: '',
    developmentDates: {
      start: 'A definir',
      release: 'A definir'
    },
    team: []
  },
  {
    id: 6,
    title: 'Moto Disaster',
    released: false,
    isFeatured: false, 
    description: 'Em breve mais informações.',
    longDescription: 'Detalhes sobre mecânicas, história e desenvolvimento.',
    tags: ['Moto Delivery', 'Arcade'],
    image: motoDisasterImg,
    videoUrl: null,
    playUrl: '',
    developmentDates: {
      start: 'A definir',
      release: 'A definir'
    },
    team: []
  }
];