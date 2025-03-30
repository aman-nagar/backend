import http from "http";
import fs from "fs";

const PORT = 3000;

// Helper function to read and write JSON file
const readTodos = () => {
  if (fs.existsSync("todos.json")) {
    const data = fs.readFileSync("todos.json", "utf-8");
    return JSON.parse(data);
  }
  return [];
};

const writeTodos = (todos) => {
  fs.writeFileSync("todos.json", JSON.stringify(todos, null, 2));
};

// Create server
const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === "/todos" && method === "GET") {
    // Get all todos
    const todos = readTodos();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(todos));
  } else if (url === "/todos" && method === "POST") {
    // Add a new todo
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      const { title, description } = JSON.parse(body);
      if (!title || !description) {
        res.writeHead(400, { "Content-Type": "application/json" });
        return res.end(
          JSON.stringify({ message: "Title and Description are required" })
        );
      }

      const todos = readTodos();
      const newTodo = {
        id: todos.length ? todos[todos.length - 1].id + 1 : 1,
        title,
        description,
        completed: false,
      };
      todos.push(newTodo);
      writeTodos(todos);

      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(JSON.stringify(newTodo));
    });
  } else if (url.startsWith("/todos/") && method === "DELETE") {
    // Delete a todo by ID
    const id = parseInt(url.split("/")[2]);
    const todos = readTodos();
    const filteredTodos = todos.filter((todo) => todo.id !== id);

    if (todos.length === filteredTodos.length) {
      res.writeHead(404, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ message: "Todo not found" }));
    }

    writeTodos(filteredTodos);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Todo deleted successfully" }));
  } else if (url.startsWith("/todos/") && method === "PUT") {
    // Update a todo
    const id = parseInt(url.split("/")[2]);
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      const { completed, title, description } = JSON.parse(body);
      const todos = readTodos();
      const todoIndex = todos.findIndex((todo) => todo.id === id);

      if (todoIndex === -1) {
        res.writeHead(404, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ message: "Todo not found" }));
      }

      if (completed !== undefined) todos[todoIndex].completed = completed;
      if (title) todos[todoIndex].title = title;
      if (description) todos[todoIndex].description = description;

      writeTodos(todos);

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(todos[todoIndex]));
    });
  } else {
    // Handle unknown routes
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Route not found" }));
  }
});

// Start server
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
