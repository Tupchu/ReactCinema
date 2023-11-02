import { useState } from "react";
import SearchBar from "../components/ui/SearchBar/SearchBar";

const Bookmarked = () => {
  const [search, setSearch] = useState("");

  const updateSearch = (search) => {
    setSearch(search);
  };

  return (
    <div>
      <SearchBar
        search={search}
        updateSearch={updateSearch}
        placeholder="Search bookmarks"
      />
    </div>
  );
};

export default Bookmarked;
