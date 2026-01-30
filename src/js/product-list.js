import '../scss/style.scss';
import '../scss/product-detail.scss';
import '../scss/product-list.scss';
import { initCartBadge } from './cart-manager';
import { initSearch } from './search-manager';

// Product List Page Logic
console.log('Product List Page Initialized');

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

    const filterProducts = () => {
        const urlParams = new URLSearchParams(window.location.search);
        const query = urlParams.get('q');
        if (!query) return;

        const normalizedQuery = query.toLowerCase().trim();
        const searchTerms = normalizedQuery.split(/\s+/).filter(term => term.length > 0);

        const cards = document.querySelectorAll('.product-list-card, .product-row-card');
        let visibleCount = 0;

        cards.forEach(card => {
            const name = card.querySelector('.product-name')?.textContent.toLowerCase() || '';
            const desc = card.querySelector('.product-desc, .highlights-list')?.textContent.toLowerCase() || '';
            const combinedText = name + ' ' + desc;

            let isMatch = true;
            for (const term of searchTerms) {
                // Basic plural handling: remove trailing 's' if term is at least 4 chars
                let cleanTerm = term;
                if (cleanTerm.endsWith('s') && cleanTerm.length > 3) {
                    cleanTerm = cleanTerm.slice(0, -1);
                }

                // Check for match (case-insensitive already done)
                // We check original text AND text with spaces removed to handle "powerbank" vs "power bank"
                const textNoSpace = combinedText.replace(/\s+/g, '');
                const termNoSpace = cleanTerm.replace(/\s+/g, '');

                if (!combinedText.includes(cleanTerm) && !textNoSpace.includes(termNoSpace)) {
                    isMatch = false;
                    break;
                }
            }

            if (isMatch) {
                card.classList.remove('hide');
                visibleCount++;
            } else {
                card.classList.add('hide');
            }
        });

        // Update results count
        const resultsCountEl = document.querySelector('.results-count');
        if (resultsCountEl) {
            resultsCountEl.textContent = `Showing 1 – ${visibleCount} of ${visibleCount} results for "${query}"`;
        }

        // Handle No Results Found
        const productsGrid = document.querySelector('.products-grid');
        const listContainer = document.querySelector('.list-container');
        let noResultsMsg = document.getElementById('no-products-found');

        if (visibleCount === 0) {
            if (!noResultsMsg) {
                noResultsMsg = document.createElement('div');
                noResultsMsg.id = 'no-products-found';
                noResultsMsg.innerHTML = `
                    <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/error-no-search-results_2353c5.png">
                    <div class="no-results-title">Sorry, no results found!</div>
                    <div class="no-results-desc">We couldn't find any products matching your search. Try adjusting your query.</div>
                `;
                if (productsGrid) {
                    productsGrid.appendChild(noResultsMsg);
                } else if (listContainer) {
                    listContainer.appendChild(noResultsMsg);
                }
            }
            noResultsMsg.classList.remove('hide');
        } else if (noResultsMsg) {
            noResultsMsg.classList.add('hide');
        }
    };

    filterProducts();

    // Sorting Logic
    const sortItems = document.querySelectorAll('.sort-item');
    const productsContainer = document.querySelector('.products-grid, .products-row-view');

    if (sortItems.length > 0 && productsContainer) {
        sortItems.forEach(item => {
            item.addEventListener('click', () => {
                // Update UI active state
                sortItems.forEach(si => si.classList.remove('active'));
                item.classList.add('active');

                const sortType = item.textContent.trim();
                const cards = Array.from(productsContainer.children).filter(card => card.id !== 'no-products-found');

                cards.sort((a, b) => {
                    const getPrice = (el) => {
                        const p = el.querySelector('.curr-price')?.textContent || '0';
                        return parseFloat(p.replace(/[^0-9]/g, ''));
                    };

                    const getRating = (el) => {
                        const r = el.querySelector('.rating-badge')?.textContent || '0';
                        return parseFloat(r);
                    };

                    if (sortType === 'Price -- Low to High') {
                        return getPrice(a) - getPrice(b);
                    } else if (sortType === 'Price -- High to Low') {
                        return getPrice(b) - getPrice(a);
                    } else if (sortType === 'Popularity') {
                        return getRating(b) - getRating(a);
                    } else if (sortType === 'Relevance') {
                        // For relevance, we just keep current (or could sort by a data-index if we had one)
                        return 0;
                    }
                    return 0;
                });

                // Re-append sorted cards
                cards.forEach(card => productsContainer.appendChild(card));
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
            document.body.classList.add('no-scroll');
        });

        mobileMenuOverlay.addEventListener('click', () => {
            mobileMenuDrawer.classList.remove('active');
            mobileMenuOverlay.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    }

    // Wishlist Toggle
    const wishlistIcons = document.querySelectorAll('.wishlist-icon');
    wishlistIcons.forEach(icon => {
        icon.addEventListener('click', (e) => {
            e.stopPropagation();
            icon.classList.toggle('active');
            if (icon.classList.contains('bi-heart')) {
                icon.classList.remove('bi-heart');
                icon.classList.add('bi-heart-fill');
            } else {
                icon.classList.remove('bi-heart-fill');
                icon.classList.add('bi-heart');
            }
        });
    });

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
    // Product List Card Navigation Logic
    const productListCards = document.querySelectorAll('.product-list-card');
    if (productListCards) {
        productListCards.forEach(card => {
            card.style.cursor = 'pointer';
            card.addEventListener('click', () => {
                const dataLink = card.getAttribute('data-link');
                if (dataLink) {
                    window.location.href = dataLink.replace(/'/g, '');
                }
            });
        });
    }
});
