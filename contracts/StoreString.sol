// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract StoreString {
    string private secret;

    event Secret_Stored();

    function setSecret(string memory _secret) public {
        require(_encString(secret) == _encString(_secret), "secret can't be the same");
        secret = _secret;
        emit Secret_Stored();
    }

    function getSecret() public view returns (string memory) {
        return secret;
    }

    function _encString(string memory _string) internal pure returns (bytes32) {
        return keccak256(abi.encodePacked(_string));
    }
}
