import React, { useState } from "react";
import './App.css';
import Login from "./login";  // Import login component

function App() {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [filesList, setFilesList] = useState([]);
  const [walletAddress, setWalletAddress] = useState("");  // Keep track of login status

  // Function to handle file upload
  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0];
    setFile(uploadedFile);
    setFileName(uploadedFile.name);
  };

  // Upload file to list (for now, just storing in state)
  const uploadFile = () => {
    if (file) {
      const newFile = { name: fileName, hash: "QmExampleHash" }; // Hash is a placeholder
      setFilesList([...filesList, newFile]);
    }
  };

  // If not logged in, show the login component
  if (!walletAddress) {
    return <Login setWalletAddress={setWalletAddress} />;
  }

  // If logged in, show the main app
  return (
    <div className="App">
      <header className="App-header">
        <h1>Decentralized Storage System</h1>
        <p>Logged in as: {walletAddress}</p>

        <div className="upload-section">
          <input type="file" onChange={handleFileUpload} />
          <button onClick={uploadFile}>Upload File</button>
        </div>

        <div className="file-list">
          <h2>Uploaded Files</h2>
          <ul>
            {filesList.map((file, index) => (
              <li key={index}>
                {file.name} - <a href={`https://ipfs.io/ipfs/${file.hash}`}>View on IPFS</a>
              </li>
            ))}
          </ul>
        </div>
      </header>
    </div>
  );
}

export default App;
