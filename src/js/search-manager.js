
const searchMap = {
    'camera': '/camera-list.html',
    'dslr': '/camera-list.html',
    'mirrorless': '/camera-list.html',
    'canon': '/camera-list.html',
    'sony': '/camera-list.html',
    'powerbank': '/product-list.html',
    'power bank': '/product-list.html',
    'powerbaks': '/product-list.html',
    'mi powerbank': '/product-list.html',
    '10000mah': '/product-list.html',
    'charger': '/product-list.html',
    'cap': '/caps-list.html',
    'hat': '/caps-list.html',
    'bed cover': '/bed-covers-list.html',
    'bedcover': '/bed-covers-list.html',
    'carpet': '/carpet-list.html',
    'rug': '/carpet-list.html',
    'cycle': '/cycle-list.html',
    'bicycle': '/cycle-list.html',
    'bulb': '/emergency-bulb-list.html',
    'emergency bulb': '/emergency-bulb-list.html',
    'light': '/emergency-light-list.html',
    'emergency light': '/emergency-light-list.html',
    'headphone': '/headphone-list.html',
    'earphone': '/headphone-list.html',
    'helmet': '/helmet-list.html',
    'hp printer': '/hp-printer-list.html',
    'printer': '/printer-list.html',
    'epson': '/printer-list.html',
    'microphone': '/microphone-list.html',
    'mic': '/microphone-list.html',
    'monitor': '/monitor-list.html',
    'namkeen': '/namkeen-list.html',
    'snacks': '/namkeen-list.html',
    'shaver': '/shaver-list.html',
    'trimmer': '/shaver-list.html',
    'stationary': '/stationary-list.html',
    'stationery': '/stationary-list.html',
    'tyre': '/tyre-list.html',
    'tire': '/tyre-list.html'
};

export const initSearch = () => {
    const handleSearch = (query) => {
        if (!query) return;

        const normalizedQuery = query.toLowerCase().trim();
        let targetUrl = '';

        // Exact match check
        if (searchMap[normalizedQuery]) {
            targetUrl = searchMap[normalizedQuery];
        } else {
            // Partial match check
            const foundKey = Object.keys(searchMap).find(key =>
                normalizedQuery.includes(key) || key.includes(normalizedQuery)
            );
            if (foundKey) {
                targetUrl = searchMap[foundKey];
            }
        }

        if (targetUrl) {
            const separator = targetUrl.includes('?') ? '&' : '?';
            window.location.href = `${targetUrl}${separator}q=${encodeURIComponent(query)}`;
        } else {
            window.location.href = `/search-results.html?q=${encodeURIComponent(query)}`;
        }
    };

    // Desktop Search Form
    const desktopSearchForm = document.querySelector('.search-form');
    if (desktopSearchForm) {
        desktopSearchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = desktopSearchForm.querySelector('input');
            handleSearch(input.value);
        });
    }

    // Tablet and Mobile Search Inputs
    const searchInputs = document.querySelectorAll('.search-box-tablet input, .search-box-mobile input');
    searchInputs.forEach(input => {
        // Handle Enter key
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleSearch(input.value);
            }
        });

        // Optional: Handle click on search icon if it's next to the input
        const parent = input.parentElement;
        const icon = parent.querySelector('.bi-search');
        if (icon) {
            icon.classList.add('pointer');
            icon.addEventListener('click', () => {
                handleSearch(input.value);
            });
        }
    });
};
