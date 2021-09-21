export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Nuxt sample content',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // https://nuxtjs.org/docs/configuration-glossary/configuration-generate
  generate: {
    // subFolders: false,
    async routes() {
      const { $content } = require('@nuxt/content')
      const files = await $content({ deep: true }).only(['path']).fetch()

      return files.map((file) => {
        const path =
          file.path === '/index/index' || file.path === '/index'
            ? '/'
            : file.path
        return path.replace('/index', '')
      })
    },
  },

  // The source directory: https://nuxtjs.org/docs/configuration-glossary/configuration-srcdir
  srcDir: 'src',

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxt/content',
    [
      'nuxt-fontawesome',
      {
        // customize component name
        component: 'fa',
        imports: [
          {
            set: '@fortawesome/free-solid-svg-icons',
            icons: [
              'faHome',
              'faHashtag',
            ],
          },
          { set: '@fortawesome/free-brands-svg-icons', icons: ['faGithub', 'faVuejs'] },
          {
            set: '@fortawesome/free-regular-svg-icons',
            icons: ['faLightbulb'],
          },
        ],
      },
    ],
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  content: {
    // $content api will be served on localhost:3000/content-api
    apiPrefix: 'content-api'
  }
}
