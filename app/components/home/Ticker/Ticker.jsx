import './Ticker.css';

export default function Ticker() {
  const items = [
    'BURGER 100% ARTESANAL',
    'ENTREGA RÁPIDA',
    'MOLHO ESPECIAL DA CASA',
    'PÃO SELADO NA MANTEIGA',
    'HOT DOGS INSANOS',
    'CARNE SUCULENTA'
  ];

  return (
    <div className="ticker-wrapper">
      <div className="ticker-track">
        {[...items, ...items, ...items, ...items].map((text, index) => (
          <div key={index} className="ticker-item">
            <span>{text}</span>
            <span className="ticker-star">★</span>
          </div>
        ))}
      </div>
    </div>
  );
}