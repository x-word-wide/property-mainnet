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

const ModificationDetails = styled.div`
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 1.5rem;
  margin: 2rem 0;
  text-align: left;
`;

const DetailRow = styled.div`
  display: flex;
  margin-bottom: 1rem;
  
  &:last-child {
    margin-bottom: 0;
  }
  
  @media (max-width: 576px) {
    flex-direction: column;
    margin-bottom: 1.5rem;
  }
`;

const DetailLabel = styled.div`
  width: 200px;
  font-weight: 600;
  color: #333;
  
  @media (max-width: 576px) {
    width: 100%;
    margin-bottom: 0.3rem;
  }
`;

const DetailValue = styled.div`
  flex: 1;
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

const ModificationSuccess = () => {
  // In a real application, you would get the modification details from the URL params or context
  const modificationDetails = {
    requestId: 'MOD-12345',
    propertyName: 'Modern Apartment with City View',
    propertyId: 'TOKEN-67890',
    modificationType: 'Structural Change',
    submissionDate: 'May 17, 2025',
    estimatedCompletionTime: '7-10 business days'
  };
  
  return (
    <SuccessContainer>
      <SuccessIcon>
        <i className="fas fa-check"></i>
      </SuccessIcon>
      
      <Title>Modification Request Submitted!</Title>
      <Subtitle>
        Thank you for submitting your property modification request. Our team will review your application and get back to you soon.
      </Subtitle>
      
      <Card>
        <h2>Modification Request Details</h2>
        
        <ModificationDetails>
          <DetailRow>
            <DetailLabel>Request ID:</DetailLabel>
            <DetailValue>{modificationDetails.requestId}</DetailValue>
          </DetailRow>
          <DetailRow>
            <DetailLabel>Property:</DetailLabel>
            <DetailValue>{modificationDetails.propertyName}</DetailValue>
          </DetailRow>
          <DetailRow>
            <DetailLabel>Property ID:</DetailLabel>
            <DetailValue>{modificationDetails.propertyId}</DetailValue>
          </DetailRow>
          <DetailRow>
            <DetailLabel>Modification Type:</DetailLabel>
            <DetailValue>{modificationDetails.modificationType}</DetailValue>
          </DetailRow>
          <DetailRow>
            <DetailLabel>Submission Date:</DetailLabel>
            <DetailValue>{modificationDetails.submissionDate}</DetailValue>
          </DetailRow>
          <DetailRow>
            <DetailLabel>Estimated Completion:</DetailLabel>
            <DetailValue>{modificationDetails.estimatedCompletionTime}</DetailValue>
          </DetailRow>
        </ModificationDetails>
        
        <h3>What Happens Next?</h3>
        
        <StepsList>
          <Step>
            <StepNumber>1</StepNumber>
            <StepContent>
              <StepTitle>Request Review</StepTitle>
              <StepDescription>
                Our team will review your modification request to ensure it complies with our platform's guidelines and legal requirements. This typically takes 2-3 business days.
              </StepDescription>
            </StepContent>
          </Step>
          
          <Step>
            <StepNumber>2</StepNumber>
            <StepContent>
              <StepTitle>Physical Inspection</StepTitle>
              <StepDescription>
                If your request is approved for the next stage, we'll schedule a physical inspection of your property to assess the proposed modifications. Our inspector will contact you to arrange a convenient time.
              </StepDescription>
            </StepContent>
          </Step>
          
          <Step>
            <StepNumber>3</StepNumber>
            <StepContent>
              <StepTitle>Final Approval</StepTitle>
              <StepDescription>
                After successful inspection, your modification request will receive final approval. This typically takes 1-2 business days after inspection.
              </StepDescription>
            </StepContent>
          </Step>
          
          <Step>
            <StepNumber>4</StepNumber>
            <StepContent>
              <StepTitle>NFT Update</StepTitle>
              <StepDescription>
                Once approved, your property NFT metadata will be updated to reflect the modifications. You'll receive a notification when this process is complete.
              </StepDescription>
            </StepContent>
          </Step>
        </StepsList>
        
        <p>
          You can check the status of your modification request at any time in your dashboard. We'll also send you email updates as your application progresses through each stage.
        </p>
      </Card>
      
      <ButtonGroup>
        <PrimaryButton to="/my-properties">Go to My Properties</PrimaryButton>
        <SecondaryButton to="/property-management">Property Management</SecondaryButton>
      </ButtonGroup>
      
      <ContactInfo>
        Have questions? Contact our support team at <ContactLink href="mailto:support@propertymainnet.com">support@propertymainnet.com</ContactLink>
      </ContactInfo>
    </SuccessContainer>
  );
};

export default ModificationSuccess;