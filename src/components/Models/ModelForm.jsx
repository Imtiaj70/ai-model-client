import React from 'react';

import { useState, useEffect } from 'react';
import './ModelForm.css';

const ModelForm = ({ model, onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    name: '',
    framework: '',
    useCase: '',
    dataset: '',
    description: '',
    image: '',
  });

  useEffect(() => {
    if (model) {
      setFormData({
        name: model.name || '',
        framework: model.framework || '',
        useCase: model.useCase || '',
        dataset: model.dataset || '',
        description: model.description || '',
        image: model.image || '',
      });
    }
  }, [model]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="model-form">
      <div className="form-group">
        <label htmlFor="name">Model Name *</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="e.g., BERT"
        />
      </div>
      <div className="form-group">
        <label htmlFor="framework">Framework *</label>
        <select
          id="framework"
          name="framework"
          value={formData.framework}
          onChange={handleChange}
          required
        >
          <option value="">Select Framework</option>
          <option value="TensorFlow">TensorFlow</option>
          <option value="PyTorch">PyTorch</option>
          <option value="Keras">Keras</option>
          <option value="Scikit-learn">Scikit-learn</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="useCase">Use Case *</label>
        <input
          type="text"
          id="useCase"
          name="useCase"
          value={formData.useCase}
          onChange={handleChange}
          required
          placeholder="e.g., NLP, Computer Vision"
        />
      </div>
      <div className="form-group">
        <label htmlFor="dataset">Dataset *</label>
        <input
          type="text"
          id="dataset"
          name="dataset"
          value={formData.dataset}
          onChange={handleChange}
          required
          placeholder="e.g., ImageNet, COCO"
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description *</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          rows="5"
          placeholder="Brief description of the model's purpose..."
        />
      </div>
      <div className="form-group">
        <label htmlFor="image">Image URL (ImgBB) *</label>
        <input
          type="url"
          id="image"
          name="image"
          value={formData.image}
          onChange={handleChange}
          required
          placeholder="https://ibb.co/..."
        />
      </div>
      <button type="submit" className="submit-btn" disabled={loading}>
        {loading ? 'Saving...' : model ? 'Update Model' : 'Add Model'}
      </button>
    </form>
  );
};

export default ModelForm;




