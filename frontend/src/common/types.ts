export interface ProductDetails {
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

export type Brand<T, U> = T & { __brand: U };

export type ProductId = Brand<string, "productId">;
