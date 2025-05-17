# Property Mainnet

Property Mainnet is a revolutionary NFT marketplace for real estate properties, leveraging blockchain technology to provide secure, transparent, and efficient property ownership transfers.

![Property Mainnet Logo](/public/logo.png)

## Features

- **Property NFTs**: Tokenize real estate properties as NFTs on the blockchain
- **Property Verification**: Rigorous verification process including document review and physical inspection
- **Fractional Ownership**: Enable multiple investors to own portions of a single property
- **Auctions**: Public and private auction functionality for property sales
- **Property Modifications**: Request and track modifications to physical properties
- **User Authentication**: Secure user accounts with verification
- **Wallet Integration**: Connect your crypto wallet to buy, sell, and trade Property NFTs

## Technology Stack

- **Frontend**: React.js, Styled Components
- **Blockchain**: Ethereum, Solidity Smart Contracts
- **Authentication**: Firebase Authentication
- **Storage**: IPFS for decentralized storage of property metadata and images
- **Development**: Hardhat for smart contract development and testing

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MetaMask or another Ethereum wallet

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/x-word-wide/property-mainnet.git
   cd property-mainnet
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:
   ```
   REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   REACT_APP_FIREBASE_PROJECT_ID=your_firebase_project_id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   REACT_APP_FIREBASE_APP_ID=your_firebase_app_id
   REACT_APP_CONTRACT_ADDRESS=your_deployed_contract_address
   ```

4. Start the development server:
   ```
   npm start
   ```

### Smart Contract Deployment

1. Compile the smart contracts:
   ```
   npx hardhat compile
   ```

2. Deploy to a test network:
   ```
   npx hardhat run scripts/deploy.js --network rinkeby
   ```

3. Update the contract address in your `.env` file

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.

## Project Structure

```
property-mainnet/
├── contracts/                # Smart contracts
│   ├── RealEstateNFT.sol     # ERC721 contract for property NFTs
│   └── PropertyMarketplace.sol # Marketplace contract
├── public/                   # Public assets
├── scripts/                  # Deployment scripts
├── src/
│   ├── components/           # Reusable UI components
│   ├── context/              # React context providers
│   ├── firebase/             # Firebase configuration
│   ├── pages/                # Page components
│   ├── utils/                # Utility functions
│   ├── App.js                # Main application component
│   └── index.js              # Entry point
└── test/                     # Smart contract tests
```

## Key Features Explained

### Property Verification

Before a property can be tokenized as an NFT, it undergoes a rigorous verification process:

1. **Document Review**: Property deeds, titles, and other legal documents are verified
2. **Physical Inspection**: An inspector visits the property to confirm its condition and details
3. **Verification Certificate**: Once approved, the property receives a verification certificate
4. **NFT Creation**: The verified property can then be tokenized as an NFT

### Fractional Ownership

Property Mainnet enables fractional ownership of real estate:

1. **Tokenization**: Property owners can divide their property into multiple tokens
2. **Investment Opportunities**: Investors can purchase fractions of high-value properties
3. **Dividend Distribution**: Rental income and other proceeds are distributed proportionally
4. **Secondary Market**: Fractional tokens can be traded on the marketplace

### Private Auctions

Property owners can create exclusive auction events:

1. **Invitation-Only**: Only invited users can view and participate in private auctions
2. **Customizable Terms**: Set reserve prices, auction duration, and other parameters
3. **Secure Bidding**: All bids are recorded on the blockchain for transparency
4. **Automatic Settlement**: When the auction ends, ownership transfers automatically

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For any inquiries, please reach out to info@propertymainnet.com
