import { link } from "fs";
import { FilterField } from "./typos";

export const filterFields: FilterField[] = [
  {
    id: "category",
    label: "Category",
    type: "dropdown",
    options: [
      { value: "books", label: "Books" },
      { value: "electronics", label: "Electronics" },
      { value: "clothing", label: "Clothing" },
    ],
  },
  {
    id: "priceRange",
    label: "Price Range",
    type: "slider",
    min: 0,
    max: 1000,
  },
  {
    id: "rating",
    label: "Minimum Rating",
    type: "slider",
    min: 1,
    max: 5,
  },
  {
    id: "availability",
    label: "Availability",
    type: "checkbox",
    options: [
      { value: "in_stock", label: "In Stock" },
      { value: "out_of_stock", label: "Out of Stock" },
    ],
  },
  {
    id: "brand",
    label: "Brand",
    type: "dropdown",
    options: [
      { value: "apple", label: "Apple" },
      { value: "samsung", label: "Samsung" },
      { value: "sony", label: "Sony" },
    ],
  },
];


export const SearchContent = [
  {
    id:1,
    title: "Honda",
    ads: "Bikes",
    link: "/bike"
  },
  {
    id:2,
    title: "iphone",
    ads: "mobiles",
    link: "/mobiles"
  },
  {
    id:3,
    title: "watch",
    ads: "Electronics",
    link: "/electronics"
  },
  {
    id:4,
    title: "tata",
    ads: "vehicles",
    link: "/vehicles"
  },
  {
    id:5,
    title: "dress",
    ads: "fashions",
    link: "/fashions"
  
  },
  {
    id:6,
    title: "Door",
    ads: "Furnitures",
    link: "/Furnitures"
  },
  {
    id:7,
    title: "micromax",
    ads: "mobiles",
    link: "https://www.lavamobiles.com/"
  },
  {
    id:8,
    title: "gfive",
    ads: "mobiles",
    link: "https://www.lavamobiles.com/"
  }
];

export const Categories = [
  {
    id: 1,
    name: "Electronics",
    image: require("../assets/images/appliances.png"),
    link: "/electronics",
  },
  {
    id: 2,
    name: "Mobiles",
    image: require("../assets/images/banner.jpg"),
    link: "/mobiles",
  },{
    id: 3,
    name: "Fashion",
    image: require("../assets/images/cars.jpg"),
    link: "/fashions",
  },{
    id: 4,
    name: "Travel",
    image: require("../assets/images/electronics.jpg"),
    link: "/bike",
  },{
    id: 5,
    name: "Dress",
    image: require("../assets/images/furniture.jpg"),
    link: "/fashions",
  },{
    id: 6,
    name: "Furniture",
    image: require("../assets/images/appliances.png"),
    link: "/Furnitures",
  },{
    id: 7,
    name: "Electronics",
    image: require("../assets/images/appliances.png"),
    link: "/electronics",
  },
  {
    id: 8,
    name: "Mobiles",
    image: require("../assets/images/banner.jpg"),
    link: "/mobiles",
  }
]

export const ListingContent = [
  {
    name: 'Maruti Swift',
    tax: 4500,
    price: 'AED 600000',
    year: 2020,
    kilometer: 30000,
    location: 'Delhi, India',
    date: '2025-03-15',
    membership:'premium',
    link: '/mobile'
  },
  {
    name: 'Honda Activa',
    tax: 1200,
    price: 'AED 75000',
    year: 2022,
    kilometer: 8000,
    location: 'Pune, India',
    date: '2025-04-20',
    membership:'premium',
    link:'/electronics'
  },
  {
    name: 'Hyundai Creta',
    tax: 7000,
    price: 'AED 1200000',
    year: 2018,
    kilometer: 60000,
    location: 'Bangalore, India',
    date: '2025-05-10',
    membership:'premium',
    link:'/bike'
  },
]