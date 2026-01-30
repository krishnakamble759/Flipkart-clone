/**
 * Utility to manage dynamic delivery dates
 */

export function getFormattedDeliveryDate(daysFromNow = 3) {
    const today = new Date();
    // Use a fixed timestamp for calculation to avoid issues with timezones/rollover
    const deliveryTime = today.getTime() + (daysFromNow * 24 * 60 * 60 * 1000);
    const deliveryDate = new Date(deliveryTime);

    const day = deliveryDate.getDate();
    const month = deliveryDate.toLocaleString('en-IN', { month: 'short' });
    const weekday = deliveryDate.toLocaleString('en-IN', { weekday: 'long' });

    return `${day} ${month}, ${weekday}`;
}

export function updateAllDeliveryDates() {
    const deliveryElements = document.querySelectorAll('.sub-info, .delivery-info');
    const newDate = getFormattedDeliveryDate(3);

    deliveryElements.forEach(el => {
        const text = el.textContent.toLowerCase();
        if (text.includes('delivery by')) {
            // Preserve icons if they exist (like the question mark in product detail)
            const icon = el.querySelector('i');

            // Check if it's already updated with the same text to avoid unnecessary DOM churn
            const targetText = `Delivery by ${newDate} `;
            if (el.innerText.includes(newDate)) return;

            el.innerHTML = targetText;
            if (icon) {
                el.appendChild(icon);
            }
        }
    });
}
