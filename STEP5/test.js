const data1 = "[11,2,[3,43,a,[5,[6]]]]";
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
// class calcurate {
//   constructor(A, B, C) {
//     this.a = A;
//     this.b = B;
//     this.c = C;
//   }
//   plus() {
//     this.console(`PLUS RESULT : ${this.a + this.b + this.c}`);
//   }
//   minus() {
//     this.console(`MINUS RESULT : ${this.a - this.b - this.c}`);
//   }
//   console(result) {
//     console.log(result);
//   }
// }
// const obj = new calcurate(1, 2, 3);
// console.log(obj);
// obj.minus();
// obj.plus();

[
  {
    type: "root",
    child: [
      { type: "number", value: "11", child: [] },
      { type: "number", value: "2", child: [] },
      {
        type: "array",
        child: [
          { type: "number", value: "398", child: [] },
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
];
