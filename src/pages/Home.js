import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Web3Context } from '../context/Web3Context';

const HomeContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const HeroSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 4rem 1rem;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  color: white;
  border-radius: 10px;
  margin-bottom: 3rem;
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.2rem;
  max-width: 700px;
  margin-bottom: 2rem;
  color: #e0e0e0;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  
  @media (max-width: 576px) {
    flex-direction: column;
  }
`;

const PrimaryButton = styled(Link)`
  background-color: #4361ee;
  color: white;
  padding: 0.8rem 1.5rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 500;
  
  &:hover {
    background-color: #3a56d4;
  }
`;

const SecondaryButton = styled(Link)`
  background-color: transparent;
  color: white;
  padding: 0.8rem 1.5rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 500;
  border: 1px solid white;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const FeaturesSection = styled.section`
  padding: 3rem 1rem;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  text-align: center;
  margin-bottom: 3rem;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const FeatureCard = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #1a1a2e;
`;

const FeatureDescription = styled.p`
  color: #555;
  line-height: 1.6;
`;

const HowItWorksSection = styled.section`
  padding: 3rem 1rem;
  background-color: #f8f9fa;
  border-radius: 10px;
  margin: 3rem 0;
`;

const StepsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 800px;
  margin: 0 auto;
`;

const Step = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: flex-start;
`;

const StepNumber = styled.div`
  background-color: #4361ee;
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  flex-shrink: 0;
`;

const StepContent = styled.div``;

const StepTitle = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
  color: #1a1a2e;
`;

const StepDescription = styled.p`
  color: #555;
  line-height: 1.6;
`;

const Home = () => {
  const { account, connectWallet } = useContext(Web3Context);
  
  return (
    <HomeContainer>
      <HeroSection>
        <HeroTitle>Real Estate NFT Marketplace</HeroTitle>
        <HeroSubtitle>
          Buy, sell, and invest in real estate properties using blockchain technology. 
          Property Mainnet brings transparency, security, and liquidity to real estate transactions.
        </HeroSubtitle>
        <ButtonGroup>
          <PrimaryButton to="/marketplace">Explore Properties</PrimaryButton>
          {account ? (
            <SecondaryButton to="/create">List Your Property</SecondaryButton>
          ) : (
            <SecondaryButton to="#" onClick={(e) => { e.preventDefault(); connectWallet(); }}>
              Connect Wallet
            </SecondaryButton>
          )}
        </ButtonGroup>
      </HeroSection>
      
      <FeaturesSection>
        <SectionTitle>Why Choose Property Mainnet?</SectionTitle>
        <FeaturesGrid>
          <FeatureCard>
            <FeatureTitle>Tokenized Real Estate</FeatureTitle>
            <FeatureDescription>
              Convert physical properties into digital assets on the blockchain, enabling fractional ownership and simplified transactions.
            </FeatureDescription>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureTitle>Verified Properties</FeatureTitle>
            <FeatureDescription>
              All properties undergo a verification process to ensure authenticity and provide buyers with confidence in their investments.
            </FeatureDescription>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureTitle>Global Marketplace</FeatureTitle>
            <FeatureDescription>
              Access real estate opportunities worldwide without geographical limitations or intermediaries.
            </FeatureDescription>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureTitle>Secure Transactions</FeatureTitle>
            <FeatureDescription>
              Smart contracts ensure secure, transparent, and automated transactions with immutable records on the blockchain.
            </FeatureDescription>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureTitle>Lower Fees</FeatureTitle>
            <FeatureDescription>
              Eliminate traditional real estate fees and commissions by connecting buyers and sellers directly.
            </FeatureDescription>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureTitle>Liquidity</FeatureTitle>
            <FeatureDescription>
              Increase the liquidity of real estate assets through tokenization, making it easier to buy, sell, and trade properties.
            </FeatureDescription>
          </FeatureCard>
        </FeaturesGrid>
      </FeaturesSection>
      
      <HowItWorksSection>
        <SectionTitle>How It Works</SectionTitle>
        <StepsContainer>
          <Step>
            <StepNumber>1</StepNumber>
            <StepContent>
              <StepTitle>Connect Your Wallet</StepTitle>
              <StepDescription>
                Connect your Ethereum wallet (like MetaMask) to access the Property Mainnet marketplace and manage your real estate NFTs.
              </StepDescription>
            </StepContent>
          </Step>
          
          <Step>
            <StepNumber>2</StepNumber>
            <StepContent>
              <StepTitle>Browse Properties</StepTitle>
              <StepDescription>
                Explore our marketplace to discover verified real estate properties available as NFTs, with detailed information and documentation.
              </StepDescription>
            </StepContent>
          </Step>
          
          <Step>
            <StepNumber>3</StepNumber>
            <StepContent>
              <StepTitle>Purchase or List Properties</StepTitle>
              <StepDescription>
                Buy properties directly with cryptocurrency or list your own real estate for sale by creating an NFT with property details.
              </StepDescription>
            </StepContent>
          </Step>
          
          <Step>
            <StepNumber>4</StepNumber>
            <StepContent>
              <StepTitle>Manage Your Portfolio</StepTitle>
              <StepDescription>
                Track your real estate investments, receive rental income, and sell properties when you're ready, all through the blockchain.
              </StepDescription>
            </StepContent>
          </Step>
        </StepsContainer>
      </HowItWorksSection>
    </HomeContainer>
  );
};

export default Home;