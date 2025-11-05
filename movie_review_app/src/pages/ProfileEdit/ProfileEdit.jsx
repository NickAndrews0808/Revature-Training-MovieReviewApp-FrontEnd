import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ProfileEdit.css";
import { userService } from "../../api/services/userService";

const ProfileEdit = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        username: localStorage.getItem("user_name"),
        email: localStorage.getItem("user_email"),
        id: localStorage.getItem("user_id")
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.id]: e.target.value,
        });
    };

    const userUpdate = async () => {
        setLoading(true);
        try {
            const response = await userService.updateUserDetails(user);
            localStorage.setItem("user_email",response.email);
            localStorage.setItem("user_name",response.username);
            localStorage.setItem("accessToken",response.accessToken);
            // localStorage.setItem();
            alert("Profile updated successfully!");
            setError("");
        } catch (error) {
            console.error(error);
            setError(error.message || "Failed to update user! Try again later!");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        userUpdate();
    };
    return (
        <>
            <div className="profile-edit-container">
                <form className="profile-edit-card" onSubmit={handleSubmit}>
                    <h2>Edit Profile</h2>
                    <p>Update your personal information below</p>

                    <label htmlFor="name">Name</label>
                    <input
                        id="username"
                        type="text"
                        value={user.username}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        required
                    />

                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        value={user.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        required
                    />
                    <div>
                        <button type="submit" className="update-button">
                            Update
                        </button>
                        <br />
                        <button type="button" className="back-button" onClick={() => navigate("/profile")}>
                            Back
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}
export default ProfileEdit;