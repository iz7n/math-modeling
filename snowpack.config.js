/** @type {import('snowpack').SnowpackUserConfig} */
module.exports = {
  plugins: [
    '@snowpack/plugin-svelte',
    '@snowpack/plugin-postcss',
    ['snowpack-plugin-glslify', { compress: false }]
  ],
  packageOptions: {
    knownEntrypoints: ['@roxi/routify/runtime/buildRoutes']
  },
  alias: {
    $components: './src/components/',
    $shared: './src/shared/'
  },
  mount: {
    src: '/dist',
    public: '/'
  },
  routes: [{ match: 'routes', src: '.*', dest: '/index.html' }],
  buildOptions: {
    clean: true
  },
  optimize: {
    bundle: true,
    minify: true,
    target: 'es2017'
  }
};
