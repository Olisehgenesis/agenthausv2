// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/proxy/ERC1967/ERC1967Proxy.sol";
import "./AgentHausRegistrar.sol";

/**
 * @title AgentHausRegistrarDeployer
 * @notice Deploys and initializes AgentHausRegistrar behind an ERC1967 proxy in one flow.
 *
 * Why this exists:
 * - Prevents accidental deployments where registrar is never initialized.
 * - Supports optional token seeding in the same transaction by using this deployer
 *   as temporary owner, then transferring ownership to the final owner.
 */
contract AgentHausRegistrarDeployer {
    event RegistrarDeployed(address indexed implementation, address indexed proxy, address indexed owner, address treasury);

    /**
     * @notice Deploy + initialize registrar proxy with a final owner.
     */
    function deployAndInitialize(address finalOwner, address treasury)
        external
        returns (address implementation, address proxy)
    {
        require(finalOwner != address(0), "Invalid owner");
        require(treasury != address(0), "Invalid treasury");

        AgentHausRegistrar impl = new AgentHausRegistrar();
        implementation = address(impl);

        bytes memory initData = abi.encodeCall(AgentHausRegistrar.initialize, (finalOwner, treasury));
        ERC1967Proxy p = new ERC1967Proxy(implementation, initData);
        proxy = address(p);

        emit RegistrarDeployed(implementation, proxy, finalOwner, treasury);
    }

    /**
     * @notice Deploy + initialize registrar proxy and seed supported tokens atomically.
     * @dev Uses this deployer as temporary owner to add tokens, then transfers ownership.
     */
    function deployInitializeAndSeedTokens(
        address finalOwner,
        address treasury,
        address[] calldata tokens,
        uint8[] calldata decimals
    ) external returns (address implementation, address proxy) {
        require(finalOwner != address(0), "Invalid owner");
        require(treasury != address(0), "Invalid treasury");
        require(tokens.length == decimals.length, "Length mismatch");

        AgentHausRegistrar impl = new AgentHausRegistrar();
        implementation = address(impl);

        // Temporary owner is this deployer contract so we can add tokens in this call.
        bytes memory initData = abi.encodeCall(AgentHausRegistrar.initialize, (address(this), treasury));
        ERC1967Proxy p = new ERC1967Proxy(implementation, initData);
        proxy = address(p);

        AgentHausRegistrar registrar = AgentHausRegistrar(proxy);
        for (uint256 i = 0; i < tokens.length; i++) {
            registrar.addSupportedToken(tokens[i], decimals[i]);
        }

        registrar.transferOwnership(finalOwner);

        emit RegistrarDeployed(implementation, proxy, finalOwner, treasury);
    }
}
