document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.portfolio-section');
    const contentArea = document.querySelector('.content-area'); // For scrolling
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // =====================================
    // Theme Toggle Logic
    // =====================================
    const getPreferredTheme = () => {
        // 1. Check localStorage for user preference
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme) {
            return storedTheme;
        }
        // 2. Check system preference (default to light if no preference or browser doesn't support)
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    };

    const setTheme = (theme) => {
        if (theme === 'dark') {
            body.classList.add('dark-mode');
            themeToggle.innerHTML = '<span class="material-symbols-outlined">dark_mode</span>'; // Moon icon
            localStorage.setItem('theme', 'dark');
        } else {
            body.classList.remove('dark-mode');
            themeToggle.innerHTML = '<span class="material-symbols-outlined">light_mode</span>'; // Sun icon
            localStorage.setItem('theme', 'light');
        }
    };

    // Initialize theme
    setTheme(getPreferredTheme());

    // Toggle theme on button click
    themeToggle.addEventListener('click', () => {
        const currentTheme = body.classList.contains('dark-mode') ? 'dark' : 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
    });
    
    // =====================================
    // Navigation Logic
    // =====================================
    // Function to show a specific section
    const showSection = (sectionId) => {
        // Deactivate all sections and nav items first
        sections.forEach(sec => sec.classList.remove('active'));
        navItems.forEach(item => item.classList.remove('active'));

        // Activate the target section
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
            // Scroll content area to top when new section is activated
            contentArea.scrollTop = 0; 
        }

        // Activate the corresponding nav item
        const targetNavItem = document.querySelector(`.nav-item[data-section="${sectionId}"]`);
        if (targetNavItem) {
            targetNavItem.classList.add('active');
        }
    };

    // Add click event listeners to navigation items
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default anchor link behavior
            const sectionId = item.getAttribute('data-section');
            history.pushState(null, '', `#${sectionId}`); // Update URL hash without reload
            showSection(sectionId);
        });
    });

    // Handle initial active state based on current URL hash or default to 'about'
    const initialSectionId = window.location.hash ? window.location.hash.substring(1) : 'about';
    showSection(initialSectionId);

    // Update active section if URL hash changes (e.g., browser back/forward)
    window.addEventListener('hashchange', () => {
        const sectionId = window.location.hash ? window.location.hash.substring(1) : 'about';
        showSection(sectionId);
    });
});