import { useState } from "react";
import SearchBar from "../components/ui/SearchBar";

const Movies = () => {
  const [search, setSearch] = useState("");

  return (
    <div>
      <SearchBar
        search={search}
        setSearch={setSearch}
        placeholder="Search for movies"
      />
    </div>
  );
};

export default Movies;
