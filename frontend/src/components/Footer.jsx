import React from "react";
import { Github, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 text-sm py-6 mt-10">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left: Text */}
        <p>© {new Date().getFullYear()} CareerCrafter. All rights reserved.</p>

        {/* Right: Social icons */}
        <div className="flex gap-4">
          <a href="https://github.com/hg2411/CareerCrafter" className="hover:text-white" aria-label="GitHub">
            <Github size={18} />
          </a>
          <a href="https://www.linkedin.com/in/hg2411/" className="hover:text-white" aria-label="LinkedIn">
            <Linkedin size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
