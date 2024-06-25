import {resolve} from 'path';

const packageJSON = require('./package.json');

const env = {
  serverOrigin: process.env.SERVER_ORIGIN ?? 'SERVER_ORIGIN',
};

export default defineNuxtConfig({
  ssr: false,

  app: {
    head: {
      title: 'DUET: Приложение для пар'
    }
  },

  runtimeConfig: {
    public: {
      versionApp: packageJSON.version,
      ...env
    }
  },

  css: [
    '~/assets/styles/main.scss',
    '~/assets/styles/themesBuilder.scss',
    '~/assets/styles/fonts.scss',
  ],

  alias: {
    '@colors': resolve(__dirname, './assets/styles/colors.scss')
  },

  devtools: { enabled: true }
});
