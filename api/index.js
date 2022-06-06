import $axios from "axios";

$axios.defaults.withCredentials = true;

export const api = $axios.create({
  baseURL: process.env.api,
  headers: {
    "Access-Control-Allow-Credentials": true,
    "Content-Type": "application/hal+json",
    Accept: "application/json",
  },
  credentials: true,
});

export const getСocktails = () => {
  return api.get(`/cocktails/filter`);
};
