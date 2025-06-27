import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../assets/styles/Navbar.css';

interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
}

export default function Navbar({ cartCount, onCartClick }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo">
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <h2>🇵🇷 Raised Ready 🚑</h2>
          </Link>
        </div>

        <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <button className="nav-link" onClick={() => handleNavigation('/')}>
            Home
          </button>
          <button className="nav-link" onClick={() => handleNavigation('/customizer')}>
            Products
          </button>
          <button className="nav-link" onClick={() => handleNavigation('/checkout')}>
            Cart
          </button>
          <button className="nav-link" onClick={() => handleNavigation('/admin')}>
            Admin
          </button>
        </div>

        <div className="nav-actions">
          <button className="cart-button" onClick={onCartClick}>
            🛒 Cart ({cartCount})
          </button>
        </div>

        <div
          className={`nav-toggle ${isMenuOpen ? 'active' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  );
}
