// 배열 만들기

const data = {
  debug: 3,
  window: {
    title: "Sample Konfabulator Widget",
    name: "main_window",
    width: 500,
    height: 500,
  },
  image: {
    src: "Images/Sun.png",
    name: "sun1",
    hOffset: 250,
    vOffset: 250,
    alignment: "center",
  },
  text: {
    data: "Click Here",
    size: 36,
    style: "bold",
    name: "text1",
    hOffset: 250,
    vOffset: 100,
    alignment: "center",
    onMouseUp: "sun1.opacity = (sun1.opacity / 100) * 90;",
  },
};
// 숫자타입으로만 구성된 요소를 뽑아 배열만들기
// 실행결과
// ["width", "height", "hOffset", "vOffset", "size", "hOffset", "vOffset"]

//======================================================================================================
// 순서
// 객체의 값이 객체인지 그 외의 문자, 숫자 등인지 구분
//  => 문자, 숫자 등일 경우 숫자인지 확인
//  => 아닐경우 위 과정을 한 번 더 반복
//======================================================================================================

// key를 value로 바꾸는 함수
function getKeyByValue(obj, value) {
  return Object.keys(obj).find((key) => obj[key] === value);
}

// Object.values
const filter1 = (obj) => {
  const numberArr = [];
  Object.values(obj).forEach((element) => {
    if (typeof element === "number") {
      numberArr.push(getKeyByValue(obj, element));
    } else if (typeof element === "object") {
      Object.values(element).forEach((element2) => {
        if (typeof element2 === "number") {
          numberArr.push(getKeyByValue(element, element2));
        }
      });
    }
  });
  return numberArr;
};

console.log(filter1(data));
// ["debug", "width", "width", "hOffset", "hOffset", "size", "hOffset", "vOffset"];

// for in
const filter2 = (obj) => {
  let numberArr = [];
  for (const key in obj) {
    if (typeof obj[key] === "number") {
      numberArr.push(obj[key]);
    } else if (typeof obj[key] === "object") {
      filter2(obj[key]);
    }
  }
  return numberArr;
};
filter2(data);
