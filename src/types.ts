export interface Product {
  id: Id;
  title: Title;
  price: Price;
  description: string;
  category: string;
  image: Image;
  rating: Rating;
}

export interface Rating {
  rate: number;
  count: number;
}
export type Id = number;
export type Title = string;
export type Price = number;
export type Image = string;
export type Quantity = number;
export interface CartProduct {
  id: Id;
  title: Title;
  price: Price;
  quantity: Quantity;
  category?: string;
  image?: string;
}

export interface Params {
  id: string;
}

export interface CartState {
  cart: CartProduct[];
  quantity: Quantity;
  total: Price;
}
