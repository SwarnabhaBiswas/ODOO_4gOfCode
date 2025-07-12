import { useState } from "react";
// import { Pencil } from "lucide-react"; // Optional: for edit icon (install lucide-react)

export default function ProfilePage() {
  const [user] = useState({
    name: "Esther Howard",
    email: "esther.howard@example.com",
    location: "Hubertusstraße 149, 41239 Mönchengladbach",
    phone: "02746565684",
    profilePic: "/profile.png", // Replace with your actual path
    points: 0,
  });

  const [exchangeHistory] = useState([
    {
      id: 1,
      item: "Blue Denim Jacket",
      date: "12 Jul 2025",
      points: "+10",
    },
    {
      id: 2,
      item: "Floral Dress",
      date: "06 Jul 2025",
      points: "-5",
    },
  ]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Profile</h1>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
          Edit Profile
        </button>
      </div>

      {/* Profile Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="bg-white p-6 rounded-xl shadow-md text-center">
          <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-blue-500">
            <img
              src={user.profilePic}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-xl font-semibold mt-4">{user.name}</h2>
          <p className="text-gray-500 mt-1">{user.email}</p>
          <p className="text-gray-500">{user.location}</p>
          <p className="text-gray-500">{user.phone}</p>
          <div className="mt-4 text-yellow-500 text-lg">⭐ 5.0 (1)</div>
          <div className="mt-2 text-sm text-gray-400">Sponsored</div>
          <div className="mt-4 text-blue-600 font-medium">
            ♻️ Points: {user.points}
          </div>
          <button className="mt-6 text-red-500 text-sm underline">
            Close Account
          </button>
        </div>

        {/* Exchange History */}
        <div className="md:col-span-2 bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold mb-4">Exchange History</h3>
          {exchangeHistory.length === 0 ? (
            <p className="text-gray-500">No exchanges yet.</p>
          ) : (
            <div className="space-y-4">
              {exchangeHistory.map((ex) => (
                <div
                  key={ex.id}
                  className="flex justify-between p-4 bg-gray-50 rounded-lg shadow-sm"
                >
                  <div>
                    <p className="font-medium">{ex.item}</p>
                    <p className="text-sm text-gray-500">{ex.date}</p>
                  </div>
                  <p
                    className={`font-semibold ${
                      ex.points.startsWith("+")
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
                  >
                    {ex.points}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
