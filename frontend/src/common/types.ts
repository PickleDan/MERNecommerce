export interface ProductInfo {
  _id: string;
  name: string;
  image: Link;
  description: string;
  brand: string;
  category: string;
  price: number;
  countInStock: number;
  rating: number;
  numReviews: number;
}

export type Link = string;
