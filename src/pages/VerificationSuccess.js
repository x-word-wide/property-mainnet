import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const SuccessContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 4rem 1rem;
  text-align: center;
`;

const SuccessIcon = styled.div`
  width: 100px;
  height: 100px;
  background-color: #f0fff4;
  color: #38a169;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  margin: 0 auto 2rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #333;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 2rem;
`;

const Card = styled.div`
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  padding: 2rem;
  margin-bottom: 2rem;
`;

const StepsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin: 2rem 0;
  text-align: left;
`;

const Step = styled.div`
  display: flex;
  gap: 1rem;
`;

const StepNumber = styled.div`
  width: 30px;
  height: 30px;
  background-color: #4361ee;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  flex-shrink: 0;
`;

const StepContent = styled.div``;

const StepTitle = styled.h3`
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  color: #333;
`;

const StepDescription = styled.p`
  color: #666;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
  
  @media (max-width: 576px) {
    flex-direction: column;
  }
`;

const PrimaryButton = styled(Link)`
  background-color: #4361ee;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  text-decoration: none;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #3a56d4;
  }
  
  @media (max-width: 576px) {
    margin-bottom: 0.5rem;
  }
`;

const SecondaryButton = styled(Link)`
  background-color: white;
  color: #4361ee;
  border: 1px solid #4361ee;
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #f0f4ff;
  }
`;

const ContactInfo = styled.div`
  margin-top: 2rem;
  font-size: 0.9rem;
  color: #666;
`;

const ContactLink = styled.a`
  color: #4361ee;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

const VerificationSuccess = () => {
  return (
    <SuccessContainer>
      <SuccessIcon>
        <i className="fas fa-check"></i>
      </SuccessIcon>
      
      <Title>Verification Request Submitted!</Title>
      <Subtitle>
        Thank you for submitting your property for verification. Our team will review your application and get back to you soon.
      </Subtitle>
      
      <Card>
        <h2>What Happens Next?</h2>
        
        <StepsList>
          <Step>
            <StepNumber>1</StepNumber>
            <StepContent>
              <StepTitle>Document Review</StepTitle>
              <StepDescription>
                Our team will review all the documents you've submitted to verify their authenticity and completeness. This typically takes 2-3 business days.
              </StepDescription>
            </StepContent>
          </Step>
          
          <Step>
            <StepNumber>2</StepNumber>
            <StepContent>
              <StepTitle>Physical Inspection</StepTitle>
              <StepDescription>
                If your documents are approved, we'll schedule a physical inspection of your property. Our inspector will contact you to arrange a convenient time.
              </StepDescription>
            </StepContent>
          </Step>
          
          <Step>
            <StepNumber>3</StepNumber>
            <StepContent>
              <StepTitle>Final Approval</StepTitle>
              <StepDescription>
                After successful inspection, your property will receive final approval and a verification certificate. This typically takes 1-2 business days after inspection.
              </StepDescription>
            </StepContent>
          </Step>
          
          <Step>
            <StepNumber>4</StepNumber>
            <StepContent>
              <StepTitle>NFT Creation</StepTitle>
              <StepDescription>
                Once approved, you can proceed with creating your property NFT on our platform. You'll receive detailed instructions on how to complete this process.
              </StepDescription>
            </StepContent>
          </Step>
        </StepsList>
        
        <p>
          You can check the status of your verification request at any time in your dashboard. We'll also send you email updates as your application progresses through each stage.
        </p>
      </Card>
      
      <ButtonGroup>
        <PrimaryButton to="/my-properties">Go to My Properties</PrimaryButton>
        <SecondaryButton to="/marketplace">Browse Marketplace</SecondaryButton>
      </ButtonGroup>
      
      <ContactInfo>
        Have questions? Contact our support team at <ContactLink href="mailto:support@propertymainnet.com">support@propertymainnet.com</ContactLink>
      </ContactInfo>
    </SuccessContainer>
  );
};

export default VerificationSuccess;