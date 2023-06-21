export default function (ctx) {
  ctx.$axios.defaults.withCredentials = true;
  ctx.$axios.defaults.baseURL = process.env.api;
  ctx.$axios.defaults.headers.post['Content-Type'] = "application/json";

  ctx.$axios.onRequest((config) => {
    ctx.$axios.defaults.headers.common['x-user-path'] = ctx.route.path
  })
}