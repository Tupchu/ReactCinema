import { memo } from "react";
import searchIcon from "../../../assets/icon-search.svg";
import "./searchbar.css";

const SearchBar = ({ search, updateSearch, placeholder }) => {
  return (
    <div className="search">
      <img src={searchIcon} alt="Search icon" />
      <input
        type="text"
        name="search"
        id="search"
        placeholder={placeholder}
        value={search}
        onChange={(e) => {
          updateSearch(e.target.value);
        }}
        className="search-bar"
      />
      <div
        className={search ? "close-icon" : "hidden"}
        onClick={() => updateSearch("")}
      ></div>
    </div>
  );
};

export default memo(SearchBar);
