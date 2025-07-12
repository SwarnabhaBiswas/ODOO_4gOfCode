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
    price: "",
    want: "",
  });
  const [file, setFile] = useState(null);
  const [editId, setEditId] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [pendingData, setPendingData] = useState(null);

  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const res = await axios.get(`${API}/items`);
    setItems(res.data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.entries(form).forEach(([key, val]) => data.append(key, val));
    if (file) data.append("image", file);

    setPendingData(data);
    setShowConfirm(true);
  };

  const confirmAdd = async () => {
    if (!pendingData) return;

    await axios.post(`${API}/items`, pendingData);
    resetForm();
    fetchItems();
  };

  const resetForm = () => {
    setForm({
      title: "",
      category: "",
      size: "",
      condition: "",
      price: "",
      want: "",
    });
    setFile(null);
    setEditId(null);
    setPendingData(null);
    setShowConfirm(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleEdit = (item) => {
    setEditId(item.id);
    setForm({
      title: item.title,
      category: item.category,
      size: item.size,
      condition: item.condition,
      price: item.price || "",
      want: item.want || "",
    });
    if (fileInputRef.current) fileInputRef.current.value = "";
    setFile(null);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const confirm = window.confirm("Are you sure you want to update this item?");
    if (!confirm) return;

    const data = new FormData();
    Object.entries(form).forEach(([key, val]) => data.append(key, val));
    if (file) data.append("image", file);

    await axios.put(`${API}/items/${editId}`, data);
    resetForm();
    fetchItems();
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API}/items/${id}`);
    if (editId === id) resetForm();
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

  return (
    <div className="min-h-[91vh] w-screen bg-gray-50 p-6 font-sans">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
          Community Clothing Exchange
        </h1>

        {/* FORM */}
        <div className="bg-white shadow-md rounded-lg p-6 max-w-2xl mx-auto mb-12">
          <form
            onSubmit={editId ? handleUpdate : handleSubmit}
            className="space-y-4"
          >
            <input
              className="w-full px-4 py-2 border rounded-md"
              placeholder="Title"
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
            <select
              className="w-full px-4 py-2 border rounded-md"
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
              className="w-full px-4 py-2 border rounded-md"
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
              className="w-full px-4 py-2 border rounded-md"
              placeholder="Condition"
              required
              value={form.condition}
              onChange={(e) => setForm({ ...form, condition: e.target.value })}
            />
            <input
              className="w-full px-4 py-2 border rounded-md"
              placeholder="Price"
              type="number"
              min="0"
              required
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
            />
            <input
              className="w-full px-4 py-2 border rounded-md"
              placeholder="What do you want in exchange? (optional)"
              value={form.want}
              onChange={(e) => setForm({ ...form, want: e.target.value })}
            />
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              required={!editId}
              className="w-full text-sm"
              onChange={(e) => setFile(e.target.files[0])}
            />

            <div className="flex gap-4">
              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              >
                {editId ? "Update Item" : "Add Item"}
              </button>
              {editId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 bg-gray-400 text-white py-2 rounded hover:bg-gray-500"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* ITEM GRID */}
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {items.map((item) => (
            <ItemCard
              key={item.id}
              item={item}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onToggleListed={toggleListed}
              onToggleSold={toggleSold}
              API={API}
            />
          ))}
        </div>
      </div>

      {/* Confirmation Dialog */}
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md text-center">
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              Confirm Item Submission
            </h2>
            <ul className="mb-6 text-gray-600 text-left list-disc pl-6 text-sm">
              <li><strong>Clean & wearable</strong> clothing only.</li>
              <li><strong>No tears or stains</strong> unless intentional.</li>
              <li><strong>Photo must be clear</strong> with the full item visible.</li>
              <li><strong>Include all details:</strong> brand, fit, quirks.</li>
            </ul>
            <div className="flex justify-center gap-4">
              <button
                onClick={confirmAdd}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Confirm
              </button>
              <button
                onClick={resetForm}
                className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
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
