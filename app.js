// Contract Addresses
const STAKING_CONTRACT = "0x0C4b3c4BD7090eA2B1b6724a456d18D30c05b23e";
const REWARD_TOKEN = "0x9A880e35fcbb1A080762A0Fe117105Ad5715B897";
const NFT_CONTRACT = "0x70a4024183E9Bb3d5d4852bcBF3afe7F46Fd5cF3";

const STAKING_ABI = [
  "function stake(uint256 _tokenId) external",
  "function unstake() external",
  "function calculateRewards(address user) public view returns (uint256)",
  "function claimRewards() public",
  "function rewardToken() public view returns (address)",
  "function nftContract() public view returns (address)",
  "function stakes(address) view returns (uint256 tokenId, uint256 stakedAt, uint256 lastClaimed)"
];

const NFT_ABI = [
  "function approve(address to, uint256 tokenId) public",
  "function ownerOf(uint256 tokenId) public view returns (address)",
  "function setApprovalForAll(address operator, bool approved) public",
  "function isApprovedForAll(address owner, address operator) public view returns (bool)",
  "function balanceOf(address owner) public view returns (uint256)",
  "function tokenOfOwnerByIndex(address owner, uint256 index) public view returns (uint256)"
];

const TOKEN_ABI = [
  "function balanceOf(address account) public view returns (uint256)"
];

function waitForEthers() {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();
    const checkInterval = setInterval(() => {
      if (window.ethers) {
        clearInterval(checkInterval);
        resolve(window.ethers);
      } else if (Date.now() - startTime > 5000) {
        clearInterval(checkInterval);
        reject(new Error("Ethers.js failed to load within 5 seconds. Please check your network or refresh the page."));
      }
    }, 100);
  });
}

async function initApp() {
  try {
    const ethers = await waitForEthers();
    console.log("Ethers.js loaded successfully, version:", ethers.version);
    console.log("ethers.formatEther available:", !!ethers.formatEther);

    let provider, signer, stakingContract, rewardToken, nftContract, userAddress;

    const pulseChain = {
      chainId: "0x171",
      chainName: "PulseChain",
      rpcUrls: ["https://rpc.pulsechain.com"],
      nativeCurrency: { name: "Pulse", symbol: "PLS", decimals: 18 },
      blockExplorerUrls: ["https://scan.pulsechain.com"]
    };

    const connectButton = document.getElementById("connect-wallet");
    const approveButton = document.getElementById("approve-btn");
    const stakeButton = document.getElementById("stake-btn");
    const unstakeButton = document.getElementById("unstake-btn");
    const claimButton = document.getElementById("claim-btn");
    const nftSelect = document.getElementById("nft-select");
    const approvalStatus = document.getElementById("approval-status");

    async function connectWallet() {
      try {
        if (!window.ethereum) {
          alert("MetaMask not detected. Please install MetaMask to use this dApp.");
          return;
        }

        provider = new ethers.BrowserProvider(window.ethereum);
        await provider.send("eth_requestAccounts", []);

        const network = await provider.getNetwork();
        const chainIdHex = `0x${network.chainId.toString(16)}`;
        console.log("Connected to chain ID:", chainIdHex);
        if (chainIdHex !== pulseChain.chainId) {
          try {
            await window.ethereum.request({
              method: "wallet_switchEthereumChain",
              params: [{ chainId: pulseChain.chainId }]
            });
          } catch (switchError) {
            if (switchError.code === 4902) {
              await window.ethereum.request({
                method: "wallet_addEthereumChain",
                params: [pulseChain]
              });
            } else {
              throw new Error(`Please switch to PulseChain (chainId: ${pulseChain.chainId}) in MetaMask.`);
            }
          }
        }

        signer = await provider.getSigner();
        userAddress = await signer.getAddress();
        
        stakingContract = new ethers.Contract(STAKING_CONTRACT, STAKING_ABI, signer);
        rewardToken = new ethers.Contract(REWARD_TOKEN, TOKEN_ABI, signer);
        nftContract = new ethers.Contract(NFT_CONTRACT, NFT_ABI, signer);

        console.log("Contracts initialized:", { stakingContract, rewardToken, nftContract });
        updateUI();
        document.getElementById("wallet-status").textContent = `Wallet: ${userAddress}`;
        document.getElementById("user-info").style.display = "block";
        connectButton.style.display = "none";

      } catch (error) {
        console.error("Connection error:", error);
        alert("Failed to connect wallet: " + (error.message || "Unknown error"));
      }
    }

    async function updateUI() {
      try {
        console.log("Updating UI for address:", userAddress);
        
        const userRewards = await stakingContract.calculateRewards(userAddress);
        console.log("User rewards (raw):", userRewards.toString());
        
        const contractRewards = await rewardToken.balanceOf(STAKING_CONTRACT);
        console.log("Contract rewards (raw):", contractRewards.toString());
        
        const stakeInfo = await stakingContract.stakes(userAddress);
        console.log("Stake info:", stakeInfo);

        // Format with 2 decimals and add commas
        const userRewardsFormatted = Number(ethers.formatEther(userRewards)).toFixed(2);
        const contractRewardsFormatted = Number(ethers.formatEther(contractRewards)).toFixed(2);
        
        document.getElementById("user-rewards").textContent = 
          Number(userRewardsFormatted).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        document.getElementById("contract-rewards").textContent = 
          Number(contractRewardsFormatted).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

        const isStaked = stakeInfo.tokenId.toString() !== "0";
        unstakeButton.disabled = !isStaked;
        claimButton.disabled = !isStaked;
        stakeButton.disabled = isStaked;

        const balance = await nftContract.balanceOf(userAddress);
        console.log("NFT balance:", balance.toString());
        nftSelect.innerHTML = '<option value="">Select an NFT to stake</option>';
        const userNfts = [];
        
        for (let i = 0; i < balance; i++) {
          const tokenId = await nftContract.tokenOfOwnerByIndex(userAddress, i);
          if (tokenId.toString() !== stakeInfo.tokenId.toString()) {
            userNfts.push(tokenId.toString());
            nftSelect.innerHTML += `<option value="${tokenId}">${tokenId}</option>`;
          }
        }
        nftSelect.disabled = userNfts.length === 0 || isStaked;

        const isApproved = await nftContract.isApprovedForAll(userAddress, STAKING_CONTRACT);
        console.log("Approval status:", isApproved);
        approvalStatus.textContent = isApproved ? "Approved" : "Not Approved";
        approveButton.style.display = isApproved ? "none" : "inline-block";
        stakeButton.disabled = isStaked || !isApproved || userNfts.length === 0;

      } catch (error) {
        console.error("Update UI error:", error);
        document.getElementById("user-rewards").textContent = "Error";
        document.getElementById("contract-rewards").textContent = "Error";
        nftSelect.innerHTML = '<option value="">Error loading NFTs</option>';
      }
    }

    async function approveStaking() {
      try {
        await (await nftContract.setApprovalForAll(STAKING_CONTRACT, true)).wait();
        alert("Staking contract approved successfully!");
        updateUI();
      } catch (error) {
        console.error("Approval error:", error);
        alert("Approval failed: " + error.message);
      }
    }

    async function stakeNFT() {
      try {
        const tokenId = nftSelect.value;
        if (!tokenId) return alert("Please select an NFT to stake");

        await (await stakingContract.stake(tokenId)).wait();
        alert("NFT Staked successfully!");
        updateUI();
      } catch (error) {
        console.error("Stake error:", error);
        alert("Staking failed: " + error.message);
      }
    }

    async function unstakeNFT() {
      try {
        const stakeInfo = await stakingContract.stakes(userAddress);
        if (stakeInfo.tokenId.toString() === "0") {
          return alert("No NFT currently staked");
        }

        await (await stakingContract.unstake()).wait();
        alert("NFT Unstaked successfully!");
        updateUI();
      } catch (error) {
        console.error("Unstake error:", error);
        alert("Unstaking failed: " + error.message);
      }
    }

    async function claimRewards() {
      try {
        const stakeInfo = await stakingContract.stakes(userAddress);
        if (stakeInfo.tokenId.toString() === "0") {
          return alert("No NFT staked to claim rewards");
        }

        await (await stakingContract.claimRewards()).wait();
        alert("Rewards claimed successfully!");
        updateUI();
      } catch (error) {
        console.error("Claim error:", error);
        alert("Claim failed: " + error.message);
      }
    }

    connectButton.addEventListener("click", connectWallet);
    approveButton.addEventListener("click", approveStaking);
    stakeButton.addEventListener("click", stakeNFT);
    unstakeButton.addEventListener("click", unstakeNFT);
    claimButton.addEventListener("click", claimRewards);

    if (window.ethereum && window.ethereum.selectedAddress) {
      connectWallet();
    } else {
      setInterval(() => {
        if (userAddress) updateUI();
      }, 10000);
    }

  } catch (error) {
    console.error("Initialization error:", error);
    alert(error.message);
  }
}

initApp();
