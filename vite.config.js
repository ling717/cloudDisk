import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import { resolve } from "path"

//element-plus
import AutoImport from "unplugin-auto-import/vite"
import Components from "unplugin-vue-components/vite"
import { ElementPlusResolver } from "unplugin-vue-components/resolvers"
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()],
      directoryAsNamespace: true
    })
  ],
  resolve: {
    // 配置路径别名
    alias: {
      "@": resolve(__dirname, "./src")
    }
  }
  // server: {
  //   //主要是加上这段代码
  //   port: 3000,
  //   proxy: {
  //     "/api": {
  //       target: "http://localhost:8000", //实际请求地址
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/api/, "")
  //     }
  //   }
  // }
})
