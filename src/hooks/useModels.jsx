import { useState } from 'react';
import toast from 'react-hot-toast';
import api from '../utils/api'; // Axios instance

export const useModels = () => {
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 🔹 Fetch all models
  const fetchModels = async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get('/models', { params });
      setModels(response.data);
    } catch (err) {
      setError(err.message);
      toast.error('Failed to fetch models');
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Fetch single model by ID
  const fetchModelById = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get(`/models/${id}`);
      return response.data;
    } catch (err) {
      setError(err.message);
      toast.error('Failed to fetch model');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Create a new model
  const createModel = async (modelData) => {
    try {
      const response = await api.post('/models', modelData);
      toast.success('Model added successfully!');
      return response.data;
    } catch (err) {
      toast.error('Failed to add model');
      throw err;
    }
  };

  // 🔹 Update existing model
  const updateModel = async (id, modelData) => {
    try {
      const response = await api.put(`/models/${id}`, modelData);
      toast.success('Model updated successfully!');
      return response.data;
    } catch (err) {
      toast.error('Failed to update model');
      throw err;
    }
  };

  // 🔹 Delete model
  const deleteModel = async (id) => {
    try {
      await api.delete(`/models/${id}`);
      toast.success('Model deleted successfully!');
      return true;
    } catch (err) {
      toast.error('Failed to delete model');
      throw err;
    }
  };

  // 🔹 Purchase model (POST /models/:id/purchase)
  const purchaseModel = async (id, userEmail) => {
    try {
      const response = await fetch(`http://localhost:3000/models/${id}/purchase`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ buyerEmail: userEmail }),
      });
      console.log(response);
      if (!response.ok) throw new Error('Purchase failed');

      const data = await response.json();
      toast.success('Model purchased successfully!');
      return data.updatedModel; // return updated model
    } catch (err) {
      console.error('Purchase error:', err);
      toast.error('Failed to purchase model');
      throw err;
    }
  };

  return {
    models,
    loading,
    error,
    fetchModels,
    fetchModelById,
    createModel,
    updateModel,
    deleteModel,
    purchaseModel,
  };
};
