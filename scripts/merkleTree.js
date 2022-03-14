const hre = require("hardhat");

async function main() {
    const Merkle = await hre.ethers.getContractFactory("MerkleTreeWL"); 
    const merkle = await Merkle.deploy();
    await merkle.deployed();
    console.log("contract deployed to: " ,merkle.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
