import { writeFile } from "fs/promises";
const unit8Array = new Uint8Array(8);
unit8Array[0] = 0x50;
unit8Array[1] = 0x72;
unit8Array[2] = 0x72;
unit8Array[3] = 0x72;
unit8Array[4] = 0x50;
unit8Array[5] = 0x72;
unit8Array[6] = 0x72;
unit8Array[7] = 0x72;
const view = new DataView(unit8Array.buffer);
// const text = new TextDecoder().decode(unit8Array);
// writeFile("decoded-text.txt", text);
console.log(view);
// writeFile("decoded-text.txt", unit8Array);
writeFile("decoded-text.txt", view);

console.log(unit8Array);

// const decoder = new TextDecoder();
// const decodedString = decoder.decode(unit8Array);
// console.log(decodedString);
