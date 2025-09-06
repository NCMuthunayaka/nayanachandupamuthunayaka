// ------------------ Typing Effect ------------------

const roles = [

  "building the future",

  "solving complex problems",

  "creating AI solutions", 

  "developing web applications",

  "analyzing data patterns",

  "learning new technologies"

];



const typingEl = document.getElementById('typingText');

let roleIndex = 0, charIndex = 0, isDeleting = false;



function typeEffect() {

  const currentRole = roles[roleIndex];

  

  if (!isDeleting) {

    typingEl.textContent = currentRole.slice(0, ++charIndex);

    if (charIndex === currentRole.length) {

      isDeleting = true;

      setTimeout(typeEffect, 2000);

      return;

    }

  } else {

    typingEl.textContent = currentRole.slice(0, --charIndex);

    if (charIndex === 0) {

      isDeleting = false;

      roleIndex = (roleIndex + 1) % roles.length;

    }

  }

  

  setTimeout(typeEffect, isDeleting ? 50 : 100);

}



// Start typing effect when page loads

document.addEventListener('DOMContentLoaded', typeEffect);



// ------------------ Mobile Navigation ------------------

const menuBtn = document.getElementById('menuBtn');

const navLinks = document.getElementById('navLinks');



menuBtn?.addEventListener('click', () => {

  navLinks.classList.toggle('open');

});



// ------------------ Scroll Effects ------------------

const scrollProgress = document.getElementById('scrollProgress');

const navbar = document.getElementById('navbar');



window.addEventListener('scroll', () => {

  // Progress bar

  const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;

  scrollProgress.style.width = scrollPercent + '%';

  

  // Navbar background

  navbar.classList.toggle('scrolled', window.scrollY > 50);

  

  // Active nav link

  const sections = document.querySelectorAll('section[id]');

  const navLinksElements = document.querySelectorAll('.nav-link');

  

  let current = '';

  sections.forEach(section => {

    const sectionTop = section.offsetTop - 100;

    if (window.scrollY >= sectionTop) {

      current = section.getAttribute('id');

    }

  });

  

  navLinksElements.forEach(link => {

    link.classList.remove('active');

    if (link.getAttribute('href') === '#' + current) {

      link.classList.add('active');

    }

  });

});



// ------------------ Intersection Observer for Animations ------------------

const observerOptions = {

  threshold: 0.1,

  rootMargin: '0px 0px -50px 0px'

};



const observer = new IntersectionObserver((entries) => {

  entries.forEach(entry => {

    if (entry.isIntersecting) {

      entry.target.classList.add('visible');

    }

  });

}, observerOptions);



// Observe all fade-in elements and timeline items when DOM is loaded

document.addEventListener('DOMContentLoaded', () => {

  document.querySelectorAll('.fade-in, .timeline-item').forEach(el => {

    observer.observe(el);

  });

});



// ------------------ Contact Form ------------------

document.addEventListener('DOMContentLoaded', () => {

  const contactForm = document.getElementById('contactForm');



  contactForm?.addEventListener('submit', (e) => {

    e.preventDefault();

    

    // Get form data

    const formData = new FormData(contactForm);

    const data = Object.fromEntries(formData);

    

    // Show loading state

    const submitBtn = contactForm.querySelector('button[type="submit"]');

    const originalBtnText = submitBtn.innerHTML;

    submitBtn.innerHTML = '<span>Sending...</span><span><i class="fas fa-spinner fa-spin"></i></span>';

    submitBtn.disabled = true;

    

    // Simulate form submission delay

    setTimeout(() => {

      // Here you would typically send the data to your backend

      // For now, we'll just show a success message

      alert('Thank you for your message! I\'ll get back to you soon.');

      contactForm.reset();

      

      // Reset button

      submitBtn.innerHTML = originalBtnText;

      submitBtn.disabled = false;

      

      // Optional: You can implement actual email sending here

      // Example using EmailJS or similar service:

      // emailjs.send('service_id', 'template_id', data)

      //   .then(() => { /* success */ }, () => { /* error */ });

      

    }, 1500);

  });

});



// ------------------ Smooth Scrolling with Offset for Fixed Navbar ------------------

document.addEventListener('DOMContentLoaded', () => {

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener('click', function (e) {

      e.preventDefault();

      const targetId = this.getAttribute('href').substring(1);

      const targetElement = document.getElementById(targetId);

      

      if (targetElement) {

        // Calculate offset for fixed navbar

        const navbarHeight = document.getElementById('navbar').offsetHeight;

        const targetPosition = targetElement.offsetTop - navbarHeight;

        

        window.scrollTo({

          top: targetPosition,

          behavior: 'smooth'

        });

        

        // Close mobile menu if open

        navLinks?.classList.remove('open');

      }

    });

  });

});



// ------------------ Current Year ------------------

document.addEventListener('DOMContentLoaded', () => {

  const currentYearElement = document.getElementById('currentYear');

  if (currentYearElement) {

    currentYearElement.textContent = new Date().getFullYear();

  }

});



// ------------------ Performance Optimization ------------------

// Lazy load images when they come into view

if ('IntersectionObserver' in window) {

  const imageObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {

        const img = entry.target;

        if (img.dataset.src) {

          img.src = img.dataset.src;

          img.classList.remove('lazy');

          imageObserver.unobserve(img);

        }

      }

    });

  });

  

  document.addEventListener('DOMContentLoaded', () => {

    document.querySelectorAll('img[data-src]').forEach(img => {

      imageObserver.observe(img);

    });

  });

}



// ------------------ Additional smooth scroll fix ------------------

// Ensure all navigation links work correctly

document.addEventListener('DOMContentLoaded', () => {

  // Fix for "Let's Connect" button and all navigation links

  const allNavLinks = document.querySelectorAll('a[href^="#"]');

  

  allNavLinks.forEach(link => {

    link.addEventListener('click', function(e) {

      e.preventDefault();

      

      const targetId = this.getAttribute('href').substring(1);

      const targetSection = document.getElementById(targetId);

      

      if (targetSection) {

        const navbar = document.getElementById('navbar');

        const navbarHeight = navbar ? navbar.offsetHeight : 80;

        const targetPosition = targetSection.offsetTop - navbarHeight;

        

        window.scrollTo({

          top: targetPosition,

          behavior: 'smooth'

        });

        

        // Close mobile menu if it's open

        const navLinks = document.getElementById('navLinks');

        if (navLinks && navLinks.classList.contains('open')) {

          navLinks.classList.remove('open');

        }

        

        // Update active nav link

        document.querySelectorAll('.nav-link').forEach(navLink => {

          navLink.classList.remove('active');

        });

        

        if (this.classList.contains('nav-link')) {

          this.classList.add('active');

        }

      }

    });

  });

});