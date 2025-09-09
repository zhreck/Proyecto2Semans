        // Mobile menu toggle
        document.getElementById('mobileMenuToggle').addEventListener('click', function () {
            const navMenu = document.getElementById('navMenu');
            navMenu.classList.toggle('active');
        });

        // Help navigation active state
        function updateActiveNavLink() {
            const sections = document.querySelectorAll('.help-section');
            const navLinks = document.querySelectorAll('.help-nav-link');

            let currentSection = '';

            sections.forEach(section => {
                const rect = section.getBoundingClientRect();
                if (rect.top <= 200 && rect.bottom >= 200) {
                    currentSection = section.id;
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('data-section') === currentSection) {
                    link.classList.add('active');
                }
            });
        }

        // Smooth scroll for navigation links
        document.querySelectorAll('.help-nav-link').forEach(link => {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);

                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Update active navigation on scroll
        window.addEventListener('scroll', updateActiveNavLink);

        // FAQ functionality
        document.querySelectorAll('.faq-question').forEach(question => {
            question.addEventListener('click', function () {
                const faqItem = this.parentElement;
                const answer = this.nextElementSibling;
                const isActive = this.classList.contains('active');

                // Close all other FAQ items
                document.querySelectorAll('.faq-question').forEach(q => {
                    q.classList.remove('active');
                    q.nextElementSibling.classList.remove('active');
                    q.parentElement.classList.remove('active');
                });

                // Toggle current item
                if (!isActive) {
                    this.classList.add('active');
                    answer.classList.add('active');
                    faqItem.classList.add('active');
                }
            });
        });

        // Contact form validation
        function validateEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        }

        function showError(elementId, message) {
            const errorElement = document.getElementById(elementId);
            const inputElement = document.getElementById(elementId.replace('Error', ''));

            errorElement.textContent = message;
            errorElement.style.display = 'block';
            inputElement.style.borderColor = 'var(--rojo-fuerte)';
        }

        function hideError(elementId) {
            const errorElement = document.getElementById(elementId);
            const inputElement = document.getElementById(elementId.replace('Error', ''));

            errorElement.style.display = 'none';
            inputElement.style.borderColor = 'var(--beige-claro)';
        }

        function showAlert(alertId, show = true) {
            const alertElement = document.getElementById(alertId);
            if (show) {
                alertElement.classList.add('show');
                setTimeout(() => {
                    alertElement.classList.remove('show');
                }, 5000);
            } else {
                alertElement.classList.remove('show');
            }
        }

        function setButtonLoading(buttonId, isLoading) {
            const button = document.getElementById(buttonId);
            if (isLoading) {
                button.classList.add('btn-loading');
                button.disabled = true;
                button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            } else {
                button.classList.remove('btn-loading');
                button.disabled = false;
                button.innerHTML = '<i class="fas fa-paper-plane"></i> Enviar Mensaje';
            }
        }

        // Contact form handler
        document.getElementById('contactForm').addEventListener('submit', function (e) {
            e.preventDefault();

            const name = document.getElementById('contactName').value.trim();
            const email = document.getElementById('contactEmail').value.trim();
            const subject = document.getElementById('contactSubject').value;
            const message = document.getElementById('contactMessage').value.trim();

            let isValid = true;

            // Validate name
            if (!name) {
                showError('contactNameError', 'El nombre es requerido');
                isValid = false;
            } else if (name.length < 2) {
                showError('contactNameError', 'El nombre debe tener al menos 2 caracteres');
                isValid = false;
            } else {
                hideError('contactNameError');
            }

            // Validate email
            if (!email) {
                showError('contactEmailError', 'El correo electrónico es requerido');
                isValid = false;
            } else if (!validateEmail(email)) {
                showError('contactEmailError', 'Ingresa un correo electrónico válido');
                isValid = false;
            } else {
                hideError('contactEmailError');
            }

            // Validate subject
            if (!subject) {
                showError('contactSubjectError', 'Selecciona un asunto');
                isValid = false;
            } else {
                hideError('contactSubjectError');
            }

            // Validate message
            if (!message) {
                showError('contactMessageError', 'El mensaje es requerido');
                isValid = false;
            } else if (message.length < 10) {
                showError('contactMessageError', 'El mensaje debe tener al menos 10 caracteres');
                isValid = false;
            } else {
                hideError('contactMessageError');
            }

            if (isValid) {
                setButtonLoading('contactButton', true);

                // Simulate form submission
                setTimeout(() => {
                    setButtonLoading('contactButton', false);
                    showAlert('contactSuccess');

                    // Clear form
                    this.reset();

                    // Scroll to success message
                    document.getElementById('contactSuccess').scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                    });
                }, 2000);
            }
        });

        // Phone number formatting
        document.getElementById('contactPhone').addEventListener('input', function () {
            let value = this.value.replace(/\D/g, '');

            if (value.startsWith('56')) {
                value = value.substring(2);
            }

            if (value.length > 0) {
                if (value.length <= 8) {
                    value = value.replace(/(\d{4})(\d{0,4})/, '$1 $2').trim();
                } else {
                    value = value.replace(/(\d{1})(\d{4})(\d{0,4})/, '$1 $2 $3').trim();
                }
                this.value = '+56 ' + value;
            }
        });

        // Animated counter for statistics
        function animateCounters() {
            const counters = document.querySelectorAll('.stat-number');

            counters.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-target'));
                const increment = target / 100;
                let current = 0;

                const timer = setInterval(() => {
                    current += increment;

                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }

                    counter.textContent = Math.floor(current);
                }, 20);
            });
        }

        // Intersection Observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';

                    // Animate counters when stats section is visible
                    if (entry.target.querySelector('.stats-grid')) {
                        animateCounters();
                    }
                }
            });
        }, observerOptions);

        // Initialize animations
        document.addEventListener('DOMContentLoaded', function () {
            // Observe sections for animations
            document.querySelectorAll('.help-section, .about-card').forEach(section => {
                section.style.opacity = '0';
                section.style.transform = 'translateY(30px)';
                section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                observer.observe(section);
            });

            // Initial active nav update
            updateActiveNavLink();

            // Add loading animation to the page
            document.body.style.opacity = '0';
            setTimeout(() => {
                document.body.style.transition = 'opacity 0.5s ease';
                document.body.style.opacity = '1';
            }, 100);
        });

        // Search functionality for FAQ
        function createFAQSearch() {
            const faqSection = document.getElementById('faq');
            const searchContainer = document.createElement('div');
            searchContainer.style.marginBottom = '2rem';
            searchContainer.innerHTML = `
                <div style="position: relative;">
                    <input type="text" id="faqSearch" placeholder="Buscar en preguntas frecuentes..." 
                           style="width: 100%; padding: 1rem 3rem 1rem 1rem; border: 2px solid var(--beige-claro); 
                                  border-radius: 25px; font-size: 1rem; background: var(--blanco);">
                    <i class="fas fa-search" style="position: absolute; right: 1rem; top: 50%; transform: translateY(-50%); 
                                                     color: var(--gris-medio);"></i>
                </div>
            `;

            const faqContainer = faqSection.querySelector('.faq-container');
            faqSection.insertBefore(searchContainer, faqContainer);

            // Search functionality
            document.getElementById('faqSearch').addEventListener('input', function () {
                const searchTerm = this.value.toLowerCase();
                const faqItems = document.querySelectorAll('.faq-item');

                faqItems.forEach(item => {
                    const question = item.querySelector('.faq-question').textContent.toLowerCase();
                    const answer = item.querySelector('.faq-answer').textContent.toLowerCase();

                    if (question.includes(searchTerm) || answer.includes(searchTerm) || searchTerm === '') {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        }

        // Initialize FAQ search after DOM is loaded
        setTimeout(createFAQSearch, 500);

        // Console helpers
        console.log('BodegasChile - Página de Ayuda cargada');
        console.log('Funcionalidades disponibles: FAQ interactivo, formulario de contacto, animaciones');

        // Error handling
        window.addEventListener('error', function (e) {
            console.error('Error en la página:', e.error);
            showAlert('contactError');
        });