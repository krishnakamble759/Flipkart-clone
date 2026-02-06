import { defineConfig } from 'vite';


export default defineConfig({
    base: '/Flipkart-clone/',
    build: {
        rollupOptions: {
            input: {
                main: 'index.html',
                bedCovers: 'bed-covers-list.html',
                camera: 'camera-list.html',
                caps: 'caps-list.html',
                carpet: 'carpet-list.html',
                cart: 'cart.html',
                checkout: 'checkout.html',
                cycle: 'cycle-list.html',
                emergencyBulb: 'emergency-bulb-list.html',
                emergencyLight: 'emergency-light-list.html',
                headphone: 'headphone-list.html',
                helmet: 'helmet-list.html',
                hpPrinter: 'hp-printer-list.html',
                microphone: 'microphone-list.html',
                monitor: 'monitor-list.html',
                namkeen: 'namkeen-list.html',
                printer: 'printer-list.html',
                productDetail: 'product-detail.html',
                productList: 'product-list.html',
                searchResults: 'search-results.html',
                shaver: 'shaver-list.html',
                stationary: 'stationary-list.html',
                tyre: 'tyre-list.html',
            },
        },
    },
});
