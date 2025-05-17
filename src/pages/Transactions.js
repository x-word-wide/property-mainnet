import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const TransactionsContainer = styled.div`
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

const SearchInput = styled.input`
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

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  margin-bottom: 2rem;
  
  @media (max-width: 992px) {
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
`;

const StatTitle = styled.div`
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 0.5rem;
`;

const StatValue = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 0.5rem;
`;

const StatChange = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.9rem;
  color: ${props => props.positive ? '#38a169' : '#e53e3e'};
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

const TransactionTable = styled.div`
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  margin-bottom: 2rem;
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr 1fr 1fr 1fr;
  padding: 1rem 1.5rem;
  background-color: #f8f9fa;
  border-bottom: 1px solid #eee;
  font-weight: 600;
  color: #333;
  
  @media (max-width: 992px) {
    display: none;
  }
`;

const TableHeaderCell = styled.div`
  &:last-child {
    text-align: right;
  }
`;

const TransactionRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr 1fr 1fr 1fr;
  padding: 1.5rem;
  border-bottom: 1px solid #eee;
  align-items: center;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #f8f9fa;
  }
  
  &:last-child {
    border-bottom: none;
  }
  
  @media (max-width: 992px) {
    display: block;
    position: relative;
    padding-right: 3rem;
  }
`;

const TransactionCell = styled.div`
  @media (max-width: 992px) {
    display: flex;
    padding: 0.5rem 0;
    
    &:before {
      content: "${props => props.label}";
      width: 40%;
      font-weight: 600;
      color: #333;
    }
  }
  
  &:last-child {
    text-align: right;
    
    @media (max-width: 992px) {
      text-align: left;
    }
  }
`;

const TransactionDate = styled.div`
  color: #666;
  font-size: 0.9rem;
`;

const PropertyInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  
  @media (max-width: 992px) {
    flex: 1;
  }
`;

const PropertyImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 8px;
  object-fit: cover;
`;

const PropertyDetails = styled.div``;

const PropertyTitle = styled(Link)`
  display: block;
  font-weight: 500;
  color: #333;
  margin-bottom: 0.3rem;
  text-decoration: none;
  
  &:hover {
    color: #4361ee;
  }
`;

const PropertyAddress = styled.div`
  font-size: 0.8rem;
  color: #666;
`;

const TransactionType = styled.div`
  display: inline-block;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  background-color: ${props => {
    switch (props.type) {
      case 'Purchase':
        return '#f0fff4';
      case 'Sale':
        return '#fff5f5';
      case 'Auction':
        return '#fffaf0';
      case 'Fractional':
        return '#f0f4ff';
      default:
        return '#f8f9fa';
    }
  }};
  color: ${props => {
    switch (props.type) {
      case 'Purchase':
        return '#38a169';
      case 'Sale':
        return '#e53e3e';
      case 'Auction':
        return '#dd6b20';
      case 'Fractional':
        return '#4361ee';
      default:
        return '#666';
    }
  }};
`;

const TransactionAmount = styled.div`
  font-weight: 600;
  color: #333;
`;

const TransactionStatus = styled.div`
  display: inline-block;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  background-color: ${props => {
    switch (props.status) {
      case 'Completed':
        return '#f0fff4';
      case 'Pending':
        return '#fffaf0';
      case 'Failed':
        return '#fff5f5';
      default:
        return '#f8f9fa';
    }
  }};
  color: ${props => {
    switch (props.status) {
      case 'Completed':
        return '#38a169';
      case 'Pending':
        return '#dd6b20';
      case 'Failed':
        return '#e53e3e';
      default:
        return '#666';
    }
  }};
`;

const ViewButton = styled(Link)`
  display: inline-block;
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
  
  @media (max-width: 992px) {
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 2rem;
`;

const PageButton = styled.button`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  border: 1px solid ${props => props.active ? '#4361ee' : '#ddd'};
  background-color: ${props => props.active ? '#4361ee' : 'white'};
  color: ${props => props.active ? 'white' : '#333'};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #4361ee;
    color: ${props => props.active ? 'white' : '#4361ee'};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    
    &:hover {
      border-color: #ddd;
      color: #333;
    }
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

const Transactions = () => {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('all');
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('dateDesc');
  const transactionsPerPage = 5;
  
  // Mock data for transactions
  const mockTransactions = [
    {
      id: 1,
      date: '2025-05-15',
      property: {
        id: 101,
        title: 'Modern Apartment with City View',
        address: '123 Main St, New York, NY 10001',
        image: 'https://source.unsplash.com/random/100x100/?apartment'
      },
      type: 'Purchase',
      amount: '$750,000',
      status: 'Completed',
      hash: '0x1234...5678'
    },
    {
      id: 2,
      date: '2025-05-10',
      property: {
        id: 102,
        title: 'Commercial Office Space',
        address: '456 Business Ave, San Francisco, CA 94107',
        image: 'https://source.unsplash.com/random/100x100/?office'
      },
      type: 'Auction',
      amount: '$1,250,000',
      status: 'Completed',
      hash: '0x2345...6789'
    },
    {
      id: 3,
      date: '2025-05-05',
      property: {
        id: 103,
        title: 'Beachfront Villa',
        address: '789 Ocean Dr, Miami, FL 33139',
        image: 'https://source.unsplash.com/random/100x100/?villa'
      },
      type: 'Fractional',
      amount: '$25,000',
      status: 'Pending',
      hash: '0x3456...7890'
    },
    {
      id: 4,
      date: '2025-04-28',
      property: {
        id: 104,
        title: 'Industrial Warehouse',
        address: '101 Factory Ln, Chicago, IL 60607',
        image: 'https://source.unsplash.com/random/100x100/?warehouse'
      },
      type: 'Sale',
      amount: '$950,000',
      status: 'Completed',
      hash: '0x4567...8901'
    },
    {
      id: 5,
      date: '2025-04-20',
      property: {
        id: 105,
        title: 'Downtown Retail Space',
        address: '202 Market St, Seattle, WA 98101',
        image: 'https://source.unsplash.com/random/100x100/?retail'
      },
      type: 'Purchase',
      amount: '$550,000',
      status: 'Failed',
      hash: '0x5678...9012'
    },
    {
      id: 6,
      date: '2025-04-15',
      property: {
        id: 106,
        title: 'Luxury Condo with Ocean View',
        address: '303 Beach Blvd, Los Angeles, CA 90210',
        image: 'https://source.unsplash.com/random/100x100/?condo'
      },
      type: 'Fractional',
      amount: '$50,000',
      status: 'Completed',
      hash: '0x6789...0123'
    },
    {
      id: 7,
      date: '2025-04-10',
      property: {
        id: 107,
        title: 'Mountain Cabin Retreat',
        address: '404 Pine Rd, Aspen, CO 81611',
        image: 'https://source.unsplash.com/random/100x100/?cabin'
      },
      type: 'Purchase',
      amount: '$450,000',
      status: 'Completed',
      hash: '0x7890...1234'
    }
  ];
  
  // Mock data for transaction stats
  const transactionStats = {
    totalValue: '$4,025,000',
    totalTransactions: 7,
    avgTransactionValue: '$575,000',
    monthlyGrowth: '+12.5%'
  };
  
  useEffect(() => {
    // In a real application, you would fetch the user's transactions from the backend
    // For now, we'll use the mock data
    setTransactions(mockTransactions);
  }, []);
  
  useEffect(() => {
    // Filter and sort transactions based on active tab, search term, and sort option
    let filtered = [...transactions];
    
    // Filter by tab
    if (activeTab !== 'all') {
      filtered = filtered.filter(transaction => transaction.type.toLowerCase() === activeTab);
    }
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(transaction => 
        transaction.property.title.toLowerCase().includes(term) ||
        transaction.property.address.toLowerCase().includes(term) ||
        transaction.hash.toLowerCase().includes(term)
      );
    }
    
    // Sort transactions
    switch (sortBy) {
      case 'dateAsc':
        filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case 'dateDesc':
        filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case 'amountAsc':
        filtered.sort((a, b) => parseFloat(a.amount.replace(/[^0-9.-]+/g, '')) - parseFloat(b.amount.replace(/[^0-9.-]+/g, '')));
        break;
      case 'amountDesc':
        filtered.sort((a, b) => parseFloat(b.amount.replace(/[^0-9.-]+/g, '')) - parseFloat(a.amount.replace(/[^0-9.-]+/g, '')));
        break;
      default:
        break;
    }
    
    setFilteredTransactions(filtered);
    setCurrentPage(1);
  }, [transactions, activeTab, searchTerm, sortBy]);
  
  // Get current transactions for pagination
  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = filteredTransactions.slice(indexOfFirstTransaction, indexOfLastTransaction);
  
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  return (
    <TransactionsContainer>
      <PageHeader>
        <Title>My Transactions</Title>
        
        <FilterContainer>
          <SearchInput 
            type="text" 
            placeholder="Search transactions..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          
          <FilterSelect 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="dateDesc">Newest First</option>
            <option value="dateAsc">Oldest First</option>
            <option value="amountDesc">Highest Amount</option>
            <option value="amountAsc">Lowest Amount</option>
          </FilterSelect>
        </FilterContainer>
      </PageHeader>
      
      <StatsGrid>
        <StatCard>
          <StatTitle>Total Transaction Value</StatTitle>
          <StatValue>{transactionStats.totalValue}</StatValue>
          <StatChange positive={true}>
            <i className="fas fa-arrow-up"></i> {transactionStats.monthlyGrowth} this month
          </StatChange>
        </StatCard>
        
        <StatCard>
          <StatTitle>Total Transactions</StatTitle>
          <StatValue>{transactionStats.totalTransactions}</StatValue>
          <StatChange positive={true}>
            <i className="fas fa-arrow-up"></i> 3 more than last month
          </StatChange>
        </StatCard>
        
        <StatCard>
          <StatTitle>Average Transaction Value</StatTitle>
          <StatValue>{transactionStats.avgTransactionValue}</StatValue>
          <StatChange positive={false}>
            <i className="fas fa-arrow-down"></i> 5.2% decrease
          </StatChange>
        </StatCard>
        
        <StatCard>
          <StatTitle>Success Rate</StatTitle>
          <StatValue>85.7%</StatValue>
          <StatChange positive={true}>
            <i className="fas fa-arrow-up"></i> 2.3% increase
          </StatChange>
        </StatCard>
      </StatsGrid>
      
      <TabsContainer>
        <Tab 
          active={activeTab === 'all'} 
          onClick={() => setActiveTab('all')}
        >
          All Transactions
        </Tab>
        <Tab 
          active={activeTab === 'purchase'} 
          onClick={() => setActiveTab('purchase')}
        >
          Purchases
        </Tab>
        <Tab 
          active={activeTab === 'sale'} 
          onClick={() => setActiveTab('sale')}
        >
          Sales
        </Tab>
        <Tab 
          active={activeTab === 'auction'} 
          onClick={() => setActiveTab('auction')}
        >
          Auctions
        </Tab>
        <Tab 
          active={activeTab === 'fractional'} 
          onClick={() => setActiveTab('fractional')}
        >
          Fractional
        </Tab>
      </TabsContainer>
      
      {filteredTransactions.length > 0 ? (
        <>
          <TransactionTable>
            <TableHeader>
              <TableHeaderCell>Date</TableHeaderCell>
              <TableHeaderCell>Property</TableHeaderCell>
              <TableHeaderCell>Type</TableHeaderCell>
              <TableHeaderCell>Amount</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell>Action</TableHeaderCell>
            </TableHeader>
            
            {currentTransactions.map(transaction => (
              <TransactionRow key={transaction.id}>
                <TransactionCell label="Date:">
                  <TransactionDate>{formatDate(transaction.date)}</TransactionDate>
                </TransactionCell>
                
                <TransactionCell label="Property:">
                  <PropertyInfo>
                    <PropertyImage src={transaction.property.image} alt={transaction.property.title} />
                    <PropertyDetails>
                      <PropertyTitle to={`/property/${transaction.property.id}`}>
                        {transaction.property.title}
                      </PropertyTitle>
                      <PropertyAddress>{transaction.property.address}</PropertyAddress>
                    </PropertyDetails>
                  </PropertyInfo>
                </TransactionCell>
                
                <TransactionCell label="Type:">
                  <TransactionType type={transaction.type}>
                    {transaction.type}
                  </TransactionType>
                </TransactionCell>
                
                <TransactionCell label="Amount:">
                  <TransactionAmount>{transaction.amount}</TransactionAmount>
                </TransactionCell>
                
                <TransactionCell label="Status:">
                  <TransactionStatus status={transaction.status}>
                    {transaction.status}
                  </TransactionStatus>
                </TransactionCell>
                
                <TransactionCell label="Action:">
                  <ViewButton to={`/transaction/${transaction.id}`}>
                    View
                  </ViewButton>
                </TransactionCell>
              </TransactionRow>
            ))}
          </TransactionTable>
          
          {/* Pagination */}
          {filteredTransactions.length > transactionsPerPage && (
            <Pagination>
              <PageButton 
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <i className="fas fa-chevron-left"></i>
              </PageButton>
              
              {Array.from({ length: Math.ceil(filteredTransactions.length / transactionsPerPage) }).map((_, index) => (
                <PageButton 
                  key={index}
                  active={currentPage === index + 1}
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                </PageButton>
              ))}
              
              <PageButton 
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === Math.ceil(filteredTransactions.length / transactionsPerPage)}
              >
                <i className="fas fa-chevron-right"></i>
              </PageButton>
            </Pagination>
          )}
        </>
      ) : (
        <EmptyState>
          <EmptyStateIcon>
            <i className="fas fa-exchange-alt"></i>
          </EmptyStateIcon>
          <EmptyStateTitle>No transactions found</EmptyStateTitle>
          <EmptyStateText>
            {searchTerm 
              ? `No transactions matching "${searchTerm}" were found. Try a different search term or clear the search.`
              : activeTab !== 'all'
                ? `You don't have any ${activeTab} transactions yet.`
                : `You haven't made any transactions yet. Start by browsing the marketplace and purchasing a property.`
            }
          </EmptyStateText>
          <EmptyStateButton to="/marketplace">
            Browse Properties
          </EmptyStateButton>
        </EmptyState>
      )}
    </TransactionsContainer>
  );
};

export default Transactions;