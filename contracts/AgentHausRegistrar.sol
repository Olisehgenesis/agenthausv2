// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/**
 * @title AgentHausRegistrar (Logic V1)
 * @author Agent Haus Team
 * @notice Handles on-chain registration for Agent Haus subdomains using multiple stablecoins.
 * 
 * This contract is designed to be behind a UUPS Proxy for upgradeability.
 * It allows users to pay in USDT, USDC, or cUSD to secure a subdomain under agenthaus.space.
 */
contract AgentHausRegistrar is Initializable, OwnableUpgradeable, UUPSUpgradeable {
    struct TokenInfo {
        bool enabled;
        uint256 fee; // Amount in token's base units (e.g. 0.3 * 10**6 for USDT)
    }

    mapping(address => TokenInfo) public supportedTokens;
    address public treasury;

    event SubdomainRegistered(
        string name,
        address indexed owner,
        address indexed token,
        uint256 fee,
        address indexed registrant
    );

    event TokenStatusUpdated(address indexed token, bool enabled, uint256 fee);
    event TreasuryUpdated(address newTreasury);

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize(address _initialOwner, address _treasury) public initializer {
        __Ownable_init(_initialOwner);
        treasury = _treasury;
    }

    function _authorizeUpgrade(address newImplementation) internal override onlyOwner {}

    /**
     * @notice Register a subdomain using a supported token.
     * @param name The subdomain name (e.g. "genesis")
     * @param targetOwner The address that will own the subdomain
     * @param token Address of the stablecoin to use (USDT, USDC, or cUSD)
     */
    function registerSubdomain(
        string calldata name,
        address targetOwner,
        address token
    ) external {
        require(bytes(name).length >= 3, "Name too short");
        TokenInfo memory info = supportedTokens[token];
        require(info.enabled, "Token not supported");

        // Take the fee
        require(IERC20(token).transferFrom(msg.sender, treasury, info.fee), "Payment failed");

        emit SubdomainRegistered(name, targetOwner, token, info.fee, msg.sender);
    }

    /**
     * @notice Admin function to enable/disable tokens and set fees.
     */
    function setTokenSupport(address token, bool enabled, uint256 fee) external onlyOwner {
        supportedTokens[token] = TokenInfo(enabled, fee);
        emit TokenStatusUpdated(token, enabled, fee);
    }

    /**
     * @notice Admin function to update the treasury.
     */
    function setTreasury(address _newTreasury) external onlyOwner {
        treasury = _newTreasury;
        emit TreasuryUpdated(_newTreasury);
    }

    /**
     * @notice Helper to get token fee.
     */
    function getTokenFee(address token) external view returns (uint256) {
        return supportedTokens[token].fee;
    }
}
