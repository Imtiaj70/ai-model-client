import React from 'react';

import { useState, useEffect } from 'react';
import { useModels } from '../hooks/useModels';
import { useAuth } from '../hooks/useAuth';
import ModelList from '../components/Models/ModelList';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import './Page.css';

const MyModels = () => {
  const { user } = useAuth();
  const { models, loading, fetchModels } = useModels();
  const [myModels, setMyModels] = useState([]);

  useEffect(() => {
    fetchModels();
  }, []);

  useEffect(() => {
    if (user && models.length > 0) {
      const filtered = models.filter((model) => model.createdBy === user.email);
      setMyModels(filtered);
    }
  }, [models, user]);

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>My Models</h1>
        <p>Manage the AI models you've created</p>
      </div>
      {loading ? (
        <LoadingSpinner />
      ) : myModels.length > 0 ? (
        <>
          <p className="results-count">
            You have {myModels.length} model{myModels.length !== 1 ? 's' : ''}
          </p>
          <ModelList models={myModels} loading={false} />
        </>
      ) : (
        <div className="no-models">
          <p>You haven't created any models yet.</p>
        </div>
      )}
    </div>
  );
};

export default MyModels;




