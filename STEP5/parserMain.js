const data1 = "[11,2,[398,4,[5,[6]]]]";
const data5 = "[11,2,[398,4,[a,[6]]]]";
const data2 = "[1,2,][3,4,[5,[6]]]";
const data3 = "[1,2,[3,4,[5,[6]]]";
const data4 = "[[1],2,[3,4,[5,[6]]]]";

const run = function (data) {
  // data 글자별로 쪼개기
  const dataSplit = function (data) {
    const resultArr = [];
    data.split(",").forEach((e) => {
      resultArr.push(...e.replace(/[0-9]/g, "").split(""));
      resultArr.push(e.replace(/[^0-9]/g, ""));
    });
    return resultArr;
  };
  // 배열 내 숫자 찾기
  const filterNumber = function (array) {
    const resultArr = [];
    array.forEach((e) => {
      if (!isNaN(parseFloat(e))) resultArr.push(e);
    });
    return resultArr;
  };
  // "]"가 "[" 보다 앞선 경우 찾기
  const isReverse = function (array) {
    let testArr = [];
    array.forEach((e, i) => {
      if (e === "[") testArr.push(i);
    });
    return testArr.some((val) => val > array.indexOf("]"));
  };
  // (array 만들 때) 배열 내 객체 중 value가 없는 것이(type : "array") 존재하는 지
  // => array type의 객체의 index return
  const noValueIndex = function (array) {
    const noValue = array.filter((e) => e.value === undefined);
    return array.indexOf(noValue[0]);
  };

  const resultData = dataSplit(data);
  const filterLeftArr = resultData.filter((e) => e === "[");
  const filterRightArr = resultData.filter((e) => e === "]");
  const filterNumberArr = filterNumber(resultData);

  // error filter
  if (resultData.some((e) => e === ""))
    return console.log("정수, [] 외 다른 값이 입력됨");
  if (filterLeftArr.length !== filterRightArr.length)
    return console.log("괄호 갯수 불일치");
  if (isReverse(resultData)) return console.log("닫는 괄호가 앞섬");

  //  make Array
  let resultArr = [];
  const makeChild = function (newObj) {
    let traverse = resultArr;
    while (noValueIndex(traverse) >= 0) {
      traverse = traverse[noValueIndex(traverse)].child;
    }
    traverse.push(newObj);
  };

  resultData.forEach((e) => {
    if (e === "[") {
      // type : "array"
      if (resultArr.length === 0) {
        resultArr = [{ type: "root", child: [] }];
      } else {
        let newObj = { type: "array", child: [] };
        makeChild(newObj);
      }
    }
    if (filterNumberArr.indexOf(e) >= 0) {
      // type : "number"
      let newObj = { type: "number", value: e, child: [] };
      makeChild(newObj);
    }
  });

  // result
  console.log(
    `배열 중첩 : ${filterRightArr.length}, 원소 개수 : ${filterNumberArr.length}`
  );
  console.log(resultArr[0]);
  console.log(JSON.stringify(resultArr[0]));
};

run(data1);
run(data2);
run(data3);
run(data4);
run(data5);

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
