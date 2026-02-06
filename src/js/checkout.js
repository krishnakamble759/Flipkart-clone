import '../scss/style.scss';
import '../scss/checkout.scss';

document.addEventListener('DOMContentLoaded', () => {
    const loginContinueBtn = document.getElementById('login-continue');
    const emailInput = document.getElementById('checkout-email');

    // Step navigation elements
    const stepLogin = document.getElementById('step-login');
    const stepAddress = document.getElementById('step-address');
    const stepSummary = document.getElementById('step-summary');
    const stepPayment = document.getElementById('step-payment');

    const headerTemplate = document.getElementById('header-completed-template');

    const updateHeader = (stepEl, title, value) => {
        const header = stepEl.querySelector('.step-header');
        header.innerHTML = '';
        const clone = headerTemplate.content.cloneNode(true);
        clone.querySelector('.title-text').textContent = title;
        if (value) clone.querySelector('.completed-val').textContent = value;
        header.appendChild(clone);
    };

    const injectContent = (stepEl, templateId) => {
        const content = stepEl.querySelector('.step-content');
        content.innerHTML = '';
        const template = document.getElementById(templateId);
        content.appendChild(template.content.cloneNode(true));
    };

    // Simple transition logic for demo
    loginContinueBtn.addEventListener('click', () => {
        if (!emailInput.value.trim()) {
            emailInput.focus();
            return;
        }

        // Deactivate Step 1, Activate Step 2
        stepLogin.classList.remove('active');
        stepLogin.classList.add('completed');
        updateHeader(stepLogin, 'LOGIN', `+91 ${emailInput.value}`);

        stepAddress.classList.remove('disabled');
        stepAddress.classList.add('active');
        injectContent(stepAddress, 'address-form-template');
    });

    // Event Delegation for dynamic buttons
    document.querySelector('.steps-section').addEventListener('click', (e) => {
        // DELIVER HERE Click
        if (e.target && e.target.id === 'address-continue') {
            const nameField = document.getElementById('addr-name');
            if (nameField && !nameField.value.trim()) {
                nameField.focus();
                return;
            }

            // Deactivate Step 2, Activate Step 3
            stepAddress.classList.remove('active');
            stepAddress.classList.add('completed');
            updateHeader(stepAddress, 'DELIVERY ADDRESS', nameField.value);

            stepSummary.classList.remove('disabled');
            stepSummary.classList.add('active');
            stepSummary.classList.add('active');
            injectContent(stepSummary, 'summary-content-template');

            // Populate dynamic summary
            const summaryBox = stepSummary.querySelector('.summary-box');
            if (summaryBox) {
                const cart = JSON.parse(localStorage.getItem('flipkart_cart') || '[]');
                summaryBox.innerHTML = ''; // Clear previous content

                if (cart.length > 0) {
                    const list = document.createElement('div');
                    list.className = 'summary-list';
                    let total = 0;

                    const itemTemplate = document.getElementById('summary-item-template');

                    cart.forEach(item => {
                        const price = parseInt(item.price.replace(/[^0-9]/g, '')) || 0;
                        total += price * item.quantity;

                        const clone = itemTemplate.content.cloneNode(true);
                        clone.querySelector('.item-title').textContent = item.title;
                        clone.querySelector('.item-qty').textContent = item.quantity;
                        clone.querySelector('.item-price').textContent = item.price;
                        list.appendChild(clone);
                    });

                    summaryBox.appendChild(list);

                    const totalTemplate = document.getElementById('summary-total-template');
                    const totalClone = totalTemplate.content.cloneNode(true);
                    totalClone.querySelector('.total-val').textContent = `₹${total.toLocaleString('en-IN')}`;
                    summaryBox.appendChild(totalClone);

                } else {
                    summaryBox.textContent = 'Your cart is empty.';
                }
            }
        }

        // SUMMARY CONTINUE Click
        if (e.target && e.target.id === 'summary-continue') {
            stepSummary.classList.remove('active');
            stepSummary.classList.add('completed');
            updateHeader(stepSummary, 'ORDER SUMMARY');

            stepPayment.classList.remove('disabled');
            stepPayment.classList.add('active');
            injectContent(stepPayment, 'payment-options-template');
        }

        // FINAL ORDER CONFIRM Click
        if (e.target && e.target.id === 'place-order-final') {
            alert('Congratulations! Your order has been placed successfully.');
            localStorage.removeItem('flipkart_cart');
            window.location.href = 'index.html';
        }

        // Change Buttons Click
        if (e.target && e.target.classList.contains('change-btn')) {
            location.reload();
        }
    });
});
