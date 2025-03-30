import net from "node:net";

const socket = net.createConnection({ host: "192.168.31.184", port: 4000 });

socket.on("error", () => {
  console.log("server Lost");
});

setTimeout(() => {
  socket.write("hii");
  socket.end();
}, 9000);

socket.on("data", (chunk) => {
  console.log(chunk.toString());
});
