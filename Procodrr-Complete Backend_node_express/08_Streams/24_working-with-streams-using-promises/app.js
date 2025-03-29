import fs from "fs/promises";

const fileHandle = await fs.open("text.txt");

fileHandle.createWriteStream()


// const readStream = fileHandle.createReadStream({});
// readStream.on("data", (chunk) => {
//   console.log(chunk);
// });
// // console.log(readStream);
