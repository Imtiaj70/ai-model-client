import React from 'react';

import { useState, useEffect } from 'react';
import { useModels } from '../hooks/useModels';
import ModelList from '../components/Models/ModelList';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import './Models.css';

const Models = () => {
  const { models, loading, fetchModels } = useModels();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFrameworks, setSelectedFrameworks] = useState([]);
  const [filteredModels, setFilteredModels] = useState([]);

  useEffect(() => {
    const loadModels = async () => {
      const params = {};
      if (searchTerm.trim()) {
        params.search = searchTerm.trim();
      }
      if (selectedFrameworks.length > 0) {
        params.framework = selectedFrameworks;
      }
      await fetchModels(params);
    };
    loadModels();
  }, [searchTerm, selectedFrameworks]);

  useEffect(() => {
    setFilteredModels(models);
  }, [models]);

  const handleFrameworkChange = (framework) => {
    setSelectedFrameworks((prev) =>
      prev.includes(framework)
        ? prev.filter((f) => f !== framework)
        : [...prev, framework]
    );
  };

  const frameworks = [...new Set(models.map((model) => model.framework))];

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>All AI Models</h1>
        <p>Browse and explore all available AI models</p>
      </div>

      <div className="filters-section">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search models by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="framework-filters">
          <label>Filter by Framework:</label>
          <div className="framework-options">
            {frameworks.map((framework) => (
              <label key={framework} className="framework-checkbox">
                <input
                  type="checkbox"
                  checked={selectedFrameworks.includes(framework)}
                  onChange={() => handleFrameworkChange(framework)}
                />
                <span>{framework}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          {filteredModels.length > 0 && (
            <p className="results-count">
              Showing {filteredModels.length} model{filteredModels.length !== 1 ? 's' : ''}
            </p>
          )}
          <ModelList models={filteredModels} loading={false} />
        </>
      )}
    </div>
  );
};

export default Models;

