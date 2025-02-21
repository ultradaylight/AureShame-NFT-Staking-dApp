# AureShame Staking DApp

**Stake NFTs Here**: https://ipfs.io/ipfs/bafybeifjerrhoa27lyyy3yokqg67nnujfmh66kkrakvv6novktlbn2vu4i/

Welcome to the AureShame Staking DApp! This decentralized application allows you to stake your **AureShame (ASHAME)** NFTs to earn rewards. The app enables you to interact with the AureShame NFT contract and staking rewards system, using the PulseChain blockchain.

## Features
- **NFT Staking**: Stake your AureShame NFTs to earn rewards in the form of Aurelips.
- **Rewards Tracking**: View accumulated rewards and contract rewards balance.
- **NFT Management**: Select, approve, stake, and unstake your AureShame NFTs.
- **Seamless User Interface**: Connect your MetaMask wallet, manage NFTs, and interact with the staking contract with ease.
- **Decentralized Hosting**: Clone and host the app on your own system or on any decentralized platform.

## Prerequisites
Before using the app, make sure you have:
- **MetaMask** or another Ethereum-compatible wallet installed.
- The **PulseChain network** selected in your wallet.
- **Node.js** and **npm** (Node Package Manager) installed on your machine for local development and building.

If you do not have MetaMask, you can install it from [here](https://metamask.io/).

## How It Works
The app connects to the **AureShame NFT** and **Staking** smart contracts deployed on the PulseChain network. By connecting your MetaMask wallet, you can:
- View your current staking status.
- Approve the staking contract to manage your NFTs.
- Stake your NFTs to earn Aurelips rewards.
- Unstake your NFTs and claim your accumulated rewards.

### Key Smart Contracts
- **Staking Contract**: Manages staking and reward calculations.
- **NFT Contract**: Manages AureShame NFTs (ASHAME).
- **Reward Token Contract**: Handles the distribution of rewards (Aurelips).

## Getting Started

### Step 1: Clone the Repository
To clone the repository, follow these steps:

1. Open a terminal or command prompt.
2. Run the following command to clone the repository:
   ```bash
   git clone https://github.com/ultradaylight/AureShame-NFT-Staking-dApp.git
   ```
3. Navigate into the project folder:
   ```bash
   cd AureShame-NFT-Staking-dApp
   ```

### Step 2: Install Dependencies
Once you have cloned the repository, install the required dependencies using **npm**:

```bash
npm install
```

This will install the necessary packages, including **ethers.js** for interacting with the blockchain.

### Step 3: Update the Configuration
In the `app.js` file, ensure the contract addresses and ABIs are correctly set for the AureShame Staking contract, NFT contract, and reward token contract. These should already be configured, but double-check the contract addresses for PulseChain and other configurations.

```javascript
const STAKING_CONTRACT = "0x0C4b3c4BD7090eA2B1b6724a456d18D30c05b23e";
const REWARD_TOKEN = "0x9A880e35fcbb1A080762A0Fe117105Ad5715B897";
const NFT_CONTRACT = "0x70a4024183E9Bb3d5d4852bcBF3afe7F46Fd5cF3";
```

If you want to deploy this on another network or blockchain, update these contract addresses accordingly.

### Step 4: Run the App Locally
To run the app on your local machine:

1. Open a terminal and navigate to the project folder.
2. Start a local server:
   ```bash
   npm start
   ```
   This will launch a development server and open the app in your default web browser (usually at [http://localhost:3000](http://localhost:3000)).

### Step 5: Customize and Build Your Own Version
To create your own decentralized website, you can build and deploy this app in several ways. Here's how you can create a production build:

```bash
npm run build
```

This will create a production-ready version of the app in the **`build/`** directory.

### Step 6: Deploy the App
Once you have a production build, you can host the app on any web server or decentralized platform. Here are some options:

- **GitHub Pages**: You can deploy your app directly from a GitHub repository. Follow the [GitHub Pages instructions](https://pages.github.com/) to deploy your app.
- **Netlify**: A great platform for hosting decentralized apps. You can follow the [Netlify deployment guide](https://docs.netlify.com/site-deploys/create-deploys/) to deploy your app easily.
- **IPFS**: For truly decentralized hosting, you can deploy your app to IPFS. You can use [Pinata](https://www.pinata.cloud/) or [Infura](https://infura.io/) for IPFS hosting.
  
Simply upload the files from the **`build/`** folder to your chosen hosting service, and your app will be live!

## UI Overview

### Wallet Connection
Displays the current wallet address and connection status. If not connected, a "Connect Wallet" button is shown.

### User Info
Shows accumulated rewards and the contract rewards balance. It also lets you view and manage your NFTs.

### NFT Management
Lets you select which NFT to stake, check approval status, and approve or stake the selected NFT.

### Buttons
- **Approve Staking Contract**: Approves the staking contract to manage your NFTs.
- **Stake Selected NFT**: Stakes the selected NFT to start earning rewards.
- **Unstake NFT**: Removes the staked NFT from the contract.
- **Claim Rewards**: Allows users to claim their rewards accumulated from staked NFTs.

## Contact

For any issues or questions, feel free to open an issue or contact the repository maintainers.

---

Enjoy staking your **AureShame** NFTs and earning rewards! You can now host and customize your own decentralized staking platform!
