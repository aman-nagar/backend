import { rename, copyFile } from "node:fs/promises";

// await rename("image.png", "changed.png");
await copyFile("image.png", "copy.png");

console.log("renamed");
