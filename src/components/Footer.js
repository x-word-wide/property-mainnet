import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const FooterContainer = styled.footer`
  background-color: #f8f9fa;
  color: #333;
  padding: 4rem 2rem 2rem;
  margin-top: auto;
  border-top: 1px solid #eee;
`;

const FooterContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const FooterSection = styled.div`
  flex: 1;
  min-width: 200px;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    margin-bottom: 2.5rem;
  }
`;

const LogoSection = styled(FooterSection)`
  flex: 1.5;
`;

const FooterLogo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const LogoImage = styled.img`
  height: 40px;
  margin-right: 10px;
`;

const LogoText = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
  color: #4361ee;
`;

const FooterTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
  color: #333;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -0.5rem;
    width: 40px;
    height: 2px;
    background-color: #4361ee;
  }
`;

const FooterLink = styled(Link)`
  display: block;
  color: #666;
  text-decoration: none;
  margin-bottom: 0.8rem;
  transition: color 0.3s ease;
  
  &:hover {
    color: #4361ee;
  }
`;

const FooterText = styled.p`
  color: #666;
  margin-bottom: 1rem;
  line-height: 1.6;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #f0f4ff;
  color: #4361ee;
  font-size: 1.2rem;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #4361ee;
    color: white;
  }
`;

const SubscribeSection = styled.div`
  margin-top: 1.5rem;
`;

const SubscribeForm = styled.form`
  display: flex;
  margin-top: 1rem;
  
  @media (max-width: 576px) {
    flex-direction: column;
  }
`;

const SubscribeInput = styled.input`
  flex: 1;
  padding: 0.8rem 1rem;
  border: 1px solid #ddd;
  border-radius: 8px 0 0 8px;
  font-size: 0.9rem;
  
  &:focus {
    outline: none;
    border-color: #4361ee;
  }
  
  @media (max-width: 576px) {
    border-radius: 8px;
    margin-bottom: 0.5rem;
  }
`;

const SubscribeButton = styled.button`
  background-color: #4361ee;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 0 8px 8px 0;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #3a56d4;
  }
  
  @media (max-width: 576px) {
    border-radius: 8px;
  }
`;

const BottomSection = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 2rem;
  border-top: 1px solid #eee;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const Copyright = styled.div`
  color: #666;
  font-size: 0.9rem;
`;

const BottomLinks = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const BottomLink = styled(Link)`
  color: #666;
  text-decoration: none;
  font-size: 0.9rem;
  
  &:hover {
    color: #4361ee;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <LogoSection>
          <FooterLogo>
            <LogoImage src="/logo.png" alt="Property Mainnet" />
            <LogoText>Property Mainnet</LogoText>
          </FooterLogo>
          <FooterText>
            The premier NFT marketplace for real estate properties. Property Mainnet revolutionizes real estate transactions by leveraging blockchain technology to provide secure, transparent, and efficient property ownership transfers.
          </FooterText>
          <SocialLinks>
            <SocialLink href="https://twitter.com/propertymainnet" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter"></i>
            </SocialLink>
            <SocialLink href="https://facebook.com/propertymainnet" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook-f"></i>
            </SocialLink>
            <SocialLink href="https://instagram.com/propertymainnet" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i>
            </SocialLink>
            <SocialLink href="https://linkedin.com/company/propertymainnet" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin-in"></i>
            </SocialLink>
          </SocialLinks>
        </LogoSection>
        
        <FooterSection>
          <FooterTitle>Marketplace</FooterTitle>
          <FooterLink to="/marketplace">Browse Properties</FooterLink>
          <FooterLink to="/fractional">Fractional Ownership</FooterLink>
          <FooterLink to="/auctions">Property Auctions</FooterLink>
          <FooterLink to="/create">List Your Property</FooterLink>
          <FooterLink to="/my-properties">My Properties</FooterLink>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle>Services</FooterTitle>
          <FooterLink to="/property-verification">Property Verification</FooterLink>
          <FooterLink to="/property-management">Property Management</FooterLink>
          <FooterLink to="/property-modification">Property Modification</FooterLink>
          <FooterLink to="/private-auctions">Private Auctions</FooterLink>
          <FooterLink to="/investment-guide">Investment Guide</FooterLink>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle>Company</FooterTitle>
          <FooterLink to="/about">About Us</FooterLink>
          <FooterLink to="/team">Our Team</FooterLink>
          <FooterLink to="/careers">Careers</FooterLink>
          <FooterLink to="/blog">Blog</FooterLink>
          <FooterLink to="/contact">Contact Us</FooterLink>
          
          <SubscribeSection>
            <FooterTitle>Stay Updated</FooterTitle>
            <FooterText>Subscribe to our newsletter for the latest updates.</FooterText>
            <SubscribeForm>
              <SubscribeInput type="email" placeholder="Your email address" />
              <SubscribeButton type="submit">Subscribe</SubscribeButton>
            </SubscribeForm>
          </SubscribeSection>
        </FooterSection>
      </FooterContent>
      
      <BottomSection>
        <Copyright>
          &copy; {new Date().getFullYear()} Property Mainnet. All rights reserved.
        </Copyright>
        
        <BottomLinks>
          <BottomLink to="/terms">Terms of Service</BottomLink>
          <BottomLink to="/privacy">Privacy Policy</BottomLink>
          <BottomLink to="/cookies">Cookie Policy</BottomLink>
        </BottomLinks>
      </BottomSection>
    </FooterContainer>
  );
};

export default Footer;