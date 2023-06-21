export default function (ctx) {
  ctx.$axios.defaults.withCredentials = true;
  ctx.$axios.defaults.baseURL = process.env.api;
  ctx.$axios.defaults.headers.post['Content-Type'] = "application/json";

  ctx.$axios.onRequest(() => {
    ctx.$axios.defaults.headers.common['x-user-path'] = ctx.route.path
  })

  ctx.$axios.onResponse((config) => {
    if('redirect' in config.data) {
      ctx.redirect(301, config.data.redirect ? config.data.redirect : '/')
    }
  })
}