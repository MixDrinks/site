const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportHeight: 1080,
  viewportWidth: 1920,
  e2e: {
    baseUrl: "https://mixdrinks.org/",
    specPattern: 'cypress/e2e/tests/*.{js,jsx,ts,tsx}',
    setupNodeEvents(on, config) {},
  },
});
