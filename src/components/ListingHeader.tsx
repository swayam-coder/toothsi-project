import {
  Select,
  Slider,
  Row,
  Col,
  Tooltip,
  Button,
  notification,
  Input,
} from 'antd';
import { Product } from '../types/product';
import { useProducts, useProductsDispatch } from '../context/product/Product';
import { useNavigate } from 'react-router-dom';
import { useCartDispatch } from '../context/cart/Cart';
import { resetIcon } from '../assets/Icons';

const { Option } = Select;

const ListingHeader: React.FC<{ products: Product[] }> = ({ products }) => {
  const productContext = useProducts();
  const filter = productContext.selectedFilters;

  const productDispatchContext = useProductsDispatch();
  const filterDispatch = productDispatchContext.filterDispatch;

  const cartDispatchContext = useCartDispatch();

  const navigate = useNavigate();

  const brands = [...new Set(products.map((p) => p.brand))].filter(Boolean);
  const categories = [...new Set(products.map((p) => p.category))].filter(
    Boolean
  );
  const prices = [...new Set(products.map((p) => p.price))].filter(Boolean);

  const goToCart = () => {
    const selectedProducts = productContext.selectedProducts;

    if (selectedProducts?.length) {
      if (selectedProducts.find((p) => !p.quantity)) {
        notification.error({
          message: 'Seems like quantity is missing in some products',
        });
      } else {
        for (let i = 0; i < selectedProducts.length; i++) {
          const product = products.find((p) => p.id === selectedProducts[i].id);

          if (product) {
            cartDispatchContext.cartDispatch({
              type: 'add',
              product: { ...product, quantity: selectedProducts[i].quantity },
            });
          }
        }

        navigate('/cart');
      }
    } else {
      notification.info({ message: 'Select some products to proceed' });
    }
  };

  return (
    <Row gutter={16} style={{ marginBottom: 16 }}>
      <Col span={3}>
        <Select
          placeholder="Filter by Category"
          onChange={(val) =>
            filterDispatch({ type: 'set_category', payload: val })
          }
          style={{ width: '100%' }}
          value={filter.category}
        >
          {categories.map((c) => (
            <Option value={c}>{c}</Option>
          ))}
        </Select>
      </Col>
      <Col span={3}>
        <Select
          placeholder="Filter by Brand"
          onChange={(val) =>
            filterDispatch({ type: 'set_brand', payload: val })
          }
          style={{ width: '100%' }}
          value={filter.brand}
        >
          {brands.map((c) => (
            <Option value={c}>{c}</Option>
          ))}
        </Select>
      </Col>
      <Tooltip title="Filter by price">
        <Col span={3}>
          <Slider
            range
            defaultValue={[Math.min(...prices), Math.max(...prices)]}
            onChange={(val) =>
              filterDispatch({ type: 'set_price_range', payload: val })
            }
            value={filter.priceRange}
          />
        </Col>
      </Tooltip>
      <Col span={3}>
        <Button
          type="default"
          onClick={() => filterDispatch({ type: 'reset', payload: undefined })}
        >
          {resetIcon}
          Reset Filters
        </Button>
      </Col>
      <Col span={6} style={{ textAlign: 'right', marginLeft: 'auto' }}>
        <Row gutter={16}>
          <Col>
            <Input
              placeholder="Search product.."
              onChange={(e) =>
                filterDispatch({ type: 'set_search', payload: e.target.value })
              }
              value={filter.search}
            />
          </Col>
          <Col>
            <Button type="primary" onClick={goToCart}>
              Add to cart
            </Button>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default ListingHeader;
