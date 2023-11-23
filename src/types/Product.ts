import { Shop } from './Shop';

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  stock: ProductStock[];
};

export type ProductStock = {
  amount: number;
  shop: Shop;
};
