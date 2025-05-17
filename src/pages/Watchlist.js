import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const WatchlistContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #333;
`;

const FilterContainer = styled.div`
  display: flex;
  gap: 1rem;
  
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const FilterSelect = styled.select`
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: white;
  color: #333;
  
  &:focus {
    outline: none;
    border-color: #4361ee;
  }
  
  @media (max-width: 768px) {
    flex: 1;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  background-color: #f8f9fa;
  border-radius: 10px;
`;

const EmptyStateIcon = styled.div`
  font-size: 3rem;
  color: #ddd;
  margin-bottom: 1rem;
`;

const EmptyStateTitle = styled.h2`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 1rem;
`;

const EmptyStateText = styled.p`
  color: #666;
  margin-bottom: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const EmptyStateButton = styled(Link)`
  display: inline-block;
  padding: 0.8rem 1.5rem;
  background-color: #4361ee;
  color: white;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 500;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #3a56d4;
  }
`;

const PropertyGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const PropertyCard = styled.div`
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  transition: transform 0.3s ease;
  position: relative;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const WatchlistActions = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 10;
  display: flex;
  gap: 0.5rem;
`;

const WatchlistButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.9);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.active ? '#e53e3e' : '#666'};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: white;
    color: ${props => props.active ? '#e53e3e' : '#4361ee'};
  }
`;

const NotificationButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.9);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.active ? '#4361ee' : '#666'};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: white;
    color: #4361ee;
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
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

const PropertyMeta = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const PropertyPrice = styled.div`
  font-weight: 600;
  color: #4361ee;
  font-size: 1.2rem;
`;

const PropertyType = styled.div`
  background-color: #f0f4ff;
  color: #4361ee;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
`;

const PropertyFeatures = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  
  @media (max-width: 576px) {
    flex-wrap: wrap;
    gap: 1rem;
  }
`;

const FeatureItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #666;
  font-size: 0.9rem;
`;

const FeatureIcon = styled.span`
  color: #4361ee;
`;

const PropertyFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #eee;
  padding-top: 1rem;
`;

const PropertyStatus = styled.div`
  font-size: 0.9rem;
  color: ${props => {
    switch (props.status) {
      case 'For Sale':
        return '#38a169';
      case 'Auction':
        return '#dd6b20';
      case 'Fractional':
        return '#805ad5';
      default:
        return '#666';
    }
  }};
  font-weight: 500;
`;

const ViewButton = styled(Link)`
  padding: 0.5rem 1rem;
  background-color: #4361ee;
  color: white;
  border-radius: 6px;
  text-decoration: none;
  font-size: 0.9rem;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #3a56d4;
  }
`;

const PriceChangeIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.8rem;
  color: ${props => props.increased ? '#38a169' : '#e53e3e'};
  margin-top: 0.3rem;
`;

const Watchlist = () => {
  const { currentUser } = useAuth();
  const [watchlistItems, setWatchlistItems] = useState([]);
  const [sortBy, setSortBy] = useState('dateAdded');
  const [filterType, setFilterType] = useState('all');
  
  // Mock data for watchlist items
  const mockWatchlistItems = [
    {
      id: 1,
      title: 'Modern Apartment with City View',
      address: '123 Main St, New York, NY 10001',
      image: 'https://source.unsplash.com/random/600x400/?apartment',
      price: '$750,000',
      priceChange: {
        amount: '+$25,000',
        percentage: '+3.4%',
        increased: true,
        date: '3 days ago'
      },
      type: 'Residential',
      status: 'For Sale',
      features: {
        bedrooms: 2,
        bathrooms: 2,
        area: '1,200 sq ft'
      },
      notifications: true,
      dateAdded: new Date('2025-05-10')
    },
    {
      id: 2,
      title: 'Commercial Office Space',
      address: '456 Business Ave, San Francisco, CA 94107',
      image: 'https://source.unsplash.com/random/600x400/?office',
      price: '$1,250,000',
      priceChange: {
        amount: '-$50,000',
        percentage: '-3.8%',
        increased: false,
        date: '1 week ago'
      },
      type: 'Commercial',
      status: 'Auction',
      features: {
        offices: 5,
        bathrooms: 3,
        area: '3,500 sq ft'
      },
      notifications: false,
      dateAdded: new Date('2025-05-05')
    },
    {
      id: 3,
      title: 'Beachfront Villa',
      address: '789 Ocean Dr, Miami, FL 33139',
      image: 'https://source.unsplash.com/random/600x400/?villa',
      price: '$2,500,000',
      priceChange: null,
      type: 'Residential',
      status: 'Fractional',
      features: {
        bedrooms: 5,
        bathrooms: 4,
        area: '4,500 sq ft'
      },
      notifications: true,
      dateAdded: new Date('2025-05-15')
    },
    {
      id: 4,
      title: 'Industrial Warehouse',
      address: '101 Factory Ln, Chicago, IL 60607',
      image: 'https://source.unsplash.com/random/600x400/?warehouse',
      price: '$950,000',
      priceChange: {
        amount: '+$75,000',
        percentage: '+8.6%',
        increased: true,
        date: '2 weeks ago'
      },
      type: 'Industrial',
      status: 'For Sale',
      features: {
        area: '12,000 sq ft',
        offices: 2,
        loading: '3 docks'
      },
      notifications: false,
      dateAdded: new Date('2025-04-28')
    }
  ];
  
  useEffect(() => {
    // In a real application, you would fetch the user's watchlist from the backend
    // For now, we'll use the mock data
    setWatchlistItems(mockWatchlistItems);
  }, []);
  
  const handleRemoveFromWatchlist = (id) => {
    setWatchlistItems(watchlistItems.filter(item => item.id !== id));
  };
  
  const handleToggleNotifications = (id) => {
    setWatchlistItems(watchlistItems.map(item => 
      item.id === id ? { ...item, notifications: !item.notifications } : item
    ));
  };
  
  const sortedAndFilteredItems = () => {
    let items = [...watchlistItems];
    
    // Apply filter
    if (filterType !== 'all') {
      items = items.filter(item => item.type === filterType);
    }
    
    // Apply sorting
    switch (sortBy) {
      case 'priceAsc':
        items.sort((a, b) => parseFloat(a.price.replace(/[^0-9.-]+/g, '')) - parseFloat(b.price.replace(/[^0-9.-]+/g, '')));
        break;
      case 'priceDesc':
        items.sort((a, b) => parseFloat(b.price.replace(/[^0-9.-]+/g, '')) - parseFloat(a.price.replace(/[^0-9.-]+/g, '')));
        break;
      case 'dateAdded':
        items.sort((a, b) => b.dateAdded - a.dateAdded);
        break;
      case 'priceChange':
        items.sort((a, b) => {
          if (!a.priceChange) return 1;
          if (!b.priceChange) return -1;
          
          const aChange = a.priceChange.increased ? 1 : -1;
          const bChange = b.priceChange.increased ? 1 : -1;
          
          return bChange - aChange;
        });
        break;
      default:
        break;
    }
    
    return items;
  };
  
  return (
    <WatchlistContainer>
      <PageHeader>
        <Title>My Watchlist</Title>
        
        <FilterContainer>
          <FilterSelect 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="dateAdded">Sort by: Date Added</option>
            <option value="priceAsc">Sort by: Price (Low to High)</option>
            <option value="priceDesc">Sort by: Price (High to Low)</option>
            <option value="priceChange">Sort by: Price Change</option>
          </FilterSelect>
          
          <FilterSelect 
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="all">All Property Types</option>
            <option value="Residential">Residential</option>
            <option value="Commercial">Commercial</option>
            <option value="Industrial">Industrial</option>
          </FilterSelect>
        </FilterContainer>
      </PageHeader>
      
      {watchlistItems.length > 0 ? (
        <PropertyGrid>
          {sortedAndFilteredItems().map(property => (
            <PropertyCard key={property.id}>
              <WatchlistActions>
                <WatchlistButton 
                  active={true}
                  onClick={() => handleRemoveFromWatchlist(property.id)}
                  title="Remove from watchlist"
                >
                  <i className="fas fa-heart"></i>
                </WatchlistButton>
                <NotificationButton 
                  active={property.notifications}
                  onClick={() => handleToggleNotifications(property.id)}
                  title={property.notifications ? "Disable notifications" : "Enable notifications"}
                >
                  <i className={`fas fa-${property.notifications ? 'bell' : 'bell-slash'}`}></i>
                </NotificationButton>
              </WatchlistActions>
              
              <PropertyImage src={property.image} alt={property.title} />
              
              <PropertyContent>
                <PropertyTitle>{property.title}</PropertyTitle>
                <PropertyAddress>{property.address}</PropertyAddress>
                
                <PropertyMeta>
                  <div>
                    <PropertyPrice>{property.price}</PropertyPrice>
                    {property.priceChange && (
                      <PriceChangeIndicator increased={property.priceChange.increased}>
                        <i className={`fas fa-arrow-${property.priceChange.increased ? 'up' : 'down'}`}></i>
                        {property.priceChange.amount} ({property.priceChange.percentage})
                      </PriceChangeIndicator>
                    )}
                  </div>
                  <PropertyType>{property.type}</PropertyType>
                </PropertyMeta>
                
                <PropertyFeatures>
                  {property.features.bedrooms && (
                    <FeatureItem>
                      <FeatureIcon><i className="fas fa-bed"></i></FeatureIcon>
                      {property.features.bedrooms} Beds
                    </FeatureItem>
                  )}
                  
                  {property.features.bathrooms && (
                    <FeatureItem>
                      <FeatureIcon><i className="fas fa-bath"></i></FeatureIcon>
                      {property.features.bathrooms} Baths
                    </FeatureItem>
                  )}
                  
                  {property.features.offices && (
                    <FeatureItem>
                      <FeatureIcon><i className="fas fa-briefcase"></i></FeatureIcon>
                      {property.features.offices} Offices
                    </FeatureItem>
                  )}
                  
                  <FeatureItem>
                    <FeatureIcon><i className="fas fa-ruler-combined"></i></FeatureIcon>
                    {property.features.area}
                  </FeatureItem>
                </PropertyFeatures>
                
                <PropertyFooter>
                  <PropertyStatus status={property.status}>
                    <i className={`fas fa-${
                      property.status === 'For Sale' ? 'tag' : 
                      property.status === 'Auction' ? 'gavel' : 
                      'chart-pie'
                    } mr-2`}></i> {property.status}
                  </PropertyStatus>
                  
                  <ViewButton to={`/property/${property.id}`}>
                    View Property
                  </ViewButton>
                </PropertyFooter>
              </PropertyContent>
            </PropertyCard>
          ))}
        </PropertyGrid>
      ) : (
        <EmptyState>
          <EmptyStateIcon>
            <i className="far fa-heart"></i>
          </EmptyStateIcon>
          <EmptyStateTitle>Your watchlist is empty</EmptyStateTitle>
          <EmptyStateText>
            Add properties to your watchlist to keep track of them and receive notifications about price changes, auctions, and other updates.
          </EmptyStateText>
          <EmptyStateButton to="/marketplace">
            Browse Properties
          </EmptyStateButton>
        </EmptyState>
      )}
    </WatchlistContainer>
  );
};

export default Watchlist;