import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/ProjectsPage.css";

function ProjectsPage() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/projects/")
      .then((response) => setProjects(response.data))
      .catch((error) => console.error("Error fetching projects:", error));
  }, []);

  return (
    <div className="projects-page">
      <h2>Ongoing Projects</h2>
      <ul>
        {projects.length > 0 ? (
          projects.map((project) => (
            <li key={project.id}>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <p>Funding Goal: ${project.funding_goal}</p>
              <p>Raised: ${project.current_funding}</p>
            </li>
          ))
        ) : (
          <p>No projects available.</p>
        )}
      </ul>
    </div>
  );
}

export default ProjectsPage;
