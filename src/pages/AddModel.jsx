import React from 'react';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useModels } from '../hooks/useModels';
import { useAuth } from '../hooks/useAuth';
import ModelForm from '../components/Models/ModelForm';
import './Page.css';

const AddModel = () => {
  const navigate = useNavigate();
  const { createModel } = useModels();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      const modelData = {
        ...formData,
        createdBy: user.email,
        createdAt: new Date().toISOString(),
        purchased: 0,
      };
      await createModel(modelData);
      navigate('/models');
    } catch (error) {
      console.error('Error adding model:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Add New AI Model</h1>
        <p>Fill in the details to add a new AI model to the inventory</p>
      </div>
      <ModelForm onSubmit={handleSubmit} loading={loading} />
    </div>
  );
};

export default AddModel;

