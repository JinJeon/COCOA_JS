function quickSort(array, left = 0, right = array.length - 1) {
  if (left >= right) {
    return;
  }
  const mid = Math.floor((left + right) / 2);
  const pivot = array[mid];
  const partition = divide(array, left, right, pivot);
  quickSort(array, left, partition - 1);
  quickSort(array, partition, right);
  function divide(array, left, right, pivot) {
    while (left <= right) {
      while (array[left] < pivot) {
        left++;
      }
      while (array[right] > pivot) {
        right--;
      }
      if (left <= right) {
        let swap = array[left];
        array[left] = array[right];
        array[right] = swap;
        left++;
        right--;
      }
    }
    return left;
  }
  return array;
}

const data = require("../DATA/normalDistribution");
const normalD = data.normalDistribution;
const normalDValue = function (num) {
  let number = num;
  if (isNaN(number) || number > 4.0) {
    return 0;
  }
  if (number === Infinity) {
    return;
  }
  if (number < 0) {
    number = Math.abs(num);
  }
  number = String(number.toFixed(2));
  return normalD[number.substr(0, 3)][number.substr(3, 1)];
};

class subject {
  constructor(name) {
    this.name = name;
    this.score = [];
  }
  getMean() {
    return this.score.reduce((a, b) => a + b) / this.score.length;
  }
  getStandardDeviation() {
    const mean = this.getMean();
    const variance =
      this.score.map((el) => (el - mean) ** 2).reduce((a, b) => a + b) /
      (this.score.length - 1);
    const result = isNaN(Math.round(Math.sqrt(variance)))
      ? "ONE SCORE"
      : Math.round(Math.sqrt(variance));
    return result;
  }
  getPercent(min, max) {
    const mean = this.getMean();
    const SD = this.getStandardDeviation();
    if (SD === 0) {
      return mean >= min && mean <= max ? 100 : 0;
    }
    const minValue = (min - mean) / SD;
    const maxValue = (max - mean) / SD;
    const minNDValue =
      minValue > 0 ? normalDValue(minValue) : 1 - normalDValue(minValue);
    const maxNDValue =
      maxValue > 0 ? normalDValue(maxValue) : 1 - normalDValue(maxValue);
    return (maxNDValue - minNDValue).toFixed(2) * 100;
  }
  console() {
    console.log(`
    ${this.name}'s score : ${quickSort(this.score)}
    ${this.name}'s mean : ${this.getMean()}
    ${this.name}'s StandardDeviation : ${this.getStandardDeviation()}
    SCORE 70-80 PERCENTAGE : ${this.getPercent(70, 80)}
    `);
  }
}

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const math = new subject("math");
const english = new subject("english");

rl.on("line", function (line) {
  const inputValue = line.split(" ");
  inputValue.forEach((e, i) => {
    switch (i) {
      case 0:
        math.score.push(Number(inputValue[i]));
        break;
      case 1:
        english.score.push(Number(inputValue[i]));
        break;
    }
  });
  math.console();
  english.console();
}).on("close", function () {
  process.exit();
});
