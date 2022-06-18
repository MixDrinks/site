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
  return api.get(`/cocktails/filter${queryParams}`, {
    headers: {
      "Cache-Control": "no-cache",
      Pragma: "no-cache",
      Expires: "0",
    },
  });
};
export const getCocktail = (id) => {
  return api.get(`/cocktails/full?id=${id}`, {
    headers: {
      "Cache-Control": "no-cache",
      Pragma: "no-cache",
      Expires: "0",
    },
  });
};
export const getCocktailsShort = () => {
  return api.get(`/cocktails/all`);
};
export const getAllFilters = () => {
  return api.get(`/meta/all`);
};
export const getTags = () => {
  return api.get(`/tags/all`);
};
export const cocktailsVisit = (id) => {
  return api.post(`cocktails/visit?id=${id}`);
};
export const updateRating = (id, value) => {
  return api.post(`cocktails/score?id=${id}`, { value: value });
};
export const getItems = (id) => {
  return api.get(`items/full${id}`);
};
