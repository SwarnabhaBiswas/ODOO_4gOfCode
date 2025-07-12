import express from "express";
import cors from "cors";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { createClient } from "@supabase/supabase-js";



const supabaseUrl = 'https://rccushzngrtnozvgpiij.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJjY3VzaHpuZ3J0bm96dmdwaWlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIzMTE4MzUsImV4cCI6MjA2Nzg4NzgzNX0.Z6UzDGNoavi-EjwB0Hj6BMn9-M0fItOqAlakxw7A8TM'

export const supabase = createClient(supabaseUrl, supabaseKey)

const app = express();
const PORT = 5000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));


app.use(cors());
app.use(express.json());

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

let items = [];

app.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) return res.status(400).json({ error: error.message });
  res.status(200).json({ user: data.user });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return res.status(401).json({ error: error.message });
  res.status(200).json({ user: data.user, session: data.session });
});


app.get("/items", (req, res) => {
  res.json(items);
});

app.post("/items", upload.single("image"), (req, res) => {
  if (!req.body || Object.keys(req.body).length === 0) {
  return res.status(400).json({ error: "Request body is missing or invalid." });
}

const { title, category, size, condition, price, want } = req.body;

  const image = req.file ? `/uploads/${req.file.filename}` : null;

  const newItem = {
  id: Date.now(),
  title,
  category,
  size,
  condition,
  image,
  price,
  want,
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
