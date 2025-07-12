export default function ItemCard({
  item,
  onEdit,
  onDelete,
  onToggleListed,
  onToggleSold,
}) {
  return (
    <div className="bg-white shadow-md p-4 rounded-lg">
      <img
  src={`http://localhost:5000${item.image.startsWith('/') ? item.image : `/${item.image}`}`}
  alt={item.title}
  className="w-full h-60 object-cover rounded mb-2"
/>
      <h3 className="mt-2 text-lg font-bold">{item.title}</h3>
      <p>
        {item.category} · {item.size}
      </p>
      <p>Condition: {item.condition}</p>
      <p>Price: ₹{item.price}</p>
      {item.want && <p>Wants: {item.want}</p>}
      {console.log("Image Path:", item.image)}

      {/* Show controls only if passed as props */}
      {(onEdit || onDelete || onToggleListed || onToggleSold) && (
        <div className="mt-4 space-x-2">
          {onEdit && (
            <button onClick={() => onEdit(item)} className="btn">
              Edit
            </button>
          )}
          {onDelete && (
            <button onClick={() => onDelete(item.id)} className="btn">
              Delete
            </button>
          )}
        </div>
      )}
    </div>
  );
}
