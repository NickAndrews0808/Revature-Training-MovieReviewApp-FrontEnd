// src/pages/Profile/Profile.jsx
import React, { useState } from "react";
import "../Dashboard/Dashboard.css"; // reuse same styling
import '../Profile/Profile.css'

const Profile = () => {
  // Example user data (can later come from API or login)
    const [user, setUser] = useState({
        name: "Justin Chen",
        email: "justin.chen@example.com",
        role: "Game Designer",
        joined: "Jan 2024",
    });

    return (
        <div className="dashboard-container">
        <h2>User Profile</h2>

        <div className="profile-card">
            <div className="profile-avatar">
            <img
                src="https://via.placeholder.com/120"
                alt="User Avatar"
                className="avatar"
            />
            </div>

            <div className="profile-info">
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> {user.role}</p>
            <p><strong>Member Since:</strong> {user.joined}</p>
            </div>
        </div>

        <button
            className="edit-btn"
            onClick={() => alert("Profile editing coming soon!")}
        >
            Edit Profile
        </button>
        </div>
    );
};
export default Profile;