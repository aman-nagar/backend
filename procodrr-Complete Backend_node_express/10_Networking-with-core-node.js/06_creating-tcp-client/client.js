import net from "node:net";

const socket = net.createConnection({ host: "192.168.31.184", port: 4000 });

socket.on("error", () => {
  console.log("Server Lost");
});

setTimeout(() => {
  socket.write("Hii");
  socket.end();
}, 2000);

socket.on("data", (chunk) => {
  console.log(chunk.toString());
});
