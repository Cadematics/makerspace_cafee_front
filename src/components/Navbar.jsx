import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    navigate("/login");
  };

  return (
    <nav className="bg-gray-800 text-white px-6 py-4 flex items-center justify-between shadow-md">
      <div className="text-2xl font-bold">
        <Link to="/" className="hover:text-orange-400 transition duration-200">
          Makerspace
        </Link>
      </div>
      <ul className="flex items-center gap-6 text-sm md:text-base">
        <li>
          <Link
            to="/"
            className="hover:text-orange-400 transition duration-200"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/projects"
            className="hover:text-orange-400 transition duration-200"
          >
            Projects
          </Link>
        </li>
        <li>
          <Link
            to="/contact"
            className="hover:text-orange-400 transition duration-200"
          >
            Contact Us
          </Link>
        </li>
        {token ? (
          <>
            <li>
              <Link
                to="/profile"
                className="text-orange-800 hover:text-blue-600"
              >
                Profile
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition duration-200"
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link
                to="/login"
                className="hover:text-orange-400 transition duration-200"
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded transition duration-200"
              >
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
