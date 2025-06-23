import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10 px-6 mt-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo + Description */}
        <div>
          <h2 className="text-2xl font-bold text-orange-400">Makerspace</h2>
          <p className="text-sm mt-2 text-gray-400">
            Crowdfund ideas, support makers, and bring innovative projects to
            life.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Explore</h3>
          <ul className="space-y-1 text-gray-300 text-sm">
            <li>
              <Link to="/projects" className="hover:text-orange-400">
                Projects
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-orange-400">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-orange-400">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/faq" className="hover:text-orange-400">
                FAQ
              </Link>
            </li>
          </ul>
        </div>

        {/* Social or Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Connect</h3>
          <ul className="space-y-1 text-gray-300 text-sm">
            <li>
              <a
                href="mailto:hello@makerspace.com"
                className="hover:text-orange-400"
              >
                Email Us
              </a>
            </li>
            <li>
              <a href="https://twitter.com" className="hover:text-orange-400">
                Twitter
              </a>
            </li>
            <li>
              <a href="https://instagram.com" className="hover:text-orange-400">
                Instagram
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Makerspace. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
