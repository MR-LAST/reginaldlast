// ========================
// Mobile Dropdown Toggle (for touch devices)
// ========================
const dropdownToggle = document.querySelector('.dropdown-toggle');
const dropdown = document.querySelector('.dropdown');

if (dropdownToggle && window.innerWidth <= 768) {
  dropdownToggle.addEventListener('click', function(e) {
    e.preventDefault();
    dropdown.classList.toggle('active');
  });
}

// Close dropdown when clicking outside (for mobile)
document.addEventListener('click', function(e) {
  if (window.innerWidth <= 768 && dropdown && !dropdown.contains(e.target)) {
    dropdown.classList.remove('active');
  }
});

// Handle window resize - reset dropdown state
window.addEventListener('resize', function() {
  if (window.innerWidth > 768 && dropdown) {
    dropdown.classList.remove('active');
  }
});
// main.js - Enhanced version
document.addEventListener('DOMContentLoaded', function() {
    // ========================
    // 1. Mobile Navbar Toggle
    // ========================
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
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
    
    // Close mobile menu when clicking a link
    const allNavLinks = document.querySelectorAll('.nav-link');
    allNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                const icon = navToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    });
    
    // ========================
    // 2. Active link highlighting (only for same-page sections)
    // ========================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function updateActiveLink() {
        // Only run on index.html (where sections exist)
        if (sections.length === 0) return;
        
        const scrollPosition = window.scrollY + 120;
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            // Only handle internal anchor links
            if (href && href.startsWith('#')) {
                const targetId = href.substring(1);
                if (targetId === current) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink();
    
    // ========================
    // 3. Smooth scrolling for anchor links (only internal)
    // ========================
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#') && href !== '#') {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        }
    });
    
    // ========================
    // 4. Contact Button with copy to clipboard
    // ========================
    const contactBtn = document.getElementById('contactBtn');
    if (contactBtn) {
        contactBtn.addEventListener('click', function(e) {
            e.preventDefault();
            navigator.clipboard.writeText("reginaldlast19@gmail.com")
                .then(() => {
                    showToastMessage("✅ Email copied to clipboard!", "#2563eb");
                })
                .catch(() => {
                    showToastMessage("📧 reginaldlast19@gmail.com | 📞 +260978371837", "#0a1e3c");
                });
        });
    }
    
    function showToastMessage(message, bgColor = "#0a1e3c") {
        let toast = document.querySelector('.custom-toast-message');
        if (toast) toast.remove();
        
        toast = document.createElement('div');
        toast.className = 'custom-toast-message';
        toast.style.backgroundColor = bgColor;
        toast.textContent = message;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 300);
        }, 2500);
    }
    
    // ========================
    // 5. Card fade-in animation with Intersection Observer
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
            card.style.transform = 'translateY(15px)';
            card.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
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
    const externalLinks = document.querySelectorAll('a[href*="github.com"], a[href*="linkedin.com"], a[href*="facebook.com"]');
    externalLinks.forEach(link => {
        if (!link.getAttribute('target')) {
            link.setAttribute('target', '_blank');
        }
        link.setAttribute('rel', 'noopener noreferrer');
    });
    
    // ========================
    // 7. Profile image fallback handler
    // ========================
    const profileImg = document.getElementById('profileImg');
    if (profileImg) {
        profileImg.addEventListener('error', function() {
            this.src = 'https://placehold.co/400x400/0a1e3c/white?text=Reginald+Last';
            this.alt = 'Reginald Last - Profile Placeholder';
        });
    }
    
    // ========================
    // 8. Lazy load Facebook iframes on scroll (performance)
    // ========================
    const facebookIframes = document.querySelectorAll('.facebook-embed-wrapper iframe');
    if (facebookIframes.length > 0 && 'IntersectionObserver' in window) {
        const iframeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const iframe = entry.target;
                    const src = iframe.getAttribute('data-src');
                    if (src && !iframe.src) {
                        iframe.src = src;
                    }
                    iframeObserver.unobserve(iframe);
                }
            });
        }, { rootMargin: '200px' });
        
        facebookIframes.forEach(iframe => {
            const originalSrc = iframe.src;
            if (originalSrc) {
                iframe.setAttribute('data-src', originalSrc);
                iframe.removeAttribute('src');
                iframeObserver.observe(iframe);
            }
        });
    }
    
    console.log("🎓 Reginald Last Portfolio | Ready for opportunities!");
});
