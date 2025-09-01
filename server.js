const express = require("express");
const app = express();
const PORT = 4000;

app.get("/", (req, res) => {
  res.json({ status: "ok", message: "Hello from API" });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});