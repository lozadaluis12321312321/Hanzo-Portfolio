/**
 * ==========================================================
 * PERSONAL PORTFOLIO JAVASCRIPT
 * Clean, organized, and beginner-friendly scripts for:
 * 1. Mobile navigation menu toggle
 * 2. Active link highlight on scroll
 * 3. Contact form submission & feedback
 * ==========================================================
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ----------------------------------------------------------
       1. MOBILE NAVIGATION TOGGLE
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
       2. SCROLL SPY (ACTIVE NAVIGATION HIGHLIGHT)
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

    window.addEventListener('scroll', updateActiveNav);

    /* ----------------------------------------------------------
       3. CONTACT FORM SUBMISSION
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
       4. 3D CERTIFICATE CARD TILT & HOLOGRAPHIC GLARE EFFECT
       ---------------------------------------------------------- */
    const certCardContainer = document.getElementById('certCardContainer');
    const certCard3D = document.getElementById('certCard3D');
    const certGlare = document.getElementById('certGlare');

    if (certCardContainer && certCard3D && certGlare) {
        let isHovered = false;

        certCardContainer.addEventListener('mouseenter', () => {
            isHovered = true;
            certCard3D.style.transition = 'transform 0.1s ease-out, box-shadow 0.2s ease';
            certGlare.style.opacity = '1';
        });

        certCardContainer.addEventListener('mousemove', (e) => {
            if (!isHovered) return;
            const rect = certCardContainer.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            // Calculate rotation angles (smooth subtle 3D perspective tilt)
            const rotateX = ((y - centerY) / centerY) * -10;
            const rotateY = ((x - centerX) / centerX) * 10;

            certCard3D.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;

            // Position holographic dynamic glare sheen
            const glareX = (x / rect.width) * 100;
            const glareY = (y / rect.height) * 100;
            certGlare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.25) 0%, rgba(232, 154, 61, 0.18) 35%, transparent 70%)`;
        });

        certCardContainer.addEventListener('mouseleave', () => {
            isHovered = false;
            certCard3D.style.transition = 'transform 0.5s ease, box-shadow 0.5s ease';
            certCard3D.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
            certGlare.style.opacity = '0';
        });
    }

    /* ----------------------------------------------------------
       5. CERTIFICATE LIGHTBOX MODAL
       ---------------------------------------------------------- */
    const certModal = document.getElementById('certModal');
    const certPreviewTrigger = document.getElementById('certPreviewTrigger');
    const btnInspectCert = document.getElementById('btnInspectCert');
    const certModalClose = document.getElementById('certModalClose');
    const certModalBackdrop = document.getElementById('certModalBackdrop');

    function openCertModal() {
        if (!certModal) return;
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

    if (certPreviewTrigger) {
        certPreviewTrigger.addEventListener('click', openCertModal);
        certPreviewTrigger.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openCertModal();
            }
        });
    }

    if (btnInspectCert) {
        btnInspectCert.addEventListener('click', openCertModal);
    }

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
       6. COPY CREDENTIAL CODE TO CLIPBOARD
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
});
