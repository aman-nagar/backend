import net from "node:net";
const server = net.createServer((socket) => {
  socket.on("data", (chunk) => {
    console.log(chunk.toString());
  });
  socket.write("HTTP\n\n Hello from serverr");
  socket.end();
  socket.on("close", () => {
    console.log(socket.remoteAddress, ": Client Disconnected");
  });
  console.log(socket.address());
  console.log("client connected");
});
server.listen(4000, () => {
  console.log("server started");
});
