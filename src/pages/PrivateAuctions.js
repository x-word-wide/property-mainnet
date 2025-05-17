import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useWeb3 } from '../context/Web3Context';

const PrivateAuctionsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const PageHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #333;
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: #666;
  max-width: 800px;
  margin: 0 auto;
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

// Additional styled components for property cards
const PropertyCard = styled.div`
  background-color: ${props => props.selected ? '#f0f4ff' : 'white'};
  border: 1px solid ${props => props.selected ? '#4361ee' : '#ddd'};
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
  cursor: ${props => props.onClick ? 'pointer' : 'default'};
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #4361ee;
    box-shadow: ${props => props.onClick ? '0 5px 15px rgba(0, 0, 0, 0.05)' : 'none'};
  }
`;

const PropertyName = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: #333;
`;

const PropertyAddress = styled.p`
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
`;

const PropertyTokenId = styled.p`
  color: #4361ee;
  font-size: 0.9rem;
  font-weight: 500;
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: 2rem;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const MainContent = styled.div``;

const Sidebar = styled.div`
  @media (max-width: 992px) {
    order: -1;
  }
`;

const AuctionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
`;

const AuctionCard = styled.div`
  background-color: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
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
    props.status === 'upcoming' ? '#e6f2ff' : 
    props.status === 'private' ? '#fef3c7' : '#fff5f5'};
  color: ${props => 
    props.status === 'live' ? '#38a169' : 
    props.status === 'upcoming' ? '#0066cc' : 
    props.status === 'private' ? '#d97706' : '#e53e3e'};
`;

// This component is already defined above
// const PropertyAddress = styled.h3`
//   font-size: 1.2rem;
//   margin-bottom: 0.5rem;
//   color: #333;
// `;

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

const CreateButton = styled(Link)`
  display: inline-block;
  background-color: #4361ee;
  color: white;
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 500;
  margin-bottom: 2rem;
  
  &:hover {
    background-color: #3a56d4;
  }
`;

const NoAuctionsMessage = styled.div`
  text-align: center;
  padding: 3rem;
  color: #666;
  background-color: #f8f9fa;
  border-radius: 8px;
`;

const InfoCard = styled.div`
  background-color: #f0f4ff;
  border-left: 4px solid #4361ee;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 2rem;
`;

const InfoTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: #333;
`;

const InfoText = styled.p`
  color: #666;
  line-height: 1.6;
`;

const FiltersContainer = styled.div`
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
  margin-bottom: 2rem;
`;

const FiltersTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: #333;
`;

const FilterGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const FilterLabel = styled.label`
  display: block;
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: #333;
`;

const FilterSelect = styled.select`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #4361ee;
  }
`;

const FilterInput = styled.input`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #4361ee;
  }
`;

const FilterButton = styled.button`
  width: 100%;
  background-color: #4361ee;
  color: white;
  border: none;
  padding: 0.8rem;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  
  &:hover {
    background-color: #3a56d4;
  }
`;

const InvitationCard = styled.div`
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
  margin-bottom: 2rem;
`;

const InvitationTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: #333;
`;

const InvitationList = styled.div`
  max-height: 300px;
  overflow-y: auto;
`;

const InvitationItem = styled.div`
  padding: 1rem;
  border-bottom: 1px solid #eee;
  
  &:last-child {
    border-bottom: none;
  }
`;

const InvitationProperty = styled.div`
  font-weight: 500;
  margin-bottom: 0.3rem;
`;

const InvitationDetails = styled.div`
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 0.5rem;
`;

const InvitationButtons = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const AcceptButton = styled.button`
  background-color: #38a169;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
  
  &:hover {
    background-color: #2f855a;
  }
`;

const DeclineButton = styled.button`
  background-color: #e53e3e;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
  
  &:hover {
    background-color: #c53030;
  }
`;

const FormContainer = styled.div`
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  padding: 2rem;
  margin-bottom: 2rem;
`;

const FormTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: #333;
  position: relative;
  padding-bottom: 0.5rem;
  
  &:after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 50px;
    height: 3px;
    background-color: #4361ee;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormSection = styled.div`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: #333;
`;

const FormRow = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const FormGroup = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: #333;
`;

const Input = styled.input`
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #4361ee;
  }
`;

const Select = styled.select`
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #4361ee;
  }
`;

const Textarea = styled.textarea`
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: #4361ee;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
`;

const Button = styled.button`
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
`;

const PrimaryButton = styled(Button)`
  background-color: #4361ee;
  color: white;
  border: none;
  
  &:hover {
    background-color: #3a56d4;
  }
  
  &:disabled {
    background-color: #a0a0a0;
    cursor: not-allowed;
  }
`;

const SecondaryButton = styled(Button)`
  background-color: white;
  color: #4361ee;
  border: 1px solid #4361ee;
  
  &:hover {
    background-color: #f0f4ff;
  }
`;

const InviteesContainer = styled.div`
  margin-bottom: 1.5rem;
`;

const InviteesList = styled.div`
  margin-top: 1rem;
`;

const InviteeItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.8rem;
  background-color: #f8f9fa;
  border-radius: 4px;
  margin-bottom: 0.5rem;
`;

const InviteeEmail = styled.div`
  font-size: 0.9rem;
`;

const RemoveInviteeButton = styled.button`
  background: none;
  border: none;
  color: #e53e3e;
  cursor: pointer;
  font-size: 1rem;
  
  &:hover {
    color: #c53030;
  }
`;

const AddInviteeForm = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
  
  @media (max-width: 576px) {
    flex-direction: column;
  }
`;

const AddInviteeInput = styled.input`
  flex: 1;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #4361ee;
  }
`;

const AddInviteeButton = styled.button`
  background-color: #4361ee;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  
  &:hover {
    background-color: #3a56d4;
  }
  
  &:disabled {
    background-color: #a0a0a0;
    cursor: not-allowed;
  }
`;

const PropertySelector = styled.div`
  margin-bottom: 2rem;
`;

const PropertyList = styled.div`
  max-height: 400px;
  overflow-y: auto;
`;

const PropertyCard = styled.div`
  border: 1px solid ${props => props.selected ? '#4361ee' : '#ddd'};
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: ${props => props.selected ? '#f0f4ff' : 'white'};
  
  &:hover {
    border-color: #4361ee;
    background-color: #f8f9fa;
  }
`;

const PrivateAuctions = () => {
  const { currentUser, userProfile } = useAuth();
  const { nftContract, auctionContract } = useWeb3();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState('browse');
  const [auctions, setAuctions] = useState([]);
  const [invitations, setInvitations] = useState([]);
  const [filters, setFilters] = useState({
    status: 'all',
    propertyType: 'all',
    minPrice: '',
    maxPrice: ''
  });
  
  // Create auction form state
  const [createFormData, setCreateFormData] = useState({
    property: null,
    startingPrice: '',
    reservePrice: '',
    startDate: '',
    endDate: '',
    description: ''
  });
  
  const [invitees, setInvitees] = useState([]);
  const [newInvitee, setNewInvitee] = useState('');
  
  // Mock data for auctions
  const mockAuctions = [
    {
      id: 1,
      tokenId: 123,
      name: "Luxury Apartment",
      address: "123 Main St, New York, NY 10001",
      image: "https://source.unsplash.com/random/400x300/?apartment&id=1",
      status: "private",
      startingPrice: "50",
      currentBid: "55",
      endTime: new Date(Date.now() + 86400000 * 3).getTime(), // 3 days from now
      bidCount: 5,
      features: {
        bedrooms: 3,
        bathrooms: 2,
        squareFootage: 1500
      },
      isInvited: true
    },
    {
      id: 2,
      tokenId: 456,
      name: "Beach House",
      address: "456 Ocean Dr, Miami, FL 33139",
      image: "https://source.unsplash.com/random/400x300/?beach-house&id=2",
      status: "private",
      startingPrice: "120",
      currentBid: "130",
      endTime: new Date(Date.now() + 86400000 * 5).getTime(), // 5 days from now
      bidCount: 8,
      features: {
        bedrooms: 4,
        bathrooms: 3,
        squareFootage: 2200
      },
      isInvited: true
    },
    {
      id: 3,
      tokenId: 789,
      name: "Mountain Cabin",
      address: "789 Pine Rd, Aspen, CO 81611",
      image: "https://source.unsplash.com/random/400x300/?cabin&id=3",
      status: "private",
      startingPrice: "80",
      currentBid: "85",
      endTime: new Date(Date.now() + 86400000 * 2).getTime(), // 2 days from now
      bidCount: 3,
      features: {
        bedrooms: 2,
        bathrooms: 1,
        squareFootage: 1200
      },
      isInvited: false
    }
  ];
  
  // Mock data for invitations
  const mockInvitations = [
    {
      id: 1,
      propertyName: "Luxury Penthouse",
      address: "789 Park Ave, New York, NY 10021",
      inviter: "John Smith",
      startDate: new Date(Date.now() + 86400000).toLocaleDateString(),
      endDate: new Date(Date.now() + 86400000 * 7).toLocaleDateString()
    },
    {
      id: 2,
      propertyName: "Waterfront Villa",
      address: "123 Bayshore Dr, Tampa, FL 33611",
      inviter: "Sarah Johnson",
      startDate: new Date(Date.now() + 86400000 * 2).toLocaleDateString(),
      endDate: new Date(Date.now() + 86400000 * 9).toLocaleDateString()
    }
  ];
  
  // Mock data for user properties
  const [userProperties, setUserProperties] = useState([
    {
      id: 1,
      tokenId: 123,
      name: "Luxury Apartment",
      address: "123 Main St, New York, NY 10001",
      image: "https://source.unsplash.com/random/400x300/?apartment&id=1"
    },
    {
      id: 2,
      tokenId: 456,
      name: "Beach House",
      address: "456 Ocean Dr, Miami, FL 33139",
      image: "https://source.unsplash.com/random/400x300/?beach-house&id=2"
    },
    {
      id: 3,
      tokenId: 789,
      name: "Mountain Cabin",
      address: "789 Pine Rd, Aspen, CO 81611",
      image: "https://source.unsplash.com/random/400x300/?cabin&id=3"
    }
  ]);
  
  // Initialize data
  useEffect(() => {
    setAuctions(mockAuctions);
    setInvitations(mockInvitations);
  }, []);
  
  // Format time remaining
  const formatTimeRemaining = (endTime) => {
    const now = new Date();
    const end = new Date(endTime);
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
  
  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };
  
  // Apply filters
  const filteredAuctions = auctions.filter(auction => {
    // Filter by status
    if (filters.status !== 'all' && auction.status !== filters.status) {
      return false;
    }
    
    // Filter by price range
    if (filters.minPrice && parseFloat(auction.currentBid) < parseFloat(filters.minPrice)) {
      return false;
    }
    
    if (filters.maxPrice && parseFloat(auction.currentBid) > parseFloat(filters.maxPrice)) {
      return false;
    }
    
    // Only show auctions the user is invited to
    if (!auction.isInvited) {
      return false;
    }
    
    return true;
  });
  
  // Handle create form changes
  const handleCreateFormChange = (e) => {
    const { name, value } = e.target;
    setCreateFormData({
      ...createFormData,
      [name]: value
    });
  };
  
  // Handle property selection
  const handlePropertySelect = (property) => {
    setCreateFormData({
      ...createFormData,
      property
    });
  };
  
  // Handle adding invitee
  const handleAddInvitee = () => {
    if (newInvitee && !invitees.includes(newInvitee)) {
      setInvitees([...invitees, newInvitee]);
      setNewInvitee('');
    }
  };
  
  // Handle removing invitee
  const handleRemoveInvitee = (email) => {
    setInvitees(invitees.filter(invitee => invitee !== email));
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Here you would typically send the form data to your backend
    // For now, we'll just simulate a successful submission
    
    // Navigate to a success page or show a success message
    navigate('/auction-created');
  };
  
  // Handle invitation response
  const handleInvitationResponse = (id, accepted) => {
    // Here you would typically send the response to your backend
    // For now, we'll just remove the invitation from the list
    setInvitations(invitations.filter(invitation => invitation.id !== id));
  };
  
  // Check if create form is valid
  const isCreateFormValid = () => {
    return (
      createFormData.property &&
      createFormData.startingPrice &&
      createFormData.startDate &&
      createFormData.endDate &&
      invitees.length > 0
    );
  };
  
  return (
    <PrivateAuctionsContainer>
      <PageHeader>
        <Title>Private Auctions</Title>
        <Subtitle>
          Exclusive property auctions available only to invited participants. Create your own private auction or participate in auctions you've been invited to.
        </Subtitle>
      </PageHeader>
      
      <TabsContainer>
        <Tab 
          active={activeTab === 'browse'} 
          onClick={() => setActiveTab('browse')}
        >
          Browse Private Auctions
        </Tab>
        <Tab 
          active={activeTab === 'invitations'} 
          onClick={() => setActiveTab('invitations')}
        >
          My Invitations
        </Tab>
        <Tab 
          active={activeTab === 'create'} 
          onClick={() => setActiveTab('create')}
        >
          Create Private Auction
        </Tab>
      </TabsContainer>
      
      {activeTab === 'browse' && (
        <ContentGrid>
          <MainContent>
            <InfoCard>
              <InfoTitle>About Private Auctions</InfoTitle>
              <InfoText>
                Private auctions allow property owners to sell their properties to a select group of invited buyers. 
                This creates an exclusive environment where serious buyers can participate without the competition of the open market. 
                Only verified properties can be listed in private auctions, ensuring authenticity and trust.
              </InfoText>
            </InfoCard>
            
            {filteredAuctions.length > 0 ? (
              <AuctionsGrid>
                {filteredAuctions.map(auction => (
                  <AuctionCard key={auction.id}>
                    <PropertyImage src={auction.image} alt={auction.name} />
                    <AuctionContent>
                      <AuctionStatus status={auction.status}>
                        Private Auction
                      </AuctionStatus>
                      <PropertyAddress>{auction.address}</PropertyAddress>
                      <PropertyFeatures>
                        <PropertyFeature>{auction.features.bedrooms} Beds</PropertyFeature>
                        <PropertyFeature>{auction.features.bathrooms} Baths</PropertyFeature>
                        <PropertyFeature>{auction.features.squareFootage} sqft</PropertyFeature>
                      </PropertyFeatures>
                      
                      <AuctionDetails>
                        <AuctionRow>
                          <AuctionLabel>Starting Price</AuctionLabel>
                          <AuctionValue>{auction.startingPrice} ETH</AuctionValue>
                        </AuctionRow>
                        <AuctionRow>
                          <AuctionLabel>Bids</AuctionLabel>
                          <AuctionValue>{auction.bidCount}</AuctionValue>
                        </AuctionRow>
                        
                        <CurrentBid>
                          {auction.currentBid} ETH
                        </CurrentBid>
                        
                        <TimeRemaining>
                          {formatTimeRemaining(auction.endTime)}
                        </TimeRemaining>
                        
                        <ViewButton to={`/auction/${auction.id}`}>
                          View Auction
                        </ViewButton>
                      </AuctionDetails>
                    </AuctionContent>
                  </AuctionCard>
                ))}
              </AuctionsGrid>
            ) : (
              <NoAuctionsMessage>
                No private auctions found matching your criteria. You may not have been invited to any active private auctions yet.
              </NoAuctionsMessage>
            )}
          </MainContent>
          
          <Sidebar>
            <FiltersContainer>
              <FiltersTitle>Filter Auctions</FiltersTitle>
              
              <FilterGroup>
                <FilterLabel htmlFor="status">Status</FilterLabel>
                <FilterSelect 
                  id="status" 
                  name="status" 
                  value={filters.status}
                  onChange={handleFilterChange}
                >
                  <option value="all">All Statuses</option>
                  <option value="live">Live Auctions</option>
                  <option value="upcoming">Upcoming Auctions</option>
                  <option value="ended">Ended Auctions</option>
                </FilterSelect>
              </FilterGroup>
              
              <FilterGroup>
                <FilterLabel htmlFor="propertyType">Property Type</FilterLabel>
                <FilterSelect 
                  id="propertyType" 
                  name="propertyType" 
                  value={filters.propertyType}
                  onChange={handleFilterChange}
                >
                  <option value="all">All Types</option>
                  <option value="residential">Residential</option>
                  <option value="commercial">Commercial</option>
                  <option value="land">Land</option>
                  <option value="industrial">Industrial</option>
                </FilterSelect>
              </FilterGroup>
              
              <FilterGroup>
                <FilterLabel>Price Range (ETH)</FilterLabel>
                <FormRow>
                  <FilterInput 
                    type="number" 
                    placeholder="Min" 
                    name="minPrice"
                    value={filters.minPrice}
                    onChange={handleFilterChange}
                    min="0"
                    step="0.1"
                  />
                  <FilterInput 
                    type="number" 
                    placeholder="Max" 
                    name="maxPrice"
                    value={filters.maxPrice}
                    onChange={handleFilterChange}
                    min="0"
                    step="0.1"
                  />
                </FormRow>
              </FilterGroup>
              
              <FilterButton>
                Apply Filters
              </FilterButton>
            </FiltersContainer>
          </Sidebar>
        </ContentGrid>
      )}
      
      {activeTab === 'invitations' && (
        <div>
          <InfoCard>
            <InfoTitle>Your Auction Invitations</InfoTitle>
            <InfoText>
              Below are the private auction invitations you've received. Accept an invitation to gain access to the auction and place bids.
              Declining an invitation will remove it from your list. You can always contact the property owner if you change your mind.
            </InfoText>
          </InfoCard>
          
          <InvitationCard>
            <InvitationTitle>Pending Invitations</InvitationTitle>
            
            {invitations.length > 0 ? (
              <InvitationList>
                {invitations.map(invitation => (
                  <InvitationItem key={invitation.id}>
                    <InvitationProperty>{invitation.propertyName}</InvitationProperty>
                    <InvitationDetails>{invitation.address}</InvitationDetails>
                    <InvitationDetails>Invited by: {invitation.inviter}</InvitationDetails>
                    <InvitationDetails>Auction period: {invitation.startDate} - {invitation.endDate}</InvitationDetails>
                    
                    <InvitationButtons>
                      <AcceptButton onClick={() => handleInvitationResponse(invitation.id, true)}>
                        Accept
                      </AcceptButton>
                      <DeclineButton onClick={() => handleInvitationResponse(invitation.id, false)}>
                        Decline
                      </DeclineButton>
                    </InvitationButtons>
                  </InvitationItem>
                ))}
              </InvitationList>
            ) : (
              <p>You have no pending invitations.</p>
            )}
          </InvitationCard>
        </div>
      )}
      
      {activeTab === 'create' && (
        <ContentGrid>
          <MainContent>
            <InfoCard>
              <InfoTitle>Creating a Private Auction</InfoTitle>
              <InfoText>
                Private auctions allow you to sell your property to a select group of invited buyers. 
                This creates an exclusive environment where serious buyers can participate without the competition of the open market.
                Only verified properties can be listed in private auctions, ensuring authenticity and trust.
              </InfoText>
            </InfoCard>
            
            <FormContainer>
              <FormTitle>Create Private Auction</FormTitle>
              
              <Form onSubmit={handleSubmit}>
                <FormSection>
                  <SectionTitle>Auction Details</SectionTitle>
                  
                  <FormGroup>
                    <Label>Selected Property*</Label>
                    {createFormData.property ? (
                      <PropertyCard selected>
                        <PropertyName>{createFormData.property.name}</PropertyName>
                        <PropertyAddress>{createFormData.property.address}</PropertyAddress>
                        <PropertyTokenId>Token ID: #{createFormData.property.tokenId}</PropertyTokenId>
                      </PropertyCard>
                    ) : (
                      <p>Please select a property from the sidebar.</p>
                    )}
                  </FormGroup>
                  
                  <FormRow>
                    <FormGroup>
                      <Label htmlFor="startingPrice">Starting Price (ETH)*</Label>
                      <Input 
                        type="number" 
                        id="startingPrice" 
                        name="startingPrice" 
                        value={createFormData.startingPrice}
                        onChange={handleCreateFormChange}
                        min="0"
                        step="0.01"
                        required
                      />
                    </FormGroup>
                    
                    <FormGroup>
                      <Label htmlFor="reservePrice">Reserve Price (ETH)</Label>
                      <Input 
                        type="number" 
                        id="reservePrice" 
                        name="reservePrice" 
                        value={createFormData.reservePrice}
                        onChange={handleCreateFormChange}
                        min="0"
                        step="0.01"
                      />
                    </FormGroup>
                  </FormRow>
                  
                  <FormRow>
                    <FormGroup>
                      <Label htmlFor="startDate">Start Date*</Label>
                      <Input 
                        type="datetime-local" 
                        id="startDate" 
                        name="startDate" 
                        value={createFormData.startDate}
                        onChange={handleCreateFormChange}
                        required
                      />
                    </FormGroup>
                    
                    <FormGroup>
                      <Label htmlFor="endDate">End Date*</Label>
                      <Input 
                        type="datetime-local" 
                        id="endDate" 
                        name="endDate" 
                        value={createFormData.endDate}
                        onChange={handleCreateFormChange}
                        required
                      />
                    </FormGroup>
                  </FormRow>
                  
                  <FormGroup>
                    <Label htmlFor="description">Auction Description</Label>
                    <Textarea 
                      id="description" 
                      name="description" 
                      value={createFormData.description}
                      onChange={handleCreateFormChange}
                      placeholder="Provide additional details about your auction..."
                    />
                  </FormGroup>
                </FormSection>
                
                <FormSection>
                  <SectionTitle>Invite Participants</SectionTitle>
                  
                  <InviteesContainer>
                    <Label>Invited Participants*</Label>
                    
                    <AddInviteeForm>
                      <AddInviteeInput 
                        type="email" 
                        placeholder="Enter email address" 
                        value={newInvitee}
                        onChange={(e) => setNewInvitee(e.target.value)}
                      />
                      <AddInviteeButton 
                        type="button" 
                        onClick={handleAddInvitee}
                        disabled={!newInvitee}
                      >
                        Add
                      </AddInviteeButton>
                    </AddInviteeForm>
                    
                    {invitees.length > 0 && (
                      <InviteesList>
                        {invitees.map((email, index) => (
                          <InviteeItem key={index}>
                            <InviteeEmail>{email}</InviteeEmail>
                            <RemoveInviteeButton onClick={() => handleRemoveInvitee(email)}>
                              ✕
                            </RemoveInviteeButton>
                          </InviteeItem>
                        ))}
                      </InviteesList>
                    )}
                  </InviteesContainer>
                </FormSection>
                
                <ButtonGroup>
                  <SecondaryButton type="button" onClick={() => setActiveTab('browse')}>
                    Cancel
                  </SecondaryButton>
                  <PrimaryButton type="submit" disabled={!isCreateFormValid()}>
                    Create Private Auction
                  </PrimaryButton>
                </ButtonGroup>
              </Form>
            </FormContainer>
          </MainContent>
          
          <Sidebar>
            <PropertySelector>
              <FiltersTitle>Select Your Property</FiltersTitle>
              <PropertyList>
                {userProperties.map(property => (
                  <PropertyCard 
                    key={property.id}
                    selected={createFormData.property?.id === property.id}
                    onClick={() => handlePropertySelect(property)}
                  >
                    <PropertyImage src={property.image} alt={property.name} />
                    <PropertyName>{property.name}</PropertyName>
                    <PropertyAddress>{property.address}</PropertyAddress>
                    <PropertyTokenId>Token ID: #{property.tokenId}</PropertyTokenId>
                  </PropertyCard>
                ))}
              </PropertyList>
            </PropertySelector>
            
            <InfoCard>
              <InfoTitle>Private Auction Benefits</InfoTitle>
              <InfoText>
                <ul>
                  <li>Control who can participate in your auction</li>
                  <li>Create a more exclusive bidding environment</li>
                  <li>Attract serious buyers only</li>
                  <li>Maintain privacy during the sale process</li>
                  <li>Set your own auction terms and conditions</li>
                </ul>
              </InfoText>
            </InfoCard>
          </Sidebar>
        </ContentGrid>
      )}
    </PrivateAuctionsContainer>
  );
};

export default PrivateAuctions;