import fs from "fs";

const writeStreams = fs.createWriteStream("file.txt");

console.log(writeStreams.writable);
