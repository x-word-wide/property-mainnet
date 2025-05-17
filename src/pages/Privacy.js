import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const PrivacyContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const PageHeader = styled.div`
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #333;
`;

const UpdatedDate = styled.p`
  color: #666;
  font-style: italic;
  margin-bottom: 2rem;
`;

const Section = styled.section`
  margin-bottom: 2.5rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #333;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #eee;
`;

const SubsectionTitle = styled.h3`
  font-size: 1.2rem;
  margin: 1.5rem 0 1rem;
  color: #333;
`;

const Paragraph = styled.p`
  margin-bottom: 1rem;
  line-height: 1.7;
  color: #555;
`;

const List = styled.ul`
  margin-bottom: 1.5rem;
  padding-left: 2rem;
`;

const ListItem = styled.li`
  margin-bottom: 0.5rem;
  line-height: 1.7;
  color: #555;
`;

const StyledLink = styled(Link)`
  color: #4361ee;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

const ExternalLink = styled.a`
  color: #4361ee;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

const ContactSection = styled.div`
  background-color: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  margin-top: 2rem;
`;

const ContactTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: #333;
`;

const Privacy = () => {
  return (
    <PrivacyContainer>
      <PageHeader>
        <Title>Privacy Policy</Title>
        <UpdatedDate>Last Updated: May 15, 2025</UpdatedDate>
      </PageHeader>
      
      <Section>
        <Paragraph>
          At Property Mainnet, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
        </Paragraph>
        <Paragraph>
          Please read this Privacy Policy carefully. By accessing or using our Service, you acknowledge that you have read, understood, and agree to be bound by all the terms of this Privacy Policy. If you do not agree with our policies and practices, please do not use our Service.
        </Paragraph>
      </Section>
      
      <Section>
        <SectionTitle>1. Information We Collect</SectionTitle>
        
        <SubsectionTitle>1.1 Personal Information</SubsectionTitle>
        <Paragraph>
          We may collect personal information that you voluntarily provide to us when you register for an account, express interest in obtaining information about us or our products and services, participate in activities on the Service, or otherwise contact us. The personal information we collect may include:
        </Paragraph>
        <List>
          <ListItem>Name, email address, and contact information</ListItem>
          <ListItem>Billing and payment information</ListItem>
          <ListItem>Government-issued identification for account verification</ListItem>
          <ListItem>Blockchain wallet addresses</ListItem>
          <ListItem>Property ownership information and documentation</ListItem>
          <ListItem>Profile information, such as your username, password, and preferences</ListItem>
        </List>
        
        <SubsectionTitle>1.2 Automatically Collected Information</SubsectionTitle>
        <Paragraph>
          When you access or use our Service, we may automatically collect certain information about your device and usage patterns, including:
        </Paragraph>
        <List>
          <ListItem>Device information (such as your IP address, browser type, operating system)</ListItem>
          <ListItem>Usage data (such as pages visited, time spent on pages, links clicked)</ListItem>
          <ListItem>Location information (if you grant permission)</ListItem>
          <ListItem>Cookies and similar tracking technologies</ListItem>
        </List>
        
        <SubsectionTitle>1.3 Blockchain Information</SubsectionTitle>
        <Paragraph>
          Due to the nature of blockchain technology, transactions on the blockchain are public and contain certain information that may be viewed by anyone. This information includes wallet addresses and transaction details, but does not directly identify you unless you have publicly associated your identity with your wallet address.
        </Paragraph>
      </Section>
      
      <Section>
        <SectionTitle>2. How We Use Your Information</SectionTitle>
        <Paragraph>
          We may use the information we collect for various purposes, including:
        </Paragraph>
        <List>
          <ListItem>To provide, maintain, and improve our Service</ListItem>
          <ListItem>To process transactions and manage your account</ListItem>
          <ListItem>To verify your identity and prevent fraud</ListItem>
          <ListItem>To verify property ownership and documentation</ListItem>
          <ListItem>To communicate with you about updates, security alerts, and support</ListItem>
          <ListItem>To personalize your experience and deliver content relevant to your interests</ListItem>
          <ListItem>To monitor and analyze usage patterns and trends</ListItem>
          <ListItem>To comply with legal obligations</ListItem>
          <ListItem>For any other purpose with your consent</ListItem>
        </List>
      </Section>
      
      <Section>
        <SectionTitle>3. How We Share Your Information</SectionTitle>
        <Paragraph>
          We may share your information in the following situations:
        </Paragraph>
        
        <SubsectionTitle>3.1 Third-Party Service Providers</SubsectionTitle>
        <Paragraph>
          We may share your information with third-party vendors, service providers, contractors, or agents who perform services for us or on our behalf and require access to such information to do that work. These may include payment processors, property verification services, data analytics providers, and customer service providers.
        </Paragraph>
        
        <SubsectionTitle>3.2 Business Transfers</SubsectionTitle>
        <Paragraph>
          If we are involved in a merger, acquisition, financing, or sale of all or a portion of our assets, your information may be transferred as part of that transaction. We will notify you via email and/or a prominent notice on our Service of any change in ownership or uses of your personal information.
        </Paragraph>
        
        <SubsectionTitle>3.3 Legal Requirements</SubsectionTitle>
        <Paragraph>
          We may disclose your information where required to do so by law or in response to valid requests by public authorities (e.g., a court or a government agency).
        </Paragraph>
        
        <SubsectionTitle>3.4 With Your Consent</SubsectionTitle>
        <Paragraph>
          We may disclose your personal information for any other purpose with your consent.
        </Paragraph>
        
        <SubsectionTitle>3.5 Blockchain Information</SubsectionTitle>
        <Paragraph>
          Information stored on the blockchain, including wallet addresses and transaction details, is publicly accessible due to the nature of blockchain technology. This information will be available to anyone who participates in the blockchain or uses blockchain explorers.
        </Paragraph>
      </Section>
      
      <Section>
        <SectionTitle>4. Cookies and Tracking Technologies</SectionTitle>
        <Paragraph>
          We use cookies and similar tracking technologies to track activity on our Service and store certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service.
        </Paragraph>
        <Paragraph>
          For more information about the cookies we use, please see our <StyledLink to="/cookies">Cookie Policy</StyledLink>.
        </Paragraph>
      </Section>
      
      <Section>
        <SectionTitle>5. Data Security</SectionTitle>
        <Paragraph>
          We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure.
        </Paragraph>
        <Paragraph>
          We recommend that you take steps to protect your personal information, including using strong passwords, enabling two-factor authentication where available, and being cautious about sharing your wallet information.
        </Paragraph>
      </Section>
      
      <Section>
        <SectionTitle>6. Data Retention</SectionTitle>
        <Paragraph>
          We will retain your personal information only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use your information to the extent necessary to comply with our legal obligations, resolve disputes, and enforce our policies.
        </Paragraph>
        <Paragraph>
          Information stored on the blockchain, including wallet addresses and transaction details, will remain on the blockchain indefinitely due to the immutable nature of blockchain technology.
        </Paragraph>
      </Section>
      
      <Section>
        <SectionTitle>7. Your Privacy Rights</SectionTitle>
        <Paragraph>
          Depending on your location, you may have certain rights regarding your personal information, such as:
        </Paragraph>
        <List>
          <ListItem><strong>Right to Access:</strong> You may request access to your personal information.</ListItem>
          <ListItem><strong>Right to Rectification:</strong> You may request that we correct inaccurate or incomplete information.</ListItem>
          <ListItem><strong>Right to Erasure:</strong> You may request that we delete your personal information, subject to certain exceptions.</ListItem>
          <ListItem><strong>Right to Restrict Processing:</strong> You may request that we restrict the processing of your information.</ListItem>
          <ListItem><strong>Right to Data Portability:</strong> You may request a copy of your personal information in a structured, machine-readable format.</ListItem>
          <ListItem><strong>Right to Object:</strong> You may object to our processing of your personal information.</ListItem>
        </List>
        <Paragraph>
          Please note that these rights may be limited in some circumstances, such as when we are legally required to retain your information. Additionally, due to the nature of blockchain technology, we may not be able to modify or delete information stored on the blockchain.
        </Paragraph>
        <Paragraph>
          To exercise any of these rights, please contact us using the information provided in the "Contact Us" section below.
        </Paragraph>
      </Section>
      
      <Section>
        <SectionTitle>8. Children's Privacy</SectionTitle>
        <Paragraph>
          Our Service is not directed to individuals under the age of 18. We do not knowingly collect personal information from children under 18. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact us. If we become aware that we have collected personal information from children without verification of parental consent, we will take steps to remove that information from our servers.
        </Paragraph>
      </Section>
      
      <Section>
        <SectionTitle>9. International Data Transfers</SectionTitle>
        <Paragraph>
          Your information may be transferred to, and maintained on, computers located outside of your state, province, country, or other governmental jurisdiction where the data protection laws may differ from those in your jurisdiction. If you are located outside the United States and choose to provide information to us, please note that we transfer the information to the United States and process it there.
        </Paragraph>
        <Paragraph>
          Your consent to this Privacy Policy followed by your submission of such information represents your agreement to that transfer.
        </Paragraph>
      </Section>
      
      <Section>
        <SectionTitle>10. Changes to This Privacy Policy</SectionTitle>
        <Paragraph>
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date at the top of this Privacy Policy.
        </Paragraph>
        <Paragraph>
          You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
        </Paragraph>
      </Section>
      
      <ContactSection>
        <ContactTitle>Contact Us</ContactTitle>
        <Paragraph>
          If you have any questions about this Privacy Policy, please contact us at:
        </Paragraph>
        <Paragraph>
          Email: <ExternalLink href="mailto:privacy@propertymainnet.com">privacy@propertymainnet.com</ExternalLink>
        </Paragraph>
        <Paragraph>
          Address: 123 Blockchain Avenue, Suite 400, San Francisco, CA 94107, USA
        </Paragraph>
      </ContactSection>
    </PrivacyContainer>
  );
};

export default Privacy;