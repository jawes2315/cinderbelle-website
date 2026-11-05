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
  // Service Checklists Data
const serviceChecklists = {
    standard: {
      title: "Standard Clean Checklist",
      badge: "Recurring & Maintenance",
      rooms: [
        {
          room: "Kitchen",
          items: [
            "Cabinets front cleaned and sanitized",
            "Countertops and shelves dusted and/or wiped",
            "Sinks and backsplash washed",
            "Exterior of appliances cleaned (stovetop, oven, fridge, microwave, dishwasher)",
            "All surfaces dusted and/or wiped",
            "Doorknobs sanitized, door frames, doors, light switches wiped",
            "Floor vacuumed and washed"
          ]
        },
        {
          room: "Bedrooms",
          items: [
            "All surfaces dusted",
            "High and low dusting",
            "Carpeted floors vacuumed",
            "Hard surface floors vacuumed and damp-mopped",
            "Mirrors (height limit < 6 feet from floor)",
            "Doorknobs sanitized, doorframes, doors, light switches cleaned",
            "Bed sheets changed (must leave clean ones out)"
          ]
        },
        {
          room: "Bathrooms",
          items: [
            "Sink cleaned and sanitized",
            "Bathtub, shower walls, glass doors cleaned and sanitized",
            "Toilet inside and out cleaned and sanitized",
            "Mirrors (height limit < 6 feet from floor)",
            "Vanity cleaned and sanitized",
            "Countertops and shelves dusted and/or wiped",
            "All surfaces dusted and/or wiped",
            "Baseboards dusted and/or wiped",
            "Doorknobs sanitized, doorframes, doors, light switches wiped",
            "Trash removed",
            "Floor vacuumed and washed"
          ]
        },
        {
          room: "All Other Rooms",
          items: [
            "All surfaces dusted and/or wiped",
            "Carpeted floors vacuumed",
            "Hard surface floors vacuumed and damp-mopped",
            "Mirrors (height limit < 6 feet from floor)",
            "High and low dusting",
            "Doorknob, doorframes, doors, light switches cleaned"
          ]
        }
      ]
    },
    deep: {
      title: "Deep Clean Checklist",
      badge: "Thorough Deep Scrub",
      rooms: [
        {
          room: "Kitchen",
          items: [
            "Cabinets front and inside doors cleaned (inside cleaned if cupboards empty)",
            "Countertops and shelves dusted and/or wiped",
            "Sinks and backsplash washed",
            "Exterior of appliances cleaned (stovetop, oven, fridge, microwave, dishwasher)",
            "Interior oven cleaned",
            "All surfaces dusted and/or wiped",
            "Windows, window tracks & sills (interior only | height limit < 6 feet)",
            "Baseboards dusted and/or wiped",
            "Doorknobs sanitized, door frames, doors, light switches wiped",
            "Trash removed",
            "Floor vacuumed and washed"
          ]
        },
        {
          room: "Bedrooms",
          items: [
            "All surfaces dusted",
            "Closets vacuumed if accessible",
            "Carpeted floors vacuumed",
            "Hard surface floors vacuumed and damp-mopped",
            "Mirrors (height limit < 6 feet from floor)",
            "Windows, window tracks & sills (interior only | height limit < 6 feet)",
            "Baseboards dusted and/or wiped",
            "Spot clean walls",
            "Doorknobs sanitized, doorframes, doors, light switches cleaned",
            "Bed sheets changed (must leave clean ones out)"
          ]
        },
        {
          room: "Bathrooms",
          items: [
            "Sink cleaned and sanitized",
            "Bathtub, shower walls, glass doors cleaned and sanitized",
            "Toilet inside and out cleaned and sanitized",
            "Mirrors (height limit < 6 feet from floor)",
            "Vanity cleaned and sanitized",
            "Countertops and shelves dusted and/or wiped",
            "All surfaces dusted and/or wiped",
            "Windows, window tracks & sills (interior only | height limit < 6 feet)",
            "Baseboards dusted and/or wiped",
            "Marks on walls and baseboards cleaned",
            "Doorknobs sanitized, doorframes, doors, light switches wiped",
            "Trash removed",
            "Floor vacuumed and washed"
          ]
        },
        {
          room: "All Other Rooms",
          items: [
            "All surfaces dusted and/or wiped",
            "Closets cleaned if accessible",
            "Carpeted floors vacuumed",
            "Hard surface floors vacuumed and damp-mopped",
            "Mirrors (height limit < 6 feet from floor)",
            "Windows, window tracks & sills (interior only | height limit < 6 feet)",
            "Baseboards dusted and/or wiped",
            "Marks on walls and baseboards cleaned",
            "Doorknob, doorframes, doors, light switches cleaned"
          ]
        }
      ]
    },
    move: {
      title: "Move In / Move Out Checklist",
      badge: "Turnover & Empty Home Clean",
      rooms: [
        {
          room: "Kitchen",
          items: [
            "Cabinets front and inside thoroughly cleaned",
            "Countertops and shelves dusted and/or wiped",
            "Sinks and backsplash washed",
            "Exterior of appliances cleaned (stovetop, oven, fridge, microwave, dishwasher)",
            "Interior oven and fridge cleaned",
            "All surfaces dusted and/or wiped",
            "Windows, window tracks & sills (interior only | height limit < 6 feet)",
            "Baseboards dusted and/or wiped",
            "Marks on walls and baseboards cleaned",
            "Doorknobs sanitized, door frames, doors, light switches wiped",
            "Trash removed",
            "Floor vacuumed and washed"
          ]
        },
        {
          room: "Bedrooms",
          items: [
            "All surfaces dusted",
            "Closets front and inside cleaned",
            "Carpeted floors vacuumed",
            "Hard surface floors vacuumed and damp-mopped",
            "Mirrors (height limit < 6 feet from floor)",
            "Windows, window tracks & sills (interior only | height limit < 6 feet)",
            "Baseboards dusted and/or wiped",
            "Marks on walls and baseboards cleaned",
            "Doorknobs sanitized, doorframes, doors, light switches cleaned"
          ]
        },
        {
          room: "Bathrooms",
          items: [
            "Sink cleaned and sanitized",
            "Bathtub, shower walls, glass doors cleaned and sanitized",
            "Toilet inside and out cleaned and sanitized",
            "Mirrors (height limit < 6 feet from floor)",
            "Cabinets front and inside cleaned",
            "Countertops and shelves dusted and/or wiped",
            "All surfaces dusted and/or wiped",
            "Windows, window tracks & sills (interior only | height limit < 6 feet)",
            "Baseboards dusted and/or wiped",
            "Marks on walls and baseboards cleaned",
            "Doorknobs sanitized, doorframes, doors, light switches wiped",
            "Trash removed",
            "Floor vacuumed and washed"
          ]
        },
        {
          room: "All Other Rooms",
          items: [
            "All surfaces dusted and/or wiped",
            "Closet fronts and inside cleaned",
            "Carpeted floors vacuumed",
            "Hard surface floors vacuumed and damp-mopped",
            "Mirrors (height limit < 6 feet from floor)",
            "Windows, window tracks & sills (interior only | height limit < 6 feet)",
            "Baseboards dusted and/or wiped",
            "Marks on walls and baseboards cleaned",
            "Doorknob, doorframes, doors, light switches cleaned"
          ]
        }
      ]
    }
  };
  
  // Modal Open/Close Event Handlers
  (() => {
    const modal = document.getElementById('checklistModal');
    const closeBtn = document.getElementById('closeChecklistModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBadge = document.getElementById('modalBadge');
    const modalBody = document.getElementById('modalBody');
    const modalCta = document.getElementById('modalCtaBtn');
  
    if (!modal) return;
  
    // Open Modal on button click
    document.querySelectorAll('.btn-checklist-trigger').forEach(button => {
      button.addEventListener('click', () => {
        const serviceKey = button.getAttribute('data-service');
        const data = serviceChecklists[serviceKey];
        if (!data) return;
  
        modalTitle.textContent = data.title;
        modalBadge.textContent = data.badge;
  
        modalBody.innerHTML = data.rooms.map(r => `
          <div class="checklist-room-block">
            <h4 class="checklist-room-title">${r.room}</h4>
            <ul class="checklist-items-list">
              ${r.items.map(item => `<li>${item}</li>`).join('')}
            </ul>
          </div>
        `).join('');
  
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
      });
    });
  
    // Close Modal handler
    const closeModal = () => {
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    };
  
    closeBtn?.addEventListener('click', closeModal);
  
    // Click outside dialog to close
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  
    // Escape key to close
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
      }
    });
  
    // Close on clicking CTA
    modalCta?.addEventListener('click', closeModal);
  })();