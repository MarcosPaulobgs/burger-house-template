import Link from 'next/link';
import './Header.css';

export default function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <Link href="/" className="logo-container">
          <img 
            src="/assets/img/logo.png" 
            alt="Burger House Logo" 
            className="logo-img" 
          />
          <div className="logo-text">
            <span className="logo-title">BURGER HOUSE</span>
            <span className="logo-subtitle">Burgers & Hot dogs</span>
          </div>
        </Link>
      </div>
    </header>
  );
}