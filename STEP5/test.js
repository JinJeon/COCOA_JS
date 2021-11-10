const A = "29";
const array = [
  { type: "number", value: "1", child: [] },
  { type: "array", child: [] },
  { type: "number", value: "3", child: [] },
  // { type: "array", child: [] },
  { type: "number", value: "5", child: [] },
  // { type: "array", child: [] },
  { type: "number", value: "6", child: [] },
];

const filterNoValue = function (array) {
  const noValue = array.filter((e) => e.value === undefined);
  console.log(noValue);
  return array.indexOf(noValue[1]) >= 0;
};
// console.log(filterNoValue(array));

const data = "[1,]2,[3,4,[5,[6]]]]";

const dataSplit = data.split("").filter((e) => e !== ",");
console.log(dataSplit);
const regex = /[0-9]/g;
const filterArrLeft = dataSplit.filter((e) => e === "[");
const filterArrRight = dataSplit.filter((e) => e === "]");
console.log(filterNumber);
console.log(typeof NaN);
console.log(dataSplit.indexOf("]"));
let testArr = [];
dataSplit.forEach((e, i) => {
  if (e === "[") testArr.push(i);
});
console.log(testArr);
console.log(testArr.some((val) => val > dataSplit.indexOf("]")));

// result
[
  {
    type: "root",
    child: [
      { type: "number", value: "1", child: [] },
      { type: "number", value: "2", child: [] },
      {
        type: "array",
        child: [
          { type: "number", value: "3", child: [] },
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
