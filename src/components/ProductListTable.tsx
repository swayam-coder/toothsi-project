import { Table, Typography, Rate, Image } from 'antd';
import { Product } from '../types/product';
import RowCtas from './RowCtas';
import { ProductStateType } from '../context/cart/type';

const { Text } = Typography;
const { Column } = Table;

const ProductListingTable: React.FC<{
  products: Product[];
}> = ({ products }) => {
  return (
    <Table bordered dataSource={products} rowKey="id">
      <Column
        title="Image"
        dataIndex="images"
        key="image"
        render={(images: string[]) => (
          <Image src={images[0]} width={48} height={48} alt="Product" />
        )}
      />
      <Column
        title="Name"
        dataIndex="title"
        key="name"
        sorter={(a: Product, b: Product) => a.title.localeCompare(b.title)}
      />
      <Column
        title="Category"
        dataIndex="category"
        key="category"
        render={(category: number) => <Text>{category}</Text>}
        sorter={(a: Product, b: Product) =>
          a.category.localeCompare(b.category)
        }
      />
      <Column
        title="Rating"
        dataIndex="rating"
        key="rating"
        render={(rating: number) => <Rate disabled defaultValue={rating} />}
        sorter={(a: Product, b: Product) => a.rating - b.rating}
      />
      <Column
        title="Brand"
        dataIndex="brand"
        key="brand"
        render={(brand: number) => <Text>{brand}</Text>}
        sorter={(a: Product, b: Product) => a.category.localeCompare(b.brand)}
      />
      <Column
        title="Stock"
        dataIndex="stock"
        key="stock"
        render={(stock: number) =>
          stock > 0 ? (
            <Text type="success">In stock</Text>
          ) : (
            <Text type="danger">Out of stock</Text>
          )
        }
      />
      <Column
        title="Price"
        dataIndex="price"
        key="price"
        render={(price: number) => `Rs. ${price}`}
        sorter={(a: Product, b: Product) => a.price - b.price}
      />
      <Column
        title="Buy"
        key="buy"
        align="center"
        render={({ ...product }: ProductStateType) => (
          <RowCtas product={product} />
        )}
      />
    </Table>
  );
};

export default ProductListingTable;
