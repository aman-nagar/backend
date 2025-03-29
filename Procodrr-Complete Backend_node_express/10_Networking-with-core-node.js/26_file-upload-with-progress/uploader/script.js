// uploader/script.js
const input = document.querySelector("input");

input.addEventListener("change", async (e) => {
  const file = e.target.files[0];

  const xhr = new XMLHttpRequest();
  xhr.open("POST", "http://192.168.0.105/", true);
  xhr.setRequestHeader("filename", file.name);
  xhr.addEventListener("load", (e) => {
    console.log(xhr.response);
  });
  xhr.upload.addEventListener("progress", (e) => {
    const totalProgress = (e.loaded / e.total) * 100;
    console.log(`${totalProgress.toFixed(2)}% Uploaded`);
  });
  xhr.send(file);
});
