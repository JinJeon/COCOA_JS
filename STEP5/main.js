const data1 = "[1,2,[3,4,[5,[6]]]]";
const data2 = "[1,2,][3,4,[5,[6]]]"; // 이 사례 해결 필요
const data3 = "[1,2,[3,4,[5,[6]]]";

const run = function (data) {
  const dataSplit = data.split("").filter((e) => e !== ",");
  const regex = /[0-9]/g;
  const filterArrLeft = dataSplit.filter((e) => e === "[");
  const filterArrRight = dataSplit.filter((e) => e === "]");
  const filterNumber = function (array) {
    const resultArr = [];
    array.forEach((e) => {
      if (!isNaN(parseFloat(e))) resultArr.push(e);
    });
    return resultArr;
  };
  const filterNumberArr = filterNumber(dataSplit);

  // "]"가 "[" 보다 앞선 경우 찾기
  const isReverse = function (array) {
    let testArr = [];
    array.forEach((e, i) => {
      if (e === "[") testArr.push(i);
    });
    return testArr.some((val) => val > array.indexOf("]"));
  };
  // 배열 내 객체 중 value가 존재하는 것이 있는 지 찾기
  const noValueIndex = function (array) {
    const noValue = array.filter((e) => e.value === undefined);
    return array.indexOf(noValue[0]);
  };

  if (filterArrLeft.length !== filterArrRight.length)
    return console.log("닫는 괄호 불일치");
  if (isReverse(dataSplit)) return console.log("닫는 괄호가 앞섬");

  //  make Array
  let resultArr = [];
  const makeArr = function (newObj) {
    let traverse = resultArr;
    while (noValueIndex(traverse) >= 0) {
      traverse = traverse[noValueIndex(traverse)].child;
    }
    traverse.push(newObj);
  };
  dataSplit.forEach((e) => {
    if (e === "[") {
      // type : "array"
      if (resultArr.length === 0) {
        resultArr = [{ type: "root", child: [] }];
      } else {
        let newObj = { type: "array", child: [] };
        makeArr(newObj);
      }
    }
    if (filterNumberArr.indexOf(e) >= 0) {
      // type : "number"
      let newObj = { type: "number", value: e, child: [] };
      makeArr(newObj);
    }
  });

  // result
  console.log(
    `배열 중첩 : ${filterArrRight.length}, 원소 개수 : ${filterNumberArr.length}`
  );
  console.log(JSON.stringify(resultArr[0])); // 확인용
  return console.log(resultArr[0]);
};

run(data1);
run(data2); // 해결하기!!!!
run(data3);

/* result
[
  {
    type: "root",
    child: [
      { type: "number", value: "1", child: [] },
      { type: "number", value: "2", child: [] },
      {
        type: "array",
        child: [
          { type: "number", value: "3", child: [] },
          { type: "number", value: "4", child: [] },
          {
            type: "array",
            child: [
              { type: "number", value: "5", child: [] },
              {
                type: "array",
                child: [{ type: "number", value: "6", child: [] }],
              },
            ],
          },
        ],
      },
    ],
  },
] */
