import {
  createContext,
  useReducer,
  useContext,
  PropsWithChildren,
} from 'react';
import {
  ProductAction,
  Product,
  FilterAction,
  FilterState,
  ProductReducer,
  FilterReducer,
} from './type';

const initialFilters: FilterState = {
  category: null,
  brand: null,
  priceRange: [0, 10000],
  search: undefined,
};

const selectedProductsReducer = (
  state: { id: number; quantity: number }[],
  action: ProductAction
): Product[] => {
  switch (action.type) {
    case 'add': {
      const { product } = action;
      const hasProduct = state.find((p) => p.id === product.id);

      if (!hasProduct) {
        return [...state, product];
      } else {
        return state.map((p) =>
          p.id === product.id ? { ...p, quantity: product.quantity } : p
        );
      }
    }
    case 'remove': {
      return state.filter((p) => p.id !== action.id);
    }
    default: {
      throw new Error('Unknown action type');
    }
  }
};

const filterProductsReducer = (state: FilterState, action: FilterAction) => {
  switch (action.type) {
    case 'set_category':
    case 'set_brand':
    case 'set_price_range':
    case 'set_search': {
      const updatedFilter = {
        ...state,
        ...(action.type === 'set_category' && { category: action.payload }),
        ...(action.type === 'set_brand' && { brand: action.payload }),
        ...(action.type === 'set_price_range' && {
          priceRange: action.payload,
        }),
        ...(action.type === 'set_search' && {
          search: action.payload,
        }),
      };

      return {
        ...state,
        ...updatedFilter,
      };
    }
    case 'reset':
      return initialFilters;
    default: {
      throw new Error('Unknown action type');
    }
  }
};

const ProductsContext = createContext<
  | {
      selectedProducts: { id: number; quantity: number }[] | undefined;
      selectedFilters: FilterState;
    }
  | undefined
>(undefined);

const ProductsDispatchContext = createContext<
  | {
      selectedProductDispatch: React.Dispatch<ProductAction>;
      filterDispatch: React.Dispatch<FilterAction>;
    }
  | undefined
>(undefined);

export function useProducts() {
  const context = useContext(ProductsContext);
  if (context === undefined) {
    throw new Error(
      'useProducts must be used within a SelectedProductsProvider'
    );
  }
  return context;
}

export function useProductsDispatch() {
  const context = useContext(ProductsDispatchContext);
  if (context === undefined) {
    throw new Error(
      'useProductsDispatch must be used within a SelectedProductsProvider'
    );
  }
  return context;
}

const ProductsProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const [selectedProducts, selectedProductDispatch] =
    useReducer<ProductReducer>(selectedProductsReducer, []);

  const [selectedFilters, filterDispatch] = useReducer<FilterReducer>(
    filterProductsReducer,
    initialFilters
  );

  return (
    <ProductsContext.Provider value={{ selectedProducts, selectedFilters }}>
      <ProductsDispatchContext.Provider
        value={{
          selectedProductDispatch,
          filterDispatch,
        }}
      >
        {children}
      </ProductsDispatchContext.Provider>
    </ProductsContext.Provider>
  );
};

export default ProductsProvider;
