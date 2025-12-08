//  INICIALIZACIÓN DE CARRUSELES AL CARGAR EL DOCUMENTO
document.addEventListener('DOMContentLoaded', () => {
    // Selecciona todos los carruseles de tu página
    const carousels = document.querySelectorAll('.carousel, .carousel1, .carousel2');
   
    // Recorre cada carrusel individualmente
    carousels.forEach(carousel => {
        // Todas las imágenes (slides) dentro del carrusel actual
        const slides = carousel.querySelectorAll('.slide');
        let current = 0;// índice de la imagen actualmente visible

        // Función para mostrar solo la imagen correspondiente
        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.style.display = i === index ? 'block' : 'none';
            });
        }

        // Muestra la primera imagen al iniciar
        showSlide(current);

        // Busca botones "Next" y "Previous"
        const nextBtn = carousel.parentElement.querySelector('.buttons .next');
        const prevBtn = carousel.parentElement.querySelector('.buttons .prev');

        // Botón para pasar a la siguiente imagen
        if (nextBtn) nextBtn.addEventListener('click', () => {
            current = (current + 1) % slides.length;
            showSlide(current);
        });

        // Botón para ir a la imagen anterior
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

// Toggle menú desplegable
const toggleButton = document.getElementById('menu-toggle');
const navMenu = document.querySelector('.menu-nav');

// Muestra u oculta el menú al hacer click
toggleButton.addEventListener('click', () => {
    navMenu.style.display = navMenu.style.display === 'block' ? 'none' : 'block';
});

// Abrir/Cerrar submenús del menú desplegable
document.querySelectorAll('.menu-nav > ul > li > a').forEach(link => {
    link.addEventListener('click', e => {
        const submenu = link.nextElementSibling;
        // Si tiene submenú, abre/cierra en lugar de navegar
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

// ====================== PLAYLIST DE MÚSICA ======================
// Lista de canciones con archivo y título
const playlist = [
    { file: "Musica/Promise (Reprise).mp3", title: "Promise (Reprise)" },
    { file: "Musica/Silent Hill - Akira Yamaoka.mp3", title: "Silent Hill Theme" },
    { file: "Musica/Never Forgive Me, Never Forget Me.mp3", title: "Never Forgive Me, Never Forget Me" },
    { file: "Musica/Not Tomorrow (Long Version).mp3", title: "Not Tomorrow (Long Version)" },
    { file: "Musica/Theme of Laura.mp3", title: "Theme of Laura" }
];

let songIndex = 0; // Canción actualmente seleccionada
// Elementos del reproductor
const player = document.getElementById("player");
const songTitle = document.getElementById("songTitle");

// Función para actualizar la canción + el título
function loadSong(index) {
    player.src = playlist[index].file;// Cambia el archivo de audio
    songTitle.textContent = "Reproduciendo: " + playlist[index].title;// Muestra el nombre de la canción
}

// Cargar la primera canción
loadSong(songIndex);

// Cuando termina, pasar a la siguiente
player.addEventListener("ended", () => {
    songIndex = (songIndex + 1) % playlist.length;// Avanza y repite lista
    loadSong(songIndex);
    player.play();
});

// Botón siguiente
document.getElementById("nextSong").addEventListener("click", () => {
    songIndex = (songIndex + 1) % playlist.length;
    loadSong(songIndex);
    player.play();
});

// Botón anterior
document.getElementById("prevSong").addEventListener("click", () => {
    songIndex = (songIndex - 1 + playlist.length) % playlist.length;
    loadSong(songIndex);
    player.play();
});

// ====================== SONIDOS DE INTERACCIÓN ======================
// Sonidos
const hoverSound = new Audio("Musica/sddata_294.wav");
const clickSound = new Audio("Musica/sddata_298.wav");

hoverSound.volume = 0.4;
clickSound.volume = 0.6;

// Sonido hover
document.querySelectorAll("button, a").forEach(elem => {
    elem.addEventListener("mouseenter", () => {
        hoverSound.currentTime = 0;
        hoverSound.play();
    });
});

// Sonido click, con setTimeout mínimo para dejar que se reproduzca antes de la navegación
document.querySelectorAll("button, a").forEach(elem => {
    elem.addEventListener("click", (e) => {
        clickSound.currentTime = 0;
        clickSound.play();

        // Solo retrasar si el elemento es un enlace
        if(elem.tagName.toLowerCase() === 'a' && elem.href) {
            e.preventDefault(); // previene navegación inmediata
            const href = elem.href;
            setTimeout(() => {
                window.location.href = href; // navega después de 100ms
            }, 250);
        }
    });
});
