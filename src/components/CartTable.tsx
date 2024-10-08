import { Table, Image, InputNumber } from 'antd';
import { useCart, useCartDispatch } from '../context/cart/Cart';
import { ProductStateType } from '../context/cart/type';
import { deleteIcon } from '../assets/Icons';

const { Column } = Table;

const CartTable: React.FC = () => {
  const cartProducts = useCart();
  const checkoutList = cartProducts.checkoutList ?? [];

  const cartDispatchContext = useCartDispatch();

  return (
    <Table pagination={false} scroll={{ y: 'calc(100vh - 240px)', x: 1000 }} bordered dataSource={checkoutList} rowKey="id">
      <Column
        title="Image"
        dataIndex="images"
        key="image"
        render={(images: string[]) => (
          <Image src={images[0]} width={48} height={48} alt="Product" />
        )}
        fixed="left"
        width='10%'
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
      <Column
        title="Remove"
        key="remove"
        render={({ ...product }: ProductStateType) => 
          <span 
            style={{ cursor: 'pointer' }} 
            onClick={() => {
              cartDispatchContext.cartDispatch({
                type: 'remove',
                id: product.id,
              });
            }}
          >
            {deleteIcon}
          </span>}
        align='center'
        width={'10%'}
        fixed="right"
      />
    </Table>
  );
};

export default CartTable;
