import { useState } from "react";
import SearchBar from "../components/ui/SearchBar/SearchBar";

const Television = () => {
  const [search, setSearch] = useState("");

  const updateSearch = (search) => {
    setSearch(search);
  };

  return (
    <div>
      <SearchBar
        search={search}
        updateSearch={updateSearch}
        placeholder="Search for TV series"
      />
    </div>
  );
};

export default Television;
