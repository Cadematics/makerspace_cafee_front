import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function EditProfilePage() {
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({ username: "", email: "", bio: "" });
  const [message, setMessage] = useState("");
  const [usernameAvailable, setUsernameAvailable] = useState(true);

  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");

  const checkUsername = async (value) => {
    if (value.length < 3) return;
    try {
      const res = await axios.get(`/api/check-username/?username=${value}`);
      setUsernameAvailable(res.data.available);
    } catch {
      setUsernameAvailable(false);
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/me/", {
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
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    if (name === "username") {
      checkUsername(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:8000/api/me/", form, {
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
        {form.username && (
          <p
            className={`text-sm ${
              usernameAvailable ? "text-green-600" : "text-red-600"
            }`}
          >
            {usernameAvailable ? "Username is available" : "Username is taken"}
          </p>
        )}

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
