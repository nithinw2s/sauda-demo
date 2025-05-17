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