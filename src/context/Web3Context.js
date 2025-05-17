import React, { createContext, useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';
import detectEthereumProvider from '@metamask/detect-provider';

// Import contract ABIs (will be generated after compilation)
import RealEstateNFTArtifact from '../artifacts/contracts/RealEstateNFT.sol/RealEstateNFT.json';
import PropertyMarketplaceArtifact from '../artifacts/contracts/PropertyMarketplace.sol/PropertyMarketplace.json';

// Create context
export const Web3Context = createContext();

// Contract addresses (will be set after deployment)
const NFT_CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Placeholder
const MARKETPLACE_CONTRACT_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"; // Placeholder

export const Web3Provider = ({ children }) => {
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [nftContract, setNftContract] = useState(null);
  const [marketplaceContract, setMarketplaceContract] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize provider and contracts
  const initializeEthereum = useCallback(async () => {
    try {
      setIsLoading(true);
      
      // Detect Ethereum provider (MetaMask)
      const detectedProvider = await detectEthereumProvider();
      
      if (detectedProvider) {
        // Create ethers provider
        const ethersProvider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(ethersProvider);
        
        // Get accounts
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          
          // Get signer
          const ethSigner = ethersProvider.getSigner();
          setSigner(ethSigner);
          
          // Initialize contracts
          const nftContractInstance = new ethers.Contract(
            NFT_CONTRACT_ADDRESS,
            RealEstateNFTArtifact.abi,
            ethSigner
          );
          setNftContract(nftContractInstance);
          
          const marketplaceContractInstance = new ethers.Contract(
            MARKETPLACE_CONTRACT_ADDRESS,
            PropertyMarketplaceArtifact.abi,
            ethSigner
          );
          setMarketplaceContract(marketplaceContractInstance);
        }
      } else {
        setError("Please install MetaMask to use this application");
      }
    } catch (err) {
      console.error("Error initializing Ethereum:", err);
      setError("Error connecting to blockchain");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Connect wallet
  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
        
        // Reinitialize contracts with new account
        await initializeEthereum();
      } else {
        setError("Please install MetaMask to use this application");
      }
    } catch (err) {
      console.error("Error connecting wallet:", err);
      setError("Error connecting wallet");
    }
  };

  // Handle account changes
  const handleAccountsChanged = (accounts) => {
    if (accounts.length > 0) {
      setAccount(accounts[0]);
      // Reinitialize contracts with new account
      initializeEthereum();
    } else {
      setAccount(null);
      setSigner(null);
    }
  };

  // Handle chain changes
  const handleChainChanged = () => {
    // Reload the page on chain change as recommended by MetaMask
    window.location.reload();
  };

  // Set up event listeners
  useEffect(() => {
    initializeEthereum();
    
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);
      
      // Clean up listeners
      return () => {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      };
    }
  }, [initializeEthereum]);

  // Context value
  const contextValue = {
    account,
    provider,
    signer,
    nftContract,
    marketplaceContract,
    isLoading,
    error,
    connectWallet
  };

  return (
    <Web3Context.Provider value={contextValue}>
      {children}
    </Web3Context.Provider>
  );
};