const express = require("express");
const app = express();
const PORT = 4000;

// ❌ ตัวอย่าง 1: สตริงซ้ำ + console.log ใน production (Smell)
const MSG_OK = "OK"; // ตั้งใจซ้ำค่าเดิมหลายครั้ง
console.log("Server starting..."); // Sonar ชอบเตือน S106

app.get("/", (req, res) => {
  const unused = 123; // ❌ ตัวแปรไม่ได้ใช้ (Smell)
  res.json({ status: MSG_OK, message: "Hello from API" });
});

// ❌ ตัวอย่าง 2: ใช้ == แทน === (Bug/Smell)
app.get("/id/:id", (req, res) => {
  // ตั้งใจทำให้เกิด loose equality
  if (req.params.id == 0) {
    return res.status(400).json({ error: "Invalid id" });
  }
  res.json({ id: req.params.id });
});

// ❌ ตัวอย่าง 3: catch ว่างเปล่า (Bug/Smell)
app.get("/parse", (req, res) => {
  try {
    JSON.parse("{ invalid json }");
  } catch (e) {
    // do nothing on purpose
  }
  res.json({ parsed: false });
});

// ❌ ตัวอย่าง 4: กำหนดค่าแล้วไม่ใช้ (Smell)
function noisy(x) {
  let y = x + 1; // ไม่ได้ใช้ y
  return x;
}

// ❌ ตัวอย่าง 5: duplicate string literals หลายตำแหน่ง (Smell)
const COMMON = "SAME_TEXT";
app.get("/dup1", (_, res) => res.send(COMMON));
app.get("/dup2", (_, res) => res.send(COMMON));

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`); // S106 อีกจุด
});
