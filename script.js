// Custom Cursor - Sticky Hover
const cursor = document.querySelector('.cursor');
const cursorDot = document.querySelector('.cursor-dot');
let isHovering = false;

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    cursorDot.style.left = e.clientX + 'px';
    cursorDot.style.top = e.clientY + 'px';
});

// Sticky cursor interaction on hover
const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-tag, input, textarea');

interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        isHovering = true;
        document.body.classList.add('cursor-active');
        cursor.style.boxShadow = '0 0 20px rgba(0, 208, 132, 0.5)';
    });

    element.addEventListener('mouseleave', () => {
        isHovering = false;
        document.body.classList.remove('cursor-active');
        cursor.style.boxShadow = 'none';
    });
});

// Hide cursor when leaving window
document.addEventListener('mouseleave', () => {
    cursor.style.display = 'none';
    cursorDot.style.display = 'none';
});

document.addEventListener('mouseenter', () => {
    cursor.style.display = 'block';
    cursorDot.style.display = 'block';
});

// Carousel Functionality - Enhanced
const carousel = document.getElementById('projectsCarousel');

if (carousel) {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const carouselDots = document.getElementById('carouselDots');

    const projectCards = carousel.querySelectorAll('.project-card');
    const totalSlides = projectCards.length;

    // ALL carousel code goes inside this block
}

// Create dots
function createDots() {
    carouselDots.innerHTML = '';
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('div');
        dot.classList.add('carousel-dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        carouselDots.appendChild(dot);
    }
}

// Update carousel position
function updateCarousel() {
    const offset = -currentSlide * 100;
    carousel.style.transform = `translateX(${offset}%)`;
    
    // Update dots with smooth animation
    document.querySelectorAll('.carousel-dot').forEach((dot, index) => {
        dot.classList.remove('active');
        if (index === currentSlide) {
            dot.classList.add('active');
        }
    });

    // Add visual feedback on cards
    projectCards.forEach((card, index) => {
        if (index === currentSlide) {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
        }
    });
}

// Go to specific slide
function goToSlide(index) {
    currentSlide = index;
    updateCarousel();
}

// Next slide with smooth transition
function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
}

// Previous slide with smooth transition
function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateCarousel();
}

// Event listeners for buttons
prevBtn.addEventListener('click', prevSlide);
nextBtn.addEventListener('click', nextSlide);

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') nextSlide();
    if (e.key === 'ArrowLeft') prevSlide();
});

// Touch/Swipe support
let touchStartX = 0;
let touchEndX = 0;

carousel.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
}, false);

carousel.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, false);

function handleSwipe() {
    if (touchStartX - touchEndX > 50) {
        nextSlide();
    } else if (touchEndX - touchStartX > 50) {
        prevSlide();
    }
}

// Initialize carousel
createDots();
updateCarousel();

// Auto-advance carousel every 6 seconds
const autoAdvanceInterval = setInterval(nextSlide, 6000);

// Pause auto-advance on hover
carousel.addEventListener('mouseenter', () => {
    clearInterval(autoAdvanceInterval);
});

carousel.addEventListener('mouseleave', () => {
    // Auto-advance on mouse leave
});

console.log('Enhanced carousel initialized!');

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Hamburger menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
});

// Contact form submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();

    emailjs.send(
        "service_d01jr6r",
        "template_a5bpt2s",
        {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            message: document.getElementById("message").value
        }
    )
    .then(() => {
        alert("Message sent successfully!");
        this.reset();
    })
    .catch((error) => {
        console.error("EmailJS Error:", error);
        alert("Failed to send message.");
    });
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply animation to project cards and skill items
document.querySelectorAll('.project-card, .skill-category, .stat').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
});

// Navbar background change on scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 10, 10, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 208, 132, 0.1)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Active navigation link on scroll
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.style.color = 'var(--text-light)';
        if (item.getAttribute('href') === '#' + current) {
            item.style.color = 'var(--primary-color)';
        }
    });
});

// Parallax effect on hero section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const scrollPosition = window.pageYOffset;
    if (scrollPosition < window.innerHeight) {
        hero.style.backgroundPosition = '0% ' + (scrollPosition * 0.5) + 'px';
    }
});

// Typewriter effect for hero title (optional)
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    let index = 0;

    function typeWriter() {
        if (index < text.length) {
            heroTitle.textContent += text.charAt(index);
            index++;
            setTimeout(typeWriter, 50);
        }
    }

    // Optional: uncomment to enable typewriter effect
    // typeWriter();
}

// Click ripple effect for buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

console.log('Portfolio initialized successfully!');
