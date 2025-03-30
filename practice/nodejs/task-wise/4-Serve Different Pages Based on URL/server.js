import http from "http";
import { readFile } from "fs/promises";

http
  .createServer(async (req, res) => {
    try {
      if (req.url === "/") {
        const data = await readFile("index.html", "utf-8");
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      } else if (req.url === "/about") {
        const data = await readFile("about.html", "utf-8");
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      } else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("404 Not Found");
      }
    } catch (error) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Internal Server Error");
      console.error(err.message);
    }
  })
  .listen(3000, () => {
    console.log("server started");
  });
