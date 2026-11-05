document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('mobileMenuToggle');
    const navDrawer = document.getElementById('mobileNavMenu');
          
    if (toggleBtn && navDrawer) {
      toggleBtn.addEventListener('click', () => {
        const isOpen = navDrawer.classList.toggle('active');
        toggleBtn.setAttribute('aria-expanded', isOpen);
        navDrawer.setAttribute('aria-hidden', !isOpen);
      });
  
      // Close menu when a link inside it is clicked
      navDrawer.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          navDrawer.classList.remove('active');
          toggleBtn.setAttribute('aria-expanded', 'false');
          navDrawer.setAttribute('aria-hidden', 'true');
        });
      });
    }
  });