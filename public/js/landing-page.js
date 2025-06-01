document.addEventListener('DOMContentLoaded', function() {
  // Timeline read more buttons
  document.querySelectorAll('.read-more button').forEach(button => {
    button.addEventListener('click', (e) => {
      const item = e.currentTarget.closest('.timeline-item');
      const readMoreBtn = e.currentTarget;
      
      if (item) {
        const content = item.querySelector('p');
        if (content) {
          if (content.classList.contains('expanded')) {
            content.classList.remove('expanded');
            readMoreBtn.textContent = 'Read More ↓';
            content.style.maxHeight = '4.5rem';
          } else {
            content.classList.add('expanded');
            readMoreBtn.textContent = 'Read Less ↑';
            content.style.maxHeight = content.scrollHeight + 'px';
          }
        }
      }
    });
  });

  // Initialize interactive elements for hover effects
  document.querySelectorAll('.stat-card, .feature-card, .nav-button').forEach((el) => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      el.style.setProperty('--mouse-x', `${x}px`);
      el.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  // Add default max-height for timeline paragraphs
  document.querySelectorAll('.timeline-item p').forEach(p => {
    p.style.maxHeight = '4.5rem';
    p.style.overflow = 'hidden';
    p.style.transition = 'max-height 0.3s ease';
  });

  // Add site-container styles
  const style = document.createElement('style');
  style.textContent = `
    .site-container {
      width: 100%;
      margin-left: auto;
      margin-right: auto;
      padding-left: 1rem;
      padding-right: 1rem;
    }

    @media (min-width: 640px) {
      .site-container {
        max-width: 640px;
      }
    }
    @media (min-width: 768px) {
      .site-container {
        max-width: 768px;
      }
    }
    @media (min-width: 1024px) {
      .site-container {
        max-width: 1024px;
      }
    }
    @media (min-width: 1280px) {
      .site-container {
        max-width: 1280px;
      }
    }
    @media (min-width: 1536px) {
      .site-container {
        max-width: 1536px;
      }
    }

    .logo-item:hover {
      background-color: rgb(30, 41, 59);
      box-shadow: 0 0 20px rgba(4, 163, 255, 0.3);
    }

    .nav-button:hover {
      box-shadow: 0 0 25px rgba(4, 163, 255, 0.4);
    }

    .hover\\:bg-primary-500:hover {
      background-color: rgb(14, 165, 233);
    }

    .hover\\:bg-primary-600:hover {
      background-color: rgb(2, 132, 199);
    }

    .hover\\:text-white:hover {
      color: white;
    }

    .hover\\:text-primary-300:hover {
      color: rgb(125, 211, 252);
    }

    .bg-transparent {
      background-color: transparent;
    }

    .border-primary-500 {
      border-color: rgb(14, 165, 233);
    }
  `;
  document.head.appendChild(style);
});

// Re-initialize after Astro page transitions if any
document.addEventListener('astro:page-load', function() {
  document.dispatchEvent(new Event('DOMContentLoaded'));
});
document.addEventListener('astro:after-swap', function() {
  document.dispatchEvent(new Event('DOMContentLoaded'));
});
