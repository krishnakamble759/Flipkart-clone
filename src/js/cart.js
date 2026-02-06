
import '../scss/style.scss';
import '../scss/cart.scss';
import { getCart, removeFromCart, updateQuantity, initCartBadge } from './cart-manager';
import { initSearch } from './search-manager';
import { getFormattedDeliveryDate } from './date-manager';

document.addEventListener('DOMContentLoaded', () => {
    initCartBadge();
    initSearch();
    renderCart();

    function renderCart() {
        const cart = getCart();
        const cartContent = document.getElementById('cart-content');
        const emptyCartView = document.getElementById('empty-cart-view');
        const itemsContainer = document.getElementById('cart-items-container');

        if (cart.length === 0) {
            cartContent.classList.add('hide');
            emptyCartView.classList.remove('hide');
            return;
        }

        cartContent.classList.remove('hide');
        emptyCartView.classList.add('hide');
        itemsContainer.innerHTML = '';

        let totalMrp = 0;
        let totalDiscount = 0;
        let finalAmount = 0;

        const template = document.getElementById('cart-item-template');
        cart.forEach(item => {
            const priceNum = parseInt(item.price.replace(/[^0-9]/g, '')) || 0;
            const mrpNum = Math.round(priceNum * 1.25 / 100) * 100;
            const discount = mrpNum - priceNum;

            totalMrp += mrpNum * item.quantity;
            totalDiscount += discount * item.quantity;
            finalAmount += priceNum * item.quantity;

            const clone = template.content.cloneNode(true);
            const itemEl = clone.querySelector('.cart-item');
            itemEl.dataset.id = item.id;

            const itemImg = clone.querySelector('.item-img');
            let imagePath = item.image || './empty-cart.png';

            // Repair old absolute paths if they exist in localStorage
            if (imagePath.includes('localhost') || imagePath.includes('127.0.0.1')) {
                try {
                    const url = new URL(imagePath);
                    // extracting filename relative to root, removing leading /
                    imagePath = url.pathname.startsWith('/') ? url.pathname.substring(1) : url.pathname;
                } catch (e) {
                    console.error('Invalid URL in cart item:', imagePath);
                }
            } else if (imagePath.startsWith('/') && !imagePath.startsWith('./')) {
                // Ensure root-relative paths become relative for file:// protocol
                imagePath = imagePath.substring(1);
            }

            itemImg.src = imagePath;
            itemImg.alt = item.title;

            // Fallback: Smart Retry
            itemImg.onerror = () => {
                // If we haven't tried public/ yet, try it (fixes file:// opening of vite projects)
                if (!itemImg.dataset.retried) {
                    itemImg.dataset.retried = 'true';
                    // Strip ./ if present to cleaner append
                    const cleanPath = imagePath.replace(/^\.\//, '');
                    itemImg.src = 'public/' + cleanPath;
                } else {
                    // If public/ also failed, show placeholder
                    itemImg.src = './empty-cart.png';
                    itemImg.onerror = null;
                }
            };

            // Ensure local wow icon is used
            const wowImg = clone.querySelector('.wow-tag img');
            if (wowImg) {
                wowImg.src = './wow.webp';
                wowImg.onerror = () => {
                    wowImg.style.display = 'none';
                };
            }

            clone.querySelector('.item-title').textContent = item.title;
            clone.querySelector('.old-price').textContent = `₹${(mrpNum * item.quantity).toLocaleString('en-IN')}`;
            clone.querySelector('.curr-price').textContent = `₹${(priceNum * item.quantity).toLocaleString('en-IN')}`;
            clone.querySelector('.wow-buy-text').textContent = `Buy at ₹${(priceNum * 0.95).toLocaleString('en-IN', { maximumFractionDigits: 0 })}`;
            clone.querySelector('.delivery-info').textContent = `Delivery by ${getFormattedDeliveryDate(3)}`;

            const qtySelect = clone.querySelector('.qty-dropdown');
            [1, 2, 3, 4, 5].forEach(q => {
                const opt = document.createElement('option');
                opt.value = q;
                opt.textContent = q;
                if (item.quantity === q) opt.selected = true;
                qtySelect.appendChild(opt);
            });

            itemsContainer.appendChild(clone);
        });

        // Update Price Summary
        document.getElementById('price-items-label').textContent = `Price (${cart.reduce((a, b) => a + b.quantity, 0)} items)`;
        document.getElementById('total-mrp').textContent = `₹${totalMrp.toLocaleString('en-IN')}`;
        document.getElementById('total-discount').textContent = `- ₹${totalDiscount.toLocaleString('en-IN')}`;
        document.getElementById('final-amount').textContent = `₹${finalAmount.toLocaleString('en-IN')}`;

        // Mobile Footer Price
        const footerPriceElem = document.querySelector('.footer-price-val');
        if (footerPriceElem) footerPriceElem.textContent = `₹${finalAmount.toLocaleString('en-IN')}`;
        const footerOldPriceElem = document.querySelector('.footer-old-price');
        if (footerOldPriceElem) footerOldPriceElem.textContent = `₹${totalMrp.toLocaleString('en-IN')}`;

        const savingsAmount = document.getElementById('savings-amount');
        if (savingsAmount) savingsAmount.textContent = `₹${totalDiscount.toLocaleString('en-IN')}`;

        // Add Event Listeners
        addEventListeners();
    }

    function addEventListeners() {
        const itemsContainer = document.getElementById('cart-items-container');

        itemsContainer.querySelectorAll('.qty-dropdown').forEach(select => {
            select.addEventListener('change', () => {
                const id = select.closest('.cart-item').dataset.id;
                updateQuantity(id, parseInt(select.value));
                renderCart();
            });
        });

        itemsContainer.querySelectorAll('.action-btn.remove').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.closest('.cart-item').dataset.id;
                removeFromCart(id);
                renderCart();
            });
        });

        itemsContainer.querySelectorAll('.action-btn.save-later').forEach(btn => {
            btn.addEventListener('click', () => {
                alert('Saved for later!');
            });
        });

        document.querySelector('.place-order-btn')?.addEventListener('click', () => {
            window.location.href = 'checkout.html';
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
                const mobileMenuDrawer = document.querySelector('.mobile-menu-drawer');
                const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
                if (mobileMenuDrawer && mobileMenuDrawer.classList.contains('active')) {
                    mobileMenuDrawer.classList.remove('active');
                    if (mobileMenuOverlay) {
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
});
