import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ethers } from 'ethers';
import { Web3Context } from '../context/Web3Context';

const MyPropertiesContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  color: #666;
  font-size: 1.1rem;
`;

const TabsContainer = styled.div`
  display: flex;
  border-bottom: 1px solid #ddd;
  margin-bottom: 2rem;
`;

const Tab = styled.button`
  padding: 1rem 1.5rem;
  background: none;
  border: none;
  border-bottom: 3px solid ${props => props.active ? '#4361ee' : 'transparent'};
  color: ${props => props.active ? '#4361ee' : '#666'};
  font-weight: ${props => props.active ? '600' : '400'};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    color: #4361ee;
  }
`;

const PropertiesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
`;

const PropertyCard = styled.div`
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const PropertyImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const PropertyContent = styled.div`
  padding: 1.5rem;
`;

const PropertyPrice = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #4361ee;
`;

const PropertyAddress = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: #333;
`;

const PropertyFeatures = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  color: #666;
`;

const PropertyFeature = styled.span`
  display: flex;
  align-items: center;
  gap: 0.3rem;
`;

const PropertyStatus = styled.div`
  background-color: ${props => props.isListed ? '#e6fffa' : '#f8f9fa'};
  color: ${props => props.isListed ? '#0d9488' : '#666'};
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  font-size: 0.9rem;
  display: inline-block;
  margin-bottom: 1rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const Button = styled(Link)`
  flex: 1;
  text-align: center;
  padding: 0.7rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 500;
`;

const ViewButton = styled(Button)`
  background-color: #4361ee;
  color: white;
  
  &:hover {
    background-color: #3a56d4;
  }
`;

const ManageButton = styled(Button)`
  background-color: transparent;
  border: 1px solid #4361ee;
  color: #4361ee;
  
  &:hover {
    background-color: #f0f4ff;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  background-color: #f8f9fa;
  border-radius: 8px;
`;

const EmptyStateTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #333;
`;

const EmptyStateText = styled.p`
  color: #666;
  margin-bottom: 1.5rem;
`;

const CreateButton = styled(Link)`
  display: inline-block;
  background-color: #4361ee;
  color: white;
  padding: 0.8rem 1.5rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 500;
  
  &:hover {
    background-color: #3a56d4;
  }
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 3rem;
  font-size: 1.2rem;
  color: #666;
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: #d32f2f;
  background-color: #ffebee;
  border-radius: 8px;
  margin-bottom: 2rem;
`;

const MyProperties = () => {
  const { account, nftContract, marketplaceContract, isLoading: web3Loading, error: web3Error } = useContext(Web3Context);
  
  const [activeTab, setActiveTab] = useState('owned');
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Fetch user's properties
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        if (!account || !nftContract || !marketplaceContract) return;
        
        setIsLoading(true);
        
        let userProperties = [];
        
        if (activeTab === 'owned') {
          // Get properties owned by the user
          // This is a simplified approach - in a real app, you'd need to query events or use a subgraph
          // For demo purposes, we'll check the first 20 token IDs
          for (let i = 1; i <= 20; i++) {
            try {
              const owner = await nftContract.ownerOf(i);
              
              if (owner.toLowerCase() === account.toLowerCase()) {
                // Get property details
                const property = await nftContract.getProperty(i);
                
                // Get active listings to check if property is listed
                const listings = await marketplaceContract.getActiveListings();
                const listing = listings.find(
                  listing => listing.tokenId.toNumber() === i && listing.isActive
                );
                
                userProperties.push({
                  id: i,
                  address: property.propertyAddress,
                  squareFootage: property.squareFootage.toNumber(),
                  bedrooms: property.bedrooms.toNumber(),
                  bathrooms: property.bathrooms.toNumber(),
                  propertyType: property.propertyType,
                  isVerified: property.isVerified,
                  isListed: !!listing,
                  price: listing ? ethers.utils.formatEther(listing.price) : null,
                  image: `https://source.unsplash.com/random/800x600/?house&id=${i}` // Placeholder image
                });
              }
            } catch (err) {
              // Token might not exist, skip
              continue;
            }
          }
        } else if (activeTab === 'listed') {
          // Get properties listed by the user
          const listings = await marketplaceContract.getListingsBySeller(account);
          
          for (const listing of listings) {
            if (listing.isActive) {
              const tokenId = listing.tokenId.toNumber();
              const property = await nftContract.getProperty(tokenId);
              
              userProperties.push({
                id: tokenId,
                address: property.propertyAddress,
                squareFootage: property.squareFootage.toNumber(),
                bedrooms: property.bedrooms.toNumber(),
                bathrooms: property.bathrooms.toNumber(),
                propertyType: property.propertyType,
                isVerified: property.isVerified,
                isListed: true,
                price: ethers.utils.formatEther(listing.price),
                image: `https://source.unsplash.com/random/800x600/?house&id=${tokenId}` // Placeholder image
              });
            }
          }
        }
        
        setProperties(userProperties);
      } catch (err) {
        console.error("Error fetching properties:", err);
        setError("Failed to load your properties. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProperties();
  }, [account, nftContract, marketplaceContract, activeTab]);
  
  // Show loading state
  if (web3Loading || isLoading) {
    return (
      <MyPropertiesContainer>
        <Header>
          <Title>My Properties</Title>
          <Subtitle>Manage your real estate NFTs</Subtitle>
        </Header>
        <LoadingMessage>Loading your properties...</LoadingMessage>
      </MyPropertiesContainer>
    );
  }
  
  // Show error state
  if (web3Error || error) {
    return (
      <MyPropertiesContainer>
        <Header>
          <Title>My Properties</Title>
          <Subtitle>Manage your real estate NFTs</Subtitle>
        </Header>
        <ErrorMessage>
          {web3Error || error}
        </ErrorMessage>
      </MyPropertiesContainer>
    );
  }
  
  // Show connect wallet message if not connected
  if (!account) {
    return (
      <MyPropertiesContainer>
        <Header>
          <Title>My Properties</Title>
          <Subtitle>Manage your real estate NFTs</Subtitle>
        </Header>
        <EmptyState>
          <EmptyStateTitle>Connect Your Wallet</EmptyStateTitle>
          <EmptyStateText>
            Please connect your wallet to view and manage your properties.
          </EmptyStateText>
        </EmptyState>
      </MyPropertiesContainer>
    );
  }
  
  return (
    <MyPropertiesContainer>
      <Header>
        <Title>My Properties</Title>
        <Subtitle>Manage your real estate NFTs</Subtitle>
      </Header>
      
      <TabsContainer>
        <Tab 
          active={activeTab === 'owned'} 
          onClick={() => setActiveTab('owned')}
        >
          Properties Owned
        </Tab>
        <Tab 
          active={activeTab === 'listed'} 
          onClick={() => setActiveTab('listed')}
        >
          Properties Listed
        </Tab>
      </TabsContainer>
      
      {properties.length > 0 ? (
        <PropertiesGrid>
          {properties.map((property) => (
            <PropertyCard key={property.id}>
              <PropertyImage src={property.image} alt={property.address} />
              <PropertyContent>
                <PropertyPrice>
                  {property.isListed ? `${property.price} ETH` : 'Not Listed'}
                </PropertyPrice>
                <PropertyAddress>{property.address}</PropertyAddress>
                <PropertyFeatures>
                  <PropertyFeature>{property.bedrooms} Beds</PropertyFeature>
                  <PropertyFeature>{property.bathrooms} Baths</PropertyFeature>
                  <PropertyFeature>{property.squareFootage} sqft</PropertyFeature>
                </PropertyFeatures>
                <PropertyStatus isListed={property.isListed}>
                  {property.isListed ? 'Listed for Sale' : 'Not Listed'}
                </PropertyStatus>
                <ButtonGroup>
                  <ViewButton to={`/property/${property.id}`}>View</ViewButton>
                  <ManageButton to={`/property/${property.id}/manage`}>Manage</ManageButton>
                </ButtonGroup>
              </PropertyContent>
            </PropertyCard>
          ))}
        </PropertiesGrid>
      ) : (
        <EmptyState>
          <EmptyStateTitle>
            {activeTab === 'owned' ? 'No Properties Owned' : 'No Properties Listed'}
          </EmptyStateTitle>
          <EmptyStateText>
            {activeTab === 'owned' 
              ? "You don't own any real estate NFTs yet. Create your first property listing!"
              : "You haven't listed any properties for sale yet."}
          </EmptyStateText>
          <CreateButton to="/create">List a Property</CreateButton>
        </EmptyState>
      )}
    </MyPropertiesContainer>
  );
};

export default MyProperties;