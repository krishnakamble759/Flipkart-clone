
export const getCart = () => {
    const cart = localStorage.getItem('flipkart_cart');
    return cart ? JSON.parse(cart) : [];
};

export const saveCart = (cart) => {
    localStorage.setItem('flipkart_cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('cartUpdated'));
};

export const addToCart = (product) => {
    const cart = getCart();
    const existingProduct = cart.find(item => item.id === product.id);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    saveCart(cart);
};

export const removeFromCart = (productId) => {
    const cart = getCart().filter(item => item.id !== productId);
    saveCart(cart);
};

export const updateQuantity = (productId, quantity) => {
    const cart = getCart();
    const product = cart.find(item => item.id === productId);
    if (product) {
        product.quantity = Math.max(1, quantity);
        saveCart(cart);
    }
};

export const getCartCount = () => {
    return getCart().reduce((count, item) => count + item.quantity, 0);
};

export const initCartBadge = () => {
    const updateBadge = () => {
        const count = getCartCount();
        const badges = document.querySelectorAll('.cart-badge');
        badges.forEach(badge => {
            badge.textContent = count;
            if (count > 0) {
                badge.classList.remove('hide');
            } else {
                badge.classList.add('hide');
            }
        });
    };

    window.addEventListener('cartUpdated', updateBadge);
    updateBadge();
};
