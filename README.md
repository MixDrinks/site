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

Tech stack

-   VueJs
-   NuxtJs

## CI

Github action build the docker image and push it to the github container registry. And publish the image to Hetzner Cloud.
Using docker stack.
