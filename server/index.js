const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

let items = [];

app.get("/items", (req, res) => {
  res.json(items);
});

app.post("/items", upload.single("image"), (req, res) => {
  const { title, category, size, condition } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : null;

  const newItem = {
    id: Date.now(),
    title,
    category,
    size,
    condition,
    image,
  };
  items.push(newItem);
  res.status(201).json(newItem);
});

app.delete("/items/:id", (req, res) => {
  const id = parseInt(req.params.id);
  items = items.filter(item => item.id !== id);
  res.sendStatus(204);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
