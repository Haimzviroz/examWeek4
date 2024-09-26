export const getNextStatus = (status: string): string => {
  switch (status) {
    case "manufactured":
      return "assembled";
    case "assembled":
      return "shipped";
    case "shipped":
      return "deployed";
    case "deployed":
      return "detonated";
    default:
      return status;
  }
};
