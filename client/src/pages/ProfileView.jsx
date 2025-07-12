import { useState } from "react";

export default function ProfilePage() {
  const [user] = useState({
    name: "Esther Howard",
    email: "esther.howard@example.com",
    location: "Hubertusstraße 149, 41239 Mönchengladbach",
    phone: "02746565684",
    profilePic: "/profile.png",
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
    <div className="min-h-[91vh] w-[100vw] mx-auto p-6 bg-gray-50">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Profile</h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">Edit Profile</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Profile Card */}
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
          <div className="w-32 h-32 mb-4 rounded-full overflow-hidden border-4 border-blue-200">
            <img
              src={user.profilePic}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">{user.name}</h2>
          <p className="text-gray-600">{user.email}</p>
          <p className="text-gray-600">{user.location}</p>
          <p className="text-gray-600">{user.phone}</p>
          <div className="mt-2 text-yellow-500 font-medium">⭐ 5.0 (1)</div>
          <div className="mt-4 text-green-600 font-bold">♻️ Points: {user.points}</div>
        </div>

        {/* Exchange History */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Exchange History</h3>
          {exchangeHistory.length === 0 ? (
            <p className="text-gray-500">No exchanges yet.</p>
          ) : (
            <div className="space-y-4">
              {exchangeHistory.map((ex) => (
                <div key={ex.id} className="flex items-center justify-between bg-gray-100 rounded p-3">
                  <div>
                    <p className="font-medium text-gray-700">{ex.item}</p>
                    <p className="text-sm text-gray-500">{ex.date}</p>
                  </div>
                  <p
                    className={`font-bold ${
                      ex.points.startsWith("+") ? "text-green-600" : "text-red-500"
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
