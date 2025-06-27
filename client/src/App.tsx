import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProductCustomizer from './components/ProductCustomizer';
import Checkout from './pages/Checkout';
import Admin from './pages/Admin';

interface CartItem {
  product: {
    name: string;
    price: number;
    image: string;
  };
  design: string | null;
  designImage: string;
  total: number;
}

function AppContent() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const navigate = useNavigate();

  const handleAddToCart = (item: CartItem) => {
    setCartItems(prev => [...prev, item]);
    navigate('/checkout');
  };

  const handleCartClick = () => {
    navigate('/checkout');
  };

  return (
    <>
      <Navbar cartCount={cartItems.length} onCartClick={handleCartClick} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/customizer" element={<ProductCustomizer onAddToCart={handleAddToCart} />} />
        <Route path="/checkout" element={<Checkout cartItems={cartItems} />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
