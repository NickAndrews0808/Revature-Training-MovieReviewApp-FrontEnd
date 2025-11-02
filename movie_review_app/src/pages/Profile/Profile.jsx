// src/pages/Profile/Profile.jsx
import React, { useState } from "react";
import "../Dashboard/Dashboard.css"; // reuse same styling
import '../Profile/Profile.css'

const Profile = () => {
  // Example user data (can later come from API or login)
    const [user, setUser] = useState({
        name: "John Doe",
        email: "john.doe@example.com",
        role: "Game Designer",
        joined: "Jan 2024",
    });

    return (
        <div className="container mt-5">
        <h2 className="text-center mb-4 text-primary">User Profile</h2>

        <div className="card shadow-lg p-4 border-0 rounded-4 mx-auto profile-card" style={{ maxWidth: "600px" }}>
            <div className="d-flex flex-column align-items-center text-center">
            <img
                src="/images/Profile.jpg"
                alt="User Avatar"
                className="rounded-circle mb-3 border border-3 border-primary"
                style={{ width: "120px", height: "120px" }}
            />
            <h4 className="fw-bold"style={{ fontSize: "1.8rem" }}>{user.name}</h4>
            <p className="text-muted" style={{ fontSize: "1.8rem" }}>{user.role}</p>
            </div>

            <hr />

            <div className="mt-3">
            <p style={{ fontSize: "1.8rem" }}><strong>Email:</strong> {user.email}</p>
            <p style={{ fontSize: "1.8rem" }}><strong>Member Since:</strong> {user.joined}</p>
            </div>

            <div className="text-center mt-4">
            <button
                className="btn btn-outline-primary px-4 rounded-pill"
                onClick={() => alert("Profile editing coming soon!")}
            >
                Edit Profile
            </button>
            </div>
        </div>
        </div>
    );
};
export default Profile;