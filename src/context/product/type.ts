export interface Product {
  id: number;
  quantity: number;
}

export type ProductAction =
  | { type: 'add'; product: Product }
  | { type: 'remove'; id: number };

export type FilterAction = {
  type:
    | 'set_category'
    | 'set_brand'
    | 'set_price_range'
    | 'set_search'
    | 'reset';
  payload: any;
};

export interface FilterState {
  category: string | null;
  brand: string | null;
  priceRange: [number, number];
  search?: string;
}

export type ProductReducer = (
  product: { id: number; quantity: number }[],
  action: ProductAction
) => Product[];

export type FilterReducer = (
  product: FilterState,
  action: FilterAction
) => FilterState;
