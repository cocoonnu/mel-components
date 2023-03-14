import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import { resolve } from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'


export default defineConfig({
    plugins: [
        vue(),

        AutoImport({
            resolvers: [ElementPlusResolver()],
        }),
        
        Components({
            resolvers: [ElementPlusResolver()],
        }),        
    ],

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
