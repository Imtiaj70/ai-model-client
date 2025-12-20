import React from 'react';

import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useModels } from '../hooks/useModels';
import { useAuth } from '../hooks/useAuth';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import toast from 'react-hot-toast';
import './ModelDetails.css';
import MyPurchases from './MyPurchases';

const ModelDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { fetchModelById, deleteModel, purchaseModel } = useModels();
  const [model, setModel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState(false);

  useEffect(() => {
    console.log(id);

    loadModel();
  }, [id]);

  const loadModel = async () => {
    setLoading(true);
    const modelData = await fetchModelById(id);
    setModel(modelData);
    setLoading(false);
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this model?')) {
      try {
        await deleteModel(id);
        navigate('/models');
      } catch (error) {
        console.error('Error deleting model:', error);
      }
    }
  };

  const handlePurchase = async () => {
    setPurchasing(true);
    try {
      const updatedModel = await fetch(`http://localhost:3000/models/${id}/purchase`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ buyerEmail: user?.email || "guest@example.com" }),
      })
        .then(res => res.json());

      setModel(updatedModel.updatedModel); // UI update
      toast.success("Model purchased successfully!");
      // Nabigate my purchss..
    } catch (err) {
      console.error("Error purchasing model:", err);
      toast.error("Failed to purchase model");
    } finally {
      setPurchasing(false);
    }
  };



  if (loading) {
    return <LoadingSpinner />;
  }

  if (!model) {
    return (
      <MyPurchases/>
    );
  }

  const isCreator = user && model.createdBy === user.email;

  return (
    <div className="page-container">
      <div className="model-details">
        <div className="model-details-image">
          <img
            src={model.image || 'https://via.placeholder.com/600x400'}
            alt={model.name}
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/600x400';
            }}
          />
        </div>
        <div className="model-details-content">
          <h1>{model.name}</h1>
          <div className="model-meta">
            <div className="meta-item">
              <span className="meta-label">Framework:</span>
              <span className="meta-value">{model.framework}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Use Case:</span>
              <span className="meta-value">{model.useCase}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Dataset:</span>
              <span className="meta-value">{model.dataset}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Created By:</span>
              <span className="meta-value">{model.createdBy}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Purchased:</span>
              <span className="meta-value">
                {model.purchased || 0} time{model.purchased !== 1 ? 's' : ''}
              </span>
            </div>
          </div>
          <div className="model-description">
            <h2>Description</h2>
            <p>{model.description}</p>
          </div>
          <div className="model-actions">
            <button
              onClick={handlePurchase}
              className="purchase-btn"
              disabled={purchasing}
            >
              {purchasing ? 'Purchasing...' : 'Purchase Model'}
            </button>
            {isCreator && (
              <>
                <Link to={`/update-model/${id}`} className="edit-btn">
                  Edit Model
                </Link>
                <button onClick={handleDelete} className="delete-btn">
                  Delete Model
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelDetails;

