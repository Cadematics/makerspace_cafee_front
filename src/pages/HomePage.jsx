import React from "react";
import { Link } from "react-router-dom";
import "../styles/HomePage.css"; // We'll create a CSS file next

function HomePage() {
  return (
    <div className="homepage">
      <header className="banner">
        <h2>Welcome to Our Makerspace</h2>
        <p>Where creativity meets innovation.</p>
        <Link to="/projects" className="explore-btn">Explore Projects</Link>
      </header>
    </div>
  );
}

export default HomePage;
