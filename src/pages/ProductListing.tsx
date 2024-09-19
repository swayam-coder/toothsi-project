import { useEffect, useState } from 'react';
import { fetchProducts } from '../api/products';
import { Product } from '../types/product';
import ProductListingTable from '../components/ProductListTable';
import ListingHeader from '../components/ListingHeader';
import { notification } from 'antd';
import { useProducts } from '../context/product/Product';

const ProductListing: React.FC = () => {
  const [products, setProducts] = useState<{
    data: Product[];
    isLoading: boolean;
  }>({ data: [], isLoading: false });

  const productContext = useProducts();
  const filter = productContext.selectedFilters;

  const filteredProducts = products.data.filter((product) => {
    const matchesCategory = filter.category
      ? product.category === filter.category
      : true;
    const matchesBrand = filter.brand ? product.brand === filter.brand : true;
    const matchesPrice =
      product.price >= filter.priceRange[0] &&
      product.price <= filter.priceRange[1];

    const matchesSearch = filter.search
      ? product.brand?.toLowerCase().includes(filter.search.toLowerCase()) ||
        product.title?.toLowerCase().includes(filter.search.toLowerCase()) ||
        product.category?.toLowerCase().includes(filter.search.toLowerCase()) ||
        !!product.tags?.find((tag) =>
          tag.toLowerCase().includes(filter!.search!.toLowerCase())
        )
      : true;

    return matchesCategory && matchesBrand && matchesPrice && matchesSearch;
  });

  useEffect(() => {
    setProducts((prev) => ({ ...prev, isLoading: true }));

    fetchProducts()
      .then((res) => {
        if (!res.success) {
          throw new Error(res.error);
        }

        setProducts((prev) => ({ ...prev, data: res.data?.products ?? [] }));
      })
      .catch((e) => {
        notification.error({ message: e?.message });
      })
      .finally(() => {
        setProducts((prev) => ({ ...prev, isLoading: false }));
      });
  }, []);

  return products.isLoading ? (
    <div style={{ color: 'white' }}>Loading...</div>
  ) : (
    <div>
      <ListingHeader products={products.data} />
      <ProductListingTable products={filteredProducts} />
    </div>
  );
};

export default ProductListing;
