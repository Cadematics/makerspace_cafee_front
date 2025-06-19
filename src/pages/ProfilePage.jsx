// src/pages/ProfilePage.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function ProfilePage() {
  return (
    <div className="p-6 max-w-4xl mx-auto font-sans">
      <h1 className="text-2xl font-bold mb-6">Your Profile</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          to="/dashboard/creator"
          className="bg-blue-600 text-white py-3 px-4 rounded-md text-center hover:bg-blue-700 transition"
        >
          Creator Dashboard
        </Link>

        <Link
          to="/dashboard/backer"
          className="bg-green-600 text-white py-3 px-4 rounded-md text-center hover:bg-green-700 transition"
        >
          Backer Dashboard
        </Link>
      </div>
    </div>
  );
}
