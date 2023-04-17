## The frontend of [mixdrinks.org](https://mixdrinks.org). The ukrainian cocktails database.

The site provides a list of cocktails and recipes. 

You can check the backend, ios app and documentation repositories into the [Mix Drinks](https://github.com/MixDrinks) github organization.

For this app you need have [Node.js 14.16.0](https://nodejs.org/dist/v14.16.0/)

Develop command
```shell
npm run dev
```

Build command
```shell
npm run build
```

Run command 
```shell
npm run start
```

To run Cypress tests in the headless mode and get report run
```shell
npm run cy:e2e
```

To run Cypress autotests locally:
```shell
npm run cy:open
```

Command for launching server and then running tests and generating report:
```shell
npm run cypress:e2e
```
Tech stack
- VueJs
- NuxtJs
