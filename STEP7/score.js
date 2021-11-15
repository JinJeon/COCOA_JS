const scoreArr = [
  89.23, 82.03, 71.56, 78.82, 85.05, 84.44, 67.53, 71.7, 77.97, 73.77, 84.25,
  67.01, 73.78, 64.19, 89.89, 90.32, 73.21, 75.35, 83.22, 74.01,
];
const getMean = function (arr) {
  return arr.reduce((a, b) => a + b) / arr.length;
};

const getStandardDeviation = function (arr) {
  const mean = arr.reduce((a, b) => a + b) / arr.length;
  const variance =
    arr.map((el) => (el - mean) ** 2).reduce((a, b) => a + b) / arr.length - 1;
  const result = Math.round(Math.sqrt(variance));
  return result;
};

const percentage = function (arr, min, max) {
  const mean = arr.reduce((a, b) => a + b) / arr.length;
  const variance =
    arr.map((el) => (el - mean) ** 2).reduce((a, b) => a + b) / arr.length - 1;
  const SB = Math.round(Math.sqrt(variance));
  const minValue = (min - mean) / SB;
  const maxValue = (max - mean) / SB;
  return [minValue.toFixed(2), maxValue.toFixed(2)];
};
console.log(percentage(scoreArr, 70, 80));

// class solution {
//   constructor(arr) {
//     this.array = arr;
//   }
//   getMean() {
//     return this.array.reduce((a, b) => a + b) / this.array.length;
//   }
// }
