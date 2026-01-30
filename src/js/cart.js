
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

        cart.forEach(item => {
            const priceNum = parseInt(item.price.replace(/[^0-9]/g, '')) || 0;
            // Fake MRP calculation (roughly 20% higher)
            const mrpNum = Math.round(priceNum * 1.25 / 100) * 100;
            const discount = mrpNum - priceNum;

            totalMrp += mrpNum * item.quantity;
            totalDiscount += discount * item.quantity;
            finalAmount += priceNum * item.quantity;

            const itemHtml = `
                <div class="cart-item" data-id="${item.id}">
                    <div class="item-main">
                        <div class="item-img-col">
                            <img src="${item.image}" alt="${item.title}">
                            <div class="qty-selector">
                                <span class="qty-label">Qty:</span>
                                <select class="qty-dropdown">
                                    ${[1, 2, 3, 4, 5].map(q => `<option value="${q}" ${item.quantity === q ? 'selected' : ''}>${q}</option>`).join('')}
                                </select>
                            </div>
                        </div>
                        <div class="item-details-col">
                            <div class="item-title">${item.title}</div>
                            <div class="item-subtitle">Grey</div>
                            <div class="seller-info">Seller:Brandstackindia</div>
                            <div class="price-row">
                                <span class="discount-tag">↓5%</span>
                                <span class="old-price">₹${(mrpNum * item.quantity).toLocaleString('en-IN')}</span>
                                <span class="curr-price">₹${(priceNum * item.quantity).toLocaleString('en-IN')}</span>
                            </div>
                            <div class="wow-tag">
                                <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/wow_110903.png" alt="Wow">
                                <span>Buy at ₹${(priceNum * 0.95).toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                            </div>
                            <div class="stock-info">Only few left</div>
                            <div class="delivery-info">
                                Delivery by ${getFormattedDeliveryDate(3)}
                            </div>
                        </div>
                    </div>
                    <div class="item-actions">
                        <div class="action-btn-wrapper">
                            <button class="action-btn save-later">
                                <i class="bi bi-journal-bookmark"></i> Save for later
                            </button>
                        </div>
                        <div class="action-btn-wrapper">
                            <button class="action-btn remove">
                                <i class="bi bi-trash"></i> Remove
                            </button>
                        </div>
                        <div class="action-btn-wrapper">
                            <button class="action-btn buy-now">
                                <i class="bi bi-lightning-fill"></i> Buy this now
                            </button>
                        </div>
                    </div>
                </div>
            `;
            itemsContainer.insertAdjacentHTML('beforeend', itemHtml);
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

        document.getElementById('savings-msg').innerHTML = `<i class="bi bi-percent"></i> You'll save ₹${totalDiscount.toLocaleString('en-IN')} on this order!`;

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
