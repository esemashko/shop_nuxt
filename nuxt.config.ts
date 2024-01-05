// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: {enabled: true},
    css: ['~/assets/css/main.css'],
    modules: ['@nuxt/image', '@nuxtjs/apollo', '@vite-pwa/nuxt'],
    app: {
        head: {
            title: 'Esemashko',
            meta: [
                {charset: 'utf-8'},
                {name: 'viewport', content: 'width=device-width,initial-scale=1'}
            ]
        }
    },
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    apollo: {
        clients: {
            default: {
                httpEndpoint: 'https://admin.esemashko.com/graphql'
                //httpEndpoint: 'http://localhost/graphql'
            }
        },
    },
    pwa: {
        workbox: {
            globPatterns: ['**/*.{js,css,html,png,jpg,jpeg,svg}'],
            runtimeCaching: [
                {
                    urlPattern: '/*',
                    handler: 'NetworkFirst',
                    method: 'GET',
                    options: {
                        cacheName: 'shop-cache-v1',
                        expiration: {
                            maxEntries: 500,
                            maxAgeSeconds: 86400,
                        },
                        cacheableResponse: {
                            statuses: [0, 200],
                        },
                    },
                },
            ],
        },
    }
})
