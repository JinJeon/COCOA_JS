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
      ? "점수 1개"
      : Math.round(Math.sqrt(variance));
    return result;
  }
  percentage(min, max) {
    const mean = this.getMean();
    const SB = this.getStandardDeviation();
    const minValue = (min - mean) / SB;
    const maxValue = (max - mean) / SB;
    return [minValue.toFixed(2), maxValue.toFixed(2)];
  }
  console() {
    console.log(`${this.name}'s mean : ${this.getMean()}`);
    console.log(
      `${this.name}'s StandardDeviation : ${this.getStandardDeviation()}`
    );
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
