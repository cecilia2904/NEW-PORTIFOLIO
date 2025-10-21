// === Menu mobile ===
const menuToggle = document.getElementById('menu-toggle');
const mobileNav = document.getElementById('mobile-nav');

if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', () => {
        const isOpen = mobileNav.classList.toggle('hidden') === false;
        menuToggle.setAttribute('aria-expanded', String(isOpen));
    });

    // fecha o menu ao clicar em um link
    mobileNav.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
            mobileNav.classList.add('hidden');
            menuToggle.setAttribute('aria-expanded', 'false');
        });
    });
}

// === Carrossel principal (scroll) ===
const projCarousel = document.getElementById('project-carousel');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

function scrollByAmount(dir = 1) {
    if (!projCarousel) return;
    const amount = Math.min(600, projCarousel.clientWidth * 0.9);
    projCarousel.scrollBy({ left: dir * amount, behavior: 'smooth' });
}

prevBtn && prevBtn.addEventListener('click', () => scrollByAmount(-1));
nextBtn && nextBtn.addEventListener('click', () => scrollByAmount(1));

// === Mini-carrosséis por card ===
function getCarouselContext(anyInsideButton) {
    const wrapper = anyInsideButton.closest('.relative'); // container do mini-carrossel
    const track = wrapper.querySelector('.carousel-track');
    const slides = Array.from(track.querySelectorAll('.carousel-slide'));
    const dots = Array.from(wrapper.querySelectorAll('.carousel-dots .dot'));
    const activeIndex = slides.findIndex(s => !s.classList.contains('slide-hidden'));
    return { wrapper, track, slides, dots, activeIndex: Math.max(activeIndex, 0) };
}

function setActiveSlide(ctx, index) {
    ctx.slides.forEach((s, i) => {
        s.classList.toggle('slide-hidden', i !== index);
    });
    ctx.dots.forEach((d, i) => {
        d.classList.toggle('dot-active', i === index);
    });
}

window.prevSlide = function (buttonEl) {
    const ctx = getCarouselContext(buttonEl);
    const next = (ctx.activeIndex - 1 + ctx.slides.length) % ctx.slides.length;
    setActiveSlide(ctx, next);
};

window.nextSlide = function (buttonEl) {
    const ctx = getCarouselContext(buttonEl);
    const next = (ctx.activeIndex + 1) % ctx.slides.length;
    setActiveSlide(ctx, next);
};

window.goToSlide = function (dotEl, index) {
    const ctx = getCarouselContext(dotEl);
    setActiveSlide(ctx, index);
};

// Acessibilidade: setas do teclado para o carrossel principal (desktop)
if (projCarousel) {
    projCarousel.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') { e.preventDefault(); scrollByAmount(-1); }
        if (e.key === 'ArrowRight') { e.preventDefault(); scrollByAmount(1); }
    });
}
