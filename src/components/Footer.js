import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const FooterContainer = styled.footer`
  background-color: #1a1a2e;
  color: white;
  padding: 2rem;
  margin-top: auto;
`;

const FooterContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
`;

const FooterSection = styled.div`
  flex: 1;
  min-width: 200px;
  margin-bottom: 1.5rem;
`;

const FooterTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: #4cc9f0;
`;

const FooterLink = styled(Link)`
  display: block;
  color: #e0e0e0;
  text-decoration: none;
  margin-bottom: 0.5rem;
  
  &:hover {
    color: #4cc9f0;
  }
`;

const FooterText = styled.p`
  color: #e0e0e0;
  margin-bottom: 0.5rem;
`;

const Copyright = styled.div`
  text-align: center;
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: #a0a0a0;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <FooterTitle>Property Mainnet</FooterTitle>
          <FooterText>
            The premier NFT marketplace for real estate properties. Buy, sell, and invest in real estate using blockchain technology.
          </FooterText>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle>Marketplace</FooterTitle>
          <FooterLink to="/marketplace">Browse Properties</FooterLink>
          <FooterLink to="/create">List Your Property</FooterLink>
          <FooterLink to="/my-properties">My Properties</FooterLink>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle>Resources</FooterTitle>
          <FooterLink to="/faq">FAQ</FooterLink>
          <FooterLink to="/how-it-works">How It Works</FooterLink>
          <FooterLink to="/blog">Blog</FooterLink>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle>Contact</FooterTitle>
          <FooterText>info@propertymainnet.com</FooterText>
          <FooterText>+1 (555) 123-4567</FooterText>
          <FooterText>123 Blockchain Ave, Crypto City</FooterText>
        </FooterSection>
      </FooterContent>
      
      <Copyright>
        &copy; {new Date().getFullYear()} Property Mainnet. All rights reserved.
      </Copyright>
    </FooterContainer>
  );
};

export default Footer;