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
  indexIs: function (key, value) {
    const number = hasher(key);
    if (typeof this.books[number] !== "object") {
      return number;
    } else {
      return this.indexIs(hasher(key), value);
    }
  },
  put: function (key, value) {
    const realKey = key;
    const search = (key, value) => {
      const number = this.indexIs(key, value);
      if (number) {
        this.books[number] = { [realKey]: String(value) };
      } else {
        console.log("NO VACANCY");
      }
    };
    search(key, value);
  },
  remove: function (key) {
    const number = hasher(key);
    if (!this.containsKey(key)) {
      return `NOT ALLOWED : ${key}`;
    }
    // if(this.books[number].key === )
    return (this.books[number][key] = {});
  },
  containsKey: function (key) {
    const number = hasher(key);
    if (this.books[number] === undefined) {
      return false;
    }
    return this.books[number][key] ? true : false;
  },
  get: function (key) {
    const number = this.indexIs(key);
    if (!this.containsKey(key)) {
      return `NOT ALLOWED : ${key}`;
    }
    if (this.books[number][key]) return this.books[number][key];
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
// book.put("CD", "e");
// book.put("DC", "f");

console.log(book);
