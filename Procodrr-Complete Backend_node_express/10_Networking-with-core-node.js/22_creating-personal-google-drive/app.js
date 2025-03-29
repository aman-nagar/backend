import { createReadStream } from "fs";
import { open, readdir, readFile } from "fs/promises";
import http from "http";

const server = http.createServer(async (req, res) => {
  if (req.url === "favicon.ico") return res.end("nofavicon");
  if (req.url === "/") {
    serveDirectory(req, res);
  } else {
    try {
      const fileHandle = await open(`./storage${decodeURIComponent(req.url)}`);
      const stats = await fileHandle.stat();
      if (stats.isDirectory()) {
        serveDirectory(req, res);
      } else {
        const readStream = fileHandle.createReadStream();
        readStream.pipe(res);
      }
    } catch (error) {
      console.log(error.message);
      res.end("not found");
    }
  }
});
async function serveDirectory(req, res) {
  const itemsList = await readdir(`./storage${req.url}`);
  let dynamicHTML = "";
  itemsList.forEach((item) => {
    dynamicHTML += `<a href=".${
      req.url === "/" ? "" : req.url
    }/${item}">${item}</a><br>`;
  });
  const htmlBoilerPlate = await readFile("./boilerplate.html", "utf-8");
  res.end(htmlBoilerPlate.replace("${dynamicHTML}", dynamicHTML));
}

server.listen(4000, () => {
  console.log("server started");
});

// const readStream = createReadStream(`./storage${req.url}`);
// readStream.on("error", (err) => {
//   console.log(err.message);
//   res.end("not found!");
// });
// readStream.pipe(res);
