// main.js
// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // ========================
    // 1. Contact Button Interaction
    // ========================
    const contactBtn = document.getElementById('contactBtn');
    if (contactBtn) {
        contactBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Create a modern, subtle modal-like interaction using a custom alert
            // but with better UX - show a toast-style message or confirm dialog
            const userConfirmed = confirm(
                "📧 Reach out to Reginald Last:\n\n" +
                "Email: reginaldlast19@gmail.com\n" +
                "Phone: +260 978 371837\n\n" +
                "Click OK to copy email address to clipboard."
            );
            
            if (userConfirmed) {
                // Copy email to clipboard
                navigator.clipboard.writeText("reginaldlast19@gmail.com")
                    .then(() => {
                        // Show temporary success feedback
                        showTemporaryMessage("✅ Email copied to clipboard!", "#2c7a5e");
                    })
                    .catch(() => {
                        // Fallback if clipboard fails
                        alert("Email: reginaldlast19@gmail.com | Phone: +260978371837");
                    });
            }
        });
    }
    
    // Helper function to show a small floating message (toast)
    function showTemporaryMessage(message, bgColor = "#0b2b26") {
        // Create a toast element if it doesn't exist
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
            toast.style.backdropFilter = 'blur(4px)';
            toast.style.border = '1px solid rgba(255,255,255,0.2)';
            document.body.appendChild(toast);
        }
        toast.textContent = message;
        toast.style.display = 'block';
        
        // Hide after 2.5 seconds
        setTimeout(() => {
            toast.style.display = 'none';
        }, 2500);
    }
    
    // ========================
    // 2. Image slot fallback handler + optional hover effect
    // ========================
    const profileImg = document.getElementById('profileImg');
    if (profileImg) {
        // If the image fails to load, we already have onerror inline in HTML,
        // but we add an additional console log for development.
        profileImg.addEventListener('error', function() {
            console.log("Profile image not found. Using placeholder. Replace 'profile-placeholder.jpg' with your actual image.");
        });
    }
    
    // ========================
    // 3. Smooth scrolling for any future anchor links (if needed)
    // ========================
    const allLinks = document.querySelectorAll('a[href^="#"]');
    allLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === "#" || targetId === "") return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // ========================
    // 4. Dynamic year in footer? (optional enhancement)
    // ========================
    const footer = document.querySelector('footer');
    if (footer && !footer.innerHTML.includes('2025')) {
        const currentYear = new Date().getFullYear();
        const copyrightSpan = footer.querySelector('.fa-copyright')?.parentNode;
        if (copyrightSpan && !copyrightSpan.innerHTML.includes(currentYear.toString())) {
            copyrightSpan.innerHTML = copyrightSpan.innerHTML.replace('2025', currentYear);
        }
    }
    
    // ========================
    // 5. Add a subtle animation on card entrance (simple intersection observer)
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
            // set initial styles for smooth fade-in
            card.style.opacity = '0';
            card.style.transform = 'translateY(12px)';
            card.style.transition = 'opacity 0.45s ease-out, transform 0.45s ease-out';
            observer.observe(card);
        });
    } else {
        // Fallback: make all cards visible immediately if no observer
        cards.forEach(card => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        });
    }
    
    // ========================
    // 6. Console greeting (just for personality)
    // ========================
    console.log("🎓 Reginald Last Portfolio | Aspiring Software Engineer — Thanks for visiting!");
    
    // ========================
    // 7. External links security: ensure GitHub/LinkedIn open safely (already target="_blank" in HTML, but double-check)
    // ========================
    const externalLinks = document.querySelectorAll('a[href*="github.com"], a[href*="linkedin.com"]');
    externalLinks.forEach(link => {
        if (!link.getAttribute('target')) {
            link.setAttribute('target', '_blank');
        }
        link.setAttribute('rel', 'noopener noreferrer');
    });
});
