import { defineConfig } from 'vite'
import { loadEnv } from 'vite'
import path from 'path'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { viteMockServe } from 'vite-plugin-mock'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vue from '@vitejs/plugin-vue'

export default ({ mode }) => {
  return defineConfig({
    plugins: [
      vue(),
      vueJsx(),
      viteMockServe({
        mockPath: './src/mock',
        supportTs: true
      }),
      AutoImport({
        imports: ['vue', 'vue-router'],
        dts: 'src/types/auto-import.d.ts'
      }),
      Components({
        dts: 'src/types/component.d.ts',
        resolvers: [ElementPlusResolver()]
      }),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), 'src/assets/svg')]
      })
    ],
    resolve: {
      alias: {
        '@': '/src'
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/css/theme.scss";'
        }
      }
    },
    define: {
      'process.env': {
        VITE_BASE_API: loadEnv(mode, process.cwd()).VITE_BASE_API
      }
    },
    server: {
      proxy: {
        '/api': {
          target: loadEnv(mode, process.cwd()).VITE_BASE_API,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      },
      host: '0.0.0.0'
    }
  })
}
