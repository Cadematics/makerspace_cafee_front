import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProjectsPage from "./pages/ProjectsPage";

function App() {
  return (
    <Router>
      <div>
        <nav className="navbar">
          <div className="logo">
            <h1>Makerspace</h1>
          </div>
          <ul className="menu">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/projects">Projects</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
        </Routes>

        <footer className="footer">
          <p>&copy; 2025 Makerspace. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;




// import './App.css'

// import React, { useEffect, useState } from "react";
// import axios from "axios";

// function App() {
//   const [projects, setProjects] = useState([]);

//   useEffect(() => {
//     // axios.get("http://127.0.0.1:8000/api/projects/")
//     axios.get("https://makerspace-backend.onrender.com/api/projects/")

//       .then((response) => {
//         setProjects(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching projects:", error);
//       });
//   }, []);

//   return (
//     <div>
//       <nav>
//         <h1>Makerspace Projects</h1>
//       </nav>

//       <header>
//         <h2>Welcome to Our Makerspace</h2>
//         <p>Explore our ongoing projects and support innovation!</p>
//       </header>

//       <main>
//         <h3>Current Projects</h3>
//         <ul>
//           {projects.length > 0 ? (
//             projects.map((project) => (
//               <li key={project.id}>
//                 <h4>{project.title}</h4>
//                 <p>{project.description}</p>
//                 <p>Funding Goal: ${project.funding_goal}</p>
//                 <p>Raised: ${project.current_funding}</p>
//               </li>
//             ))
//           ) : (
//             <p>No projects available</p>
//           )}
//         </ul>
//       </main>

//       <footer>
//         <p>&copy; 2025 Makerspace</p>
//       </footer>
//     </div>
//   );
// }

// export default App;
