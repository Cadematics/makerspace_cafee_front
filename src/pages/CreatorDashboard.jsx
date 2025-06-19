import React, { useEffect, useState } from "react";
import axios from "axios";

const CreatorDashboard = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    axios
      .get("http://127.0.0.1:8000/api/my-created-projects/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setProjects(res.data))
      .catch((err) => console.error("Failed to load created projects", err));
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Your Created Projects</h1>
      {projects.length === 0 ? (
        <p>You haven't created any projects yet.</p>
      ) : (
        <ul className="space-y-4">
          {projects.map((project) => (
            <li key={project.id} className="border p-4 rounded shadow-sm">
              <h2 className="text-lg font-semibold">{project.title}</h2>
              <p>{project.description.slice(0, 100)}...</p>
              <p className="text-sm text-gray-600">
                Goal: ${project.funding_goal} | Raised: $
                {project.current_funding}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CreatorDashboard;
