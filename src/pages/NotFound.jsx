import React from 'react';

import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1>404</h1>
        <h2>Oops! This AI model doesn't exist.</h2>
        <p>The page you're looking for might have been removed or doesn't exist.</p>
        <Link to="/" className="home-btn">
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;




