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
        function nextSlide() { currentIndex = (currentIndex + 1) % slides.length; updateCarousel(); }
        function prevSlide() { currentIndex = (currentIndex - 1 + slides.length) % slides.length; updateCarousel(); }
        function goToSlide(index) { currentIndex = index; updateCarousel(); }