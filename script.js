/**
 * ==========================================================
 * PERSONAL PORTFOLIO JAVASCRIPT
 * Clean, organized, and robust scripts for:
 * 1. Dark Mode / Light Mode Theme Switching & LocalStorage Persistence
 * 2. Mobile navigation menu toggle
 * 3. Scroll spy (active navigation link highlight)
 * 4. Contact form submission & feedback
 * 5. Interactive 3D Perspective Card Tilt & Holographic Glare
 * 6. Certificate Lightbox Modal & Zoom
 * 7. Copy Credential Code to Clipboard
 * 8. Dynamic Hero Ambient Orb Parallax Interaction
 * 9. Scroll Reveal Entrance Animations
 * 10. Aurora Backdrop Scroll Parallax
 * ==========================================================
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ----------------------------------------------------------
       1. THEME TOGGLE (DARK MODE / LIGHT MODE SYSTEM)
       ---------------------------------------------------------- */
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const rootElement = document.documentElement;
    const STORAGE_KEY = 'portfolio-theme';

    /**
     * Apply theme to root and update aria/tooltip states
     * @param {'dark' | 'light'} theme 
     */
    function applyTheme(theme) {
        rootElement.setAttribute('data-theme', theme);
        localStorage.setItem(STORAGE_KEY, theme);

        if (themeToggleBtn) {
            const isDark = theme === 'dark';
            themeToggleBtn.setAttribute('aria-label', isDark ? 'Switch to Light theme' : 'Switch to Dark theme');
            themeToggleBtn.setAttribute('title', isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme');
        }
    }

    // Determine current theme
    const savedTheme = localStorage.getItem(STORAGE_KEY);
    const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const activeTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
    applyTheme(activeTheme);

    // Toggle button click listener
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = rootElement.getAttribute('data-theme') || 'light';
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            applyTheme(newTheme);
        });
    }

    // Listen to system color scheme changes if user hasn't explicitly chosen one
    if (window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem(STORAGE_KEY)) {
                applyTheme(e.matches ? 'dark' : 'light');
            }
        });
    }

    /* ----------------------------------------------------------
       2. MOBILE NAVIGATION TOGGLE
       ---------------------------------------------------------- */
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    const navItems = document.querySelectorAll('.nav-link');

    if (mobileMenuBtn && navLinks) {
        // Toggle mobile dropdown on hamburger button click
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Close mobile dropdown when a navigation link is clicked
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                }
            });
        });
    }

    /* ----------------------------------------------------------
       3. SCROLL SPY (ACTIVE NAVIGATION HIGHLIGHT)
       ---------------------------------------------------------- */
    const sections = document.querySelectorAll('section[id]');

    function updateActiveNav() {
        const scrollY = window.pageYOffset || document.documentElement.scrollTop;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120; // Offset for sticky navbar
            const sectionId = current.getAttribute('id');
            const correspondingLink = document.querySelector(`.nav-links a[href*="${sectionId}"]`);

            if (correspondingLink) {
                if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                    correspondingLink.classList.add('active');
                } else {
                    correspondingLink.classList.remove('active');
                }
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav, { passive: true });

    /* ----------------------------------------------------------
       4. CONTACT FORM SUBMISSION
       ---------------------------------------------------------- */
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    if (contactForm && formStatus) {
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Prevent page refresh

            const nameInput = document.getElementById('name').value.trim();

            // Display success message
            formStatus.className = 'form-status success';
            formStatus.innerHTML = `✓ Thank you, <strong>${nameInput || 'there'}</strong>! Your message has been sent successfully.`;

            // Reset form fields
            contactForm.reset();

            // Automatically hide success message after 5 seconds
            setTimeout(() => {
                formStatus.className = 'form-status';
                formStatus.style.display = 'none';
            }, 5000);
        });
    }

    /* ----------------------------------------------------------
       5. REUSABLE 3D CARD TILT & HOLOGRAPHIC GLARE EFFECT
       Used for both the Hero Profile Card & Certificate Showcase
       ---------------------------------------------------------- */
    function setup3DCardTilt(containerId, cardId, glareId, maxTilt = 10) {
        const container = document.getElementById(containerId);
        const card = document.getElementById(cardId);
        const glare = document.getElementById(glareId);

        if (!container || !card || !glare) return;

        let isHovered = false;

        container.addEventListener('mouseenter', () => {
            isHovered = true;
            card.style.transition = 'transform 0.1s ease-out, box-shadow 0.2s ease';
            glare.style.opacity = '1';
        });

        container.addEventListener('mousemove', (e) => {
            if (!isHovered) return;
            const rect = container.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            // Calculate rotation angles (smooth subtle 3D perspective tilt)
            const rotateX = ((y - centerY) / centerY) * -maxTilt;
            const rotateY = ((x - centerX) / centerX) * maxTilt;

            card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;

            // Position dynamic holographic glare sheen
            const glareX = (x / rect.width) * 100;
            const glareY = (y / rect.height) * 100;
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
            if (isDark) {
                glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.15) 38%, transparent 70%)`;
            } else {
                glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.55) 0%, rgba(56, 189, 248, 0.3) 35%, transparent 70%)`;
            }
        });

        container.addEventListener('mouseleave', () => {
            isHovered = false;
            card.style.transition = 'transform 0.5s ease, box-shadow 0.5s ease';
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
            glare.style.opacity = '0';
        });
    }

    // Initialize 3D tilt for Home Page Showcase & both Certificate Showcases
    setup3DCardTilt('heroCardContainer', 'heroCard3D', 'heroGlare', 11);
    setup3DCardTilt('certCardContainer', 'certCard3D', 'certGlare', 10);
    setup3DCardTilt('hackCardContainer', 'hackCard3D', 'hackGlare', 10);

    /* ----------------------------------------------------------
       6. CERTIFICATE LIGHTBOX MODAL (data-driven, supports multiple certs)
       Any element with .cert-modal-trigger and data-cert-* attributes
       populates and opens the shared lightbox.
       ---------------------------------------------------------- */
    const certModal = document.getElementById('certModal');
    const certModalClose = document.getElementById('certModalClose');
    const certModalBackdrop = document.getElementById('certModalBackdrop');
    const certModalImage = document.getElementById('certModalImage');
    const certModalTitle = document.getElementById('certModalTitle');
    const certModalBadge = document.getElementById('certModalBadge');
    const certModalMeta = document.getElementById('certModalMeta');
    const certModalLink = document.getElementById('certModalLink');
    const certModalLinkLabel = document.getElementById('certModalLinkLabel');

    function populateCertModal(trigger) {
        const d = trigger.dataset;
        if (certModalImage && d.certImg) {
            certModalImage.src = d.certImg;
            certModalImage.alt = d.certTitle || 'Certificate Full Resolution';
        }
        if (certModalTitle && d.certTitle) certModalTitle.textContent = d.certTitle;
        if (certModalBadge && d.certBadge) certModalBadge.textContent = d.certBadge;
        if (certModalMeta && d.certMeta) {
            certModalMeta.innerHTML = d.certMeta
                .split(' • ')
                .map(part => `<span>${part}</span>`)
                .join('<span class="modal-sep">•</span>');
        }
        if (certModalLink && d.certLink) certModalLink.href = d.certLink;
        if (certModalLinkLabel && d.certLinkLabel) certModalLinkLabel.textContent = d.certLinkLabel;
    }

    function openCertModal(trigger) {
        if (!certModal) return;
        if (trigger && trigger.dataset) populateCertModal(trigger);
        certModal.classList.add('active');
        certModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeCertModal() {
        if (!certModal) return;
        certModal.classList.remove('active');
        certModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    document.querySelectorAll('.cert-modal-trigger').forEach(trigger => {
        trigger.addEventListener('click', () => openCertModal(trigger));
        if (trigger.tagName !== 'BUTTON') {
            trigger.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openCertModal(trigger);
                }
            });
        }
    });

    if (certModalClose) {
        certModalClose.addEventListener('click', closeCertModal);
    }

    if (certModalBackdrop) {
        certModalBackdrop.addEventListener('click', closeCertModal);
    }

    // Close on Escape key press
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && certModal && certModal.classList.contains('active')) {
            closeCertModal();
        }
    });

    /* ----------------------------------------------------------
       7. COPY CREDENTIAL CODE TO CLIPBOARD
       ---------------------------------------------------------- */
    const btnCopyCode = document.getElementById('btnCopyCode');
    const credentialCode = document.getElementById('credentialCode');
    const copyToast = document.getElementById('copyToast');
    const copyBtnText = document.getElementById('copyBtnText');

    if (btnCopyCode && credentialCode && copyToast) {
        btnCopyCode.addEventListener('click', async () => {
            const codeToCopy = credentialCode.textContent.trim();

            try {
                if (navigator.clipboard && window.isSecureContext) {
                    await navigator.clipboard.writeText(codeToCopy);
                } else {
                    const tempTextArea = document.createElement('textarea');
                    tempTextArea.value = codeToCopy;
                    tempTextArea.style.position = 'fixed';
                    tempTextArea.style.left = '-9999px';
                    document.body.appendChild(tempTextArea);
                    tempTextArea.focus();
                    tempTextArea.select();
                    document.execCommand('copy');
                    document.body.removeChild(tempTextArea);
                }

                // Show toast & update button state
                copyToast.classList.add('show');
                if (copyBtnText) copyBtnText.textContent = 'Copied!';

                setTimeout(() => {
                    copyToast.classList.remove('show');
                    if (copyBtnText) copyBtnText.textContent = 'Copy Code';
                }, 2500);
            } catch (err) {
                console.error('Failed to copy credential code:', err);
            }
        });
    }

    /* ----------------------------------------------------------
       8. DYNAMIC HERO PARALLAX INTERACTION
       Subtle interactive parallax for the glowing ambient orbs
       ---------------------------------------------------------- */
    const heroSection = document.getElementById('home');
    const ambientOrbs = document.querySelectorAll('.ambient-orb');

    if (heroSection && ambientOrbs.length > 0 && window.matchMedia('(pointer: fine)').matches) {
        heroSection.addEventListener('mousemove', (e) => {
            const rect = heroSection.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;

            // Parallax shift for ambient orbs
            ambientOrbs.forEach((orb, index) => {
                const factor = (index + 1) * 12;
                orb.style.transform = `translate(${(x * factor).toFixed(1)}px, ${(y * factor).toFixed(1)}px)`;
            });
        });

        heroSection.addEventListener('mouseleave', () => {
            ambientOrbs.forEach((orb) => {
                orb.style.transform = '';
            });
        });
    }

    /* ----------------------------------------------------------
       9. SCROLL REVEAL (glass cards fade/blur in as they enter view)
       ---------------------------------------------------------- */
    const revealElements = document.querySelectorAll('.reveal');

    if ('IntersectionObserver' in window && revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

        revealElements.forEach(el => revealObserver.observe(el));
    } else {
        revealElements.forEach(el => el.classList.add('reveal-visible'));
    }

    /* ----------------------------------------------------------
       10. AURORA BACKDROP SCROLL PARALLAX
       The fixed floating blobs drift at different speeds as the
       page scrolls for a layered depth effect.
       ---------------------------------------------------------- */
    const auroraBlobs = document.querySelectorAll('.aurora-blob');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion && auroraBlobs.length) {
        let ticking = false;

        function updateParallax() {
            const scrollY = window.pageYOffset || document.documentElement.scrollTop;
            auroraBlobs.forEach((blob, i) => {
                blob.style.translate = `0 ${(scrollY * (0.04 + i * 0.02)).toFixed(1)}px`;
            });
            ticking = false;
        }

        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(updateParallax);
                ticking = true;
            }
        }, { passive: true });
    }
});
