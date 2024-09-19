import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useReducer,
} from 'react';

import {
  ICartContext,
  CartAction,
  CartReducer,
  ProductStateType,
} from './type';

export const CartContext = createContext<ICartContext | undefined>(undefined);

export const CartDispatchContext = createContext<
  | {
      cartDispatch: React.Dispatch<CartAction> | undefined;
    }
  | undefined
>(undefined);

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useTasks must be used within a TasksProvider');
  }
  return context;
}

export function useCartDispatch() {
  const context = useContext(CartDispatchContext);
  if (context?.cartDispatch === undefined) {
    throw new Error('useTasksDispatch must be used within a TasksProvider');
  }
  return context as {
    cartDispatch: React.Dispatch<CartAction>;
  };
}

const cartReducer = (
  products: ProductStateType[],
  action: CartAction
): ProductStateType[] => {
  switch (action.type) {
    case 'add': {
      return products?.find(p => p.id === action.product.id) ? 
        products.map(p => p.id === action.product.id ? action.product : p) 
        : [
          ...products?.filter((t) => t.id !== action.product.id),
          action.product,
        ] 
    }
    case 'remove': {
      return products.filter((t) => t.id !== action.id);
    }
    default: {
      throw new Error('Unknown action: ' + (action as CartAction).type);
    }
  }
};

const CartContextProvider: React.FC<PropsWithChildren<{}>> = (props) => {
  const [checkoutList, dispatch] = useReducer<CartReducer>(cartReducer, []);

  return (
    <CartContext.Provider value={{ checkoutList }}>
      <CartDispatchContext.Provider value={{ cartDispatch: dispatch }}>
        {props.children}
      </CartDispatchContext.Provider>
    </CartContext.Provider>
  );
};

export default CartContextProvider;
