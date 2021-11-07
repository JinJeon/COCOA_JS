// 문제 1번
const solution1 = (notation, number, people) => {
  const arr = [...Array(number * people)].map((val, index) =>
    index.toString(notation)
  );
  return arr
    .reduce((pre, post) => {
      return pre + post;
    })
    .split("");
};
console.log(solution1(2, 2, 3));

// 문제 2번, 3번
const solution = (notation, number, people, order) => {
  const notationArr = [...Array(number * people)].map((val, index) =>
    index.toString(notation)
  );
  console.log("notaiton : ", notationArr);
  const splitArr = notationArr
    .reduce((pre, post) => {
      return pre + post;
    })
    .split("");
  console.log("split : ", splitArr);
  const someoneArr = splitArr.filter(
    (value, index) => (index - order + 1) % people === 0
  );
  // someone's index = order + people*n -1 => (index-order+1)%people === 0
  return someoneArr;
};
console.log("result : ", solution(3, 4, 3, 3));
/*
notaiton :  [
  '0',    '1',    '10',
  '11',   '100',  '101',
  '110',  '111',  '1000',
  '1001', '1010', '1011'
]
split :  [
  '0', '1', '1', '0', '1', '1', '1',
  '0', '0', '1', '0', '1', '1', '1',
  '0', '1', '1', '1', '1', '0', '0',
  '0', '1', '0', '0', '1', '1', '0',
  '1', '0', '1', '0', '1', '1'
]
result :  [
  '1', '1', '0', '1',
  '0', '1', '0', '0',
  '1', '0', '1'
]
*/
