import React from 'react';

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useModels } from '../hooks/useModels';
import ModelForm from '../components/Models/ModelForm';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import './Page.css';

const UpdateModel = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchModelById, updateModel } = useModels();
  const [model, setModel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadModel();
  }, [id]);

  const loadModel = async () => {
    setLoading(true);
    const modelData = await fetchModelById(id);
    setModel(modelData);
    setLoading(false);
  };

  const handleSubmit = async (formData) => {
    setSaving(true);
    try {
      await updateModel(id, formData);
      navigate(`/models/${id}`);
    } catch (error) {
      console.error('Error updating model:', error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!model) {
    return (
      <div className="page-container">
        <div className="error-message">
          <h2>Model not found</h2>
          <p>The model you're trying to edit doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Update AI Model</h1>
        <p>Edit the details of your AI model</p>
      </div>
      <ModelForm model={model} onSubmit={handleSubmit} loading={saving} />
    </div>
  );
};

export default UpdateModel;




