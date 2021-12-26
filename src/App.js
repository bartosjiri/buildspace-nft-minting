import React, {useEffect, useState} from "react";
import {ethers} from "ethers";

import './styles/App.css';

import twitterLogo from './assets/twitter-logo.svg';
import openseaLogo from './assets/opensea-logo.svg';

// @NOTE: This file has to be in sync with the compiled contract
import NFT from './utils/NFT.json';

// @NOTE: This address has to be in sync with the compiled contract
const CONTRACT_ADDRESS = "0xbefe66409b915e1906f6ce500cb82b796eea8a32";
const COLLECTION_NAME = "Rug NFTs";
const COLLECTION_DESCRIPTION = "A collection of beautiful rugs. Nothing suspicious or to be worried about.";
const OPENSEA_COLLECTION_SLUG = "notarugnft-qzfglqkjfz";
const TWITTER_HANDLE = "_buildspace";

const App = () => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [minting, setMinting] = useState(false);

  const checkIfWalletIsConnected = async () => {
    const {ethereum} = window;

    if (!ethereum) {
      console.log("Make sure you have metamask!");
      return;
    } else {
      console.log("We have the ethereum object", ethereum);
    }

    let chainId = await ethereum.request({method: 'eth_chainId'});
    console.log("Connected to chain " + chainId);

    const rinkebyChainId = "0x4";
    if (chainId !== rinkebyChainId) {
      alert("You are not connected to the Rinkeby Test Network!");
    }

    const accounts = await ethereum.request({method: 'eth_accounts'});

    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("Found an authorized account:", account);
      setCurrentAccount(account)

      setupEventListener()
    } else {
      console.log("No authorized account found")
    }
  }

  const connectWallet = async () => {
    try {
      const {ethereum} = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({method: "eth_requestAccounts"});

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);

      setupEventListener()
    } catch (error) {
      console.log(error)
    }
  }

  const setupEventListener = async () => {
    try {
      const {ethereum} = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, NFT.abi, signer);

        connectedContract.on("NewItemMinted", (from, tokenId) => {
          console.log(from, tokenId.toNumber())
          alert(`Hey there! We've minted your NFT and sent it to your wallet. It may be blank right now. It can take a max of 10 min to show up on OpenSea. Here's the link: https://testnets.opensea.io/assets/${CONTRACT_ADDRESS}/${tokenId.toNumber()}`)
        });

        console.log("Setup event listener!")

      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error)
    }
  }

  const askContractToMintNft = async () => {
    setMinting(true)

    try {
      const {ethereum} = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, NFT.abi, signer);

        console.log("Going to pop wallet now to pay gas...")
        let nftTxn = await connectedContract.generateNFT();

        console.log("Mining...please wait.")
        await nftTxn.wait();

        console.log(`Mined, see transaction: https://rinkeby.etherscan.io/tx/${nftTxn.hash}`);

      } else {
        console.log("Ethereum object doesn't exist!");
      }
      setMinting(false)
    } catch (error) {
      console.log(error)
      setMinting(false)
    }
  }

  useEffect(() => {
    checkIfWalletIsConnected();
  }, [])

  const renderNotConnectedContainer = () => (
    <button onClick={connectWallet} className="cta-button connect-wallet-button">
      Connect to Wallet
    </button>
  );

  const renderMintUI = () => (
    <button onClick={askContractToMintNft} disabled={minting} className="cta-button connect-wallet-button">
      {minting ? "Minting..." : "Mint NFT"}
    </button>
  )

  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header gradient-text">{COLLECTION_NAME}</p>
          <p className="sub-text">{COLLECTION_DESCRIPTION}</p>
          {currentAccount === "" ? renderNotConnectedContainer() : renderMintUI()}
        </div>
        <div className="footer-container">
          <a
            className="footer-text"
            href={`https://testnets.opensea.io/collection/${OPENSEA_COLLECTION_SLUG}`}
            target="_blank"
            rel="noreferrer"
          >
            <img alt="OpenSea Logo" className="footer-logo" src={openseaLogo} />
            <span>See collection on OpenSea</span>
          </a>
          <a
            className="footer-text"
            href={`https://twitter.com/${TWITTER_HANDLE}`}
            target="_blank"
            rel="noreferrer"
          >
            <img alt="Twitter Logo" className="footer-logo" src={twitterLogo} />
            <span>{`built on @${TWITTER_HANDLE}`}</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default App;