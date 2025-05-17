import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Web3Context } from '../context/Web3Context';

const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #1a1a2e;
  color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  text-decoration: none;
  display: flex;
  align-items: center;
  
  &:hover {
    color: #4cc9f0;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-weight: 500;
  
  &:hover {
    color: #4cc9f0;
  }
`;

const ConnectButton = styled.button`
  background-color: #4361ee;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  
  &:hover {
    background-color: #3a56d4;
  }
`;

const AccountDisplay = styled.div`
  background-color: rgba(255, 255, 255, 0.1);
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-size: 0.9rem;
`;

const Navbar = () => {
  const { account, connectWallet } = useContext(Web3Context);
  
  // Format account address for display
  const formatAddress = (address) => {
    if (!address) return '';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };
  
  return (
    <NavbarContainer>
      <Logo to="/">
        Property Mainnet
      </Logo>
      
      <NavLinks>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/marketplace">Marketplace</NavLink>
        {account && <NavLink to="/create">List Property</NavLink>}
        {account && <NavLink to="/my-properties">My Properties</NavLink>}
      </NavLinks>
      
      {account ? (
        <AccountDisplay>
          {formatAddress(account)}
        </AccountDisplay>
      ) : (
        <ConnectButton onClick={connectWallet}>
          Connect Wallet
        </ConnectButton>
      )}
    </NavbarContainer>
  );
};

export default Navbar;