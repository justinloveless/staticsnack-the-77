import { defineConfig } from 'vite';

export default defineConfig({
    root: 'src',
    base: '/StaticSnack-template-band/',
    build: {
        outDir: '..',
        emptyOutDir: false,
        rollupOptions: {
            output: {
                entryFileNames: 'script.js',
                chunkFileNames: '[name].js',
                assetFileNames: '[name].[ext]'
            }
        }
    },
    publicDir: '../public'
});

