import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ethers } from 'ethers';
import { Web3Context } from '../context/Web3Context';
import { useAuth } from '../context/AuthContext';

const AuctionDetailsContainer = styled.div`
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

const AuctionGrid = styled.div`
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

const PropertyTitle = styled.h1`
  font-size: 2rem;
  margin-bottom: 0.5rem;
`;

const PropertyAddress = styled.p`
  color: #666;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
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

const BidHistory = styled.div`
  margin-bottom: 2rem;
`;

const BidTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHead = styled.thead`
  background-color: #f8f9fa;
`;

const TableRow = styled.tr`
  border-bottom: 1px solid #eee;
  
  &:last-child {
    border-bottom: none;
  }
`;

const TableHeader = styled.th`
  padding: 1rem;
  text-align: left;
  font-weight: 500;
  color: #666;
`;

const TableCell = styled.td`
  padding: 1rem;
  color: #333;
`;

const BidderAddress = styled.span`
  font-family: monospace;
  font-size: 0.9rem;
`;

const BidAmount = styled.span`
  font-weight: 500;
  color: #4361ee;
`;

const BidTime = styled.span`
  color: #666;
  font-size: 0.9rem;
`;

const AuctionCard = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 2rem;
`;

const AuctionTitle = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 1rem;
`;

const TimeRemaining = styled.div`
  background-color: #f8f9fa;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const TimeValue = styled.div`
  font-size: 1.8rem;
  font-weight: bold;
  color: ${props => props.urgent ? '#e53e3e' : '#333'};
  margin-bottom: 0.5rem;
`;

const TimeLabel = styled.div`
  color: #666;
  font-size: 0.9rem;
`;

const PriceInfo = styled.div`
  margin-bottom: 1.5rem;
`;

const PriceRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

const PriceLabel = styled.span`
  color: #666;
`;

const PriceValue = styled.span`
  font-weight: 500;
`;

const CurrentBid = styled.div`
  font-size: 1.8rem;
  font-weight: bold;
  color: #4361ee;
  margin: 1rem 0;
  text-align: center;
`;

const BidForm = styled.form`
  margin-bottom: 1.5rem;
`;

const BidInputGroup = styled.div`
  display: flex;
  margin-bottom: 1rem;
`;

const BidInput = styled.input`
  flex: 1;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px 0 0 4px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #4361ee;
  }
`;

const EthLabel = styled.span`
  background-color: #f8f9fa;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-left: none;
  border-radius: 0 4px 4px 0;
  color: #666;
`;

const BidButton = styled.button`
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

const MinBidNote = styled.div`
  font-size: 0.9rem;
  color: #666;
  text-align: center;
  margin-top: 0.5rem;
`;

const SellerInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid #eee;
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

const AuctionDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { account, auctionContract, nftContract, isLoading: web3Loading, error: web3Error } = useContext(Web3Context);
  const { currentUser, userProfile } = useAuth();
  
  const [auction, setAuction] = useState(null);
  const [property, setProperty] = useState(null);
  const [bidHistory, setBidHistory] = useState([]);
  const [bidAmount, setBidAmount] = useState('');
  const [timeRemaining, setTimeRemaining] = useState('');
  const [isUrgent, setIsUrgent] = useState(false);
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isBidding, setIsBidding] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  
  // Mock images for demonstration
  const images = [
    `https://source.unsplash.com/random/800x600/?house&id=${id}`,
    `https://source.unsplash.com/random/800x600/?interior&id=${id}`,
    `https://source.unsplash.com/random/800x600/?kitchen&id=${id}`,
    `https://source.unsplash.com/random/800x600/?bathroom&id=${id}`,
  ];
  
  // Format time remaining
  const formatTimeRemaining = (endTime) => {
    const now = new Date();
    const end = new Date(endTime * 1000);
    const diff = end - now;
    
    if (diff <= 0) return 'Auction ended';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    if (days > 0) {
      return `${days}d ${hours}h ${minutes}m ${seconds}s`;
    } else if (hours > 0) {
      return `${hours}h ${minutes}m ${seconds}s`;
    } else {
      return `${minutes}m ${seconds}s`;
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
  
  // Format date for display
  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleString();
  };
  
  // Format address for display
  const formatAddress = (address) => {
    if (!address) return '';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };
  
  // Fetch auction details
  useEffect(() => {
    const fetchAuctionDetails = async () => {
      try {
        if (!auctionContract || !nftContract) return;
        
        setIsLoading(true);
        
        // Get auction details
        const auctionData = await auctionContract.getAuction(id);
        
        // Get property details
        const tokenId = auctionData.tokenId.toNumber();
        const propertyData = await nftContract.getProperty(tokenId);
        
        // Get bid history
        const bidCount = await auctionContract.getBidCount(id);
        const bidPromises = [];
        
        for (let i = 0; i < bidCount; i++) {
          bidPromises.push(auctionContract.getBid(id, i));
        }
        
        const bids = await Promise.all(bidPromises);
        
        // Get auction status
        const auctionStatus = getAuctionStatus(
          auctionData.startTime.toNumber(),
          auctionData.endTime.toNumber()
        );
        
        // Format time remaining
        const remaining = formatTimeRemaining(auctionData.endTime.toNumber());
        
        // Check if auction is ending soon
        const isEndingSoon = auctionData.endTime.toNumber() - Math.floor(Date.now() / 1000) < 3600; // Less than 1 hour
        
        // Set auction data
        setAuction({
          id: auctionData.auctionId.toNumber(),
          tokenId,
          seller: auctionData.seller,
          startingPrice: ethers.utils.formatEther(auctionData.startingPrice),
          startTime: auctionData.startTime.toNumber(),
          endTime: auctionData.endTime.toNumber(),
          highestBidder: auctionData.highestBidder,
          highestBidAmount: ethers.utils.formatEther(auctionData.highestBid),
          minBidIncrement: ethers.utils.formatEther(auctionData.minBidIncrement),
          formattedStartTime: formatDate(auctionData.startTime.toNumber()),
          formattedEndTime: formatDate(auctionData.endTime.toNumber())
        });
        
        // Set property data
        setProperty({
          tokenId,
          address: propertyData.propertyAddress,
          squareFootage: propertyData.squareFootage.toNumber(),
          bedrooms: propertyData.bedrooms.toNumber(),
          bathrooms: propertyData.bathrooms.toNumber(),
          propertyType: propertyData.propertyType,
          isVerified: propertyData.isVerified,
          images,
          description: "This beautiful property features modern architecture with high-end finishes throughout. The open floor plan creates a seamless flow between the living, dining, and kitchen areas, perfect for entertaining. Large windows allow for abundant natural light and stunning views. The property includes a spacious primary suite with a luxurious bathroom, as well as additional bedrooms and bathrooms for family or guests. Outside, you'll find a well-maintained garden and patio area, ideal for relaxation and outdoor activities."
        });
        
        // Set bid history
        setBidHistory(
          bids.map((bid, index) => ({
            id: index,
            bidder: bid.bidder,
            amount: ethers.utils.formatEther(bid.amount),
            timestamp: bid.timestamp.toNumber(),
            formattedTime: formatDate(bid.timestamp.toNumber())
          })).reverse() // Show newest bids first
        );
        
        // Set auction status
        setStatus(auctionStatus);
        
        // Set time remaining
        setTimeRemaining(remaining);
        
        // Set urgency flag
        setIsUrgent(isEndingSoon);
        
        // Start timer to update time remaining
        const timer = setInterval(() => {
          const newRemaining = formatTimeRemaining(auctionData.endTime.toNumber());
          const newStatus = getAuctionStatus(
            auctionData.startTime.toNumber(),
            auctionData.endTime.toNumber()
          );
          
          setTimeRemaining(newRemaining);
          setStatus(newStatus);
          
          // If auction has ended, clear interval
          if (newStatus === 'ended') {
            clearInterval(timer);
          }
        }, 1000);
        
        return () => clearInterval(timer);
      } catch (err) {
        console.error("Error fetching auction details:", err);
        setError("Failed to load auction details. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchAuctionDetails();
  }, [id, auctionContract, nftContract]);
  
  // Calculate minimum bid amount
  const getMinimumBidAmount = () => {
    if (!auction) return 0;
    
    const highestBid = parseFloat(auction.highestBidAmount);
    const minIncrement = parseFloat(auction.minBidIncrement);
    
    return highestBid > 0 
      ? (highestBid + minIncrement).toFixed(4)
      : auction.startingPrice;
  };
  
  // Handle bid submission
  const handleBid = async (e) => {
    e.preventDefault();
    
    try {
      if (!account || !auction) return;
      
      const bidAmountWei = ethers.utils.parseEther(bidAmount);
      const minBidAmount = ethers.utils.parseEther(getMinimumBidAmount());
      
      // Validate bid amount
      if (bidAmountWei.lt(minBidAmount)) {
        setError(`Bid must be at least ${getMinimumBidAmount()} ETH`);
        return;
      }
      
      setIsBidding(true);
      setError(null);
      
      // Place bid
      const transaction = await auctionContract.placeBid(auction.id, {
        value: bidAmountWei
      });
      
      // Wait for transaction to be mined
      await transaction.wait();
      
      // Refresh auction details
      window.location.reload();
    } catch (err) {
      console.error("Error placing bid:", err);
      setError("Failed to place bid. Please try again.");
    } finally {
      setIsBidding(false);
    }
  };
  
  // Show loading state
  if (web3Loading || isLoading) {
    return (
      <AuctionDetailsContainer>
        <LoadingMessage>Loading auction details...</LoadingMessage>
      </AuctionDetailsContainer>
    );
  }
  
  // Show error state
  if (web3Error || error) {
    return (
      <AuctionDetailsContainer>
        <BackButton onClick={() => navigate(-1)}>← Back to Auctions</BackButton>
        <ErrorMessage>
          {web3Error || error}
        </ErrorMessage>
      </AuctionDetailsContainer>
    );
  }
  
  // Show not found state
  if (!auction || !property) {
    return (
      <AuctionDetailsContainer>
        <BackButton onClick={() => navigate(-1)}>← Back to Auctions</BackButton>
        <ErrorMessage>
          Auction not found. The auction may have been removed or does not exist.
        </ErrorMessage>
      </AuctionDetailsContainer>
    );
  }
  
  return (
    <AuctionDetailsContainer>
      <BackButton onClick={() => navigate(-1)}>← Back to Auctions</BackButton>
      
      <AuctionGrid>
        <div>
          <PropertyImages>
            <MainImage src={property.images[selectedImage]} alt={`Property #${property.tokenId}`} />
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
            <AuctionStatus status={status}>
              {status === 'live' ? 'Live Auction' : 
               status === 'upcoming' ? 'Upcoming Auction' : 
               'Auction Ended'}
            </AuctionStatus>
            <PropertyTitle>{`Property #${property.tokenId}`}</PropertyTitle>
            <PropertyAddress>{property.address}</PropertyAddress>
            <VerificationBadge verified={property.isVerified}>
              {property.isVerified ? 'Verified' : 'Unverified'}
            </VerificationBadge>
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
                <DetailLabel>Token ID</DetailLabel>
                <DetailValue>#{property.tokenId}</DetailValue>
              </DetailItem>
              <DetailItem>
                <DetailLabel>Seller</DetailLabel>
                <DetailValue>{formatAddress(auction.seller)}</DetailValue>
              </DetailItem>
            </DetailsList>
          </PropertyDetailsSection>
          
          <PropertyDescription>
            <DetailTitle>Description</DetailTitle>
            <Description>{property.description}</Description>
          </PropertyDescription>
          
          <BidHistory>
            <DetailTitle>Bid History</DetailTitle>
            
            {bidHistory.length > 0 ? (
              <BidTable>
                <TableHead>
                  <TableRow>
                    <TableHeader>Bidder</TableHeader>
                    <TableHeader>Amount</TableHeader>
                    <TableHeader>Time</TableHeader>
                  </TableRow>
                </TableHead>
                <tbody>
                  {bidHistory.map((bid) => (
                    <TableRow key={bid.id}>
                      <TableCell>
                        <BidderAddress>{formatAddress(bid.bidder)}</BidderAddress>
                      </TableCell>
                      <TableCell>
                        <BidAmount>{bid.amount} ETH</BidAmount>
                      </TableCell>
                      <TableCell>
                        <BidTime>{bid.formattedTime}</BidTime>
                      </TableCell>
                    </TableRow>
                  ))}
                </tbody>
              </BidTable>
            ) : (
              <p>No bids have been placed yet.</p>
            )}
          </BidHistory>
        </div>
        
        <AuctionCard>
          <AuctionTitle>
            {status === 'live' ? 'Place a Bid' : 
             status === 'upcoming' ? 'Auction Details' : 
             'Auction Results'}
          </AuctionTitle>
          
          <TimeRemaining>
            <TimeValue urgent={isUrgent && status === 'live'}>
              {timeRemaining}
            </TimeValue>
            <TimeLabel>
              {status === 'live' ? 'Remaining' : 
               status === 'upcoming' ? 'Until auction starts' : 
               'Auction has ended'}
            </TimeLabel>
          </TimeRemaining>
          
          <PriceInfo>
            <PriceRow>
              <PriceLabel>Starting Price</PriceLabel>
              <PriceValue>{auction.startingPrice} ETH</PriceValue>
            </PriceRow>
            <PriceRow>
              <PriceLabel>Start Time</PriceLabel>
              <PriceValue>{auction.formattedStartTime}</PriceValue>
            </PriceRow>
            <PriceRow>
              <PriceLabel>End Time</PriceLabel>
              <PriceValue>{auction.formattedEndTime}</PriceValue>
            </PriceRow>
          </PriceInfo>
          
          <CurrentBid>
            {parseFloat(auction.highestBidAmount) > 0 
              ? `${auction.highestBidAmount} ETH` 
              : 'No bids yet'}
          </CurrentBid>
          
          {status === 'live' && account && (
            <>
              <BidForm onSubmit={handleBid}>
                <BidInputGroup>
                  <BidInput
                    type="number"
                    step="0.001"
                    min={getMinimumBidAmount()}
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}
                    placeholder={`Min. ${getMinimumBidAmount()}`}
                    required
                  />
                  <EthLabel>ETH</EthLabel>
                </BidInputGroup>
                
                <BidButton 
                  type="submit" 
                  disabled={
                    isBidding || 
                    !account || 
                    auction.seller.toLowerCase() === account.toLowerCase()
                  }
                >
                  {isBidding ? 'Processing...' : 'Place Bid'}
                </BidButton>
                
                <MinBidNote>
                  Minimum bid: {getMinimumBidAmount()} ETH
                </MinBidNote>
              </BidForm>
              
              {auction.seller.toLowerCase() === account.toLowerCase() && (
                <ErrorMessage>
                  You cannot bid on your own auction.
                </ErrorMessage>
              )}
            </>
          )}
          
          {status === 'ended' && (
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              {parseFloat(auction.highestBidAmount) > 0 ? (
                <>
                  <p style={{ marginBottom: '0.5rem' }}>
                    <strong>Winning Bidder:</strong>
                  </p>
                  <p style={{ fontFamily: 'monospace', marginBottom: '1rem' }}>
                    {formatAddress(auction.highestBidder)}
                  </p>
                </>
              ) : (
                <p>This auction ended with no bids.</p>
              )}
            </div>
          )}
          
          {!account && status === 'live' && (
            <ErrorMessage>
              Please connect your wallet to place a bid.
            </ErrorMessage>
          )}
          
          <SellerInfo>
            <SellerLabel>Seller:</SellerLabel>
            <SellerAddress>{formatAddress(auction.seller)}</SellerAddress>
          </SellerInfo>
        </AuctionCard>
      </AuctionGrid>
    </AuctionDetailsContainer>
  );
};

export default AuctionDetails;