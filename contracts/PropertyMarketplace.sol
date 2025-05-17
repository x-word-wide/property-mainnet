// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PropertyMarketplace is ReentrancyGuard, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _listingIds;
    
    // Fee percentage (in basis points, 100 = 1%)
    uint256 public feePercentage = 250; // 2.5% fee
    
    // Listing struct
    struct Listing {
        uint256 listingId;
        address nftContract;
        uint256 tokenId;
        address payable seller;
        uint256 price;
        bool isActive;
    }
    
    // Mapping from listing ID to Listing
    mapping(uint256 => Listing) public listings;
    
    // Events
    event PropertyListed(uint256 indexed listingId, address indexed nftContract, uint256 indexed tokenId, address seller, uint256 price);
    event PropertySold(uint256 indexed listingId, address indexed nftContract, uint256 indexed tokenId, address seller, address buyer, uint256 price);
    event ListingCancelled(uint256 indexed listingId, address indexed nftContract, uint256 indexed tokenId);
    event FeePercentageUpdated(uint256 oldFeePercentage, uint256 newFeePercentage);
    
    constructor() Ownable(msg.sender) {}
    
    // List a property for sale
    function listProperty(address nftContract, uint256 tokenId, uint256 price) public nonReentrant {
        require(price > 0, "Price must be greater than zero");
        require(IERC721(nftContract).ownerOf(tokenId) == msg.sender, "You don't own this property");
        require(IERC721(nftContract).getApproved(tokenId) == address(this) || 
                IERC721(nftContract).isApprovedForAll(msg.sender, address(this)), 
                "Marketplace not approved to transfer NFT");
        
        _listingIds.increment();
        uint256 listingId = _listingIds.current();
        
        listings[listingId] = Listing({
            listingId: listingId,
            nftContract: nftContract,
            tokenId: tokenId,
            seller: payable(msg.sender),
            price: price,
            isActive: true
        });
        
        emit PropertyListed(listingId, nftContract, tokenId, msg.sender, price);
    }
    
    // Buy a listed property
    function buyProperty(uint256 listingId) public payable nonReentrant {
        Listing storage listing = listings[listingId];
        
        require(listing.isActive, "Listing is not active");
        require(msg.value == listing.price, "Incorrect price");
        require(msg.sender != listing.seller, "Seller cannot be buyer");
        
        // Mark listing as inactive
        listing.isActive = false;
        
        // Calculate fee
        uint256 fee = (listing.price * feePercentage) / 10000;
        uint256 sellerAmount = listing.price - fee;
        
        // Transfer NFT to buyer
        IERC721(listing.nftContract).transferFrom(listing.seller, msg.sender, listing.tokenId);
        
        // Transfer funds to seller and fee to contract owner
        (bool sentToSeller, ) = listing.seller.call{value: sellerAmount}("");
        require(sentToSeller, "Failed to send Ether to seller");
        
        (bool sentToOwner, ) = owner().call{value: fee}("");
        require(sentToOwner, "Failed to send fee to owner");
        
        emit PropertySold(listingId, listing.nftContract, listing.tokenId, listing.seller, msg.sender, listing.price);
    }
    
    // Cancel a listing
    function cancelListing(uint256 listingId) public nonReentrant {
        Listing storage listing = listings[listingId];
        
        require(listing.isActive, "Listing is not active");
        require(listing.seller == msg.sender || msg.sender == owner(), "Not authorized");
        
        listing.isActive = false;
        
        emit ListingCancelled(listingId, listing.nftContract, listing.tokenId);
    }
    
    // Update fee percentage (only owner)
    function updateFeePercentage(uint256 newFeePercentage) public onlyOwner {
        require(newFeePercentage <= 1000, "Fee cannot exceed 10%");
        
        uint256 oldFeePercentage = feePercentage;
        feePercentage = newFeePercentage;
        
        emit FeePercentageUpdated(oldFeePercentage, newFeePercentage);
    }
    
    // Get all active listings
    function getActiveListings() public view returns (Listing[] memory) {
        uint256 totalListings = _listingIds.current();
        uint256 activeCount = 0;
        
        // Count active listings
        for (uint256 i = 1; i <= totalListings; i++) {
            if (listings[i].isActive) {
                activeCount++;
            }
        }
        
        // Create array of active listings
        Listing[] memory activeListings = new Listing[](activeCount);
        uint256 currentIndex = 0;
        
        for (uint256 i = 1; i <= totalListings; i++) {
            if (listings[i].isActive) {
                activeListings[currentIndex] = listings[i];
                currentIndex++;
            }
        }
        
        return activeListings;
    }
    
    // Get listings by seller
    function getListingsBySeller(address seller) public view returns (Listing[] memory) {
        uint256 totalListings = _listingIds.current();
        uint256 sellerListingCount = 0;
        
        // Count seller's listings
        for (uint256 i = 1; i <= totalListings; i++) {
            if (listings[i].seller == seller) {
                sellerListingCount++;
            }
        }
        
        // Create array of seller's listings
        Listing[] memory sellerListings = new Listing[](sellerListingCount);
        uint256 currentIndex = 0;
        
        for (uint256 i = 1; i <= totalListings; i++) {
            if (listings[i].seller == seller) {
                sellerListings[currentIndex] = listings[i];
                currentIndex++;
            }
        }
        
        return sellerListings;
    }
}