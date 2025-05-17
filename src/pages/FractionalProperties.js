import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ethers } from 'ethers';
import { Web3Context } from '../context/Web3Context';
import { useAuth } from '../context/AuthContext';

const FractionalContainer = styled.div`
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

const InfoCard = styled.div`
  background-color: #e6f2ff;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const InfoIcon = styled.div`
  width: 50px;
  height: 50px;
  background-color: #0066cc;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
  flex-shrink: 0;
`;

const InfoContent = styled.div`
  flex: 1;
`;

const InfoTitle = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
  color: #0066cc;
`;

const InfoText = styled.p`
  color: #333;
  line-height: 1.5;
`;

const FiltersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
  padding: 1rem;
  background-color: #f8f9fa;
  border-radius: 8px;
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 200px;
`;

const FilterLabel = styled.label`
  font-weight: 500;
  margin-bottom: 0.5rem;
`;

const FilterSelect = styled.select`
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
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

const PropertyTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: #333;
`;

const PropertyAddress = styled.p`
  color: #666;
  margin-bottom: 1rem;
`;

const TokenInfo = styled.div`
  background-color: #f8f9fa;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
`;

const TokenRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const TokenLabel = styled.span`
  color: #666;
  font-size: 0.9rem;
`;

const TokenValue = styled.span`
  font-weight: 500;
`;

const PriceRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const TokenPrice = styled.div`
  font-size: 1.3rem;
  font-weight: bold;
  color: #4361ee;
`;

const YieldValue = styled.div`
  background-color: #f0fff4;
  color: #38a169;
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  font-size: 0.9rem;
  font-weight: 500;
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

const BuyButton = styled(Button)`
  background-color: transparent;
  border: 1px solid #4361ee;
  color: #4361ee;
  
  &:hover {
    background-color: #f0f4ff;
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

const NoPropertiesMessage = styled.div`
  text-align: center;
  padding: 3rem;
  color: #666;
  background-color: #f8f9fa;
  border-radius: 8px;
`;

const FractionalProperties = () => {
  const { fractionalContract, nftContract, isLoading: web3Loading, error: web3Error } = useContext(Web3Context);
  const { currentUser } = useAuth();
  
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Filters
  const [propertyType, setPropertyType] = useState('all');
  const [minYield, setMinYield] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  
  // Fetch fractional properties
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        if (!fractionalContract || !nftContract) return;
        
        setIsLoading(true);
        
        // Get all fractionalized properties
        const propertyCount = await fractionalContract.getPropertyCount();
        const propertyPromises = [];
        
        for (let i = 1; i <= propertyCount; i++) {
          propertyPromises.push(fractionalContract.getPropertyDetails(i));
        }
        
        const propertiesData = await Promise.all(propertyPromises);
        
        // Fetch additional details for each property
        const propertiesWithDetails = await Promise.all(
          propertiesData.map(async (prop) => {
            const tokenId = prop.tokenId.toNumber();
            const property = await nftContract.getProperty(tokenId);
            
            // Get token details
            const tokenPrice = ethers.utils.formatEther(prop.tokenPrice);
            const totalSupply = prop.totalSupply.toNumber();
            const availableTokens = prop.availableTokens.toNumber();
            const expectedYield = prop.expectedYield.toNumber() / 100; // Convert from basis points to percentage
            
            return {
              id: prop.propertyId.toNumber(),
              tokenId,
              owner: prop.owner,
              tokenPrice,
              totalSupply,
              availableTokens,
              expectedYield,
              createdAt: prop.createdAt.toNumber(),
              property: {
                address: property.propertyAddress,
                squareFootage: property.squareFootage.toNumber(),
                bedrooms: property.bedrooms.toNumber(),
                bathrooms: property.bathrooms.toNumber(),
                propertyType: property.propertyType,
                isVerified: property.isVerified,
                image: `https://source.unsplash.com/random/800x600/?house&id=${tokenId}` // Placeholder image
              }
            };
          })
        );
        
        setProperties(propertiesWithDetails);
      } catch (err) {
        console.error("Error fetching fractional properties:", err);
        setError("Failed to load fractional properties. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProperties();
  }, [fractionalContract, nftContract]);
  
  // Filter and sort properties
  const filteredProperties = properties.filter(property => {
    // Filter by property type
    if (propertyType !== 'all' && property.property.propertyType !== propertyType) {
      return false;
    }
    
    // Filter by minimum yield
    if (minYield !== 'all') {
      const yieldValue = property.expectedYield;
      if (minYield === 'under5' && yieldValue >= 5) return false;
      if (minYield === '5to8' && (yieldValue < 5 || yieldValue > 8)) return false;
      if (minYield === '8to10' && (yieldValue < 8 || yieldValue > 10)) return false;
      if (minYield === 'over10' && yieldValue <= 10) return false;
    }
    
    return true;
  }).sort((a, b) => {
    // Sort by selected criteria
    switch (sortBy) {
      case 'newest':
        return b.createdAt - a.createdAt;
      case 'oldest':
        return a.createdAt - b.createdAt;
      case 'priceAsc':
        return parseFloat(a.tokenPrice) - parseFloat(b.tokenPrice);
      case 'priceDesc':
        return parseFloat(b.tokenPrice) - parseFloat(a.tokenPrice);
      case 'yieldDesc':
        return b.expectedYield - a.expectedYield;
      default:
        return 0;
    }
  });
  
  // Format date for display
  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString();
  };
  
  // Show loading state
  if (web3Loading || isLoading) {
    return (
      <FractionalContainer>
        <Header>
          <Title>Fractional Properties</Title>
          <Subtitle>Invest in real estate with fractional ownership tokens</Subtitle>
        </Header>
        <LoadingMessage>Loading fractional properties...</LoadingMessage>
      </FractionalContainer>
    );
  }
  
  // Show error state
  if (web3Error || error) {
    return (
      <FractionalContainer>
        <Header>
          <Title>Fractional Properties</Title>
          <Subtitle>Invest in real estate with fractional ownership tokens</Subtitle>
        </Header>
        <ErrorMessage>
          {web3Error || error}
        </ErrorMessage>
      </FractionalContainer>
    );
  }
  
  return (
    <FractionalContainer>
      <Header>
        <Title>Fractional Properties</Title>
        <Subtitle>Invest in real estate with fractional ownership tokens</Subtitle>
      </Header>
      
      <InfoCard>
        <InfoIcon>i</InfoIcon>
        <InfoContent>
          <InfoTitle>What is Fractional Ownership?</InfoTitle>
          <InfoText>
            Fractional ownership allows you to invest in real estate properties by purchasing tokens that represent a share of the property. 
            Each token entitles you to a portion of the rental income and property appreciation. 
            This makes real estate investment more accessible with lower capital requirements and instant liquidity.
          </InfoText>
        </InfoContent>
      </InfoCard>
      
      <FiltersContainer>
        <FilterGroup>
          <FilterLabel>Property Type</FilterLabel>
          <FilterSelect value={propertyType} onChange={(e) => setPropertyType(e.target.value)}>
            <option value="all">All Types</option>
            <option value="residential">Residential</option>
            <option value="commercial">Commercial</option>
            <option value="land">Land</option>
            <option value="industrial">Industrial</option>
          </FilterSelect>
        </FilterGroup>
        
        <FilterGroup>
          <FilterLabel>Minimum Yield</FilterLabel>
          <FilterSelect value={minYield} onChange={(e) => setMinYield(e.target.value)}>
            <option value="all">Any Yield</option>
            <option value="under5">Under 5%</option>
            <option value="5to8">5% - 8%</option>
            <option value="8to10">8% - 10%</option>
            <option value="over10">Over 10%</option>
          </FilterSelect>
        </FilterGroup>
        
        <FilterGroup>
          <FilterLabel>Sort By</FilterLabel>
          <FilterSelect value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="priceAsc">Price: Low to High</option>
            <option value="priceDesc">Price: High to Low</option>
            <option value="yieldDesc">Highest Yield</option>
          </FilterSelect>
        </FilterGroup>
      </FiltersContainer>
      
      {filteredProperties.length > 0 ? (
        <PropertiesGrid>
          {filteredProperties.map((property) => (
            <PropertyCard key={property.id}>
              <PropertyImage src={property.property.image} alt={property.property.address} />
              <PropertyContent>
                <PropertyTitle>{`Fractional Property #${property.id}`}</PropertyTitle>
                <PropertyAddress>{property.property.address}</PropertyAddress>
                
                <TokenInfo>
                  <TokenRow>
                    <TokenLabel>Token Supply</TokenLabel>
                    <TokenValue>{property.totalSupply}</TokenValue>
                  </TokenRow>
                  <TokenRow>
                    <TokenLabel>Available Tokens</TokenLabel>
                    <TokenValue>{property.availableTokens}</TokenValue>
                  </TokenRow>
                  <TokenRow>
                    <TokenLabel>Listed</TokenLabel>
                    <TokenValue>{formatDate(property.createdAt)}</TokenValue>
                  </TokenRow>
                </TokenInfo>
                
                <PriceRow>
                  <TokenPrice>{property.tokenPrice} ETH</TokenPrice>
                  <YieldValue>{property.expectedYield}% yield</YieldValue>
                </PriceRow>
                
                <ButtonGroup>
                  <ViewButton to={`/fractional/${property.id}`}>Details</ViewButton>
                  <BuyButton to={`/fractional/${property.id}/buy`}>Buy Tokens</BuyButton>
                </ButtonGroup>
              </PropertyContent>
            </PropertyCard>
          ))}
        </PropertiesGrid>
      ) : (
        <NoPropertiesMessage>
          No fractional properties found matching your criteria. Try adjusting your filters or check back later.
        </NoPropertiesMessage>
      )}
    </FractionalContainer>
  );
};

export default FractionalProperties;