document.addEventListener('DOMContentLoaded', function () {
    // Back to top button functionality
    const backToTopBtn = document.getElementById('backToTop');

    if (backToTopBtn) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });

        backToTopBtn.addEventListener('click', function (e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a.nav-link[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                const navbarCollapse = document.getElementById('navbarContent');
                if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                    // Use Bootstrap 5 API to safely get instance
                    const bsCollapse = bootstrap.Collapse.getOrCreateInstance(navbarCollapse, { toggle: false });
                    bsCollapse.hide();
                }

                // Scroll to target
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Generate Table of Contents automatically
    const tocList = document.getElementById('tocList');
    if (tocList) {
        const article = document.querySelector('.blog-content');
        if (article) {
            const headings = article.querySelectorAll('h2, h3');
            headings.forEach((heading, index) => {
                const id = 'heading-' + index;
                heading.setAttribute('id', id);

                const li = document.createElement('li');
                const a = document.createElement('a');
                a.href = '#' + id;
                a.textContent = heading.textContent;

                if (heading.tagName.toLowerCase() === 'h3') {
                    li.classList.add('toc-subitem');
                }

                li.appendChild(a);
                tocList.appendChild(li);
            });
        }

        // TOC Toggle functionality
        const tocHeader = document.querySelector('.toc-header');
        const tocIcon = tocHeader ? tocHeader.querySelector('i') : null;
        if (tocHeader && tocList) {
            tocHeader.addEventListener('click', function () {
                const isHidden = tocList.style.display === 'none';
                tocList.style.display = isHidden ? 'block' : 'none';
                if (tocIcon) {
                    tocIcon.classList.toggle('fa-chevron-down', !isHidden);
                    tocIcon.classList.toggle('fa-chevron-up', isHidden);
                }
            });
        }
    }

    // Social Sharing Functionality
    const shareButtons = document.querySelectorAll('.share-buttons a');
    if (shareButtons.length > 0) {
        const url = encodeURIComponent(window.location.href);
        const title = encodeURIComponent(document.title);

        shareButtons.forEach(btn => {
            if (btn.classList.contains('btn-share-fb')) {
                btn.href = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
            } else if (btn.classList.contains('btn-share-tw')) {
                btn.href = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
            } else if (btn.classList.contains('btn-share-li')) {
                btn.href = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
            } else if (btn.classList.contains('btn-share-wa')) {
                btn.href = `https://api.whatsapp.com/send?text=${title}%20${url}`;
            }
            btn.setAttribute('target', '_blank');
        });
    }

    // Efficient Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Select elements to animate
    const fadeElements = document.querySelectorAll('.service-card, .product-item, .card, .gallery-item');
    fadeElements.forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
});

