import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    base: '/flipkart-website/',
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                bedCovers: resolve(__dirname, 'bed-covers-list.html'),
                camera: resolve(__dirname, 'camera-list.html'),
                caps: resolve(__dirname, 'caps-list.html'),
                carpet: resolve(__dirname, 'carpet-list.html'),
                cart: resolve(__dirname, 'cart.html'),
                checkout: resolve(__dirname, 'checkout.html'),
                cycle: resolve(__dirname, 'cycle-list.html'),
                emergencyBulb: resolve(__dirname, 'emergency-bulb-list.html'),
                emergencyLight: resolve(__dirname, 'emergency-light-list.html'),
                headphone: resolve(__dirname, 'headphone-list.html'),
                helmet: resolve(__dirname, 'helmet-list.html'),
                hpPrinter: resolve(__dirname, 'hp-printer-list.html'),
                microphone: resolve(__dirname, 'microphone-list.html'),
                monitor: resolve(__dirname, 'monitor-list.html'),
                namkeen: resolve(__dirname, 'namkeen-list.html'),
                printer: resolve(__dirname, 'printer-list.html'),
                productDetail: resolve(__dirname, 'product-detail.html'),
                productList: resolve(__dirname, 'product-list.html'),
                searchResults: resolve(__dirname, 'search-results.html'),
                shaver: resolve(__dirname, 'shaver-list.html'),
                stationary: resolve(__dirname, 'stationary-list.html'),
                tyre: resolve(__dirname, 'tyre-list.html'),
            },
        },
    },
});
