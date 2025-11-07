import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  // When deploying to GitHub Pages for a project site, set the `base` to
  // the repository name so built asset URLs point to
  // https://<user>.github.io/<repo>/...
  // Replace 'FrontEnd-VueJs-Simple-CV' with your repository name if different.
  base: '/FrontEnd-VueJs-Simple-CV/',
  plugins: [vue()],
  server: {
    port: 5173,
  },
})
