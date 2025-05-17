import React from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';

const SuccessContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 4rem 1rem;
  text-align: center;
`;

const SuccessIcon = styled.div`
  width: 100px;
  height: 100px;
  background-color: #f0fff4;
  color: #38a169;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  margin: 0 auto 2rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #333;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 2rem;
`;

const Card = styled.div`
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  padding: 2rem;
  margin-bottom: 2rem;
`;

const PropertyPreview = styled.div`
  display: flex;
  gap: 1.5rem;
  margin: 2rem 0;
  text-align: left;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const PropertyImage = styled.img`
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 10px;
  
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const PropertyInfo = styled.div`
  flex: 1;
`;

const PropertyTitle = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
  color: #333;
`;

const PropertyAddress = styled.p`
  color: #666;
  margin-bottom: 1rem;
`;

const PropertyMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-bottom: 1rem;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #666;
  font-size: 0.9rem;
`;

const MetaIcon = styled.span`
  color: #4361ee;
`;

const AuctionDetails = styled.div`
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 1.5rem;
  margin: 2rem 0;
  text-align: left;
`;

const DetailRow = styled.div`
  display: flex;
  margin-bottom: 1rem;
  
  &:last-child {
    margin-bottom: 0;
  }
  
  @media (max-width: 576px) {
    flex-direction: column;
    margin-bottom: 1.5rem;
  }
`;

const DetailLabel = styled.div`
  width: 200px;
  font-weight: 600;
  color: #333;
  
  @media (max-width: 576px) {
    width: 100%;
    margin-bottom: 0.3rem;
  }
`;

const DetailValue = styled.div`
  flex: 1;
  color: #666;
`;

const ShareSection = styled.div`
  margin: 2rem 0;
`;

const ShareTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: #333;
`;

const ShareLink = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  background-color: #f8f9fa;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  
  @media (max-width: 576px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
`;

const LinkText = styled.input`
  flex: 1;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 0.9rem;
  background-color: white;
  
  @media (max-width: 576px) {
    width: 100%;
  }
`;

const CopyButton = styled.button`
  padding: 0.8rem 1.5rem;
  background-color: #4361ee;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #3a56d4;
  }
  
  @media (max-width: 576px) {
    width: 100%;
  }
`;

const SocialShare = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

const SocialButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${props => {
    switch (props.platform) {
      case 'twitter':
        return '#1DA1F2';
      case 'facebook':
        return '#4267B2';
      case 'linkedin':
        return '#0077B5';
      case 'telegram':
        return '#0088cc';
      case 'whatsapp':
        return '#25D366';
      default:
        return '#4361ee';
    }
  }};
  color: white;
  font-size: 1.2rem;
  transition: opacity 0.3s ease;
  
  &:hover {
    opacity: 0.8;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
  
  @media (max-width: 576px) {
    flex-direction: column;
  }
`;

const PrimaryButton = styled(Link)`
  background-color: #4361ee;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  text-decoration: none;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #3a56d4;
  }
  
  @media (max-width: 576px) {
    margin-bottom: 0.5rem;
  }
`;

const SecondaryButton = styled(Link)`
  background-color: white;
  color: #4361ee;
  border: 1px solid #4361ee;
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #f0f4ff;
  }
`;

const ContactInfo = styled.div`
  margin-top: 2rem;
  font-size: 0.9rem;
  color: #666;
`;

const ContactLink = styled.a`
  color: #4361ee;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

const AuctionCreated = () => {
  const location = useLocation();
  
  // In a real application, you would get the auction details from the URL params or context
  // For now, we'll use mock data
  const auctionDetails = {
    auctionId: 'AUCT-12345',
    propertyName: 'Modern Apartment with City View',
    propertyId: 'TOKEN-67890',
    propertyAddress: '123 Main St, New York, NY 10001',
    propertyImage: 'https://source.unsplash.com/random/400x400/?apartment',
    propertyType: 'Residential',
    propertySize: '1,200 sq ft',
    bedrooms: 2,
    bathrooms: 2,
    auctionType: 'Private',
    startingBid: '$750,000',
    reservePrice: '$800,000',
    startDate: 'May 20, 2025, 10:00 AM EST',
    endDate: 'May 27, 2025, 10:00 PM EST',
    auctionLink: 'https://propertymainnet.com/auction/AUCT-12345',
    invitedUsers: 15
  };
  
  const handleCopyLink = () => {
    navigator.clipboard.writeText(auctionDetails.auctionLink);
    alert('Auction link copied to clipboard!');
  };
  
  return (
    <SuccessContainer>
      <SuccessIcon>
        <i className="fas fa-gavel"></i>
      </SuccessIcon>
      
      <Title>Auction Created Successfully!</Title>
      <Subtitle>
        Your {auctionDetails.auctionType.toLowerCase()} auction has been created and is scheduled to start on {auctionDetails.startDate}.
      </Subtitle>
      
      <Card>
        <h2>Auction Details</h2>
        
        <PropertyPreview>
          <PropertyImage src={auctionDetails.propertyImage} alt={auctionDetails.propertyName} />
          <PropertyInfo>
            <PropertyTitle>{auctionDetails.propertyName}</PropertyTitle>
            <PropertyAddress>{auctionDetails.propertyAddress}</PropertyAddress>
            <PropertyMeta>
              <MetaItem>
                <MetaIcon><i className="fas fa-building"></i></MetaIcon>
                {auctionDetails.propertyType}
              </MetaItem>
              <MetaItem>
                <MetaIcon><i className="fas fa-ruler-combined"></i></MetaIcon>
                {auctionDetails.propertySize}
              </MetaItem>
              <MetaItem>
                <MetaIcon><i className="fas fa-bed"></i></MetaIcon>
                {auctionDetails.bedrooms} Bedrooms
              </MetaItem>
              <MetaItem>
                <MetaIcon><i className="fas fa-bath"></i></MetaIcon>
                {auctionDetails.bathrooms} Bathrooms
              </MetaItem>
            </PropertyMeta>
          </PropertyInfo>
        </PropertyPreview>
        
        <AuctionDetails>
          <DetailRow>
            <DetailLabel>Auction ID:</DetailLabel>
            <DetailValue>{auctionDetails.auctionId}</DetailValue>
          </DetailRow>
          <DetailRow>
            <DetailLabel>Auction Type:</DetailLabel>
            <DetailValue>{auctionDetails.auctionType}</DetailValue>
          </DetailRow>
          <DetailRow>
            <DetailLabel>Starting Bid:</DetailLabel>
            <DetailValue>{auctionDetails.startingBid}</DetailValue>
          </DetailRow>
          <DetailRow>
            <DetailLabel>Reserve Price:</DetailLabel>
            <DetailValue>{auctionDetails.reservePrice}</DetailValue>
          </DetailRow>
          <DetailRow>
            <DetailLabel>Start Date:</DetailLabel>
            <DetailValue>{auctionDetails.startDate}</DetailValue>
          </DetailRow>
          <DetailRow>
            <DetailLabel>End Date:</DetailLabel>
            <DetailValue>{auctionDetails.endDate}</DetailValue>
          </DetailRow>
          {auctionDetails.auctionType === 'Private' && (
            <DetailRow>
              <DetailLabel>Invited Users:</DetailLabel>
              <DetailValue>{auctionDetails.invitedUsers}</DetailValue>
            </DetailRow>
          )}
        </AuctionDetails>
        
        {auctionDetails.auctionType === 'Private' && (
          <ShareSection>
            <ShareTitle>Share with Invited Users</ShareTitle>
            <ShareLink>
              <LinkText 
                type="text" 
                value={auctionDetails.auctionLink} 
                readOnly 
              />
              <CopyButton onClick={handleCopyLink}>
                Copy Link
              </CopyButton>
            </ShareLink>
            
            <SocialShare>
              <SocialButton 
                href={`https://twitter.com/intent/tweet?text=I've invited you to a private property auction on Property Mainnet!&url=${encodeURIComponent(auctionDetails.auctionLink)}`}
                target="_blank"
                rel="noopener noreferrer"
                platform="twitter"
              >
                <i className="fab fa-twitter"></i>
              </SocialButton>
              <SocialButton 
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(auctionDetails.auctionLink)}`}
                target="_blank"
                rel="noopener noreferrer"
                platform="facebook"
              >
                <i className="fab fa-facebook-f"></i>
              </SocialButton>
              <SocialButton 
                href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(auctionDetails.auctionLink)}&title=Private Property Auction Invitation`}
                target="_blank"
                rel="noopener noreferrer"
                platform="linkedin"
              >
                <i className="fab fa-linkedin-in"></i>
              </SocialButton>
              <SocialButton 
                href={`https://t.me/share/url?url=${encodeURIComponent(auctionDetails.auctionLink)}&text=I've invited you to a private property auction on Property Mainnet!`}
                target="_blank"
                rel="noopener noreferrer"
                platform="telegram"
              >
                <i className="fab fa-telegram-plane"></i>
              </SocialButton>
              <SocialButton 
                href={`https://api.whatsapp.com/send?text=I've invited you to a private property auction on Property Mainnet! ${encodeURIComponent(auctionDetails.auctionLink)}`}
                target="_blank"
                rel="noopener noreferrer"
                platform="whatsapp"
              >
                <i className="fab fa-whatsapp"></i>
              </SocialButton>
            </SocialShare>
          </ShareSection>
        )}
        
        <p>
          You can manage your auction, view bids, and make changes until the auction starts. Once the auction begins, you'll be able to monitor its progress in real-time.
        </p>
      </Card>
      
      <ButtonGroup>
        <PrimaryButton to={`/auction/${auctionDetails.auctionId}`}>View Auction</PrimaryButton>
        <SecondaryButton to="/my-properties">My Properties</SecondaryButton>
      </ButtonGroup>
      
      <ContactInfo>
        Have questions? Contact our support team at <ContactLink href="mailto:support@propertymainnet.com">support@propertymainnet.com</ContactLink>
      </ContactInfo>
    </SuccessContainer>
  );
};

export default AuctionCreated;