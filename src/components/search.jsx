import { useEffect, useRef } from "react";
import { useKey } from "../hooks/useKey";

const Search = ({ query, setQuery, onCloseSelected }) => {
  const inputEl = useRef(null);

  useEffect(() => {
    const inputElm = document.querySelector(".search");
    inputElm.focus();
  }, []);

  useKey("Enter", () => {
    if (document.activeElement === inputEl.current) return;
    inputEl.current.focus();
    setQuery("");
    onCloseSelected();
  });

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={e => setQuery(e.target.value)}
      ref={inputEl}
    />
  );
};

export default Search;
