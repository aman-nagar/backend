import { readFile, writeFile } from "fs/promises";

async function handleImage(action, inputPath, outputPath) {
try {
if (action === "encode") {
// Read the image file and convert it to Base64
const bufferData = await readFile(inputPath);
const base64Data = bufferData.toString("base64");
await writeFile(outputPath, base64Data);
console.log(`Image successfully encoded and saved as Base64 in ${outputPath}`);
} else if (action === "decode") {
// Read the Base64 file and convert it back to binary
const base64Data = await readFile(inputPath, "utf-8");
await writeFile(outputPath, base64Data, "base64");
console.log(`Base64 successfully decoded and saved as image in ${outputPath}`);
} else {
console.error("Invalid action. Use 'encode' or 'decode'.");
}
} catch (error) {
console.error("Error processing the image:", error);
}
}

// Example usage
// Encoding an image
handleImage("encode", "aman-profile.jpg", "encoded-image.txt");

// Decoding the Base64 back to an image
handleImage("decode", "encoded-image.txt", "decoded-image.jpg");
