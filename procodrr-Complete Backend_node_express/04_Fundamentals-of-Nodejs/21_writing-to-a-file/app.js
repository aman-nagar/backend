import { fchown } from "node:fs";
import { readFile, writeFile, appendFile } from "node:fs/promises";

try {
  const contentBuffer = await readFile("./image.pn");
  writeFile("./newImg.png", contentBuffer);
} catch (error) {
  appendFile(
    "error.log",
    `\n\n${new Date().toLocaleTimeString()}: ${error.message}\n${error.stack}`
  );
  console.log("to see full error message go to ./error.log file", error);
}

// setInterval(() => {
//   writeFile("file-1.txt", new Date().toLocaleTimeString());
// }, 500);

// function formatDate(date) {
//   const options = {
//     year: "numeric",
//     month: "2-digit",
//     day: "2-digit",
//     hour: "2-digit",
//     minute: "2-digit",
//     second: "2-digit",
//     hour12: true,
//     weekly: "long",
//   };
//   return new Intl.DateTimeFormat("en-us", options).format(date);
// }

// async function updateFileClock() {
//   const content = await readFile("content-read.txt", "utf-8");

//   setInterval(async () => {
//     const formattedDate = formatDate(new Date());

//     const data = `${formattedDate}: ${content}`;
//     try {
//       await writeFile("file-1.txt", data);
//       console.log(data);
//     } catch (err) {
//       console.error("error", err);
//     }

// }, 1000);
// process.stdout.write(`\r${formattedDate}: ${content}`);
// logCurrentDate().catch((err) => console.error("error updating date", err));
//   await appendFile("file-1.txt", `${formattedDate} : ${content}\n`);
//   console.log(`${formattedDate}: ${content}`);
// }

// updateFileClock().catch((err) =>
//   console.error("error in updateFileClock:", err)
// );

// const content = await readFile("content-read.txt", "utf-8");
// const img = await readFile("image.png");
// writeFile("file-1.txt", "HELLO");
// const formattedDate = formatDate(new Date());
// appendFile("file-1.txt", `${formattedDate}: ${content}\n`);
// writeFile("new-img.png", img);

// console.log("Content appended with date:", content);
// console.log("Image written successfully!");
