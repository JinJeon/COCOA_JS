// 1. factorial 함수
const factorial = (number) => {
  let result = 1;
  for (i = 1; i <= number; i++) {
    result = result * i;
  }
  return result;
};
// const calculator = (number) => {
//   let arr = [];
//   let resultArr = [];
//   for (i = 1; i <= number; i++) {
//     arr.push(i);
//   }
//   arr.forEach((element) => {
//     resultArr.push(factorial(element));
//   });
//   return resultArr;
// };
const calculator = (number) => {
  let arr = [];
  for (i = 1; i <= number; i++) {
    arr.push(i);
  }
  const resultArr = arr.map((element) => factorial(element));
  return resultArr;
};
console.log(calculator(8));
