export const calculatePagecount = (prev, operator) => {
  switch (operator) {
    case "+":
      return prev + 1;
    case "-":
      return prev - 1;
    default:
      throw new Error("Invalid operator");
  }
};

export const contentTypes = Object.freeze({
  movie: "movie",
  television: "tv",
  all: "all",
});

export const filterContent = (results) => {
  return results
    ?.filter((item) => {
      return (
        item.backdrop_path !== null &&
        (item.release_date !== null || item.first_air_date)
      );
    })
    .slice(0, 8);
};
