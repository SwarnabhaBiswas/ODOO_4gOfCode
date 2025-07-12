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
  listed: true,
  sold: false
};
  items.push(newItem);
  res.status(201).json(newItem);
});

app.put("/items/:id", upload.single("image"), (req, res) => {
  const id = parseInt(req.params.id);
  const item = items.find(i => i.id === id);
  if (!item) return res.status(404).send("Item not found");

  const { title, category, size, condition, listed, sold } = req.body;

  if (title !== undefined) item.title = title;
  if (category !== undefined) item.category = category;
  if (size !== undefined) item.size = size;
  if (condition !== undefined) item.condition = condition;
  if (listed !== undefined) item.listed = listed === "true" || listed === true;
  if (sold !== undefined) item.sold = sold === "true" || sold === true;

  if (req.file) {
    item.image = `/uploads/${req.file.filename}`; // ✅ Replace with new image
  }

  res.json(item);
});


app.delete("/items/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = items.findIndex(i => i.id === id);
  if (index === -1) return res.status(404).send("Item not found");

  items.splice(index, 1);
  res.sendStatus(204);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
