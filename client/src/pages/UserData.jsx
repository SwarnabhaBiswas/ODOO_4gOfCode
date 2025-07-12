import { useState } from "react";
import "./UserData.css";

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
    <div className="userdata-container">
      <h2 className="userdata-title">📋 Add User Data</h2>

      <form onSubmit={handleSubmit} className="userdata-form">
        {/* Profile Picture Upload */}
        <div className="image-upload-wrapper">
          <input
            type="file"
            id="profilePicInput"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
          <label htmlFor="profilePicInput" className="image-upload-label">
            <img
              src={
                user.profilePic
                  ? user.profilePic
                  : "https://via.placeholder.com/100x100.png?text=Upload"
              }
              alt="Profile Preview"
              className="image-upload-preview"
            />
            <div className="image-upload-overlay">Upload</div>
          </label>
        </div>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={user.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={user.location}
          onChange={handleChange}
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={user.phone}
          onChange={handleChange}
        />

        <button type="submit">Submit</button>
      </form>

      {userList.length > 0 && (
        <div className="userlist-container">
          <h3 className="userlist-title">👥 User List</h3>
          {userList.map((u, index) => (
            <div className="user-card" key={index}>
              <img src={u.profilePic} alt={u.name} />
              <div>
                <p className="name">{u.name}</p>
                <p className="location">{u.location}</p>
                <p className="phone">{u.phone}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
