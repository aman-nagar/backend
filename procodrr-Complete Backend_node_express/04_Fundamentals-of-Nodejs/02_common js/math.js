function sum(...nums) {
  return nums.reduce((curr, acc) => curr + acc);
}

// for (i = 0; i <= 10; i++) {
//   console.log(i);
// }

function product(...nums) {
  return nums.reduce((curr, acc) => curr * acc);
}

module.exports = { sum, product };
