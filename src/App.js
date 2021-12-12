import React, { useState, useEffect } from 'react';
import {ethers} from 'ethers';
import Greeter from './artifacts/contracts/Greeter.sol/Greeter.json';
import Token from './artifacts/contracts/Token.sol/Token.json';

import './App.css';


const greeterAddress = "0x1F83E575ce789079925942F0177852EaB4F71d86";
const tokenAddress = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9";

const App = () => {
  const [greeting, setGreeting] = useState('');
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

  const fetchGreeting = async () => {
    if (typeof window.ethereum !== undefined) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(greeterAddress, Greeter.abi, provider);
      try {
        const data = await contract.greet();
        console.log("data: ", data);
      } catch(err) {
        console.log("error: ",err);
      }
    }
  }

  const setGreetingValue = async () => {
    if (!greeting) return;
    if (typeof window.ethereum !== undefined) {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(greeterAddress, Greeter.abi, signer);
      const transaction = await contract.setGreeting(greeting);
      setGreeting('');
      await transaction.wait();
      fetchGreeting();
    }
  }


  return (
    <div className="app">
      <header className="App-header">
        <button onClick={fetchGreeting}>Fetch greeting</button>
        <button onClick={setGreetingValue}>Set greeting</button>
        <input 
          onChange={e => setGreeting(e.target.value)}
          placeholder='Set greetings'
          value={greeting}
        />

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

