require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = process.env.PORT || 5000;
const SECRET = "supersecretkey"; // Bisa pakai .env

app.use(cors());
app.use(bodyParser.json());

// ✅ Fungsi untuk mengambil data dari data.json
const loadData = () => {
  const data = fs.readFileSync("data.json", "utf8");
  return JSON.parse(data);
};

// API Home
app.get("/", (req, res) => {
  res.send("Server Express berjalan!");
});

// **LOGIN API** (Tanpa bcrypt)
app.post("/api/auth/login", (req, res) => {
  console.log("Request masuk ke backend:", req.body);

  const { identifier, password } = req.body;

  try {
    const data = loadData();
    const users = data.users;

    if (!Array.isArray(users)) {
      return res.status(500).json({ message: "Format data.json salah!" });
    }

    // ✅ Cari user berdasarkan email atau nim
    const user = users.find(u => u.email === identifier || u.nim === identifier);
    if (!user) {
      return res.status(400).json({ message: "User tidak ditemukan!" });
    }

    // ✅ Cek password tanpa bcrypt
    if (user.password !== password) {
      return res.status(400).json({ message: "Password salah!" });
    }

    // ✅ Buat token JWT (opsional)
    const token = jwt.sign({ id: user.nim, email: user.email }, SECRET, { expiresIn: "1h" });

    res.json({ message: "Login sukses!", token });

  } catch (error) {
    console.error("❌ Error saat login:", error);
    res.status(500).json({ message: "Terjadi kesalahan server!" });
  }
});

app.get("/api/users", (req, res) => {
  try {
    const data = loadData();
    res.json(data.users);
  } catch (error) {
    res.status(500).json({ message: "Gagal membaca data" });
  }
});

// **DASHBOARD API**
app.get("/api/dashboard", (req, res) => {
  try {
    const data = loadData();
    res.json(data.dashboard);
  } catch (error) {
    res.status(500).json({ message: "Gagal membaca data" });
  }
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
