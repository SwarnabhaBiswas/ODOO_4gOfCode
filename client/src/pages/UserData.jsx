import { useState } from "react";

export default function UserData() {
  const [user, setUser] = useState({
    name: "",
    location: "",
    phone: "</div>",
    profilePic: "",
  });

  const [userList, setUserList] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setUser((prev) => ({
        ...prev,
        profilePic: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, location, phone, profilePic } = user;

    if (!name || !location || !phone || !profilePic) {
      alert("Please fill all fields and upload a picture.");
      return;
    }

    setUserList((prev) => [...prev, user]);

    setUser({
      name: "",
      location: "",
      phone: "",
      profilePic: "",
    });

    document.getElementById("profilePicInput").value = "";
  };

  return (
    <div className="min-h-[91vh] w-[100vw] flex items-center justify-center bg-gradient-to-br from-white via-green-100 to-green-700 overflow-hidden">
      <div className="w-full max-w-md mx-auto  p-8 bg-white rounded-2xl shadow-2xl border border-green-200">
        <h2 className="text-3xl font-extrabold mb-8 flex items-center gap-2 justify-center text-green-700">
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col items-center mb-4">
            <input
              type="file"
              id="profilePicInput"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <label htmlFor="profilePicInput" className="relative cursor-pointer group ">
              <img
                src={
                  user.profilePic
                    ? user.profilePic
                    : "https://via.placeholder.com/100x100.png?text=Upload"
                }
                alt="Profile Preview"
                className=" w-28 h-28 rounded-full object-cover border-4 border-green-200 shadow"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 rounded-full transition-opacity">
                <span className="text-green-900 font-semibold">Upload</span>
              </div>
            </label>
            <p className="mt-2 text-sm text-green-500">Add Picture</p>
          </div>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={user.name}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 bg-green-50"
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={user.location}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 bg-green-50"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={user.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 bg-green-50"
          />

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-green-500 to-green-700 text-white rounded-lg font-semibold hover:from-green-600 hover:to-green-800 transition shadow"
          >
            Submit
          </button>
        </form>

        {userList.length > 0 && (
          <div className="mt-10">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-green-700">
              <span>👥</span> User List
            </h3>
            <div className="space-y-4">
              {userList.map((u, index) => (
                <div
                  className="flex items-center gap-4 p-4 bg-green-50 rounded-xl shadow border border-green-200"
                  key={index}
                >
                  <img
                    src={u.profilePic}
                    alt={u.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-green-200"
                  />
                  <div>
                    <p className="font-semibold text-lg text-green-800">{u.name}</p>
                    <p className="text-green-600">{u.location}</p>
                    <p className="text-green-500">{u.phone}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
