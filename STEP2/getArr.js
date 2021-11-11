// 배열 만들기
const { data } = require("../DATA/getArrData");

//======================================================================================================
// 순서
// 객체의 값이 객체인지 그 외의 문자, 숫자 등인지 구분
//  => 문자, 숫자 등일 경우 숫자인지 확인
//  => 아닐경우 위 과정을 한 번 더 반복
//======================================================================================================

// ["debug", "width", "width", "hOffset", "hOffset", "size", "hOffset", "vOffset"];

const filterNumber = (obj) => {
  return Object.keys(obj).filter((key) => typeof obj[key] === "number");
};

const filterObj = (obj) => {
  let filteredArr = [];
  const filterResult = (object) => {
    filteredArr = filteredArr.concat(filterNumber(object));
    if (Object.values(object).some((value) => typeof value === "object")) {
      Object.values(object).forEach((value) => filterResult(value));
    }
    return filteredArr;
  };
  return filterResult(obj);
};
console.log(filterObj(data));
// [
//   "debug",
//   "width",
//   "height",
//   "hOffset",
//   "vOffset",
//   "size",
//   "hOffset",
//   "vOffset",
// ];
