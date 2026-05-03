// =========================================
// 1. NAVBAR SCROLL EFFECT
// =========================================
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// =========================================
// 2. MOBILE MENU
// =========================================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close menu on link click
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// =========================================
// 3. NEW THEME SWITCHER LOGIC
// =========================================
const themeBtn = document.getElementById('themeBtn');
const themeSwitcher = document.querySelector('.theme-switcher');
const themeColors = document.querySelectorAll('.theme-color');

// Toggle panel open/close
if(themeBtn && themeSwitcher) {
    themeBtn.addEventListener('click', () => {
        themeSwitcher.classList.toggle('open');
    });

    // Hide panel when clicking outside
    document.addEventListener('click', (e) => {
        if (!themeSwitcher.contains(e.target)) {
            themeSwitcher.classList.remove('open');
        }
    });
}

// Change Theme when a color circle is clicked
themeColors.forEach(color => {
    color.addEventListener('click', () => {
        const theme = color.getAttribute('data-theme');
        // Apply theme to body
        document.body.setAttribute('data-theme', theme);
        // Save to localStorage so it remembers next time
        localStorage.setItem('selectedTheme', theme);
    });
});

// Load saved theme on page load
const savedTheme = localStorage.getItem('selectedTheme');
if (savedTheme) {
    document.body.setAttribute('data-theme', savedTheme);
} else {
    document.body.setAttribute('data-theme', 'default');
}

// =========================================
// 4. REAL-TIME GREETING
// =========================================
function updateGreeting() {
    const hour = new Date().getHours();
    const greetingText = document.getElementById('greetingText');
    const greetingEmoji = document.getElementById('greetingEmoji');
    
    if(!greetingText || !greetingEmoji) return;

    if (hour >= 5 && hour < 12) {
        greetingText.textContent = 'Good Morning!';
        greetingEmoji.textContent = '🌅';
    } else if (hour >= 12 && hour < 17) {
        greetingText.textContent = 'Good Afternoon!';
        greetingEmoji.textContent = '☀️';
    } else if (hour >= 17 && hour < 21) {
        greetingText.textContent = 'Good Evening!';
        greetingEmoji.textContent = '🌆';
    } else {
        greetingText.textContent = 'Good Night!';
        greetingEmoji.textContent = '🌙';
    }
}
updateGreeting();

// =========================================
// 5. TYPING ANIMATION
// =========================================
const roles = ['Web Developer', 'UI/UX Designer', 'Machine Learner', 'Problem Solver','App developer'];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingText = document.getElementById('typingText');

function type() {
    if(!typingText) return;
    
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
        typingText.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
    }
    
    let typeSpeed = isDeleting ? 50 : 100;
    
    if (!isDeleting && charIndex === currentRole.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typeSpeed = 500;
    }
    
    setTimeout(type, typeSpeed);
}
type();

// =========================================
// 6. SMOOTH SCROLL
// =========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// =========================================
// 7. FORM SUBMIT
// =========================================
const contactForm = document.querySelector('.contact-form');
if(contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your message! I will get back to you soon. 😊');
        contactForm.reset();
    });
}

// =========================================
// 8. ANIMATE ON SCROLL
// =========================================
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.project-card, .skill-box, .about-img, .about-text').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});
