import net from "node:net";
const server = net.createServer();
server.listen(4000, () => {
  console.log("server started");
});

server.on("connection", (socket) => {
  socket.on("data", (chunk) => {
    console.log(chunk.toString());
    socket.write("HTTP\n\n Hello from server");
    socket.end();
  });
  socket.on("close", () => {
    console.log(socket.remoteAddress, ": Client Disconnected");
  });
  console.log(socket.address());
  console.log("client connected");
});
// server.on("listening", () => {
//   console.log("server started");
// });
