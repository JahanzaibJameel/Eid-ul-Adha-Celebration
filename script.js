// Create stars in the background
function createStars() {
    const container = document.getElementById('stars-container');
    const starCount = 200;

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');

        // Random position
        const left = Math.random() * 100;
        const top = Math.random() * 100;

        // Random size
        const size = Math.random() * 3;

        // Random animation delay
        const delay = Math.random() * 5;

        star.style.left = `${left}%`;
        star.style.top = `${top}%`;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.animationDelay = `${delay}s`;

        container.appendChild(star);
    }
}

// Create particles
function createParticles() {
    const container = document.getElementById('particles-container');
    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.classList.add('floating');

        // Random position
        const left = Math.random() * 100;
        const top = Math.random() * 100;

        // Random size
        const size = Math.random() * 6 + 2;

        // Random animation delay
        const delay = Math.random() * 6;

        particle.style.left = `${left}%`;
        particle.style.top = `${top}%`;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.animationDelay = `${delay}s`;
        particle.style.opacity = Math.random() * 0.5 + 0.2;

        container.appendChild(particle);
    }
}

// Countdown timer
function updateCountdown() {
    // Set Eid ul-Adha date (June 17, 2025)
    const eidDate = new Date('June 17, 2025 00:00:00').getTime();
    const now = new Date().getTime();
    const timeRemaining = eidDate - now;

    if (timeRemaining > 0) {
        const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    }
}

// Takbir button functionality
function setupTakbirButton() {
    const takbirBtn = document.querySelector('.takbir-btn');
    const takbirAudio = document.getElementById('takbir-audio');

    takbirBtn.addEventListener('click', () => {
        takbirAudio.currentTime = 0;
        takbirAudio.play();

        // Create visual feedback
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                createParticleEffect(takbirBtn);
            }, i * 50);
        }
    });
}

// Create particle effect
function createParticleEffect(element) {
    const rect = element.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    const particle = document.createElement('div');
    particle.classList.add('particle');

    document.body.appendChild(particle);

    const size = Math.random() * 10 + 5;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.borderRadius = '50%';
    particle.style.background = 'radial-gradient(circle, #D4AF37, #F9E076)';
    particle.style.position = 'fixed';
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '100';

    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * 100 + 50;
    const duration = Math.random() * 1000 + 500;

    gsap.to(particle, {
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
        opacity: 0,
        scale: 0,
        duration: duration / 1000,
        ease: "power2.out",
        onComplete: () => {
            particle.remove();
        }
    });
}

// Initialize animations with GSAP
function initAnimations() {
    // Animate hero section elements
    gsap.from('.crescent-moon', {
        duration: 2,
        scale: 0.5,
        opacity: 0,
        ease: "elastic.out(1, 0.5)"
    });

    gsap.from('h1 span', {
        duration: 1.5,
        y: 50,
        opacity: 0,
        stagger: 0.2,
        ease: "power3.out"
    });

    gsap.from('p, .flex.space-x-4, .takbir-btn', {
        duration: 1,
        y: 30,
        opacity: 0,
        stagger: 0.2,
        delay: 1,
        ease: "power3.out"
    });

    // Create scroll animations for sections
    gsap.utils.toArray('section').forEach((section, index) => {
        if (index > 0) { // Skip the first section
            gsap.from(section, {
                scrollTrigger: {
                    trigger: section,
                    start: "top 80%",
                    toggleActions: "play none none none"
                },
                opacity: 0,
                y: 50,
                duration: 1,
                ease: "power3.out"
            });
        }
    });
}

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    createStars();
    createParticles();
    updateCountdown();
    setInterval(updateCountdown, 1000);
    setupTakbirButton();

    // Initialize animations after a short delay
    setTimeout(initAnimations, 500);
});