// 10_Networking-with-core-node.js/25_seperating-client-and-server-code/client/src/App.jsx
import React, { useEffect, useState } from "react";

export default function App() {
  const [directoryItems, setDirectoryItems] = useState([]);

  async function getDirectoryItems() {
    const response = await fetch("http://192.168.31.184:4000/");
    const data = await response.json();
    setDirectoryItems(data);
  }
  useEffect(() => {
    getDirectoryItems();
  });
  return (
    <div>
      <h1>My Files</h1>
      {directoryItems.map((item, index) => (
        <div key={index}>
          {item}
          <a href={`http://192.168.31.184:4000/${item}?action=open`}>Open</a>
          <a href={`http://192.168.31.184:4000/${item}?action=download`}>
            Download
          </a>
          <br />
        </div>
      ))}
    </div>
  );
}
