import $axios from "axios";

$axios.defaults.withCredentials = true;

export const api = $axios.create({
  baseURL: process.env.api,
  headers: {
    "Content-Type": "application/hal+json",
    Accept: "application/json",
  },
});

export const getСocktails = () => {
  return api.get(`/cocktails/filter`);
};
