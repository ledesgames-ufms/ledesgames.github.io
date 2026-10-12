export interface Publication {
  id: number;
  title: string;
  abstract: string;
  authors: string;
  conference: string;
  date: string;
  type: string;
  link: string;
}

export const publications: Publication[] = [
  {
    id: 1,
    title: "Pedagogical and Accessibility Guidelines for Digital Educational Games",
    abstract: "The gaming industry in Brazil has grown progressively in recent years, accompanied by an increase in the demand for accessibility. However, the development of accessible products has not advanced at the same pace, resulting in a significant gap. Problems such as the lack of audio description and subtitles are critical barriers that affect the access, learning, and entertainment provided by digital games. These problems contribute to the social exclusion of people with disabilities.",
    authors: "Gilvan Junior, Miguel de Albuquerque, Lucas Borth, Michele Soares, Awdren Fontão, Débora Paiva",
    conference: "SBSI 2025",
    date: "Maio 2025",
    type: "Artigo",
    link: "https://sol.sbc.org.br/index.php/sbsi/article/view/34347/34138"
  },
  {
    id: 2,
    title: "Transcending the Visual Labyrinth: Rethinking Action RPGs Through Art with Inclusive Sound Design for Blind People",
    abstract: "Introduction: This work presents the development of the game Theseus' Odyssey, a digital Role-Playing Game (RPG) based on the myth of Theseus, designed to be accessible to totally blind gamers. The game’s audiovisual design and development encompass pedagogical and accessibility guidelines designed to prioritize auditory feedback as the primary channel of information. Objective: To facilitate the inclusion and strengthen the interaction of non-sighted players through the design ...",
    authors: "Arthur Barbosa de Andrade, Nathan de Almeida Rezende, Gilvan Ferreira Alves Junior, Miguel Sobreira de Albuquerque, Caio Kwiatkoski Fiori Mendes, Lara Liz Perius, Vitor Tomaz Zan, Ricardo Theis Geraldi",
    conference: "SBGames 2026",
    date: "Setembro 2026",
    type: "Artigo",
    link: "https://sol.sbc.org.br/index.php/sbgames/article/view/45340/45101"
  }
];