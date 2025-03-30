import { Buffer } from "buffer";

const a = Buffer.alloc(4);
const b = Buffer.allocUnsafe(4);
b[2]=97
// console.log(a.buffer);
console.log(a.byteLength);
console.log(b.byteLength);
console.log("xxxxxxxxxxxxxxxxxxxxxxxx");
console.log(a.buffer.byteLength);
console.log(b.buffer.byteLength);
// console.log(a.poolsize);

console.log("end");
