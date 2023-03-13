import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
    plugins: [vue()],

    resolve: {
        alias: [
            {
                find: '@',
                replacement: resolve(__dirname, './src'),
            }
        ]
    },
    
    server: {
        port: 8080
    }    
})
