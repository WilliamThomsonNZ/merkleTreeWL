// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

contract MerkleTreeWL is ERC721Enumerable, Ownable {
    uint256 maxTotalSupply = 4444;
    uint256 tokenIds;
    uint256 public price = 0.05 ether;
    bytes32 private whiteListMerkleRoot =
        0x1cf3a7c4135bc7835476a12b79a35ca7e1d089006841f2dced002b142379e421;

    constructor() ERC721("Amber Jack", "AJ") {}

    function mintWhitelist(bytes32[] calldata _proof) external payable {
        require(msg.value >= price, "Wrong ETH Amount");
        require(tokenIds <= maxTotalSupply, "Sold Out");
        bytes32 leaf = keccak256(abi.encodePacked(msg.sender));
        require(
            MerkleProof.verify(_proof, whiteListMerkleRoot, leaf),
            "Not on whitelist"
        );
        tokenIds++;
        _safeMint(msg.sender, tokenIds);
    }

    function setWhitelistMerkleRoot(bytes32 _whitelistMerkleRoot)
        external
        onlyOwner
    {
        whiteListMerkleRoot = _whitelistMerkleRoot;
    }
}
