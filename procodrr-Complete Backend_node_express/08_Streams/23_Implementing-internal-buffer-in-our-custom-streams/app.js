import fs from "fs";
import { buffer } from "stream/consumers";

// console.time();
const buff = Buffer.allocUnsafe(4);
const fd = fs.openSync("numbers.txt", "w");
let totalBytesWrittenInBuffer = 0;
for (let i = 1; i <= 10; i++) {
  const str = `${1}, `;
  const bytesWritten = buff.write(str, totalBytesWrittenInBuffer);
  totalBytesWrittenInBuffer += bytesWritten;
  if (totalBytesWrittenInBuffer === buff.byteLength) {
    fs.writeSync(fd, buff);
    totalBytesWrittenInBuffer = 0;
  }
}
