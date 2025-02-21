<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AureShame Staking DApp</title>
  <style>
    body { 
      font-family: Arial, sans-serif; 
      margin: 20px; 
      text-align: center;
    }
    #app {
      max-width: 800px;
      margin: 0 auto;
    }
    h1 {
      margin-bottom: 20px;
    }
    #connect-wallet {
      padding: 10px 20px;
      font-size: 16px;
    }
    button { 
      margin: 5px; 
      padding: 5px 10px; 
    }
    #user-info { 
      margin-top: 20px; 
      text-align: left;
    }
  </style>
</head>
<body>
  <div id="app">
    <h1>AureShame Staking DApp</h1>
    <div id="wallet-status">Wallet: Not Connected</div>
    <button id="connect-wallet">Connect Wallet</button>
    
    <div id="user-info" style="display: none;">
      <h2>Your Stats</h2>
      <p>Rewards Accumulated: <span id="user-rewards">0</span> Aurelips</p>
      <p>Contract Rewards Balance: <span id="contract-rewards">0</span> Aurelips</p>
      
      <h2>Your NFTs</h2>
      <select id="nft-select" disabled>
        <option value="">Loading NFTs...</option>
      </select>
      <p>Approval Status: <span id="approval-status">Not Checked</span></p>
      <button id="approve-btn" style="display: none;">Approve Staking Contract</button>
      <button id="stake-btn" disabled>Stake Selected NFT</button>
      <button id="unstake-btn" disabled>Unstake NFT</button>
      <button id="claim-btn" disabled>Claim Rewards</button>
    </div>
  </div>

  <!-- Use a specific, reliable ethers.js v6 CDN -->
  <script src="https://cdn.jsdelivr.net/npm/ethers@6.13.2/dist/ethers.umd.min.js"></script>
  <!-- Load app.js after ethers.js -->
  <script src="app.js"></script>
</body>
</html>
