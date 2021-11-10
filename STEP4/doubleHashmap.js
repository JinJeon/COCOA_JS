// 저장 공간으로 객체를 사용하고, 이중 해싱으로 충돌을 해결
const hasher = (data) => {
  const dataArr = `${data}`.split("");
  let number = 3;
  dataArr.forEach((value) => (number = number + value.charCodeAt(0)));
  const result = number % 50;
  return result;
};

function bookShelf() {
  this.books = new Array();
}

bookShelf.prototype = {
  indexIs: function (key) {
    const getIndex = (key) => {
      if (
        typeof this.books[hasher(key)] !== "object" ||
        key === Object.keys(this.books[hasher(key)])[0]
      ) {
        return hasher(key);
      } else {
        return getIndex(hasher(key));
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
      return `NOT ALLOWED : ${key}`;
    }
    const number = this.indexIs(key);
    console.log(number);
    console.log(this.books[number]);
    this.books[number] = {};
  },
  containsKey: function (key) {
    const number = this.indexIs(key);
    return this.books[number] ? true : false;
    // return boolean
  },
  get: function (key) {
    if (!this.containsKey(key)) {
      return `NOT ALLOWED : ${key}`;
    }
    const number = this.indexIs(key);
    return this.books[number];
  },
  isEmpty: function () {
    return this.books.filter((element) => element !== undefined).length === "0"
      ? true
      : false;
  },
  keys: function () {
    let resultArr = [];
    this.books.forEach(
      (element) => (resultArr = resultArr.concat(Object.keys(element)))
    );
    return resultArr;
  },
  replace: function (key, value) {
    const number = hasher(key);
    if (this.books[number] === undefined) {
      return `NOT ALLOWED : ${key}`;
    }
    this.books[number][key] = String(value);
  },
  size: function () {
    console.log(this.books.filter((element) => element !== undefined));
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
book.put("BA", "d");
book.put("AB", "c");
console.log(book);
console.log(book.containsKey("AB"));
console.log(book);
