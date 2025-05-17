import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ethers } from 'ethers';
import { Web3Context } from '../context/Web3Context';

const PropertyDetailsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  color: #4361ee;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
  
  &:hover {
    text-decoration: underline;
  }
`;

const PropertyGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 2rem;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const PropertyImages = styled.div`
  border-radius: 8px;
  overflow: hidden;
`;

const MainImage = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
`;

const ThumbnailsContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const Thumbnail = styled.img`
  width: 80px;
  height: 60px;
  object-fit: cover;
  border-radius: 4px;
  cursor: pointer;
  opacity: ${props => props.active ? 1 : 0.6};
  transition: opacity 0.3s ease;
  
  &:hover {
    opacity: 1;
  }
`;

const PropertyInfo = styled.div``;

const PropertyHeader = styled.div`
  margin-bottom: 1.5rem;
`;

const PropertyTitle = styled.h1`
  font-size: 2rem;
  margin-bottom: 0.5rem;
`;

const PropertyAddress = styled.p`
  color: #666;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
`;

const PropertyPrice = styled.div`
  font-size: 1.8rem;
  font-weight: bold;
  color: #4361ee;
`;

const VerificationBadge = styled.span`
  background-color: ${props => props.verified ? '#e6fffa' : '#fff5f5'};
  color: ${props => props.verified ? '#0d9488' : '#ef4444'};
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  font-size: 0.9rem;
  margin-left: 1rem;
`;

const PropertyDetailsSection = styled.div`
  margin-bottom: 2rem;
`;

const DetailTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #333;
`;

const DetailsList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
`;

const DetailItem = styled.div`
  display: flex;
  flex-direction: column;
`;

const DetailLabel = styled.span`
  color: #666;
  font-size: 0.9rem;
`;

const DetailValue = styled.span`
  font-weight: 500;
  font-size: 1.1rem;
`;

const PropertyDescription = styled.div`
  margin-bottom: 2rem;
`;

const Description = styled.p`
  line-height: 1.6;
  color: #444;
`;

const PurchaseCard = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 2rem;
`;

const PurchaseTitle = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 1rem;
`;

const PurchasePrice = styled.div`
  font-size: 1.8rem;
  font-weight: bold;
  color: #4361ee;
  margin-bottom: 1.5rem;
`;

const SellerInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const SellerLabel = styled.span`
  color: #666;
`;

const SellerAddress = styled.span`
  font-family: monospace;
  background-color: #f8f9fa;
  padding: 0.3rem 0.5rem;
  border-radius: 4px;
  font-size: 0.9rem;
`;

const PurchaseButton = styled.button`
  width: 100%;
  background-color: #4361ee;
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 4px;
  font-weight: 500;
  font-size: 1.1rem;
  cursor: pointer;
  
  &:hover {
    background-color: #3a56d4;
  }
  
  &:disabled {
    background-color: #a0a0a0;
    cursor: not-allowed;
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

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { account, marketplaceContract, nftContract, isLoading: web3Loading, error: web3Error } = useContext(Web3Context);
  
  const [property, setProperty] = useState(null);
  const [listing, setListing] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  
  // Mock images for demonstration
  const images = [
    `https://source.unsplash.com/random/800x600/?house&id=${id}`,
    `https://source.unsplash.com/random/800x600/?interior&id=${id}`,
    `https://source.unsplash.com/random/800x600/?kitchen&id=${id}`,
    `https://source.unsplash.com/random/800x600/?bathroom&id=${id}`,
  ];
  
  // Fetch property details
  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        if (!marketplaceContract || !nftContract) return;
        
        setIsLoading(true);
        
        // Get property details from NFT contract
        const propertyData = await nftContract.getProperty(id);
        
        // Get token URI for metadata
        const tokenURI = await nftContract.tokenURI(id);
        
        // Get owner of the NFT
        const owner = await nftContract.ownerOf(id);
        
        // Find active listing for this property
        const allListings = await marketplaceContract.getActiveListings();
        const propertyListing = allListings.find(
          listing => listing.tokenId.toString() === id && listing.isActive
        );
        
        // Mock metadata (in a real app, this would be fetched from IPFS or another storage)
        const metadata = {
          name: `Property #${id}`,
          description: "This beautiful property features modern architecture with high-end finishes throughout. The open floor plan creates a seamless flow between the living, dining, and kitchen areas, perfect for entertaining. Large windows allow for abundant natural light and stunning views. The property includes a spacious primary suite with a luxurious bathroom, as well as additional bedrooms and bathrooms for family or guests. Outside, you'll find a well-maintained garden and patio area, ideal for relaxation and outdoor activities.",
          image: images[0],
        };
        
        setProperty({
          id: parseInt(id),
          owner,
          address: propertyData.propertyAddress,
          squareFootage: propertyData.squareFootage.toNumber(),
          bedrooms: propertyData.bedrooms.toNumber(),
          bathrooms: propertyData.bathrooms.toNumber(),
          propertyType: propertyData.propertyType,
          isVerified: propertyData.isVerified,
          metadata,
          images
        });
        
        if (propertyListing) {
          setListing({
            listingId: propertyListing.listingId.toNumber(),
            seller: propertyListing.seller,
            price: ethers.utils.formatEther(propertyListing.price),
            priceWei: propertyListing.price
          });
        }
      } catch (err) {
        console.error("Error fetching property details:", err);
        setError("Failed to load property details. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPropertyDetails();
  }, [id, marketplaceContract, nftContract]);
  
  // Handle property purchase
  const handlePurchase = async () => {
    try {
      if (!account || !listing) return;
      
      setIsPurchasing(true);
      
      // Purchase the property
      const transaction = await marketplaceContract.buyProperty(listing.listingId, {
        value: listing.priceWei
      });
      
      // Wait for transaction to be mined
      await transaction.wait();
      
      // Redirect to My Properties page
      navigate('/my-properties');
    } catch (err) {
      console.error("Error purchasing property:", err);
      setError("Failed to purchase property. Please try again.");
    } finally {
      setIsPurchasing(false);
    }
  };
  
  // Format seller address for display
  const formatAddress = (address) => {
    if (!address) return '';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };
  
  // Show loading state
  if (web3Loading || isLoading) {
    return (
      <PropertyDetailsContainer>
        <LoadingMessage>Loading property details...</LoadingMessage>
      </PropertyDetailsContainer>
    );
  }
  
  // Show error state
  if (web3Error || error) {
    return (
      <PropertyDetailsContainer>
        <BackButton onClick={() => navigate(-1)}>← Back to Marketplace</BackButton>
        <ErrorMessage>
          {web3Error || error}
        </ErrorMessage>
      </PropertyDetailsContainer>
    );
  }
  
  // Show not found state
  if (!property) {
    return (
      <PropertyDetailsContainer>
        <BackButton onClick={() => navigate(-1)}>← Back to Marketplace</BackButton>
        <ErrorMessage>
          Property not found. The property may have been removed or does not exist.
        </ErrorMessage>
      </PropertyDetailsContainer>
    );
  }
  
  return (
    <PropertyDetailsContainer>
      <BackButton onClick={() => navigate(-1)}>← Back to Marketplace</BackButton>
      
      <PropertyGrid>
        <div>
          <PropertyImages>
            <MainImage src={property.images[selectedImage]} alt={property.metadata.name} />
            <ThumbnailsContainer>
              {property.images.map((image, index) => (
                <Thumbnail 
                  key={index}
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  active={selectedImage === index}
                  onClick={() => setSelectedImage(index)}
                />
              ))}
            </ThumbnailsContainer>
          </PropertyImages>
          
          <PropertyHeader>
            <PropertyTitle>{property.metadata.name}</PropertyTitle>
            <PropertyAddress>{property.address}</PropertyAddress>
            <PropertyPrice>
              {listing ? `${listing.price} ETH` : 'Not for sale'}
              <VerificationBadge verified={property.isVerified}>
                {property.isVerified ? 'Verified' : 'Unverified'}
              </VerificationBadge>
            </PropertyPrice>
          </PropertyHeader>
          
          <PropertyDetailsSection>
            <DetailTitle>Property Details</DetailTitle>
            <DetailsList>
              <DetailItem>
                <DetailLabel>Property Type</DetailLabel>
                <DetailValue>{property.propertyType}</DetailValue>
              </DetailItem>
              <DetailItem>
                <DetailLabel>Square Footage</DetailLabel>
                <DetailValue>{property.squareFootage} sqft</DetailValue>
              </DetailItem>
              <DetailItem>
                <DetailLabel>Bedrooms</DetailLabel>
                <DetailValue>{property.bedrooms}</DetailValue>
              </DetailItem>
              <DetailItem>
                <DetailLabel>Bathrooms</DetailLabel>
                <DetailValue>{property.bathrooms}</DetailValue>
              </DetailItem>
              <DetailItem>
                <DetailLabel>Owner</DetailLabel>
                <DetailValue>{formatAddress(property.owner)}</DetailValue>
              </DetailItem>
              <DetailItem>
                <DetailLabel>Token ID</DetailLabel>
                <DetailValue>#{property.id}</DetailValue>
              </DetailItem>
            </DetailsList>
          </PropertyDetailsSection>
          
          <PropertyDescription>
            <DetailTitle>Description</DetailTitle>
            <Description>{property.metadata.description}</Description>
          </PropertyDescription>
        </div>
        
        {listing && (
          <PurchaseCard>
            <PurchaseTitle>Purchase this Property</PurchaseTitle>
            <PurchasePrice>{listing.price} ETH</PurchasePrice>
            <SellerInfo>
              <SellerLabel>Seller:</SellerLabel>
              <SellerAddress>{formatAddress(listing.seller)}</SellerAddress>
            </SellerInfo>
            <PurchaseButton 
              onClick={handlePurchase}
              disabled={!account || isPurchasing || listing.seller === account}
            >
              {!account ? 'Connect Wallet to Purchase' : 
               isPurchasing ? 'Processing...' : 
               listing.seller === account ? 'You Own This Listing' : 
               'Buy Now'}
            </PurchaseButton>
          </PurchaseCard>
        )}
      </PropertyGrid>
    </PropertyDetailsContainer>
  );
};

export default PropertyDetails;