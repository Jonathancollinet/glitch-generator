export default defineNuxtConfig({
    sourcemap: true,
    devtools: { enabled: true },
    srcDir: 'src/',
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
    css: [
        'vue-final-modal/style.css',
        'floating-vue/dist/style.css',
        'vue3-tour/dist/vue3-tour.css'
    ],
    i18n: {
        vueI18n: '~/i18n/i18n.config.ts',
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
            "Signika Negative": true,
            "Space Grotesk": true
        }
    }
})
