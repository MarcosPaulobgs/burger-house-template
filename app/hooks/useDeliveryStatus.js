"use client";

import { useEffect, useState } from "react";

// Calcula se o delivery está aberto agora, com base no horário
// cadastrado no rodapé (Terça a Domingo, 19h às 23h. Fechado às segundas).
function calcularDeliveryAberto() {
  const agora = new Date();
  const dia = agora.getDay(); // 0 = domingo ... 1 = segunda ... 6 = sábado
  const minutosAgora = agora.getHours() * 60 + agora.getMinutes();

  if (dia === 1) return false; // fechado às segundas

  const abertura = 19 * 60; // 19:00
  const fechamento = 23 * 60; // 23:00
  return minutosAgora >= abertura && minutosAgora < fechamento;
}

// Hook reutilizável: qualquer página que precisar do status do
// delivery (aberto/fechado) importa isso em vez de duplicar a lógica.
export default function useDeliveryStatus() {
  const [deliveryAberto, setDeliveryAberto] = useState(null);

  useEffect(() => {
    function atualizar() {
      setDeliveryAberto(calcularDeliveryAberto());
    }
    atualizar();
    const intervalo = setInterval(atualizar, 60000); // atualiza a cada 1 min
    return () => clearInterval(intervalo);
  }, []);

  return deliveryAberto;
}
