import {
  Select,
  Slider,
  Row,
  Col,
  Tooltip,
  Button,
  notification,
  Input,
  Drawer,
} from 'antd';
import { Product } from '../types/product';
import { useProducts, useProductsDispatch } from '../context/product/Product';
import { useNavigate } from 'react-router-dom';
import { useCartDispatch } from '../context/cart/Cart';
import { resetIcon } from '../assets/Icons';
import { useState } from 'react';
import { MenuOutlined } from '@ant-design/icons';

const { Option } = Select;

const ListingHeader: React.FC<{ products: Product[] }> = ({ products }) => {
  const productContext = useProducts();
  const filter = productContext.selectedFilters;

  const productDispatchContext = useProductsDispatch();
  const filterDispatch = productDispatchContext.filterDispatch;

  const cartDispatchContext = useCartDispatch();
  const navigate = useNavigate();

  const brands = [...new Set(products.map((p) => p.brand))].filter(Boolean);
  const categories = [...new Set(products.map((p) => p.category))].filter(Boolean);
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

  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <Row gutter={16} style={{ marginBottom: 16 }}>
      <Col span={3}>
        <div style={{ display: 'flex', marginBottom: 8 }}>
          <Button
            style={{ color: 'white', paddingLeft: 0 }}
            type="text"
            onClick={showDrawer}
            icon={<MenuOutlined />}
          >
            Filters
          </Button>
        </div>
        <Drawer title="Filters" placement="right" onClose={onClose} visible={visible}>
          <Row gutter={16}>
            <Col span={24}>
              <Select
                placeholder="Filter by Category"
                onChange={(val) => filterDispatch({ type: 'set_category', payload: val })}
                style={{ width: '100%', marginBottom: '16px' }}
                value={filter.category}
              >
                {categories.map((c) => (
                  <Option key={c} value={c}>{c}</Option>
                ))}
              </Select>
            </Col>
            <Col span={24}>
              <Select
                placeholder="Filter by Brand"
                onChange={(val) => filterDispatch({ type: 'set_brand', payload: val })}
                style={{ width: '100%', marginBottom: '16px' }}
                value={filter.brand}
              >
                {brands.map((c) => (
                  <Option key={c} value={c}>{c}</Option>
                ))}
              </Select>
            </Col>
            <Col span={24}>
              <p>Filter by price</p>
              <Tooltip title="Filter by price">
                <Slider
                  range
                  defaultValue={[Math.min(...prices), Math.max(...prices)]}
                  onChange={(val) => filterDispatch({ type: 'set_price_range', payload: val })}
                  value={filter.priceRange}
                  style={{ marginBottom: '16px' }}
                />
              </Tooltip>
            </Col>
            <Col span={24}>
              <Button
                type="default"
                onClick={() => filterDispatch({ type: 'reset', payload: undefined })}
                style={{ marginBottom: '16px' }}
              >
                {resetIcon}
                Reset Filters
              </Button>
            </Col>
          </Row>
        </Drawer>
      </Col>
      <Col xs={24} sm={21} style={{ textAlign: 'right' }}>
        <Row gutter={[16, 16]} justify="end">
          <Col xs={24} sm={8} md={4}>
            <Input
              placeholder="Search product.."
              onChange={(e) =>
                filterDispatch({ type: 'set_search', payload: e.target.value })
              }
              value={filter.search}
            />
          </Col>
          <Col xs={24} sm={8} md={4}>
            <Button type="primary" onClick={goToCart} style={{ width: '100%' }}>
              Add to cart
            </Button>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default ListingHeader;
