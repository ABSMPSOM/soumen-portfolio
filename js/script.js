        // Initialize Scroll Animations (AOS)
        AOS.init();

        // Theme Customizer Logic
        function toggleCustomizer() {
            document.getElementById('customizer').classList.toggle('customizer-open');
        }

        function setTheme(primaryRGB, secondaryRGB) {
            document.documentElement.style.setProperty('--color-primary', primaryRGB);
            document.documentElement.style.setProperty('--color-secondary', secondaryRGB);
            // Auto close on mobile
            if(window.innerWidth < 768) {
                toggleCustomizer();
            }
        }
        // 🚀 Carousel Logic
const track = document.getElementById('carouselTrack');

// ONLY run the carousel code if the track exists on the page
if (track) {
    const slides = Array.from(track.children);
    const indicatorsContainer = document.getElementById('carouselIndicators');
    let currentIndex = 0;

    slides.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.className = `w-3 h-3 rounded-full transition-all duration-300 ${index === 0 ? 'bg-cyan-400 shadow-[0_0_8px_#0ff]' : 'bg-[#0d0f12] shadow-neo-in'}`;
        dot.onclick = () => goToSlide(index);
        indicatorsContainer.appendChild(dot);
    });
    
    const dots = Array.from(indicatorsContainer.children);

    function updateCarousel() {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        dots.forEach((dot, index) => {
            dot.className = index === currentIndex 
                ? 'w-4 h-3 rounded-full transition-all duration-300 bg-cyan-400 shadow-[0_0_8px_#0ff]' 
                : 'w-3 h-3 rounded-full transition-all duration-300 bg-[#0d0f12] shadow-neo-in';
        });
        // Auto pause video when sliding away
        slides.forEach((slide, index) => {
            const video = slide.querySelector('video');
            if (video && index !== currentIndex) video.pause();
        });
    }

    // Attach these to the global window object so your HTML onclick attributes can still find them
    window.nextSlide = function() { currentIndex = (currentIndex + 1) % slides.length; updateCarousel(); }
    window.prevSlide = function() { currentIndex = (currentIndex - 1 + slides.length) % slides.length; updateCarousel(); }
    window.goToSlide = function(index) { currentIndex = index; updateCarousel(); }
}

        /* ===============================
/* ===============================
   NEUMORPHIC CURSOR LOGIC
================================= */
if (window.matchMedia("(pointer: fine)").matches) {
    // Inject the two cursor elements
    const ring = document.createElement('div');
    ring.classList.add('neo-cursor-ring');
    document.body.appendChild(ring);

    const dot = document.createElement('div');
    dot.classList.add('neo-cursor-dot');
    document.body.appendChild(dot);

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    // Track mouse position
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // The neon dot snaps instantly to the mouse coordinates
        dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
    });

    // The neumorphic ring follows with a smooth easing effect
    function animateRing() {
        ringX += (mouseX - ringX) * 0.2; // 0.2 controls the "drag" or weight
        ringY += (mouseY - ringY) * 0.2;
        
        ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
        requestAnimationFrame(animateRing);
    }
    animateRing();

    // Trigger the "pressed" state when hovering over clickable items
    // Targeting a, button, input, textarea, and your custom .hover-pop class
    const interactables = document.querySelectorAll('a, button, input, textarea, .hover-pop');
    
    interactables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            ring.classList.add('hovered');
            dot.classList.add('hovered');
        });
        el.addEventListener('mouseleave', () => {
            ring.classList.remove('hovered');
            dot.classList.remove('hovered');
        });
    });
}
/* ===============================
   SMART THEME ENGINE (Dark & Light Profiles)
================================= */
const themePalettes = {
    'cyberpunk': {
        dark: { p: '0, 255, 255', s: '176, 38, 255' }, // Neon Cyan & Bright Purple
        light: { p: '2, 132, 199', s: '126, 34, 206' } // Deep Sky Blue & Royal Purple
    },
    'matrix': {
        dark: { p: '0, 255, 100', s: '0, 200, 0' },    // Neon Green
        light: { p: '22, 163, 74', s: '21, 128, 61' }  // Forest & Emerald Green
    },
    'lava': {
        dark: { p: '255, 87, 34', s: '255, 193, 7' },  // Neon Orange & Yellow
        light: { p: '234, 88, 12', s: '194, 65, 12' }  // Burnt Orange & Brick Red
    },
    'ice': {
        dark: { p: '56, 189, 248', s: '255, 255, 255' }, // Ice Blue & White
        light: { p: '3, 105, 161', s: '71, 85, 105' }    // Navy Blue & Slate
    }
};

// Retrieve saved theme or default to cyberpunk
let currentTheme = localStorage.getItem('activeTheme') || 'cyberpunk';

function applyThemeColors() {
    const isLight = document.body.classList.contains('light-mode');
    const mode = isLight ? 'light' : 'dark';
    const colors = themePalettes[currentTheme][mode];
    
    document.documentElement.style.setProperty('--color-primary', colors.p);
    document.documentElement.style.setProperty('--color-secondary', colors.s);
}

function setTheme(themeName) {
    currentTheme = themeName;
    localStorage.setItem('activeTheme', themeName);
    applyThemeColors();
    
    // Auto close customizer on mobile
    if(window.innerWidth < 768) {
        toggleCustomizer();
    }
}

/* ===============================
   DARK/LIGHT THEME TOGGLE
================================= */
const themeIcon = document.getElementById('theme-icon');

// Initial load check
if (localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light-mode');
    if(themeIcon) themeIcon.classList.replace('ph-sun', 'ph-moon');
}
// Apply colors immediately on page load
applyThemeColors(); 

function toggleTheme() {
    document.body.classList.toggle('light-mode');
    
    if (document.body.classList.contains('light-mode')) {
        localStorage.setItem('theme', 'light');
        if(themeIcon) themeIcon.classList.replace('ph-sun', 'ph-moon');
    } else {
        localStorage.setItem('theme', 'dark');
        if(themeIcon) themeIcon.classList.replace('ph-moon', 'ph-sun');
    }
    
    // Recalculate colors when switching modes
    applyThemeColors();
}