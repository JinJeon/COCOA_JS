let sequenceArr = [];

const CAUTION = "NOT ALLOWED INPUT";
const CIRCLE = "circle";
const RECT = "rect";
const TRAPE = "trapezoid";
const figureArr = [CIRCLE, RECT, TRAPE];

// 적정 값 확인 (문제 시 true)
const checkFigure = (figure) => {
  return figureArr.indexOf(figure) === -1;
};
const checkParams = (params) => {
  return params.some((element) => {
    if (element <= 0 || typeof element !== "number") {
      return true;
    }
  });
};

// 도형 형태 판별
const getArea = (figure, ...value) => {
  const params = [...value];
  const pushSequenceArr = (figure, value) => {
    sequenceArr.push({
      figure,
      value,
    });
    return sequenceArr;
  };

  if (checkFigure(figure)) {
    return pushSequenceArr(CAUTION, CAUTION);
  }
  if (checkParams(params)) {
    return pushSequenceArr(figure, CAUTION);
  }
  if (figure === CIRCLE) {
    return pushSequenceArr(CIRCLE, getCircleValue(params));
  }
  if (figure === RECT) {
    return pushSequenceArr(RECT, getRectValue(params));
  }
  if (figure === TRAPE) {
    return pushSequenceArr(TRAPE, getTrapeValue(params));
  }
};

// 도형 넓이
const getCircleValue = (params) => {
  if (params.length > 2 || params[0] >= params[1]) {
    return CAUTION;
  }
  if (params.length === 1) {
    return params * Math.PI;
  }
  if (params.length === 2) {
    let circleArr = [];
    for (let i = params[0]; i <= params[1]; i++) {
      circleArr.push(i * Math.PI);
    }
    return circleArr.reduce((A, B) => {
      return A + B;
    }, 0);
  }
};
const getRectValue = (params) => {
  if (params.length !== 2) {
    return CAUTION;
  }
  return params[0] * params[1];
};
const getTrapeValue = (params) => {
  if (params.length !== 3) {
    return CAUTION;
  }
  return ((params[0] + params[1]) * params[2]) / 2;
};

// 로깅
const printExecutionSequence = () => {
  const makeMention = (mention1, mention2) => {
    for (let i = 0; i < sequenceArr.length; i++) {
      mention1 = mention1 + `${sequenceArr[i].figure}, `;
      mention2 = mention2 + `${sequenceArr[i].value}, `;
    }
    console.log(mention1.slice(0, -2));
    console.log(mention2.slice(0, -2));
  };
  makeMention("계산 순서 : ", "계산 값 : ");
  return;
};

getArea(CIRCLE, 3);
getArea(RECT, 0, 3);
getArea(TRAPE, 2, 3, 4);
getArea("HI", 1, 4);
getArea(CIRCLE, 0, 4);
printExecutionSequence();
