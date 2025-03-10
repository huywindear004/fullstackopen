const reverse = (string) => {
  return string.split("").reverse().join("");
};

const average = (array) => {
  if (array.length === 0) return 0;
  return array.reduce((accum, currVal) => accum + currVal, 0) / array.length;
};

module.exports = {
  reverse,
  average,
};
