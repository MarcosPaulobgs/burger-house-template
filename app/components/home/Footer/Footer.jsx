'use client';

import { useState } from 'react';
import Link from 'next/link';
import Logo from '../../../Logo';
import useDeliveryStatus from '../../../hooks/useDeliveryStatus';
import { NUMERO_WHATSAPP, INSTAGRAM_URL } from '../../../data/cardapio';
import './Footer.css';

// Formata o número puro (55DDXXXXXXXXX) em "(DD) XXXXX-XXXX" para exibição
function formatarTelefone(numero) {
  const semDDI = numero.replace(/^55/, '');
  const ddd = semDDI.slice(0, 2);
  const parte1 = semDDI.slice(2, 7);
  const parte2 = semDDI.slice(7);
  return `(${ddd}) ${parte1}-${parte2}`;
}

const IconInstagram = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

const IconWhatsApp = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.205 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/>
  </svg>
);

const IconLocalizacao = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

const IconMenu = () => (
  <svg className="footer-title-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

const IconRelogio = () => (
  <svg className="footer-title-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>
);

const IconMapa = () => (
  <svg className="footer-title-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

const IconRua = () => (
  <svg className="footer-info-icon" viewBox="0 0 48 48" fill="none">
    <path d="M24 20C28.4183 20 32 16.4183 32 12C32 7.58172 28.4183 4 24 4C19.5817 4 16 7.58172 16 12C16 16.4183 19.5817 20 24 20Z" fill="currentColor" stroke="currentColor" strokeWidth="4" strokeJoin="round"/>
    <path d="M24 20V38" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16 32H12L4 44H44L36 32H32" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconTelefone = () => (
  <svg className="footer-info-icon" viewBox="0 0 512 512" fill="currentColor">
    <path d="M94.811,21.696c-35.18,22.816-42.091,94.135-28.809,152.262c10.344,45.266,32.336,105.987,69.42,163.165 c34.886,53.79,83.557,102.022,120.669,129.928c47.657,35.832,115.594,58.608,150.774,35.792 c17.789-11.537,44.218-43.058,45.424-48.714c0,0-15.498-23.896-18.899-29.14l-51.972-80.135 c-3.862-5.955-28.082-0.512-40.386,6.457c-16.597,9.404-31.882,34.636-31.882,34.636c-11.38,6.575-20.912,0.024-40.828-9.142 c-24.477-11.262-51.997-46.254-73.9-77.947c-20.005-32.923-40.732-72.322-41.032-99.264c-0.247-21.922-2.341-33.296,8.304-41.006 c0,0,29.272-3.666,44.627-14.984c11.381-8.392,26.228-28.286,22.366-34.242l-51.972-80.134c-3.401-5.244-18.899-29.14-18.899-29.14 C152.159-1.117,112.6,10.159,94.811,21.696z"/>
  </svg>
);

const IconChevron = () => (
  <svg className="chevron-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);

export default function Footer() {
  const [openSection, setOpenSection] = useState(null);
  const deliveryAberto = useDeliveryStatus();

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const handleLogoClick = (e) => {
    if (window.location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Coluna 1: Marca */}
          <div className="footer-col brand-col">
            <Link href="/" className="footer-logo-brand" onClick={handleLogoClick}>
              <Logo />
              <div className="footer-brand-text">
                <span className="footer-brand-title">BURGER HOUSE</span>
                <span className="footer-brand-subtitle">Burgers & Hot dogs</span>
              </div>
            </Link>
            <p className="footer-about">
              O autêntico hambúrguer artesanal com sabor inconfundível e alma retro.
            </p>
            <div className="footer-socials">
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <IconInstagram />
              </a>
              <a href={`https://wa.me/${NUMERO_WHATSAPP}`} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                <IconWhatsApp />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Localização">
                <IconLocalizacao />
              </a>
            </div>
          </div>

          {/* Coluna 2: Navegação */}
          <div className={`footer-col ${openSection === 'nav' ? 'is-open' : ''}`}>
            <button className="footer-accordion-btn" onClick={() => toggleSection('nav')}>
              <h4 className="footer-title header-with-icon">
                <IconMenu /> NAVEGAÇÃO
              </h4>
              <IconChevron />
            </button>
            <div className="footer-content">
              <ul className="footer-links">
                <li><Link href="/">Início</Link></li>
                <li><Link href="/pedido">Cardápio & Pedidos</Link></li>
                <li><Link href="/duvidas">Dúvidas Frequentes</Link></li>
              </ul>
            </div>
          </div>

          {/* Coluna 3: Horário */}
          <div className={`footer-col ${openSection === 'hours' ? 'is-open' : ''}`}>
            <button className="footer-accordion-btn" onClick={() => toggleSection('hours')}>
              <h4 className="footer-title header-with-icon">
                <IconRelogio /> HORÁRIO
              </h4>
              <IconChevron />
            </button>
            <div className="footer-content">
              <div className="footer-hours">
                <p>Terça a Domingo: 19h às 23h</p>
                <p>Segunda: Fechado</p>
                {deliveryAberto !== null && (
                  <span className={`badge-status ${deliveryAberto ? '' : 'is-fechado'}`}>
                    {deliveryAberto ? 'Aberto Agora' : 'Fechado no Momento'}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Coluna 4: Localização */}
          <div className={`footer-col ${openSection === 'loc' ? 'is-open' : ''}`}>
            <button className="footer-accordion-btn" onClick={() => toggleSection('loc')}>
              <h4 className="footer-title header-with-icon">
                <IconMapa /> LOCALIZAÇÃO
              </h4>
              <IconChevron />
            </button>
            <div className="footer-content">
              <div className="footer-hours">
                <p className="footer-info-item">
                  <IconRua />
                  <span>Rua Exemplo, 000 - Centro</span>
                </p>
                <p className="footer-info-item">
                  <IconTelefone />
                  <span>{formatarTelefone(NUMERO_WHATSAPP)}</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Burger House. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}