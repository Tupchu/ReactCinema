import { useState } from "react";
import SearchBar from "../components/ui/SearchBar/SearchBar";

const Home = () => {
  const [search, setSearch] = useState("");

  const updateSearch = (search) => {
    setSearch(search);
  };

  return (
    <div>
      <SearchBar
        search={search}
        updateSearch={updateSearch}
        placeholder="Search for movies or TV series"
      />
      {/* Trending */}
      {/* https://developer.themoviedb.org/reference/trending-all */}

      {/* Recommendations -> Only show if user has bookmarked content */}
      {/* https://developer.themoviedb.org/reference/movie-recommendations */}
    </div>
  );
};

export default Home;
