import React, { useEffect, useState } from "react";
import axios from "axios";

export default function BackerDashboard() {
  const [pledges, setPledges] = useState([]);

  useEffect(() => {
    const fetchPledges = async () => {
      const token = localStorage.getItem("access_token");

      try {
        const response = await axios.get("http://127.0.0.1:8000/api/pledges/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPledges(response.data);
      } catch (error) {
        console.error("Failed to fetch pledges:", error);
      }
    };

    fetchPledges();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto font-sans">
      <h1 className="text-2xl font-bold mb-6">Backer Dashboard</h1>

      {pledges.length === 0 ? (
        <p>You haven’t backed any projects yet.</p>
      ) : (
        <div className="space-y-6">
          {pledges.map((pledge) => (
            <div
              key={pledge.id}
              className="border rounded-md p-4 shadow-sm bg-white"
            >
              <h2 className="text-lg font-semibold text-gray-800">
                Project: {pledge.project_title || "Unknown"}
              </h2>
              <p className="text-gray-600">
                Reward: {pledge.reward_title || "No reward selected"}
              </p>
              <p className="text-gray-600">Amount: ${pledge.amount}</p>
              <p className="text-sm text-gray-500">
                Date: {new Date(pledge.created_at).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
