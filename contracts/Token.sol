//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;
import "hardhat/console.sol";

contract Token {
  string public name = "Simon Token";
  string public symbol = "SBT";
  uint public totalSupply = 10000000;
  mapping (address => uint) balances; 

  constructor () {
    balances[msg.sender] = totalSupply;
  }

  function transfer(address _to, uint _amount) external {
    require(balances[msg.sender] >= _amount, "Not enough tokens");
    balances[msg.sender] -= _amount;
    balances[_to] += _amount;
  }

  function balanceOf(address _account) external view returns (uint) {
    return balances[_account];
  }
}