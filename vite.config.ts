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
        mockPath: './mock',
        supportTs: true
      }),
      AutoImport({
        imports: ['vue', 'vue-router'],
        dts: 'src/types/auto-import.d.ts'
      }),
      Components({
        // 生产环境按需导入
        resolvers: process.env.NODE_ENV === 'production' ? ElementPlusResolver() : undefined,
        extensions: ['vue'],
        include: [/\.vue$/, /\.vue\?vue/],
        dts: 'src/types/component.d.ts'
      }),
      // 开发环境完整引入element-plus
      {
        name: 'dev-auto-import-element-plus',
        transform(code, id) {
          if (process.env.NODE_ENV !== 'production' && /src\/main.ts$/.test(id)) {
            return {
              code: `${code};import ElementPlus from 'element-plus';import 'element-plus/dist/index.css';app.use(ElementPlus);`,
              map: null
            }
          }
        }
      },
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), 'src/assets/svg')]
      })
    ],
    build: {
      // cssCodeSplit: false,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('element-plus/es')) {
              return 'element-plus'
            }
          }
        }
      }
    },
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
