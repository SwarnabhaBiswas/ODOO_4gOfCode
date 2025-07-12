import { useState } from "react";

export default function UserData() {
  const [user, setUser] = useState({
    name: "",
    location: "",
    phone: "",
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
        profilePic: reader.result, // base64 image string
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
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-bold text-center">📋 Add User Data</h2>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md p-6 rounded-2xl space-y-4"
      >
        {/* Profile Pic Upload */}
        <div className="flex justify-center">
          <input
            type="file"
            id="profilePicInput"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />

          <label htmlFor="profilePicInput" className="cursor-pointer group">
            <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-blue-500 hover:border-blue-700 transition duration-200">
              <img
                src={
                  user.profilePic
                    ? user.profilePic
                    : "https://via.placeholder.com/100x100.png?text=Upload"
                }
                alt="Profile Preview"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-sm font-medium transition">
                Upload
              </div>
            </div>
          </label>
        </div>

        {/* Name */}
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={user.name}
          onChange={handleChange}
          className="w-full border p-2 rounded-md"
        />

        {/* Location */}
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={user.location}
          onChange={handleChange}
          className="w-full border p-2 rounded-md"
        />

        {/* Phone */}
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={user.phone}
          onChange={handleChange}
          className="w-full border p-2 rounded-md"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
        >
          Submit
        </button>
      </form>

      {/* Display Users */}
      {userList.length > 0 && (
        <div className="bg-gray-50 p-4 rounded-xl shadow-inner">
          <h3 className="text-xl font-semibold mb-4">👥 User List</h3>
          <div className="space-y-4">
            {userList.map((u, index) => (
              <div
                key={index}
                className="flex items-center space-x-4 bg-white p-3 rounded-md shadow"
              >
                <img
                  src={u.profilePic}
                  alt={u.name}
                  className="w-14 h-14 rounded-full object-cover border"
                />
                <div>
                  <p className="font-bold">{u.name}</p>
                  <p className="text-sm text-gray-600">{u.location}</p>
                  <p className="text-sm text-gray-600">{u.phone}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
