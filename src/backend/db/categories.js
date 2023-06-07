import { v4 as uuid } from "uuid";

/**
 * Category Database can be added here.
 * You can add category of your wish with different attributes
 * */

export const categories = [
  {
    _id: uuid(),
    categoryName: "formal",
    description:"Check out our best shoe collection",
    image:"https://rukminim1.flixcart.com/image/832/832/xif0q/sandal/q/m/r/-original-imaghxfhhyf2qvzz.jpeg?q=70",
  },
  {
    _id: uuid(),
    categoryName: "sports",
    description:"Check out our best shoe collection",
    image:"https://rukminim1.flixcart.com/image/832/832/xif0q/shoe/w/c/2/-original-imaggcax8sstj3kn.jpeg?q=70",
  },
  {
    _id: uuid(),
    categoryName: "casual",
    description:"Check out our best shoe collection",
    image:"https://rukminim1.flixcart.com/image/832/832/xif0q/shoe/d/c/4/-original-imaghkpdmxuk5png.jpeg?q=70" ,
  },
  {
    _id: uuid(),
    categoryName: "sneakers",
    description:"Check out our best shoe collection",
    image:"https://rukminim1.flixcart.com/image/832/832/xif0q/shoe/g/m/r/6-87411-labbin-black-original-imagmf8gkshczgjk.jpeg?q=70",
  },
];
