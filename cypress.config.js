const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportHeight: 1080,
  viewportWidth: 1920,
  reporter: 'cypress-multi-reporters',
  reporterOptions: {
    configFile: 'reporter-config.json',
  },
  video: false,
  e2e: {
    baseUrl: "https://mixdrinks.org/",
    // baseUrl: "http://localhost:8080",
    specPattern: 'cypress/e2e/tests/*.{js,jsx,ts,tsx}',
    setupNodeEvents(on, config) {},
  },
});
