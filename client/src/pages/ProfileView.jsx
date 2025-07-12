import { useState } from "react";
import "./ProfilePage.css";

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
    <div className="profile-container">
      {/* Page Header */}
      <div className="profile-header">
        <h1 className="profile-title">Profile</h1>
        <button className="edit-button">Edit Profile</button>
      </div>

      <div className="profile-grid">
        {/* Profile Card */}
        <div className="profile-card">
          <div className="profile-image-wrapper">
            <img
              src={user.profilePic}
              alt="Profile"
              className="profile-image"
            />
          </div>
          <h2 className="profile-name">{user.name}</h2>
          <p className="profile-text">{user.email}</p>
          <p className="profile-text">{user.location}</p>
          <p className="profile-text">{user.phone}</p>
          <div className="profile-stars">⭐ 5.0 (1)</div>

          <div className="profile-points">♻️ Points: {user.points}</div>
        </div>

        {/* Exchange History */}
        <div className="history-card">
          <h3 className="history-title">Exchange History</h3>
          {exchangeHistory.length === 0 ? (
            <p className="history-empty">No exchanges yet.</p>
          ) : (
            <div className="space-y-4">
              {exchangeHistory.map((ex) => (
                <div key={ex.id} className="history-item">
                  <div>
                    <p className="history-item-name">{ex.item}</p>
                    <p className="history-item-date">{ex.date}</p>
                  </div>
                  <p
                    className={`history-item-points ${
                      ex.points.startsWith("+") ? "positive" : "negative"
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
