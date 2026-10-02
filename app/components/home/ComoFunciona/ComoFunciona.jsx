'use client';

import { useState } from 'react';
import './ComoFunciona.css';

// Ícones SVG com dimensões travadas
const IconCardapio = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ width: '24px', height: '24px', minWidth: '24px', minHeight: '24px' }}
  >
    <path d="M3 12h18M3 6h18M3 18h18" />
  </svg>
);

const IconDelivery = () => (
  <svg
    width="24"
    height="24"
    viewBox="100 200 800 600"
    id="Layer_2"
    version="1.1"
    xmlSpace="preserve"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    fill="currentColor"
    transform="matrix(-1, 0, 0, 1, 0, 0)"
    style={{ width: '24px', height: '24px', minWidth: '24px', minHeight: '24px' }}
  >
    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
    <g id="SVGRepo_iconCarrier">
      <path d="M162.035,648.914c-1.491,6.33-2.282,12.926-2.282,19.707c0,47.333,38.363,85.706,85.697,85.706 c45.511,0,82.743-35.484,85.531-80.296l-28.934-4.287c-0.589,30.709-25.759,55.503-56.597,55.503 c-31.215,0-56.616-25.401-56.616-56.625c0-5.345,0.745-10.507,2.125-15.41L162.035,648.914z" />
      <path d="M754.298,646.528c-4.241-2.729-9.289-4.312-14.708-4.312c-7.715,0-14.683,3.208-19.642,8.361 c-3.069,3.193-5.37,7.133-6.598,11.52c-0.656,2.341-1.007,4.811-1.007,7.363c0,15.049,12.198,27.247,27.247,27.247 c15.046,0,27.244-12.198,27.244-27.247c0-2.552-0.351-5.022-1.007-7.363C764.007,655.602,759.839,650.087,754.298,646.528z" />
      <path d="M272.608,669.457c0-1.408-0.11-2.797-0.313-4.149l-51.482-7.655c-0.69,1.417-1.251,2.898-1.684,4.444 c-0.653,2.346-1.003,4.811-1.003,7.360c0,15.051,12.19,27.25,27.241,27.25C260.418,696.707,272.608,684.508,272.608,669.457z" />
      <path d="M794.047,525.35c0.405-34.508-6.863-63.736-31.786-66.91 c-63.984-8.142-183.813-13.957-177.989,27.921c5.814,41.878,57.002,89.579,44.205,112.431 c-12.797,22.843-195.441,21.353-223.363,5.07c-27.921-16.284-61.657-132.626-36.063-204.771 c8.904-25.122,11.597-47.111,11.341-65.13h27.642c2.773,3.201,6.858,5.235,11.426,5.235h51.963c8.353,0,15.124-6.771,15.124-15.123 c0-8.353-6.771-15.124-15.124-15.124h-51.963c-4.568,0-8.653,2.034-11.426,5.235h-29.866c-2.435-8.297-7.083-15.603-13.248-21.277 c-2.051-1.886-4.259-3.588-6.624-5.088c-4.48-24.526-19.964-42.144-38.888-42.144c-22.539,0-40.193,24.987-40.193,56.874 c0,27.296,12.925,49.523,30.782,55.364c-9.219,12.08-21.426,25.668-37.508,40.83c-56.58,53.322-65.706,118.853-65.135,158.338 c-25.747,10.699-46.251,32.458-54.722,60.233c-2.211,7.247,2.565,14.766,10.059,15.882l4.414,0.657l30.507,4.535l16.338,2.429 l38.364,5.704l47.729,7.102l30.479,4.526l4.424,0.658c7.448,1.108,14.246-4.616,14.242-12.146c0-0.047,0-0.094,0-0.141h308.673 c-2.042,7.295-3.137,14.986-3.137,22.935c0,46.873,37.995,84.869,84.869,84.869c46.864,0,84.859-37.996,84.859-84.869 c0-7.949-1.095-15.64-3.137-22.935h1.113c9.521,0,18.04-6.044,21.076-15.079c2.861-8.501,4.407-17.6,4.407-27.066 C847.912,568.452,825.583,537.733,794.047,525.35z M325.912,333.506c-2.107,1.886-4.343,2.916-6.505,2.916 c-8.114,0-17.194-14.49-17.194-33.874c0-19.384,9.08-33.875,17.194-33.875c7.995,0,16.937,14.086,17.186,33.056 c0.009,0.267,0.009,0.543,0.009,0.819C336.602,316.762,331.717,328.345,325.912,333.506z M739.593,725.447 c-30.874,0-55.991-25.116-55.991-55.99c0-8.16,1.757-15.925,4.913-22.935h0.865c-0.156-0.276-0.322-0.562-0.478-0.837 c8.96-19.016,28.317-32.209,50.691-32.209c15.088,0,28.795,5.989,38.87,15.732c5.087,4.913,9.246,10.782,12.19,17.314 c3.165,7.01,4.921,14.775,4.921,22.935C795.574,700.331,770.458,725.447,739.593,725.447z" />
      <path d="M450.634,597.496c16.845,1.693,38.74,2.898,64.822,2.898c55.797,0,90.361-5.75,99.432-10.286 c-0.046-1.444-0.534-4.535-2.98-10.221c-3.202-7.397-8.399-16.173-13.975-25.493c-32.696,24.223-83.415,18.768-111.383,20.663 C466.063,576.446,455.786,587.165,450.634,597.496z" />
      <path d="M770.154,444.051l-11.564-15.75c-7.415-10.093-18.859-16.422-31.344-17.342 c-20.92-1.545-54.399-2.787-81.216,1.877c-24.417,4.25-35.972,19.826-41.372,32.246c17.323-5.41,41.049-8.068,71.529-8.068 c36.192,0,70.701,3.707,88.052,5.915C766.19,443.177,768.167,443.545,770.154,444.051z" />
    </g>
  </svg>
);

const IconWhatsapp = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ width: '24px', height: '24px', minWidth: '24px', minHeight: '24px' }}
  >
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    <polyline points="9 11 11 13 15 9" />
  </svg>
);

const IconLoja = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 512 512"
    fill="currentColor"
    style={{ width: '24px', height: '24px', minWidth: '24px', minHeight: '24px' }}
  >
    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
    <g id="SVGRepo_iconCarrier">
      <g id="Layer_2">
        <g>
          <path d="M88.4,203C88.4,203.1,88.4,203.1,88.4,203c0.2,19.4,11.2,36.2,27.4,44.5v174c0,4.1,3.4,7.5,7.5,7.5h162.1h60.4h42.9 c4.1,0,7.5-3.4,7.5-7.5v-174c16.1-8.4,27.2-25.2,27.4-44.5c0,0,0,0,0,0c0-0.1,0-0.3,0-0.4c0,0,0-0.1,0-0.1c0-0.2,0-0.3,0-0.5 c0-0.1,0-0.2,0-0.3c0-0.1,0-0.3-0.1-0.4c0-0.1,0-0.2-0.1-0.4c0-0.1-0.1-0.2-0.1-0.3c0-0.1-0.1-0.3-0.1-0.4c0-0.1-0.1-0.2-0.1-0.3 c-0.1-0.2-0.1-0.3-0.2-0.4c0,0,0-0.1,0-0.1l-31.9-67.6v-25.7c0-12.8-10.4-23.3-23.3-23.3H144c-12.8,0-23.3,10.4-23.3,23.3v26.3 l-31.6,67c0,0,0,0.1,0,0.1c-0.1,0.1-0.1,0.3-0.2,0.4c0,0.1-0.1,0.2-0.1,0.3c0,0.1-0.1,0.3-0.1,0.4c0,0.1-0.1,0.2-0.1,0.3 c0,0.1,0,0.2-0.1,0.4c0,0.1,0,0.3-0.1,0.4c0,0.1,0,0.2,0,0.3c0,0.2,0,0.3,0,0.5c0,0,0,0.1,0,0.1C88.4,202.8,88.4,202.9,88.4,203z M133.3,141h55.5l-12.5,54.1h-68.6L133.3,141z M307.8,141l12.5,54.1h-56.8V141H307.8z M404.2,195.1h-68.6L323.2,141h55.5 L404.2,195.1z M326,220.1c-6.3,11.1-18.2,18.2-31.1,18.2c-13.2,0-25.3-7.4-31.5-19v-9.1h60.2L326,220.1z M188.3,210.1h60.2v9.1 c-6.1,11.6-18.3,19-31.5,19c-12.9,0-24.8-7.1-31.1-18.2L188.3,210.1z M248.5,195.1h-56.8l12.5-54.1h44.3V195.1z M104.2,210.1h68.6 l-1.9,8.4c-6,12-18.4,19.8-31.9,19.8C122,238.3,107.7,226.2,104.2,210.1z M292.9,414.1v-72.9c0-0.9,0.7-1.6,1.6-1.6h42.3 c0.9,0,1.6,0.7,1.6,1.6v72.9H292.9z M381.2,414.1h-27.9v-72.9c0-9.1-7.4-16.6-16.6-16.6h-42.3c-9.1,0-16.6,7.4-16.6,16.6v72.9 H130.8V252.6c2.7,0.4,5.4,0.7,8.3,0.7c15.2,0,29.5-6.9,39-18.4c9.5,11.4,23.8,18.4,39,18.4s29.5-6.9,39-18.4 c9.5,11.4,23.8,18.4,39,18.4s29.5-6.9,39-18.4c9.5,11.4,23.8,18.4,39,18.4c2.8,0,5.6-0.2,8.3-0.7V414.1z M372.9,238.3 c-13.5,0-25.9-7.7-31.9-19.8l-1.9-8.4h68.6C404.3,226.2,390,238.3,372.9,238.3z M135.8,106.2c0-4.5,3.7-8.3,8.3-8.3h223.7 c4.5,0,8.3,3.7,8.3,8.3V126H135.8V106.2z"></path>
          <path d="M237.8,272.6h-81.3c-4.1,0-7.5,3.4-7.5,7.5v65c0,4.1,3.4,7.5,7.5,7.5h81.3c4.1,0,7.5-3.4,7.5-7.5v-65 C245.3,275.9,241.9,272.6,237.8,272.6z M230.3,305.1h-25.7v-17.5h25.7V305.1z M189.6,287.6v17.5H164v-17.5H189.6z M164,320.1h25.7 v17.5H164V320.1z M204.6,337.6v-17.5h25.7v17.5H204.6z"></path>
        </g>
      </g>
    </g>
  </svg>
);

const IconBurger = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ width: '24px', height: '24px', minWidth: '24px', minHeight: '24px' }}
  >
    <path d="M6 10a6 6 0 0 1 12 0v2H6v-2z" />
    <path d="M4 15h16a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-1a1 1 0 0 1 1-1z" />
    <path d="M5 21h14" />
  </svg>
);

export default function ComoFunciona() {
  const [opcao, setOpcao] = useState('online');

  const passosOnline = [
    {
      numero: '01',
      icon: <IconCardapio />,
      titulo: 'MONTE SEU PEDIDO',
      descricao: 'Navegue pelo cardápio, escolha hambúrgueres, combos, batatas e bebidas e adicione ao carrinho.',
      imagemBg: '/assets/img/passo-1.jpg'
    },
    {
      numero: '02',
      icon: <IconDelivery />,
      titulo: 'ENTREGA, RETIRADA OU MESA',
      descricao: 'Você decide se a gente entrega onde você estiver, deixa pronto para retirada ou garante seu lugar na nossa casa.',
      imagemBg: '/assets/img/passo-2.jpg'
    },
    {
      numero: '03',
      icon: <IconWhatsapp />,
      titulo: 'CONFIRME NO WHATSAPP',
      descricao: 'O resumo do pedido é enviado pronto — é só confirmar por lá com a gente sem complicação.',
      imagemBg: '/assets/img/passo-3.jpg'
    }
  ];

  const passosLoja = [
    {
      numero: '01',
      icon: <IconLoja />,
      titulo: 'VISITE NOSSO ESPAÇO',
      descricao: 'Venha conhecer nosso ambiente artesanal com alma retro e acomode-se em nossas mesas.',
      imagemBg: '/assets/img/loja-1.jpg'
    },
    {
      numero: '02',
      icon: <IconCardapio />,
      titulo: 'PEÇA PELO QR CODE OU BALCÃO',
      descricao: 'Acesse nosso cardápio digital na mesa ou faça o pedido diretamente com a nossa equipe.',
      imagemBg: '/assets/img/loja-2.jpg'
    },
    {
      numero: '03',
      icon: <IconBurger />,
      titulo: 'SABOREIE NA HORA',
      descricao: 'Seu burger preparado na hora, quente, suculento e acompanhado das melhores bebidas.',
      imagemBg: '/assets/img/loja-3.jpg'
    }
  ];

  const steps = opcao === 'online' ? passosOnline : passosLoja;

  return (
    <section className="como-funciona">
      <div className="como-funciona-container">
        <h2 className="como-funciona-title">COMO FUNCIONA</h2>
        <p className="como-funciona-subtitle">
         Faça seu pedido em poucos cliques e aproveite como preferir.
        </p>

        {/* Botões de alternância */}
        <div className="toggle-wrapper">
          <div className="toggle-container">
            <button
              type="button"
              className={`toggle-btn ${opcao === 'online' ? 'active' : ''}`}
              onClick={() => setOpcao('online')}
            >
              Pedido Online
            </button>
            <button
              type="button"
              className={`toggle-btn ${opcao === 'loja' ? 'active' : ''}`}
              onClick={() => setOpcao('loja')}
            >
              Comer conosco
            </button>
          </div>
        </div>

        {/* Grade de Passos */}
        <div className="steps-grid">
          {steps.map((step) => (
            <div
              key={step.numero}
              className="step-card"
              style={{ backgroundImage: `url(${step.imagemBg})` }}
            >
              <div className="step-header">
                <span className="step-number">{step.numero}</span>
                <div className="step-icon-box">{step.icon}</div>
              </div>
              <h3 className="step-title">{step.titulo}</h3>
              <p className="step-description">{step.descricao}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
