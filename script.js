// Video Play/Pause Functionality
const videoContainer = document.querySelector('.video-container');
const playButton = document.querySelector('.play-button');
const featureVideo = document.getElementById('featureVideo');

// Show/hide play button based on video state
function updatePlayButton() {
    if (featureVideo.paused) {
        playButton.style.display = 'flex';
    } else {
        playButton.style.display = 'none';
    }
}

// Initial check
updatePlayButton();

// Toggle play/pause when clicking the video container
videoContainer.addEventListener('click', function() {
    if (featureVideo.paused) {
        featureVideo.play();
    } else {
        featureVideo.pause();
    }
    updatePlayButton();
});

// Update button when video state changes
featureVideo.addEventListener('play', updatePlayButton);
featureVideo.addEventListener('pause', updatePlayButton);
featureVideo.addEventListener('ended', updatePlayButton);

// Make sure video is properly loaded
featureVideo.addEventListener('loadeddata', function() {
    // This ensures the video is ready to play
    console.log('Video loaded successfully');
});

// Fallback in case of loading issues
featureVideo.addEventListener('error', function() {
    console.error('Error loading video');
    // You could show an error message or fallback image here
});

// Testimonial Slider/Carousel
let currentSlide = 0;
const slides = document.querySelectorAll('.testimonial-slide');
const dots = document.querySelectorAll('.dot');
const slider = document.querySelector('.testimonial-slides');

function showSlide(index) {
    slider.style.transform = `translateX(-${index * 100}%)`;
    
    // Update dots
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
    
    currentSlide = index;
}

// Dot click event
dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
        showSlide(i);
        resetTimer();
    });
});

// Auto slide
let slideInterval = setInterval(nextSlide, 5000);

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

function resetTimer() {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 5000);
}

// Pricing Card Selection
document.addEventListener('DOMContentLoaded', function() {
    const pricingCards = document.querySelectorAll('.pricing-card');
    
    pricingCards.forEach(card => {
        card.addEventListener('click', function() {
            // Remove active class from all cards
            pricingCards.forEach(c => {
                c.classList.remove('active');
            });
            
            // Add active class to clicked card
            this.classList.add('active');
            
            console.log('Pricing card clicked:', this.dataset.plan);
        });
    });
    
    // Initialize - ensure one card is active
    if (pricingCards.length > 0) {
        // Find the standard plan or default to the middle card
        const activeCard = document.querySelector('.pricing-card[data-plan="standard"]') || pricingCards[1];
        
        // Remove active class from all cards first
        pricingCards.forEach(c => {
            c.classList.remove('active');
        });
        
        // Add active class to the standard/middle card
        activeCard.classList.add('active');
    }
});

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });
}

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    if (mobileMenu.classList.contains('active') && 
        !mobileMenu.contains(event.target) && 
        !mobileMenuBtn.contains(event.target)) {
        mobileMenuBtn.classList.remove('active');
        mobileMenu.classList.remove('active');
    }
});

// Contact Form Modal
const contactForm = document.getElementById('contactForm');
const successModal = document.getElementById('successModal');
const closeModal = document.querySelector('.close-modal');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Show modal
    successModal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Prevent body scrolling
    
    // Reset form
    contactForm.reset();
});

closeModal.addEventListener('click', function() {
    successModal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Re-enable body scrolling
});

// Close modal when clicking outside
window.addEventListener('click', function(e) {
    if (e.target === successModal) {
        successModal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Re-enable body scrolling
    }
});

// Animate elements on scroll
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

// Add CSS for animations
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

// Run on initial load and scroll
window.addEventListener('load', animateOnScroll);
window.addEventListener('scroll', animateOnScroll);