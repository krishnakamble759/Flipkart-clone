import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const publicDirs = [
    'Electronics',
    'Lights',
    'Monsoon',
    'Toys',
    'Helmets',
    'HP',
    'Microphone',
    'Monitors',
    'Namkeen'
];

publicDirs.forEach(dir => {
    try {
        const fullPath = `public/${dir}`;
        const tempPath = `public/${dir.toLowerCase()}_tmp`;
        const finalPath = `public/${dir.toLowerCase()}`;

        console.log(`Processing ${dir}...`);

        // Use try-catch for each step because some might already be lowercase in git
        try {
            execSync(`git mv ${fullPath} ${tempPath}`, { stdio: 'inherit' });
            execSync(`git mv ${tempPath} ${finalPath}`, { stdio: 'inherit' });
            console.log(`Success: Renamed ${dir} to ${dir.toLowerCase()} in Git index`);
        } catch (e) {
            console.log(`Skip: ${dir} might already be handled or doesn't exist in Git as capitalized.`);
        }
    } catch (err) {
        console.error(`Error processing ${dir}:`, err.message);
    }
});
