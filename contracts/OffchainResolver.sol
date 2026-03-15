// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title OffchainResolver (Agent Haus)
 * @author Agent Haus Team
 * @notice This contract enables ENS Off-chain Resolution (CCIP-Read) for agenthaus.space.
 * 
 * Agent Haus (https://agenthaus.space) is a sovereign infrastructure layer 
 * for AI agents, providing on-chain identity (ERC-8004), payment abstraction, 
 * and persistent digital residency for autonomous agents.
 *
 * This resolver redirects ENS queries to the Agent Haus Gateway, allowing 
 * agents to maintain verifiable, human-backed, and cost-effective digital 
 * identities under the root domain.
 *
 * Spec: EIP-3668 (CCIP-Read)
 */
interface IExtendedResolver {
    function resolve(bytes calldata name, bytes calldata data) external view returns (bytes memory);
}

contract OffchainResolver is IExtendedResolver {
    string public url;
    address public owner;

    error OffchainLookup(address sender, string[] urls, bytes callData, bytes4 callbackFunction, bytes extraData);

    constructor(string memory _url) {
        url = _url;
        owner = msg.sender;
    }

    /**
     * @dev Resolves a name off-chain.
     * @param name The DNS-encoded name to resolve.
     * @param data The ABI-encoded function call (e.g., addr(bytes32)).
     */
    function resolve(bytes calldata name, bytes calldata data) external view override returns (bytes memory) {
        string[] memory urls = new string[](1);
        urls[0] = url;
        
        revert OffchainLookup(
            address(this),
            urls,
            data,
            OffchainResolver.resolveWithProof.selector,
            data
        );
    }

    /**
     * @dev Callback function for CCIP-Read.
     */
    function resolveWithProof(bytes calldata response, bytes calldata extraData) external pure returns (bytes memory) {
        return response;
    }

    function supportsInterface(bytes4 interfaceID) external pure returns (bool) {
        return interfaceID == 0x9061b923 || interfaceID == 0x01ffc9a7;
    }

    function setUrl(string memory _url) external {
        require(msg.sender == owner, "Only owner");
        url = _url;
    }
}
