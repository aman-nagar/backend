import http from "http";
import { readFile } from "fs/promises";

http
  .createServer(async (req, res) => {
    try {
      const data = await readFile("index.html", "utf-8");
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    } catch (err) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Internal Server Error");
      console.error(err.message);
    }
  })
  .listen(3000, () => {
    console.log("Server running on http://localhost:3000");
  });
