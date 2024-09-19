// import { Product } from "../types/product";

import { Product } from '../../types/product';

export interface ProductStateType extends Product {
  quantity: number;
}

export interface ICartContext {
  checkoutList: ProductStateType[] | null;
}

export type CartAction =
  | { type: 'add'; product: ProductStateType }
  | { type: 'remove'; id: number };

export type CartReducer = (
  product: ProductStateType[],
  action: CartAction
) => ProductStateType[];
