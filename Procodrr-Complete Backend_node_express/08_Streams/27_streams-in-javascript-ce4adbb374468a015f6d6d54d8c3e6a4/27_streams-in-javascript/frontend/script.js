const input = document.querySelector("input");

input.addEventListener("change", async () => {
  const file = input.files[0];
  const readStream = file.stream();

  const reader = readStream.getReader();
  const result = await reader.read();
   // const str = await file.text();
  // console.log(str);
});
