// ============================================ //
// =====  SCRIPT PRINCIPAL DA LANDING PAGE  ===== //
// ============================================ //

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== VARIÁVEIS GLOBAIS =====
    const header = document.getElementById('header');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const backToTop = document.getElementById('backToTop');
    const contactForm = document.getElementById('contactForm');
    const ratingForm = document.getElementById('ratingForm');
    const ratingStars = document.getElementById('ratingStars');
    const ratingValue = document.getElementById('ratingValue');
    
    let lastScroll = 0;
    
    // ===== HEADER SCROLL EFFECT =====
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Header hide/show on scroll
        if (currentScroll > lastScroll && currentScroll > 100) {
            header.classList.add('hidden');
        } else {
            header.classList.remove('hidden');
        }
        
        // Back to top button
        if (currentScroll > 500) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
        
        // Active menu based on scroll
        updateActiveMenu();
        
        lastScroll = currentScroll;
    });
    
    // ===== MENU MOBILE =====
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
        
        // Close menu when click on link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });
    }
    
    // ===== BACK TO TOP =====
    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // ===== SCROLL SUAVE =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
    
    // ===== UPDATE ACTIVE MENU =====
    function updateActiveMenu() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-menu a');
        
        let current = '';
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href').substring(1);
            if (href === current) {
                link.classList.add('active');
            }
        });
    }
    
    // ===== TESTIMONIALS CAROUSEL =====
    const testimonials = [
        {
            name: 'Maria Clara S.',
            time: 'Aluna há 8 meses',
            text: 'A Dra. Ana transformou minha relação com a comida. Perdi 12kg e aprendi a me alimentar de forma saudável sem sofrimento. O acompanhamento é excelente!',
            rating: 5
        },
        {
            name: 'João Pedro',
            time: 'Aluno há 1 ano',
            text: 'Excelente profissional! Me ajudou a ganhar massa muscular e melhorar minha performance nos treinos. As orientações são claras e o plano é muito bem elaborado.',
            rating: 5
        },
        {
            name: 'Camila Ferreira',
            time: 'Aluna há 5 meses',
            text: 'Finalmente encontrei uma nutricionista que entendeu minhas necessidades. O acompanhamento online é super prático e o suporte no WhatsApp faz toda diferença.',
            rating: 5
        }
    ];
    
    let currentTestimonial = 0;
    let autoplayInterval;
    const carousel = document.getElementById('testimonialsCarousel');
    const dotsContainer = document.getElementById('carouselDots');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (carousel && prevBtn && nextBtn) {
        
        function createTestimonialHTML(testimonial, index) {
            const stars = Array(testimonial.rating).fill('').map(() => 
                '<i class="fas fa-star"></i>'
            ).join('');
            
            return `
                <div class="testimonial-card ${index === currentTestimonial ? 'active' : ''}" data-index="${index}">
                    <div class="testimonial-header">
                        <i class="fas fa-user-circle"></i>
                        <div class="user-info">
                            <h4>${testimonial.name}</h4>
                            <span class="user-time">${testimonial.time}</span>
                        </div>
                    </div>
                    <div class="testimonial-rating">
                        ${stars}
                    </div>
                    <p class="testimonial-text">"${testimonial.text}"</p>
                </div>
            `;
        }
        
        function updateCarousel() {
            carousel.innerHTML = testimonials.map((t, i) => createTestimonialHTML(t, i)).join('');
            
            // Update dots
            if (dotsContainer) {
                dotsContainer.innerHTML = testimonials.map((_, i) => 
                    `<span class="dot ${i === currentTestimonial ? 'active' : ''}" data-index="${i}"></span>`
                ).join('');
                
                // Add click events to dots
                document.querySelectorAll('.dot').forEach(dot => {
                    dot.addEventListener('click', function() {
                        const index = parseInt(this.dataset.index);
                        goToTestimonial(index);
                        resetAutoplay();
                    });
                });
            }
        }
        
        function nextTestimonial() {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            updateCarousel();
        }
        
        function prevTestimonial() {
            currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
            updateCarousel();
        }
        
        function goToTestimonial(index) {
            currentTestimonial = index;
            updateCarousel();
        }
        
        function startAutoplay() {
            autoplayInterval = setInterval(nextTestimonial, 5000);
        }
        
        function resetAutoplay() {
            clearInterval(autoplayInterval);
            startAutoplay();
        }
        
        prevBtn.addEventListener('click', () => {
            prevTestimonial();
            resetAutoplay();
        });
        
        nextBtn.addEventListener('click', () => {
            nextTestimonial();
            resetAutoplay();
        });
        
        updateCarousel();
        startAutoplay();
    }
    
    // ===== RATING STARS SYSTEM =====
    if (ratingStars && ratingValue) {
        const stars = ratingStars.querySelectorAll('i');
        
        // Initialize
        ratingValue.value = "0";
        
        stars.forEach(star => {
            // Hover effect
            star.addEventListener('mouseover', function() {
                const rating = this.dataset.rating;
                stars.forEach(s => {
                    if (s.dataset.rating <= rating) {
                        s.classList.add('hover');
                        s.classList.remove('far');
                        s.classList.add('fas');
                    } else {
                        s.classList.remove('hover', 'fas');
                        s.classList.add('far');
                    }
                });
            });
            
            // Mouseout effect
            star.addEventListener('mouseout', function() {
                const currentRating = ratingValue.value;
                stars.forEach(s => {
                    s.classList.remove('hover');
                    if (s.dataset.rating <= currentRating) {
                        s.classList.add('active', 'fas');
                        s.classList.remove('far');
                    } else {
                        s.classList.remove('active', 'fas');
                        s.classList.add('far');
                    }
                });
            });
            
            // Click to select
            star.addEventListener('click', function() {
                const rating = this.dataset.rating;
                ratingValue.value = rating;
                
                stars.forEach(s => {
                    if (s.dataset.rating <= rating) {
                        s.classList.add('active', 'fas');
                        s.classList.remove('far');
                    } else {
                        s.classList.remove('active', 'fas');
                        s.classList.add('far');
                    }
                });
            });
        });
    }
    
    // ===== RATING FORM SUBMIT =====
    if (ratingForm) {
        ratingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nome = this.querySelector('input[name="nome"]').value;
            const email = this.querySelector('input[name="email"]').value;
            const depoimento = this.querySelector('textarea[name="depoimento"]').value;
            const avaliacao = ratingValue ? ratingValue.value : "0";
            
            // Validation
            if (!nome || !email || !depoimento) {
                showNotification('Por favor, preencha todos os campos!', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Por favor, insira um e-mail válido!', 'error');
                return;
            }
            
            if (avaliacao === "0") {
                showNotification('Por favor, selecione uma avaliação com estrelas!', 'error');
                return;
            }
            
            // Prepare email
            const subject = `Novo depoimento - ${nome}`;
            const body = `Nome: ${nome}%0D%0A` +
                        `E-mail: ${email}%0D%0A` +
                        `Avaliação: ${avaliacao} estrelas%0D%0A%0D%0A` +
                        `Depoimento:%0D%0A${depoimento}%0D%0A%0D%0A` +
                        `Enviado através do site.`;
            
            // Open email client
            window.location.href = `mailto:Porsebom_@outlook.com?subject=${encodeURIComponent(subject)}&body=${body}`;
            
            showNotification('Depoimento preparado! Seu programa de email será aberto.', 'success');
            ratingForm.reset();
            
            // Reset stars
            if (ratingValue) ratingValue.value = "0";
            if (ratingStars) {
                ratingStars.querySelectorAll('i').forEach(s => {
                    s.classList.remove('active', 'fas');
                    s.classList.add('far');
                });
            }
        });
    }
    
    // ===== CONTACT FORM SUBMIT =====
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nome = this.querySelector('input[name="nome"]').value;
            const email = this.querySelector('input[name="email"]').value;
            const telefone = this.querySelector('input[name="telefone"]')?.value || 'Não informado';
            const assunto = this.querySelector('select[name="assunto"]')?.value || 'Não especificado';
            const mensagem = this.querySelector('textarea[name="mensagem"]').value;
            
            // Validation
            if (!nome || !email || !mensagem) {
                showNotification('Por favor, preencha os campos obrigatórios!', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Por favor, insira um e-mail válido!', 'error');
                return;
            }
            
            // Prepare email
            const subject = `Contato - ${nome} - ${assunto}`;
            const body = `Nome: ${nome}%0D%0A` +
                        `E-mail: ${email}%0D%0A` +
                        `Telefone: ${telefone}%0D%0A` +
                        `Assunto: ${assunto}%0D%0A%0D%0A` +
                        `Mensagem:%0D%0A${mensagem}%0D%0A%0D%0A` +
                        `Enviado através do site.`;
            
            // Open email client
            window.location.href = `mailto:Porsebom_@outlook.com?subject=${encodeURIComponent(subject)}&body=${body}`;
            
            showNotification('Mensagem preparada! Seu programa de email será aberto.', 'success');
            contactForm.reset();
        });
    }
    
    // ===== EMAIL VALIDATION =====
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // ===== NOTIFICATION SYSTEM =====
    function showNotification(message, type) {
        // Remove existing notification
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
        `;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 25px;
            background: ${type === 'success' ? 'linear-gradient(135deg, #2E7D32, #4CAF50)' : 'linear-gradient(135deg, #d32f2f, #f44336)'};
            color: white;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            z-index: 9999;
            display: flex;
            align-items: center;
            gap: 10px;
            animation: slideIn 0.3s ease;
            font-weight: 500;
        `;
        
        document.body.appendChild(notification);
        
        // Remove after 5 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 5000);
    }
    
    // Add notification styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        .notification {
            font-family: 'Inter', sans-serif;
            font-size: 14px;
        }
    `;
    document.head.appendChild(style);
    
    // ===== ANIMATIONS ON SCROLL =====
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.service-card, .benefit-card, .result-card, .social-premium-card');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Apply initial styles
    document.querySelectorAll('.service-card, .benefit-card, .result-card, .social-premium-card').forEach(element => {
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    setTimeout(animateOnScroll, 100);
    
    // ===== LAZY LOADING IMAGES =====
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px'
    });
    
    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
        imageObserver.observe(img);
        if (img.complete) {
            img.classList.add('loaded');
        }
    });
    
    // ===== WHATSAPP TOOLTIP =====
    const whatsappBtn = document.querySelector('.whatsapp-float');
    if (whatsappBtn) {
        whatsappBtn.addEventListener('mouseenter', () => {
            const tooltip = whatsappBtn.querySelector('.whatsapp-tooltip');
            if (tooltip) {
                tooltip.style.opacity = '1';
                tooltip.style.visibility = 'visible';
            }
        });
        
        whatsappBtn.addEventListener('mouseleave', () => {
            const tooltip = whatsappBtn.querySelector('.whatsapp-tooltip');
            if (tooltip) {
                tooltip.style.opacity = '0';
                tooltip.style.visibility = 'hidden';
            }
        });
    }
    
    console.log('🚀 Site da Dra. Ana Silva carregado com sucesso!');
});