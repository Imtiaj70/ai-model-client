import React from 'react';

import ModelCard from './ModelCard';
import LoadingSpinner from '../UI/LoadingSpinner';
import './ModelList.css';

const ModelList = ({ models, loading }) => {
  if (loading) {
    return <LoadingSpinner />;
  }

  if (!models || models.length === 0) {
    return (
      <div className="no-models">
        <p>No models found</p>
      </div>
    );
  }

  return (
    <div className="model-list">
      {models.map((model) => (
        <ModelCard key={model._id} model={model} />
      ))}
    </div>
  );
};

export default ModelList;




