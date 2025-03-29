const fs = require("node:fs");
// const path = require("node:path");

// writefile
// fs.writeFile(file, data[, options], callback)

fs.writeFile("hey.txt", "file created hii", function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log("done");
  }
});

//append file
fs.appendFile("hey.txt", " append addded", function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log("done");
  }
});

//rename file
// fs.rename(oldPath, newPath, callback)

// fs.rename("hey.txt", "renamed_hey.txt", function (err) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("file renamed successful ");
//   }
// });

//copy file
// fs.copyFile(src, dest[, mode], callback)

// fs.copyFile("hey.txt", "./copied/copy.txt", function (err) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("copy successful");
//   }
// });

//delete file

// fs.unlink(path, callback)

// fs.unlink("hey.txt", function (err) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("removed");
//   }
// });

// delete folder
// bydefault it only can delete only empty folders
// for delete non-empty folder add recursive { recursive: true },
// fs.rmdir(path[, options], callback)

// fs.rm("./copied", { recursive: true }, function (err) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("removed folder");
//   }
// });

// create folder
// fs.mkdir(path[, options], callback)

// const path = "./test/new";
// fs.mkdir(path, { recursive: true }, function (err) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("folder created");
//   }
// });

// read file
// fs.readFile(path[, options], callback)

const path = "./test/read.txt"; // Path to the file you want to read

fs.readFile(path, "utf8", (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  } else {
    console.log("read done");
    console.log(data);
  }
});
