// 06_Buffer-binary\06_transfer-of-arraybuffer-data\http-server\server\server.js
import http from "http";
const unit8Array = new Uint8Array(8);
unit8Array[0] = 0x50;
unit8Array[1] = 0x72;
unit8Array[2] = 0x72;
unit8Array[3] = 0x72;
unit8Array[4] = 0x50;
unit8Array[5] = 0x72;
unit8Array[6] = 0x72;
unit8Array[7] = 0x72;
// const view = new DataView(unit8Array);

startServer(unit8Array);

function startServer(responseData) {
  const server = http.createServer((req, res) => {
    res.setHeader("Content-Type", "text/txt; charset=utf-8");
    res.setHeader("Access-Control-Allow-Origin", "*");
    if (req.url === "/favicon.ico") {
      res.end();
      return;
    }
    res.end(Buffer.from(responseData.buffer));
  });

  server.listen(3000, () => {
    console.log("Listening on http://localhost:3000");
  });
}
