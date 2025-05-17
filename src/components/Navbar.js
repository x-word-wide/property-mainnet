import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Web3Context } from '../context/Web3Context';
import { useAuth } from '../context/AuthContext';

const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #ffffff;
  color: #333;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  color: #4361ee;
  text-decoration: none;
  display: flex;
  align-items: center;
  
  &:hover {
    color: #3a56d4;
  }
`;

const LogoImage = styled.img`
  height: 40px;
  margin-right: 10px;
`;

const NavLinksContainer = styled.div`
  display: flex;
  align-items: center;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  
  @media (max-width: 992px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  color: #333;
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 0;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: #4361ee;
    transition: width 0.3s ease;
  }
  
  &:hover:after, &.active:after {
    width: 100%;
  }
  
  &:hover {
    color: #4361ee;
  }
`;

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownButton = styled.button`
  color: #333;
  background: none;
  border: none;
  font-weight: 500;
  padding: 0.5rem 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: #4361ee;
    transition: width 0.3s ease;
  }
  
  &:hover:after, &.active:after {
    width: 100%;
  }
  
  &:hover {
    color: #4361ee;
  }
`;

const DropdownContent = styled.div`
  display: ${props => props.isOpen ? 'block' : 'none'};
  position: absolute;
  background-color: #fff;
  min-width: 200px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 0.5rem 0;
  z-index: 1;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 0.5rem;
`;

const DropdownLink = styled(Link)`
  color: #333;
  padding: 0.7rem 1rem;
  text-decoration: none;
  display: block;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #f8f9fa;
    color: #4361ee;
  }
`;

const DropdownDivider = styled.div`
  height: 1px;
  background-color: #eee;
  margin: 0.5rem 0;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ConnectButton = styled.button`
  background-color: #4361ee;
  color: white;
  border: none;
  padding: 0.7rem 1.2rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #3a56d4;
  }
`;

const AuthButtons = styled.div`
  display: flex;
  gap: 1rem;
`;

const SignupButton = styled(Link)`
  background-color: #4361ee;
  color: white;
  border: none;
  padding: 0.7rem 1.2rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  text-decoration: none;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #3a56d4;
  }
`;

const LoginButton = styled(Link)`
  background-color: transparent;
  color: #4361ee;
  border: 1px solid #4361ee;
  padding: 0.7rem 1.2rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #f0f4ff;
  }
`;

const UserMenu = styled.div`
  position: relative;
`;

const UserButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50px;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #f0f4ff;
  }
`;

const UserAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #4361ee;
`;

const UserDropdown = styled.div`
  display: ${props => props.isOpen ? 'block' : 'none'};
  position: absolute;
  right: 0;
  top: 100%;
  background-color: #fff;
  min-width: 220px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 0.5rem 0;
  margin-top: 0.5rem;
  z-index: 1000;
`;

const UserInfo = styled.div`
  padding: 1rem;
  border-bottom: 1px solid #eee;
`;

const UserName = styled.div`
  font-weight: 500;
  margin-bottom: 0.3rem;
`;

const UserEmail = styled.div`
  font-size: 0.9rem;
  color: #666;
`;

const UserMenuLink = styled(Link)`
  color: #333;
  padding: 0.7rem 1rem;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #f8f9fa;
    color: #4361ee;
  }
`;

const LogoutButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  color: #e53e3e;
  padding: 0.7rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #fff5f5;
  }
`;

const WalletButton = styled.button`
  background-color: ${props => props.connected ? '#f0f4ff' : '#4361ee'};
  color: ${props => props.connected ? '#4361ee' : 'white'};
  border: ${props => props.connected ? '1px solid #4361ee' : 'none'};
  padding: 0.7rem 1.2rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${props => props.connected ? '#e6ecff' : '#3a56d4'};
  }
`;

const WalletIcon = styled.span`
  font-size: 1.2rem;
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #333;
  cursor: pointer;
  
  @media (max-width: 992px) {
    display: block;
  }
`;

const MobileMenu = styled.div`
  display: ${props => props.isOpen ? 'block' : 'none'};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: white;
  z-index: 1001;
  padding: 2rem;
  overflow-y: auto;
`;

const MobileMenuHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const MobileMenuClose = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #333;
  cursor: pointer;
`;

const MobileNavLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const MobileNavLink = styled(Link)`
  color: #333;
  text-decoration: none;
  font-weight: 500;
  padding: 1rem;
  border-radius: 8px;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #f8f9fa;
    color: #4361ee;
  }
`;

const MobileDropdownButton = styled.button`
  background: none;
  border: none;
  color: #333;
  font-weight: 500;
  padding: 1rem;
  text-align: left;
  width: 100%;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  
  &:hover {
    background-color: #f8f9fa;
    color: #4361ee;
  }
`;

const MobileDropdownContent = styled.div`
  display: ${props => props.isOpen ? 'block' : 'none'};
  padding-left: 1rem;
`;

const Navbar = () => {
  const { account, connectWallet } = React.useContext(Web3Context);
  const { currentUser, userProfile, logout } = useAuth();
  const navigate = useNavigate();
  
  const [investDropdownOpen, setInvestDropdownOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileInvestOpen, setMobileInvestOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  
  const investDropdownRef = useRef(null);
  const servicesDropdownRef = useRef(null);
  const userDropdownRef = useRef(null);
  
  // Format account address for display
  const formatAddress = (address) => {
    if (!address) return '';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };
  
  // Handle click outside to close dropdowns
  useEffect(() => {
    function handleClickOutside(event) {
      if (investDropdownRef.current && !investDropdownRef.current.contains(event.target)) {
        setInvestDropdownOpen(false);
      }
      if (servicesDropdownRef.current && !servicesDropdownRef.current.contains(event.target)) {
        setServicesDropdownOpen(false);
      }
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
  // Handle logout
  const handleLogout = async () => {
    try {
      await logout();
      setUserDropdownOpen(false);
      navigate('/login');
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  
  // Close mobile menu when navigating
  const handleMobileNavigation = () => {
    setMobileMenuOpen(false);
    setMobileInvestOpen(false);
    setMobileServicesOpen(false);
  };
  
  return (
    <NavbarContainer>
      <Logo to="/">
        <LogoImage src="/logo.png" alt="Property Mainnet" />
        Property Mainnet
      </Logo>
      
      <NavLinksContainer>
        <NavLinks>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/marketplace">Marketplace</NavLink>
          
          <DropdownContainer ref={investDropdownRef}>
            <DropdownButton 
              onClick={() => setInvestDropdownOpen(!investDropdownOpen)}
              className={investDropdownOpen ? 'active' : ''}
            >
              Invest <span>▼</span>
            </DropdownButton>
            <DropdownContent isOpen={investDropdownOpen}>
              <DropdownLink to="/fractional" onClick={() => setInvestDropdownOpen(false)}>Fractional Properties</DropdownLink>
              <DropdownLink to="/auctions" onClick={() => setInvestDropdownOpen(false)}>Property Auctions</DropdownLink>
              <DropdownDivider />
              <DropdownLink to="/investment-guide" onClick={() => setInvestDropdownOpen(false)}>Investment Guide</DropdownLink>
            </DropdownContent>
          </DropdownContainer>
          
          <DropdownContainer ref={servicesDropdownRef}>
            <DropdownButton 
              onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
              className={servicesDropdownOpen ? 'active' : ''}
            >
              Services <span>▼</span>
            </DropdownButton>
            <DropdownContent isOpen={servicesDropdownOpen}>
              <DropdownLink to="/property-verification" onClick={() => setServicesDropdownOpen(false)}>Property Verification</DropdownLink>
              <DropdownLink to="/property-management" onClick={() => setServicesDropdownOpen(false)}>Property Management</DropdownLink>
              <DropdownLink to="/property-modification" onClick={() => setServicesDropdownOpen(false)}>Property Modification</DropdownLink>
              <DropdownDivider />
              <DropdownLink to="/private-auctions" onClick={() => setServicesDropdownOpen(false)}>Private Auctions</DropdownLink>
            </DropdownContent>
          </DropdownContainer>
          
          {currentUser && userProfile?.isVerified && (
            <NavLink to="/create">List Property</NavLink>
          )}
        </NavLinks>
        
        <MobileMenuButton onClick={() => setMobileMenuOpen(true)}>
          ☰
        </MobileMenuButton>
      </NavLinksContainer>
      
      <RightSection>
        {account ? (
          <WalletButton connected={true}>
            <WalletIcon>💼</WalletIcon>
            {formatAddress(account)}
          </WalletButton>
        ) : (
          <WalletButton connected={false} onClick={connectWallet}>
            <WalletIcon>💼</WalletIcon>
            Connect Wallet
          </WalletButton>
        )}
        
        {currentUser ? (
          <UserMenu ref={userDropdownRef}>
            <UserButton onClick={() => setUserDropdownOpen(!userDropdownOpen)}>
              <UserAvatar 
                src={userProfile?.profileImage || "https://via.placeholder.com/40"} 
                alt={userProfile?.displayName || "User"} 
              />
            </UserButton>
            
            <UserDropdown isOpen={userDropdownOpen}>
              <UserInfo>
                <UserName>{userProfile?.displayName || "User"}</UserName>
                <UserEmail>{currentUser.email}</UserEmail>
              </UserInfo>
              
              <UserMenuLink to="/profile" onClick={() => setUserDropdownOpen(false)}>
                <span>👤</span> My Profile
              </UserMenuLink>
              
              <UserMenuLink to="/my-properties" onClick={() => setUserDropdownOpen(false)}>
                <span>🏠</span> My Properties
              </UserMenuLink>
              
              <UserMenuLink to="/watchlist" onClick={() => setUserDropdownOpen(false)}>
                <span>❤️</span> Watchlist
              </UserMenuLink>
              
              <UserMenuLink to="/transactions" onClick={() => setUserDropdownOpen(false)}>
                <span>📊</span> Transactions
              </UserMenuLink>
              
              <DropdownDivider />
              
              <LogoutButton onClick={handleLogout}>
                <span>🚪</span> Sign Out
              </LogoutButton>
            </UserDropdown>
          </UserMenu>
        ) : (
          <AuthButtons>
            <LoginButton to="/login">Sign In</LoginButton>
            <SignupButton to="/signup">Sign Up</SignupButton>
          </AuthButtons>
        )}
      </RightSection>
      
      {/* Mobile Menu */}
      <MobileMenu isOpen={mobileMenuOpen}>
        <MobileMenuHeader>
          <Logo to="/" onClick={handleMobileNavigation}>
            <LogoImage src="/logo.png" alt="Property Mainnet" />
            Property Mainnet
          </Logo>
          <MobileMenuClose onClick={() => setMobileMenuOpen(false)}>✕</MobileMenuClose>
        </MobileMenuHeader>
        
        <MobileNavLinks>
          <MobileNavLink to="/" onClick={handleMobileNavigation}>Home</MobileNavLink>
          <MobileNavLink to="/marketplace" onClick={handleMobileNavigation}>Marketplace</MobileNavLink>
          
          <MobileDropdownButton onClick={() => setMobileInvestOpen(!mobileInvestOpen)}>
            Invest
            <span>{mobileInvestOpen ? '▲' : '▼'}</span>
          </MobileDropdownButton>
          <MobileDropdownContent isOpen={mobileInvestOpen}>
            <MobileNavLink to="/fractional" onClick={handleMobileNavigation}>Fractional Properties</MobileNavLink>
            <MobileNavLink to="/auctions" onClick={handleMobileNavigation}>Property Auctions</MobileNavLink>
            <MobileNavLink to="/investment-guide" onClick={handleMobileNavigation}>Investment Guide</MobileNavLink>
          </MobileDropdownContent>
          
          <MobileDropdownButton onClick={() => setMobileServicesOpen(!mobileServicesOpen)}>
            Services
            <span>{mobileServicesOpen ? '▲' : '▼'}</span>
          </MobileDropdownButton>
          <MobileDropdownContent isOpen={mobileServicesOpen}>
            <MobileNavLink to="/property-verification" onClick={handleMobileNavigation}>Property Verification</MobileNavLink>
            <MobileNavLink to="/property-management" onClick={handleMobileNavigation}>Property Management</MobileNavLink>
            <MobileNavLink to="/property-modification" onClick={handleMobileNavigation}>Property Modification</MobileNavLink>
            <MobileNavLink to="/private-auctions" onClick={handleMobileNavigation}>Private Auctions</MobileNavLink>
          </MobileDropdownContent>
          
          {currentUser && userProfile?.isVerified && (
            <MobileNavLink to="/create" onClick={handleMobileNavigation}>List Property</MobileNavLink>
          )}
          
          {currentUser ? (
            <>
              <MobileNavLink to="/profile" onClick={handleMobileNavigation}>My Profile</MobileNavLink>
              <MobileNavLink to="/my-properties" onClick={handleMobileNavigation}>My Properties</MobileNavLink>
              <MobileNavLink to="/watchlist" onClick={handleMobileNavigation}>Watchlist</MobileNavLink>
              <MobileNavLink to="/transactions" onClick={handleMobileNavigation}>Transactions</MobileNavLink>
              <MobileNavLink as="button" onClick={handleLogout} style={{ color: '#e53e3e' }}>Sign Out</MobileNavLink>
            </>
          ) : (
            <>
              <MobileNavLink to="/login" onClick={handleMobileNavigation}>Sign In</MobileNavLink>
              <MobileNavLink to="/signup" onClick={handleMobileNavigation}>Sign Up</MobileNavLink>
            </>
          )}
        </MobileNavLinks>
      </MobileMenu>
    </NavbarContainer>
  );
};

export default Navbar;