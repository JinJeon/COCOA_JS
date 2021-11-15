const baseData = [1, 2, 3, 4, 5, 6, 100];

baseData.forEach((v, i) => {
  console.log("sync ", i);
});

baseData.forEach((v, i) => {
  console.log("sync 2", i);
});
/*
sync  0
sync  1
sync  2
sync  3
sync  4
sync  5
sync  6
sync 2 0
sync 2 1
sync 2 2
sync 2 3
sync 2 4
sync 2 5
sync 2 6
*/
