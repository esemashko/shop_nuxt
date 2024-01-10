// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: {enabled: true},
    css: ['~/assets/css/main.css'],
    modules: [
        '@nuxt/image',
        '@nuxtjs/apollo',
        '@vite-pwa/nuxt'
    ],
    future: {
        typescriptBundlerResolution: true,
    },
    experimental: {
        payloadExtraction: true,
        watcher: 'parcel',
    },
    nitro: {
        esbuild: {
            options: {
                target: 'esnext',
            },
        },
        prerender: {
            routes: ['/'],
        },
    },
    imports: {
        autoImport: true,
    },
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
        autoImports: true,
        authType: 'Bearer',
        authHeader: 'Authorization',
        tokenStorage: 'cookie',
        proxyCookies: true,
        clients: {
            default: {
                httpEndpoint: 'https://admin.esemashko.com/graphql',
                //httpEndpoint: 'http://localhost/graphql',
                wsEndpoint: '',
                httpLinkOptions: {},
                wsLinkOptions: {},
                websocketsOnly: false,
                connectToDevTools: false,
                defaultOptions: {},
                inMemoryCacheOptions: {},
                tokenStorage: 'cookie',
                authType: 'Bearer',
                authHeader: 'Authorization'
            }
        },
    },
    pwa: {
        registerType: 'autoUpdate',
        manifest: {
            name: 'Nuxt Vite PWA',
            short_name: 'NuxtVitePWA',
            theme_color: '#ffffff',
            icons: [
                {
                    src: 'pwa-192x192.png',
                    sizes: '192x192',
                    type: 'image/png',
                },
                {
                    src: 'pwa-512x512.png',
                    sizes: '512x512',
                    type: 'image/png',
                },
                {
                    src: 'pwa-512x512.png',
                    sizes: '512x512',
                    type: 'image/png',
                    purpose: 'any maskable',
                },
            ],
        },
        workbox: {
            globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
        },
        client: {
            installPrompt: true,
            // you don't need to include this: only for testing purposes
            // if enabling periodic sync for update use 1 hour or so (periodicSyncForUpdates: 3600)
            periodicSyncForUpdates: 20,
        },
        devOptions: {
            enabled: true,
            suppressWarnings: false,
            navigateFallbackAllowlist: [/^\/$/],
            type: 'module',
        },
    }
})
