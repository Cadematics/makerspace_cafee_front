import React from "react";

export default function RewardCard({ reward, onSelect }) {
  return (
    <div
      className="border rounded-md shadow hover:shadow-lg p-4 mb-4 cursor-pointer flex flex-col"
      onClick={() => onSelect && onSelect(reward)}
    >
      {reward.image && (
        <img
          src={reward.image}
          alt={reward.title}
          className="rounded-md w-full h-48 object-cover mb-4"
        />
      )}
      <h3 className="text-lg font-bold text-gray-800 mb-2">
        ${reward.amount} — {reward.title}
      </h3>
      <div className="text-sm text-gray-600 space-y-1">
        <p>
          <strong>Backers:</strong> {reward.backer_count}
        </p>
        <p>
          <strong>Ships to:</strong> {reward.ships_to}
        </p>
        <p>
          <strong>Est. delivery:</strong> {reward.estimated_delivery}
        </p>
        <p>
          <strong>Limited quantity:</strong> {reward.quantity_limit}
        </p>
      </div>
      <button className="mt-4 bg-green-600 text-white py-2 rounded-md hover:bg-green-700">
        Pledge ${reward.amount}
      </button>
    </div>
  );
}
