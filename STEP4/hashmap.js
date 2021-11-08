const hasher = (data) => {
  const asciiData = `${data}`.split("");
  let result = 0;
  asciiData.forEach((value) => (result = result + value.charCodeAt(0)));
  return result;
};

class hashBooksMake {
  constructor(volume) {
    this.books = new Array();
    if (volume) {
      this.volume = volume;
    }
    this.volume = 100;
  }
  put = (key, value) => {
    const number = hasher(key);
    this.books[number] = { [key]: String(value) };
  };
  remove = (key) => {
    const number = hasher(key);
    if (!this.books[number][`${key}`]) {
      return console.log(`NOT ALLOWED : ${key}`);
    }
    return (this.books[number] = {});
  };
  containsKey = (key) => {
    const number = hasher(key);
    if (this.books[number] === undefined) {
      return false;
    }
    return this.books[number][key] ? true : false;
  };
  get = (key) => {
    const number = hasher(key);
    console.log(this.books[number[key]]);
    if (this.books[number][key] === undefined) {
      return undefined;
    }
    return this.books[number][key];
  };
  isEmpty = () =>
    this.books.filter((element) => element !== undefined).length === "0"
      ? true
      : false;
  keys = () => {
    let resultArr = [];
    this.books.forEach(
      (element) => (resultArr = resultArr.concat(Object.keys(element)))
    );
    return resultArr;
  };
  replace = (key, value) => {
    const number = hasher(key);
    this.books[number][key] = String(value);
  };
  size = () =>
    this.books === undefined
      ? "0"
      : this.books.filter((element) => element !== undefined).length;
  clear = () => {
    this.books = [];
  };
}
let book = new hashBooksMake();
