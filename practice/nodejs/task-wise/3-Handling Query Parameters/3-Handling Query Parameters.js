//Handling Query Parameters

// Modify your server to handle requests with query parameters:
// Route: /greet?name=John → Respond: "Hello, John!"
// If no name is provided, respond: "Hello, Guest!"
import http from "http";

const PORT = 3000;

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);

  if (url.pathname === "/greet") {
    const name = url.searchParams.get("name") || "Guest";
    res.end(`Hello, ${name}!`);
  } else {
    res.end("Hello, Guest!");
  }
});

server.listen(PORT, () => {
  console.log("Server running at http://localhost:" + PORT);
});
