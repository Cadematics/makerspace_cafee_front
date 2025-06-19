import React, { useState } from "react";
import axios from "axios";

export default function RewardCard({ reward, projectId }) {
  const [showForm, setShowForm] = useState(false);
  const [amount, setAmount] = useState(reward.amount);
  const [message, setMessage] = useState("");

  console.log("the reward", reward);

  const handlePledge = async () => {
    try {
      const token = localStorage.getItem("access_token");
      console.log("the token", token);
      const response = await axios.post(
        "http://127.0.0.1:8000/api/pledges/",
        {
          amount: reward.amount,
          reward: reward.id,
          project: projectId,
          user: 2,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setMessage("✅ Pledge successful!");
    } catch (error) {
      console.error("Pledge failed:", error.response?.data || error.message);
      setMessage(
        "❌ " +
          (error.response?.data?.detail ||
            JSON.stringify(error.response?.data || "Failed to pledge."))
      );
    }
  };

  return (
    <div className="bg-white rounded-lg border shadow-md overflow-hidden mb-4">
      {/* Reward Image */}
      {reward.image && (
        <img
          src={reward.image}
          alt={reward.title}
          className="w-full h-48 object-cover"
        />
      )}

      {/* Reward Content */}
      <div className="p-4">
        <h3 className="text-lg font-bold mb-1">
          ${reward.amount} — {reward.title}
        </h3>

        <div className="text-sm text-gray-600 mb-2">
          <p>Ships to: Worldwide</p>
          <p>Estimated Delivery: July 2025</p>
          <p>Limited Quantity: 100</p>
        </div>

        {!showForm ? (
          <button
            onClick={() => setShowForm(true)}
            className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition text-sm"
          >
            Pledge ${reward.amount}
          </button>
        ) : (
          <div className="mt-2">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="border px-3 py-1 rounded w-full mb-2"
              placeholder="Enter pledge amount"
              min={reward.amount}
            />
            <button
              onClick={handlePledge}
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition text-sm"
            >
              Confirm Pledge
            </button>
            <p className="text-sm mt-2">{message}</p>
          </div>
        )}
      </div>
    </div>
  );
}
