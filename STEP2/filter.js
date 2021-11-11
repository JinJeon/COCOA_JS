// 배열 거르기

const peoples = ["crong!@#", "honux5", "sarah#", "hea3d", "zello", "5lucas"];
const filterWord = (word) => {
  const char = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;
  return char.test(word);
};

// 1. for/while
const filterId1 = (arr) => {
  const filterArr1 = [];
  for (i = 0; i < arr.length; i++) {
    if (!filterWord(arr[i])) {
      filterArr1.push(arr[i].replace(/[0-9]/g, ""));
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
      filterArr2.push(element.replace(/[0-9]/g, ""));
    }
  });
  return filterArr2;
};
console.log(filterId2(peoples));
