const data = require("../DATA/normalDistribution");
const normalDistribution = data.normalDistribution;
const normalDistributionValue = function (num) {
  let number = num;
  if (isNaN(num) || num > 4.0) {
    return 0;
  }
  if (num < 0) {
    number = Math.abs(num);
  }
  return normalDistribution[number.substr(0, 3)][number.substr(3, 1)];
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
  percentage(min, max) {
    const mean = this.getMean();
    const SB = this.getStandardDeviation();
    const minValue = ((min - mean) / SB).toFixed(2);
    const maxValue = ((max - mean) / SB).toFixed(2);
    return (
      normalDistributionValue(maxValue) - normalDistributionValue(minValue)
    );
  }
  console() {
    console.log(`${this.name}'s mean : ${this.getMean()}`);
    console.log(
      `${this.name}'s StandardDeviation : ${this.getStandardDeviation()}`
    );
    console.log(`SCORE 70-80 PERCENTAGE : ${this.percentage(70, 80)}`);
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
