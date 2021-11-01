// 추후 계산 순서, 값 출력 위해 빈 배열 생성
let returnArr = [];
let figureArr = [];

// 하나의 함수로 설정
const getArea = (figure, a, b, c) => {
  // 여러 개의 원 넓이 합 구하기. Boolean으로 b의 존재 유무를 확인
  if (figure === "circle" && Boolean(b) === true) {
    let circleArr = [];
    for (let i = a; i <= b; i++) {
      circleArr.push(i * Math.PI);
    }
    // 배열 내의 원의 넓이들의 합
    const value = circleArr.reduce((A, B) => {
      return A + B;
    }, 0);
    figureArr.push(figure);
    returnArr.push(value);
    return console.log(value);
    // return을 사용해야 b가 없는 상황에 대해서 함수가 적용되지 않음
  }
  // 원의 넓이
  if (figure === "circle") {
    // SUM.push(sum);
    const value = Math.PI * a;
    figureArr.push(figure);
    returnArr.push(value);
    debugger;
    return console.log(value);
  }
  // 직사각형의 넓이
  if (figure === "rect") {
    const value = a * b;
    figureArr.push(figure);
    returnArr.push(value);
    return console.log(value);
  }
  // 사다리꼴 넓이
  if (figure === "trapezoid") {
    const value = ((a + b) * c) / 2;
    figureArr.push(figure);
    returnArr.push(value);
    return console.log(value);
  }
};

// 로깅 함수 (사용한 도형, 결과 출력)
const printExecutionSequence = () => {
  let mention1 = "계산 순서 : ";
  let mention2 = "계산 값 : ";
  // 계산 순서 멘트 만들기
  for (let i = 0; i < figureArr.length; i++) {
    mention1 = mention1 + `${figureArr[i]}, `;
  }
  mention1 = mention1.slice(0, -2);
  // 계산 값 멘트 만들기
  for (let i = 0; i < returnArr.length; i++) {
    mention2 = mention2 + `${returnArr[i]}, `;
  }
  mention2 = mention2.slice(0, -2);
  // 글씨로 출력
  console.log(mention1);
  console.log(mention2);
  return;
};

getArea("rect", 2, 3); // 예시 1
getArea("circle", 5, 10); // 예시 2
printExecutionSequence();
getArea("circle", 1); // 예시 3
getArea("trapezoid", 2, 3, 1); // 예시 4
printExecutionSequence();
