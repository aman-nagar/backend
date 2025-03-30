import { readFile, writeFile } from "fs/promises";

async function decodeBase64ToImage(base64FilePath, outputImagePath) {
try {
// Read the Base64-encoded file
const base64Data = await readFile(base64FilePath, "utf-8");

    // Decode Base64 and write it to a new binary file
    await writeFile(outputImagePath, base64Data, "base64");

    console.log(`Image successfully decoded and saved as ${outputImagePath}`);

} catch (error) {
console.error("Error decoding Base64 to image:", error);
}
}

// Example usage
decodeBase64ToImage("new-image.txt", "decoded-image.jpg");
