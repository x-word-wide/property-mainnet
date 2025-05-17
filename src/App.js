import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import styled from 'styled-components';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';

// Eagerly loaded pages
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';

// Lazy loaded pages for better performance
const Marketplace = lazy(() => import('./pages/Marketplace'));
const PropertyDetails = lazy(() => import('./pages/PropertyDetails'));
const CreateProperty = lazy(() => import('./pages/CreateProperty'));
const MyProperties = lazy(() => import('./pages/MyProperties'));
const ResetPassword = lazy(() => import('./pages/ResetPassword'));
const Profile = lazy(() => import('./pages/Profile'));
const Auctions = lazy(() => import('./pages/Auctions'));
const AuctionDetails = lazy(() => import('./pages/AuctionDetails'));
const FractionalProperties = lazy(() => import('./pages/FractionalProperties'));
const FractionalPropertyDetails = lazy(() => import('./pages/FractionalPropertyDetails'));
const PropertyVerification = lazy(() => import('./pages/PropertyVerification'));
const PropertyModification = lazy(() => import('./pages/PropertyModification'));
const PrivateAuctions = lazy(() => import('./pages/PrivateAuctions'));

// Additional pages
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const InvestmentGuide = lazy(() => import('./pages/InvestmentGuide'));
const PropertyManagement = lazy(() => import('./pages/PropertyManagement'));
const Watchlist = lazy(() => import('./pages/Watchlist'));
const Transactions = lazy(() => import('./pages/Transactions'));
const VerificationSuccess = lazy(() => import('./pages/VerificationSuccess'));
const ModificationSuccess = lazy(() => import('./pages/ModificationSuccess'));
const AuctionCreated = lazy(() => import('./pages/AuctionCreated'));
const Terms = lazy(() => import('./pages/Terms'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Cookies = lazy(() => import('./pages/Cookies'));

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
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
`;

// Protected route component
const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();
  
  if (loading) {
    return (
      <LoadingContainer>
        <LoadingSpinner size="large" />
      </LoadingContainer>
    );
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
    return (
      <LoadingContainer>
        <LoadingSpinner size="large" />
      </LoadingContainer>
    );
  }
  
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  
  if (!userProfile?.isVerified) {
    return <Navigate to="/profile" state={{ verificationRequired: true }} />;
  }
  
  return children;
};

function AppRoutes() {
  return (
    <Suspense fallback={
      <LoadingContainer>
        <LoadingSpinner size="large" />
      </LoadingContainer>
    }>
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
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/investment-guide" element={<InvestmentGuide />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/cookies" element={<Cookies />} />
        
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
        <Route path="/watchlist" element={
          <ProtectedRoute>
            <Watchlist />
          </ProtectedRoute>
        } />
        <Route path="/transactions" element={
          <ProtectedRoute>
            <Transactions />
          </ProtectedRoute>
        } />
        <Route path="/property-verification" element={
          <ProtectedRoute>
            <PropertyVerification />
          </ProtectedRoute>
        } />
        <Route path="/verification-success" element={
          <ProtectedRoute>
            <VerificationSuccess />
          </ProtectedRoute>
        } />
        <Route path="/property-modification" element={
          <ProtectedRoute>
            <PropertyModification />
          </ProtectedRoute>
        } />
        <Route path="/modification-success" element={
          <ProtectedRoute>
            <ModificationSuccess />
          </ProtectedRoute>
        } />
        <Route path="/property-management" element={
          <ProtectedRoute>
            <PropertyManagement />
          </ProtectedRoute>
        } />
        <Route path="/private-auctions" element={
          <ProtectedRoute>
            <PrivateAuctions />
          </ProtectedRoute>
        } />
        <Route path="/auction-created" element={
          <ProtectedRoute>
            <AuctionCreated />
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
    </Suspense>
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
