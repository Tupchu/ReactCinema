import { useState } from "react";
import SearchBar from "../components/ui/SearchBar";

const Television = () => {
  const [search, setSearch] = useState("");

  return (
    <div>
      <SearchBar
        search={search}
        setSearch={setSearch}
        placeholder="Search for TV series"
      />
    </div>
  );
};

export default Television;
