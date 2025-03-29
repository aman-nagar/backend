import { CLIENT_RENEG_LIMIT } from "tls";

// 10_Networking-with-core-node.js/26_uploader/script.js
const input = document.querySelector("input");

input.addEventListener("change", async (e) => {
  const file = e.target.files[0];
  // Notice the URL now points to port 4000 (your backend)
  // const response = await fetch("http://127.0.0.1:4000/", {
  //   method: "POST",
  //   body: file,
  // });
  // const data = await response.text();
  // console.log(data);

  const xhr = new XMLHttpRequest()
  xhr.open("POST", "http://127.0.0.1:4000/", true);
  xhr.setRequestHeader("filename", file.name);
  xhr.addEventListener("load", (e) => {
    console.log(e);
    console.log(xhr.response);
  });
  xhr.upload.addEventListener("progress", (e) => {
    const totalProgress=(e.loaded / e.total) * 100
    console.log(`${totalProgress.toFixed(2)}%  Uploaded`);
  });
  xhr.send(file);
});
