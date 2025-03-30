import { readFile } from "node:fs/promises";

// const fileContent = await readFile("./file-1.txt", "utf-8");
// const wordsArray = fileContent.split(" ");
// console.log(typeof(wordsArray));
const filePath = process.argv[2];

// const fileContent = await readFile("./file-1.txt", "utf-8"); // for testing
const fileContent = await readFile(filePath, "utf-8"); // dynamic file path
const wordsArray = fileContent.split(/[\W]/).filter((w) => w);
const wordsCount = {};
wordsArray.forEach((word) => {
  if (word in wordsCount) {
    wordsCount[word] += 1;
  } else {
    wordsCount[word] = 0;
  }
});
console.log(wordsCount);
// console.log(process.argv);
