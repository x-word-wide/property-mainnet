import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const CookiesContainer = styled.div`
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

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 2rem;
  
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

const Cookies = () => {
  return (
    <CookiesContainer>
      <PageHeader>
        <Title>Cookie Policy</Title>
        <UpdatedDate>Last Updated: May 15, 2025</UpdatedDate>
      </PageHeader>
      
      <Section>
        <Paragraph>
          This Cookie Policy explains how Property Mainnet ("we", "us", or "our") uses cookies and similar technologies to recognize you when you visit our website at <ExternalLink href="https://propertymainnet.com">propertymainnet.com</ExternalLink> ("Website"). It explains what these technologies are and why we use them, as well as your rights to control our use of them.
        </Paragraph>
        <Paragraph>
          This Cookie Policy should be read together with our <StyledLink to="/privacy">Privacy Policy</StyledLink>.
        </Paragraph>
      </Section>
      
      <Section>
        <SectionTitle>1. What Are Cookies?</SectionTitle>
        <Paragraph>
          Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners to make their websites work, or to work more efficiently, as well as to provide reporting information.
        </Paragraph>
        <Paragraph>
          Cookies set by the website owner (in this case, Property Mainnet) are called "first-party cookies". Cookies set by parties other than the website owner are called "third-party cookies". Third-party cookies enable third-party features or functionality to be provided on or through the website (e.g., advertising, interactive content, and analytics). The parties that set these third-party cookies can recognize your computer both when it visits the website in question and also when it visits certain other websites.
        </Paragraph>
      </Section>
      
      <Section>
        <SectionTitle>2. Why Do We Use Cookies?</SectionTitle>
        <Paragraph>
          We use first-party and third-party cookies for several reasons. Some cookies are required for technical reasons in order for our Website to operate, and we refer to these as "essential" or "strictly necessary" cookies. Other cookies also enable us to track and target the interests of our users to enhance the experience on our Website. Third parties serve cookies through our Website for advertising, analytics, and other purposes.
        </Paragraph>
        <Paragraph>
          The specific types of first and third-party cookies served through our Website and the purposes they perform are described below.
        </Paragraph>
      </Section>
      
      <Section>
        <SectionTitle>3. Types of Cookies We Use</SectionTitle>
        
        <SubsectionTitle>3.1 Essential Cookies</SubsectionTitle>
        <Paragraph>
          These cookies are strictly necessary to provide you with services available through our Website and to use some of its features, such as access to secure areas. Because these cookies are strictly necessary to deliver the Website, you cannot refuse them without impacting how our Website functions.
        </Paragraph>
        <Table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Provider</th>
              <th>Purpose</th>
              <th>Expiry</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>session</td>
              <td>propertymainnet.com</td>
              <td>Used to maintain your authenticated session</td>
              <td>Session</td>
            </tr>
            <tr>
              <td>csrf_token</td>
              <td>propertymainnet.com</td>
              <td>Helps protect against Cross-Site Request Forgery attacks</td>
              <td>Session</td>
            </tr>
            <tr>
              <td>auth_token</td>
              <td>propertymainnet.com</td>
              <td>Stores authentication information</td>
              <td>30 days</td>
            </tr>
          </tbody>
        </Table>
        
        <SubsectionTitle>3.2 Performance and Functionality Cookies</SubsectionTitle>
        <Paragraph>
          These cookies are used to enhance the performance and functionality of our Website but are non-essential to their use. However, without these cookies, certain functionality may become unavailable.
        </Paragraph>
        <Table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Provider</th>
              <th>Purpose</th>
              <th>Expiry</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>preferences</td>
              <td>propertymainnet.com</td>
              <td>Stores user preferences (e.g., dark mode, display settings)</td>
              <td>1 year</td>
            </tr>
            <tr>
              <td>language</td>
              <td>propertymainnet.com</td>
              <td>Stores language preferences</td>
              <td>1 year</td>
            </tr>
            <tr>
              <td>recently_viewed</td>
              <td>propertymainnet.com</td>
              <td>Tracks recently viewed properties</td>
              <td>30 days</td>
            </tr>
          </tbody>
        </Table>
        
        <SubsectionTitle>3.3 Analytics and Customization Cookies</SubsectionTitle>
        <Paragraph>
          These cookies collect information that is used either in aggregate form to help us understand how our Website is being used or how effective our marketing campaigns are, or to help us customize our Website for you.
        </Paragraph>
        <Table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Provider</th>
              <th>Purpose</th>
              <th>Expiry</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>_ga</td>
              <td>Google Analytics</td>
              <td>Used to distinguish users</td>
              <td>2 years</td>
            </tr>
            <tr>
              <td>_gid</td>
              <td>Google Analytics</td>
              <td>Used to distinguish users</td>
              <td>24 hours</td>
            </tr>
            <tr>
              <td>_gat</td>
              <td>Google Analytics</td>
              <td>Used to throttle request rate</td>
              <td>1 minute</td>
            </tr>
            <tr>
              <td>amplitude_id</td>
              <td>Amplitude</td>
              <td>Used for user behavior analytics</td>
              <td>2 years</td>
            </tr>
          </tbody>
        </Table>
        
        <SubsectionTitle>3.4 Advertising Cookies</SubsectionTitle>
        <Paragraph>
          These cookies are used to make advertising messages more relevant to you. They perform functions like preventing the same ad from continuously reappearing, ensuring that ads are properly displayed, and in some cases selecting advertisements that are based on your interests.
        </Paragraph>
        <Table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Provider</th>
              <th>Purpose</th>
              <th>Expiry</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>_fbp</td>
              <td>Facebook</td>
              <td>Used by Facebook to deliver advertisements</td>
              <td>3 months</td>
            </tr>
            <tr>
              <td>IDE</td>
              <td>Google DoubleClick</td>
              <td>Used for targeted advertising</td>
              <td>1 year</td>
            </tr>
          </tbody>
        </Table>
        
        <SubsectionTitle>3.5 Social Media Cookies</SubsectionTitle>
        <Paragraph>
          These cookies are used to enable you to share pages and content that you find interesting on our Website through third-party social networking and other websites. These cookies may also be used for advertising purposes.
        </Paragraph>
        <Table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Provider</th>
              <th>Purpose</th>
              <th>Expiry</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>fr</td>
              <td>Facebook</td>
              <td>Used by Facebook for social sharing and advertising</td>
              <td>3 months</td>
            </tr>
            <tr>
              <td>guest_id</td>
              <td>Twitter</td>
              <td>Used by Twitter for social sharing functionality</td>
              <td>2 years</td>
            </tr>
          </tbody>
        </Table>
      </Section>
      
      <Section>
        <SectionTitle>4. How Can You Control Cookies?</SectionTitle>
        
        <SubsectionTitle>4.1 Browser Settings</SubsectionTitle>
        <Paragraph>
          Most web browsers allow you to control cookies through their settings preferences. However, if you limit the ability of websites to set cookies, you may worsen your overall user experience, since it will no longer be personalized to you. It may also stop you from saving customized settings like login information.
        </Paragraph>
        
        <SubsectionTitle>4.2 Cookie Preference Tool</SubsectionTitle>
        <Paragraph>
          We provide a cookie preference tool on our Website that allows you to manage which categories of cookies you accept or reject. Essential cookies cannot be rejected as they are strictly necessary to provide you with services.
        </Paragraph>
        
        <SubsectionTitle>4.3 Do Not Track</SubsectionTitle>
        <Paragraph>
          Some browsers have a "Do Not Track" feature that signals to websites that you visit that you do not want to have your online activity tracked. No standard has been adopted for how "Do Not Track" should work, so our Website currently does not respond to "Do Not Track" signals.
        </Paragraph>
        
        <SubsectionTitle>4.4 Third-Party Opt-Out Tools</SubsectionTitle>
        <Paragraph>
          You can also opt-out of certain third-party cookies directly through the relevant third-party:
        </Paragraph>
        <List>
          <ListItem>Google Analytics: <ExternalLink href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">https://tools.google.com/dlpage/gaoptout</ExternalLink></ListItem>
          <ListItem>Facebook: <ExternalLink href="https://www.facebook.com/settings/?tab=ads" target="_blank" rel="noopener noreferrer">https://www.facebook.com/settings/?tab=ads</ExternalLink></ListItem>
          <ListItem>Google: <ExternalLink href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">https://adssettings.google.com</ExternalLink></ListItem>
        </List>
      </Section>
      
      <Section>
        <SectionTitle>5. Other Tracking Technologies</SectionTitle>
        <Paragraph>
          In addition to cookies, we may use other similar technologies on our Website, such as:
        </Paragraph>
        
        <SubsectionTitle>5.1 Web Beacons</SubsectionTitle>
        <Paragraph>
          Small graphic images (also known as "pixel tags" or "clear GIFs") that may be included on our Website and services that typically work in conjunction with cookies to identify our users and user behavior.
        </Paragraph>
        
        <SubsectionTitle>5.2 Local Storage Objects</SubsectionTitle>
        <Paragraph>
          We may use local storage objects (LSOs) such as HTML5 to store content information and preferences. Various browsers may offer their own management tools for removing HTML5 LSOs.
        </Paragraph>
      </Section>
      
      <Section>
        <SectionTitle>6. Changes to This Cookie Policy</SectionTitle>
        <Paragraph>
          We may update this Cookie Policy from time to time in order to reflect, for example, changes to the cookies we use or for other operational, legal, or regulatory reasons. Please therefore re-visit this Cookie Policy regularly to stay informed about our use of cookies and related technologies.
        </Paragraph>
        <Paragraph>
          The date at the top of this Cookie Policy indicates when it was last updated.
        </Paragraph>
      </Section>
      
      <ContactSection>
        <ContactTitle>Contact Us</ContactTitle>
        <Paragraph>
          If you have any questions about our use of cookies or other technologies, please contact us at:
        </Paragraph>
        <Paragraph>
          Email: <ExternalLink href="mailto:privacy@propertymainnet.com">privacy@propertymainnet.com</ExternalLink>
        </Paragraph>
        <Paragraph>
          Address: 123 Blockchain Avenue, Suite 400, San Francisco, CA 94107, USA
        </Paragraph>
      </ContactSection>
    </CookiesContainer>
  );
};

export default Cookies;