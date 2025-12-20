import React from 'react';

import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import api from '../utils/api';
import ModelList from '../components/Models/ModelList';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import './Page.css';

const MyPurchases = () => {
  const { user } = useAuth();
  const [purchases, setPurchases] = useState([]);
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadPurchases();
    }
  }, [user]);

  const loadPurchases = async () => {
    try {
      setLoading(true);
      const response = await api.get('/purchases');
      setPurchases(response.data);
      
      // Fetch model details for each purchase
      const modelPromises = response.data.map((purchase) =>
        api.get(`/models/${purchase.modelId}`)
      );
      const modelResponses = await Promise.all(modelPromises);
      const modelData = modelResponses.map((res) => res.data);
      setModels(modelData);
    } catch (error) {
      console.error('Error loading purchases:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>My Purchases</h1>
        <p>View all the AI models you've purchased</p>
      </div>
      {loading ? (
        <LoadingSpinner />
      ) : models.length > 0 ? (
        <>
          <p className="results-count">
            You have purchased {models.length} model{models.length !== 1 ? 's' : ''}
          </p>
          <ModelList models={models} loading={false} />
        </>
      ) : (
        <div className="no-models">
          <p>You haven't purchased any models yet.</p>
        </div>
      )}
    </div>
  );
};

export default MyPurchases;
















































































