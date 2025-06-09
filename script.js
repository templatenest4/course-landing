// DOM Elements
const header = document.querySelector('.header');
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');
const backToTopBtn = document.getElementById('back-to-top');
const testimonialCards = document.querySelectorAll('.testimonial-card');
const testimonialDots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.control-btn.prev');
const nextBtn = document.querySelector('.control-btn.next');
const faqItems = document.querySelectorAll('.faq-item');
const currentYearSpan = document.getElementById('current-year');

// Set current year in footer
document.addEventListener('DOMContentLoaded', function() {
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
    
    // Add smooth hover effect to footer links
    const footerLinks = document.querySelectorAll('.footer-nav a, .social-links a');
    footerLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transition = 'color 0.3s ease, transform 0.3s ease';
            this.style.transform = 'translateY(-2px)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

// Mobile Menu Toggle
mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';

    // Animate hamburger to X
    const spans = mobileMenuBtn.querySelectorAll('span');
    if (mobileMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close mobile menu when clicking a link
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
        
        // Reset hamburger icon
        const spans = mobileMenuBtn.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    // Back to top button visibility
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }

    // Animate elements on scroll
    animateOnScroll();
});

// Back to top functionality
backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerHeight = header.offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (mobileMenu.classList.contains('active')) {
                mobileMenuBtn.click();
            }
        }
    });
});

// Testimonial Slider
let currentSlide = 0;

function showSlide(index) {
    testimonialCards.forEach(card => {
        card.classList.remove('active');
    });
    
    testimonialDots.forEach(dot => {
        dot.classList.remove('active');
    });
    
    testimonialCards[index].classList.add('active');
    testimonialDots[index].classList.add('active');
    
    currentSlide = index;
}

// Next slide
nextBtn.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % testimonialCards.length;
    showSlide(currentSlide);
});

// Previous slide
prevBtn.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + testimonialCards.length) % testimonialCards.length;
    showSlide(currentSlide);
});

// Dot navigation
testimonialDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showSlide(index);
    });
});

// Auto slide every 5 seconds
setInterval(() => {
    currentSlide = (currentSlide + 1) % testimonialCards.length;
    showSlide(currentSlide);
}, 5000);

// FAQ Accordion
faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all FAQ items
        faqItems.forEach(faqItem => {
            faqItem.classList.remove('active');
        });
        
        // Open clicked item if it wasn't already open
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// Animate elements on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('[data-aos]');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementPosition < windowHeight - 100) {
            element.classList.add('aos-animate');
        }
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Initialize testimonial slider
    showSlide(0);
    
    // Initial animation check
    animateOnScroll();
    
    // Check for hash in URL and scroll to that section
    if (window.location.hash) {
        const targetId = window.location.hash;
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            setTimeout(() => {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }, 500);
        }
    }
});