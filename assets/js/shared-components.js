/**
 * Carga componentes compartidos (navbar y footer)
 * Evita duplicación de código entre páginas
 */

// Función para cargar un componente HTML
async function loadComponent(elementId, componentPath) {
    try {
        const response = await fetch(componentPath);
        if (!response.ok) throw new Error(`Failed to load ${componentPath}`);
        const html = await response.text();
        document.getElementById(elementId).innerHTML = html;
    } catch (error) {
        console.error(`Error loading component from ${componentPath}:`, error);
    }
}

// Cargar navbar y footer al cargar la página
document.addEventListener('DOMContentLoaded', async function() {
    // Cargar navbar
    await loadComponent('navbar-placeholder', 'components/navbar.html');

    // Cargar footer
    await loadComponent('footer-placeholder', 'components/footer.html');

    // Re-inicializar Lucide icons después de cargar los componentes
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // Inicializar funcionalidad del menú móvil después de cargar navbar
    initMobileMenu();

    // Inicializar navbar scroll
    initNavbarScroll();
});

// Funcionalidad del menú móvil
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuClose = document.getElementById('mobile-menu-close');
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');

    if (mobileMenuBtn && mobileMenu && mobileMenuClose) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.remove('translate-x-full');
            document.body.style.overflow = 'hidden';
        });

        mobileMenuClose.addEventListener('click', () => {
            mobileMenu.classList.add('translate-x-full');
            document.body.style.overflow = '';
        });

        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('translate-x-full');
                document.body.style.overflow = '';
            });
        });
    }
}

// Navbar scroll effect
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                navbar.classList.add('nav-scrolled', 'navbar-scrolled');
            } else {
                navbar.classList.remove('nav-scrolled', 'navbar-scrolled');
            }
        });
    }
}
