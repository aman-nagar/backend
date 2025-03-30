import fs from "fs/promises";
// let binaryString = "";
const contentBuffer = await fs.readFile("text.txt");
console.dir(contentBuffer.toString());
// contentBuffer.forEach((el) => {
//   binaryString += el.toString(2) + " ";
// });
// console.dir(contentBuffer);
// console.log(binaryString);
