import { useState } from 'react';
import '../assets/styles/Navbar.css';

interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
}

export default function Navbar({ cartCount, onCartClick }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo">
          <h2>🇵🇷 Raised Ready 🚑</h2>
        </div>

        <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <a href="#home" className="nav-link" onClick={() => setIsMenuOpen(false)}>
            Home
          </a>
          <a href="#products" className="nav-link" onClick={() => setIsMenuOpen(false)}>
            Products
          </a>
          <a href="#about" className="nav-link" onClick={() => setIsMenuOpen(false)}>
            About
          </a>
          <a href="#contact" className="nav-link" onClick={() => setIsMenuOpen(false)}>
            Contact
          </a>
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
