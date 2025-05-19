import Cars from '../assets/images/cars.jpg';
import Furniture from '../assets/images/furniture.jpg'
import Electronics from '../assets/images/electronics.jpg' 
import Appliances from '../assets/images/appliances.png'


export type CarouseItem = {
  image: string;
};

export const carouselData: CarouseItem[] = [
    {
        image:Cars.src
    },
    {
        image:Furniture.src
    },
    {
        image:Appliances.src
    }
];