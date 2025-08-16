
(() => {
  const year = new Date().getFullYear();
  const y1 = document.getElementById('year'); if (y1) y1.textContent = year;
  const y2 = document.getElementById('year2'); if (y2) y2.textContent = year;
  const updated = document.getElementById('last-updated'); if (updated) updated.textContent = '2025-08-15';

  // Scroll spy to highlight active section
  const links = document.querySelectorAll('.sidebar .nav-link');
  const sections = Array.from(links).map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
  const activate = (id) => {
    links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + id));
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) activate(entry.target.id);
    });
  }, { rootMargin: '-40% 0px -55% 0px', threshold: 0.01 });

  sections.forEach(sec => observer.observe(sec));
})();
