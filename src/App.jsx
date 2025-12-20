import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Home from './pages/Home';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import AddModel from './pages/AddModel';
import Models from './pages/Models';
import ModelDetails from './pages/ModelDetails';
import UpdateModel from './pages/UpdateModel';
import MyModels from './pages/MyModels';
import MyPurchases from './pages/MyPurchases';
import NotFound from './pages/NotFound';
import PrivateRoute from './components/PrivateRoute';
import './App.css';

function App() {
  return (
    <div className="app">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/models" element={<Models />} />
          <Route
            path="/add-model"
            element={              
              <PrivateRoute>
                <AddModel />
              </PrivateRoute>
            }
            
            
          />
          <Route
            path="/models/:id"
            element={
              <PrivateRoute>
                <ModelDetails />
              </PrivateRoute>
            }
          />
          <Route
            path="/update-model/:id"
            element={
              <PrivateRoute>
                <UpdateModel />
              </PrivateRoute>
            }
          />
          <Route
            path="/my-models"
            element={
              <PrivateRoute>
                <MyModels />
              </PrivateRoute>
            }
          />
          <Route
            path="/my-purchases"
            element={
              <PrivateRoute>
                <MyPurchases />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
