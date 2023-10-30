import { useState } from "react";
import SearchBar from "../components/ui/SearchBar";

const Bookmarked = () => {
  const [search, setSearch] = useState("");

  return (
    <div>
      {" "}
      <SearchBar
        search={search}
        setSearch={setSearch}
        placeholder="Search bookmarks"
      />
    </div>
  );
};

export default Bookmarked;
