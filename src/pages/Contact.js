import React, { useState } from 'react';
import styled from 'styled-components';

const ContactContainer = styled.div`
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
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const ContactForm = styled.div`
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  padding: 2rem;
  
  @media (max-width: 992px) {
    order: 1;
  }
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
  margin-bottom: 1.5rem;
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
  min-height: 150px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: #4361ee;
  }
`;

const SubmitButton = styled.button`
  background-color: #4361ee;
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #3a56d4;
  }
  
  &:disabled {
    background-color: #a0a0a0;
    cursor: not-allowed;
  }
`;

const ContactInfo = styled.div`
  @media (max-width: 992px) {
    order: 0;
  }
`;

const InfoTitle = styled.h2`
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

const InfoCard = styled.div`
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  padding: 2rem;
  margin-bottom: 2rem;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 1.5rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const InfoIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #f0f4ff;
  color: #4361ee;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  margin-right: 1rem;
  flex-shrink: 0;
`;

const InfoContent = styled.div``;

const InfoLabel = styled.div`
  font-weight: 500;
  margin-bottom: 0.3rem;
  color: #333;
`;

const InfoText = styled.div`
  color: #666;
`;

const InfoLink = styled.a`
  color: #4361ee;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

const MapContainer = styled.div`
  border-radius: 10px;
  overflow: hidden;
  height: 300px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
`;

const Map = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
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

const SuccessMessage = styled.div`
  background-color: #f0fff4;
  border-left: 4px solid #38a169;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1.5rem;
  color: #2f855a;
`;

const ErrorMessage = styled.div`
  background-color: #fff5f5;
  border-left: 4px solid #e53e3e;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1.5rem;
  color: #c53030;
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

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    error: null
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simulate form submission
    setFormStatus({
      submitted: true,
      success: true,
      error: null
    });
    
    // Reset form after successful submission
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
    
    // In a real application, you would send the form data to your backend
    // and handle success/error states accordingly
  };
  
  return (
    <ContactContainer>
      <PageHeader>
        <Title>Contact Us</Title>
        <Subtitle>
          Have questions about Property Mainnet? Our team is here to help. Reach out to us using the form below or through our contact information.
        </Subtitle>
      </PageHeader>
      
      <ContentGrid>
        <ContactForm>
          <FormTitle>Send Us a Message</FormTitle>
          
          {formStatus.success && (
            <SuccessMessage>
              Thank you for your message! We'll get back to you as soon as possible.
            </SuccessMessage>
          )}
          
          {formStatus.error && (
            <ErrorMessage>
              {formStatus.error}
            </ErrorMessage>
          )}
          
          <Form onSubmit={handleSubmit}>
            <FormRow>
              <FormGroup>
                <Label htmlFor="name">Your Name*</Label>
                <Input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="email">Your Email*</Label>
                <Input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
            </FormRow>
            
            <FormGroup>
              <Label htmlFor="phone">Phone Number</Label>
              <Input 
                type="tel" 
                id="phone" 
                name="phone" 
                value={formData.phone}
                onChange={handleChange}
              />
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="subject">Subject*</Label>
              <Select 
                id="subject" 
                name="subject" 
                value={formData.subject}
                onChange={handleChange}
                required
              >
                <option value="">Select a subject</option>
                <option value="general">General Inquiry</option>
                <option value="support">Technical Support</option>
                <option value="verification">Property Verification</option>
                <option value="partnership">Partnership Opportunities</option>
                <option value="feedback">Feedback</option>
                <option value="other">Other</option>
              </Select>
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="message">Your Message*</Label>
              <Textarea 
                id="message" 
                name="message" 
                value={formData.message}
                onChange={handleChange}
                required
              />
            </FormGroup>
            
            <SubmitButton type="submit">
              Send Message
            </SubmitButton>
          </Form>
        </ContactForm>
        
        <ContactInfo>
          <InfoTitle>Contact Information</InfoTitle>
          
          <InfoCard>
            <InfoItem>
              <InfoIcon>
                <i className="fas fa-map-marker-alt"></i>
              </InfoIcon>
              <InfoContent>
                <InfoLabel>Our Office</InfoLabel>
                <InfoText>123 Blockchain Avenue, Suite 400</InfoText>
                <InfoText>San Francisco, CA 94107, USA</InfoText>
              </InfoContent>
            </InfoItem>
            
            <InfoItem>
              <InfoIcon>
                <i className="fas fa-phone-alt"></i>
              </InfoIcon>
              <InfoContent>
                <InfoLabel>Phone</InfoLabel>
                <InfoText>
                  <InfoLink href="tel:+14155552671">+1 (415) 555-2671</InfoLink>
                </InfoText>
              </InfoContent>
            </InfoItem>
            
            <InfoItem>
              <InfoIcon>
                <i className="fas fa-envelope"></i>
              </InfoIcon>
              <InfoContent>
                <InfoLabel>Email</InfoLabel>
                <InfoText>
                  <InfoLink href="mailto:info@propertymainnet.com">info@propertymainnet.com</InfoLink>
                </InfoText>
                <InfoText>
                  <InfoLink href="mailto:support@propertymainnet.com">support@propertymainnet.com</InfoLink>
                </InfoText>
              </InfoContent>
            </InfoItem>
            
            <InfoItem>
              <InfoIcon>
                <i className="fas fa-clock"></i>
              </InfoIcon>
              <InfoContent>
                <InfoLabel>Working Hours</InfoLabel>
                <InfoText>Monday - Friday: 9:00 AM - 6:00 PM PST</InfoText>
                <InfoText>Saturday: 10:00 AM - 2:00 PM PST</InfoText>
                <InfoText>Sunday: Closed</InfoText>
              </InfoContent>
            </InfoItem>
            
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
              <SocialLink href="https://discord.gg/propertymainnet" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-discord"></i>
              </SocialLink>
            </SocialLinks>
          </InfoCard>
          
          <MapContainer>
            <Map 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0968173775364!2d-122.40058638468173!3d37.78353791975724!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085807ded297e89%3A0x9cdf304c4c6c1ba9!2s123%20Main%20St%2C%20San%20Francisco%2C%20CA%2094105!5e0!3m2!1sen!2sus!4v1620930800000!5m2!1sen!2sus" 
              allowFullScreen="" 
              loading="lazy"
              title="Property Mainnet Office Location"
            />
          </MapContainer>
        </ContactInfo>
      </ContentGrid>
      
      <FAQSection>
        <FAQTitle>Frequently Asked Questions</FAQTitle>
        <FAQList>
          <FAQItem>
            <FAQQuestion>How do I verify my property on Property Mainnet?</FAQQuestion>
            <FAQAnswer>
              To verify your property, navigate to the Property Verification page after logging in. You'll need to provide property documentation, photos, and personal identification. Our team will review your submission and may conduct a physical inspection before approving your property for tokenization.
            </FAQAnswer>
          </FAQItem>
          
          <FAQItem>
            <FAQQuestion>What fees are associated with listing a property?</FAQQuestion>
            <FAQAnswer>
              Property Mainnet charges a one-time verification fee and a small percentage of the final sale price. Verification fees vary based on property type and location. There are also gas fees for blockchain transactions. See our pricing page for detailed information.
            </FAQAnswer>
          </FAQItem>
          
          <FAQItem>
            <FAQQuestion>How long does the verification process take?</FAQQuestion>
            <FAQAnswer>
              The verification process typically takes 5-10 business days, depending on property complexity and location. Physical inspections may extend this timeline. You'll receive updates throughout the process via email and your dashboard.
            </FAQAnswer>
          </FAQItem>
          
          <FAQItem>
            <FAQQuestion>Can I sell just a portion of my property?</FAQQuestion>
            <FAQAnswer>
              Yes, Property Mainnet supports fractional ownership. After your property is verified, you can choose to fractionalize it into multiple tokens, allowing you to sell portions while retaining partial ownership.
            </FAQAnswer>
          </FAQItem>
        </FAQList>
      </FAQSection>
    </ContactContainer>
  );
};

export default Contact;