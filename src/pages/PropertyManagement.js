import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const ManagementContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const PageHeader = styled.div`
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #333;
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: #666;
`;

const TabsContainer = styled.div`
  display: flex;
  border-bottom: 1px solid #eee;
  margin-bottom: 2rem;
  overflow-x: auto;
  
  @media (max-width: 768px) {
    padding-bottom: 0.5rem;
  }
`;

const Tab = styled.button`
  padding: 1rem 1.5rem;
  background: none;
  border: none;
  border-bottom: 3px solid ${props => props.active ? '#4361ee' : 'transparent'};
  color: ${props => props.active ? '#4361ee' : '#666'};
  font-weight: ${props => props.active ? '600' : '400'};
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  
  &:hover {
    color: #4361ee;
  }
  
  @media (max-width: 768px) {
    padding: 0.8rem 1rem;
    font-size: 0.9rem;
  }
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
  margin-bottom: 2rem;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const CardTitle = styled.h2`
  font-size: 1.3rem;
  color: #333;
`;

const CardAction = styled.button`
  background: none;
  border: none;
  color: #4361ee;
  font-weight: 500;
  cursor: pointer;
  
  &:hover {
    text-decoration: underline;
  }
`;

const PropertyCard = styled.div`
  display: flex;
  gap: 1.5rem;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
  
  @media (max-width: 576px) {
    flex-direction: column;
  }
`;

const PropertyImage = styled.img`
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
  flex-shrink: 0;
  
  @media (max-width: 576px) {
    width: 100%;
    height: 200px;
  }
`;

const PropertyInfo = styled.div`
  flex: 1;
`;

const PropertyTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: #333;
`;

const PropertyAddress = styled.p`
  color: #666;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
`;

const PropertyMeta = styled.div`
  display: flex;
  gap: 1.5rem;
  margin: 1rem 0;
  
  @media (max-width: 576px) {
    flex-wrap: wrap;
    gap: 1rem;
  }
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

const PropertyActions = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  
  @media (max-width: 576px) {
    flex-wrap: wrap;
  }
`;

const ActionButton = styled(Link)`
  padding: 0.5rem 1rem;
  background-color: ${props => props.primary ? '#4361ee' : 'white'};
  color: ${props => props.primary ? 'white' : '#4361ee'};
  border: 1px solid ${props => props.primary ? '#4361ee' : '#ddd'};
  border-radius: 6px;
  font-size: 0.9rem;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${props => props.primary ? '#3a56d4' : '#f0f4ff'};
  }
`;

const TaskList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Task = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: ${props => props.completed ? '#f0fff4' : 'white'};
  border: 1px solid ${props => props.completed ? '#c6f6d5' : '#eee'};
  border-radius: 8px;
  
  @media (max-width: 576px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
`;

const TaskInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  
  @media (max-width: 576px) {
    width: 100%;
  }
`;

const TaskStatus = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${props => props.completed ? '#38a169' : '#eee'};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 0.8rem;
`;

const TaskContent = styled.div``;

const TaskTitle = styled.div`
  font-weight: 500;
  color: #333;
  margin-bottom: 0.3rem;
`;

const TaskDate = styled.div`
  font-size: 0.8rem;
  color: #666;
`;

const TaskActions = styled.div`
  display: flex;
  gap: 0.5rem;
  
  @media (max-width: 576px) {
    width: 100%;
    justify-content: flex-end;
  }
`;

const TaskButton = styled.button`
  padding: 0.4rem 0.8rem;
  background-color: ${props => props.primary ? '#4361ee' : 'white'};
  color: ${props => props.primary ? 'white' : '#4361ee'};
  border: 1px solid ${props => props.primary ? '#4361ee' : '#ddd'};
  border-radius: 6px;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${props => props.primary ? '#3a56d4' : '#f0f4ff'};
  }
`;

const ChartContainer = styled.div`
  height: 300px;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f8f9fa;
  border-radius: 8px;
  color: #666;
`;

const StatGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const StatCard = styled.div`
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: #4361ee;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  color: #666;
  font-size: 0.9rem;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  background-color: #f8f9fa;
  border-radius: 10px;
  margin-bottom: 2rem;
`;

const EmptyStateIcon = styled.div`
  font-size: 3rem;
  color: #ddd;
  margin-bottom: 1rem;
`;

const EmptyStateTitle = styled.h3`
  font-size: 1.3rem;
  color: #333;
  margin-bottom: 1rem;
`;

const EmptyStateText = styled.p`
  color: #666;
  margin-bottom: 1.5rem;
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

const PropertyManagement = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Mock data for properties
  const properties = [
    {
      id: 1,
      title: 'Luxury Apartment in Downtown',
      address: '123 Main St, New York, NY 10001',
      image: 'https://source.unsplash.com/random/300x300/?apartment',
      type: 'Residential',
      size: '1,200 sq ft',
      tokenId: '#12345',
      status: 'Rented',
      occupancy: '100%'
    },
    {
      id: 2,
      title: 'Commercial Office Space',
      address: '456 Business Ave, San Francisco, CA 94107',
      image: 'https://source.unsplash.com/random/300x300/?office',
      type: 'Commercial',
      size: '3,500 sq ft',
      tokenId: '#67890',
      status: 'Partially Rented',
      occupancy: '75%'
    },
    {
      id: 3,
      title: 'Beachfront Villa',
      address: '789 Ocean Dr, Miami, FL 33139',
      image: 'https://source.unsplash.com/random/300x300/?villa',
      type: 'Residential',
      size: '4,500 sq ft',
      tokenId: '#24680',
      status: 'Vacant',
      occupancy: '0%'
    }
  ];
  
  // Mock data for tasks
  const tasks = [
    {
      id: 1,
      title: 'Schedule property inspection',
      date: 'May 25, 2025',
      completed: false,
      property: 'Luxury Apartment in Downtown'
    },
    {
      id: 2,
      title: 'Renew tenant lease',
      date: 'June 1, 2025',
      completed: false,
      property: 'Commercial Office Space'
    },
    {
      id: 3,
      title: 'Pay property taxes',
      date: 'May 15, 2025',
      completed: true,
      property: 'Beachfront Villa'
    },
    {
      id: 4,
      title: 'Schedule maintenance for HVAC system',
      date: 'May 30, 2025',
      completed: false,
      property: 'Luxury Apartment in Downtown'
    }
  ];
  
  // Mock data for financial stats
  const financialStats = {
    totalValue: '$2,450,000',
    monthlyIncome: '$12,500',
    annualReturn: '8.2%',
    occupancyRate: '58%',
    maintenanceCosts: '$2,300',
    propertyTaxes: '$4,800'
  };
  
  return (
    <ManagementContainer>
      <PageHeader>
        <Title>Property Management</Title>
        <Subtitle>Manage your real estate NFT portfolio and track performance</Subtitle>
      </PageHeader>
      
      <TabsContainer>
        <Tab 
          active={activeTab === 'overview'} 
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </Tab>
        <Tab 
          active={activeTab === 'properties'} 
          onClick={() => setActiveTab('properties')}
        >
          My Properties
        </Tab>
        <Tab 
          active={activeTab === 'tasks'} 
          onClick={() => setActiveTab('tasks')}
        >
          Tasks & Maintenance
        </Tab>
        <Tab 
          active={activeTab === 'tenants'} 
          onClick={() => setActiveTab('tenants')}
        >
          Tenants
        </Tab>
        <Tab 
          active={activeTab === 'financial'} 
          onClick={() => setActiveTab('financial')}
        >
          Financial Performance
        </Tab>
        <Tab 
          active={activeTab === 'documents'} 
          onClick={() => setActiveTab('documents')}
        >
          Documents
        </Tab>
      </TabsContainer>
      
      {activeTab === 'overview' && (
        <>
          <StatGrid>
            <StatCard>
              <StatValue>{properties.length}</StatValue>
              <StatLabel>Properties Owned</StatLabel>
            </StatCard>
            <StatCard>
              <StatValue>{financialStats.totalValue}</StatValue>
              <StatLabel>Total Portfolio Value</StatLabel>
            </StatCard>
            <StatCard>
              <StatValue>{financialStats.monthlyIncome}</StatValue>
              <StatLabel>Monthly Rental Income</StatLabel>
            </StatCard>
            <StatCard>
              <StatValue>{financialStats.annualReturn}</StatValue>
              <StatLabel>Annual Return</StatLabel>
            </StatCard>
            <StatCard>
              <StatValue>{financialStats.occupancyRate}</StatValue>
              <StatLabel>Occupancy Rate</StatLabel>
            </StatCard>
            <StatCard>
              <StatValue>{tasks.filter(task => !task.completed).length}</StatValue>
              <StatLabel>Pending Tasks</StatLabel>
            </StatCard>
          </StatGrid>
          
          <ContentGrid>
            <Card>
              <CardHeader>
                <CardTitle>Recent Properties</CardTitle>
                <CardAction onClick={() => setActiveTab('properties')}>View All</CardAction>
              </CardHeader>
              
              {properties.slice(0, 2).map(property => (
                <PropertyCard key={property.id}>
                  <PropertyImage src={property.image} alt={property.title} />
                  <PropertyInfo>
                    <PropertyTitle>{property.title}</PropertyTitle>
                    <PropertyAddress>{property.address}</PropertyAddress>
                    <PropertyMeta>
                      <MetaItem>
                        <MetaIcon><i className="fas fa-building"></i></MetaIcon>
                        {property.type}
                      </MetaItem>
                      <MetaItem>
                        <MetaIcon><i className="fas fa-ruler-combined"></i></MetaIcon>
                        {property.size}
                      </MetaItem>
                      <MetaItem>
                        <MetaIcon><i className="fas fa-tag"></i></MetaIcon>
                        {property.tokenId}
                      </MetaItem>
                    </PropertyMeta>
                    <PropertyActions>
                      <ActionButton to={`/property/${property.id}`} primary="true">View Details</ActionButton>
                      <ActionButton to={`/property-modification?id=${property.id}`}>Request Modification</ActionButton>
                    </PropertyActions>
                  </PropertyInfo>
                </PropertyCard>
              ))}
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Tasks</CardTitle>
                <CardAction onClick={() => setActiveTab('tasks')}>View All</CardAction>
              </CardHeader>
              
              <TaskList>
                {tasks.filter(task => !task.completed).slice(0, 3).map(task => (
                  <Task key={task.id} completed={task.completed}>
                    <TaskInfo>
                      <TaskStatus completed={task.completed}>
                        {task.completed && <i className="fas fa-check"></i>}
                      </TaskStatus>
                      <TaskContent>
                        <TaskTitle>{task.title}</TaskTitle>
                        <TaskDate>Due: {task.date} • {task.property}</TaskDate>
                      </TaskContent>
                    </TaskInfo>
                    <TaskActions>
                      <TaskButton>Complete</TaskButton>
                      <TaskButton>Reschedule</TaskButton>
                    </TaskActions>
                  </Task>
                ))}
              </TaskList>
            </Card>
          </ContentGrid>
          
          <Card>
            <CardHeader>
              <CardTitle>Financial Performance</CardTitle>
              <CardAction onClick={() => setActiveTab('financial')}>View Details</CardAction>
            </CardHeader>
            
            <ChartContainer>
              [Portfolio Performance Chart - Coming Soon]
            </ChartContainer>
            
            <StatGrid>
              <StatCard>
                <StatValue>{financialStats.monthlyIncome}</StatValue>
                <StatLabel>Monthly Income</StatLabel>
              </StatCard>
              <StatCard>
                <StatValue>{financialStats.maintenanceCosts}</StatValue>
                <StatLabel>Maintenance Costs</StatLabel>
              </StatCard>
              <StatCard>
                <StatValue>{financialStats.propertyTaxes}</StatValue>
                <StatLabel>Property Taxes</StatLabel>
              </StatCard>
            </StatGrid>
          </Card>
        </>
      )}
      
      {activeTab === 'properties' && (
        <>
          {properties.length > 0 ? (
            <>
              {properties.map(property => (
                <PropertyCard key={property.id}>
                  <PropertyImage src={property.image} alt={property.title} />
                  <PropertyInfo>
                    <PropertyTitle>{property.title}</PropertyTitle>
                    <PropertyAddress>{property.address}</PropertyAddress>
                    <PropertyMeta>
                      <MetaItem>
                        <MetaIcon><i className="fas fa-building"></i></MetaIcon>
                        {property.type}
                      </MetaItem>
                      <MetaItem>
                        <MetaIcon><i className="fas fa-ruler-combined"></i></MetaIcon>
                        {property.size}
                      </MetaItem>
                      <MetaItem>
                        <MetaIcon><i className="fas fa-tag"></i></MetaIcon>
                        {property.tokenId}
                      </MetaItem>
                      <MetaItem>
                        <MetaIcon><i className="fas fa-home"></i></MetaIcon>
                        Status: {property.status}
                      </MetaItem>
                      <MetaItem>
                        <MetaIcon><i className="fas fa-percentage"></i></MetaIcon>
                        Occupancy: {property.occupancy}
                      </MetaItem>
                    </PropertyMeta>
                    <PropertyActions>
                      <ActionButton to={`/property/${property.id}`} primary="true">View Details</ActionButton>
                      <ActionButton to={`/property-modification?id=${property.id}`}>Request Modification</ActionButton>
                      <ActionButton to={`/private-auctions?property=${property.id}`}>Create Auction</ActionButton>
                      <ActionButton to={`/fractional?property=${property.id}`}>Fractionalize</ActionButton>
                    </PropertyActions>
                  </PropertyInfo>
                </PropertyCard>
              ))}
            </>
          ) : (
            <EmptyState>
              <EmptyStateIcon>
                <i className="fas fa-home"></i>
              </EmptyStateIcon>
              <EmptyStateTitle>No Properties Found</EmptyStateTitle>
              <EmptyStateText>
                You don't have any properties in your portfolio yet. Start by browsing the marketplace or creating a new property listing.
              </EmptyStateText>
              <EmptyStateButton to="/marketplace">Browse Marketplace</EmptyStateButton>
            </EmptyState>
          )}
        </>
      )}
      
      {activeTab === 'tasks' && (
        <Card>
          <CardHeader>
            <CardTitle>Tasks & Maintenance</CardTitle>
            <CardAction>Add New Task</CardAction>
          </CardHeader>
          
          <TaskList>
            {tasks.map(task => (
              <Task key={task.id} completed={task.completed}>
                <TaskInfo>
                  <TaskStatus completed={task.completed}>
                    {task.completed && <i className="fas fa-check"></i>}
                  </TaskStatus>
                  <TaskContent>
                    <TaskTitle>{task.title}</TaskTitle>
                    <TaskDate>Due: {task.date} • {task.property}</TaskDate>
                  </TaskContent>
                </TaskInfo>
                <TaskActions>
                  {!task.completed && (
                    <>
                      <TaskButton primary>Complete</TaskButton>
                      <TaskButton>Reschedule</TaskButton>
                    </>
                  )}
                  <TaskButton>Delete</TaskButton>
                </TaskActions>
              </Task>
            ))}
          </TaskList>
        </Card>
      )}
      
      {activeTab === 'tenants' && (
        <EmptyState>
          <EmptyStateIcon>
            <i className="fas fa-users"></i>
          </EmptyStateIcon>
          <EmptyStateTitle>Tenant Management Coming Soon</EmptyStateTitle>
          <EmptyStateText>
            We're working on adding tenant management features to help you track leases, collect rent, and manage tenant communications.
          </EmptyStateText>
        </EmptyState>
      )}
      
      {activeTab === 'financial' && (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Financial Overview</CardTitle>
              <CardAction>Download Report</CardAction>
            </CardHeader>
            
            <ChartContainer>
              [Income vs. Expenses Chart - Coming Soon]
            </ChartContainer>
            
            <StatGrid>
              <StatCard>
                <StatValue>{financialStats.totalValue}</StatValue>
                <StatLabel>Total Portfolio Value</StatLabel>
              </StatCard>
              <StatCard>
                <StatValue>{financialStats.monthlyIncome}</StatValue>
                <StatLabel>Monthly Income</StatLabel>
              </StatCard>
              <StatCard>
                <StatValue>{financialStats.annualReturn}</StatValue>
                <StatLabel>Annual Return</StatLabel>
              </StatCard>
              <StatCard>
                <StatValue>{financialStats.maintenanceCosts}</StatValue>
                <StatLabel>Maintenance Costs</StatLabel>
              </StatCard>
              <StatCard>
                <StatValue>{financialStats.propertyTaxes}</StatValue>
                <StatLabel>Property Taxes</StatLabel>
              </StatCard>
              <StatCard>
                <StatValue>$5,400</StatValue>
                <StatLabel>Net Monthly Profit</StatLabel>
              </StatCard>
            </StatGrid>
          </Card>
          
          <EmptyState>
            <EmptyStateIcon>
              <i className="fas fa-chart-line"></i>
            </EmptyStateIcon>
            <EmptyStateTitle>Detailed Financial Analytics Coming Soon</EmptyStateTitle>
            <EmptyStateText>
              We're working on adding more detailed financial analytics, including property-specific performance metrics, ROI calculations, and expense tracking.
            </EmptyStateText>
          </EmptyState>
        </>
      )}
      
      {activeTab === 'documents' && (
        <EmptyState>
          <EmptyStateIcon>
            <i className="fas fa-file-alt"></i>
          </EmptyStateIcon>
          <EmptyStateTitle>Document Management Coming Soon</EmptyStateTitle>
          <EmptyStateText>
            We're working on adding document management features to help you store and organize property-related documents, including deeds, insurance policies, and inspection reports.
          </EmptyStateText>
        </EmptyState>
      )}
    </ManagementContainer>
  );
};

export default PropertyManagement;