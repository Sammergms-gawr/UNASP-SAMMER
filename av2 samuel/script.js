// Bloco 1: FAQ em accordion
// Este trecho espera a página carregar completamente e busca todos os itens da FAQ.
// Cada item contém pergunta e resposta, e ao clicar na pergunta, a resposta abre ou fecha.
document.addEventListener('DOMContentLoaded', () => {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach((item) => {
    const button = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    if (!button || !answer) return;

    // Atualiza o estado visual do item: abre/fecha a resposta e ajusta a altura da caixa.
    const setOpenState = (isOpen) => {
      item.classList.toggle('open', isOpen);
      answer.style.maxHeight = isOpen ? `${answer.scrollHeight}px` : '0px';
      button.setAttribute('aria-expanded', String(isOpen));
    };

    // Mantém o estado inicial do FAQ conforme a classe 'open' já existente no HTML.
    setOpenState(item.classList.contains('open'));

    // Ao clicar na pergunta, alterna entre abrir e fechar o item, e fecha os demais.
    button.addEventListener('click', () => {
      const shouldOpen = !item.classList.contains('open');

      faqItems.forEach((faqItem) => {
        const faqAnswer = faqItem.querySelector('.faq-answer');
        const faqButton = faqItem.querySelector('.faq-question');
        faqItem.classList.remove('open');
        if (faqAnswer) {
          faqAnswer.style.maxHeight = '0px';
        }
        if (faqButton) {
          faqButton.setAttribute('aria-expanded', 'false');
        }
      });

      setOpenState(shouldOpen);
    });
  });
});

// Bloco 2: Galeria de imagens
// Esse trecho também espera o carregamento da página e seleciona a seção de galeria.
// Ele controla a navegação entre slides, os indicadores e o avanço automático.
document.addEventListener('DOMContentLoaded', () => {
  const gallery = document.querySelector('.gallery');
  if (!gallery) return;

  const slides = Array.from(gallery.querySelectorAll('.slide'));
  const prevBtn = gallery.querySelector('.gallery-prev');
  const nextBtn = gallery.querySelector('.gallery-next');
  const indicators = Array.from(gallery.querySelectorAll('.indicator'));
  let current = slides.findIndex(s => s.classList.contains('active'));
  if (current === -1) current = 0;
  let interval = null;

  // Exibe o slide informado e marca o indicador correspondente como ativo.
  function show(index) {
    slides.forEach((s, i) => s.classList.toggle('active', i === index));
    indicators.forEach((btn, i) => btn.classList.toggle('active', i === index));
    current = index;
  }

  // Vai para o próximo slide, com rotação ao fim da lista.
  function next() { show((current + 1) % slides.length); }
  // Vai para o slide anterior, com rotação ao início da lista.
  function prev() { show((current - 1 + slides.length) % slides.length); }

  // Botões de próximo e anterior: movem os slides e reiniciam o autoplay.
  nextBtn && nextBtn.addEventListener('click', () => { next(); resetAuto(); });
  prevBtn && prevBtn.addEventListener('click', () => { prev(); resetAuto(); });

  // Cada indicador pode ser clicado para ir diretamente para um slide específico.
  indicators.forEach((btn) => {
    btn.addEventListener('click', () => {
      const idx = Number(btn.dataset.index);
      if (!Number.isNaN(idx)) {
        show(idx);
        resetAuto();
      }
    });
  });

  // Inicia o avanço automático da galeria a cada 5 segundos.
  function startAuto() {
    clearInterval(interval);
    interval = setInterval(next, 5000);
  }

  // Reinicia o timer do automático quando o usuário interage com a galeria.
  function resetAuto() {
    clearInterval(interval);
    startAuto();
  }

  // Pausa o autoplay ao passar o mouse sobre a galeria e reativa ao sair.
  gallery.addEventListener('mouseenter', () => clearInterval(interval));
  gallery.addEventListener('mouseleave', () => startAuto());

  // Inicializa a galeria com o slide atual visível e começa o autoplay.
  show(current);
  startAuto();
});
