import Link from 'next/link';
import './Destaques.css';

const PRODUTOS_DESTAQUE = [
  {
    id: '1',
    nome: 'NACHOS',
    descricao: 'Hambúrguer artesanal com nachos crocantes, cheddar derretido, bacon, picles e molho verde especial servido no pão brioche.',
    preco: 'R$ 38,90',
    imagem: '/assets/img/burger-1.jpg'
  },
  {
    id: '2',
    nome: 'HAMBÚRGUER TRIPLO',
    descricao: 'Três suculentos hambúrgueres artesanais com queijo derretido entre as camadas e rodelas de abacaxi grelhado no pão brioche.',
    preco: 'R$ 48,90',
    imagem: '/assets/img/burger-2.jpg'
  },
  {
    id: '3',
    nome: 'MARÉ',
    descricao: 'Hambúrguer artesanal com cheddar, queijo coalho grelhado, bacon crocante, banana e maionese especial no pão com gergelim.',
    preco: 'R$ 36,90',
    imagem: '/assets/img/burger-3.jpg'
  }
];

export default function Destaques() {
  return (
    <section className="destaques">
      <div className="destaques-container">
        <div className="destaques-header">
          <span className="destaques-tagline">OS QUERIDINHOS DA CASA</span>
          <h2 className="destaques-title">
            CAMPEÕES DE <span className="highlight">VENDAS</span>
          </h2>
        </div>

        <div className="destaques-grid">
          {PRODUTOS_DESTAQUE.map((item) => (
            <div key={item.id} className="destaque-card">
              <div className="card-img-wrapper">
                <img src={item.imagem} alt={item.nome} className="card-img" />
              </div>

              <div className="card-content">
                <h3 className="card-title">{item.nome}</h3>
                <p className="card-description">{item.descricao}</p>

                <div className="card-footer">
                  <span className="card-price">{item.preco}</span>
                  <Link href="/pedido" className="btn-card">
                    PEDIR AGORA
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="destaques-cta">
          <Link href="/pedido" className="btn-ver-cardapio">
            VER CARDÁPIO COMPLETO
          </Link>
        </div>
      </div>
    </section>
  );
}