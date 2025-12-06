document.addEventListener('DOMContentLoaded', () => {
    const carousels = document.querySelectorAll('.carousel, .carousel1, .carousel2');

    carousels.forEach(carousel => {
        const slides = carousel.querySelectorAll('.slide');
        let current = 0;

        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.style.display = i === index ? 'block' : 'none';
            });
        }

        showSlide(current);

        const nextBtn = carousel.parentElement.querySelector('.buttons .next');
        const prevBtn = carousel.parentElement.querySelector('.buttons .prev');

        if (nextBtn) nextBtn.addEventListener('click', () => {
            current = (current + 1) % slides.length;
            showSlide(current);
        });

        if (prevBtn) prevBtn.addEventListener('click', () => {
            current = (current - 1 + slides.length) % slides.length;
            showSlide(current);
        });
    });
});
// Mostrar menú flotante al hacer scroll
window.addEventListener('scroll', () => {
    const floatingMenu = document.getElementById('floating-menu');
    if(window.scrollY > 200){ // aparece después de 200px de scroll
        floatingMenu.style.display = 'block';
    } else {
        floatingMenu.style.display = 'none';
    }
});

// Toggle menú hamburguesa
const toggleButton = document.getElementById('menu-toggle');
const navMenu = document.querySelector('.menu-nav');

toggleButton.addEventListener('click', () => {
    navMenu.style.display = navMenu.style.display === 'block' ? 'none' : 'block';
});

// Toggle submenús
document.querySelectorAll('.menu-nav > ul > li > a').forEach(link => {
    link.addEventListener('click', e => {
        const submenu = link.nextElementSibling;
        if(submenu && submenu.classList.contains('submenu')){
            e.preventDefault(); // Evita scroll si hay submenú
            link.parentElement.classList.toggle('active'); // abre/cierra submenú
        } else {
            // Scroll suave si no hay submenú
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            target.scrollIntoView({behavior:'smooth'});
            navMenu.style.display = 'none'; // cerrar menú
        }
    });
});

// Scroll suave para los items del submenú
document.querySelectorAll('.submenu a').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        target.scrollIntoView({behavior:'smooth'});
        navMenu.style.display = 'none'; // cerrar menú
    });
});
