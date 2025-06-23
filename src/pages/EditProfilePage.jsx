import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function EditProfilePage() {
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({ username: "", email: "", bio: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    axios
      .get("/api/me/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setProfile(res.data);
        setForm({
          username: res.data.username || "",
          email: res.data.email || "",
          bio: res.data.bio || "",
        });
      });
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put("/api/me/", form, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then(() => {
        setMessage("Profile updated!");
        setTimeout(() => navigate("/profile"), 1000);
      })
      .catch(() => setMessage("Update failed."));
  };

  if (!profile) return <div className="p-6">Loading...</div>;

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Username</label>
          <input
            className="w-full p-2 border rounded"
            name="username"
            value={form.username}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block mb-1">Email</label>
          <input
            className="w-full p-2 border rounded"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block mb-1">Bio</label>
          <textarea
            className="w-full p-2 border rounded"
            name="bio"
            value={form.bio}
            onChange={handleChange}
            rows="3"
          />
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Save Changes
        </button>

        {message && <p className="text-sm mt-2">{message}</p>}
      </form>
    </div>
  );
}
