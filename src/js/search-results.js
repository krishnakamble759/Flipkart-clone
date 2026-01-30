import { initSearch } from './search-manager';

console.log('Search Results Page Initialized');

document.addEventListener('DOMContentLoaded', () => {
    initSearch();

    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('q');
    if (query) {
        const queryDisplay = document.getElementById('query-display');
        const searchInput = document.getElementById('header-search-input');
        if (queryDisplay) queryDisplay.textContent = query;
        if (searchInput) searchInput.value = query;
    } else {
        const queryInfo = document.getElementById('query-info');
        if (queryInfo) queryInfo.style.display = 'none';
    }
});
