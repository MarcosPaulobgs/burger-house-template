import Link from 'next/link';
import Ticker from '../Ticker/Ticker';
import './Hero.css';

export default function Hero() {
  return (
    <section className="hero">
      <video 
        className="hero-video" 
        autoPlay 
        loop 
        muted 
        playsInline
        poster="https://res.cloudinary.com/gfbljogf/image/upload/v1788385718/frame_001.webp"
      >
        <source src="https://res.cloudinary.com/gfbljogf/video/upload/v1788368633/0902.mp4" type="video/mp4" />
      </video>
      
      <div className="hero-overlay" />

      <div className="hero-container">
        {/* Lado Esquerdo: Conteúdo Principal */}
        <div className="hero-content">
          <span className="hero-tagline">ARTESANAL & TRADICIONAL</span>
          
          <div className="hero-title-group">
            <h1 className="hero-title">
              O VERDADEIRO <br />
              SABOR DO <br />
              <span className="highlight">HAMBÚRGUER</span>
            </h1>

            <p className="hero-description">
              Hambúrgueres suculentos, hot dogs insanos e o melhor da chapa. Peça online e receba na sua casa.
            </p>

            <div className="hero-actions">
              <Link href="/pedido" className="btn-primary">
                FAZER PEDIDO
              </Link>
            </div>

            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-number">30 MIN</span>
                <span className="stat-label">entrega rápida</span>
              </div>

              <div className="stat-item">
                <span className="stat-number">10 MIL+</span>
                <span className="stat-label">burgers entregues</span>
              </div>

              <div className="stat-item">
                <span className="stat-number">100%</span>
                <span className="stat-label">artesanal na chapa</span>
              </div>
            </div>
          </div>
        </div>

        {/* Lado Direito: Selo / Badge */}
        <div className="hero-badge-container">
          <div className="hero-badge">
            <img src="/assets/img/selo.png" alt="Selo de Qualidade" />
          </div>
        </div>
      </div>

      <Ticker />
    </section>
  );
}