document.addEventListener('DOMContentLoaded', () => {
    // --- Scroll Animations ---
    const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // --- Navbar Scroll Effect ---
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) navbar.classList.add('scrolled');
        else navbar.classList.remove('scrolled');
    });

    const navContainer = document.querySelector('.nav-container');
    const navLinks = document.querySelector('.nav-links');
    if (navContainer && navLinks) {
        if (!navLinks.id) navLinks.id = 'primary-nav';
        let navToggle = navContainer.querySelector('.nav-toggle');
        if (!navToggle) {
            navToggle = document.createElement('button');
            navToggle.type = 'button';
            navToggle.className = 'nav-toggle btn-icon';
            navToggle.setAttribute('aria-controls', navLinks.id);
            navToggle.setAttribute('aria-expanded', 'false');
            navToggle.setAttribute('aria-label', 'Open menu');
            navToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
            navContainer.insertBefore(navToggle, navContainer.querySelector('.nav-actions'));
        }

        const setNavState = (open) => {
            document.body.classList.toggle('nav-open', open);
            navToggle.setAttribute('aria-expanded', String(open));
            navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
            const icon = navToggle.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars', !open);
                icon.classList.toggle('fa-xmark', open);
            }
        };

        navToggle.addEventListener('click', () => {
            const isOpen = document.body.classList.contains('nav-open');
            setNavState(!isOpen);
        });

        navLinks.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', () => setNavState(false));
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 992) setNavState(false);
        });
    }

    // --- Theme Management ---
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('light-mode');
            const icon = themeToggle.querySelector('i');
            icon.classList.toggle('fa-moon');
            icon.classList.toggle('fa-sun');
            localStorage.setItem('sun-theme', document.body.classList.contains('light-mode') ? 'light' : 'dark');
        });
    }

    // Load saved theme
    if (localStorage.getItem('sun-theme') === 'light') {
        document.body.classList.add('light-mode');
        const icon = themeToggle?.querySelector('i');
        if (icon) { icon.classList.replace('fa-moon', 'fa-sun'); }
    }

    // --- Personalization Options ---
    const accentColors = document.querySelectorAll('.accent-picker');
    accentColors.forEach(picker => {
        picker.addEventListener('click', () => {
            const theme = picker.dataset.theme;
            document.body.classList.remove('theme-blue', 'theme-emerald', 'theme-rose');
            if (theme !== 'gold') document.body.classList.add(`theme-${theme}`);
            localStorage.setItem('sun-accent', theme);
        });
    });

    const savedAccent = localStorage.getItem('sun-accent');
    if (savedAccent && savedAccent !== 'gold') {
        document.body.classList.add(`theme-${savedAccent}`);
    }
});
