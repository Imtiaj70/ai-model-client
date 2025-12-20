import React from 'react';

import { Link } from 'react-router-dom';
import './ModelCard.css';

const ModelCard = ({ model }) => {
  return (
    <div className="model-card">
      <div className="model-card-image">
        <img
          src={model.image || 'https://via.placeholder.com/300x200'}
          alt={model.name}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x200';
          }}
        />
      </div>
      <div className="model-card-content">
        <h3>{model.name}</h3>
        <div className="model-card-info">
          <span className="model-framework">{model.framework}</span>
          <span className="model-usecase">{model.useCase}</span>
        </div>
        {model.createdBy && (
          <p className="model-creator">Created by: {model.createdBy}</p>
        )}
        {model.purchased !== undefined && (
          <p className="model-purchased">Purchased {model.purchased} times</p>
        )}
        <Link to={`/models/${model._id}`} className="view-details-btn">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ModelCard;




