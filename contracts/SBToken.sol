//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;
import "hardhat/console.sol";

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract SBToken is ERC20 {
  constructor () ERC20("Simon Busch Token", "SBT") {
    _mint(msg.sender, 100000 * (10 ** 18));
  }
  
}