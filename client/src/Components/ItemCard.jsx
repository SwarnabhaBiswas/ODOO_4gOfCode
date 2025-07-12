// src/components/ItemCard.jsx
export default function ItemCard({ item, API, onEdit, onDelete, onToggleListed, onToggleSold }) {
return (
    <div className="border p-4 rounded shadow-sm bg-white flex flex-col justify-between text-gray-800">
        {item.image && (
            <img
                src={`${API}${item.image}`}
                alt={item.title}
                className="w-full h-60 object-cover rounded mb-2"
            />
        )}

        <h3 className="text-lg font-semibold">{item.title}</h3>
        <p><b>Category:</b> {item.category}</p>
        <p><b>Size:</b> {item.size}</p>
        <p><b>Condition:</b> {item.condition}</p>

        <div className="mt-2 flex flex-wrap gap-2">
            <span
                className={`px-2 py-1 rounded text-xs ${
                    item.listed ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                }`}
            >
                {item.listed ? "Listed" : "Not Listed"}
            </span>
            <span
                className={`px-2 py-1 rounded text-xs ${
                    item.sold ? "bg-red-100 text-red-700" : "bg-blue-100 text-blue-700"
                }`}
            >
                {item.sold ? "Sold" : "Available"}
            </span>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
            <button
                onClick={() => onEdit(item)}
                className="px-3 py-1 text-sm bg-yellow-500 text-white rounded hover:bg-yellow-600"
            >
                Edit
            </button>
            <button
                onClick={() => onDelete(item.id)}
                className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
            >
                Delete
            </button>
            <button
                onClick={() => onToggleListed(item.id, item.listed)}
                className="px-3 py-1 text-sm bg-gray-700 text-white rounded hover:bg-gray-800"
            >
                {item.listed ? "Unlist" : "List"}
            </button>
            <button
                onClick={() => onToggleSold(item.id, item.sold)}
                className="px-3 py-1 text-sm bg-purple-600 text-white rounded hover:bg-purple-700"
            >
                {item.sold ? "Mark Available" : "Mark Sold"}
            </button>
        </div>
    </div>
);
}
