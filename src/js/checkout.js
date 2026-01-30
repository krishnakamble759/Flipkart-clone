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

    // Simple transition logic for demo
    loginContinueBtn.addEventListener('click', () => {
        if (!emailInput.value.trim()) {
            emailInput.focus();
            return;
        }

        // Deactivate Step 1, Activate Step 2
        stepLogin.classList.remove('active');
        stepLogin.classList.add('completed');

        // Show truncated view for completed step
        const loginHeader = stepLogin.querySelector('.step-header');
        loginHeader.innerHTML = `
            <span class="step-number"><i class="bi bi-check-lg"></i></span>
            <span class="step-title">LOGIN <span class="completed-val">+91 ${emailInput.value}</span></span>
            <button class="change-btn">CHANGE</button>
        `;

        stepAddress.classList.remove('disabled');
        stepAddress.classList.add('active');

        // Populate Address Content (Mock)
        stepAddress.querySelector('.step-content').innerHTML = `
            <div class="address-form">
                <p class="sub-text">Please enter your delivery address to continue.</p>
                <div class="checkout-form-container">
                    <div class="form-group"><input type="text" id="addr-name" placeholder="Full Name" class="checkout-input"></div>
                    <div class="form-group"><input type="text" id="addr-phone" placeholder="10-digit mobile number" class="checkout-input"></div>
                    <div class="form-group"><input type="text" id="addr-pincode" placeholder="Pincode" class="checkout-input"></div>
                    <div class="form-group"><input type="text" id="addr-details" placeholder="Address (Area and Street)" class="checkout-input"></div>
                    <button class="continue-btn" id="address-continue">DELIVER HERE</button>
                </div>
            </div>
        `;
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

            const addrHeader = stepAddress.querySelector('.step-header');
            addrHeader.innerHTML = `
                <span class="step-number"><i class="bi bi-check-lg"></i></span>
                <span class="step-title">DELIVERY ADDRESS <span class="completed-val">${nameField.value}</span></span>
                <button class="change-btn">CHANGE</button>
            `;

            stepSummary.classList.remove('disabled');
            stepSummary.classList.add('active');

            // Populate Summary Content (Mock)
            stepSummary.querySelector('.step-content').innerHTML = `
                <div class="summary-content">
                    <p class="mb-15">Your order is ready to be placed.</p>
                    <div class="summary-box">
                        <strong>Product:</strong> Sony Headphones - WH-1000XM4<br>
                        <strong>Quantity:</strong> 1<br>
                        <strong>Price:</strong> ₹19,990
                    </div>
                    <button class="continue-btn" id="summary-continue">CONTINUE</button>
                </div>
            `;
        }

        // SUMMARY CONTINUE Click
        if (e.target && e.target.id === 'summary-continue') {
            stepSummary.classList.remove('active');
            stepSummary.classList.add('completed');

            const summaryHeader = stepSummary.querySelector('.step-header');
            summaryHeader.innerHTML = `
                <span class="step-number"><i class="bi bi-check-lg"></i></span>
                <span class="step-title">ORDER SUMMARY</span>
                <button class="change-btn">CHANGE</button>
            `;

            stepPayment.classList.remove('disabled');
            stepPayment.classList.add('active');

            // Populate Payment Content (Mock)
            stepPayment.querySelector('.step-content').innerHTML = `
                <div class="payment-options">
                    <label class="payment-label">
                        <input type="radio" name="pay" checked> UPI (Google Pay, PhonePe, Bhim UPI)
                    </label>
                    <label class="payment-label">
                        <input type="radio" name="pay"> Wallets
                    </label>
                    <label class="payment-label">
                        <input type="radio" name="pay"> Credit / Debit / ATM Card
                    </label>
                    <label class="payment-label">
                        <input type="radio" name="pay" id="cod-radio"> Cash on Delivery
                    </label>
                    <button class="continue-btn mt-10" id="place-order-final">CONFIRM ORDER</button>
                </div>
            `;
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
