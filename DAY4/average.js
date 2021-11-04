// 평균 구하기

// 아래 예시는 네 명의 학생에 대한 과목 점수이다.
// 각 학생은 3가지 과목에 대한 점수를 가지고 있다.
// 각 학생의 평균점수(1)와 모든 학생의 최고점수의 평균점수(2)를 출력하라.

const grades = [
  [88, 76, 77],
  [33, 44, 44],
  [90, 100, 94],
  [30, 44, 98],
];

//======================================================================================================
// 순서
// 1. 각 학생의 평균점수 구하는 함수 (return = 점수)
//   각 학생 array 불러오기 => 요소의 합 구하기 + 나누기(array.length) : 평균 => 모든 학생 array에 적용
// 2. 각 학생의 최고점수 구하는 함수 (return = 점수)
//   각 학생 array 불러오기 => 최고값 구하기 => 모든 학생 array에 적용
// 3. 1번과 2번으로 최고점수의 평균 구하기
//======================================================================================================

const getAverage = (scoreArr) => {
  const sum = scoreArr.reduce((score1, score2) => score1 + score2);
  return sum / scoreArr.length;
};

const getAllAverage = (studentArr) => {
  let averageArr = [];
  studentArr.forEach((student) => averageArr.push(getAverage(student)));
  return averageArr;
};

console.log(getAllAverage(grades));
// [
//   80.33333333333333,
//   40.333333333333336,
//   94.66666666666667,
//   57.333333333333336
// ]

const getBestScore = (scoreArr) => {
  const max = scoreArr.reduce((score1, score2) => {
    return Math.max(score1, score2);
  });
  return max;
};

const getBestScoreAverage = (studentArr) => {
  let bestScoreArr = [];
  studentArr.forEach((student) => {
    bestScoreArr.push(getBestScore(student));
  });
  return getAverage(bestScoreArr);
};

console.log(getBestScoreAverage(grades));
// 82.5
