
// Mobile menu toggle
document.getElementById('mobileMenuToggle').addEventListener('click', function () {
    const navMenu = document.getElementById('navMenu');
    navMenu.classList.toggle('active');
});

// Quick search form
document.getElementById('quickSearchForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const searchTerm = document.getElementById('quickSearch').value;
    if (searchTerm.trim()) {
        // Redirect to products page with search parameter
        window.location.href = `productos.html?search=${encodeURIComponent(searchTerm)}`;
    }
});

// Category filtering
function filterByCategory(category) {
    // Redirect to products page with category filter
    window.location.href = `productos.html?category=${category}`;
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add scroll effect to header
window.addEventListener('scroll', function () {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.backgroundColor = 'var(--blanco)';
        header.style.backdropFilter = 'none';
    }
});

// Animation on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.category-card, .benefit-item, .testimonial');

    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (elementTop < windowHeight * 0.8) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Initialize animations
document.addEventListener('DOMContentLoaded', function () {
    const elements = document.querySelectorAll('.category-card, .benefit-item, .testimonial');
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Initial check
});
