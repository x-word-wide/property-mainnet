import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const AboutContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const HeroSection = styled.div`
  text-align: center;
  margin-bottom: 4rem;
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
  font-size: 2rem;
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

const MissionSection = styled(Section)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const MissionContent = styled.div``;

const MissionImage = styled.img`
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

const StatsSection = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  margin: 3rem 0;
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const StatCard = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  text-align: center;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const StatNumber = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: #4361ee;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  font-size: 1rem;
  color: #666;
`;

const TeamSection = styled(Section)``;

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
`;

const TeamMember = styled.div`
  background-color: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const MemberImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
`;

const MemberInfo = styled.div`
  padding: 1.5rem;
`;

const MemberName = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.3rem;
  color: #333;
`;

const MemberRole = styled.div`
  font-size: 0.9rem;
  color: #4361ee;
  margin-bottom: 1rem;
`;

const MemberBio = styled.p`
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 1rem;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

const SocialLink = styled.a`
  color: #666;
  font-size: 1.2rem;
  
  &:hover {
    color: #4361ee;
  }
`;

const ValuesSection = styled(Section)``;

const ValuesGrid = styled.div`
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

const ValueCard = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const ValueIcon = styled.div`
  font-size: 2.5rem;
  color: #4361ee;
  margin-bottom: 1rem;
`;

const ValueTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: #333;
`;

const ValueDescription = styled.p`
  font-size: 0.9rem;
  color: #666;
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

const About = () => {
  return (
    <AboutContainer>
      <HeroSection>
        <Title>About Property Mainnet</Title>
        <Subtitle>
          We're revolutionizing real estate ownership through blockchain technology, making property investment more accessible, transparent, and secure.
        </Subtitle>
      </HeroSection>
      
      <MissionSection>
        <MissionContent>
          <SectionTitle>Our Mission</SectionTitle>
          <Paragraph>
            At Property Mainnet, we believe that real estate ownership should be accessible to everyone. Our mission is to democratize property investment by leveraging blockchain technology to create a transparent, secure, and efficient marketplace for real estate NFTs.
          </Paragraph>
          <Paragraph>
            We're breaking down traditional barriers to real estate investment by enabling fractional ownership, reducing transaction costs, and eliminating geographical limitations. Through our platform, investors can buy, sell, and trade property NFTs with confidence, knowing that each asset is verified and securely recorded on the blockchain.
          </Paragraph>
          <Paragraph>
            Our vision is to create a global ecosystem where real estate assets can be tokenized, traded, and managed with unprecedented ease and security, opening up new opportunities for investors and property owners alike.
          </Paragraph>
        </MissionContent>
        <MissionImage src="https://source.unsplash.com/random/600x400/?real-estate-office" alt="Property Mainnet Office" />
      </MissionSection>
      
      <StatsSection>
        <StatCard>
          <StatNumber>$250M+</StatNumber>
          <StatLabel>Property Value Tokenized</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber>15,000+</StatNumber>
          <StatLabel>Verified Users</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber>500+</StatNumber>
          <StatLabel>Properties Listed</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber>30+</StatNumber>
          <StatLabel>Countries Served</StatLabel>
        </StatCard>
      </StatsSection>
      
      <TeamSection>
        <SectionTitle>Our Leadership Team</SectionTitle>
        <TeamGrid>
          <TeamMember>
            <MemberImage src="https://source.unsplash.com/random/300x300/?professional-man-1" alt="John Smith" />
            <MemberInfo>
              <MemberName>John Smith</MemberName>
              <MemberRole>CEO & Co-Founder</MemberRole>
              <MemberBio>
                Former real estate executive with 15+ years of experience in property development and investment banking.
              </MemberBio>
              <SocialLinks>
                <SocialLink href="#" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-linkedin-in"></i>
                </SocialLink>
                <SocialLink href="#" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-twitter"></i>
                </SocialLink>
              </SocialLinks>
            </MemberInfo>
          </TeamMember>
          
          <TeamMember>
            <MemberImage src="https://source.unsplash.com/random/300x300/?professional-woman-1" alt="Sarah Johnson" />
            <MemberInfo>
              <MemberName>Sarah Johnson</MemberName>
              <MemberRole>CTO & Co-Founder</MemberRole>
              <MemberBio>
                Blockchain expert with previous experience at Ethereum Foundation and multiple successful Web3 startups.
              </MemberBio>
              <SocialLinks>
                <SocialLink href="#" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-linkedin-in"></i>
                </SocialLink>
                <SocialLink href="#" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-github"></i>
                </SocialLink>
              </SocialLinks>
            </MemberInfo>
          </TeamMember>
          
          <TeamMember>
            <MemberImage src="https://source.unsplash.com/random/300x300/?professional-man-2" alt="Michael Chen" />
            <MemberInfo>
              <MemberName>Michael Chen</MemberName>
              <MemberRole>COO</MemberRole>
              <MemberBio>
                Operations expert with experience scaling fintech companies from startup to enterprise level.
              </MemberBio>
              <SocialLinks>
                <SocialLink href="#" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-linkedin-in"></i>
                </SocialLink>
                <SocialLink href="#" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-twitter"></i>
                </SocialLink>
              </SocialLinks>
            </MemberInfo>
          </TeamMember>
          
          <TeamMember>
            <MemberImage src="https://source.unsplash.com/random/300x300/?professional-woman-2" alt="Emily Rodriguez" />
            <MemberInfo>
              <MemberName>Emily Rodriguez</MemberName>
              <MemberRole>Chief Legal Officer</MemberRole>
              <MemberBio>
                Attorney specializing in real estate law, securities regulation, and blockchain compliance.
              </MemberBio>
              <SocialLinks>
                <SocialLink href="#" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-linkedin-in"></i>
                </SocialLink>
                <SocialLink href="#" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-twitter"></i>
                </SocialLink>
              </SocialLinks>
            </MemberInfo>
          </TeamMember>
        </TeamGrid>
      </TeamSection>
      
      <ValuesSection>
        <SectionTitle>Our Core Values</SectionTitle>
        <ValuesGrid>
          <ValueCard>
            <ValueIcon>
              <i className="fas fa-lock"></i>
            </ValueIcon>
            <ValueTitle>Security & Trust</ValueTitle>
            <ValueDescription>
              We prioritize the security of our platform and the trust of our users above all else. Every property on our platform undergoes rigorous verification to ensure authenticity.
            </ValueDescription>
          </ValueCard>
          
          <ValueCard>
            <ValueIcon>
              <i className="fas fa-handshake"></i>
            </ValueIcon>
            <ValueTitle>Accessibility</ValueTitle>
            <ValueDescription>
              We believe that real estate investment should be accessible to everyone, regardless of their financial background or geographical location.
            </ValueDescription>
          </ValueCard>
          
          <ValueCard>
            <ValueIcon>
              <i className="fas fa-lightbulb"></i>
            </ValueIcon>
            <ValueTitle>Innovation</ValueTitle>
            <ValueDescription>
              We continuously push the boundaries of what's possible in real estate by leveraging cutting-edge blockchain technology and creative solutions.
            </ValueDescription>
          </ValueCard>
          
          <ValueCard>
            <ValueIcon>
              <i className="fas fa-glasses"></i>
            </ValueIcon>
            <ValueTitle>Transparency</ValueTitle>
            <ValueDescription>
              We maintain complete transparency in all our operations, from property verification to transaction fees, ensuring users have all the information they need.
            </ValueDescription>
          </ValueCard>
          
          <ValueCard>
            <ValueIcon>
              <i className="fas fa-users"></i>
            </ValueIcon>
            <ValueTitle>Community</ValueTitle>
            <ValueDescription>
              We foster a vibrant community of property owners, investors, and enthusiasts who share knowledge and opportunities with each other.
            </ValueDescription>
          </ValueCard>
          
          <ValueCard>
            <ValueIcon>
              <i className="fas fa-globe"></i>
            </ValueIcon>
            <ValueTitle>Sustainability</ValueTitle>
            <ValueDescription>
              We're committed to promoting sustainable real estate practices and reducing the environmental impact of property transactions through digital solutions.
            </ValueDescription>
          </ValueCard>
        </ValuesGrid>
      </ValuesSection>
      
      <CTASection>
        <CTATitle>Join the Real Estate Revolution</CTATitle>
        <CTAText>
          Ready to experience the future of property ownership? Create an account today and start exploring our marketplace of verified real estate NFTs.
        </CTAText>
        <CTAButton to="/signup">Get Started</CTAButton>
      </CTASection>
    </AboutContainer>
  );
};

export default About;