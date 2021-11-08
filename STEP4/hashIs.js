let map = new Map();

let testNumber = 1;
let testString = "string";
let testObject = { A: "a" };
let testFucntion = (B) => {
  B = "b";
};

map.set(testNumber, 1);
map.set(testString, 2);
map.set(testObject, 3);
map.set(testFucntion, 4);
map.delete(tetete);
console.log(map);
/*
Map(4) {
  1 => 1,
  'string' => 2,
  { A: 'a' } => 3,
  [Function (anonymous)] => 4
}
*/
for (let [key, value] of map) {
  console.log(key, "=", value);
}
// 1 = 1
// string = 2
// { A: 'a' } = 3
// [Function: testFucntion] = 4
for (let key of map.keys()) {
  console.log(key);
}
// 1
// string
// { A: 'a' }
// [Function: testFucntion]
for (let value of map.values()) {
  console.log(value);
}
// 1
// 2
// 3
// 4
console.log(map.values());
// [Map Iterator] { 1, 2, 3, 4 }
console.log(map.keys());
// [Map Iterator] { 1, 'string', { A: 'a' }, [Function: testFucntion] }
