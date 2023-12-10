// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract AchieverNFT is ERC721, Ownable {
    struct GameChallenge {
        uint256 gameId;
        string description;
        uint256 difficulty;
        uint256 completionTimestamp;
    }

    uint256 public taxAmount;
    uint256 private nextTokenId;
    mapping(uint256 => GameChallenge) public gameChallenges;

    event GameChallengeMinted(
        uint256 indexed tokenId,
        address indexed owner,
        GameChallenge gameChallenge
    );

    constructor(
        uint256 _taxAmount
    ) ERC721("AchieverNFT", "ACHNFT") Ownable(msg.sender) {
        taxAmount = _taxAmount;
        nextTokenId = 0;
    }

    function setTaxAmount(uint256 _newTaxAmount) external onlyOwner {
        taxAmount = _newTaxAmount;
    }

    function mint(
        address to,
        uint256 gameId,
        string memory description,
        uint256 difficulty,
        uint256 completionTimestamp
    ) external payable {
        require(
            msg.value >= taxAmount,
            "AchieverNFT: Not enough Ether provided."
        );
        require(
            bytes(description).length > 0,
            "AchieverNFT: Description cannot be empty."
        );
        require(
            difficulty > 0 && difficulty <= 5,
            "AchieverNFT: Difficulty must be between 1 and 5."
        );
        require(
            completionTimestamp <= block.timestamp,
            "AchieverNFT: Completion timestamp cannot be in the future."
        );

        require(
            block.timestamp - completionTimestamp <= 365 days,
            "AchieverNFT: Completion timestamp is too old."
        );

        gameChallenges[nextTokenId] = GameChallenge(
            gameId,
            description,
            difficulty,
            completionTimestamp
        );
        _mint(to, nextTokenId);
        emit GameChallengeMinted(nextTokenId, to, gameChallenges[nextTokenId]);

        nextTokenId++;
    }

    function withdraw() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "AchieverNFT: No funds to withdraw.");
        payable(owner()).transfer(balance);
    }
}
