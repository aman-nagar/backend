// Create a Basic Node.js Serverw
const http = require("http");
const PORT = 3000;
const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "text/plain");
  res.end("hello nodejs");
});
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
