// JavaScript logic for MESHA'S SALON - Premium Luxury Beauty Salon & Bridal Studio

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // Mobile Menu Toggler
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileMenuIcons = mobileMenuBtn ? mobileMenuBtn.querySelectorAll('i') : [];

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
      mobileMenu.classList.toggle('flex');
      
      // Toggle menu icon states (Menu vs X)
      const isHidden = mobileMenu.classList.contains('hidden');
      if (mobileMenuIcons.length >= 2) {
        if (isHidden) {
          mobileMenuIcons[0].classList.remove('hidden');
          mobileMenuIcons[1].classList.add('hidden');
        } else {
          mobileMenuIcons[0].classList.add('hidden');
          mobileMenuIcons[1].classList.remove('hidden');
        }
      }
    });

    // Close mobile menu on clicking links
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        mobileMenu.classList.remove('flex');
        if (mobileMenuIcons.length >= 2) {
          mobileMenuIcons[0].classList.remove('hidden');
          mobileMenuIcons[1].classList.add('hidden');
        }
      });
    });
  }

  // Header Scroll Effect
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('bg-white/95', 'backdrop-blur-md', 'shadow-md', 'py-3');
      header.classList.remove('bg-transparent', 'py-5');
    } else {
      header.classList.remove('bg-white/95', 'backdrop-blur-md', 'shadow-md', 'py-3');
      header.classList.add('bg-transparent', 'py-5');
    }
  });

  // Services Tab Switcher
  const tabButtons = document.querySelectorAll('.tab-btn');
  const serviceCards = document.querySelectorAll('.service-card');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetCategory = button.getAttribute('data-category');

      // Update active state of tab buttons
      tabButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      // Filter cards with smooth fade transition
      serviceCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
          if (targetCategory === 'all' || card.getAttribute('data-category') === targetCategory) {
            card.classList.remove('hidden');
            // Force a reflow
            card.offsetHeight;
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          } else {
            card.classList.add('hidden');
          }
        }, 150);
      });
    });
  });

  // Scroll Reveal Observer
  const reveals = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        revealObserver.unobserve(entry.target); // Reveal only once
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  reveals.forEach(reveal => {
    revealObserver.observe(reveal);
  });

  // Link Service Selections to Appointment Form
  window.selectServiceAndScroll = (serviceName) => {
    const serviceSelect = document.getElementById('appt-service');
    const bookingSection = document.getElementById('booking');
    
    if (serviceSelect && bookingSection) {
      // Find matching option
      for (let i = 0; i < serviceSelect.options.length; i++) {
        if (serviceSelect.options[i].value.toLowerCase() === serviceName.toLowerCase() || 
            serviceSelect.options[i].text.toLowerCase().includes(serviceName.toLowerCase())) {
          serviceSelect.selectedIndex = i;
          break;
        }
      }
      
      // Scroll to booking form
      bookingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Appointment Form WhatsApp generator
  const bookingForm = document.getElementById('appointment-form');
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('appt-name').value.trim();
      const phone = document.getElementById('appt-phone').value.trim();
      const service = document.getElementById('appt-service').value;
      const date = document.getElementById('appt-date').value;
      const time = document.getElementById('appt-time').value;
      const notes = document.getElementById('appt-notes').value.trim();

      if (!name || !phone || !service || !date || !time) {
        alert('Please fill in all required fields.');
        return;
      }

      // Format date for better readability
      const formattedDate = new Date(date).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

      // Construct WhatsApp Message
      let whatsappMessage = `Hello MESHA'S SALON,\n\n`;
      whatsappMessage += `I would like to book a luxury beauty appointment. Here are my details:\n\n`;
      whatsappMessage += `*Name:* ${name}\n`;
      whatsappMessage += `*Contact:* ${phone}\n`;
      whatsappMessage += `*Service:* ${service}\n`;
      whatsappMessage += `*Preferred Date:* ${formattedDate}\n`;
      whatsappMessage += `*Preferred Time:* ${time}\n`;
      if (notes) {
        whatsappMessage += `*Special Requests:* ${notes}\n`;
      }
      whatsappMessage += `\nPlease confirm if this slot is available. Thank you!`;

      // Encode and Open WhatsApp URL
      const encodedMessage = encodeURIComponent(whatsappMessage);
      const whatsappURL = `https://wa.me/923153744662?text=${encodedMessage}`;
      
      // Open in a new tab/window
      window.open(whatsappURL, '_blank');
    });
  }

  // Quick Contact Form Handler
  const contactForm = document.getElementById('quick-contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('contact-name').value.trim();
      const email = document.getElementById('contact-email').value.trim();
      const message = document.getElementById('contact-message').value.trim();

      if (!name || !message) {
        alert('Please provide your name and message.');
        return;
      }

      // Construct WhatsApp Message
      let whatsappMessage = `Hello MESHA'S SALON,\n\n`;
      whatsappMessage += `I have a general inquiry from your website. Here are my details:\n\n`;
      whatsappMessage += `*Name:* ${name}\n`;
      if (email) {
        whatsappMessage += `*Email:* ${email}\n`;
      }
      whatsappMessage += `*Inquiry:* ${message}\n\n`;
      whatsappMessage += `Looking forward to your reply.`;

      const encodedMessage = encodeURIComponent(whatsappMessage);
      const whatsappURL = `https://wa.me/923153744662?text=${encodedMessage}`;
      
      window.open(whatsappURL, '_blank');
    });
  }

  // Update dates in form to not allow past dates
  const dateInput = document.getElementById('appt-date');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
  }
});
