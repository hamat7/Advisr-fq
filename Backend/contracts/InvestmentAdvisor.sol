// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "@openzeppelin/contracts/access/Ownable.sol";

contract Advisr is Ownable {
    constructor(address initialOwner) Ownable(initialOwner) {}
    
    // Precompile address for Hedera address derivation
    address constant HEDERA_ADDRESS_RESOLVER = address(0x167);
    
    // Properties of an investment advisor
    struct InvestmentAdvisor {
        address walletAddress;
        string hederaId;
        string advisorName;
        string registeredRegion;
        bool certificationStatus;
    }
    
    InvestmentAdvisor[] public advisorRegistry;
    mapping(address => uint256) public advisorPosition; // Tracks advisor positions in array
    
    event AdvisorRegistered(
        address indexed walletAddress, 
        string hederaId, 
        string advisorName, 
        string registeredRegion, 
        bool certificationStatus
    );
    
    event CertificationUpdated(
        address indexed walletAddress, 
        bool isVerified
    );
    
    function registerInvestmentAdvisor(
        string memory hederaAccountId, 
        string memory advisorName, 
        string memory registeredRegion
    ) external {
        // Input validation
        require(bytes(hederaAccountId).length > 0, "Hedera account ID required");
        require(bytes(advisorName).length > 0, "Advisor name required");
        require(bytes(registeredRegion).length > 0, "Registered region required");
        
        string memory derivedHederaId = deriveHederaAccountId(msg.sender);
        
        advisorRegistry.push(InvestmentAdvisor({
            walletAddress: msg.sender,
            hederaId: derivedHederaId,
            advisorName: advisorName,
            registeredRegion: registeredRegion,
            certificationStatus: false
        }));
        
        advisorPosition[msg.sender] = advisorRegistry.length - 1;
        
        emit AdvisorRegistered(msg.sender, derivedHederaId, advisorName, registeredRegion, false);
    }
    
    function approveCertification(address advisorWallet) external onlyOwner {
        uint256 position = advisorPosition[advisorWallet];
        require(position < advisorRegistry.length, "Advisor not found");
        require(!advisorRegistry[position].certificationStatus, "Already certified");
        
        advisorRegistry[position].certificationStatus = true;
        
        emit CertificationUpdated(advisorWallet, true);
    }
    
    function revokeCertification(address advisorWallet) external onlyOwner {
        uint256 position = advisorPosition[advisorWallet];
        require(position < advisorRegistry.length, "Advisor not found");
        require(advisorRegistry[position].certificationStatus, "Already revoked");
        
        advisorRegistry[position].certificationStatus = false;
        
        emit CertificationUpdated(advisorWallet, false);
    }
    
    function validateHederaFormat(string memory accountId) internal pure returns (bool) {
        bytes memory accountBytes = bytes(accountId);
        if (accountBytes.length < 5) return false;
        
        // Validate X.Y.Z format
        uint dotCounter;
        for (uint i; i < accountBytes.length; i++) {
            if (accountBytes[i] == '.') {
                dotCounter++;
            } else if (accountBytes[i] < '0' || accountBytes[i] > '9') {
                return false;
            }
        }
        return dotCounter == 2;
    }
    
    // Derives Hedera account ID from EVM wallet address
    function deriveHederaAccountId(address walletAddress) public view returns (string memory) {
        (bool callSuccess, bytes memory responseData) = HEDERA_ADDRESS_RESOLVER.staticcall(
            abi.encode(walletAddress)
        );
        require(callSuccess, "Failed to derive Hedera account ID");
        
        // Returns account ID in 0.0.1234 format
        return string(responseData);
    }
    
    // Additional utility functions
    function getAdvisorCount() external view returns (uint256) {
        return advisorRegistry.length;
    }
    
    function getAdvisorByAddress(address advisorWallet) external view returns (InvestmentAdvisor memory) {
        uint256 position = advisorPosition[advisorWallet];
        require(position < advisorRegistry.length, "Advisor not found");
        return advisorRegistry[position];
    }
    
    function isCertifiedAdvisor(address advisorWallet) external view returns (bool) {
        uint256 position = advisorPosition[advisorWallet];
        if (position >= advisorRegistry.length) return false;
        return advisorRegistry[position].certificationStatus;
    }
}