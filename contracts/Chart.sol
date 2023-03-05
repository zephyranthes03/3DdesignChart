//Contract based on [https://docs.openzeppelin.com/contracts/3.x/erc721](https://docs.openzeppelin.com/contracts/3.x/erc721)
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract Chart is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    // bytes32 message;
    // constructor(bytes32 myMessage) ERC721("Chart","NFT") {
    //     message = myMessage;
    // }
    constructor() ERC721("Chart", "NFT") {}


    // function getMessage() public view returns(bytes32){
    //     return message;
    // }

                    // string memory imageIPFS, 
                    // string memory stlIPFS, 
                    // int price, 
                    // string memory price_type

    function mintNFT(address recipient, 
                    string memory tokenURI) 
        public onlyOwner
        returns (uint256)
    {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);
        // _setTokenURI(newItemId, price_type);

        return newItemId;
    }
}
