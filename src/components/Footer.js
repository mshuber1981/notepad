import React from "react";
// https://react-icons.netlify.com/#/
import { FaLinkedin, FaGithubSquare } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="d-flex flex-column fixed-bottom bg-primary footer">
      <div className="h1 d-inline my-2 text-center">
        <a
          href="https://www.linkedin.com/in/michael-huber-9b567a173"
          target="_blank"
          rel="noopener noreferrer"
          className="mx-2 text-white"
        >
          <FaLinkedin />
        </a>
        <a
          href="https://github.com/mshuber1981"
          target="_blank"
          rel="noopener noreferrer"
          className="mx-2 text-white"
        >
          <FaGithubSquare />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
