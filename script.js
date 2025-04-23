const videoContainer = document.querySelector('.video-container');
const playButton = document.querySelector('.play-button');
const featureVideo = document.getElementById('featureVideo');

function updatePlayButton() {
    if (featureVideo.paused) {
        playButton.style.display = 'flex';
    } else {
        playButton.style.display = 'none';
    }
}

updatePlayButton();

videoContainer.addEventListener('click', function() {
    if (featureVideo.paused) {
        featureVideo.play();
    } else {
        featureVideo.pause();
    }
    updatePlayButton();
});

featureVideo.addEventListener('play', updatePlayButton);
featureVideo.addEventListener('pause', updatePlayButton);
featureVideo.addEventListener('ended', updatePlayButton);

featureVideo.addEventListener('loadeddata', function() {
    console.log('Video loaded successfully');
});

featureVideo.addEventListener('error', function() {
    console.error('Error loading video');
});

let currentSlide = 0;
const slides = document.querySelectorAll('.testimonial-slide');
const dots = document.querySelectorAll('.dot');
const slider = document.querySelector('.testimonial-slides');

function showSlide(index) {
    slider.style.transform = `translateX(-${index * 100}%)`;
    
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
    
    currentSlide = index;
}

dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
        showSlide(i);
        resetTimer();
    });
});

let slideInterval = setInterval(nextSlide, 5000);

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

function resetTimer() {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 5000);
}

document.addEventListener('DOMContentLoaded', function() {
    const pricingCards = document.querySelectorAll('.pricing-card');
    
    pricingCards.forEach(card => {
        card.addEventListener('click', function() {
            pricingCards.forEach(c => {
                c.classList.remove('active');
            });
            
            this.classList.add('active');
            
            console.log('Pricing card clicked:', this.dataset.plan);
        });
    });
    
    if (pricingCards.length > 0) {
        const activeCard = document.querySelector('.pricing-card[data-plan="standard"]') || pricingCards[1];
        
        pricingCards.forEach(c => {
            c.classList.remove('active');
        });
        
        activeCard.classList.add('active');
    }
});

const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });
}

document.addEventListener('click', function(event) {
    if (mobileMenu.classList.contains('active') && 
        !mobileMenu.contains(event.target) && 
        !mobileMenuBtn.contains(event.target)) {
        mobileMenuBtn.classList.remove('active');
        mobileMenu.classList.remove('active');
    }
});

const contactForm = document.getElementById('contactForm');
const successModal = document.getElementById('successModal');
const closeModal = document.querySelector('.close-modal');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    successModal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; 
    
    contactForm.reset();
});

closeModal.addEventListener('click', function() {
    successModal.style.display = 'none';
    document.body.style.overflow = 'auto'; 
});

window.addEventListener('click', function(e) {
    if (e.target === successModal) {
        successModal.style.display = 'none';
        document.body.style.overflow = 'auto'; 
    }
});

function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
        rect.bottom >= 0
    );
}

function animateOnScroll() {
    const elements = document.querySelectorAll('.feature-item, .pricing-card, .org-content, .proto-content');
    
    elements.forEach(element => {
        if (isInViewport(element)) {
            element.classList.add('animate');
        }
    });
}

const style = document.createElement('style');
style.textContent = `
    .feature-item, .pricing-card, .org-content, .proto-content {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.5s ease, transform 0.5s ease;
    }
    
    .feature-item.animate, .pricing-card.animate, .org-content.animate, .proto-content.animate {
        opacity: 1;
        transform: translateY(0);
    }
    
    .pricing-card:nth-child(2) {
        transition-delay: 0.2s;
    }
    
    .pricing-card:nth-child(3) {
        transition-delay: 0.4s;
    }
    
    nav .nav-links.active {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 70px;
        left: 0;
        width: 100%;
        background-color: #252b42;
        padding: 20px;
        z-index: 100;
    }
    
    nav .nav-links.active a {
        margin: 10px 0;
    }
`;
document.head.appendChild(style);

window.addEventListener('load', animateOnScroll);
window.addEventListener('scroll', animateOnScroll);