// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    sourcemap: true,
    devtools: { enabled: true },
    typescript: {
        typeCheck: true,
        tsConfig: {
            include: ["~/types/*.d.ts"]
        }
    },
    modules: [
        '@nuxtjs/tailwindcss',
        '@nuxtjs/i18n',
        '@nuxt/test-utils/module',
        '@nuxtjs/color-mode',
        '@nuxtjs/google-fonts'
    ],
    build: {
        analyze: true,
        transpile: [
            'vue-debounce'
        ]
    },
    i18n: {
        vueI18n: './i18n/i18n.config.ts',
        detectBrowserLanguage: {
            useCookie: true,
            cookieKey: 'i18n_redirected',
            redirectOn: 'root',  // recommended
        }
    },
    tailwindcss: {
        cssPath: '~/assets/css/main.css',
    },
    colorMode: {
        classSuffix: ''
    },
    googleFonts: {
        families: {
            Gabarito: true,
            "Signika Negative": true
        }
    }
})
