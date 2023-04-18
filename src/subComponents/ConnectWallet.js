/* eslint-disable */
import React, { useState, useEffect } from "react";
import Web3 from "web3/dist/web3.min.js";
import styled from "styled-components";

const ConnectWalletAccount = styled.div`
 
`;

const ConnectButton = styled.button`
display: inline-block;
transition: all 0.2s ease-in;
position: relative;
overflow: hidden;
z-index: 1;
color: #090909;
padding: 0.7em 1.7em;
font-size: 18px;
border-radius: 0.5em;
background: #e8e8e8;
border: 1px solid #e8e8e8;
box-shadow: 6px 6px 12px #c5c5c5, -6px -6px 12px #ffffff;

&:active {
  color: #666;
  box-shadow: inset 4px 4px 12px #c5c5c5, inset -4px -4px 12px #ffffff;
}

&:before {
  content: "";
  position: absolute;
  left: 50%;
  transform: translateX(-50%) scaleY(1) scaleX(1.25);
  top: 100%;
  width: 140%;
  height: 180%;
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 50%;
  display: block;
  transition: all 0.5s 0.1s cubic-bezier(0.55, 0, 0.1, 1);
  z-index: -1;
}

&:after {
  content: "";
  position: absolute;
  left: 55%;
  transform: translateX(-50%) scaleY(1) scaleX(1.45);
  top: 180%;
  width: 160%;
  height: 190%;
  background-color: #FF5722;
  border-radius: 50%;
  display: block;
  transition: all 0.5s 0.1s cubic-bezier(0.55, 0, 0.1, 1);
  z-index: -1;
}

&:hover {
  color: #ffffff;
  border: 1px solid #FF5722;
}

&:hover:before {
  top: -35%;
  background-color: #FF5722;
  transform: translateX(-50%) scaleY(1.3) scaleX(0.8);
}

&:hover:after {
  top: -45%;
  background-color: #FF5722;
  transform: translateX(-50%) scaleY(1.3) scaleX(0.8);
}
`;

const ConnectWallet = ({ network, userInfoValue, web3ObjValue }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [web3Obj, setWeb3Obj] = useState({});

  /************************************** onRefresh disconnect the Network **********************/

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("chainChanged", () => {
        onDisconnect();
      });
      window.ethereum.on("accountsChanged", () => {
        onDisconnect();
        onConnect();
      });
    }

    async function checkConnectedWallet() {
      const userData = JSON.parse(localStorage.getItem("userAccount"));
      const objData = JSON.parse(localStorage.getItem("userAccount"));
      if (userData !== null && objData !== null && network === userData.networkName) {
        await onConnect();
      }
      else {
        await switchNetwork();
        await onConnect();
      }
    }

    checkConnectedWallet();
  }, [network]);

  /************************************** detecting current provider ****************************/

  const detectCurrentProvider = () => {

    let provider;
    if (window.ethereum) {
      provider = window.ethereum;
    } else if (window.web3) {
      // eslint-disable-next-line
      provider = window.web3.currentProvider;
    } else {
      console.log(
        'Non-Ethereum browser detected. You should consider trying MetaMask!'
      );
    }
    return provider;

  };

  /**************************************** Switching to Selected Network ***********************/

  const addNetwork = async () => {
    try {
      if (!window.ethereum) throw new Error("No crypto wallet found");
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            ...networksConfig[network],
          },
        ],
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  /******************************************** Supported Networks ******************************/

  const networksConfig = {

    PolygonMainnet: {
      chainId: `0x${Number(137).toString(16)}`,
      rpcUrls: ["https://polygon-rpc.com/"],
      chainName: "Polygon Mainnet",
      nativeCurrency: {
        name: "MATIC",
        symbol: "MATIC",
        decimals: 18,
      },
      blockExplorerUrls: ["https://polygonscan.com/"],
    },
    EthereumMainnet: {
      chainId: `0x${Number(1).toString(16)}`,
      rpcUrls: ["https://mainnet.infura.io/v3/"],
      chainName: "Ethereum Mainnet",
      nativeCurrency: {
        name: "ETH",
        symbol: "ETH",
        decimals: 18,
      },
      blockExplorerUrls: ["https://etherscan.io"],
    },
    BinanceMainnet: {
      chainId: `0x${Number(56).toString(16)}`,
      rpcUrls: ["https://bsc-dataseed.binance.org/"],
      chainName: "Binance Mainnet",
      nativeCurrency: {
        name: "BNB",
        symbol: "BNB",
        decimals: 18,
      },
      blockExplorerUrls: ["https://bscscan.com"],
    },
    PolygonTestnet: {
      chainId: `0x${Number(80001).toString(16)}`,
      rpcUrls: ["https://matic-mumbai.chainstacklabs.com"],
      chainName: "Mumbai",
      nativeCurrency: {
        name: "MATIC",
        symbol: "MATIC",
        decimals: 18,
      },
      blockExplorerUrls: ["https://mumbai.polygonscan.com"],
    },
    SepoliaTestnet: {
      chainId: `0x${Number(11155111).toString(16)}`,
      rpcUrls: ["https://sepolia.infura.io/v3/"],
      chainName: "Sepolia test network",
      nativeCurrency: {
        name: "SepoliaETH",
        symbol: "SepoliaETH",
        decimals: 18,
      },
      blockExplorerUrls: ["https://sepolia.etherscan.io"],
    },
    BinanceTestnet: {
      chainId: `0x${Number(97).toString(16)}`,
      rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545"],
      chainName: "Binance Smart Chain Testnet",
      nativeCurrency: {
        name: "tBNB",
        symbol: "tBNB",
        decimals: 18,
      },
      blockExplorerUrls: ["https://testnet.bscscan.com"],
    },

  };

  /************************************ Formating Connected Wallet Address **********************/

  const convertAddress = async (account) => {
    // WallatAddress length 42
    const addressmystring = account.slice(0, 6) + "..." + account.slice(38, account.length);
    return addressmystring;
  };

  /**************************************** Connecting to Metamask ******************************/

  const onConnect = async () => {
    try {
      const currentProvider = detectCurrentProvider();
      if (currentProvider) {
        if (currentProvider !== window.ethereum) {
          console.log("MetaMask not installed, using read-only defaults");

        }
        let chainIds = await currentProvider.request({ method: 'eth_chainId' });
        if (chainIds === networksConfig[network].chainId) {

        console.log("Bravo!, you are on the correct network");

        await currentProvider.request({ method: 'eth_requestAccounts' });
        const web3 = new Web3(currentProvider);
        let userAccount = await web3.eth.getAccounts();
        let chainId = await web3.eth.getChainId();
        let account = userAccount[0];
        let ethBalance = await web3.eth.getBalance(account);     // Getting wallet balance
        ethBalance = web3.utils.fromWei(ethBalance, 'ether');    //Convert balance to wei

        const shortAddress = await convertAddress(account);
        saveUserInfo(account, parseInt(chainId), ethBalance, shortAddress, web3);
        // console.log(account, parseInt(chainId), ethBalance, shortAddress, web3);

        } else {

          await switchNetwork();

        }
      }
    } catch (err) {
      console.log("There was an error fetching your accounts. Make sure your Ethereum client is configured correctly.");
      console.log(err);
    }
  };

  /**************************************** Switching Network ***********************************/

  const switchNetwork = async () => {

    console.log("Switch chainId : ", `${networksConfig[network].chainId}`, "switch networkName : ", `${network}`)
    try {

      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: `${networksConfig[network].chainId}` }],
      });
      console.log(`Successfully switched to chain with ID ${network}`);

    } catch (switchError) {

      if (switchError.code === 4001) {

        console.log('User rejected the chain switching request');

      } else if (switchError.message.includes('already pending')) {

        console.log('A chain switching request is already pending, please wait');

      } else if (switchError.code === 5902) {

        console.log("This network is not available in your metamask, please add it");
        try {
          await addNetwork();
        } catch (error) {
          console.log("Failed to switch to the network");
          console.log(error)
        }

      } else {

        console.error(switchError);

      }

    }
    console.log("oulalal, switch to the correct network");

  }

  /**************************************** Disconnecting to Metamask ***************************/

  const onDisconnect = () => {
    window.localStorage.removeItem('userAccount');
    window.localStorage.removeItem('web3obj');
    setWeb3Obj({});
    setUserInfo({});
    setIsConnected(false);
    console.log("You are dissconnected !!");
  };

  /********************************* Saving Connected User Wallet address ***********************/

  const saveUserInfo = (account, chainId, ethBalance, shortAddress, web3Obj) => {
    console.log("Hereeeee");
   
    const userAccount = {
      account: account,
      connectionid: chainId,
      balance: ethBalance,
      shortaddress: shortAddress,
      networkName: network
    };
    window.localStorage.setItem('userAccount', JSON.stringify(userAccount)); //user persisted data

    const userData = JSON.parse(localStorage.getItem('userAccount'));

    setUserInfo(userData);
    setWeb3Obj(web3Obj);
    setIsConnected(true);
  };

  const changeHandler = () => {
    userInfoValue(userInfo);
    web3ObjValue(web3Obj);
  }

  return (
    <ConnectWalletAccount>
      {isConnected ? <>
        <ConnectButton onClick={onDisconnect} onChange={changeHandler()}>
          <span>
            {userInfo.shortaddress}
          </span>
        </ConnectButton>
      </> : <>
        <ConnectButton onClick={onConnect} onChange={changeHandler()}>
          <span>
            Connect Wallet
          </span>
        </ConnectButton>
      </>
      }
    </ConnectWalletAccount>
  )
}

export default ConnectWallet