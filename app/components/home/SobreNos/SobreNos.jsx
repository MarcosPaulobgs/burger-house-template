import React from 'react';
import './SobreNos.css';

export default function SobreNos() {
  return (
    <section className="sobre-nos" id="sobre-nos">
      <div className="sobre-nos-container">
        <div className="sobre-nos-header">
          <span className="sobre-nos-tag">NOSSA HISTÓRIA</span>
          <h2 className="sobre-nos-title">SABOR ARTESANAL</h2>
        </div>

        <div className="sobre-nos-content">
          <p className="sobre-nos-text">
            Nossa jornada começou com uma ideia simples: servir o hambúrguer artesanal perfeito. 
            Selecionamos diariamente os melhores cortes de carne, preparamos molhos exclusivos e 
            utilizamos pães sempre frescos, assados no mesmo dia.
          </p>
          <p className="sobre-nos-text">
            Acreditamos na essência da verdadeira chapa: selar a carne na temperatura certa para 
            garantir suculência, sabor marcante e uma experiência inesquecível a cada mordida.
          </p>
        </div>
      </div>
    </section>
  );
}