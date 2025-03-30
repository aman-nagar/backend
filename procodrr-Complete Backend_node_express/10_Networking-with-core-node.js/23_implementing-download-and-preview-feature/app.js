import { createReadStream } from "fs";
import { open, readdir, readFile } from "fs/promises";
import http from "http";
import mime from "mime-types";

const server = http.createServer(async (req, res) => {
  // if (req.url === "favicon.ico") return res.end("no favicon");
  if (req.url === "/") {
    serveDirectory(req, res);
  } else {
    try {
      const [url, queryString] = req.url.split("?");
      const queryParam = {};
      console.log(url, queryString);
      queryString.split("&").forEach((pair) => {
        const [key, value] = pair.split("=");
        queryParam[key] = value;
      });
      console.log(queryParam);
      const fileHandle = await open(`./storage${decodeURIComponent(url)}`);
      const stats = await fileHandle.stat();
      if (stats.isDirectory()) {
        serveDirectory(req, res);
      } else {
        const readStream = fileHandle.createReadStream();
        res.setHeader("Content-Type", mime.contentType(url.slice(1)));
        res.setHeader("Content-Length", stats.size); // for showing file size in browser downloading
        if (queryParam.action === "download") {
          res.setHeader(
            "Content-Disposition",
            `attachment;filename="${url.slice(1)}"` // slice(1) to remove extra '/'
          );
        }
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
    dynamicHTML += `${item} <a href=".${
      req.url === "/" ? "" : req.url
    }/${item}?action=open">Open</a> | <a href=".${
      req.url === "/" ? "" : req.url
    }/${item}?action=download">Download</a><br>`;
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
