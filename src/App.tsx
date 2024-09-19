import './App.css';
import { Routes, Route } from 'react-router-dom';
import ProductListing from './pages/ProductListing';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import CartContextProvider from './context/cart/Cart';
import ProductsProvider from './context/product/Product';

function App() {
  return (
    <ProductsProvider>
      <CartContextProvider>
        <Routes>
          <Route path="/" element={<ProductListing />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </CartContextProvider>
    </ProductsProvider>
  );
}

export default App;
