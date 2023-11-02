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
