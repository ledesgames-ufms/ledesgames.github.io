import logoSBC from '@/assets/SBC_Logo.png';

export interface Publication {
  id: number;
  title: string;
  abstract: string;
  authors: string;
  conference: string;
  conferenceLogo?: string;
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
    conference: "SB Games / SBSI 2025",
    conferenceLogo: logoSBC,
    date: "Maio 2025",
    type: "Artigo",
    link: "https://sol.sbc.org.br/index.php/sbsi/article/view/34347/34138"
  }
];