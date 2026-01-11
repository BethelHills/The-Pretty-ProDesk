// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

mobileMenuToggle.addEventListener('click', () => {
    mobileMenuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.service-card, .portfolio-item, .skill-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Counter Animation for Stats
const animateCounter = (element) => {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };

    updateCounter();
};

const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat-number');
            if (statNumber && !statNumber.classList.contains('counted')) {
                statNumber.classList.add('counted');
                animateCounter(statNumber);
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-item').forEach(item => {
    statObserver.observe(item);
});

// Progress Bar Animation
const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressFill = entry.target.querySelector('.progress-fill');
            if (progressFill) {
                const progress = progressFill.getAttribute('data-progress');
                progressFill.style.width = progress + '%';
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.progress-item').forEach(item => {
    progressObserver.observe(item);
});

// Testimonials Slider
let currentTestimonial = 0;
const testimonialCards = document.querySelectorAll('.testimonial-card');
const testimonialDots = document.querySelectorAll('.dot');
const prevBtn = document.getElementById('prev-testimonial');
const nextBtn = document.getElementById('next-testimonial');

if (testimonialCards.length > 0) {
    const showTestimonial = (index) => {
        testimonialCards.forEach((card, i) => {
            card.classList.toggle('active', i === index);
        });

        if (testimonialDots && testimonialDots.length) {
            testimonialDots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        }
    };

    const nextTestimonial = () => {
        currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
        showTestimonial(currentTestimonial);
    };

    const prevTestimonial = () => {
        currentTestimonial = (currentTestimonial - 1 + testimonialCards.length) % testimonialCards.length;
        showTestimonial(currentTestimonial);
    };

    if (nextBtn) nextBtn.addEventListener('click', nextTestimonial);
    if (prevBtn) prevBtn.addEventListener('click', prevTestimonial);

    if (testimonialDots && testimonialDots.length) {
        testimonialDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentTestimonial = index;
                showTestimonial(currentTestimonial);
            });
        });
    }

    // Auto-play testimonials
    let testimonialInterval = setInterval(nextTestimonial, 5000);

    // Pause on hover
    const testimonialsSlider = document.querySelector('.testimonials-slider');
    if (testimonialsSlider) {
        testimonialsSlider.addEventListener('mouseenter', () => {
            clearInterval(testimonialInterval);
        });

        testimonialsSlider.addEventListener('mouseleave', () => {
            testimonialInterval = setInterval(nextTestimonial, 5000);
        });
    }
}

// Contact Form Handling with EmailJS
// SETUP REQUIRED: 
// 1. Sign up at https://www.emailjs.com/ (free account)
// 2. Create an email service (Gmail recommended)
// 3. Create an email template with these variables: {{from_name}}, {{from_email}}, {{subject}}, {{message}}
// 4. In the template, set TO field to: helenudeh.va@gmail.com
// 5. Get your Public Key, Service ID, and Template ID from EmailJS dashboard
// 6. Replace the placeholders below with your actual values

const contactForm = document.getElementById('contact-form');
if (contactForm) {
    // Initialize EmailJS - Replace YOUR_PUBLIC_KEY with your actual EmailJS Public Key
    emailjs.init("YOUR_PUBLIC_KEY");
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form data
        const name = document.getElementById('name') ? document.getElementById('name').value : '';
        const email = document.getElementById('email') ? document.getElementById('email').value : '';
        const subject = document.getElementById('subject') ? document.getElementById('subject').value : '';
        const message = document.getElementById('message') ? document.getElementById('message').value : '';

        // Get submit button and disable it during submission
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';

        // EmailJS template parameters
        const templateParams = {
            from_name: name,
            from_email: email,
            subject: subject,
            message: message,
            reply_to: email
        };

        // Send email using EmailJS
        // Replace YOUR_SERVICE_ID and YOUR_TEMPLATE_ID with your actual values from EmailJS
        emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                // Show success message
                submitButton.textContent = 'Message Sent!';
                submitButton.style.backgroundColor = '#10b981';
                
                // Show alert
                alert('Thank you! Your message has been sent successfully. I will get back to you soon.');
                
                // Reset form
                contactForm.reset();
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    submitButton.disabled = false;
                    submitButton.textContent = originalButtonText;
                    submitButton.style.backgroundColor = '';
                }, 3000);
            }, function(error) {
                console.log('FAILED...', error);
                // Reset button
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
                
                // Show error message
                alert('Sorry, there was an error sending your message. Please email me directly at helenudeh.va@gmail.com or try again later.');
            });
    });
}

// Brand Story Modal
const brandStoryBtn = document.getElementById('view-brand-story');
const brandStoryModal = document.getElementById('brand-story-modal');
const brandStoryClose = document.getElementById('brand-story-close');
const brandStoryBackdrop = document.getElementById('brand-story-backdrop');

if (brandStoryBtn && brandStoryModal) {
    const openModal = () => {
        brandStoryModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        brandStoryModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    };

    brandStoryBtn.addEventListener('click', openModal);
    brandStoryClose.addEventListener('click', closeModal);
    brandStoryBackdrop.addEventListener('click', closeModal);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && brandStoryModal.getAttribute('aria-hidden') === 'false') {
            closeModal();
        }
    });
}

// Active Navigation Link Highlighting
const sections = document.querySelectorAll('section[id]');

const highlightNavLink = () => {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
};

window.addEventListener('scroll', highlightNavLink);

// Typing Effect for Hero Title (Optional Enhancement)
const typeWriter = (element, text, speed = 100) => {
    let i = 0;
    element.textContent = '';
    
    const type = () => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    };
    
    type();
};

// Add active class styles via JavaScript
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--primary-color);
    }
    .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);

// Lazy loading for images (if you add real images later)
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// Scroll to top functionality (optional enhancement)
const createScrollToTop = () => {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.setAttribute('aria-label', 'Scroll to top');
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--primary-color);
        color: white;
        border: none;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        transition: all 0.3s ease;
        z-index: 999;
    `;
    
    document.body.appendChild(scrollBtn);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollBtn.style.display = 'flex';
        } else {
            scrollBtn.style.display = 'none';
        }
    });
    
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    scrollBtn.addEventListener('mouseenter', () => {
        scrollBtn.style.transform = 'translateY(-5px)';
        scrollBtn.style.boxShadow = '0 6px 12px rgba(0,0,0,0.15)';
    });
    
    scrollBtn.addEventListener('mouseleave', () => {
        scrollBtn.style.transform = 'translateY(0)';
        scrollBtn.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
    });
};

createScrollToTop();

// Scheduling Gallery Modal
const schedulingGalleryBtn = document.getElementById('view-scheduling-gallery');
const schedulingGalleryBtn2 = document.getElementById('view-scheduling-btn');
const schedulingGalleryModal = document.getElementById('scheduling-gallery-modal');
const schedulingGalleryClose = document.getElementById('scheduling-gallery-close');
const schedulingGalleryBackdrop = document.getElementById('scheduling-gallery-backdrop');

if (schedulingGalleryModal) {
    const openGallery = () => {
        schedulingGalleryModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    };

    const closeGallery = () => {
        schedulingGalleryModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    };

    if (schedulingGalleryBtn) {
        schedulingGalleryBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openGallery();
        });
    }

    if (schedulingGalleryBtn2) {
        schedulingGalleryBtn2.addEventListener('click', (e) => {
            e.preventDefault();
            openGallery();
        });
    }

    if (schedulingGalleryClose) {
        schedulingGalleryClose.addEventListener('click', closeGallery);
    }

    if (schedulingGalleryBackdrop) {
        schedulingGalleryBackdrop.addEventListener('click', closeGallery);
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && schedulingGalleryModal.getAttribute('aria-hidden') === 'false') {
            closeGallery();
        }
    });
}

// Asana Gallery Modal
const asanaGalleryBtn = document.getElementById('view-asana-gallery');
const asanaGalleryBtn2 = document.getElementById('view-asana-btn');
const asanaGalleryModal = document.getElementById('asana-gallery-modal');
const asanaGalleryClose = document.getElementById('asana-gallery-close');
const asanaGalleryBackdrop = document.getElementById('asana-gallery-backdrop');

if (asanaGalleryModal) {
    const openAsanaGallery = () => {
        asanaGalleryModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    };

    const closeAsanaGallery = () => {
        asanaGalleryModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    };

    if (asanaGalleryBtn) {
        asanaGalleryBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openAsanaGallery();
        });
    }

    if (asanaGalleryBtn2) {
        asanaGalleryBtn2.addEventListener('click', (e) => {
            e.preventDefault();
            openAsanaGallery();
        });
    }

    if (asanaGalleryClose) {
        asanaGalleryClose.addEventListener('click', closeAsanaGallery);
    }

    if (asanaGalleryBackdrop) {
        asanaGalleryBackdrop.addEventListener('click', closeAsanaGallery);
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && asanaGalleryModal.getAttribute('aria-hidden') === 'false') {
            closeAsanaGallery();
        }
    });
}

// Travel Gallery Modal
const travelGalleryBtn = document.getElementById('view-travel-gallery');
const travelGalleryBtn2 = document.getElementById('view-travel-btn');
const travelGalleryModal = document.getElementById('travel-gallery-modal');
const travelGalleryClose = document.getElementById('travel-gallery-close');
const travelGalleryBackdrop = document.getElementById('travel-gallery-backdrop');

if (travelGalleryModal) {
    const openTravelGallery = () => {
        travelGalleryModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    };

    const closeTravelGallery = () => {
        travelGalleryModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    };

    if (travelGalleryBtn) {
        travelGalleryBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openTravelGallery();
        });
    }

    if (travelGalleryBtn2) {
        travelGalleryBtn2.addEventListener('click', (e) => {
            e.preventDefault();
            openTravelGallery();
        });
    }

    if (travelGalleryClose) {
        travelGalleryClose.addEventListener('click', closeTravelGallery);
    }

    if (travelGalleryBackdrop) {
        travelGalleryBackdrop.addEventListener('click', closeTravelGallery);
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && travelGalleryModal.getAttribute('aria-hidden') === 'false') {
            closeTravelGallery();
        }
    });
}

// Data Gallery Modal
const dataGalleryBtn = document.getElementById('view-data-gallery');
const dataGalleryBtn2 = document.getElementById('view-data-btn');
const dataGalleryModal = document.getElementById('data-gallery-modal');
const dataGalleryClose = document.getElementById('data-gallery-close');
const dataGalleryBackdrop = document.getElementById('data-gallery-backdrop');

if (dataGalleryModal) {
    const openDataGallery = () => {
        dataGalleryModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    };

    const closeDataGallery = () => {
        dataGalleryModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    };

    if (dataGalleryBtn) {
        dataGalleryBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openDataGallery();
        });
    }

    if (dataGalleryBtn2) {
        dataGalleryBtn2.addEventListener('click', (e) => {
            e.preventDefault();
            openDataGallery();
        });
    }

    if (dataGalleryClose) {
        dataGalleryClose.addEventListener('click', closeDataGallery);
    }

    if (dataGalleryBackdrop) {
        dataGalleryBackdrop.addEventListener('click', closeDataGallery);
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && dataGalleryModal.getAttribute('aria-hidden') === 'false') {
            closeDataGallery();
        }
    });
}

// Expense Gallery Modal
const expenseGalleryBtn = document.getElementById('view-expense-gallery');
const expenseGalleryBtn2 = document.getElementById('view-expense-btn');
const expenseGalleryModal = document.getElementById('expense-gallery-modal');
const expenseGalleryClose = document.getElementById('expense-gallery-close');
const expenseGalleryBackdrop = document.getElementById('expense-gallery-backdrop');

if (expenseGalleryModal) {
    const openExpenseGallery = () => {
        expenseGalleryModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    };

    const closeExpenseGallery = () => {
        expenseGalleryModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    };

    if (expenseGalleryBtn) {
        expenseGalleryBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openExpenseGallery();
        });
    }

    if (expenseGalleryBtn2) {
        expenseGalleryBtn2.addEventListener('click', (e) => {
            e.preventDefault();
            openExpenseGallery();
        });
    }

    if (expenseGalleryClose) {
        expenseGalleryClose.addEventListener('click', closeExpenseGallery);
    }

    if (expenseGalleryBackdrop) {
        expenseGalleryBackdrop.addEventListener('click', closeExpenseGallery);
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && expenseGalleryModal.getAttribute('aria-hidden') === 'false') {
            closeExpenseGallery();
        }
    });
}

// Dashboard Gallery Modal
const dashboardGalleryBtn = document.getElementById('view-dashboard-gallery');
const dashboardGalleryBtn2 = document.getElementById('view-dashboard-btn');
const dashboardGalleryModal = document.getElementById('dashboard-gallery-modal');
const dashboardGalleryClose = document.getElementById('dashboard-gallery-close');
const dashboardGalleryBackdrop = document.getElementById('dashboard-gallery-backdrop');

if (dashboardGalleryModal) {
    const openDashboardGallery = () => {
        dashboardGalleryModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    };

    const closeDashboardGallery = () => {
        dashboardGalleryModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    };

    if (dashboardGalleryBtn) {
        dashboardGalleryBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openDashboardGallery();
        });
    }

    if (dashboardGalleryBtn2) {
        dashboardGalleryBtn2.addEventListener('click', (e) => {
            e.preventDefault();
            openDashboardGallery();
        });
    }

    if (dashboardGalleryClose) {
        dashboardGalleryClose.addEventListener('click', closeDashboardGallery);
    }

    if (dashboardGalleryBackdrop) {
        dashboardGalleryBackdrop.addEventListener('click', closeDashboardGallery);
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && dashboardGalleryModal.getAttribute('aria-hidden') === 'false') {
            closeDashboardGallery();
        }
    });
}

// CRM Gallery Modal
const crmGalleryBtn = document.getElementById('view-crm-gallery');
const crmGalleryBtn2 = document.getElementById('view-crm-btn');
const crmGalleryModal = document.getElementById('crm-gallery-modal');
const crmGalleryClose = document.getElementById('crm-gallery-close');
const crmGalleryBackdrop = document.getElementById('crm-gallery-backdrop');

if (crmGalleryModal) {
    const openCrmGallery = () => {
        crmGalleryModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    };

    const closeCrmGallery = () => {
        crmGalleryModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    };

    if (crmGalleryBtn) {
        crmGalleryBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openCrmGallery();
        });
    }

    if (crmGalleryBtn2) {
        crmGalleryBtn2.addEventListener('click', (e) => {
            e.preventDefault();
            openCrmGallery();
        });
    }

    if (crmGalleryClose) {
        crmGalleryClose.addEventListener('click', closeCrmGallery);
    }

    if (crmGalleryBackdrop) {
        crmGalleryBackdrop.addEventListener('click', closeCrmGallery);
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && crmGalleryModal.getAttribute('aria-hidden') === 'false') {
            closeCrmGallery();
        }
    });
}

console.log('Portfolio website loaded successfully!');

