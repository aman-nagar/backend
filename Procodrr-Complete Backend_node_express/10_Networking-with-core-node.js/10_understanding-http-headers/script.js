// 10_Networking-with-core-node.js/10_understanding-http-headers/script.js
const response = await fetch("http://192.168.31.184:4000/");
console.log(response.body);
for await (const chunk of response.body) {
  console.log(chunk);
}
