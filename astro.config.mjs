// @ts-check
import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'

export default defineConfig({
  output: 'static',
  integrations: [tailwind()],
  image: {
    domains: ['docs.google.com', 'images.unsplash.com', 'drive.google.com', 'lh3.googleusercontent.com']
  },
  site: 'https://wexplore.id'
})
