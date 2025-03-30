// 10_Networking-with-core-node.js/25_seperating-client-and-server-code/client/src/App.jsx
import React, { useEffect, useState } from "react";

export default function App() {
  // http://[2409:40e3:308b:186:b51e:2dba:b203:61e0]:4000/
  // with this url we can access this site from anywhere
  const URL = "http://[2409:40e3:308b:186:b51e:2dba:b203:61e0]:4000/";
  const [directoryItems, setDirectoryItems] = useState([]);
  const [progress, setProgress] = useState(0);
  const [newFileName, setNewFileName] = useState("");

  async function getDirectoryItems() {
    const response = await fetch(URL);
    const data = await response.json();
    setDirectoryItems(data);
  }
  useEffect(() => {
    getDirectoryItems();
  }, [getDirectoryItems]);
  function uploadFile(e) {
    const file = e.target.files[0];
    const xhr = new XMLHttpRequest();
    xhr.open("POST", URL, true);
    xhr.setRequestHeader("filename", file.name);
    xhr.addEventListener("load", (e) => {
      console.log(e);
      console.log(xhr.response);
    });
    xhr.upload.addEventListener("progress", (e) => {
      const totalProgress = (e.loaded / e.total) * 100;
      setProgress(totalProgress.toFixed(2));
    });
    xhr.send(file);
  }
  async function handleDelete(fileName) {
    const response = await fetch(URL, {
      method: "DELETE",
      body: fileName,
    });
    console.log(fileName);
    const data = await response.text();
    console.log(data);
  }
  async function renameFileName(oldFileName) {
    console.log({ oldFileName, newFileName });
    setNewFileName(oldFileName);
  }
  async function saveFileName(oldFileName) {
    setNewFileName(oldFileName);
    const response = await fetch(URL, {
      method: "PATCH",
      body: JSON.stringify({ oldFileName, newFileName }),
    });
    const data = await response.text();
    console.log(data);
    setNewFileName("");
  }
  return (
    <div>
      <h1>My Files</h1>
      <input type="file" onChange={uploadFile} />
      <input
        type="text"
        onChange={(e) => setNewFileName(e.target.value)}
        value={newFileName}
      />
      <p>Progress: {progress} %</p>
      {directoryItems.map((item, index) => (
        <div key={index}>
          {item}
          <a href={`${URL}${item}?action=open`}>Open</a>
          <a href={`${URL}${item}?action=download`}>Download</a>
          <button onClick={() => renameFileName(item)}>Rename</button>
          <button onClick={() => saveFileName(item)}>Save</button>
          <button
            onClick={() => {
              handleDelete(item);
            }}
          >
            Delete
          </button>
          <br />
        </div>
      ))}
    </div>
  );
}
