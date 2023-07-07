// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  runtimeConfig: {
    jwtSecret: '',
    pageSize: 0,
  },
  typescript: {
    typeCheck: true,
  },
})
