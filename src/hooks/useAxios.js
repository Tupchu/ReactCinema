import axios from "axios";

const setOptions = (url, query, page) => {
  return {
    method: "GET",
    url,
    params: {
      include_adult: "false",
      language: "en-US",
      page,
      query,
    },
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
    },
  };
};

const useAxios = (url, query, page) => {
  return axios
    .request(setOptions(url, query, page))
    .then((response) => response.data);
};

export default useAxios;
