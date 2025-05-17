// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract RealEstateNFT is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    
    // Property details struct
    struct Property {
        string propertyAddress;
        uint256 squareFootage;
        uint256 bedrooms;
        uint256 bathrooms;
        string propertyType; // residential, commercial, land, etc.
        bool isVerified;
    }
    
    // Mapping from token ID to Property
    mapping(uint256 => Property) public properties;
    
    // Events
    event PropertyMinted(uint256 indexed tokenId, address indexed owner, string propertyAddress);
    event PropertyVerified(uint256 indexed tokenId, bool verified);
    
    constructor() ERC721("PropertyMainnet Real Estate", "RESTATE") Ownable(msg.sender) {}
    
    // Mint a new property NFT
    function mintProperty(
        address recipient,
        string memory tokenURI,
        string memory propertyAddress,
        uint256 squareFootage,
        uint256 bedrooms,
        uint256 bathrooms,
        string memory propertyType
    ) public returns (uint256) {
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();
        
        _mint(recipient, newTokenId);
        _setTokenURI(newTokenId, tokenURI);
        
        // Store property details
        properties[newTokenId] = Property({
            propertyAddress: propertyAddress,
            squareFootage: squareFootage,
            bedrooms: bedrooms,
            bathrooms: bathrooms,
            propertyType: propertyType,
            isVerified: false
        });
        
        emit PropertyMinted(newTokenId, recipient, propertyAddress);
        
        return newTokenId;
    }
    
    // Verify a property (only owner can do this)
    function verifyProperty(uint256 tokenId, bool verified) public onlyOwner {
        require(_exists(tokenId), "Property does not exist");
        properties[tokenId].isVerified = verified;
        
        emit PropertyVerified(tokenId, verified);
    }
    
    // Get property details
    function getProperty(uint256 tokenId) public view returns (Property memory) {
        require(_exists(tokenId), "Property does not exist");
        return properties[tokenId];
    }
}