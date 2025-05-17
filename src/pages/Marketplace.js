import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ethers } from 'ethers';
import { Web3Context } from '../context/Web3Context';

const MarketplaceContainer = styled.div`
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

const PropertyType = styled.div`
  background-color: #e6f2ff;
  color: #0066cc;
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  font-size: 0.9rem;
  display: inline-block;
  margin-bottom: 1rem;
`;

const ViewButton = styled(Link)`
  display: block;
  background-color: #4361ee;
  color: white;
  text-align: center;
  padding: 0.7rem;
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

const NoPropertiesMessage = styled.div`
  text-align: center;
  padding: 3rem;
  color: #666;
  background-color: #f8f9fa;
  border-radius: 8px;
`;

const Marketplace = () => {
  const { marketplaceContract, nftContract, isLoading: web3Loading, error: web3Error } = useContext(Web3Context);
  
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Filters
  const [propertyType, setPropertyType] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [bedrooms, setBedrooms] = useState('all');
  
  // Fetch properties from the marketplace
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        if (!marketplaceContract || !nftContract) return;
        
        setIsLoading(true);
        
        // Get active listings from marketplace
        const listings = await marketplaceContract.getActiveListings();
        
        // Fetch property details for each listing
        const propertyPromises = listings.map(async (listing) => {
          const tokenId = listing.tokenId.toNumber();
          const price = ethers.utils.formatEther(listing.price);
          
          // Get property details from NFT contract
          const property = await nftContract.getProperty(tokenId);
          
          // Get token URI for metadata
          const tokenURI = await nftContract.tokenURI(tokenId);
          
          // Fetch metadata (in a real app, this would be from IPFS or another storage)
          // For this example, we'll create mock data
          const metadata = {
            name: `Property #${tokenId}`,
            description: "A beautiful property on the blockchain",
            image: `https://source.unsplash.com/random/800x600/?house&id=${tokenId}`, // Placeholder image
          };
          
          return {
            id: tokenId,
            listingId: listing.listingId.toNumber(),
            price,
            seller: listing.seller,
            address: property.propertyAddress,
            squareFootage: property.squareFootage.toNumber(),
            bedrooms: property.bedrooms.toNumber(),
            bathrooms: property.bathrooms.toNumber(),
            propertyType: property.propertyType,
            isVerified: property.isVerified,
            metadata
          };
        });
        
        const propertiesData = await Promise.all(propertyPromises);
        setProperties(propertiesData);
      } catch (err) {
        console.error("Error fetching properties:", err);
        setError("Failed to load properties. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProperties();
  }, [marketplaceContract, nftContract]);
  
  // Filter properties based on selected filters
  const filteredProperties = properties.filter(property => {
    // Filter by property type
    if (propertyType !== 'all' && property.propertyType !== propertyType) {
      return false;
    }
    
    // Filter by price range
    if (priceRange !== 'all') {
      const price = parseFloat(property.price);
      if (priceRange === 'under1' && price >= 1) return false;
      if (priceRange === '1to5' && (price < 1 || price > 5)) return false;
      if (priceRange === '5to10' && (price < 5 || price > 10)) return false;
      if (priceRange === 'over10' && price <= 10) return false;
    }
    
    // Filter by bedrooms
    if (bedrooms !== 'all' && property.bedrooms !== parseInt(bedrooms)) {
      return false;
    }
    
    return true;
  });
  
  // Show loading state
  if (web3Loading || isLoading) {
    return (
      <MarketplaceContainer>
        <Header>
          <Title>Property Marketplace</Title>
          <Subtitle>Browse and purchase real estate properties as NFTs</Subtitle>
        </Header>
        <LoadingMessage>Loading properties...</LoadingMessage>
      </MarketplaceContainer>
    );
  }
  
  // Show error state
  if (web3Error || error) {
    return (
      <MarketplaceContainer>
        <Header>
          <Title>Property Marketplace</Title>
          <Subtitle>Browse and purchase real estate properties as NFTs</Subtitle>
        </Header>
        <ErrorMessage>
          {web3Error || error}
        </ErrorMessage>
      </MarketplaceContainer>
    );
  }
  
  return (
    <MarketplaceContainer>
      <Header>
        <Title>Property Marketplace</Title>
        <Subtitle>Browse and purchase real estate properties as NFTs</Subtitle>
      </Header>
      
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
          <FilterLabel>Price Range (ETH)</FilterLabel>
          <FilterSelect value={priceRange} onChange={(e) => setPriceRange(e.target.value)}>
            <option value="all">All Prices</option>
            <option value="under1">Under 1 ETH</option>
            <option value="1to5">1 - 5 ETH</option>
            <option value="5to10">5 - 10 ETH</option>
            <option value="over10">Over 10 ETH</option>
          </FilterSelect>
        </FilterGroup>
        
        <FilterGroup>
          <FilterLabel>Bedrooms</FilterLabel>
          <FilterSelect value={bedrooms} onChange={(e) => setBedrooms(e.target.value)}>
            <option value="all">Any</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4+</option>
          </FilterSelect>
        </FilterGroup>
      </FiltersContainer>
      
      {filteredProperties.length > 0 ? (
        <PropertiesGrid>
          {filteredProperties.map((property) => (
            <PropertyCard key={property.id}>
              <PropertyImage src={property.metadata.image} alt={property.metadata.name} />
              <PropertyContent>
                <PropertyPrice>{property.price} ETH</PropertyPrice>
                <PropertyAddress>{property.address}</PropertyAddress>
                <PropertyFeatures>
                  <PropertyFeature>{property.bedrooms} Beds</PropertyFeature>
                  <PropertyFeature>{property.bathrooms} Baths</PropertyFeature>
                  <PropertyFeature>{property.squareFootage} sqft</PropertyFeature>
                </PropertyFeatures>
                <PropertyType>{property.propertyType}</PropertyType>
                <ViewButton to={`/property/${property.id}`}>View Property</ViewButton>
              </PropertyContent>
            </PropertyCard>
          ))}
        </PropertiesGrid>
      ) : (
        <NoPropertiesMessage>
          No properties found matching your criteria. Try adjusting your filters or check back later.
        </NoPropertiesMessage>
      )}
    </MarketplaceContainer>
  );
};

export default Marketplace;