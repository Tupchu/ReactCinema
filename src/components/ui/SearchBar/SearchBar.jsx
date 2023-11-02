import searchIcon from "../../../assets/icon-search.svg";
import "./searchbar.css";

const SearchBar = ({ search, setSearch, placeholder }) => {
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
          setSearch(e.target.value);
        }}
        className="search-bar"
        // autoFocus
      />
      <div
        className={search ? "close-icon" : "hidden"}
        onClick={() => setSearch("")}
      ></div>
    </div>
  );
};

export default SearchBar;
