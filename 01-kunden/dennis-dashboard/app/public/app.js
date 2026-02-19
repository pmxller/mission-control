(() => {
  const key = 'dennis-dashboard-theme';
  const body = document.body;
  const toggle = document.getElementById('themeToggle');

  if (localStorage.getItem(key) === 'dark') body.classList.add('dark');

  if (toggle) {
    toggle.addEventListener('click', () => {
      body.classList.toggle('dark');
      localStorage.setItem(key, body.classList.contains('dark') ? 'dark' : 'light');
    });
  }
})();
