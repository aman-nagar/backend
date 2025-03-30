// Q: input [1,2,3] output 321

// simple and long method
function digitsToNumber(digits) {
  let output = 0;
  digits.forEach((digit, index) => {
    output += digit * Math.pow(10, index);
  });

  console.log(output); // 321
  return output;
}
digitsToNumber([7, 2, 3]);

// function digitsToNumber(digits) {
//   let output2 = 0;
//   let multiplier = 1;
//   for (let i = 1; i <= digits.length; i++) {
//     output2 += i * multiplier;
//     multiplier *= 10;
//   }
//   console.log(output2);
//   return output2;
// }
// digitsToNumber([1, 2, 3]);

// short method

// function digitsToNumber(digits) {
//   return digits.reduceRight(
//     (acc, digit, index) => acc + digit * Math.pow(10, index),
//     0
//   );
// }
// console.log(digitsToNumber([1, 2, 3]));
