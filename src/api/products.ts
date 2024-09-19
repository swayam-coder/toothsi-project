import { Product } from '../types/product';

export interface ProductResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export const fetchProducts = async (): Promise<{
  success: boolean;
  error?: string;
  data?: ProductResponse;
}> => {
  try {
    const response = await fetch('https://dummyjson.com/products');

    if (!response.ok) {
      throw new Error(`Error fetching products. Status: ${response.status}`);
    }

    const products = await response.json();

    return { success: true, data: products };
  } catch (e) {
    const message = (e as Error).message;
    console.error('Failed fetching products', message);

    return { success: false, error: message };
  }
};
