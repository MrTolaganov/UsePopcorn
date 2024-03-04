import { useEffect, useState } from "react";

export const useLsState = (key, initialState) => {
  const [value, setValue] = useState(() => {
    const watchedMovie = localStorage.getItem(key);
    return watchedMovie ? JSON.parse(watchedMovie) : initialState;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};
