const hre = require("hardhat");

async function main() {
  // Deploy RealEstateNFT contract
  const RealEstateNFT = await hre.ethers.getContractFactory("RealEstateNFT");
  const realEstateNFT = await RealEstateNFT.deploy();
  await realEstateNFT.deployed();
  console.log("RealEstateNFT deployed to:", realEstateNFT.address);

  // Deploy PropertyMarketplace contract
  const PropertyMarketplace = await hre.ethers.getContractFactory("PropertyMarketplace");
  const propertyMarketplace = await PropertyMarketplace.deploy();
  await propertyMarketplace.deployed();
  console.log("PropertyMarketplace deployed to:", propertyMarketplace.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });