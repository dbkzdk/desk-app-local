export default defineNuxtConfig({
  compatibilityDate: '2026-01-01',
  devtools: { enabled: true },
  css: ['~/assets/app.css'],
  runtimeConfig: { sessionSecret: process.env.NUXT_SESSION_SECRET || 'change-me-in-production' }
})