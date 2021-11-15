const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", function (line) {
  const inputValue = line.split(" ");
  console.log(inputValue);
}).on("close", function () {
  process.exit();
});
