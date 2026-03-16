// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface IERC20MetadataLike {
    function decimals() external view returns (uint8);
}

/**
 * @title AgentHausRegistrar (Logic V1)
 * @author Agent Haus Team
 * @notice Handles on-chain registration for Agent Haus subdomains using multiple stablecoins.
 * 
 * This contract is designed to be behind a UUPS Proxy for upgradeability.
 * It allows users to pay in USDT, USDC, or cUSD to secure a subdomain under agenthaus.space.
 */
contract AgentHausRegistrar is Initializable, OwnableUpgradeable, UUPSUpgradeable {
    uint256 public constant USD_3_CHAR = 30_000000;  // $30.00 (6-decimal USD fixed point)
    uint256 public constant USD_4_CHAR = 15_000000;  // $15.00
    uint256 public constant USD_5_CHAR = 5_000000;   // $5.00
    uint256 public constant USD_6_CHAR = 1_000000;   // $1.00
    uint256 public constant USD_7_CHAR = 300000;     // $0.30
    uint256 public constant USD_8_TO_20 = 100000;    // $0.10

    struct TokenInfo {
        bool enabled;
        uint256 fee; // Optional fallback/override fee in token base units (0 = use tier pricing)
    }

    struct NameRecord {
        address owner;
        address token;
        uint256 paidAmount;
        uint64 registeredAt;
        bool active;
    }

    mapping(address => TokenInfo) public supportedTokens;
    mapping(address => uint8) public tokenDecimals;
    mapping(address => bool) public tokenExists;
    address[] public supportedTokenList;
    mapping(bytes32 => NameRecord) public nameRecords;
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
    event SubdomainDeregistered(string name, address indexed previousOwner);
    event TokenWithdrawn(address indexed token, address indexed to, uint256 amount);
    event TokenAdded(address indexed token, uint8 decimals);

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
        _registerSubdomain(name, targetOwner, token, type(uint256).max);
    }

    /**
     * @notice Register with caller-provided maxAmount safety bound.
     * @dev Reverts if calculated required fee is greater than maxAmount.
     */
    function registerSubdomain(
        string calldata name,
        address targetOwner,
        address token,
        uint256 maxAmount
    ) external {
        _registerSubdomain(name, targetOwner, token, maxAmount);
    }

    /**
     * @notice Admin function to enable/disable tokens and set fees.
     */
    function setTokenSupport(address token, bool enabled, uint256 fee) external onlyOwner {
        require(tokenExists[token], "Token not added");
        uint8 decimals = tokenDecimals[token];
        if (decimals == 0) {
            decimals = _safeDecimals(token);
        }
        _setTokenSupport(token, enabled, fee, decimals);
    }

    function setTokenSupportWithDecimals(address token, bool enabled, uint256 fee, uint8 decimals) external onlyOwner {
        require(tokenExists[token], "Token not added");
        require(decimals <= 18, "Decimals too high");
        _setTokenSupport(token, enabled, fee, decimals);
    }

    /**
     * @notice Add a supported payment token (all tokens assumed 1:1 USD stable).
     * @dev New token starts enabled with tier pricing (fee override = 0).
     */
    function addSupportedToken(address token, uint8 decimals) external onlyOwner {
        require(token != address(0), "Invalid token");
        require(!tokenExists[token], "Token already added");
        require(decimals <= 18, "Decimals too high");

        tokenExists[token] = true;
        supportedTokenList.push(token);
        _setTokenSupport(token, true, 0, decimals);
        emit TokenAdded(token, decimals);
    }

    function getSupportedTokens() external view returns (address[] memory) {
        return supportedTokenList;
    }

    /**
     * @notice Admin function to update the treasury.
     */
    function setTreasury(address _newTreasury) external onlyOwner {
        require(_newTreasury != address(0), "Invalid treasury");
        treasury = _newTreasury;
        emit TreasuryUpdated(_newTreasury);
    }

    /**
     * @notice Admin can clear an active name record.
     */
    function adminDeregister(string calldata name) external onlyOwner {
        bytes32 key = _nameKey(name);
        NameRecord memory record = nameRecords[key];
        require(record.active, "Name not active");
        delete nameRecords[key];
        emit SubdomainDeregistered(name, record.owner);
    }

    /**
     * @notice Withdraw collected token payments.
     * @param token ERC20 token address
     * @param to Recipient address (treasury or another admin wallet)
     * @param amount Amount to withdraw (set 0 to withdraw full balance)
     */
    function adminWithdraw(address token, address to, uint256 amount) external onlyOwner {
        require(to != address(0), "Invalid recipient");
        uint256 finalAmount = amount;
        if (finalAmount == 0) {
            finalAmount = IERC20(token).balanceOf(address(this));
        }
        require(finalAmount > 0, "Nothing to withdraw");
        require(IERC20(token).transfer(to, finalAmount), "Withdraw failed");
        emit TokenWithdrawn(token, to, finalAmount);
    }

    /**
     * @notice Legacy helper for current token fee config.
     * If fee is 0, this returns the 5+ char tier equivalent for compatibility.
     */
    function getTokenFee(address token) external view returns (uint256) {
        TokenInfo memory info = supportedTokens[token];
        if (!info.enabled) return 0;
        if (info.fee > 0) return info.fee;
        uint8 decimals = tokenDecimals[token];
        if (decimals == 0) return 0;
        return _usdToTokenAmount(USD_8_TO_20, decimals);
    }

    /**
     * @notice Name-based fee calculator used by app and frontend.
     */
    function getRegistrationFee(string calldata name, address token) public view returns (uint256) {
        TokenInfo memory info = supportedTokens[token];
        require(info.enabled, "Token not supported");

        // Optional static override for migration/ops.
        if (info.fee > 0) {
            return info.fee;
        }

        uint8 decimals = tokenDecimals[token];
        require(decimals > 0, "Token decimals missing");
        return _usdToTokenAmount(_priceByName(name), decimals);
    }

    function isNameActive(string calldata name) external view returns (bool) {
        return nameRecords[_nameKey(name)].active;
    }

    function getNameRecord(string calldata name) external view returns (NameRecord memory) {
        return nameRecords[_nameKey(name)];
    }

    function _registerSubdomain(
        string calldata name,
        address targetOwner,
        address token,
        uint256 maxAmount
    ) internal {
        require(targetOwner != address(0), "Invalid owner");
        _validateName(name);

        bytes32 key = _nameKey(name);
        require(!nameRecords[key].active, "Name already registered");

        uint256 requiredFee = getRegistrationFee(name, token);
        require(requiredFee > 0, "Invalid fee");
        require(maxAmount >= requiredFee, "Max amount below required fee");

        // Pull fee into contract custody for admin withdrawal/accounting.
        require(IERC20(token).transferFrom(msg.sender, address(this), requiredFee), "Payment failed");

        nameRecords[key] = NameRecord({
            owner: targetOwner,
            token: token,
            paidAmount: requiredFee,
            registeredAt: uint64(block.timestamp),
            active: true
        });

        emit SubdomainRegistered(name, targetOwner, token, requiredFee, msg.sender);
    }

    function _setTokenSupport(address token, bool enabled, uint256 fee, uint8 decimals) internal {
        require(token != address(0), "Invalid token");
        supportedTokens[token] = TokenInfo(enabled, fee);
        tokenDecimals[token] = decimals;
        emit TokenStatusUpdated(token, enabled, fee);
    }

    function _priceByName(string calldata name) internal pure returns (uint256) {
        uint256 len = bytes(name).length;
        if (len == 3) return USD_3_CHAR;
        if (len == 4) return USD_4_CHAR;
        if (len == 5) return USD_5_CHAR;
        if (len == 6) return USD_6_CHAR;
        if (len == 7) return USD_7_CHAR;
        if (len >= 8 && len <= 20) return USD_8_TO_20;
        revert("Invalid name length");
    }

    function _usdToTokenAmount(uint256 usdAmount6, uint8 decimals) internal pure returns (uint256) {
        if (decimals == 6) return usdAmount6;
        if (decimals > 6) return usdAmount6 * (10 ** (decimals - 6));
        return usdAmount6 / (10 ** (6 - decimals));
    }

    function _nameKey(string calldata name) internal pure returns (bytes32) {
        return keccak256(bytes(name));
    }

    function _validateName(string calldata name) internal pure {
        bytes memory b = bytes(name);
        uint256 len = b.length;
        require(len >= 3 && len <= 20, "Invalid name length");
        require(b[0] != bytes1("-") && b[len - 1] != bytes1("-"), "Hyphen position invalid");

        for (uint256 i = 0; i < len; i++) {
            bytes1 c = b[i];
            bool isLower = (c >= 0x61 && c <= 0x7A); // a-z
            bool isDigit = (c >= 0x30 && c <= 0x39); // 0-9
            bool isHyphen = (c == 0x2D);             // -
            require(isLower || isDigit || isHyphen, "Invalid name characters");
        }
    }

    function _safeDecimals(address token) internal view returns (uint8) {
        try IERC20MetadataLike(token).decimals() returns (uint8 d) {
            return d;
        } catch {
            revert("Token decimals unavailable");
        }
    }
}
