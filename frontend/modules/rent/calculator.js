export const calculateRent = ({
  baseRent,
  electricity,
  water,
  misc,
}) => {
  return baseRent + electricity + water + misc;
};
