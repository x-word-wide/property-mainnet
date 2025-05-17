import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ethers } from 'ethers';
import { Web3Context } from '../context/Web3Context';

const CreatePropertyContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const Header = styled.div`
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  color: #666;
  font-size: 1.1rem;
`;

const FormContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const FormSection = styled.div`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: #333;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #4361ee;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: #4361ee;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #4361ee;
  }
`;

const FileInput = styled.div`
  border: 2px dashed #ddd;
  padding: 2rem;
  border-radius: 4px;
  text-align: center;
  cursor: pointer;
  transition: border-color 0.3s ease;
  
  &:hover {
    border-color: #4361ee;
  }
  
  input {
    display: none;
  }
`;

const FileInputLabel = styled.label`
  cursor: pointer;
  display: block;
`;

const FilePreview = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1rem;
`;

const ImagePreview = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
`;

const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 4px;
`;

const RemoveButton = styled.button`
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: #ef4444;
  color: white;
  border: none;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 0.8rem;
  
  &:hover {
    background-color: #dc2626;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
`;

const Button = styled.button`
  padding: 0.8rem 1.5rem;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  font-size: 1rem;
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const CancelButton = styled(Button)`
  background-color: transparent;
  border: 1px solid #ddd;
  color: #666;
  
  &:hover:not(:disabled) {
    background-color: #f8f9fa;
  }
`;

const SubmitButton = styled(Button)`
  background-color: #4361ee;
  border: none;
  color: white;
  
  &:hover:not(:disabled) {
    background-color: #3a56d4;
  }
`;

const ErrorMessage = styled.div`
  color: #ef4444;
  margin-top: 0.5rem;
  font-size: 0.9rem;
`;

const SuccessMessage = styled.div`
  background-color: #ecfdf5;
  color: #0d9488;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1.5rem;
`;

const CreateProperty = () => {
  const navigate = useNavigate();
  const { account, nftContract, marketplaceContract } = useContext(Web3Context);
  
  // Form state
  const [formData, setFormData] = useState({
    propertyAddress: '',
    propertyType: 'residential',
    bedrooms: '',
    bathrooms: '',
    squareFootage: '',
    price: '',
    description: '',
  });
  
  const [images, setImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  
  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  // Handle image upload
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    
    if (files.length > 0) {
      const newImages = files.map(file => ({
        file,
        preview: URL.createObjectURL(file)
      }));
      
      setImages([...images, ...newImages]);
    }
  };
  
  // Remove image
  const removeImage = (index) => {
    const newImages = [...images];
    URL.revokeObjectURL(newImages[index].preview);
    newImages.splice(index, 1);
    setImages(newImages);
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (!account || !nftContract || !marketplaceContract) {
        setError("Please connect your wallet first");
        return;
      }
      
      setIsSubmitting(true);
      setError(null);
      
      // Validate form
      if (!formData.propertyAddress || !formData.squareFootage || !formData.price) {
        setError("Please fill in all required fields");
        setIsSubmitting(false);
        return;
      }
      
      if (images.length === 0) {
        setError("Please upload at least one image");
        setIsSubmitting(false);
        return;
      }
      
      // In a real application, you would upload images to IPFS here
      // For this example, we'll create a mock tokenURI
      const tokenURI = "https://example.com/property/metadata.json";
      
      // Mint the NFT
      const mintTx = await nftContract.mintProperty(
        account,
        tokenURI,
        formData.propertyAddress,
        formData.squareFootage,
        formData.bedrooms || 0,
        formData.bathrooms || 0,
        formData.propertyType
      );
      
      // Wait for transaction to be mined
      const mintReceipt = await mintTx.wait();
      
      // Get the token ID from the event
      const event = mintReceipt.events.find(event => event.event === 'PropertyMinted');
      const tokenId = event.args.tokenId.toNumber();
      
      // Approve marketplace to transfer the NFT
      const approveTx = await nftContract.approve(marketplaceContract.address, tokenId);
      await approveTx.wait();
      
      // List the property on the marketplace
      const priceInWei = ethers.utils.parseEther(formData.price);
      const listTx = await marketplaceContract.listProperty(nftContract.address, tokenId, priceInWei);
      await listTx.wait();
      
      setSuccess("Property successfully created and listed on the marketplace!");
      
      // Reset form
      setFormData({
        propertyAddress: '',
        propertyType: 'residential',
        bedrooms: '',
        bathrooms: '',
        squareFootage: '',
        price: '',
        description: '',
      });
      
      // Clear images
      images.forEach(image => URL.revokeObjectURL(image.preview));
      setImages([]);
      
      // Redirect to the property page after a short delay
      setTimeout(() => {
        navigate(`/property/${tokenId}`);
      }, 2000);
    } catch (err) {
      console.error("Error creating property:", err);
      setError("Failed to create property. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <CreatePropertyContainer>
      <Header>
        <Title>List Your Property</Title>
        <Subtitle>Create an NFT for your real estate property and list it on the marketplace</Subtitle>
      </Header>
      
      <FormContainer>
        {success && <SuccessMessage>{success}</SuccessMessage>}
        
        <form onSubmit={handleSubmit}>
          <FormSection>
            <SectionTitle>Property Information</SectionTitle>
            
            <FormGroup>
              <Label htmlFor="propertyAddress">Property Address *</Label>
              <Input
                type="text"
                id="propertyAddress"
                name="propertyAddress"
                value={formData.propertyAddress}
                onChange={handleChange}
                placeholder="123 Main St, Anytown, USA"
                required
              />
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="propertyType">Property Type *</Label>
              <Select
                id="propertyType"
                name="propertyType"
                value={formData.propertyType}
                onChange={handleChange}
                required
              >
                <option value="residential">Residential</option>
                <option value="commercial">Commercial</option>
                <option value="industrial">Industrial</option>
                <option value="land">Land</option>
              </Select>
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="squareFootage">Square Footage *</Label>
              <Input
                type="number"
                id="squareFootage"
                name="squareFootage"
                value={formData.squareFootage}
                onChange={handleChange}
                placeholder="2000"
                min="1"
                required
              />
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="bedrooms">Bedrooms</Label>
              <Input
                type="number"
                id="bedrooms"
                name="bedrooms"
                value={formData.bedrooms}
                onChange={handleChange}
                placeholder="3"
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
                placeholder="2"
                min="0"
                step="0.5"
              />
            </FormGroup>
          </FormSection>
          
          <FormSection>
            <SectionTitle>Listing Details</SectionTitle>
            
            <FormGroup>
              <Label htmlFor="price">Price (ETH) *</Label>
              <Input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="1.5"
                min="0.001"
                step="0.001"
                required
              />
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="description">Description</Label>
              <TextArea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your property in detail..."
              />
            </FormGroup>
          </FormSection>
          
          <FormSection>
            <SectionTitle>Property Images</SectionTitle>
            
            <FormGroup>
              <Label>Upload Images *</Label>
              <FileInput>
                <FileInputLabel htmlFor="images">
                  <div>Drag and drop images here, or click to select files</div>
                  <input
                    type="file"
                    id="images"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                  />
                </FileInputLabel>
              </FileInput>
              
              {images.length > 0 && (
                <FilePreview>
                  {images.map((image, index) => (
                    <ImagePreview key={index}>
                      <PreviewImage src={image.preview} alt={`Preview ${index}`} />
                      <RemoveButton onClick={() => removeImage(index)}>×</RemoveButton>
                    </ImagePreview>
                  ))}
                </FilePreview>
              )}
            </FormGroup>
          </FormSection>
          
          {error && <ErrorMessage>{error}</ErrorMessage>}
          
          <ButtonGroup>
            <CancelButton type="button" onClick={() => navigate(-1)}>
              Cancel
            </CancelButton>
            <SubmitButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Creating...' : 'Create Property NFT'}
            </SubmitButton>
          </ButtonGroup>
        </form>
      </FormContainer>
    </CreatePropertyContainer>
  );
};

export default CreateProperty;