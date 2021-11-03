// 배열 거르기

// 주어진 사람들 중 아래 조건을 만족하는 사람들로 구성된 배열을 만들어서 반환하는 함수 만들기.
// 특수기호가 없는 아이디 제외
// 아이디에서 숫자를 제거
// 2 가지 iteration을 처리하는 버전을 만든다.
// for/while문을 사용한 버전 만들기.
// forEach,filter, map등의 고차함수를 사용한 버전 만들기
// const peoples = ["crong!@#", "honux5", "sarah#", "hea3d", "zello", "5lucas"];
// filterId(peoples) > ["honux", "head", "zello", "lucas"];

const peoples = ["crong!@#", "honux5", "sarah#", "hea3d", "zello", "5lucas"];
const filterWord = (word) => {
  const char = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;
  return char.test(word) ? true : false;
};

// 1. for/while
const filterId1 = (arr) => {
  const filterArr1 = [];
  for (i = 0; i < arr.length; i++) {
    if (!filterWord(arr[i])) {
      filterArr1.push(arr[i]);
    }
  }
  return filterArr1;
};
console.log(filterId1(peoples));

// 2. 고차함수
const filterId2 = (arr) => {
  const filterArr2 = [];
  arr.forEach((element) => {
    if (!filterWord(element)) {
      filterArr2.push(element);
    }
  });
  return filterArr2;
};
console.log(filterId2(peoples));
