import React from 'react';

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useModels } from '../hooks/useModels';
import Slider from '../components/Layout/Slider';
import ModelCard from '../components/Models/ModelCard';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import './Home.css';

const Home = () => {
  const { user } = useAuth();
  const { models, loading, fetchModels } = useModels();
  const [featuredModels, setFeaturedModels] = useState([]);

  useEffect(() => {
    const loadModels = async () => {
      await fetchModels();
    };
    loadModels();
  }, []);

  useEffect(() => {
    if (models.length > 0) {
      const sorted = [...models].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setFeaturedModels(sorted.slice(0, 6));
    }
  }, [models]);

  return (
    <div className="home">
      <Slider />
      <div className="container">
        <section className="featured-models">
          <h2>Featured AI Models</h2>
          {loading ? (
            <LoadingSpinner />
          ) : featuredModels.length > 0 ? (
            <div className="models-grid">
              {featuredModels.map((model) => (
                <ModelCard key={model._id} model={model} />
              ))}
            </div>
          ) : (
            <p className="no-models">No models available yet</p>
          )}
        </section>

        <section className="about-section">
          <h2>About AI Models</h2>
          <div className="about-content">
            <p>
              AI models are computational systems designed to perform specific tasks by learning
              patterns from data. These models form the backbone of modern artificial intelligence,
              enabling machines to understand, predict, and make decisions across various domains.
            </p>
            <p>
              Neural networks, a key component of many AI models, are inspired by the human brain's
              structure. They consist of interconnected nodes (neurons) that process information
              through layers, allowing the model to recognize complex patterns and relationships in
              data.
            </p>
            <p>
              AI models have revolutionized numerous fields, including natural language processing
              (enabling chatbots and translation services), computer vision (powering image
              recognition and autonomous vehicles), and predictive analytics (forecasting trends
              and behaviors). The ability to catalog, manage, and share these models is crucial for
              advancing AI research and deployment.
            </p>
          </div>
        </section>

        <section className="get-started-section">
          <h2>Get Started</h2>
          <p>Start managing your AI models today. Register or log in to begin organizing your inventory.</p>
          {!user ? (
            <div className="cta-buttons">
              <Link to="/register" className="cta-btn primary">
                Register Now
              </Link>
              <Link to="/login" className="cta-btn secondary">
                Login
              </Link>
            </div>
          ) : (
            <div className="cta-buttons">
              <Link to="/add-model" className="cta-btn primary">
                Add Your First Model
              </Link>
              <Link to="/models" className="cta-btn secondary">
                Browse Models
              </Link>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Home;

