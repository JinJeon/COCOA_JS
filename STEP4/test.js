const hasher = (data) => {
  const asciiData = `${data}`.split("");
  let result = 0;
  asciiData.forEach((value) => (result = result + value.charCodeAt(0)));
  return result;
};

function bookShelf() {
  this.books = new Array();
}

bookShelf.prototype = {
  put: function (key, value) {
    const number = hasher(key);
    if (this.books[number]) {
      this.books[number];
    }
    this.books[number] = [[String(key), String(value)]];
  },
  remove: function (key) {
    const number = hasher(key);
    if (!this.containsKey(key)) {
      return `NOT ALLOWED : ${key}`;
    }
    return (this.books[number] = {});
  },
  containsKey: function (key) {
    const number = hasher(key);
    if (this.books[number] === undefined) {
      return false;
    }
    return this.books[number][key] ? true : false;
  },
  get: function (key) {
    const number = hasher(key);
    if (!this.containsKey(key)) {
      return `NOT ALLOWED : ${key}`;
    }
    return this.books[number][key];
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

book.put("A", "a");
book.put("B", "b");
book.put("AB", "c");
book.put("BA", "d");

console.log(book);
console.log(book.containsKey("A"));
console.log(book.replace("E"));
