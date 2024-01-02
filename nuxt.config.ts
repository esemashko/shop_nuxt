// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    css: ['~/assets/css/main.css'],
    modules: ['@nuxtjs/apollo', '@nuxt/image',],
    apollo: {
        clients: {
            default: {
                httpEndpoint: 'https://promarine.ru/bitrix/services/rbx.graphql/',
                httpLinkOptions: {
                    headers: {
                        'Origin': 'http://localhost:3000',
                    }
                },
            }
        },
    },
    app: {
        head: {
            title: 'Esemashko',
            meta: [
                { charset: 'utf-8' },
                { name: 'viewport', content: 'width=device-width,initial-scale=1' }
            ]
        }
    },
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },

})
