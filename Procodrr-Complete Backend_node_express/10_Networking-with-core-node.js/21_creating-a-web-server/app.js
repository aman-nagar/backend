import { readFile } from "fs/promises";
import http from "http";
import { createReadStream } from "fs";

const server = http.createServer(async (req, res) => {
  console.log(req.url);
  if (req.url === "/") {
    const readStream = createReadStream("./public/index.html");
    readStream.pipe(res);
  } else {
    const readStream = createReadStream(`./public${req.url}`);
    readStream.on("error", (err) => {
      console.log(err.message);
      res.end("not found!");
    });
    readStream.pipe(res);
  }
});
server.listen(4000, "192.168.31.184", () => {
  console.log("server started");
});
