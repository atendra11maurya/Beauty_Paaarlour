/**
 * Main JavaScript for Shagun Beauty Parlour
 * Handles navigation, mobile menu, and scroll reveal animations
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
  
    if (mobileMenuToggle && navLinks) {
      mobileMenuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        // Simple animation for hamburger
        const spans = mobileMenuToggle.querySelectorAll('span');
        if (navLinks.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
      });
    }
  
    // 2. Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  
    // 3. Scroll Reveal Animations (Intersection Observer)
    const fadeUpElements = document.querySelectorAll('.fade-up, .reveal-image');
    
    const revealOptions = {
      threshold: 0.15, // Trigger when 15% of the element is visible
      rootMargin: "0px 0px -50px 0px" // Trigger slightly before it hits the bottom
    };
  
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) {
          return;
        } else {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // Stop observing once revealed
        }
      });
    }, revealOptions);
  
    fadeUpElements.forEach(element => {
      revealObserver.observe(element);
    });
  
    // 4. Set Current Year in Footer
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
    
    // 5. Parallax effect for Final CTA background (subtle)
    const ctaSection = document.querySelector('.final-cta');
    if (ctaSection) {
      window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const rect = ctaSection.getBoundingClientRect();
        
        // Only animate if section is in viewport
        if(rect.top < window.innerHeight && rect.bottom > 0) {
            // Adjust background position slightly based on scroll
            // Background is fixed via CSS, so we don't strictly need JS parallax, 
            // but this is a placeholder if we want to change from background-attachment: fixed
            // which can be buggy on some mobile browsers.
        }
      });
    }
  });
