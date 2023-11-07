import { contentTypes } from "../helpers/helpers";

export const useLocalStorage = (key, item) => {
  let error = "";

  // check if we need to get content from movie or TV array
  if (key === contentTypes.all) {
    item.media_type === contentTypes.television
      ? (key = contentTypes.television)
      : (key = contentTypes.movie);
  }

  const setItem = () => {
    const items = getItems();
    items.push(item);
    try {
      window.localStorage.setItem(key, [JSON.stringify(items)]);
    } catch (err) {
      error = err;
      return error;
    }
  };

  const getItems = () => {
    try {
      const item = window.localStorage.getItem(key);
      return JSON.parse(item) || [];
    } catch (err) {
      error = err;
      return error;
    }
  };

  const hasItem = () => {
    try {
      const content = getItems();
      return content.some((content) => content.id === item.id);
    } catch (err) {
      error = err;
      return error;
    }
  };

  const removeItem = () => {
    try {
      const content = getItems();
      window.localStorage.setItem(key, [
        JSON.stringify(content.filter((content) => content.id !== item.id)),
      ]);
    } catch (err) {
      error = err;
      return error;
    }
  };

  return { setItem, removeItem, hasItem, getItems, error };
};
