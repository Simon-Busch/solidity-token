import React, { useState } from 'react';
import {ethers} from 'ethers';
import Token from './artifacts/contracts/Token.sol/Token.json';

import './App.css';


const tokenAddress = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9";

const App = () => {
  const [userAccount, setUserAccount] = useState('');
  const [amount, setAmount] = useState(0);

  const requestAccount = async () => {
    await window.ethereum.request({method: 'eth_requestAccounts'});
    // prompt user to connect metamask if not connected
  }

  const getBalance = async () => {
    if (typeof window.ethereum !== undefined) {
      const [account] = await window.ethereum.request({method: 'eth_requestAccounts'});
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(tokenAddress, Token.abi, provider);
      const balance = await contract.balanceOf(account);
      console.log("Balance: " , balance.toString());
    }
  }

  const sendCoins = async () => {
    if (typeof window.ethereum !== undefined) {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(tokenAddress, Token.abi, signer);
      const transaction = await contract.transfer(userAccount, amount);
      await transaction.wait();
      console.log(`${amount} coins successfully sent to ${userAccount}`)
    }
  }

  return (
    <div className="app">
      <header className="App-header">
        <br/>
        <br/>
        <button onClick={getBalance}>Get balance</button>
        <button onClick={sendCoins}>Send Coins</button>
        <input 
          onChange={e => setUserAccount(e.target.value)}
          placeholder='Account ID'
        />
        <input 
          onChange={e => setAmount(e.target.value)}
          placeholder='Amount'
        />
      </header>
    </div>
  );
}

export default App;

