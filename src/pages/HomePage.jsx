
import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="homepage">
      <header className="h-screen w-full flex flex-col items-center justify-center text-center bg-cover bg-center bg-no-repeat text-white px-4"
              style={{ backgroundImage: `url('/banner.jpg')` }}>
        <h2 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
          Welcome to Our Makerspace
        </h2>
        <p className="text-lg md:text-xl mb-6 drop-shadow-md">
          Where creativity meets innovation.
        </p>
        <Link
          to="/projects"
          className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded shadow-md transition duration-300"
        >
          Explore Projects
        </Link>
      </header>
    </div>
  );
}

export default HomePage;












// import React from "react";
// import { Link } from "react-router-dom";
// import "../styles/HomePage.css"; // We'll create a CSS file next



// function HomePage() {
//   return (
//     <div className="homepage">
//       <header className="banner">
//         <h2>Welcome to Our Makerspace</h2>
//         <p>Where creativity meets innovation.</p>
//         <Link to="/projects" className="explore-btn">Explore Projects</Link>
//       </header>
//     </div>
//   );
// }

// export default HomePage;
