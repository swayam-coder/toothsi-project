import { Button, Checkbox, notification } from 'antd';
import { cartIcon } from '../assets/Icons';
import { Product } from '../types/product';
import { useState } from 'react';
import { InputNumber } from 'antd';
import { useCart, useCartDispatch } from '../context/cart/Cart';
import { ProductStateType } from '../context/cart/type';
import { useProducts, useProductsDispatch } from '../context/product/Product';
import { CheckboxChangeEvent } from 'antd/es/checkbox/Checkbox';
import { useNavigate } from 'react-router-dom';

const RowCtas: React.FC<{
  product: ProductStateType;
}> = ({ product }) => {
  const cartDispatchContext = useCartDispatch();
  const productDispatchContext = useProductsDispatch();
  const cartProducts = useCart();
  const productContext = useProducts();
  const navigate = useNavigate();

  const selectedProducts = productContext.selectedProducts;
  const selectedProductDispatch =
    productDispatchContext.selectedProductDispatch;

  const currProduct = cartProducts.checkoutList?.find(
    (p) => p.id === product.id
  );

  const [quantity, setQuantity] = useState<number>(currProduct?.quantity ?? 0);

  const isProductSelected = !!selectedProducts?.find(
    (p) => p.id === product.id
  );

  const onCartClick = ({ ...product }: Product, quantity: number) => {
    cartDispatchContext.cartDispatch({
      type: 'add',
      product: { ...product, quantity },
    });
    navigate('/checkout');
  };

  const onChangeCheckbox = (e: CheckboxChangeEvent) =>
    e.target.checked
      ? selectedProductDispatch({
          type: 'add',
          product: { id: product.id, quantity },
        })
      : selectedProductDispatch({
          type: 'remove',
          id: product.id,
        });

  return (
    <div
      style={{
        display: 'flex',
        gap: 16,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <InputNumber
        value={quantity}
        min={0}
        style={{ width: '60px' }}
        onChange={(value) => {
          setQuantity(value ?? 0);

          if (isProductSelected) {
            selectedProductDispatch({
              type: 'add',
              product: { id: product.id, quantity: value ?? 0 },
            });
          }
        }}
      />
      <Button
        onClick={() => {
          if (quantity) {
            onCartClick(product, quantity);
          } else {
            notification.error({ message: 'Quantity cant be zero' });
          }
        }}
      >
        {cartIcon}
      </Button>
      <Checkbox onChange={onChangeCheckbox} checked={isProductSelected} />
    </div>
  );
};

export default RowCtas;
