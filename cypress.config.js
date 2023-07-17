const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "oxq4yv",
  viewportHeight: 1080,
  viewportWidth: 1920,
  reporter: 'cypress-multi-reporters',
  reporterOptions: {
    configFile: 'reporter-config.json',
  },
  video: false,
  e2e: {
    baseUrl: "http://localhost:8080/",
    specPattern: 'cypress/tests/*.{js,jsx,ts,tsx}',
    setupNodeEvents(on, config) {},
  },
});
