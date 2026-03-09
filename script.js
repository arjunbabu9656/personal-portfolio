document.addEventListener("DOMContentLoaded", () => {

    // --- 1. Custom Cursor ---
    const cursorDot = document.querySelector(".cursor-dot");
    const cursorOutline = document.querySelector(".cursor-outline");

    window.addEventListener("mousemove", (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        // Dot follows strictly
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        // Outline has slight delay
        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
    });

    // Add hover effect for clickable elements
    const clickables = document.querySelectorAll("a, button, .project-card, input, textarea, .filter-btn, .social-icon, .scroll-to-top, .modal-close");
    clickables.forEach(el => {
        el.addEventListener("mouseenter", () => {
            document.body.classList.add("cursor-hover");
        });
        el.addEventListener("mouseleave", () => {
            document.body.classList.remove("cursor-hover");
        });
    });

    // --- 2. Mobile Menu / Navbar Scroll ---
    const navbar = document.getElementById("navbar");
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinksContainer = document.querySelector(".nav-links");
    const navLinks = document.querySelectorAll(".nav-link");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }

        // Active state on scroll
        const sections = document.querySelectorAll("section");
        let current = "";

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href").includes(current)) {
                link.classList.add("active");
            }
        });
    });

    menuToggle.addEventListener("click", () => {
        navLinksContainer.classList.toggle("open");
        const icon = menuToggle.querySelector("i");
        if (navLinksContainer.classList.contains("open")) {
            icon.classList.remove("ph-list");
            icon.classList.add("ph-x");
        } else {
            icon.classList.remove("ph-x");
            icon.classList.add("ph-list");
        }
    });

    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            navLinksContainer.classList.remove("open");
            const icon = menuToggle.querySelector("i");
            if (icon) {
                icon.classList.remove("ph-x");
                icon.classList.add("ph-list");
            }
        });
    });

    // --- 3. Typing Effect ---
    const dynamicText = document.getElementById("dynamic-text");
    const words = ["Web Applications", "Full-Stack Systems", "Interactive UIs", "Digital Experiences"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        const currentWord = words[wordIndex];

        if (isDeleting) {
            dynamicText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            dynamicText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentWord.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500;
        }

        setTimeout(typeEffect, typeSpeed);
    }
    if (dynamicText) typeEffect();

    // --- 4. Intersection Observer for Scroll Animations ---
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");

                // If it's the skills section, animate progress bars
                if (entry.target.id === "skills" || entry.target.closest("#skills")) {
                    const progressBars = document.querySelectorAll(".progress-fill");
                    progressBars.forEach(bar => {
                        const width = bar.getAttribute("data-width");
                        bar.style.width = width;
                    });
                }

                scrollObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll(".reveal-up, .reveal-scale, .reveal-slide-right, .reveal-slide-left, .slide-up, #skills");
    revealElements.forEach(el => {
        scrollObserver.observe(el);
    });

    // --- 5. 3D Tilt Effect ---
    const tiltContainers = document.querySelectorAll(".tilt-container");

    tiltContainers.forEach(container => {
        container.addEventListener("mousemove", (e) => {
            const rect = container.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element
            const y = e.clientY - rect.top;  // y position within the element

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -15; // Max 15deg
            const rotateY = ((x - centerX) / centerX) * 15;

            container.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        container.addEventListener("mouseleave", () => {
            container.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            container.style.transition = "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)";
        });

        container.addEventListener("mouseenter", () => {
            container.style.transition = "transform 0.1s linear";
        });
    });

    // --- 6. Project Filter functionality ---
    const filterBtns = document.querySelectorAll(".filter-btn");
    const projectCards = document.querySelectorAll(".project-card");

    filterBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            // Remove active from all
            filterBtns.forEach(b => b.classList.remove("active"));
            // Add active to current
            btn.classList.add("active");

            const filterValue = btn.getAttribute("data-filter");

            projectCards.forEach(card => {
                if (filterValue === "all" || card.classList.contains(filterValue)) {
                    card.classList.remove("hide");
                    // Re-trigger animation
                    setTimeout(() => {
                        card.classList.add("active");
                        card.style.display = "block";
                        card.style.opacity = "1";
                        card.style.transform = "translateY(0)";
                    }, 50);
                } else {
                    card.style.opacity = "0";
                    card.style.transform = "translateY(20px)";
                    setTimeout(() => {
                        card.classList.add("hide");
                        card.classList.remove("active");
                    }, 300);
                }
            });
        });
    });

    // --- 7. Modal Functionality ---
    const modal = document.getElementById("projectModal");
    const modalClose = document.getElementById("modalClose");
    const modalBackdrop = document.getElementById("modalBackdrop");

    window.openProjectModal = function (title, desc, imgSrc, tech, badgeConfig, liveUrl) {
        document.getElementById("modalTitle").textContent = title;
        document.getElementById("modalDesc").textContent = desc;
        document.getElementById("modalImg").src = imgSrc;
        document.getElementById("modalTech").textContent = "Tech Stack: " + tech;

        const badgeEl = document.getElementById("modalBadge");
        badgeEl.textContent = badgeConfig;
        if (badgeConfig.toLowerCase() === 'clone') {
            badgeEl.className = 'badge badge-clone';
        } else {
            badgeEl.className = 'badge badge-dynamic';
        }

        const actionEl = document.getElementById("modalAction");
        if (liveUrl) {
            actionEl.style.display = "block";
            document.getElementById("modalLink").href = liveUrl;
        } else {
            actionEl.style.display = "none";
        }

        modal.classList.add("active");
        document.body.style.overflow = "hidden"; // Prevent scrolling
    }

    function closeModal() {
        modal.classList.remove("active");
        document.body.style.overflow = "auto";
    }

    if (modalClose) {
        modalClose.addEventListener("click", closeModal);
    }
    if (modalBackdrop) {
        modalBackdrop.addEventListener("click", closeModal);
    }
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modal && modal.classList.contains("active")) {
            closeModal();
        }
    });

    // --- 8. Contact Form Handling ---
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const btn = contactForm.querySelector(".submit-btn");
            const note = document.getElementById("formNote");

            btn.classList.add("loading");
            note.textContent = "Processing logic...";
            note.style.color = "var(--text-secondary)";

            setTimeout(() => {
                btn.classList.remove("loading");
                note.textContent = "Message simulated correctly ✨ (Connect EmailJS to send it live)";
                note.style.color = "#4ade80"; // Bright Green
                contactForm.reset();

                setTimeout(() => {
                    note.textContent = "";
                }, 5000);
            }, 1500);
        });
    }

    // --- 9. Scroll To Top ---
    const scrollToTopBtn = document.getElementById("scrollToTop");
    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    // --- 10. Reading Progress Bar ---
    const readingProgress = document.getElementById("readingProgress");
    if (readingProgress) {
        window.addEventListener("scroll", () => {
            const totalScroll = document.documentElement.scrollTop;
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scroll = `${totalScroll / windowHeight * 100}%`;
            readingProgress.style.width = scroll;
        });
    }

    // --- 11. Magnetic Buttons ---
    const magneticElements = document.querySelectorAll('.btn, .social-icon, .filter-btn');
    magneticElements.forEach((el) => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            // Calculate distance from center of element
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            // Move the element slightly towards mouse
            el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;

            // If it has icon child, move it a bit more for parallax feeling
            const icon = el.querySelector('i');
            if (icon) {
                icon.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
            }
        });

        // Reset transform on mouse out
        el.addEventListener('mouseleave', () => {
            el.style.transform = 'translate(0px, 0px)';
            const icon = el.querySelector('i');
            if (icon) {
                icon.style.transform = 'translate(0px, 0px)';
            }
        });
    });

});