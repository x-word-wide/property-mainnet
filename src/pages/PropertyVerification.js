import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const VerificationContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const PageHeader = styled.div`
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

const ProcessSteps = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 3rem;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    top: 2.5rem;
    left: 10%;
    right: 10%;
    height: 2px;
    background-color: #e0e0e0;
    z-index: 1;
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 2rem;
    
    &:after {
      display: none;
    }
  }
`;

const Step = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 20%;
  position: relative;
  z-index: 2;
  
  @media (max-width: 768px) {
    width: 100%;
    flex-direction: row;
    gap: 1rem;
  }
`;

const StepNumber = styled.div`
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  background-color: ${props => props.active ? '#4361ee' : '#f0f4ff'};
  color: ${props => props.active ? 'white' : '#4361ee'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  transition: all 0.3s ease;
  
  @media (max-width: 768px) {
    width: 3rem;
    height: 3rem;
    font-size: 1.2rem;
    margin-bottom: 0;
  }
`;

const StepContent = styled.div`
  text-align: center;
  
  @media (max-width: 768px) {
    text-align: left;
    flex: 1;
  }
`;

const StepTitle = styled.h3`
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  color: ${props => props.active ? '#4361ee' : '#333'};
`;

const StepDescription = styled.p`
  font-size: 0.9rem;
  color: #666;
`;

const FormContainer = styled.div`
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  padding: 2rem;
  margin-bottom: 3rem;
`;

const FormTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: #333;
  position: relative;
  padding-bottom: 0.5rem;
  
  &:after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 50px;
    height: 3px;
    background-color: #4361ee;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormSection = styled.div`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: #333;
`;

const FormRow = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const FormGroup = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: #333;
`;

const Input = styled.input`
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #4361ee;
  }
`;

const Select = styled.select`
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #4361ee;
  }
`;

const Textarea = styled.textarea`
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: #4361ee;
  }
`;

const FileUploadContainer = styled.div`
  margin-bottom: 1rem;
`;

const FileUploadLabel = styled.label`
  display: block;
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: #333;
`;

const FileUploadDescription = styled.p`
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 0.5rem;
`;

const FileUploadInput = styled.div`
  border: 2px dashed #ddd;
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #4361ee;
    background-color: #f8f9fa;
  }
  
  input {
    display: none;
  }
`;

const UploadIcon = styled.div`
  font-size: 2rem;
  color: #4361ee;
  margin-bottom: 1rem;
`;

const UploadText = styled.div`
  color: #666;
  margin-bottom: 0.5rem;
`;

const UploadButton = styled.button`
  background-color: #f0f4ff;
  color: #4361ee;
  border: 1px solid #4361ee;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  
  &:hover {
    background-color: #e6ecff;
  }
`;

const UploadedFilesList = styled.div`
  margin-top: 1rem;
`;

const UploadedFile = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem;
  background-color: #f8f9fa;
  border-radius: 4px;
  margin-bottom: 0.5rem;
`;

const FileName = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const FileIcon = styled.span`
  color: #4361ee;
`;

const FileNameText = styled.span`
  font-size: 0.9rem;
`;

const RemoveFileButton = styled.button`
  background: none;
  border: none;
  color: #e53e3e;
  cursor: pointer;
  font-size: 1rem;
  
  &:hover {
    color: #c53030;
  }
`;

const CheckboxGroup = styled.div`
  margin-bottom: 1rem;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  cursor: pointer;
`;

const Checkbox = styled.input`
  margin-top: 0.2rem;
`;

const CheckboxText = styled.span`
  font-size: 0.9rem;
  color: #333;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
`;

const Button = styled.button`
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
`;

const PrimaryButton = styled(Button)`
  background-color: #4361ee;
  color: white;
  border: none;
  
  &:hover {
    background-color: #3a56d4;
  }
  
  &:disabled {
    background-color: #a0a0a0;
    cursor: not-allowed;
  }
`;

const SecondaryButton = styled(Button)`
  background-color: white;
  color: #4361ee;
  border: 1px solid #4361ee;
  
  &:hover {
    background-color: #f0f4ff;
  }
`;

const InfoCard = styled.div`
  background-color: #f0f4ff;
  border-left: 4px solid #4361ee;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 2rem;
`;

const InfoTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: #333;
`;

const InfoText = styled.p`
  color: #666;
  line-height: 1.6;
`;

const FeaturesList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const FeatureCard = styled.div`
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const FeatureIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #f0f4ff;
  color: #4361ee;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const FeatureTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: #333;
`;

const FeatureDescription = styled.p`
  color: #666;
  line-height: 1.6;
`;

const PropertyVerification = () => {
  const { currentUser, userProfile } = useAuth();
  const navigate = useNavigate();
  
  const [activeStep, setActiveStep] = useState(1);
  const [formData, setFormData] = useState({
    propertyType: '',
    propertyAddress: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    propertySize: '',
    bedrooms: '',
    bathrooms: '',
    yearBuilt: '',
    ownerName: '',
    ownerEmail: '',
    ownerPhone: '',
    ownerAddress: '',
    description: '',
    agreeTerms: false,
    agreeInspection: false
  });
  
  const [uploadedFiles, setUploadedFiles] = useState({
    propertyDeed: [],
    propertyPhotos: [],
    identityDocument: [],
    proofOfOwnership: []
  });
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  const handleFileUpload = (e, category) => {
    const files = Array.from(e.target.files);
    setUploadedFiles({
      ...uploadedFiles,
      [category]: [...uploadedFiles[category], ...files]
    });
  };
  
  const removeFile = (category, index) => {
    const updatedFiles = [...uploadedFiles[category]];
    updatedFiles.splice(index, 1);
    setUploadedFiles({
      ...uploadedFiles,
      [category]: updatedFiles
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Here you would typically send the form data to your backend
    // For now, we'll just simulate a successful submission
    
    // Navigate to a success page or show a success message
    navigate('/verification-success');
  };
  
  const isFormValid = () => {
    // Basic validation
    return (
      formData.propertyType &&
      formData.propertyAddress &&
      formData.city &&
      formData.state &&
      formData.zipCode &&
      formData.country &&
      formData.ownerName &&
      formData.ownerEmail &&
      formData.ownerPhone &&
      uploadedFiles.propertyDeed.length > 0 &&
      uploadedFiles.propertyPhotos.length > 0 &&
      uploadedFiles.identityDocument.length > 0 &&
      uploadedFiles.proofOfOwnership.length > 0 &&
      formData.agreeTerms &&
      formData.agreeInspection
    );
  };
  
  return (
    <VerificationContainer>
      <PageHeader>
        <Title>Property Verification</Title>
        <Subtitle>
          Verify your property on the blockchain to create a secure, transparent, and immutable record of ownership.
          Our verification process ensures the authenticity of your property before it can be tokenized as an NFT.
        </Subtitle>
      </PageHeader>
      
      <ProcessSteps>
        <Step>
          <StepNumber active={activeStep >= 1}>1</StepNumber>
          <StepContent>
            <StepTitle active={activeStep >= 1}>Submit Application</StepTitle>
            <StepDescription>Complete the verification form with property details and documentation</StepDescription>
          </StepContent>
        </Step>
        
        <Step>
          <StepNumber active={activeStep >= 2}>2</StepNumber>
          <StepContent>
            <StepTitle active={activeStep >= 2}>Document Review</StepTitle>
            <StepDescription>Our team reviews your submitted documents for authenticity</StepDescription>
          </StepContent>
        </Step>
        
        <Step>
          <StepNumber active={activeStep >= 3}>3</StepNumber>
          <StepContent>
            <StepTitle active={activeStep >= 3}>Physical Inspection</StepTitle>
            <StepDescription>A property inspector visits and verifies the physical property</StepDescription>
          </StepContent>
        </Step>
        
        <Step>
          <StepNumber active={activeStep >= 4}>4</StepNumber>
          <StepContent>
            <StepTitle active={activeStep >= 4}>Verification Approval</StepTitle>
            <StepDescription>Final approval and issuance of verification certificate</StepDescription>
          </StepContent>
        </Step>
        
        <Step>
          <StepNumber active={activeStep >= 5}>5</StepNumber>
          <StepContent>
            <StepTitle active={activeStep >= 5}>NFT Creation</StepTitle>
            <StepDescription>Your property is tokenized as an NFT on the blockchain</StepDescription>
          </StepContent>
        </Step>
      </ProcessSteps>
      
      <InfoCard>
        <InfoTitle>Why Verify Your Property?</InfoTitle>
        <InfoText>
          Property verification is a crucial step in the tokenization process. It ensures that the property exists, 
          you are the rightful owner, and all legal requirements are met. Verified properties receive a special badge 
          that increases trust and value in the marketplace. Verification also enables additional features like 
          fractional ownership and participation in auctions.
        </InfoText>
      </InfoCard>
      
      <FeaturesList>
        <FeatureCard>
          <FeatureIcon>🔒</FeatureIcon>
          <FeatureTitle>Enhanced Security</FeatureTitle>
          <FeatureDescription>
            Verification creates an immutable record of your property on the blockchain, 
            providing enhanced security and protection against fraud.
          </FeatureDescription>
        </FeatureCard>
        
        <FeatureCard>
          <FeatureIcon>💰</FeatureIcon>
          <FeatureTitle>Increased Value</FeatureTitle>
          <FeatureDescription>
            Verified properties typically command higher prices and attract more serious buyers 
            due to the added trust and transparency.
          </FeatureDescription>
        </FeatureCard>
        
        <FeatureCard>
          <FeatureIcon>🔄</FeatureIcon>
          <FeatureTitle>Fractional Ownership</FeatureTitle>
          <FeatureDescription>
            Only verified properties can be fractionalized, allowing you to sell portions of your 
            property to multiple investors.
          </FeatureDescription>
        </FeatureCard>
        
        <FeatureCard>
          <FeatureIcon>🏆</FeatureIcon>
          <FeatureTitle>Auction Eligibility</FeatureTitle>
          <FeatureDescription>
            Verification enables your property to be listed in our auction platform, potentially 
            fetching higher prices through competitive bidding.
          </FeatureDescription>
        </FeatureCard>
      </FeaturesList>
      
      <FormContainer>
        <FormTitle>Property Verification Application</FormTitle>
        
        <Form onSubmit={handleSubmit}>
          <FormSection>
            <SectionTitle>Property Information</SectionTitle>
            
            <FormRow>
              <FormGroup>
                <Label htmlFor="propertyType">Property Type*</Label>
                <Select 
                  id="propertyType" 
                  name="propertyType" 
                  value={formData.propertyType}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Property Type</option>
                  <option value="residential">Residential</option>
                  <option value="commercial">Commercial</option>
                  <option value="industrial">Industrial</option>
                  <option value="land">Land</option>
                  <option value="mixed-use">Mixed-Use</option>
                </Select>
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="propertySize">Property Size (sq ft/m²)*</Label>
                <Input 
                  type="text" 
                  id="propertySize" 
                  name="propertySize" 
                  value={formData.propertySize}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
            </FormRow>
            
            <FormRow>
              <FormGroup>
                <Label htmlFor="bedrooms">Bedrooms</Label>
                <Input 
                  type="number" 
                  id="bedrooms" 
                  name="bedrooms" 
                  value={formData.bedrooms}
                  onChange={handleChange}
                  min="0"
                />
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="bathrooms">Bathrooms</Label>
                <Input 
                  type="number" 
                  id="bathrooms" 
                  name="bathrooms" 
                  value={formData.bathrooms}
                  onChange={handleChange}
                  min="0"
                  step="0.5"
                />
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="yearBuilt">Year Built</Label>
                <Input 
                  type="number" 
                  id="yearBuilt" 
                  name="yearBuilt" 
                  value={formData.yearBuilt}
                  onChange={handleChange}
                  min="1800"
                  max={new Date().getFullYear()}
                />
              </FormGroup>
            </FormRow>
            
            <FormGroup>
              <Label htmlFor="propertyAddress">Property Address*</Label>
              <Input 
                type="text" 
                id="propertyAddress" 
                name="propertyAddress" 
                value={formData.propertyAddress}
                onChange={handleChange}
                required
              />
            </FormGroup>
            
            <FormRow>
              <FormGroup>
                <Label htmlFor="city">City*</Label>
                <Input 
                  type="text" 
                  id="city" 
                  name="city" 
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="state">State/Province*</Label>
                <Input 
                  type="text" 
                  id="state" 
                  name="state" 
                  value={formData.state}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
            </FormRow>
            
            <FormRow>
              <FormGroup>
                <Label htmlFor="zipCode">Zip/Postal Code*</Label>
                <Input 
                  type="text" 
                  id="zipCode" 
                  name="zipCode" 
                  value={formData.zipCode}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="country">Country*</Label>
                <Input 
                  type="text" 
                  id="country" 
                  name="country" 
                  value={formData.country}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
            </FormRow>
            
            <FormGroup>
              <Label htmlFor="description">Property Description</Label>
              <Textarea 
                id="description" 
                name="description" 
                value={formData.description}
                onChange={handleChange}
                placeholder="Provide a detailed description of your property..."
              />
            </FormGroup>
          </FormSection>
          
          <FormSection>
            <SectionTitle>Owner Information</SectionTitle>
            
            <FormRow>
              <FormGroup>
                <Label htmlFor="ownerName">Owner Name*</Label>
                <Input 
                  type="text" 
                  id="ownerName" 
                  name="ownerName" 
                  value={formData.ownerName}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="ownerEmail">Owner Email*</Label>
                <Input 
                  type="email" 
                  id="ownerEmail" 
                  name="ownerEmail" 
                  value={formData.ownerEmail}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
            </FormRow>
            
            <FormRow>
              <FormGroup>
                <Label htmlFor="ownerPhone">Owner Phone*</Label>
                <Input 
                  type="tel" 
                  id="ownerPhone" 
                  name="ownerPhone" 
                  value={formData.ownerPhone}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="ownerAddress">Owner Address*</Label>
                <Input 
                  type="text" 
                  id="ownerAddress" 
                  name="ownerAddress" 
                  value={formData.ownerAddress}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
            </FormRow>
          </FormSection>
          
          <FormSection>
            <SectionTitle>Required Documentation</SectionTitle>
            
            <FileUploadContainer>
              <FileUploadLabel>Property Deed/Title*</FileUploadLabel>
              <FileUploadDescription>
                Upload a copy of your property deed or title document. Accepted formats: PDF, JPG, PNG (Max 10MB)
              </FileUploadDescription>
              
              <FileUploadInput>
                <input 
                  type="file" 
                  id="propertyDeed" 
                  accept=".pdf,.jpg,.jpeg,.png" 
                  onChange={(e) => handleFileUpload(e, 'propertyDeed')}
                />
                <UploadIcon>📄</UploadIcon>
                <UploadText>Drag and drop your file here, or</UploadText>
                <UploadButton>Browse Files</UploadButton>
              </FileUploadInput>
              
              {uploadedFiles.propertyDeed.length > 0 && (
                <UploadedFilesList>
                  {uploadedFiles.propertyDeed.map((file, index) => (
                    <UploadedFile key={index}>
                      <FileName>
                        <FileIcon>📄</FileIcon>
                        <FileNameText>{file.name}</FileNameText>
                      </FileName>
                      <RemoveFileButton onClick={() => removeFile('propertyDeed', index)}>
                        ✕
                      </RemoveFileButton>
                    </UploadedFile>
                  ))}
                </UploadedFilesList>
              )}
            </FileUploadContainer>
            
            <FileUploadContainer>
              <FileUploadLabel>Property Photos*</FileUploadLabel>
              <FileUploadDescription>
                Upload at least 5 photos of your property (exterior and interior). Accepted formats: JPG, PNG (Max 10MB each)
              </FileUploadDescription>
              
              <FileUploadInput>
                <input 
                  type="file" 
                  id="propertyPhotos" 
                  accept=".jpg,.jpeg,.png" 
                  multiple
                  onChange={(e) => handleFileUpload(e, 'propertyPhotos')}
                />
                <UploadIcon>🖼️</UploadIcon>
                <UploadText>Drag and drop your files here, or</UploadText>
                <UploadButton>Browse Files</UploadButton>
              </FileUploadInput>
              
              {uploadedFiles.propertyPhotos.length > 0 && (
                <UploadedFilesList>
                  {uploadedFiles.propertyPhotos.map((file, index) => (
                    <UploadedFile key={index}>
                      <FileName>
                        <FileIcon>🖼️</FileIcon>
                        <FileNameText>{file.name}</FileNameText>
                      </FileName>
                      <RemoveFileButton onClick={() => removeFile('propertyPhotos', index)}>
                        ✕
                      </RemoveFileButton>
                    </UploadedFile>
                  ))}
                </UploadedFilesList>
              )}
            </FileUploadContainer>
            
            <FileUploadContainer>
              <FileUploadLabel>Identity Document*</FileUploadLabel>
              <FileUploadDescription>
                Upload a government-issued ID (passport, driver's license). Accepted formats: PDF, JPG, PNG (Max 5MB)
              </FileUploadDescription>
              
              <FileUploadInput>
                <input 
                  type="file" 
                  id="identityDocument" 
                  accept=".pdf,.jpg,.jpeg,.png" 
                  onChange={(e) => handleFileUpload(e, 'identityDocument')}
                />
                <UploadIcon>🪪</UploadIcon>
                <UploadText>Drag and drop your file here, or</UploadText>
                <UploadButton>Browse Files</UploadButton>
              </FileUploadInput>
              
              {uploadedFiles.identityDocument.length > 0 && (
                <UploadedFilesList>
                  {uploadedFiles.identityDocument.map((file, index) => (
                    <UploadedFile key={index}>
                      <FileName>
                        <FileIcon>🪪</FileIcon>
                        <FileNameText>{file.name}</FileNameText>
                      </FileName>
                      <RemoveFileButton onClick={() => removeFile('identityDocument', index)}>
                        ✕
                      </RemoveFileButton>
                    </UploadedFile>
                  ))}
                </UploadedFilesList>
              )}
            </FileUploadContainer>
            
            <FileUploadContainer>
              <FileUploadLabel>Proof of Ownership*</FileUploadLabel>
              <FileUploadDescription>
                Upload additional proof of ownership (e.g., recent property tax bill, utility bill). Accepted formats: PDF, JPG, PNG (Max 5MB)
              </FileUploadDescription>
              
              <FileUploadInput>
                <input 
                  type="file" 
                  id="proofOfOwnership" 
                  accept=".pdf,.jpg,.jpeg,.png" 
                  onChange={(e) => handleFileUpload(e, 'proofOfOwnership')}
                />
                <UploadIcon>📑</UploadIcon>
                <UploadText>Drag and drop your file here, or</UploadText>
                <UploadButton>Browse Files</UploadButton>
              </FileUploadInput>
              
              {uploadedFiles.proofOfOwnership.length > 0 && (
                <UploadedFilesList>
                  {uploadedFiles.proofOfOwnership.map((file, index) => (
                    <UploadedFile key={index}>
                      <FileName>
                        <FileIcon>📑</FileIcon>
                        <FileNameText>{file.name}</FileNameText>
                      </FileName>
                      <RemoveFileButton onClick={() => removeFile('proofOfOwnership', index)}>
                        ✕
                      </RemoveFileButton>
                    </UploadedFile>
                  ))}
                </UploadedFilesList>
              )}
            </FileUploadContainer>
          </FormSection>
          
          <FormSection>
            <SectionTitle>Terms and Conditions</SectionTitle>
            
            <CheckboxGroup>
              <CheckboxLabel>
                <Checkbox 
                  type="checkbox" 
                  name="agreeTerms" 
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  required
                />
                <CheckboxText>
                  I certify that all information provided is true and accurate. I understand that providing false information may result in rejection of my application and potential legal consequences.
                </CheckboxText>
              </CheckboxLabel>
            </CheckboxGroup>
            
            <CheckboxGroup>
              <CheckboxLabel>
                <Checkbox 
                  type="checkbox" 
                  name="agreeInspection" 
                  checked={formData.agreeInspection}
                  onChange={handleChange}
                  required
                />
                <CheckboxText>
                  I agree to allow Property Mainnet to conduct a physical inspection of the property as part of the verification process. I understand that the verification fee is non-refundable regardless of the outcome.
                </CheckboxText>
              </CheckboxLabel>
            </CheckboxGroup>
          </FormSection>
          
          <ButtonGroup>
            <SecondaryButton type="button" onClick={() => navigate(-1)}>
              Cancel
            </SecondaryButton>
            <PrimaryButton type="submit" disabled={!isFormValid()}>
              Submit Application
            </PrimaryButton>
          </ButtonGroup>
        </Form>
      </FormContainer>
    </VerificationContainer>
  );
};

export default PropertyVerification;