## The frontend of [mixdrinks.org](https://mixdrinks.org). The Ukrainian cocktail database.

The site provides a list of cocktails and recipes.

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

GitHub Actions builds the Docker image and pushes it to the GitHub Container Registry. And publish the image to Hetzner Cloud.
Using docker stack.
