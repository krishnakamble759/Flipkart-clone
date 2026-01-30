import '../scss/style.scss';
import { initCartBadge } from './cart-manager';
import { initSearch } from './search-manager';

// Main Application Logic
console.log('Flipkart Clone Initialized');

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Cart Badge
    initCartBadge();

    // Initialize Search
    initSearch();

    // Global Navigation Handler for data-link
    document.addEventListener('click', (e) => {
        const target = e.target.closest('[data-link]');
        if (target) {
            const link = target.getAttribute('data-link').replace(/'/g, '');
            if (link) {
                window.location.href = link;
            }
        }
    });

    // Banner Carousel Logic
    let slideIndex = 0;
    const slides = document.querySelectorAll('.banner-slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let autoSlideInterval;

    const showIndices = (n) => {
        if (n >= slides.length) { slideIndex = 0 }
        if (n < 0) { slideIndex = slides.length - 1 }

        slides.forEach(slide => slide.classList.remove('active'));
        slides[slideIndex].classList.add('active');
    };

    const nextSlide = () => {
        slideIndex++;
        showIndices(slideIndex);
    };

    const prevSlide = () => {
        slideIndex--;
        showIndices(slideIndex);
    };

    if (prevBtn && nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetTimer();
        });

        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetTimer();
        });
    }

    const startTimer = () => {
        autoSlideInterval = setInterval(nextSlide, 5000);
    };

    const resetTimer = () => {
        clearInterval(autoSlideInterval);
        startTimer();
    };

    // Initialize
    if (slides.length > 0) {
        showIndices(slideIndex);
        startTimer();
    }

    // Product Slider Logic
    const sliderNextBtns = document.querySelectorAll('.slider-next-btn');
    sliderNextBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const slider = e.target.closest('.product-slider');
            if (slider) {
                slider.scrollBy({ left: 250, behavior: 'smooth' }); // Scroll width of one card roughly
            }
        });
    });

    // Product Card Navigation Logic
    const productCards = document.querySelectorAll('.product-card');
    if (productCards) {
        productCards.forEach(card => {
            card.classList.add('pointer');
            card.addEventListener('click', () => {
                // Check if data-link exists (refactored from inline onclick)
                const dataLink = card.getAttribute('data-link');
                if (dataLink) {
                    window.location.href = dataLink.replace(/'/g, '');
                    return;
                }

                const nameEl = card.querySelector('.name');
                const cardText = card.textContent.toLowerCase();
                const nameText = nameEl ? nameEl.textContent.toLowerCase() : '';
                const text = (nameText + ' ' + cardText).toLowerCase();

                if (text.includes('camera') || text.includes('mirrorless') || text.includes('dslr')) {
                    window.location.href = '/camera-list.html';
                } else if (text.includes('powerbank')) {
                    window.location.href = '/product-list.html';
                } else if (text.includes('epson')) {
                    window.location.href = '/printer-list.html';
                } else if (text.includes('hp')) {
                    window.location.href = '/hp-printer-list.html';
                } else if (text.includes('shaver')) {
                    window.location.href = '/shaver-list.html';
                } else if (text.includes('monitor')) {
                    window.location.href = '/monitor-list.html';
                } else if (text.includes('cycle')) {
                    window.location.href = '/cycle-list.html';
                } else if (text.includes('microphone')) {
                    window.location.href = '/microphone-list.html';
                } else if (text.includes('stationery') || text.includes('stationary')) {
                    window.location.href = '/stationary-list.html';
                } else if (text.includes('headphones')) {
                    window.location.href = '/headphone-list.html';
                } else if (text.includes('helmet')) {
                    window.location.href = '/helmet-list.html';
                } else if (text.includes('tyre')) {
                    window.location.href = '/tyre-list.html';
                } else if (text.includes('cap') || text.includes('caps')) {
                    window.location.href = '/caps-list.html';
                } else if (text.includes('bulb')) {
                    window.location.href = '/emergency-bulb-list.html';
                } else if (text.includes('light') || text.includes('emergency')) {
                    window.location.href = '/emergency-light-list.html';
                } else if (text.includes('carpet') || text.includes('rug')) {
                    window.location.href = '/carpet-list.html';
                } else if (text.includes('namkeen')) {
                    window.location.href = '/namkeen-list.html';

                } else if (text.includes('bed') || text.includes('cover')) {
                    window.location.href = '/bed-covers-list.html';
                } else {
                    window.location.href = '/product-detail.html';
                }
            });
        });
    }

    // Category Item Navigation Logic (Top Nav)
    const categoryItems = document.querySelectorAll('.category-item');
    if (categoryItems) {
        categoryItems.forEach(item => {
            item.classList.add('pointer');
            item.addEventListener('click', () => {
                const dataLink = item.getAttribute('data-link');
                if (dataLink) {
                    window.location.href = dataLink.replace(/'/g, '');
                    return;
                }
                window.location.href = '/product-detail.html';
            });
        });
    }

    // Mobile Sidebar Menu Logic
    const hamburgerIcon = document.querySelector('.hamburger-icon');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    const mobileMenuDrawer = document.querySelector('.mobile-menu-drawer');

    if (hamburgerIcon && mobileMenuDrawer && mobileMenuOverlay) {
        hamburgerIcon.addEventListener('click', () => {
            mobileMenuDrawer.classList.add('active');
            mobileMenuOverlay.classList.add('active');
            // Prevent body scroll when menu is open
            document.body.classList.add('no-scroll');
        });

        mobileMenuOverlay.addEventListener('click', () => {
            mobileMenuDrawer.classList.remove('active');
            mobileMenuOverlay.classList.remove('active');
            // Restore body scroll
            document.body.classList.remove('no-scroll');
        });
    }
    // Login Modal Logic (Desktop Modal & Mobile Header Login)
    const loginModalOverlay = document.querySelector('.login-modal-overlay');
    const loginModalTriggerBtns = document.querySelectorAll('.login-btn, .mobile-icon-item.login');
    const loginCloseBtn = document.querySelector('.modal-close-btn');

    if (loginModalOverlay) {
        // Open Modal
        loginModalTriggerBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                loginModalOverlay.classList.add('active');
                document.body.classList.add('no-scroll');
            });
        });

        // Close Modal via Button
        if (loginCloseBtn) {
            loginCloseBtn.addEventListener('click', () => {
                loginModalOverlay.classList.remove('active');
                document.body.classList.remove('no-scroll');
            });
        }

        // Close Modal via Overlay Click
        loginModalOverlay.addEventListener('click', (e) => {
            if (e.target === loginModalOverlay) {
                loginModalOverlay.classList.remove('active');
                document.body.classList.remove('no-scroll');
            }
        });
    }

    // Mobile Login Sheet Logic (Mobile Offcanvas Item)
    const mobileLoginSheetOverlay = document.querySelector('.mobile-login-sheet-overlay');
    const mobileSheetTriggerBtns = document.querySelectorAll('.user-info'); // Offcanvas Login & Signup
    const mobileSheetCloseBtn = document.querySelector('.close-sheet-btn');

    if (mobileLoginSheetOverlay) {
        // Open Sheet
        mobileSheetTriggerBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                mobileLoginSheetOverlay.classList.add('active');
                document.body.classList.add('no-scroll');

                // Close the mobile menu drawer if open
                if (typeof mobileMenuDrawer !== 'undefined' && mobileMenuDrawer && mobileMenuDrawer.classList.contains('active')) {
                    mobileMenuDrawer.classList.remove('active');
                    if (typeof mobileMenuOverlay !== 'undefined' && mobileMenuOverlay) {
                        mobileMenuOverlay.classList.remove('active');
                    }
                }
            });
        });

        // Close Sheet
        if (mobileSheetCloseBtn) {
            mobileSheetCloseBtn.addEventListener('click', () => {
                mobileLoginSheetOverlay.classList.remove('active');
                document.body.classList.remove('no-scroll');
            });
        }
    }
});
