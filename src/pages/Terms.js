import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const TermsContainer = styled.div`
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

const Terms = () => {
  return (
    <TermsContainer>
      <PageHeader>
        <Title>Terms of Service</Title>
        <UpdatedDate>Last Updated: May 15, 2025</UpdatedDate>
      </PageHeader>
      
      <Section>
        <Paragraph>
          Welcome to Property Mainnet. These Terms of Service ("Terms") govern your access to and use of the Property Mainnet website, mobile application, and services (collectively, the "Service"). Please read these Terms carefully before using our Service.
        </Paragraph>
        <Paragraph>
          By accessing or using our Service, you agree to be bound by these Terms. If you disagree with any part of the Terms, you may not access the Service.
        </Paragraph>
      </Section>
      
      <Section>
        <SectionTitle>1. Definitions</SectionTitle>
        <List>
          <ListItem>
            <strong>"Property Mainnet"</strong> (also referred to as "we," "us," or "our") refers to the company operating the Service.
          </ListItem>
          <ListItem>
            <strong>"User"</strong> (also referred to as "you" or "your") refers to any individual or entity that accesses or uses the Service.
          </ListItem>
          <ListItem>
            <strong>"Content"</strong> refers to all information, text, graphics, photos, videos, property listings, and other materials uploaded, downloaded, or appearing on the Service.
          </ListItem>
          <ListItem>
            <strong>"NFT"</strong> refers to a non-fungible token, which is a unique digital identifier recorded on a blockchain that certifies ownership of a digital or physical asset.
          </ListItem>
          <ListItem>
            <strong>"Property NFT"</strong> refers to an NFT that represents ownership or partial ownership of a real estate property.
          </ListItem>
          <ListItem>
            <strong>"Wallet"</strong> refers to a digital wallet that allows you to store, send, and receive cryptocurrencies and NFTs.
          </ListItem>
        </List>
      </Section>
      
      <Section>
        <SectionTitle>2. Eligibility</SectionTitle>
        <Paragraph>
          To use the Service, you must be at least 18 years old and have the legal capacity to enter into binding contracts. By using the Service, you represent and warrant that you meet these requirements.
        </Paragraph>
        <Paragraph>
          If you are using the Service on behalf of a company, organization, or other entity, you represent and warrant that you have the authority to bind that entity to these Terms, in which case "you" will refer to that entity.
        </Paragraph>
      </Section>
      
      <Section>
        <SectionTitle>3. Account Registration</SectionTitle>
        <Paragraph>
          To access certain features of the Service, you may need to create an account. When you create an account, you must provide accurate and complete information. You are solely responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
        </Paragraph>
        <Paragraph>
          You agree to immediately notify Property Mainnet of any unauthorized use of your account or any other breach of security. Property Mainnet will not be liable for any loss or damage arising from your failure to comply with this section.
        </Paragraph>
      </Section>
      
      <Section>
        <SectionTitle>4. Wallet Connection</SectionTitle>
        <Paragraph>
          To buy, sell, or trade Property NFTs on our platform, you must connect a compatible digital wallet. You are solely responsible for the security of your wallet and any associated private keys or seed phrases.
        </Paragraph>
        <Paragraph>
          Property Mainnet does not store your private keys or seed phrases and cannot recover them if lost. You acknowledge that loss of your private keys or seed phrases may result in permanent loss of access to your Property NFTs and other digital assets.
        </Paragraph>
      </Section>
      
      <Section>
        <SectionTitle>5. Property Verification</SectionTitle>
        <Paragraph>
          Property Mainnet requires verification of all real estate properties before they can be tokenized as NFTs on our platform. The verification process may include document review, physical inspection, and other due diligence measures.
        </Paragraph>
        <Paragraph>
          By submitting a property for verification, you represent and warrant that:
        </Paragraph>
        <List>
          <ListItem>You are the legal owner of the property or are authorized by the legal owner to tokenize the property.</ListItem>
          <ListItem>The property is free from any undisclosed liens, encumbrances, or legal disputes.</ListItem>
          <ListItem>All information and documentation provided during the verification process is accurate, complete, and not misleading.</ListItem>
          <ListItem>You have complied with all applicable laws and regulations related to the property and its tokenization.</ListItem>
        </List>
        <Paragraph>
          Property Mainnet reserves the right to reject any property for verification at its sole discretion.
        </Paragraph>
      </Section>
      
      <Section>
        <SectionTitle>6. Property NFTs</SectionTitle>
        
        <SubsectionTitle>6.1 Ownership</SubsectionTitle>
        <Paragraph>
          Ownership of a Property NFT on our platform represents ownership or partial ownership of the corresponding real estate property, as specified in the NFT's metadata and associated legal documentation.
        </Paragraph>
        <Paragraph>
          The transfer of a Property NFT constitutes a transfer of the ownership rights to the corresponding real estate property or portion thereof, subject to applicable laws and regulations.
        </Paragraph>
        
        <SubsectionTitle>6.2 Fractional Ownership</SubsectionTitle>
        <Paragraph>
          Property Mainnet supports fractional ownership of real estate properties through the issuance of multiple NFTs representing portions of a single property. Fractional owners have rights proportional to their ownership percentage, as specified in the NFT's metadata and associated legal documentation.
        </Paragraph>
        
        <SubsectionTitle>6.3 Property Management</SubsectionTitle>
        <Paragraph>
          Property management responsibilities and arrangements may vary depending on the specific property and ownership structure. These details will be specified in the property listing and associated legal documentation.
        </Paragraph>
      </Section>
      
      <Section>
        <SectionTitle>7. Buying and Selling</SectionTitle>
        
        <SubsectionTitle>7.1 Marketplace</SubsectionTitle>
        <Paragraph>
          Property Mainnet provides a marketplace for buying, selling, and trading Property NFTs. All transactions on our marketplace are facilitated through smart contracts on the blockchain.
        </Paragraph>
        
        <SubsectionTitle>7.2 Fees</SubsectionTitle>
        <Paragraph>
          Property Mainnet charges fees for various services, including but not limited to property verification, listing, and transactions. Current fee structures are available on our website and may be updated from time to time.
        </Paragraph>
        <Paragraph>
          In addition to our fees, you may also be responsible for gas fees and other blockchain-related costs when conducting transactions on our platform.
        </Paragraph>
        
        <SubsectionTitle>7.3 Taxes</SubsectionTitle>
        <Paragraph>
          You are solely responsible for determining and paying any taxes that may apply to your transactions on our platform. Property Mainnet does not provide tax advice and recommends consulting with a qualified tax professional.
        </Paragraph>
      </Section>
      
      <Section>
        <SectionTitle>8. Auctions</SectionTitle>
        <Paragraph>
          Property Mainnet offers auction functionality for selling Property NFTs. By participating in an auction, you agree to be bound by the specific terms and conditions of that auction, in addition to these Terms.
        </Paragraph>
        <Paragraph>
          When you place a bid in an auction, you are making a binding offer to purchase the Property NFT at the bid price. If your bid is the winning bid at the end of the auction, you are obligated to complete the purchase.
        </Paragraph>
      </Section>
      
      <Section>
        <SectionTitle>9. Private Auctions</SectionTitle>
        <Paragraph>
          Property Mainnet allows users to create private auctions that are only accessible to invited participants. The creator of a private auction is responsible for managing the invitation list and ensuring that all participants meet the eligibility requirements for using our Service.
        </Paragraph>
        <Paragraph>
          Private auctions are subject to the same terms and conditions as public auctions, except for the restricted access.
        </Paragraph>
      </Section>
      
      <Section>
        <SectionTitle>10. Property Modifications</SectionTitle>
        <Paragraph>
          If you own a Property NFT and wish to make significant modifications to the physical property, you must submit a modification request through our platform. This ensures that the Property NFT accurately represents the current state of the physical property.
        </Paragraph>
        <Paragraph>
          Property Mainnet reserves the right to require a physical inspection after modifications are completed to verify the accuracy of the updated property information.
        </Paragraph>
      </Section>
      
      <Section>
        <SectionTitle>11. Prohibited Activities</SectionTitle>
        <Paragraph>
          You agree not to engage in any of the following prohibited activities:
        </Paragraph>
        <List>
          <ListItem>Using the Service for any illegal purpose or in violation of any local, state, national, or international law.</ListItem>
          <ListItem>Violating or attempting to violate the security of the Service.</ListItem>
          <ListItem>Impersonating another person or entity, or falsely stating or otherwise misrepresenting your affiliation with a person or entity.</ListItem>
          <ListItem>Interfering with or disrupting the Service or servers or networks connected to the Service.</ListItem>
          <ListItem>Attempting to manipulate prices, transactions, or auctions on the platform.</ListItem>
          <ListItem>Providing false or misleading information during the property verification process.</ListItem>
          <ListItem>Creating multiple accounts to circumvent restrictions or limitations.</ListItem>
          <ListItem>Using the Service to engage in money laundering, fraud, or other financial crimes.</ListItem>
        </List>
        <Paragraph>
          Property Mainnet reserves the right to terminate your access to the Service for engaging in any prohibited activities.
        </Paragraph>
      </Section>
      
      <Section>
        <SectionTitle>12. Intellectual Property</SectionTitle>
        <Paragraph>
          The Service and its original content, features, and functionality are owned by Property Mainnet and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
        </Paragraph>
        <Paragraph>
          You may not copy, modify, create derivative works of, publicly display, publicly perform, republish, or transmit any of the material on our Service without prior written consent from Property Mainnet.
        </Paragraph>
      </Section>
      
      <Section>
        <SectionTitle>13. User Content</SectionTitle>
        <Paragraph>
          You retain ownership of any content you submit, post, or display on or through the Service ("User Content"). By submitting User Content to the Service, you grant Property Mainnet a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, adapt, publish, translate, distribute, and display such User Content in connection with providing and promoting the Service.
        </Paragraph>
        <Paragraph>
          You represent and warrant that you own or have the necessary rights to the User Content you submit and that the User Content does not infringe upon the rights of any third party.
        </Paragraph>
      </Section>
      
      <Section>
        <SectionTitle>14. Privacy</SectionTitle>
        <Paragraph>
          Your privacy is important to us. Our <StyledLink to="/privacy">Privacy Policy</StyledLink> explains how we collect, use, and protect your personal information. By using our Service, you agree to the collection and use of information in accordance with our Privacy Policy.
        </Paragraph>
      </Section>
      
      <Section>
        <SectionTitle>15. Disclaimers</SectionTitle>
        <Paragraph>
          THE SERVICE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS. PROPERTY MAINNET EXPRESSLY DISCLAIMS ALL WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
        </Paragraph>
        <Paragraph>
          PROPERTY MAINNET MAKES NO WARRANTY THAT THE SERVICE WILL MEET YOUR REQUIREMENTS, BE AVAILABLE ON AN UNINTERRUPTED, SECURE, OR ERROR-FREE BASIS, OR THAT DEFECTS WILL BE CORRECTED.
        </Paragraph>
        <Paragraph>
          PROPERTY MAINNET DOES NOT GUARANTEE THE ACCURACY, COMPLETENESS, OR RELIABILITY OF ANY PROPERTY INFORMATION OR OTHER CONTENT ON THE SERVICE, AND YOU RELY ON SUCH INFORMATION AT YOUR OWN RISK.
        </Paragraph>
        <Paragraph>
          PROPERTY MAINNET IS NOT A REAL ESTATE BROKER, FINANCIAL ADVISOR, OR LEGAL ADVISOR. THE INFORMATION PROVIDED ON THE SERVICE IS FOR GENERAL INFORMATIONAL PURPOSES ONLY AND SHOULD NOT BE CONSTRUED AS PROFESSIONAL ADVICE.
        </Paragraph>
      </Section>
      
      <Section>
        <SectionTitle>16. Limitation of Liability</SectionTitle>
        <Paragraph>
          IN NO EVENT SHALL PROPERTY MAINNET, ITS DIRECTORS, EMPLOYEES, PARTNERS, AGENTS, SUPPLIERS, OR AFFILIATES BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION, LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM:
        </Paragraph>
        <List>
          <ListItem>YOUR ACCESS TO OR USE OF OR INABILITY TO ACCESS OR USE THE SERVICE;</ListItem>
          <ListItem>ANY CONDUCT OR CONTENT OF ANY THIRD PARTY ON THE SERVICE;</ListItem>
          <ListItem>ANY CONTENT OBTAINED FROM THE SERVICE; OR</ListItem>
          <ListItem>UNAUTHORIZED ACCESS, USE, OR ALTERATION OF YOUR TRANSMISSIONS OR CONTENT;</ListItem>
        </List>
        <Paragraph>
          WHETHER BASED ON WARRANTY, CONTRACT, TORT (INCLUDING NEGLIGENCE), OR ANY OTHER LEGAL THEORY, WHETHER OR NOT WE HAVE BEEN INFORMED OF THE POSSIBILITY OF SUCH DAMAGE.
        </Paragraph>
        <Paragraph>
          IN JURISDICTIONS WHERE THE EXCLUSION OR LIMITATION OF LIABILITY FOR CONSEQUENTIAL OR INCIDENTAL DAMAGES IS NOT ALLOWED, OUR LIABILITY SHALL BE LIMITED TO THE MAXIMUM EXTENT PERMITTED BY LAW.
        </Paragraph>
      </Section>
      
      <Section>
        <SectionTitle>17. Indemnification</SectionTitle>
        <Paragraph>
          You agree to defend, indemnify, and hold harmless Property Mainnet, its directors, employees, partners, agents, suppliers, and affiliates from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees (including reasonable attorneys' fees) arising out of or relating to your violation of these Terms or your use of the Service.
        </Paragraph>
      </Section>
      
      <Section>
        <SectionTitle>18. Governing Law</SectionTitle>
        <Paragraph>
          These Terms shall be governed by and construed in accordance with the laws of the State of California, without regard to its conflict of law provisions.
        </Paragraph>
        <Paragraph>
          Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect.
        </Paragraph>
      </Section>
      
      <Section>
        <SectionTitle>19. Dispute Resolution</SectionTitle>
        <Paragraph>
          Any dispute arising from or relating to these Terms or the Service shall be resolved through binding arbitration in accordance with the American Arbitration Association's rules. The arbitration shall be conducted in San Francisco, California.
        </Paragraph>
        <Paragraph>
          Notwithstanding the foregoing, either party may seek injunctive or other equitable relief in any court of competent jurisdiction to prevent the actual or threatened infringement, misappropriation, or violation of a party's copyrights, trademarks, trade secrets, patents, or other intellectual property rights.
        </Paragraph>
      </Section>
      
      <Section>
        <SectionTitle>20. Changes to Terms</SectionTitle>
        <Paragraph>
          Property Mainnet reserves the right to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
        </Paragraph>
        <Paragraph>
          By continuing to access or use our Service after any revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, you are no longer authorized to use the Service.
        </Paragraph>
      </Section>
      
      <Section>
        <SectionTitle>21. Termination</SectionTitle>
        <Paragraph>
          Property Mainnet may terminate or suspend your account and access to the Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach these Terms.
        </Paragraph>
        <Paragraph>
          Upon termination, your right to use the Service will immediately cease. If you wish to terminate your account, you may simply discontinue using the Service or contact us to request account deletion.
        </Paragraph>
      </Section>
      
      <ContactSection>
        <ContactTitle>Contact Us</ContactTitle>
        <Paragraph>
          If you have any questions about these Terms, please contact us at:
        </Paragraph>
        <Paragraph>
          Email: <ExternalLink href="mailto:legal@propertymainnet.com">legal@propertymainnet.com</ExternalLink>
        </Paragraph>
        <Paragraph>
          Address: 123 Blockchain Avenue, Suite 400, San Francisco, CA 94107, USA
        </Paragraph>
      </ContactSection>
    </TermsContainer>
  );
};

export default Terms;