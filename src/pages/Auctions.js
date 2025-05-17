import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ethers } from 'ethers';
import { Web3Context } from '../context/Web3Context';
import { useAuth } from '../context/AuthContext';

const AuctionsContainer = styled.div`
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

const AuctionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
`;

const AuctionCard = styled.div`
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

const AuctionContent = styled.div`
  padding: 1.5rem;
`;

const AuctionStatus = styled.div`
  display: inline-block;
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  background-color: ${props => 
    props.status === 'live' ? '#f0fff4' : 
    props.status === 'upcoming' ? '#e6f2ff' : '#fff5f5'};
  color: ${props => 
    props.status === 'live' ? '#38a169' : 
    props.status === 'upcoming' ? '#0066cc' : '#e53e3e'};
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

const AuctionDetails = styled.div`
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #eee;
`;

const AuctionRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

const AuctionLabel = styled.span`
  color: #666;
`;

const AuctionValue = styled.span`
  font-weight: 500;
`;

const CurrentBid = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #4361ee;
  margin: 1rem 0;
`;

const TimeRemaining = styled.div`
  font-size: 1.1rem;
  font-weight: 500;
  margin-bottom: 1rem;
  color: ${props => props.urgent ? '#e53e3e' : '#333'};
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

const NoAuctionsMessage = styled.div`
  text-align: center;
  padding: 3rem;
  color: #666;
  background-color: #f8f9fa;
  border-radius: 8px;
`;

const Auctions = () => {
  const { auctionContract, nftContract, isLoading: web3Loading, error: web3Error } = useContext(Web3Context);
  const { currentUser } = useAuth();
  
  const [auctions, setAuctions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Filters
  const [status, setStatus] = useState('all');
  const [propertyType, setPropertyType] = useState('all');
  const [sortBy, setSortBy] = useState('endTime');
  
  // Format time remaining
  const formatTimeRemaining = (endTime) => {
    const now = new Date();
    const end = new Date(endTime * 1000);
    const diff = end - now;
    
    if (diff <= 0) return 'Ended';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (days > 0) {
      return `${days}d ${hours}h left`;
    } else if (hours > 0) {
      return `${hours}h ${minutes}m left`;
    } else {
      return `${minutes}m left`;
    }
  };
  
  // Check if auction is live, upcoming, or ended
  const getAuctionStatus = (startTime, endTime) => {
    const now = Math.floor(Date.now() / 1000);
    
    if (now < startTime) {
      return 'upcoming';
    } else if (now >= startTime && now < endTime) {
      return 'live';
    } else {
      return 'ended';
    }
  };
  
  // Fetch auctions from the contract
  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        if (!auctionContract || !nftContract) return;
        
        setIsLoading(true);
        
        // Get all auctions from contract
        const auctionCount = await auctionContract.getAuctionCount();
        const auctionPromises = [];
        
        for (let i = 1; i <= auctionCount; i++) {
          auctionPromises.push(auctionContract.getAuction(i));
        }
        
        const auctionsData = await Promise.all(auctionPromises);
        
        // Fetch property details for each auction
        const auctionsWithDetails = await Promise.all(
          auctionsData.map(async (auction) => {
            const tokenId = auction.tokenId.toNumber();
            const property = await nftContract.getProperty(tokenId);
            
            // Get highest bid
            const highestBid = await auctionContract.getHighestBid(auction.auctionId);
            
            // Get auction status
            const status = getAuctionStatus(
              auction.startTime.toNumber(),
              auction.endTime.toNumber()
            );
            
            return {
              id: auction.auctionId.toNumber(),
              tokenId,
              seller: auction.seller,
              startingPrice: ethers.utils.formatEther(auction.startingPrice),
              startTime: auction.startTime.toNumber(),
              endTime: auction.endTime.toNumber(),
              highestBidder: highestBid.bidder,
              highestBidAmount: ethers.utils.formatEther(highestBid.amount),
              status,
              timeRemaining: formatTimeRemaining(auction.endTime.toNumber()),
              isUrgent: auction.endTime.toNumber() - Math.floor(Date.now() / 1000) < 3600, // Less than 1 hour
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
        
        setAuctions(auctionsWithDetails);
      } catch (err) {
        console.error("Error fetching auctions:", err);
        setError("Failed to load auctions. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchAuctions();
  }, [auctionContract, nftContract]);
  
  // Filter and sort auctions
  const filteredAuctions = auctions.filter(auction => {
    // Filter by status
    if (status !== 'all' && auction.status !== status) {
      return false;
    }
    
    // Filter by property type
    if (propertyType !== 'all' && auction.property.propertyType !== propertyType) {
      return false;
    }
    
    return true;
  }).sort((a, b) => {
    // Sort by selected criteria
    switch (sortBy) {
      case 'endTime':
        return a.endTime - b.endTime;
      case 'startingPrice':
        return parseFloat(a.startingPrice) - parseFloat(b.startingPrice);
      case 'highestBid':
        return parseFloat(b.highestBidAmount) - parseFloat(a.highestBidAmount);
      default:
        return 0;
    }
  });
  
  // Show loading state
  if (web3Loading || isLoading) {
    return (
      <AuctionsContainer>
        <Header>
          <Title>Property Auctions</Title>
          <Subtitle>Bid on real estate properties in live auctions</Subtitle>
        </Header>
        <LoadingMessage>Loading auctions...</LoadingMessage>
      </AuctionsContainer>
    );
  }
  
  // Show error state
  if (web3Error || error) {
    return (
      <AuctionsContainer>
        <Header>
          <Title>Property Auctions</Title>
          <Subtitle>Bid on real estate properties in live auctions</Subtitle>
        </Header>
        <ErrorMessage>
          {web3Error || error}
        </ErrorMessage>
      </AuctionsContainer>
    );
  }
  
  return (
    <AuctionsContainer>
      <Header>
        <Title>Property Auctions</Title>
        <Subtitle>Bid on real estate properties in live auctions</Subtitle>
      </Header>
      
      <FiltersContainer>
        <FilterGroup>
          <FilterLabel>Status</FilterLabel>
          <FilterSelect value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="all">All Auctions</option>
            <option value="live">Live Auctions</option>
            <option value="upcoming">Upcoming Auctions</option>
            <option value="ended">Ended Auctions</option>
          </FilterSelect>
        </FilterGroup>
        
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
          <FilterLabel>Sort By</FilterLabel>
          <FilterSelect value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="endTime">Ending Soon</option>
            <option value="startingPrice">Starting Price</option>
            <option value="highestBid">Highest Bid</option>
          </FilterSelect>
        </FilterGroup>
      </FiltersContainer>
      
      {filteredAuctions.length > 0 ? (
        <AuctionsGrid>
          {filteredAuctions.map((auction) => (
            <AuctionCard key={auction.id}>
              <PropertyImage src={auction.property.image} alt={auction.property.address} />
              <AuctionContent>
                <AuctionStatus status={auction.status}>
                  {auction.status === 'live' ? 'Live Auction' : 
                   auction.status === 'upcoming' ? 'Upcoming Auction' : 
                   'Auction Ended'}
                </AuctionStatus>
                <PropertyAddress>{auction.property.address}</PropertyAddress>
                <PropertyFeatures>
                  <PropertyFeature>{auction.property.bedrooms} Beds</PropertyFeature>
                  <PropertyFeature>{auction.property.bathrooms} Baths</PropertyFeature>
                  <PropertyFeature>{auction.property.squareFootage} sqft</PropertyFeature>
                </PropertyFeatures>
                
                <AuctionDetails>
                  <AuctionRow>
                    <AuctionLabel>Starting Price</AuctionLabel>
                    <AuctionValue>{auction.startingPrice} ETH</AuctionValue>
                  </AuctionRow>
                  <AuctionRow>
                    <AuctionLabel>Bids</AuctionLabel>
                    <AuctionValue>12</AuctionValue> {/* Mock data */}
                  </AuctionRow>
                  
                  <CurrentBid>
                    {parseFloat(auction.highestBidAmount) > 0 
                      ? `${auction.highestBidAmount} ETH` 
                      : 'No bids yet'}
                  </CurrentBid>
                  
                  {auction.status !== 'ended' && (
                    <TimeRemaining urgent={auction.isUrgent}>
                      {auction.timeRemaining}
                    </TimeRemaining>
                  )}
                  
                  <ViewButton to={`/auction/${auction.id}`}>
                    {auction.status === 'live' ? 'Place Bid' : 
                     auction.status === 'upcoming' ? 'View Details' : 
                     'View Results'}
                  </ViewButton>
                </AuctionDetails>
              </AuctionContent>
            </AuctionCard>
          ))}
        </AuctionsGrid>
      ) : (
        <NoAuctionsMessage>
          No auctions found matching your criteria. Try adjusting your filters or check back later.
        </NoAuctionsMessage>
      )}
    </AuctionsContainer>
  );
};

export default Auctions;