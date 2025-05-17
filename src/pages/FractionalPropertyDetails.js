import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ethers } from 'ethers';
import { Web3Context } from '../context/Web3Context';
import { useAuth } from '../context/AuthContext';

const FractionalDetailsContainer = styled.div`
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

const DetailsGrid = styled.div`
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

const TokenizationDetails = styled.div`
  margin-bottom: 2rem;
`;

const TokenizationCard = styled.div`
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 1.5rem;
`;

const TokenRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const TokenLabel = styled.span`
  color: #666;
`;

const TokenValue = styled.span`
  font-weight: 500;
`;

const YieldInfo = styled.div`
  background-color: #f0fff4;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
`;

const YieldTitle = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 1rem;
  color: #38a169;
`;

const YieldDescription = styled.p`
  color: #444;
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const YieldRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const YieldLabel = styled.span`
  color: #666;
`;

const YieldValue = styled.span`
  font-weight: 500;
  color: #38a169;
`;

const TokenHolders = styled.div`
  margin-bottom: 2rem;
`;

const HolderTable = styled.table`
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

const HolderAddress = styled.span`
  font-family: monospace;
  font-size: 0.9rem;
`;

const TokenCount = styled.span`
  font-weight: 500;
`;

const Percentage = styled.span`
  color: #4361ee;
`;

const BuyCard = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 2rem;
`;

const BuyTitle = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 1rem;
`;

const TokenPrice = styled.div`
  font-size: 1.8rem;
  font-weight: bold;
  color: #4361ee;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const BuyForm = styled.form`
  margin-bottom: 1.5rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

const InputGroup = styled.div`
  display: flex;
`;

const Input = styled.input`
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

const InputAddon = styled.span`
  background-color: #f8f9fa;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-left: none;
  border-radius: 0 4px 4px 0;
  color: #666;
`;

const TotalAmount = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  background-color: #f8f9fa;
  border-radius: 4px;
  margin-bottom: 1.5rem;
`;

const TotalLabel = styled.span`
  color: #666;
`;

const TotalValue = styled.span`
  font-weight: 500;
  color: #4361ee;
`;

const BuyButton = styled.button`
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

const OwnerInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid #eee;
`;

const OwnerLabel = styled.span`
  color: #666;
`;

const OwnerAddress = styled.span`
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

const FractionalPropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { account, fractionalContract, nftContract, isLoading: web3Loading, error: web3Error } = useContext(Web3Context);
  const { currentUser, userProfile } = useAuth();
  
  const [property, setProperty] = useState(null);
  const [tokenDetails, setTokenDetails] = useState(null);
  const [holders, setHolders] = useState([]);
  const [tokensToBuy, setTokensToBuy] = useState(1);
  const [totalCost, setTotalCost] = useState('0');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isBuying, setIsBuying] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  
  // Mock images for demonstration
  const images = [
    `https://source.unsplash.com/random/800x600/?house&id=${id}`,
    `https://source.unsplash.com/random/800x600/?interior&id=${id}`,
    `https://source.unsplash.com/random/800x600/?kitchen&id=${id}`,
    `https://source.unsplash.com/random/800x600/?bathroom&id=${id}`,
  ];
  
  // Format address for display
  const formatAddress = (address) => {
    if (!address) return '';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };
  
  // Format date for display
  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString();
  };
  
  // Calculate total cost
  useEffect(() => {
    if (tokenDetails && tokensToBuy > 0) {
      const cost = parseFloat(tokenDetails.tokenPrice) * tokensToBuy;
      setTotalCost(cost.toFixed(4));
    } else {
      setTotalCost('0');
    }
  }, [tokenDetails, tokensToBuy]);
  
  // Fetch property details
  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        if (!fractionalContract || !nftContract) return;
        
        setIsLoading(true);
        
        // Get fractional property details
        const propertyData = await fractionalContract.getPropertyDetails(id);
        
        // Get property details from NFT contract
        const tokenId = propertyData.tokenId.toNumber();
        const nftPropertyData = await nftContract.getProperty(tokenId);
        
        // Get token holders
        const holderCount = await fractionalContract.getHolderCount(id);
        const holderPromises = [];
        
        for (let i = 0; i < holderCount; i++) {
          holderPromises.push(fractionalContract.getHolder(id, i));
        }
        
        const holdersData = await Promise.all(holderPromises);
        
        // Set token details
        setTokenDetails({
          id: propertyData.propertyId.toNumber(),
          tokenId,
          owner: propertyData.owner,
          tokenPrice: ethers.utils.formatEther(propertyData.tokenPrice),
          tokenPriceWei: propertyData.tokenPrice,
          totalSupply: propertyData.totalSupply.toNumber(),
          availableTokens: propertyData.availableTokens.toNumber(),
          expectedYield: propertyData.expectedYield.toNumber() / 100, // Convert from basis points to percentage
          rentalIncome: ethers.utils.formatEther(propertyData.rentalIncome),
          createdAt: propertyData.createdAt.toNumber(),
          formattedCreatedAt: formatDate(propertyData.createdAt.toNumber())
        });
        
        // Set property data
        setProperty({
          tokenId,
          address: nftPropertyData.propertyAddress,
          squareFootage: nftPropertyData.squareFootage.toNumber(),
          bedrooms: nftPropertyData.bedrooms.toNumber(),
          bathrooms: nftPropertyData.bathrooms.toNumber(),
          propertyType: nftPropertyData.propertyType,
          isVerified: nftPropertyData.isVerified,
          images,
          description: "This beautiful property features modern architecture with high-end finishes throughout. The open floor plan creates a seamless flow between the living, dining, and kitchen areas, perfect for entertaining. Large windows allow for abundant natural light and stunning views. The property includes a spacious primary suite with a luxurious bathroom, as well as additional bedrooms and bathrooms for family or guests. Outside, you'll find a well-maintained garden and patio area, ideal for relaxation and outdoor activities."
        });
        
        // Set token holders
        setHolders(
          holdersData.map((holder, index) => ({
            id: index,
            address: holder.holderAddress,
            tokenCount: holder.tokenCount.toNumber(),
            percentage: (holder.tokenCount.toNumber() / propertyData.totalSupply.toNumber() * 100).toFixed(2)
          })).sort((a, b) => b.tokenCount - a.tokenCount) // Sort by token count (descending)
        );
      } catch (err) {
        console.error("Error fetching property details:", err);
        setError("Failed to load property details. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPropertyDetails();
  }, [id, fractionalContract, nftContract]);
  
  // Handle token purchase
  const handleBuyTokens = async (e) => {
    e.preventDefault();
    
    try {
      if (!account || !tokenDetails) return;
      
      // Validate token count
      if (tokensToBuy <= 0 || tokensToBuy > tokenDetails.availableTokens) {
        setError(`Please enter a valid number of tokens (1-${tokenDetails.availableTokens})`);
        return;
      }
      
      setIsBuying(true);
      setError(null);
      
      // Calculate total cost
      const totalCostWei = tokenDetails.tokenPriceWei.mul(tokensToBuy);
      
      // Buy tokens
      const transaction = await fractionalContract.buyTokens(tokenDetails.id, tokensToBuy, {
        value: totalCostWei
      });
      
      // Wait for transaction to be mined
      await transaction.wait();
      
      // Refresh page
      window.location.reload();
    } catch (err) {
      console.error("Error buying tokens:", err);
      setError("Failed to buy tokens. Please try again.");
    } finally {
      setIsBuying(false);
    }
  };
  
  // Show loading state
  if (web3Loading || isLoading) {
    return (
      <FractionalDetailsContainer>
        <LoadingMessage>Loading property details...</LoadingMessage>
      </FractionalDetailsContainer>
    );
  }
  
  // Show error state
  if (web3Error || error) {
    return (
      <FractionalDetailsContainer>
        <BackButton onClick={() => navigate(-1)}>← Back to Fractional Properties</BackButton>
        <ErrorMessage>
          {web3Error || error}
        </ErrorMessage>
      </FractionalDetailsContainer>
    );
  }
  
  // Show not found state
  if (!property || !tokenDetails) {
    return (
      <FractionalDetailsContainer>
        <BackButton onClick={() => navigate(-1)}>← Back to Fractional Properties</BackButton>
        <ErrorMessage>
          Property not found. The property may have been removed or does not exist.
        </ErrorMessage>
      </FractionalDetailsContainer>
    );
  }
  
  return (
    <FractionalDetailsContainer>
      <BackButton onClick={() => navigate(-1)}>← Back to Fractional Properties</BackButton>
      
      <DetailsGrid>
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
            <PropertyTitle>{`Fractional Property #${tokenDetails.id}`}</PropertyTitle>
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
                <DetailLabel>Tokenized</DetailLabel>
                <DetailValue>{tokenDetails.formattedCreatedAt}</DetailValue>
              </DetailItem>
            </DetailsList>
          </PropertyDetailsSection>
          
          <PropertyDescription>
            <DetailTitle>Description</DetailTitle>
            <Description>{property.description}</Description>
          </PropertyDescription>
          
          <TokenizationDetails>
            <DetailTitle>Tokenization Details</DetailTitle>
            <TokenizationCard>
              <TokenRow>
                <TokenLabel>Total Token Supply</TokenLabel>
                <TokenValue>{tokenDetails.totalSupply}</TokenValue>
              </TokenRow>
              <TokenRow>
                <TokenLabel>Available Tokens</TokenLabel>
                <TokenValue>{tokenDetails.availableTokens}</TokenValue>
              </TokenRow>
              <TokenRow>
                <TokenLabel>Token Price</TokenLabel>
                <TokenValue>{tokenDetails.tokenPrice} ETH</TokenValue>
              </TokenRow>
              <TokenRow>
                <TokenLabel>Property Valuation</TokenLabel>
                <TokenValue>{(tokenDetails.totalSupply * parseFloat(tokenDetails.tokenPrice)).toFixed(2)} ETH</TokenValue>
              </TokenRow>
            </TokenizationCard>
          </TokenizationDetails>
          
          <YieldInfo>
            <YieldTitle>Investment Returns</YieldTitle>
            <YieldDescription>
              This property generates rental income that is distributed to token holders proportionally to their ownership percentage.
              Distributions are made monthly and automatically sent to token holders' wallets.
            </YieldDescription>
            <YieldRow>
              <YieldLabel>Expected Annual Yield</YieldLabel>
              <YieldValue>{tokenDetails.expectedYield}%</YieldValue>
            </YieldRow>
            <YieldRow>
              <YieldLabel>Monthly Rental Income</YieldLabel>
              <YieldValue>{tokenDetails.rentalIncome} ETH</YieldValue>
            </YieldRow>
            <YieldRow>
              <YieldLabel>Income Per Token (Monthly)</YieldLabel>
              <YieldValue>{(parseFloat(tokenDetails.rentalIncome) / tokenDetails.totalSupply).toFixed(6)} ETH</YieldValue>
            </YieldRow>
          </YieldInfo>
          
          <TokenHolders>
            <DetailTitle>Token Holders</DetailTitle>
            
            {holders.length > 0 ? (
              <HolderTable>
                <TableHead>
                  <TableRow>
                    <TableHeader>Address</TableHeader>
                    <TableHeader>Tokens</TableHeader>
                    <TableHeader>Ownership</TableHeader>
                  </TableRow>
                </TableHead>
                <tbody>
                  {holders.map((holder) => (
                    <TableRow key={holder.id}>
                      <TableCell>
                        <HolderAddress>{formatAddress(holder.address)}</HolderAddress>
                      </TableCell>
                      <TableCell>
                        <TokenCount>{holder.tokenCount}</TokenCount>
                      </TableCell>
                      <TableCell>
                        <Percentage>{holder.percentage}%</Percentage>
                      </TableCell>
                    </TableRow>
                  ))}
                </tbody>
              </HolderTable>
            ) : (
              <p>No token holders yet. Be the first to invest in this property!</p>
            )}
          </TokenHolders>
        </div>
        
        <BuyCard>
          <BuyTitle>Buy Ownership Tokens</BuyTitle>
          
          <TokenPrice>{tokenDetails.tokenPrice} ETH per token</TokenPrice>
          
          {tokenDetails.availableTokens > 0 ? (
            <>
              <BuyForm onSubmit={handleBuyTokens}>
                <FormGroup>
                  <Label htmlFor="tokenCount">Number of Tokens</Label>
                  <InputGroup>
                    <Input
                      type="number"
                      id="tokenCount"
                      min="1"
                      max={tokenDetails.availableTokens}
                      value={tokensToBuy}
                      onChange={(e) => setTokensToBuy(parseInt(e.target.value) || 0)}
                      required
                    />
                    <InputAddon>Tokens</InputAddon>
                  </InputGroup>
                </FormGroup>
                
                <TotalAmount>
                  <TotalLabel>Total Cost</TotalLabel>
                  <TotalValue>{totalCost} ETH</TotalValue>
                </TotalAmount>
                
                <BuyButton 
                  type="submit" 
                  disabled={
                    isBuying || 
                    !account || 
                    tokensToBuy <= 0 || 
                    tokensToBuy > tokenDetails.availableTokens
                  }
                >
                  {isBuying ? 'Processing...' : 'Buy Tokens'}
                </BuyButton>
              </BuyForm>
              
              <p style={{ fontSize: '0.9rem', color: '#666', textAlign: 'center' }}>
                {tokenDetails.availableTokens} tokens available for purchase
              </p>
            </>
          ) : (
            <ErrorMessage>
              All tokens have been sold. Check back later for secondary market offerings.
            </ErrorMessage>
          )}
          
          {!account && (
            <ErrorMessage>
              Please connect your wallet to purchase tokens.
            </ErrorMessage>
          )}
          
          <OwnerInfo>
            <OwnerLabel>Property Owner:</OwnerLabel>
            <OwnerAddress>{formatAddress(tokenDetails.owner)}</OwnerAddress>
          </OwnerInfo>
        </BuyCard>
      </DetailsGrid>
    </FractionalDetailsContainer>
  );
};

export default FractionalPropertyDetails;