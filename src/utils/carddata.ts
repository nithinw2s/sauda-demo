import LizardImg from '../assets/images/covergushter.jpg'; 


export type CardItem = {
  id: number;
  title: string;
  description: string;
  image: string;
};


export const cardsData: CardItem[] = [
  {
    id: 1,
    title: 'Lizard',
    description: 'Lizards are a widespread group of squamate reptiles...',
    image: LizardImg.src,
  },
  {
    id: 2,
    title: 'Snake',
    description: 'Snakes are elongated, legless reptiles...',
    image: LizardImg.src,
  },
  {
    id: 3,
    title: 'Frog',
    description: 'Frogs are amphibians known for their jumping abilities...',
    image: LizardImg.src,
  },{
    id: 1,
    title: 'Lizard',
    description: 'Lizards are a widespread group of squamate reptiles...',
    image: LizardImg.src,
  },
];
