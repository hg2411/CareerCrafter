// Footer.jsx
import React from "react";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 shadow-md mt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 py-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              CareerCrafter
            </h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Helping you craft your career with the right opportunities,
              guidance, and connections for your growth.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              Quick Links
            </h3>
            <ul className="mt-2 space-y-2">
              <li>
                <a
                  href="/"
                  className="hover:underline text-gray-600 dark:text-gray-400"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/jobs"
                  className="hover:underline text-gray-600 dark:text-gray-400"
                >
                  Jobs
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="hover:underline text-gray-600 dark:text-gray-400"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="hover:underline text-gray-600 dark:text-gray-400"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Follow Us</h3>
            <ul className="mt-2 space-y-2">
              <li>
                <a
                  href="https://github.com/hg2411/CareerCrafter"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline text-gray-600 dark:text-gray-400"
                >
                  <i className="fab fa-github"></i> GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/hg2411/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline text-gray-600 dark:text-gray-400"
                >
                  <i className="fab fa-linkedin"></i> LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 dark:border-gray-700 py-4 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} CareerCrafter. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
