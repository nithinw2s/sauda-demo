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
    title: "Samsung",
    ads: "250",
    link: "https://www.samsung.com/in/"
  },
  {
    id:2,
    title: "iphone",
    ads: "200",
    link: "https://www.apple.com/in/iphone/"
  },
  {
    id:3,
    title: "vivo",
    ads: "200",
    link: "https://www.vivo.com/in"
  },
  {
    id:4,
    title: "oppo",
    ads: "25",
    link: "https://www.oppo.com/in/"
  },
  {
    id:5,
    title: "redmi",
    ads: "300",
    link: "https://www.mi.com/in/"
  
  },
  {
    id:6,
    title: "lava",
    ads: "150",
    link: "https://www.lavamobiles.com/"
  },
  {
    id:7,
    title: "micromax",
    ads: "100",
    link: "https://www.lavamobiles.com/"
  },
  {
    id:8,
    title: "gfive",
    ads: "10",
    link: "https://www.lavamobiles.com/"
  }
];