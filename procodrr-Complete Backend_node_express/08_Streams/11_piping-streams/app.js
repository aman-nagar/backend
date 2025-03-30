import fs from "fs";

console.time();
const readStream = fs.createReadStream(
  "D:\\Entertainment\\movies\\Aavesham (2024) Dual Audio _Hindi-Malayalam_ 720p WEB-DL ESub [BollyFlix].mkv"
);

const writeStream = fs.createWriteStream("streams.mp4");
readStream.on("data", (chunk) => {
  writeStream.write(chunk);
});
readStream.on("end", () => {
  console.timeEnd();
});
