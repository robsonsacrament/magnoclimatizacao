// Menu para celulares.
const menuButton = document.querySelector('button[aria-label="Abrir menu"]');
const mobileMenu = document.getElementById('mobile-nav');
function setMenu(open) {
  if (!menuButton || !mobileMenu) return;
  mobileMenu.hidden = !open;
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.querySelector('path')?.setAttribute('d', open ? 'M6 6l12 12M18 6L6 18' : 'M4 7h16M4 12h16M4 17h16');
}
menuButton?.addEventListener('click', () => setMenu(mobileMenu?.hidden ?? false));
mobileMenu?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
// Perguntas frequentes: cada resposta pode abrir ou fechar independentemente.
document.querySelectorAll('h3 button[aria-expanded]').forEach(button => {
  const panel = button.closest('h3')?.nextElementSibling;
  if (!panel) return;
  button.addEventListener('click', () => {
    const open = button.getAttribute('aria-expanded') !== 'true';
    button.setAttribute('aria-expanded', String(open));
    panel.classList.toggle('grid-rows-[1fr]', open);
    panel.classList.toggle('grid-rows-[0fr]', !open);
    button.querySelector('span')?.classList.toggle('rotate-45', open);
  });
});
// Animações de entrada ao rolar a página.
const sections = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  }), { threshold: 0.12 });
  sections.forEach(section => observer.observe(section));
} else {
  sections.forEach(section => section.classList.add('is-visible'));
}
