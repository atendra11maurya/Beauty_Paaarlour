/**
 * SHAGUN — Beauty & Bridal Makeup Studio
 * Interactive behaviors: Navigation, Mobile Drawer, Smooth Anchor Scrolling & Scroll Reveal Animations
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle & Auto-Close on Link Click
  const mobileMenuToggle = document.getElementById('menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const navItems = document.querySelectorAll('.nav-links a');

  if (mobileMenuToggle && navLinks) {
    const spans = mobileMenuToggle.querySelectorAll('span');

    const toggleMenu = (open) => {
      const shouldOpen = open !== undefined ? open : !navLinks.classList.contains('active');
      if (shouldOpen) {
        navLinks.classList.add('active');
        if (spans.length >= 3) {
          spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
          spans[1].style.opacity = '0';
          spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        }
      } else {
        navLinks.classList.remove('active');
        if (spans.length >= 3) {
          spans[0].style.transform = 'none';
          spans[1].style.opacity = '1';
          spans[2].style.transform = 'none';
        }
      }
    };

    mobileMenuToggle.addEventListener('click', () => toggleMenu());

    // Auto-close when clicking any nav link
    navItems.forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
          toggleMenu(false);
        }
      });
    });
  }

  // 2. Navbar Scrolled Background Effect
  const navbar = document.getElementById('navbar');
  const handleScroll = () => {
    if (!navbar) return;
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial check

  // 3. Scroll Reveal Animations (Intersection Observer)
  const revealElements = document.querySelectorAll('.fade-up, .reveal-image, .reveal-card');
  
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0,
      rootMargin: '250px 0px 250px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback for older browsers
    revealElements.forEach(el => el.classList.add('visible'));
  }

  // 4. Set Current Year in Footer
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // 5. Smooth Scroll with Header Offset for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // 6. Call Drop-up Menu Trigger & Click-Outside Handling
  const callDropupContainers = document.querySelectorAll('.call-dropup-container');

  callDropupContainers.forEach(container => {
    const triggerBtn = container.querySelector('.call-trigger-btn');
    if (!triggerBtn) return;

    triggerBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isActive = container.classList.contains('active');
      
      // Close any other open drop-ups
      callDropupContainers.forEach(c => {
        c.classList.remove('active');
        const btn = c.querySelector('.call-trigger-btn');
        if (btn) btn.setAttribute('aria-expanded', 'false');
      });

      if (!isActive) {
        container.classList.add('active');
        triggerBtn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // Global click outside to close drop-up
  document.addEventListener('click', (e) => {
    callDropupContainers.forEach(container => {
      if (!container.contains(e.target)) {
        container.classList.remove('active');
        const btn = container.querySelector('.call-trigger-btn');
        if (btn) btn.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // Escape key to close drop-up
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      callDropupContainers.forEach(container => {
        container.classList.remove('active');
        const btn = container.querySelector('.call-trigger-btn');
        if (btn) btn.setAttribute('aria-expanded', 'false');
      });
    }
  });

  // 7. Copy Address to Clipboard Functionality
  const copyAddressBtn = document.getElementById('copy-address-btn');
  if (copyAddressBtn) {
    copyAddressBtn.addEventListener('click', async () => {
      const address = copyAddressBtn.getAttribute('data-address') || 'Shagun Makeup Studio, Zheel Market, Bhagat Singh Chowk, Dharuhera, Haryana';
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(address);
        } else {
          const textarea = document.createElement('textarea');
          textarea.value = address;
          textarea.style.position = 'fixed';
          textarea.style.opacity = '0';
          document.body.appendChild(textarea);
          textarea.select();
          document.execCommand('copy');
          document.body.removeChild(textarea);
        }

        const btnText = copyAddressBtn.querySelector('.copy-btn-text');
        const originalText = btnText ? btnText.textContent : 'Copy Address';
        copyAddressBtn.classList.add('copied');
        if (btnText) btnText.textContent = '✓ Copied to Clipboard!';

        setTimeout(() => {
          copyAddressBtn.classList.remove('copied');
          if (btnText) btnText.textContent = originalText;
        }, 2500);
      } catch (err) {
        console.error('Failed to copy address: ', err);
      }
    });
  }
});
