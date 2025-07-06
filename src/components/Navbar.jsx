import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");

  // Store user info
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (!token) return;
      try {
        const res = await axios.get("http://localhost:8000/api/me/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (err) {
        console.error("Failed to fetch user info:", err);
      }
    };

    fetchUser();
  }, [token]);

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
            to="/events"
            className="hover:text-orange-400 transition duration-200"
          >
            Events
          </Link>
        </li>
        <li>
          <Link
            to="/crowdfunding-events"
            className="hover:text-orange-400 transition duration-200"
          >
            Crowdfunding Events
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

        {token && user ? (
          <>
            <li>
              <Link to="/profile" className="flex items-center gap-2">
                <img
                  src={user.avatar || "/default-avatar.png"}
                  alt="avatar"
                  className="w-8 h-8 rounded-full object-cover border-2 border-orange-400"
                />
                <span className="text-orange-300">{user.username}</span>
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

// import React from "react";
// import { Link, useNavigate } from "react-router-dom";

// function Navbar() {
//   const navigate = useNavigate();
//   const token = localStorage.getItem("access_token");

//   const handleLogout = () => {
//     localStorage.removeItem("access_token");
//     localStorage.removeItem("refresh_token");
//     navigate("/login");
//   };

//   return (
//     <nav className="bg-gray-800 text-white px-6 py-4 flex items-center justify-between shadow-md">
//       <div className="text-2xl font-bold">
//         <Link to="/" className="hover:text-orange-400 transition duration-200">
//           Makerspace
//         </Link>
//       </div>
//       <ul className="flex items-center gap-6 text-sm md:text-base">
//         <li>
//           <Link
//             to="/"
//             className="hover:text-orange-400 transition duration-200"
//           >
//             Home
//           </Link>
//         </li>
//         <li>
//           <Link
//             to="/projects"
//             className="hover:text-orange-400 transition duration-200"
//           >
//             Projects
//           </Link>
//         </li>
//         <li>
//           <Link
//             to="/events"
//             className="hover:text-orange-400 transition duration-200"
//           >
//             Events
//           </Link>
//         </li>

//         <li>
//           <Link
//             to="/contact"
//             className="hover:text-orange-400 transition duration-200"
//           >
//             Contact Us
//           </Link>
//         </li>
//         {token ? (
//           <>
//             <li>
//               <Link
//                 to="/profile"
//                 className="text-orange-800 hover:text-blue-600"
//               >
//                 Profile
//               </Link>
//             </li>
//             <li>
//               <button
//                 onClick={handleLogout}
//                 className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition duration-200"
//               >
//                 Logout
//               </button>
//             </li>
//           </>
//         ) : (
//           <>
//             <li>
//               <Link
//                 to="/login"
//                 className="hover:text-orange-400 transition duration-200"
//               >
//                 Login
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/register"
//                 className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded transition duration-200"
//               >
//                 Register
//               </Link>
//             </li>
//           </>
//         )}
//       </ul>
//     </nav>
//   );
// }

// export default Navbar;
