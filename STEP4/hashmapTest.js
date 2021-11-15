const hashingIndex = function (number) {
  const result = number % 3;
  return result;
};

class linear {
  // 선형
  constructor() {
    this.table = [];
  }
  setValue(value = -1) {
    console.log(this.table);
    const index = hashingIndex(value);
    const putIndex = function (index) {
      let i = 1;
      console.log(this);
      if (this.table[index] === undefined) {
        // this가 내부에서 작동하지 않음??
        this.table[index] = value;
      } else {
        i = i + 1;
        putIndex(index + i);
      }
    };
    putIndex(index);
  }
  getTable() {
    return this.table;
  }
}

class quadratic {
  // 제곱
  constructor() {
    this.table = [];
  }
  setValue(value = -1) {
    const index = hashingIndex(value);
    const putIndex = function (index) {
      let i = 1;
      if (this.table === undefined) {
        this.table[index] = value;
      }
      if (this.table[index]) {
        putIndex(index + i * i);
        i = i + 1;
      } else {
        this.table[index] = value;
      }
    };
    putIndex(index);
  }
  getTable() {
    return this.table;
  }
}

const myTable = new linear();
console.log(myTable);
myTable.setValue(5);
myTable.setValue(8);

console.log(myTable.getTable());
