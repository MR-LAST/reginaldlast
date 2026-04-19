// main.js
document.addEventListener('DOMContentLoaded', function() {
    // ========================
    // 1. Mobile Navbar Toggle
    // ========================
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            // Toggle icon between bars and times
            const icon = navToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // ========================
    // 2. Active link highlighting on scroll (Scroll Spy)
    // ========================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function updateActiveLink() {
        let current = '';
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
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
    
    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink();
    
    // ========================
    // 3. Smooth scrolling for nav links
    // ========================
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                // Close mobile menu if open
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    const icon = navToggle.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
                
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // ========================
    // 4. Contact Button Interaction
    // ========================
    const contactBtn = document.getElementById('contactBtn');
    if (contactBtn) {
        contactBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const userConfirmed = confirm(
                "📧 Reach out to Reginald Last:\n\n" +
                "Email: reginaldlast19@gmail.com\n" +
                "Phone: +260 978 371837\n\n" +
                "Click OK to copy email address to clipboard."
            );
            
            if (userConfirmed) {
                navigator.clipboard.writeText("reginaldlast19@gmail.com")
                    .then(() => {
                        showTemporaryMessage("✅ Email copied to clipboard!", "#2c7a5e");
                    })
                    .catch(() => {
                        alert("Email: reginaldlast19@gmail.com | Phone: +260978371837");
                    });
            }
        });
    }
    
    function showTemporaryMessage(message, bgColor = "#0b2b26") {
        let toast = document.querySelector('.custom-toast-message');
        if (!toast) {
            toast = document.createElement('div');
            toast.className = 'custom-toast-message';
            toast.style.position = 'fixed';
            toast.style.bottom = '20px';
            toast.style.left = '50%';
            toast.style.transform = 'translateX(-50%)';
            toast.style.backgroundColor = bgColor;
            toast.style.color = 'white';
            toast.style.padding = '12px 24px';
            toast.style.borderRadius = '40px';
            toast.style.fontSize = '0.9rem';
            toast.style.fontWeight = '500';
            toast.style.zIndex = '9999';
            toast.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
            toast.style.fontFamily = "'Inter', sans-serif";
            document.body.appendChild(toast);
        }
        toast.textContent = message;
        toast.style.display = 'block';
        
        setTimeout(() => {
            toast.style.display = 'none';
        }, 2500);
    }
    
    // ========================
    // 5. Card fade-in animation
    // ========================
    const cards = document.querySelectorAll('.card');
    if (cards.length > 0 && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.05, rootMargin: "0px 0px -20px 0px" });
        
        cards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(12px)';
            card.style.transition = 'opacity 0.45s ease-out, transform 0.45s ease-out';
            observer.observe(card);
        });
    } else {
        cards.forEach(card => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        });
    }
    
    // ========================
    // 6. External links security
    // ========================
    const externalLinks = document.querySelectorAll('a[href*="github.com"], a[href*="linkedin.com"]');
    externalLinks.forEach(link => {
        if (!link.getAttribute('target')) {
            link.setAttribute('target', '_blank');
        }
        link.setAttribute('rel', 'noopener noreferrer');
    });
    
    console.log("🎓 Reginald Last Portfolio | Aspiring Software Engineer — Thanks for visiting!");
});
