// 저장 공간으로 객체를 사용하고, 이중 해싱으로 충돌을 해결
const arraySize = 53;

const hasher = function (data, i) {
  const hasherMain = (data, num, size) => {
    const dataArr = `${data}`.split("");
    let number = num;
    dataArr.forEach((value) => (number = number + value.charCodeAt(0)));
    const result = number % size;
    return result;
  };
  return (
    (hasherMain(data, 3, arraySize) + i * hasherMain(data, 1, 7)) % arraySize
  );
};

function bookShelf() {
  this.books = new Array();
}

bookShelf.prototype = {
  // 정해진 순서에 따라 비어있는 공간의 index를 return
  indexIs: function (key) {
    let i = 0;
    console.log(this);
    const getIndex = (key) => {
      if (
        typeof this.books[hasher(key, i)] !== "object" ||
        key === Object.keys(this.books[hasher(key, i)])[0]
        // object가 해당 index에 없거나
        // object가 해당 index에 있지만, key값이 일치할 때
      ) {
        console.log(this);
        return hasher(key, i);
      }
      if (i > arraySize) {
        return false;
      } else {
        // 조건을 만족하는 모든 index에 object가 존재할 때
        i = i + 1;
        return getIndex(key);
      }
    };
    return getIndex(key);
  },
  put: function (key, value) {
    const realKey = key;
    const number = this.indexIs(key);
    if (number) {
      this.books[number] = { [realKey]: String(value) };
    } else {
      console.log("NO VACANCY");
    }
  },
  remove: function (key) {
    if (!this.containsKey(key)) {
      return console.log(`NOT ALLOWED : ${key}`);
    }
    const number = this.indexIs(key);
    delete this.books[number];
  },
  containsKey: function (key) {
    const number = this.indexIs(key);
    return Boolean(this.books[number]);
  },
  get: function (key) {
    if (!this.containsKey(key)) {
      return `NOT ALLOWED : ${key}`;
    }
    const number = this.indexIs(key);
    return this.books[number];
  },
  isEmpty: function () {
    return this.books.filter((element) => element !== undefined).length === "0";
  },
  keys: function () {
    let resultArr = [];
    this.books.forEach(
      (element) => (resultArr = resultArr.concat(Object.keys(element)))
    );
    return resultArr;
  },
  replace: function (key, value) {
    const number = this.indexIs(key);
    if (this.books[number] === undefined) {
      return `NOT ALLOWED : ${key}`;
    }
    this.books[number][key] = String(value);
  },
  size: function () {
    this.books.filter((element) => element !== undefined);
    return this.books === undefined
      ? "0"
      : this.books.filter((element) => element !== undefined).length;
  },
  clear: function () {
    this.books = [];
  },
};

let book = new bookShelf();

// book.put("A", "a");
// book.put("B", "b");
book.put("AB", "d");
console.log(book.books);
book.put("AB", "c");
book.remove("BA");
console.log(book.books);
console.log(book.get("AB"));
