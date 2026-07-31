(function () {
  const root = document.documentElement;
  const toggles = document.querySelectorAll('[data-theme-toggle]');
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)');

  function currentTheme() {
    return root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  }

  function applyLabel() {
    const label = currentTheme() === 'dark' ? 'Light' : 'Dark';
    toggles.forEach((btn) => { btn.textContent = label; });
  }

  // `persist` is false when following the system theme automatically —
  // only an explicit user click should create a stored override.
  function setTheme(theme, persist) {
    root.setAttribute('data-theme', theme);
    if (persist) localStorage.setItem('theme', theme);
    applyLabel();
  }

  toggles.forEach((btn) => {
    btn.addEventListener('click', () => {
      setTheme(currentTheme() === 'dark' ? 'light' : 'dark', true);
    });
  });
  applyLabel();

  // Follow the system theme live as long as the user hasn't overridden it.
  systemDark.addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      setTheme(e.matches ? 'dark' : 'light', false);
    }
  });

  const hamburger = document.querySelector('[data-menu-toggle]');
  const mobileNav = document.querySelector('[data-mobile-nav]');
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('is-open');
      hamburger.setAttribute('aria-expanded', String(isOpen));
    });
    mobileNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('is-open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const progressBar = document.querySelector('[data-progress]');
  if (progressBar) {
    const updateProgress = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = scrollable > 0 ? window.scrollY / scrollable : 0;
      progressBar.style.width = `${Math.min(Math.max(ratio, 0), 1) * 100}%`;
    };
    document.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
  }

  // Scroll spy for case-study TOC
  const tocLinks = document.querySelectorAll('.case-toc__link');
  const caseSections = document.querySelectorAll('.case-section');
  if (tocLinks.length && caseSections.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          tocLinks.forEach((link) => link.classList.remove('is-active'));
          const id = entry.target.getAttribute('id');
          const active = document.querySelector(`.case-toc__link[href="#${id}"]`);
          if (active) active.classList.add('is-active');
        }
      });
    }, { rootMargin: '0px 0px -60% 0px', threshold: 0 });
    caseSections.forEach((section) => observer.observe(section));
  }
})();
