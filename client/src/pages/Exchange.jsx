import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:5000";

export default function Exchange() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ title: "", category: "", size: "", condition: "" });
  const [file, setFile] = useState(null);

  const fetchItems = async () => {
    const res = await axios.get(`${API}/items`);
    setItems(res.data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(form).forEach(([key, val]) => data.append(key, val));
    if (file) data.append("image", file);

    await axios.post(`${API}/items`, data);
    setForm({ title: "", category: "", size: "", condition: "" });
    setFile(null);
    fetchItems();
  };

  return (
    <div className="app" style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Community Clothing Exchange</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
        <input
          placeholder="Title"
          required
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
        />
        <input
          placeholder="Category"
          required
          value={form.category}
          onChange={e => setForm({ ...form, category: e.target.value })}
        />
        <input
          placeholder="Size"
          required
          value={form.size}
          onChange={e => setForm({ ...form, size: e.target.value })}
        />
        <input
          placeholder="Condition"
          required
          value={form.condition}
          onChange={e => setForm({ ...form, condition: e.target.value })}
        />
        <input
          type="file"
          accept="image/*"
          onChange={e => setFile(e.target.files[0])}
        />
        <button type="submit">Add Item</button>
      </form>

      <div
        style={{
          display: "grid",
          gap: "1rem",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))"
        }}
      >
        {items.map(item => (
          <div key={item.id} style={{ border: "1px solid #ccc", padding: "1rem" }}>
            {item.image && (
              <img
                src={`${API}${item.image}`}
                alt={item.title}
                style={{ width: "100%" }}
              />
            )}
            <h3>{item.title}</h3>
            <p><strong>Category:</strong> {item.category}</p>
            <p><strong>Size:</strong> {item.size}</p>
            <p><strong>Condition:</strong> {item.condition}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
