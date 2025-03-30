import { readFile, writeFile } from "fs/promises";

// encoding
// const bufferData = await readFile("aman-profile.jpg");
// const baseValue = bufferData.toString("base64");
// writeFile("new-image.txt", baseValue);

// decoding
const base64Data = await readFile("new.txt", "utf-8");
await writeFile("new-img.jpg", base64Data, "base64");
