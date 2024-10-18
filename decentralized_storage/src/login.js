// Login.js
import React, { useState } from 'react';
import { ethers } from 'ethers';
import { useNavigate } from 'react-router-dom';
import './login.css';

function Login() {
  const [walletAddress, setWalletAddress] = useState("");
  const navigate = useNavigate();

  // Function to connect wallet
  const connectWallet = async () => {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      setWalletAddress(address);

      // Redirect to main app after login
      navigate("/app");
    } else {
      alert("Please install MetaMask to interact with the blockchain.");
    }
  };

  return (
    <div className="login-container">
      <h2>Login to Decentralized Storage System</h2>
      <p>Connect your wallet to get started</p>
      <button className="connect-button" onClick={connectWallet}>
        {walletAddress ? `Connected: ${walletAddress}` : "Connect Wallet"}
      </button>
    </div>
  );
}

export default Login;
