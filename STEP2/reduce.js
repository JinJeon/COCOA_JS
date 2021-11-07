const array1 = [1, 2, 3, 4];

const myReduce = (arr, callback, initialValue) => {
  let resultValue = initialValue ? initialValue : 0;
  for (i = 0; i < arr.length; i++) {
    resultValue = callback(resultValue, arr[i]);
  }
  return resultValue;
};
console.log(myReduce(array1, reducer, 5));
// 1 + 2 + 3 + 4

const reducer = (previousValue, currentValue) => previousValue + currentValue;
console.log(array1.reduce(reducer, 5));
// 1 + 2 + 3 + 4
// expected output: 10
