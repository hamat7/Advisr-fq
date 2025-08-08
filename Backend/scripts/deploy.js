require("dotenv").config();
const { ethers } = require("hardhat");

async function main() {
  console.log("🚀 Starting Advisr deployment...\n");
  
  // Get the signer of the tx and address for deploying the contract
  const [deployer] = await ethers.getSigners();
  console.log("📝 Deploying contracts with the account:", deployer.address);
  
  // Check deployer balance
  const balance = await ethers.provider.getBalance(deployer.address);
  console.log("💰 Account balance:", ethers.formatEther(balance), "HBAR\n");
  
  // Get the contract factory for Advisr
  console.log("🏗️  Getting Advisr contract factory...");
  const Advisr = await ethers.getContractFactory("Advisr");
  
  console.log("⏳ Deploying Advisr contract...");
  console.log("👤 Owner will be set to:", deployer.address);
  
  // Deploy the contract with deployer as the initial owner
  const advisr = await Advisr.deploy(deployer.address);
  
  // Wait for deployment to be mined
  await advisr.waitForDeployment();
  
  const contractAddress = await advisr.getAddress();
  console.log("\n✅ Advisr deployed successfully!");
  console.log("📍 Contract address:", contractAddress);
  console.log("👤 Contract owner:", deployer.address);
  
  // Get deployment transaction details
  const deploymentTx = advisr.deploymentTransaction();
  if (deploymentTx) {
    console.log("🔗 Deployment tx hash:", deploymentTx.hash);
    console.log("⛽ Gas used:", deploymentTx.gasLimit?.toString() || "N/A");
  }
  
  // Verify the deployment by calling a view function
  console.log("\n🔍 Verifying deployment...");
  try {
    const advisorCount = await advisr.getAdvisorCount();
    console.log("📊 Initial advisor count:", advisorCount.toString());
    console.log("✅ Contract is working correctly!");
  } catch (error) {
    console.log("❌ Contract verification failed:", error.message);
  }
  
  // Display useful information
  console.log("\n📋 Contract Information:");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log(`📱 App Name: Advisr`);
  console.log(`📍 Contract: ${contractAddress}`);
  console.log(`🌐 Network: ${network.name}`);
  console.log(`👤 Owner: ${deployer.address}`);
  console.log(`🔗 Explorer: https://hashscan.io/${network.name}/contract/${contractAddress}`);
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  
  // Save deployment info to file
  const deploymentInfo = {
    contractName: "Advisr",
    contractAddress: contractAddress,
    ownerAddress: deployer.address,
    network: network.name,
    chainId: network.config.chainId,
    deployedAt: new Date().toISOString(),
    transactionHash: deploymentTx?.hash || null
  };
  
  const fs = require('fs');
  const path = require('path');
  
  // Create deployments directory if it doesn't exist
  const deploymentsDir = path.join(__dirname, '..', 'deployments');
  if (!fs.existsSync(deploymentsDir)) {
    fs.mkdirSync(deploymentsDir, { recursive: true });
  }
  
  // Save deployment info
  const deploymentFile = path.join(deploymentsDir, `advisr-${network.name}.json`);
  fs.writeFileSync(deploymentFile, JSON.stringify(deploymentInfo, null, 2));
  console.log(`💾 Deployment info saved to: ${deploymentFile}`);
  
  // Next steps
  console.log("\n🎯 Next Steps:");
  console.log("1. Update your frontend with the new contract address");
  console.log("2. Register test advisors to verify functionality");  
  console.log("3. Set up event monitoring for AdvisorRegistered events");
  console.log("4. Consider verifying the contract on HashScan");
  
  if (network.name === "testnet") {
    console.log("\n🧪 Testnet Deployment Complete!");
    console.log("Ready for testing and integration 🚀");
  } else if (network.name === "mainnet") {
    console.log("\n🌟 Mainnet Deployment Complete!");
    console.log("Advisr is now LIVE! 🎉");
  }
}

// Error handling
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("\n❌ Deployment failed:");
    console.error(error);
    process.exit(1);
  });