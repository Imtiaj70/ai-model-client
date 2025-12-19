import React from 'react';
import { Brain, Github } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-grid">
          {/* Brand Section */}
          <div className="footer-col">
            <div className="footer-brand">
              <Brain className="footer-icon" />
              <span className="footer-title">AI Model Inventory</span>
            </div>
            <p className="footer-text">
              Manage and explore AI models with ease. Your central hub for machine learning
              model cataloging.
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h3 className="footer-heading">Quick Links</h3>
            <ul className="footer-links">
              <li><Link to="/" className="footer-link">Home</Link></li>
              <li><Link to="/models" className="footer-link">All Models</Link></li>
              <li><Link to="/add-model" className="footer-link">Add Model</Link></li>
            </ul>
          </div>

          {/* Connect */}
          <div className="footer-col">
            <h3 className="footer-heading">Connect</h3>
            <div className="footer-social">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
              >
                <Github className="footer-social-icon" />
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            &copy; {new Date().getFullYear()} AI Model Inventory Manager. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
