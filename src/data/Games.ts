import pantanalWorldImg from '@/assets/game-pantanal-world.jpg';
import pantanalWordImg from '@/assets/game-pantanal-word.jpg';
import theseusImg from '@/assets/game-theseus.jpg';
import museumImg from '@/assets/game-museum.jpg';

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
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
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
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
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
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
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
    title: 'Pantanal World 3D',
    released: false,
    isFeatured: false, 
    description: 'Uma aventura de exploração e criatividade ambientada no vasto bioma do Pantanal.',
    longDescription: 'Explore um mundo aberto em low poly inspirado no Pantanal brasileiro. Construa, descubra segredos e interaja com a fauna local em uma experiência sandbox única.',
    tags: ['Sandbox', 'Exploração', 'Low Poly'],
    image: pantanalWorldImg,
    videoUrl: null,
    playUrl: 'https://ledesgames.itch.io/pantanal3d',
    developmentDates: {
      start: 'Agosto 2025',
      release: ''
    },
    team: [
      { name: 'Arthur de Andrade', role: 'Desenvolvimento, Modelagem 3D, Ilustração, Animação' },
      { name: 'Nathan Rezende', role: 'Desenvolvimento,Modelagem 3D, Ilustração, Animação' },
    ]
  },
];