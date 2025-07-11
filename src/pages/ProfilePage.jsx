import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import api from "../axios"; // adjust path if needed

function ProfilePage() {
  const [userInfo, setUserInfo] = useState(null);
  const [myProjects, setMyProjects] = useState([]);
  const [myBackings, setMyBackings] = useState([]);
  const [error, setError] = useState("");

  const [profile, setProfile] = useState(null);
  const [activeTab, setActiveTab] = useState("created");

  const token = localStorage.getItem("access_token");

  // import api from "../axios"; // adju  st the path to your axios.js

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await api.get("me/");
        setUserInfo(response.data);
        console.log("User info", response.data);
      } catch (err) {
        setError("Failed to fetch user info");
        console.error(err);
      }
    };

    const fetchMyProjects = async () => {
      try {
        const response = await api.get("my-projects/");
        setMyProjects(response.data);
      } catch (err) {
        setError("Failed to fetch your projects");
        console.error(err);
      }
    };

    const fetchMyBackings = async () => {
      try {
        const response = await api.get("my-backings/");
        setMyBackings(response.data);
      } catch (err) {
        setError("Failed to fetch your backings");
        console.error(err);
      }
    };

    fetchUserInfo();
    fetchMyProjects();
    fetchMyBackings();
  }, []);

  // useEffect(() => {

  //   const fetchUserInfo = async () => {
  //     try {
  //       const response = await fetch("http://localhost:8000/api/me/", {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });

  //       if (!response.ok) throw new Error("Failed to fetch user info");

  //       const data = await response.json();
  //       setUserInfo(data);
  //     } catch (err) {
  //       setError(err.message);
  //     }
  //   };

  //   const fetchMyProjects = async () => {
  //     try {
  //       const response = await fetch("http://localhost:8000/api/my-projects/", {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });

  //       if (!response.ok) throw new Error("Failed to fetch your projects");

  //       const data = await response.json();
  //       setMyProjects(data);
  //     } catch (err) {
  //       setError(err.message);
  //     }
  //   };

  //   const fetchMyBackings = async () => {
  //     try {
  //       const response = await fetch("http://localhost:8000/api/my-backings/", {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });

  //       if (!response.ok) throw new Error("Failed to fetch your backings");

  //       const data = await response.json();
  //       setMyBackings(data);
  //     } catch (err) {
  //       setError(err.message);
  //     }
  //   };

  //   fetchMyBackings();
  //   fetchUserInfo();
  //   fetchMyProjects();
  // }, []);

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Header */}

      {userInfo && (
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            {/* Avatar (initials) */}
            {userInfo.avatar ? (
              <img
                src={userInfo.avatar}
                alt="Avatar"
                className="w-16 h-16 rounded-full object-cover"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center text-xl font-bold text-white">
                {userInfo.username.charAt(0).toUpperCase()}
              </div>
            )}

            {/* <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center text-xl font-bold text-white">
              {userInfo.username}
            </div> */}
            <div>
              <h2 className="text-2xl font-bold">{userInfo.username}</h2>
              <p className="text-gray-600">{userInfo.email}</p>
            </div>
          </div>

          <Link to="/profile/edit">
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
              Edit Profile
            </button>
          </Link>
        </div>
      )}

      {/* Divider */}
      <hr className="border-t border-gray-300 my-4" />

      {/* Bio Section */}

      {/* {console.log("user info:", userInfo.bio)} */}
      {userInfo && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-1">About Me</h3>
          <p className="text-gray-700">{userInfo.bio}</p>
        </div>
      )}

      {/* Divider */}
      <hr className="border-t border-gray-300 my-4" />

      {/* Tabs */}
      <div className="mb-4">
        <button
          className={`mr-4 px-3 py-1 rounded ${
            activeTab === "created" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("created")}
        >
          Created Projects
        </button>
        <button
          className={`px-3 py-1 rounded ${
            activeTab === "backed" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("backed")}
        >
          Backed Projects
        </button>
      </div>

      {/* Content */}
      {activeTab === "created" && (
        <div className="space-y-4">
          {myProjects.map((project) => (
            <div
              key={`created-${project.id}`}
              className="border p-4 rounded shadow-sm"
            >
              <h3 className="font-semibold text-lg">{project.title}</h3>
              <p className="text-sm text-gray-600">
                {project.description?.slice(0, 120)}...
              </p>
            </div>
          ))}
        </div>
      )}

      {activeTab === "backed" && (
        <div className="space-y-4">
          {myBackings.map((backing) => (
            <div
              key={`backing-${backing.backing_id}`}
              className="border p-4 rounded shadow-sm"
            >
              <h3 className="font-semibold text-lg">{backing.project_title}</h3>
              <p className="text-sm">Amount: ${backing.amount}</p>
              <p className="text-sm">Reward: {backing.reward}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
