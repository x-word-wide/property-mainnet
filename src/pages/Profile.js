import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';
import { useWeb3 } from '../context/Web3Context';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase/config';

const ProfileContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 2rem;
`;

const ProfileGrid = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Sidebar = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  height: fit-content;
`;

const ProfileImageContainer = styled.div`
  position: relative;
  width: 150px;
  height: 150px;
  margin: 0 auto 1.5rem;
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #4361ee;
`;

const UploadButton = styled.label`
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: #4361ee;
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  
  input {
    display: none;
  }
`;

const UserName = styled.h2`
  font-size: 1.5rem;
  text-align: center;
  margin-bottom: 0.5rem;
`;

const UserEmail = styled.p`
  color: #666;
  text-align: center;
  margin-bottom: 1.5rem;
`;

const AccountType = styled.div`
  background-color: #e6f2ff;
  color: #0066cc;
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  font-size: 0.9rem;
  display: inline-block;
  margin-bottom: 1rem;
  text-align: center;
  width: 100%;
`;

const VerificationBadge = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background-color: ${props => props.verified ? '#f0fff4' : '#fff5f5'};
  color: ${props => props.verified ? '#38a169' : '#e53e3e'};
  padding: 0.5rem;
  border-radius: 4px;
  margin-bottom: 1.5rem;
`;

const SidebarButton = styled.button`
  width: 100%;
  background-color: ${props => props.secondary ? 'white' : '#4361ee'};
  color: ${props => props.secondary ? '#4361ee' : 'white'};
  border: ${props => props.secondary ? '1px solid #4361ee' : 'none'};
  padding: 0.8rem;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  margin-bottom: 0.8rem;
  
  &:hover {
    background-color: ${props => props.secondary ? '#f0f4ff' : '#3a56d4'};
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const MainContent = styled.div``;

const TabsContainer = styled.div`
  display: flex;
  border-bottom: 1px solid #ddd;
  margin-bottom: 2rem;
`;

const Tab = styled.button`
  padding: 1rem 1.5rem;
  background: none;
  border: none;
  border-bottom: 3px solid ${props => props.active ? '#4361ee' : 'transparent'};
  color: ${props => props.active ? '#4361ee' : '#666'};
  font-weight: ${props => props.active ? '600' : '400'};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    color: #4361ee;
  }
`;

const Card = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  margin-bottom: 2rem;
`;

const CardTitle = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 1.5rem;
  color: #333;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
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

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;

const Button = styled.button`
  background-color: ${props => props.secondary ? 'white' : '#4361ee'};
  color: ${props => props.secondary ? '#4361ee' : 'white'};
  border: ${props => props.secondary ? '1px solid #4361ee' : 'none'};
  padding: 0.8rem 1.5rem;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  
  &:hover {
    background-color: ${props => props.secondary ? '#f0f4ff' : '#3a56d4'};
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const WalletCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background-color: #f8f9fa;
  border-radius: 4px;
  margin-bottom: 1rem;
`;

const WalletInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

const WalletIcon = styled.div`
  width: 40px;
  height: 40px;
  background-color: #e6f2ff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #0066cc;
`;

const WalletDetails = styled.div``;

const WalletName = styled.div`
  font-weight: 500;
`;

const WalletAddress = styled.div`
  font-family: monospace;
  font-size: 0.9rem;
  color: #666;
`;

const ErrorMessage = styled.div`
  color: #e53e3e;
  margin-bottom: 1rem;
  padding: 0.5rem;
  background-color: #fff5f5;
  border-radius: 4px;
`;

const SuccessMessage = styled.div`
  color: #38a169;
  margin-bottom: 1rem;
  padding: 0.5rem;
  background-color: #f0fff4;
  border-radius: 4px;
`;

const VerificationCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background-color: #f8f9fa;
  border-radius: 8px;
  text-align: center;
`;

const VerificationIcon = styled.div`
  width: 80px;
  height: 80px;
  background-color: #e6f2ff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #0066cc;
  font-size: 2rem;
  margin-bottom: 1.5rem;
`;

const VerificationTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const VerificationText = styled.p`
  color: #666;
  margin-bottom: 1.5rem;
  max-width: 500px;
`;

const Profile = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [profileForm, setProfileForm] = useState({
    displayName: '',
    accountType: 'individual',
    bio: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);
  
  const { currentUser, userProfile, updateUserProfile, logout } = useAuth();
  const { account, connectWallet } = useWeb3();
  const navigate = useNavigate();
  
  // Initialize form with user data
  useEffect(() => {
    if (userProfile) {
      setProfileForm({
        displayName: userProfile.displayName || '',
        accountType: userProfile.accountType || 'individual',
        bio: userProfile.bio || ''
      });
    }
  }, [userProfile]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileForm({
      ...profileForm,
      [name]: value
    });
  };
  
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    
    try {
      setError('');
      setSuccess('');
      setLoading(true);
      
      await updateUserProfile({
        displayName: profileForm.displayName,
        accountType: profileForm.accountType,
        bio: profileForm.bio
      });
      
      setSuccess('Profile updated successfully');
    } catch (err) {
      setError('Failed to update profile');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    try {
      setUploadingImage(true);
      setError('');
      
      // Create a reference to the storage location
      const storageRef = ref(storage, `profile-images/${currentUser.uid}`);
      
      // Upload the file
      await uploadBytes(storageRef, file);
      
      // Get the download URL
      const downloadURL = await getDownloadURL(storageRef);
      
      // Update user profile with the new image URL
      await updateUserProfile({
        profileImage: downloadURL
      });
      
      setSuccess('Profile image updated successfully');
    } catch (err) {
      setError('Failed to upload image');
      console.error(err);
    } finally {
      setUploadingImage(false);
    }
  };
  
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (err) {
      setError('Failed to log out');
      console.error(err);
    }
  };
  
  const handleConnectWallet = async () => {
    try {
      setError('');
      
      if (!account) {
        await connectWallet();
      }
      
      if (account && userProfile) {
        await updateUserProfile({
          walletAddress: account
        });
        
        setSuccess('Wallet connected successfully');
      }
    } catch (err) {
      setError('Failed to connect wallet');
      console.error(err);
    }
  };
  
  // Format wallet address for display
  const formatAddress = (address) => {
    if (!address) return '';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };
  
  if (!currentUser || !userProfile) {
    return (
      <ProfileContainer>
        <Title>Profile</Title>
        <Card>
          <CardTitle>Loading profile...</CardTitle>
        </Card>
      </ProfileContainer>
    );
  }
  
  return (
    <ProfileContainer>
      <Title>My Profile</Title>
      
      <ProfileGrid>
        <Sidebar>
          <ProfileImageContainer>
            <ProfileImage 
              src={userProfile.profileImage || 'https://via.placeholder.com/150'} 
              alt={userProfile.displayName} 
            />
            <UploadButton>
              <i className="fas fa-camera"></i>
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleImageUpload} 
                disabled={uploadingImage}
              />
            </UploadButton>
          </ProfileImageContainer>
          
          <UserName>{userProfile.displayName}</UserName>
          <UserEmail>{userProfile.email}</UserEmail>
          
          <AccountType>
            {userProfile.accountType === 'individual' ? 'Individual' : 
             userProfile.accountType === 'broker' ? 'Real Estate Broker' : 
             'Property Developer'}
          </AccountType>
          
          <VerificationBadge verified={userProfile.isVerified}>
            {userProfile.isVerified ? 
              <>✓ Verified Account</> : 
              <>! Not Verified</>
            }
          </VerificationBadge>
          
          <SidebarButton onClick={() => navigate('/my-properties')}>
            My Properties
          </SidebarButton>
          
          <SidebarButton secondary onClick={() => navigate('/watchlist')}>
            My Watchlist
          </SidebarButton>
          
          <SidebarButton secondary onClick={handleLogout}>
            Sign Out
          </SidebarButton>
        </Sidebar>
        
        <MainContent>
          <TabsContainer>
            <Tab 
              active={activeTab === 'profile'} 
              onClick={() => setActiveTab('profile')}
            >
              Profile Settings
            </Tab>
            <Tab 
              active={activeTab === 'wallet'} 
              onClick={() => setActiveTab('wallet')}
            >
              Wallet
            </Tab>
            <Tab 
              active={activeTab === 'verification'} 
              onClick={() => setActiveTab('verification')}
            >
              Verification
            </Tab>
          </TabsContainer>
          
          {error && <ErrorMessage>{error}</ErrorMessage>}
          {success && <SuccessMessage>{success}</SuccessMessage>}
          
          {activeTab === 'profile' && (
            <Card>
              <CardTitle>Profile Information</CardTitle>
              <Form onSubmit={handleProfileUpdate}>
                <FormGroup>
                  <Label htmlFor="displayName">Full Name</Label>
                  <Input
                    type="text"
                    id="displayName"
                    name="displayName"
                    value={profileForm.displayName}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
                
                <FormGroup>
                  <Label htmlFor="accountType">Account Type</Label>
                  <Select
                    id="accountType"
                    name="accountType"
                    value={profileForm.accountType}
                    onChange={handleChange}
                  >
                    <option value="individual">Individual</option>
                    <option value="broker">Real Estate Broker</option>
                    <option value="developer">Property Developer</option>
                  </Select>
                </FormGroup>
                
                <FormGroup>
                  <Label htmlFor="bio">Bio</Label>
                  <Input
                    as="textarea"
                    id="bio"
                    name="bio"
                    value={profileForm.bio}
                    onChange={handleChange}
                    rows={4}
                  />
                </FormGroup>
                
                <ButtonGroup>
                  <Button type="submit" disabled={loading}>
                    {loading ? 'Saving...' : 'Save Changes'}
                  </Button>
                </ButtonGroup>
              </Form>
            </Card>
          )}
          
          {activeTab === 'wallet' && (
            <Card>
              <CardTitle>Connected Wallets</CardTitle>
              
              {userProfile.walletAddress ? (
                <WalletCard>
                  <WalletInfo>
                    <WalletIcon>
                      <i className="fas fa-wallet"></i>
                    </WalletIcon>
                    <WalletDetails>
                      <WalletName>Ethereum Wallet</WalletName>
                      <WalletAddress>{formatAddress(userProfile.walletAddress)}</WalletAddress>
                    </WalletDetails>
                  </WalletInfo>
                  <Button secondary onClick={handleConnectWallet}>
                    Reconnect
                  </Button>
                </WalletCard>
              ) : (
                <Button onClick={handleConnectWallet}>
                  Connect Wallet
                </Button>
              )}
              
              <p style={{ marginTop: '1rem', color: '#666', fontSize: '0.9rem' }}>
                Connecting your wallet allows you to buy, sell, and manage real estate NFTs on Property Mainnet.
              </p>
            </Card>
          )}
          
          {activeTab === 'verification' && (
            <Card>
              <CardTitle>Account Verification</CardTitle>
              
              {userProfile.isVerified ? (
                <VerificationCard>
                  <VerificationIcon>✓</VerificationIcon>
                  <VerificationTitle>Your Account is Verified</VerificationTitle>
                  <VerificationText>
                    Your account has been verified. You can now access all features of Property Mainnet, including listing properties and participating in auctions.
                  </VerificationText>
                </VerificationCard>
              ) : (
                <>
                  <VerificationCard>
                    <VerificationIcon>!</VerificationIcon>
                    <VerificationTitle>Verify Your Account</VerificationTitle>
                    <VerificationText>
                      Verifying your account helps build trust in the Property Mainnet community and gives you access to additional features.
                    </VerificationText>
                    <Button>Start Verification Process</Button>
                  </VerificationCard>
                  
                  <div style={{ marginTop: '1.5rem' }}>
                    <h4 style={{ marginBottom: '1rem' }}>Verification Requirements:</h4>
                    <ul style={{ paddingLeft: '1.5rem', color: '#666' }}>
                      <li>Valid government-issued ID (passport, driver's license)</li>
                      <li>Proof of address (utility bill, bank statement)</li>
                      <li>Selfie with your ID for identity confirmation</li>
                      {userProfile.accountType === 'broker' && (
                        <li>Real estate license or professional certification</li>
                      )}
                      {userProfile.accountType === 'developer' && (
                        <li>Business registration documents</li>
                      )}
                    </ul>
                  </div>
                </>
              )}
            </Card>
          )}
        </MainContent>
      </ProfileGrid>
    </ProfileContainer>
  );
};

export default Profile;