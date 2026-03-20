import { reactRouter } from '@react-router/dev/vite'
import babel from '@rolldown/plugin-babel'
import tailwindcss from '@tailwindcss/vite'
import { reactCompilerPreset } from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
    plugins: [babel({ presets: [reactCompilerPreset()] }), reactRouter(), tailwindcss()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    optimizeDeps: {
        entries: ['./src/**/*.tsx', './src/**/*.ts'],
    },
})
