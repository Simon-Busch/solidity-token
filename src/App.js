import React, { useState, useEffect } from 'react';
import {ethers} from 'ethers';
import Greeter from './artifacts/contracts/Greeter.sol/Greeter.json';
import './App.css';


const greeterAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

const App = () => {
  const [greeting, setGreeting] = useState('');

  const requestAccount = async () => {
    await window.ethereum.request({method: 'eth_requestAccounts'});
    // prompt user to connect metamask if not connected
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
      </header>
    </div>
  );
}

export default App;

