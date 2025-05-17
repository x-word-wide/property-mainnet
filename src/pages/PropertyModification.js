import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useWeb3 } from '../context/Web3Context';

const ModificationContainer = styled.div`
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

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: 2rem;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const MainContent = styled.div``;

const Sidebar = styled.div`
  @media (max-width: 992px) {
    order: -1;
  }
`;

const FormContainer = styled.div`
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  padding: 2rem;
  margin-bottom: 2rem;
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

const PropertySelector = styled.div`
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
  margin-bottom: 2rem;
`;

const PropertySelectorTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: #333;
`;

const PropertyList = styled.div`
  max-height: 400px;
  overflow-y: auto;
`;

const PropertyCard = styled.div`
  border: 1px solid ${props => props.selected ? '#4361ee' : '#ddd'};
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: ${props => props.selected ? '#f0f4ff' : 'white'};
  
  &:hover {
    border-color: #4361ee;
    background-color: #f8f9fa;
  }
`;

const PropertyImage = styled.img`
  width: 100%;
  height: 120px;
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 0.5rem;
`;

const PropertyName = styled.div`
  font-weight: 500;
  margin-bottom: 0.3rem;
`;

const PropertyAddress = styled.div`
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 0.5rem;
`;

const PropertyTokenId = styled.div`
  font-size: 0.8rem;
  color: #4361ee;
  font-family: monospace;
`;

const HelpCard = styled.div`
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
`;

const HelpTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: #333;
`;

const HelpList = styled.ul`
  padding-left: 1.5rem;
  margin-bottom: 1.5rem;
`;

const HelpItem = styled.li`
  margin-bottom: 0.5rem;
  color: #666;
`;

const HelpContact = styled.div`
  background-color: #f8f9fa;
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
`;

const HelpContactText = styled.p`
  margin-bottom: 0.5rem;
  color: #666;
`;

const HelpContactEmail = styled.a`
  color: #4361ee;
  font-weight: 500;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

const ModificationTypeCard = styled.div`
  border: 1px solid ${props => props.selected ? '#4361ee' : '#ddd'};
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: ${props => props.selected ? '#f0f4ff' : 'white'};
  
  &:hover {
    border-color: #4361ee;
  }
`;

const ModificationTypeTitle = styled.h4`
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  color: #333;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ModificationTypeIcon = styled.span`
  color: #4361ee;
`;

const ModificationTypeDescription = styled.p`
  font-size: 0.9rem;
  color: #666;
`;

const PropertyModification = () => {
  const { currentUser, userProfile } = useAuth();
  const { nftContract } = useWeb3();
  const navigate = useNavigate();
  
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [modificationType, setModificationType] = useState('');
  const [formData, setFormData] = useState({
    modificationDetails: '',
    estimatedCost: '',
    estimatedTimeframe: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    agreeTerms: false,
    agreeInspection: false
  });
  
  const [uploadedFiles, setUploadedFiles] = useState({
    modificationPlans: [],
    permitDocuments: [],
    additionalDocuments: []
  });
  
  // Mock properties data (in a real app, this would come from your blockchain/backend)
  const [userProperties, setUserProperties] = useState([
    {
      id: 1,
      tokenId: 123,
      name: "Luxury Apartment",
      address: "123 Main St, New York, NY 10001",
      image: "https://source.unsplash.com/random/400x300/?apartment&id=1"
    },
    {
      id: 2,
      tokenId: 456,
      name: "Beach House",
      address: "456 Ocean Dr, Miami, FL 33139",
      image: "https://source.unsplash.com/random/400x300/?beach-house&id=2"
    },
    {
      id: 3,
      tokenId: 789,
      name: "Mountain Cabin",
      address: "789 Pine Rd, Aspen, CO 81611",
      image: "https://source.unsplash.com/random/400x300/?cabin&id=3"
    }
  ]);
  
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
    navigate('/modification-success');
  };
  
  const isFormValid = () => {
    // Basic validation
    return (
      selectedProperty &&
      modificationType &&
      formData.modificationDetails &&
      formData.estimatedCost &&
      formData.estimatedTimeframe &&
      formData.contactName &&
      formData.contactEmail &&
      formData.contactPhone &&
      uploadedFiles.modificationPlans.length > 0 &&
      formData.agreeTerms &&
      formData.agreeInspection
    );
  };
  
  return (
    <ModificationContainer>
      <PageHeader>
        <Title>Property Modification Request</Title>
        <Subtitle>
          Submit a request to modify your tokenized property. All modifications require approval to ensure the NFT accurately represents the physical property.
        </Subtitle>
      </PageHeader>
      
      <ContentGrid>
        <MainContent>
          <InfoCard>
            <InfoTitle>Why Submit a Modification Request?</InfoTitle>
            <InfoText>
              Any significant changes to your property must be reflected in your property NFT to maintain its accuracy and value. 
              Our verification team will review your modification plans, conduct a physical inspection after completion, 
              and update your NFT metadata to reflect the changes. This ensures transparency and trust in the marketplace.
            </InfoText>
          </InfoCard>
          
          <FormContainer>
            <FormTitle>Modification Request Form</FormTitle>
            
            <Form onSubmit={handleSubmit}>
              <FormSection>
                <SectionTitle>Modification Type</SectionTitle>
                
                <ModificationTypeCard 
                  selected={modificationType === 'renovation'} 
                  onClick={() => setModificationType('renovation')}
                >
                  <ModificationTypeTitle>
                    <ModificationTypeIcon>🔨</ModificationTypeIcon>
                    Renovation
                  </ModificationTypeTitle>
                  <ModificationTypeDescription>
                    Interior updates, kitchen/bathroom remodels, flooring changes, painting, etc.
                  </ModificationTypeDescription>
                </ModificationTypeCard>
                
                <ModificationTypeCard 
                  selected={modificationType === 'addition'} 
                  onClick={() => setModificationType('addition')}
                >
                  <ModificationTypeTitle>
                    <ModificationTypeIcon>🏗️</ModificationTypeIcon>
                    Addition
                  </ModificationTypeTitle>
                  <ModificationTypeDescription>
                    Adding new rooms, expanding existing spaces, building new structures.
                  </ModificationTypeDescription>
                </ModificationTypeCard>
                
                <ModificationTypeCard 
                  selected={modificationType === 'structural'} 
                  onClick={() => setModificationType('structural')}
                >
                  <ModificationTypeTitle>
                    <ModificationTypeIcon>🏢</ModificationTypeIcon>
                    Structural Changes
                  </ModificationTypeTitle>
                  <ModificationTypeDescription>
                    Changes to load-bearing walls, foundations, or major structural elements.
                  </ModificationTypeDescription>
                </ModificationTypeCard>
                
                <ModificationTypeCard 
                  selected={modificationType === 'exterior'} 
                  onClick={() => setModificationType('exterior')}
                >
                  <ModificationTypeTitle>
                    <ModificationTypeIcon>🏠</ModificationTypeIcon>
                    Exterior Changes
                  </ModificationTypeTitle>
                  <ModificationTypeDescription>
                    Facade updates, roofing, landscaping, or other exterior modifications.
                  </ModificationTypeDescription>
                </ModificationTypeCard>
                
                <ModificationTypeCard 
                  selected={modificationType === 'other'} 
                  onClick={() => setModificationType('other')}
                >
                  <ModificationTypeTitle>
                    <ModificationTypeIcon>✨</ModificationTypeIcon>
                    Other
                  </ModificationTypeTitle>
                  <ModificationTypeDescription>
                    Any other modifications not covered by the categories above.
                  </ModificationTypeDescription>
                </ModificationTypeCard>
              </FormSection>
              
              <FormSection>
                <SectionTitle>Modification Details</SectionTitle>
                
                <FormGroup>
                  <Label htmlFor="modificationDetails">Detailed Description*</Label>
                  <Textarea 
                    id="modificationDetails" 
                    name="modificationDetails" 
                    value={formData.modificationDetails}
                    onChange={handleChange}
                    placeholder="Provide a detailed description of the modifications you plan to make..."
                    required
                  />
                </FormGroup>
                
                <FormRow>
                  <FormGroup>
                    <Label htmlFor="estimatedCost">Estimated Cost (USD)*</Label>
                    <Input 
                      type="text" 
                      id="estimatedCost" 
                      name="estimatedCost" 
                      value={formData.estimatedCost}
                      onChange={handleChange}
                      placeholder="e.g. $50,000"
                      required
                    />
                  </FormGroup>
                  
                  <FormGroup>
                    <Label htmlFor="estimatedTimeframe">Estimated Timeframe*</Label>
                    <Input 
                      type="text" 
                      id="estimatedTimeframe" 
                      name="estimatedTimeframe" 
                      value={formData.estimatedTimeframe}
                      onChange={handleChange}
                      placeholder="e.g. 3 months"
                      required
                    />
                  </FormGroup>
                </FormRow>
              </FormSection>
              
              <FormSection>
                <SectionTitle>Contact Information</SectionTitle>
                
                <FormRow>
                  <FormGroup>
                    <Label htmlFor="contactName">Contact Name*</Label>
                    <Input 
                      type="text" 
                      id="contactName" 
                      name="contactName" 
                      value={formData.contactName}
                      onChange={handleChange}
                      required
                    />
                  </FormGroup>
                  
                  <FormGroup>
                    <Label htmlFor="contactEmail">Contact Email*</Label>
                    <Input 
                      type="email" 
                      id="contactEmail" 
                      name="contactEmail" 
                      value={formData.contactEmail}
                      onChange={handleChange}
                      required
                    />
                  </FormGroup>
                </FormRow>
                
                <FormGroup>
                  <Label htmlFor="contactPhone">Contact Phone*</Label>
                  <Input 
                    type="tel" 
                    id="contactPhone" 
                    name="contactPhone" 
                    value={formData.contactPhone}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
              </FormSection>
              
              <FormSection>
                <SectionTitle>Required Documentation</SectionTitle>
                
                <FileUploadContainer>
                  <FileUploadLabel>Modification Plans/Drawings*</FileUploadLabel>
                  <FileUploadDescription>
                    Upload architectural plans, drawings, or detailed sketches of the proposed modifications. Accepted formats: PDF, JPG, PNG (Max 10MB)
                  </FileUploadDescription>
                  
                  <FileUploadInput>
                    <input 
                      type="file" 
                      id="modificationPlans" 
                      accept=".pdf,.jpg,.jpeg,.png" 
                      onChange={(e) => handleFileUpload(e, 'modificationPlans')}
                    />
                    <UploadIcon>📐</UploadIcon>
                    <UploadText>Drag and drop your files here, or</UploadText>
                    <UploadButton>Browse Files</UploadButton>
                  </FileUploadInput>
                  
                  {uploadedFiles.modificationPlans.length > 0 && (
                    <UploadedFilesList>
                      {uploadedFiles.modificationPlans.map((file, index) => (
                        <UploadedFile key={index}>
                          <FileName>
                            <FileIcon>📐</FileIcon>
                            <FileNameText>{file.name}</FileNameText>
                          </FileName>
                          <RemoveFileButton onClick={() => removeFile('modificationPlans', index)}>
                            ✕
                          </RemoveFileButton>
                        </UploadedFile>
                      ))}
                    </UploadedFilesList>
                  )}
                </FileUploadContainer>
                
                <FileUploadContainer>
                  <FileUploadLabel>Permits/Approvals (if available)</FileUploadLabel>
                  <FileUploadDescription>
                    Upload any permits, approvals, or other documentation from local authorities. Accepted formats: PDF, JPG, PNG (Max 10MB)
                  </FileUploadDescription>
                  
                  <FileUploadInput>
                    <input 
                      type="file" 
                      id="permitDocuments" 
                      accept=".pdf,.jpg,.jpeg,.png" 
                      onChange={(e) => handleFileUpload(e, 'permitDocuments')}
                    />
                    <UploadIcon>📄</UploadIcon>
                    <UploadText>Drag and drop your files here, or</UploadText>
                    <UploadButton>Browse Files</UploadButton>
                  </FileUploadInput>
                  
                  {uploadedFiles.permitDocuments.length > 0 && (
                    <UploadedFilesList>
                      {uploadedFiles.permitDocuments.map((file, index) => (
                        <UploadedFile key={index}>
                          <FileName>
                            <FileIcon>📄</FileIcon>
                            <FileNameText>{file.name}</FileNameText>
                          </FileName>
                          <RemoveFileButton onClick={() => removeFile('permitDocuments', index)}>
                            ✕
                          </RemoveFileButton>
                        </UploadedFile>
                      ))}
                    </UploadedFilesList>
                  )}
                </FileUploadContainer>
                
                <FileUploadContainer>
                  <FileUploadLabel>Additional Documents</FileUploadLabel>
                  <FileUploadDescription>
                    Upload any additional documents that may be relevant to your modification request. Accepted formats: PDF, JPG, PNG (Max 10MB)
                  </FileUploadDescription>
                  
                  <FileUploadInput>
                    <input 
                      type="file" 
                      id="additionalDocuments" 
                      accept=".pdf,.jpg,.jpeg,.png" 
                      multiple
                      onChange={(e) => handleFileUpload(e, 'additionalDocuments')}
                    />
                    <UploadIcon>📑</UploadIcon>
                    <UploadText>Drag and drop your files here, or</UploadText>
                    <UploadButton>Browse Files</UploadButton>
                  </FileUploadInput>
                  
                  {uploadedFiles.additionalDocuments.length > 0 && (
                    <UploadedFilesList>
                      {uploadedFiles.additionalDocuments.map((file, index) => (
                        <UploadedFile key={index}>
                          <FileName>
                            <FileIcon>📑</FileIcon>
                            <FileNameText>{file.name}</FileNameText>
                          </FileName>
                          <RemoveFileButton onClick={() => removeFile('additionalDocuments', index)}>
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
                      I certify that all information provided is true and accurate. I understand that providing false information may result in rejection of my request and potential legal consequences.
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
                      I agree to allow Property Mainnet to conduct a physical inspection of the property after the modifications are complete. I understand that the modification fee is non-refundable regardless of the outcome.
                    </CheckboxText>
                  </CheckboxLabel>
                </CheckboxGroup>
              </FormSection>
              
              <ButtonGroup>
                <SecondaryButton type="button" onClick={() => navigate(-1)}>
                  Cancel
                </SecondaryButton>
                <PrimaryButton type="submit" disabled={!isFormValid()}>
                  Submit Request
                </PrimaryButton>
              </ButtonGroup>
            </Form>
          </FormContainer>
        </MainContent>
        
        <Sidebar>
          <PropertySelector>
            <PropertySelectorTitle>Select Property</PropertySelectorTitle>
            <PropertyList>
              {userProperties.map(property => (
                <PropertyCard 
                  key={property.id}
                  selected={selectedProperty?.id === property.id}
                  onClick={() => setSelectedProperty(property)}
                >
                  <PropertyImage src={property.image} alt={property.name} />
                  <PropertyName>{property.name}</PropertyName>
                  <PropertyAddress>{property.address}</PropertyAddress>
                  <PropertyTokenId>Token ID: #{property.tokenId}</PropertyTokenId>
                </PropertyCard>
              ))}
            </PropertyList>
          </PropertySelector>
          
          <HelpCard>
            <HelpTitle>Need Help?</HelpTitle>
            <HelpList>
              <HelpItem>All significant property modifications require approval to maintain NFT accuracy.</HelpItem>
              <HelpItem>Modifications will be inspected upon completion to verify they match the submitted plans.</HelpItem>
              <HelpItem>Your NFT metadata will be updated to reflect the approved changes.</HelpItem>
              <HelpItem>The modification fee covers processing, inspection, and NFT updates.</HelpItem>
            </HelpList>
            
            <HelpContact>
              <HelpContactText>Have questions about the process?</HelpContactText>
              <HelpContactEmail href="mailto:support@propertymainnet.com">
                support@propertymainnet.com
              </HelpContactEmail>
            </HelpContact>
          </HelpCard>
        </Sidebar>
      </ContentGrid>
    </ModificationContainer>
  );
};

export default PropertyModification;