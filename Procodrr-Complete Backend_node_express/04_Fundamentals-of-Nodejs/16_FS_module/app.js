// import fs from "node:fs";
import fs from "node:fs/promises";

// fs.readFile("./index.html", (err, data) => {
//   const content = data.toString();
//   console.log(content);
// });
let i=0;

setInterval(()=>{
    console.log(i++);
},5)

const data = await fs.readFile("./index.html");
// console.log(data.toString());
console.log("reading Done");

