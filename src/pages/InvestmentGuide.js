import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const GuideContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const HeroSection = styled.div`
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

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  color: #333;
  position: relative;
  padding-bottom: 0.5rem;
  
  &:after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 60px;
    height: 3px;
    background-color: #4361ee;
  }
`;

const Section = styled.section`
  margin-bottom: 4rem;
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Content = styled.div``;

const Image = styled.img`
  width: 100%;
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    order: -1;
  }
`;

const Paragraph = styled.p`
  margin-bottom: 1.5rem;
  line-height: 1.7;
  color: #555;
`;

const StepsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin: 2rem 0;
`;

const Step = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const StepNumber = styled.div`
  width: 40px;
  height: 40px;
  background-color: #4361ee;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.2rem;
  flex-shrink: 0;
`;

const StepContent = styled.div``;

const StepTitle = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
  color: #333;
`;

const StepDescription = styled.p`
  color: #666;
  line-height: 1.6;
`;

const BenefitsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const BenefitCard = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const BenefitIcon = styled.div`
  font-size: 2.5rem;
  color: #4361ee;
  margin-bottom: 1rem;
`;

const BenefitTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: #333;
`;

const BenefitDescription = styled.p`
  font-size: 0.9rem;
  color: #666;
`;

const ComparisonTable = styled.div`
  overflow-x: auto;
  margin: 2rem 0;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  
  th, td {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid #eee;
  }
  
  th {
    background-color: #f8f9fa;
    font-weight: 600;
    color: #333;
  }
  
  tr:hover {
    background-color: #f8f9fa;
  }
  
  td:first-child {
    font-weight: 500;
  }
`;

const CTASection = styled.div`
  background-color: #f0f4ff;
  padding: 3rem;
  border-radius: 10px;
  text-align: center;
  margin-top: 3rem;
`;

const CTATitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #333;
`;

const CTAText = styled.p`
  font-size: 1.1rem;
  color: #666;
  max-width: 700px;
  margin: 0 auto 2rem;
`;

const CTAButton = styled(Link)`
  display: inline-block;
  background-color: #4361ee;
  color: white;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-weight: 500;
  text-decoration: none;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #3a56d4;
  }
`;

const FAQSection = styled.div`
  margin-top: 4rem;
`;

const FAQTitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 2rem;
  color: #333;
  text-align: center;
`;

const FAQList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FAQItem = styled.div`
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
`;

const FAQQuestion = styled.h3`
  font-size: 1.1rem;
  margin-bottom: 0.8rem;
  color: #333;
`;

const FAQAnswer = styled.p`
  color: #666;
  line-height: 1.6;
`;

const InvestmentGuide = () => {
  return (
    <GuideContainer>
      <HeroSection>
        <Title>Real Estate NFT Investment Guide</Title>
        <Subtitle>
          Learn how to invest in tokenized real estate properties on Property Mainnet and build a diversified portfolio of digital real estate assets.
        </Subtitle>
      </HeroSection>
      
      <Section>
        <ContentGrid>
          <Content>
            <SectionTitle>Why Invest in Real Estate NFTs?</SectionTitle>
            <Paragraph>
              Real estate has long been considered one of the most stable and profitable investment classes, but traditional real estate investing comes with high barriers to entry, including large capital requirements, geographical limitations, and complex legal processes.
            </Paragraph>
            <Paragraph>
              Property Mainnet is changing this paradigm by tokenizing real estate properties as NFTs (Non-Fungible Tokens) on the blockchain. This innovative approach offers numerous advantages over traditional real estate investment methods.
            </Paragraph>
            <Paragraph>
              By investing in Real Estate NFTs, you gain access to a global market of properties, can start with smaller amounts through fractional ownership, enjoy enhanced liquidity, and benefit from the transparency and security of blockchain technology.
            </Paragraph>
          </Content>
          <Image src="https://source.unsplash.com/random/600x400/?real-estate-investment" alt="Real Estate Investment" />
        </ContentGrid>
      </Section>
      
      <Section>
        <SectionTitle>Benefits of Real Estate NFT Investments</SectionTitle>
        <BenefitsGrid>
          <BenefitCard>
            <BenefitIcon>
              <i className="fas fa-dollar-sign"></i>
            </BenefitIcon>
            <BenefitTitle>Lower Barrier to Entry</BenefitTitle>
            <BenefitDescription>
              Invest in high-value properties with as little as a few hundred dollars through fractional ownership, making real estate accessible to more investors.
            </BenefitDescription>
          </BenefitCard>
          
          <BenefitCard>
            <BenefitIcon>
              <i className="fas fa-globe"></i>
            </BenefitIcon>
            <BenefitTitle>Global Access</BenefitTitle>
            <BenefitDescription>
              Invest in properties around the world without geographical limitations or the need for local knowledge and connections.
            </BenefitDescription>
          </BenefitCard>
          
          <BenefitCard>
            <BenefitIcon>
              <i className="fas fa-exchange-alt"></i>
            </BenefitIcon>
            <BenefitTitle>Enhanced Liquidity</BenefitTitle>
            <BenefitDescription>
              Buy and sell property tokens quickly and easily on our marketplace, without the lengthy processes associated with traditional real estate transactions.
            </BenefitDescription>
          </BenefitCard>
          
          <BenefitCard>
            <BenefitIcon>
              <i className="fas fa-shield-alt"></i>
            </BenefitIcon>
            <BenefitTitle>Security & Transparency</BenefitTitle>
            <BenefitDescription>
              All property information and ownership records are stored on the blockchain, providing immutable proof of ownership and complete transaction history.
            </BenefitDescription>
          </BenefitCard>
          
          <BenefitCard>
            <BenefitIcon>
              <i className="fas fa-chart-pie"></i>
            </BenefitIcon>
            <BenefitTitle>Portfolio Diversification</BenefitTitle>
            <BenefitDescription>
              Easily diversify your investment portfolio across multiple properties, property types, and geographical locations.
            </BenefitDescription>
          </BenefitCard>
          
          <BenefitCard>
            <BenefitIcon>
              <i className="fas fa-file-contract"></i>
            </BenefitIcon>
            <BenefitTitle>Smart Contracts</BenefitTitle>
            <BenefitDescription>
              Automated processes for rental income distribution, property management, and other aspects of real estate ownership through smart contracts.
            </BenefitDescription>
          </BenefitCard>
        </BenefitsGrid>
      </Section>
      
      <Section>
        <SectionTitle>How to Invest in Real Estate NFTs</SectionTitle>
        <StepsList>
          <Step>
            <StepNumber>1</StepNumber>
            <StepContent>
              <StepTitle>Create an Account</StepTitle>
              <StepDescription>
                Sign up for a Property Mainnet account and complete the verification process. This ensures that all users on our platform are legitimate investors and property owners.
              </StepDescription>
            </StepContent>
          </Step>
          
          <Step>
            <StepNumber>2</StepNumber>
            <StepContent>
              <StepTitle>Connect Your Wallet</StepTitle>
              <StepDescription>
                Link your digital wallet (such as MetaMask) to your Property Mainnet account. This wallet will be used to store your property NFTs and conduct transactions on the platform.
              </StepDescription>
            </StepContent>
          </Step>
          
          <Step>
            <StepNumber>3</StepNumber>
            <StepContent>
              <StepTitle>Fund Your Wallet</StepTitle>
              <StepDescription>
                Add cryptocurrency to your wallet to use for purchasing property NFTs. Property Mainnet supports Ethereum and other major cryptocurrencies for transactions.
              </StepDescription>
            </StepContent>
          </Step>
          
          <Step>
            <StepNumber>4</StepNumber>
            <StepContent>
              <StepTitle>Browse the Marketplace</StepTitle>
              <StepDescription>
                Explore our marketplace to find properties that match your investment criteria. You can filter by property type, location, price range, and other factors to narrow down your options.
              </StepDescription>
            </StepContent>
          </Step>
          
          <Step>
            <StepNumber>5</StepNumber>
            <StepContent>
              <StepTitle>Research Properties</StepTitle>
              <StepDescription>
                Review property details, including verification status, property history, financial projections, and ownership structure. All properties on Property Mainnet undergo rigorous verification to ensure authenticity.
              </StepDescription>
            </StepContent>
          </Step>
          
          <Step>
            <StepNumber>6</StepNumber>
            <StepContent>
              <StepTitle>Purchase Property NFTs</StepTitle>
              <StepDescription>
                Buy property NFTs through direct purchase, auction, or fractional ownership. The transaction is recorded on the blockchain, providing immutable proof of your ownership.
              </StepDescription>
            </StepContent>
          </Step>
          
          <Step>
            <StepNumber>7</StepNumber>
            <StepContent>
              <StepTitle>Manage Your Portfolio</StepTitle>
              <StepDescription>
                Track your property investments, receive rental income (if applicable), and participate in property management decisions through our platform.
              </StepDescription>
            </StepContent>
          </Step>
        </StepsList>
      </Section>
      
      <Section>
        <SectionTitle>Investment Strategies</SectionTitle>
        <ContentGrid>
          <Image src="https://source.unsplash.com/random/600x400/?investment-strategy" alt="Investment Strategy" />
          <Content>
            <Paragraph>
              There are several strategies you can employ when investing in real estate NFTs on Property Mainnet:
            </Paragraph>
            <StepsList>
              <Step>
                <StepNumber>1</StepNumber>
                <StepContent>
                  <StepTitle>Long-term Appreciation</StepTitle>
                  <StepDescription>
                    Purchase property NFTs in areas with strong growth potential and hold them for long-term capital appreciation. This strategy is similar to traditional buy-and-hold real estate investing.
                  </StepDescription>
                </StepContent>
              </Step>
              
              <Step>
                <StepNumber>2</StepNumber>
                <StepContent>
                  <StepTitle>Income Generation</StepTitle>
                  <StepDescription>
                    Focus on properties that generate regular rental income. Property Mainnet distributes rental income to token holders proportionally to their ownership stake.
                  </StepDescription>
                </StepContent>
              </Step>
              
              <Step>
                <StepNumber>3</StepNumber>
                <StepContent>
                  <StepTitle>Diversification</StepTitle>
                  <StepDescription>
                    Spread your investment across multiple properties, property types, and geographical locations to reduce risk and capture different market opportunities.
                  </StepDescription>
                </StepContent>
              </Step>
              
              <Step>
                <StepNumber>4</StepNumber>
                <StepContent>
                  <StepTitle>Flipping</StepTitle>
                  <StepDescription>
                    Buy property NFTs at a lower price and sell them at a higher price in the short term. This strategy requires good market timing and property selection skills.
                  </StepDescription>
                </StepContent>
              </Step>
            </StepsList>
          </Content>
        </ContentGrid>
      </Section>
      
      <Section>
        <SectionTitle>Traditional Real Estate vs. Real Estate NFTs</SectionTitle>
        <ComparisonTable>
          <Table>
            <thead>
              <tr>
                <th>Feature</th>
                <th>Traditional Real Estate</th>
                <th>Real Estate NFTs</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Minimum Investment</td>
                <td>High (typically $10,000s to $100,000s)</td>
                <td>Low (can start with a few hundred dollars)</td>
              </tr>
              <tr>
                <td>Liquidity</td>
                <td>Low (months to sell)</td>
                <td>High (can sell tokens in minutes)</td>
              </tr>
              <tr>
                <td>Transaction Costs</td>
                <td>High (5-10% of property value)</td>
                <td>Low (1-3% transaction fee)</td>
              </tr>
              <tr>
                <td>Geographical Limitations</td>
                <td>Significant (local knowledge needed)</td>
                <td>None (global marketplace)</td>
              </tr>
              <tr>
                <td>Management Complexity</td>
                <td>High (property management, tenants, repairs)</td>
                <td>Low (handled through platform)</td>
              </tr>
              <tr>
                <td>Transparency</td>
                <td>Limited (depends on disclosure)</td>
                <td>High (all information on blockchain)</td>
              </tr>
              <tr>
                <td>Ownership Proof</td>
                <td>Paper deeds, titles</td>
                <td>Blockchain-verified NFTs</td>
              </tr>
              <tr>
                <td>Income Distribution</td>
                <td>Manual process</td>
                <td>Automated through smart contracts</td>
              </tr>
            </tbody>
          </Table>
        </ComparisonTable>
      </Section>
      
      <FAQSection>
        <FAQTitle>Frequently Asked Questions</FAQTitle>
        <FAQList>
          <FAQItem>
            <FAQQuestion>How are property values determined on Property Mainnet?</FAQQuestion>
            <FAQAnswer>
              Property values are determined through a combination of professional appraisals, market comparables, and our proprietary valuation algorithm. All properties undergo rigorous verification before being listed on our platform.
            </FAQAnswer>
          </FAQItem>
          
          <FAQItem>
            <FAQQuestion>What happens if a property is damaged or destroyed?</FAQQuestion>
            <FAQAnswer>
              All properties on Property Mainnet are required to have comprehensive insurance coverage. In the event of damage or destruction, insurance proceeds are distributed to token holders proportionally to their ownership stake.
            </FAQAnswer>
          </FAQItem>
          
          <FAQItem>
            <FAQQuestion>How is rental income distributed to token holders?</FAQQuestion>
            <FAQAnswer>
              Rental income is collected by Property Mainnet and distributed to token holders through smart contracts. Distributions are made proportionally to ownership stake and can be set up for automatic payments on a monthly or quarterly basis.
            </FAQAnswer>
          </FAQItem>
          
          <FAQItem>
            <FAQQuestion>Can I sell my property tokens at any time?</FAQQuestion>
            <FAQAnswer>
              Yes, you can list your property tokens for sale on our marketplace at any time. The liquidity of your tokens will depend on market demand, but our platform is designed to facilitate quick and easy transactions.
            </FAQAnswer>
          </FAQItem>
          
          <FAQItem>
            <FAQQuestion>What taxes apply to real estate NFT investments?</FAQQuestion>
            <FAQAnswer>
              Tax treatment of real estate NFTs varies by jurisdiction. In general, you may be subject to capital gains tax when selling tokens at a profit and income tax on rental distributions. We recommend consulting with a tax professional for advice specific to your situation.
            </FAQAnswer>
          </FAQItem>
          
          <FAQItem>
            <FAQQuestion>How secure are real estate NFT investments?</FAQQuestion>
            <FAQAnswer>
              Property Mainnet employs multiple security measures to protect your investments, including blockchain verification, smart contract audits, and comprehensive property insurance. However, as with any investment, there are risks involved, and you should conduct your own due diligence.
            </FAQAnswer>
          </FAQItem>
        </FAQList>
      </FAQSection>
      
      <CTASection>
        <CTATitle>Ready to Start Your Real Estate NFT Journey?</CTATitle>
        <CTAText>
          Join thousands of investors who are already building their digital real estate portfolios on Property Mainnet. Create an account today and discover a new way to invest in real estate.
        </CTAText>
        <CTAButton to="/signup">Create Account</CTAButton>
      </CTASection>
    </GuideContainer>
  );
};

export default InvestmentGuide;