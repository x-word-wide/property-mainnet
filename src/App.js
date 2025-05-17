import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import styled from 'styled-components';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Marketplace from './pages/Marketplace';
import PropertyDetails from './pages/PropertyDetails';
import CreateProperty from './pages/CreateProperty';
import MyProperties from './pages/MyProperties';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ResetPassword from './pages/ResetPassword';
import Profile from './pages/Profile';
import Auctions from './pages/Auctions';
import AuctionDetails from './pages/AuctionDetails';
import FractionalProperties from './pages/FractionalProperties';
import FractionalPropertyDetails from './pages/FractionalPropertyDetails';

// Context
import { Web3Provider } from './context/Web3Context';
import { AuthProvider, useAuth } from './context/AuthContext';

// Styling
import './App.css';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const ContentContainer = styled.div`
  flex: 1;
  padding: 20px;
`;

// Protected route component
const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  
  return children;
};

// Verified route component (requires account verification)
const VerifiedRoute = ({ children }) => {
  const { currentUser, userProfile, loading } = useAuth();
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  
  if (!userProfile?.isVerified) {
    return <Navigate to="/profile" />;
  }
  
  return children;
};

function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/marketplace" element={<Marketplace />} />
      <Route path="/property/:id" element={<PropertyDetails />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/auctions" element={<Auctions />} />
      <Route path="/auction/:id" element={<AuctionDetails />} />
      <Route path="/fractional" element={<FractionalProperties />} />
      <Route path="/fractional/:id" element={<FractionalPropertyDetails />} />
      
      {/* Protected routes (require authentication) */}
      <Route path="/profile" element={
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      } />
      <Route path="/my-properties" element={
        <ProtectedRoute>
          <MyProperties />
        </ProtectedRoute>
      } />
      
      {/* Verified routes (require account verification) */}
      <Route path="/create" element={
        <VerifiedRoute>
          <CreateProperty />
        </VerifiedRoute>
      } />
      
      {/* Catch all route */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Web3Provider>
        <Router>
          <AppContainer>
            <Navbar />
            <ContentContainer>
              <AppRoutes />
            </ContentContainer>
            <Footer />
          </AppContainer>
        </Router>
      </Web3Provider>
    </AuthProvider>
  );
}

export default App;
