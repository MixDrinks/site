import $axios from "axios";

$axios.defaults.withCredentials = true;

export const api = $axios.create({
  baseURL: process.env.api,
  headers: {
    "Access-Control-Allow-Credentials": true,
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  credentials: true,
});
export const getCocktails = (queryParams) => {
  return api.get(`/v2/filter${queryParams}`);
};
export const getCocktail = (slug) => {
  return api.get(`/v2/cocktail/${slug}`);
};
export const getCocktailsShort = () => {
  return api.get(`/cocktails/all`);
};
export const getAllFilters = () => {
  return api.get(`/v2/filters`);
};
export const cocktailsVisit = (id) => {
  return api.post(`/v2/cocktails/visit?id=${id}`);
};
export const updateRating = (id, value) => {
  return api.post(`/v2/cocktails/score?id=${id}`, { value: value });
};
export const getItems = (slug) => {
  return api.get(`/v3/${slug}`);
};
