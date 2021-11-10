const data = "[1,2,[3,4,[5,[6]]]]";

const run = function (data) {
  const dataSplit = data.split("").filter((e) => e !== ",");
  const regex = /[0-9]/g;
  const filterArrLeft = dataSplit.filter((e) => e === "[");
  const filterArrRight = dataSplit.filter((e) => e === "]");
  const filterNumber = dataSplit.filter((e) => {
    return regex.test(e) === true;
  });

  // 배열 내 객체 중 value가 존재하는 것이 있는 지 찾기
  const noValueIndex = function (array) {
    const noValue = array.filter((e) => e.value === undefined);
    return array.indexOf(noValue[0]);
  };

  if (filterArrLeft.length !== filterArrRight.length)
    return console.log("닫는 괄호 불일치");

  let resultArr = [];
  dataSplit.forEach((e) => {
    if (e === "[") {
      // type : "array"
      let newObj = { type: "array", child: [] };
      if (resultArr.length === 0) {
        resultArr = [newObj];
        resultArr[0].type = "root"; // first array = root
      } else {
        let traverse = resultArr;
        while (noValueIndex(traverse) >= 0) {
          traverse = traverse[noValueIndex(traverse)].child;
        }
        traverse.push(newObj);
      }
    }

    if (regex.test(e) === true) {
      // type : "number"
      let newObj = { type: "number", value: e, child: [] };
      let traverse = resultArr;
      while (noValueIndex(traverse) >= 0) {
        traverse = traverse[noValueIndex(traverse)].child;
      }
      traverse.push(newObj);
    }
  });
  // return result obj!
  console.log(
    `배열 중첩 : ${filterArrRight.length}, 원소 개수 : ${filterNumber.length}`
  );
  console.log(JSON.stringify(resultArr[0])); // 확인용
  return console.log(resultArr[0]);
};

run(data);
