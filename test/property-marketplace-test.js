const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Property Mainnet", function () {
  let RealEstateNFT, realEstateNFT;
  let PropertyMarketplace, propertyMarketplace;
  let owner, seller, buyer;
  let listingId;

  beforeEach(async function () {
    // Get signers
    [owner, seller, buyer] = await ethers.getSigners();

    // Deploy RealEstateNFT contract
    RealEstateNFT = await ethers.getContractFactory("RealEstateNFT");
    realEstateNFT = await RealEstateNFT.deploy();
    await realEstateNFT.deployed();

    // Deploy PropertyMarketplace contract
    PropertyMarketplace = await ethers.getContractFactory("PropertyMarketplace");
    propertyMarketplace = await PropertyMarketplace.deploy();
    await propertyMarketplace.deployed();
  });

  describe("RealEstateNFT", function () {
    it("Should mint a new property NFT", async function () {
      const tokenURI = "https://example.com/property/1";
      const propertyAddress = "123 Main St, Anytown, USA";
      const squareFootage = 2000;
      const bedrooms = 3;
      const bathrooms = 2;
      const propertyType = "residential";

      await expect(
        realEstateNFT.mintProperty(
          seller.address,
          tokenURI,
          propertyAddress,
          squareFootage,
          bedrooms,
          bathrooms,
          propertyType
        )
      )
        .to.emit(realEstateNFT, "PropertyMinted")
        .withArgs(1, seller.address, propertyAddress);

      expect(await realEstateNFT.ownerOf(1)).to.equal(seller.address);
      
      const property = await realEstateNFT.getProperty(1);
      expect(property.propertyAddress).to.equal(propertyAddress);
      expect(property.squareFootage).to.equal(squareFootage);
      expect(property.bedrooms).to.equal(bedrooms);
      expect(property.bathrooms).to.equal(bathrooms);
      expect(property.propertyType).to.equal(propertyType);
      expect(property.isVerified).to.equal(false);
    });

    it("Should verify a property", async function () {
      // Mint a property first
      await realEstateNFT.mintProperty(
        seller.address,
        "https://example.com/property/1",
        "123 Main St, Anytown, USA",
        2000,
        3,
        2,
        "residential"
      );

      // Verify the property
      await expect(realEstateNFT.verifyProperty(1, true))
        .to.emit(realEstateNFT, "PropertyVerified")
        .withArgs(1, true);

      const property = await realEstateNFT.getProperty(1);
      expect(property.isVerified).to.equal(true);
    });
  });

  describe("PropertyMarketplace", function () {
    beforeEach(async function () {
      // Mint a property for the seller
      await realEstateNFT.mintProperty(
        seller.address,
        "https://example.com/property/1",
        "123 Main St, Anytown, USA",
        2000,
        3,
        2,
        "residential"
      );

      // Approve marketplace to transfer NFT
      await realEstateNFT.connect(seller).approve(propertyMarketplace.address, 1);
    });

    it("Should list a property for sale", async function () {
      const price = ethers.utils.parseEther("1.0");

      await expect(
        propertyMarketplace.connect(seller).listProperty(realEstateNFT.address, 1, price)
      )
        .to.emit(propertyMarketplace, "PropertyListed")
        .withArgs(1, realEstateNFT.address, 1, seller.address, price);

      const listing = await propertyMarketplace.listings(1);
      expect(listing.seller).to.equal(seller.address);
      expect(listing.price).to.equal(price);
      expect(listing.isActive).to.equal(true);
    });

    it("Should allow buying a listed property", async function () {
      // List the property
      const price = ethers.utils.parseEther("1.0");
      await propertyMarketplace.connect(seller).listProperty(realEstateNFT.address, 1, price);

      // Buy the property
      await expect(
        propertyMarketplace.connect(buyer).buyProperty(1, { value: price })
      )
        .to.emit(propertyMarketplace, "PropertySold")
        .withArgs(1, realEstateNFT.address, 1, seller.address, buyer.address, price);

      // Check ownership transferred
      expect(await realEstateNFT.ownerOf(1)).to.equal(buyer.address);

      // Check listing is no longer active
      const listing = await propertyMarketplace.listings(1);
      expect(listing.isActive).to.equal(false);
    });

    it("Should allow cancelling a listing", async function () {
      // List the property
      const price = ethers.utils.parseEther("1.0");
      await propertyMarketplace.connect(seller).listProperty(realEstateNFT.address, 1, price);

      // Cancel the listing
      await expect(
        propertyMarketplace.connect(seller).cancelListing(1)
      )
        .to.emit(propertyMarketplace, "ListingCancelled")
        .withArgs(1, realEstateNFT.address, 1);

      // Check listing is no longer active
      const listing = await propertyMarketplace.listings(1);
      expect(listing.isActive).to.equal(false);
    });
  });
});