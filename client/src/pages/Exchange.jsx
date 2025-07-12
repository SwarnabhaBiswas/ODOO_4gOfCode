import { useEffect, useState, useRef } from "react";
import axios from "axios";
import ItemCard from "../Components/ItemCard";

const API = "http://localhost:5000";

export default function Exchange() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    title: "",
    category: "",
    size: "",
    condition: "",
  });
  const [file, setFile] = useState(null);
  const [editId, setEditId] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [pendingData, setPendingData] = useState(null);

  const fileInputRef = useRef(null);

  const confirmAdd = async () => {
  if (!pendingData) return;

  await axios.post(`${API}/items`, pendingData);

  setForm({
    title: "",
    category: "",
    size: "",
    condition: "",
    price: "",
    want: "",
  });
  setFile(null);
  if (fileInputRef.current) fileInputRef.current.value = ""; // ✅ Clear it here
  setPendingData(null);
  setShowConfirm(false);
  fetchItems();
};


  const fetchItems = async () => {
    const res = await axios.get(`${API}/items`);
    setItems(res.data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.entries(form).forEach(([key, val]) => data.append(key, val));
    if (file) data.append("image", file);

    setPendingData(data);
    setShowConfirm(true);
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API}/items/${id}`);

    if (editId === id) {
      setEditId(null);
      setForm({ title: "", category: "", size: "", condition: "" });
      setFile(null);
    }

    fetchItems();
  };

  const toggleListed = async (id, currentStatus) => {
    await axios.put(`${API}/items/${id}`, { listed: !currentStatus });
    fetchItems();
  };

  const toggleSold = async (id, currentStatus) => {
    await axios.put(`${API}/items/${id}`, { sold: !currentStatus });
    fetchItems();
  };

  const handleEdit = (item) => {
    setEditId(item.id);
    setForm({
      title: item.title,
      category: item.category,
      size: item.size,
      condition: item.condition,
    });
    setFile(null);
  if (fileInputRef.current) fileInputRef.current.value = ""; 

  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const confirm = window.confirm(
      "Are you sure you want to update this item?"
    );
    if (!confirm) return;

    const data = new FormData();
    Object.entries(form).forEach(([key, val]) => data.append(key, val));
    if (file) data.append("image", file);

    await axios.put(`${API}/items/${editId}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    setEditId(null);
    setForm({
      title: "",
      category: "",
      size: "",
      condition: "",
      price: "",
      want: "",
    });
    setFile(null);
    fetchItems();
  };

  return (
    <div className="min-h-[91vh] w-[100vw] bg-gray-50 p-6 font-sans">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
          Community Clothing Exchange
        </h1>

        <div className="bg-white shadow-md rounded-lg p-6 max-w-2xl mx-auto mb-12">
          <form
            onSubmit={editId ? handleUpdate : handleSubmit}
            className="space-y-4"
          >
            <input
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200 bg-white text-gray-900"
              placeholder="Title"
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
            <select
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200 bg-white text-gray-900"
              required
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            >
              <option value="">Select Category</option>
              <option value="Shirts">Shirts</option>
              <option value="Pants">Pants</option>
              <option value="Dresses">Dresses</option>
              <option value="Shoes">Shoes</option>
              <option value="Accessories">Accessories</option>
              <option value="Outerwear">Outerwear</option>
              <option value="Other">Other</option>
            </select>
            <select
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200 bg-white text-gray-900"
              required
              value={form.size}
              onChange={(e) => setForm({ ...form, size: e.target.value })}
            >
              <option value="">Select Size</option>
              <option value="XS">XS</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="XL">XL</option>
              <option value="XXL">XXL</option>
            </select>
            <input
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200 bg-white text-gray-900"
              placeholder="Condition"
              required
              value={form.condition}
              onChange={(e) => setForm({ ...form, condition: e.target.value })}
            />
            <input
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200 bg-white text-gray-900"
              placeholder="Price"
              type="number"
              min="0"
              step="0.01"
              required
              value={form.price || ""}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
            />
            <input
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200 bg-white text-gray-900"
              placeholder="What do you want in exchange? (optional)"
              value={form.want || ""}
              onChange={(e) => setForm({ ...form, want: e.target.value })}
            />
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              required
              className="w-full text-sm bg-white text-gray-900"
              onChange={(e) => setFile(e.target.files[0])}
            />

            <div className="flex gap-4">
              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
              >
                {editId ? "Update Item" : "Add Item"}
              </button>
              {editId && (
                <button
                  type="button"
                  className="flex-1 bg-gray-400 text-white py-2 rounded hover:bg-gray-500 transition"
                  onClick={() => {
                    setEditId(null);
                    setForm({
                      title: "",
                      category: "",
                      size: "",
                      condition: "",
                      price: "",
                      want: "",
                    });
                    setFile(null);
                    if (fileInputRef.current) fileInputRef.current.value = "";
                  }}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {items.map((item) => (
            <ItemCard
              key={item.id}
              item={item}
              API={API}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onToggleListed={toggleListed}
              onToggleSold={toggleSold}
            />
          ))}
        </div>
      </div>
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md text-center">
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              Confirm Item Submission
            </h2>
            <ul className="mb-6 text-gray-600 text-left list-disc pl-6">
              <li>
                <span className="font-semibold">Vibe Check:</span> Is this
                something you would still wear or gift to a stylish friend? If
                yes, you're golden.
              </li>
              <li>
                <span className="font-semibold">🧼 Clean & Crisp:</span> Freshly
                washed, no funky smells. Think “Sunday best,” not “forgotten gym
                bag.”
              </li>
              <li>
                <span className="font-semibold">🔍 No Drama, No Damage:</span>{" "}
                No tears, stains, missing buttons, or mystery holes—unless it's
                intentional and fashionably distressed.
              </li>
              <li>
                <span className="font-semibold">📸 Photo-Ready:</span> Good
                lighting. Whole item visible. Bonus points for styling it!
              </li>
              <li>
                <span className="font-semibold">🔖 Details Matter:</span>{" "}
                Mention the brand, size, condition, and any quirks. If it runs
                small or fits oversized, help your fellow swappers out!
              </li>
            </ul>
            <div className="flex justify-center gap-4">
              <button
                onClick={confirmAdd}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Confirm
              </button>
              <button
                onClick={() => {
                  setShowConfirm(false);
                  setPendingData(null);
                  if (fileInputRef.current) fileInputRef.current.value = "";
                }}
                className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
