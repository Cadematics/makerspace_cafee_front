import React, { useEffect, useState } from "react";
import axios from "axios";
import ProjectCard from "../components/ProjectCard";

function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/projects/", {
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // }
        // ,
      })
      .then((response) => setProjects(response.data))
      .catch((error) => console.error("Error fetching projects:", error));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
        Ongoing Projects
      </h2>

      {projects.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 text-lg">No projects available.</p>
      )}
    </div>
  );
}

export default ProjectsPage;

