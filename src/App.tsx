import './App.css';
import { Routes, Route } from 'react-router-dom';
import ProductListing from './pages/ProductListing';
import Checkout from './pages/Checkout';
import FinalPage from './pages/FinalPage';
import CartContextProvider from './context/cart/Cart';
import ProductsProvider from './context/product/Product';

function App() {
  return (
    <ProductsProvider>
      <CartContextProvider>
        <Routes>
          <Route path="/" element={<ProductListing />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/end" element={<FinalPage />} />
        </Routes>
      </CartContextProvider>
    </ProductsProvider>
  );
}

export default App;
