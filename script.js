// =============================================================
// Finanças com Leitura — script
// Checklist com persistência em localStorage + contadores
// =============================================================

(function() {
  'use strict';

  // Inicializar checkboxes da página de tarefas
  function initChecklist() {
    const tasks = document.querySelectorAll('.task');
    if (tasks.length === 0) return;

    tasks.forEach(task => {
      const checkbox = task.querySelector('input[type="checkbox"]');
      if (!checkbox) return;

      const key = checkbox.dataset.key;
      if (!key) return;

      // Restaurar estado de localStorage
      try {
        const saved = localStorage.getItem(key);
        if (saved === 'true') {
          checkbox.checked = true;
          task.classList.add('done');
        }
      } catch (e) {
        // localStorage indisponível (modo privado, etc)
      }

      // Listener para guardar mudanças
      checkbox.addEventListener('change', function() {
        try {
          localStorage.setItem(key, checkbox.checked ? 'true' : 'false');
        } catch (e) {}
        task.classList.toggle('done', checkbox.checked);
        updatePhaseProgress(task.closest('.phase'));
      });

      // Permitir clicar em qualquer parte da task
      task.addEventListener('click', function(e) {
        if (e.target.tagName !== 'INPUT') {
          checkbox.checked = !checkbox.checked;
          checkbox.dispatchEvent(new Event('change'));
        }
      });
    });

    // Atualizar contadores iniciais
    document.querySelectorAll('.phase').forEach(updatePhaseProgress);
  }

  function updatePhaseProgress(phase) {
    if (!phase) return;
    const tasks = phase.querySelectorAll('.task input[type="checkbox"]');
    const done = phase.querySelectorAll('.task input[type="checkbox"]:checked');
    const progressEl = phase.querySelector('.progress');
    if (!progressEl) return;

    const total = tasks.length;
    const completed = done.length;
    progressEl.textContent = completed + ' de ' + total + ' concluídas';
    progressEl.classList.toggle('complete', completed === total && total > 0);
  }

  // Animação fade-in subtil ao scroll
  function initFadeIn() {
    if (!('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.section, .featured, .law-card, .financial-law').forEach(el => {
      observer.observe(el);
    });
  }

  // Init quando DOM pronto
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      initChecklist();
      // initFadeIn(); // Desativado por defeito para evitar piscar; ativar se desejado
    });
  } else {
    initChecklist();
  }
})();
