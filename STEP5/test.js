const data1 = "[11,2,[3,43,,[5,[6]]]]";
// split한 배열에서 ,가 반복적으로 있을 경우, ""가 나오므로 ""가 나오면 error message 출력
const dataSplit = function (data) {
  resultArr = [];
  data.split(",").forEach((e) => {
    resultArr.push(...e.replace(/[0-9]/g, "").split(""));
    resultArr.push(e.replace(/[^0-9]/g, ""));
  });
  return resultArr;
};

console.log(dataSplit(data1));
