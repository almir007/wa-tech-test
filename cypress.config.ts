import { defineConfig } from "cypress";

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://wwin.com/en',
    pageLoadTimeout: 20000,
    defaultCommandTimeout: 15000,
    viewportWidth: 1920,
    viewportHeight: 1080,
  },
});
