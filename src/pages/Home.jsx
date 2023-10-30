import { useState } from "react";
import SearchBar from "../components/ui/SearchBar";

const Home = () => {
  const [search, setSearch] = useState("");

  return (
    <div>
      <SearchBar
        search={search}
        setSearch={setSearch}
        placeholder="Search for movies or TV series"
      />
    </div>
  );
};

export default Home;
