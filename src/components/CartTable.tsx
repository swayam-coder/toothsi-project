import { Table, Image, InputNumber } from 'antd';
import { useCart, useCartDispatch } from '../context/cart/Cart';
import { ProductStateType } from '../context/cart/type';

const { Column } = Table;

const CartTable: React.FC = () => {
  const cartProducts = useCart();
  const checkoutList = cartProducts.checkoutList ?? [];

  const cartDispatchContext = useCartDispatch();

  return (
    <Table pagination={false} bordered dataSource={checkoutList} rowKey="id">
      <Column
        title="Image"
        dataIndex="images"
        key="image"
        render={(images: string[]) => (
          <Image src={images[0]} width={48} height={48} alt="Product" />
        )}
      />
      <Column title="Product" dataIndex="title" key="title" />
      <Column
        title="Price"
        dataIndex="price"
        key="price"
        render={(price: number) => `Rs. ${price}`}
      />
      <Column
        title="Quantity"
        key="quantity"
        render={({ ...product }: ProductStateType) => (
          <InputNumber
            min={0}
            value={product.quantity}
            onChange={(val) => {
              if (val && val > 0) {
                cartDispatchContext.cartDispatch({
                  type: 'add',
                  product: { ...product, quantity: val ?? 0 },
                });
              } else {
                cartDispatchContext.cartDispatch({
                  type: 'remove',
                  id: product.id,
                });
              }
            }}
          />
        )}
      />
      <Column
        title="SubTotal"
        key="subtotal"
        render={({ ...product }: ProductStateType) => <p style={{ color: '#0a66c2' }}>Rs. {product.quantity * product.price}</p>}
      />
    </Table>
  );
};

export default CartTable;
