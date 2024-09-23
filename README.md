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
- VueJs
- NuxtJs

For update sitemap.xml from backend api
```bash
curl https://api.mixdrinks.org/sitemap.xml --output static/sitemap.xml -H 'Content-Type: application/xml' -H 'Accept: application/xml'
```

## CI
Add docker image publish
