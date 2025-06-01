// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const navbar = document.getElementById('navbar');
    const navMenu = document.getElementById('nav-menu');
    const hamburger = document.getElementById('hamburger');
    const themeToggle = document.getElementById('theme-toggle');
    const backToTop = document.getElementById('back-to-top');
    const loadingScreen = document.getElementById('loading-screen');
    const contactForm = document.getElementById('contact-form');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    const skillBars = document.querySelectorAll('.skill-progress');
    const typingText = document.querySelector('.typing-text');

    // Remove loading screen immediately
    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 300);
        }, 500);
    }

    // Theme management
    let isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    function initTheme() {
        if (isDarkMode) {
            document.documentElement.setAttribute('data-color-scheme', 'dark');
            if (themeToggle) themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            document.documentElement.setAttribute('data-color-scheme', 'light');
            if (themeToggle) themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
    }

    function toggleTheme() {
        isDarkMode = !isDarkMode;
        if (isDarkMode) {
            document.documentElement.setAttribute('data-color-scheme', 'dark');
            if (themeToggle) themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            document.documentElement.setAttribute('data-color-scheme', 'light');
            if (themeToggle) themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
    }

    // Mobile menu toggle
    function toggleMenu() {
        if (navMenu) {
            navMenu.classList.toggle('show');
        }
    }

    // Smooth scrolling for navigation links
    function setupNavigation() {
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }

                // Close mobile menu if open
                if (navMenu && navMenu.classList.contains('show')) {
                    toggleMenu();
                }

                // Update active link
                navLinks.forEach(navLink => navLink.classList.remove('active'));
                this.classList.add('active');
            });
        });
    }

    // Scroll handling
    function handleScroll() {
        const scrollPosition = window.scrollY;
        
        // Navbar background on scroll
        if (navbar) {
            if (scrollPosition > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
        
        // Back to top button visibility
        if (backToTop) {
            if (scrollPosition > 500) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        }
        
        // Update active nav link based on scroll position
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });

        // Animate skill bars when in view
        skillBars.forEach(bar => {
            const barTop = bar.getBoundingClientRect().top;
            if (barTop < window.innerHeight * 0.8 && !bar.dataset.animated) {
                const width = bar.getAttribute('data-width') + '%';
                bar.style.width = width;
                bar.dataset.animated = 'true';
            }
        });

        // Animate elements on scroll
        animateOnScroll();
    }

    // Animation on scroll
    function animateOnScroll() {
        const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
        animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < window.innerHeight * 0.8) {
                element.classList.add('visible');
            }
        });
    }

    // Contact form handling
    function setupContactForm() {
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const name = document.getElementById('name');
                const email = document.getElementById('email');
                const subject = document.getElementById('subject');
                const message = document.getElementById('message');
                
                // Remove existing messages
                const existingMessages = contactForm.querySelectorAll('.form-success, .form-error');
                existingMessages.forEach(msg => msg.remove());
                
                // Validation
                if (!name.value.trim() || !email.value.trim() || !subject.value.trim() || !message.value.trim()) {
                    showFormMessage('error', 'Please fill in all fields');
                    return;
                }
                
                // Email validation
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email.value.trim())) {
                    showFormMessage('error', 'Please enter a valid email address');
                    return;
                }
                
                // Success message
                showFormMessage('success', 'Message sent! I will get back to you soon.');
                contactForm.reset();
            });
        }
    }

    function showFormMessage(type, message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = type === 'success' ? 'form-success' : 'form-error';
        messageDiv.style.display = 'block';
        messageDiv.textContent = message;
        
        contactForm.insertBefore(messageDiv, contactForm.firstChild);
        
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.remove();
            }
        }, 5000);
    }

    // Typing animation
    function startTypingAnimation() {
        if (typingText) {
            const text = 'Faisal Naseer';
            typingText.textContent = '';
            let i = 0;
            
            function type() {
                if (i < text.length) {
                    typingText.textContent += text.charAt(i);
                    i++;
                    setTimeout(type, 100);
                }
            }
            
            setTimeout(type, 1000);
        }
    }

    // Initialize animations
    function initAnimations() {
        // Add animation classes to elements
        const aboutText = document.querySelector('.about-text');
        const aboutImage = document.querySelector('.about-image');
        if (aboutText) aboutText.classList.add('fade-in');
        if (aboutImage) aboutImage.classList.add('slide-in-right');
        
        document.querySelectorAll('.skill-category').forEach(item => {
            item.classList.add('fade-in');
        });
        
        document.querySelectorAll('.timeline-item').forEach((item, index) => {
            item.classList.add(index % 2 === 0 ? 'slide-in-left' : 'slide-in-right');
        });
        
        document.querySelectorAll('.project-card').forEach(card => {
            card.classList.add('fade-in');
        });
        
        document.querySelectorAll('.education-card').forEach((card, index) => {
            card.classList.add(index % 2 === 0 ? 'slide-in-left' : 'slide-in-right');
        });
        
        const contactInfo = document.querySelector('.contact-info');
        const contactFormElement = document.querySelector('.contact-form');
        if (contactInfo) contactInfo.classList.add('slide-in-left');
        if (contactFormElement) contactFormElement.classList.add('slide-in-right');
    }

    // Event listeners
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    if (hamburger) {
        hamburger.addEventListener('click', toggleMenu);
    }
    
    if (backToTop) {
        backToTop.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    window.addEventListener('scroll', handleScroll);

    // Initialize everything
    initTheme();
    setupNavigation();
    setupContactForm();
    initAnimations();
    startTypingAnimation();
    
    // Set initial active nav link
    const homeLink = document.querySelector('a[href="#home"]');
    if (homeLink) {
        homeLink.classList.add('active');
    }

    // Initial scroll handler call
    handleScroll();
});