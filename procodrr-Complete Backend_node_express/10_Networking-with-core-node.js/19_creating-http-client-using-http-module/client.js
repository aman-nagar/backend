// client.js
import http from "http";

const clientRequest = http.request({
  method: "POST",
  hostname: "192.168.31.184",
  port: 4000,
});

console.log(clientRequest);
clientRequest.write("Hii i am client");
