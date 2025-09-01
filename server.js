// ❌ Smell #1: ตัวแปรไม่ได้ใช้
const unused = 42;

const express = require("express");
const app = express();
const PORT = 4000;

// ❌ Smell #2: console.log ใน production code
console.log("Booting server for lab...");

app.get("/", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
