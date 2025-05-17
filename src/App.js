import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ethers } from 'ethers';
import detectEthereumProvider from '@metamask/detect-provider';
import styled from 'styled-components';

// Components
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Marketplace from './pages/Marketplace';
import PropertyDetails from './pages/PropertyDetails';
import CreateProperty from './pages/CreateProperty';
import MyProperties from './pages/MyProperties';
import Footer from './components/Footer';

// Context
import { Web3Provider } from './context/Web3Context';

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

function App() {
  return (
    <Web3Provider>
      <Router>
        <AppContainer>
          <Navbar />
          <ContentContainer>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/property/:id" element={<PropertyDetails />} />
              <Route path="/create" element={<CreateProperty />} />
              <Route path="/my-properties" element={<MyProperties />} />
            </Routes>
          </ContentContainer>
          <Footer />
        </AppContainer>
      </Router>
    </Web3Provider>
  );
}

export default App;
