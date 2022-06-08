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

export const getCocktails = (queryParams) => {
  return api.get(`/cocktails/filter${queryParams}`);
};
export const getCocktailsShort = () => {
  return api.get(`/cocktails/all`);
};
export const getTags = () => {
  return api.get(`/tags/all`);
};
