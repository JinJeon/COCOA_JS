/*
순서
  1. 전체 : 배열안에 객체가 있는 형태이므로 객체인 경우에만 "type":"tk" 여부를 확인
  2. 배열의 요소의 타입이 "object"인지 확인
  3. "type" key의 value가 "sk"인지 확인 => 맞을 시 name을 결과에 넣음
  4. "childnode" key의 value array가 비어있는 지 확인
  5. 아닐 경우, key의 value에 2번 과정부터 반복
*/

const JSON = require("./arrResult.json");
const A = [];
console.log(A.length === 0);

const filterSK = (array) => {
  const resultArr = [];
  const filterType = (arr) => {
    arr.forEach((element) => {
      if (typeof element === "object") {
        // if 하나로 줄이기 필요
        if (element.type === "sk") {
          resultArr.push(element.name);
        }
        if (element.childnode.length !== 0) {
          filterType(element.childnode);
        }
      }
    });
  };
  filterType(array);
  return resultArr;
};
console.log(filterSK(JSON));
//[ 'Yong', 'hary', 'solvin', 'hani', 'chulsu' ]
