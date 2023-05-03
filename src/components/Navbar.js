import {
  BrowserRouter as Router,
  Link,
} from "react-router-dom";
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

function Navbar() {

const [connected, toggleConnect] = useState(false);
const location = useLocation();

const [connectMessage,setConnectMessage]=useState('Connect');
const [currentAccount, setCurrentAccount]=useState('');

  useEffect(()=>{
    getCurrentWalletConnected();
    addWalletListener();
  })
const getCurrentWalletConnected = async()=>{

  if(typeof window!= "undefined" && typeof window.ethereum !="undefined") {
    try{
      
        const accounts = await window.ethereum.request({method: "eth_accounts"});
        if(accounts.length>0){
          setConnectMessage('Connected');
          setCurrentAccount(accounts[0]);
          
          console.log(accounts[0]);
        }
        else{
          alert("please connect your wallet to load NFTs....")
          console.log("connect to metamask");
        }

    }
    catch(err){
        console.log(err);
    }
  }
  else{
    console.log("metamask is not installed!! please install metamask.")
  }
}
const addWalletListener = async()=>{
  if(typeof window!= "undefined" && typeof window.ethereum !="undefined") {
    window.ethereum.on("accountsChanged",(accounts)=>{
      setCurrentAccount(accounts[0]);
      document.location.reload();
      console.log({currentAccount});
    })
  
  }
  else{
    setCurrentAccount("");
 
    console.log("metamask is not installed!! please install metamask.")
  }
}

const ConnectWallet = async()=>{
  if(typeof window!= "undefined" && typeof window.ethereum !="undefined") {
    try{
        const accounts = await window.ethereum.request({method: "eth_requestAccounts"});
        setConnectMessage('Connected'); 
        setCurrentAccount(accounts[0]);
        toggleConnect(true);
        console.log(accounts[0]);
        document.location.reload();
    }
    catch(err){
        console.log(err);
    }
  }
  else{
    console.log("metamask is not installed!! please install metamask.")
  }
  }

    return (
      <div className="">
       
<nav className="bg-white px-2 sm:px-4 py-2.5 dark:bg-blue-900 fixed w-full z-20 top-0 left-0 border-b border-blue-200 dark:border-blue-600">
  <div className="container flex flex-wrap items-center justify-between mx-auto">
  <a href="#" className="flex items-center">
      <img src="https://images.vexels.com/media/users/3/266634/isolated/preview/75815b69d2e7849562b875cdac5bd476-simple-business-bitcoin-symbol-money-icon.png" className="h-6 mr-3 sm:h-9" alt="Flowbite Logo"/>
      <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">BlockNFT</span>
  </a>
  <div className="flex md:order-2">
      <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={ConnectWallet}>{connectMessage}</button>
      <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 text-sm text-blue-500 rounded-lg md:hidden hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-200 dark:text-blue-400 dark:hover:bg-blue-700 dark:focus:ring-blue-600" aria-controls="navbar-sticky" aria-expanded="false">
        <span className="sr-only">Open main menu</span>
        <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
    </button>
  </div>
  <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
    <ul className="flex flex-col p-4 mt-4 border border-blue-100 rounded-lg bg-blue-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-blue-800 md:dark:bg-blue-900 dark:border-blue-700">
      <li  className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white" >
        <Link to="/">MarketPlace</Link>
      </li>
      <li className="block py-2 pl-3 pr-4 text-blue-700 rounded hover:bg-blue-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-blue-400 dark:hover:bg-blue-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-blue-700">
        <Link to="/sellNFT">List My NFT</Link>
      </li>
      <li className="block py-2 pl-3 pr-4 text-blue-700 rounded hover:bg-blue-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-blue-400 dark:hover:bg-blue-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-blue-700">
        <Link to="/profile">Profile</Link>
      </li>
    </ul>
  </div>
  </div>
</nav>
      </div>
    );
  }

  export default Navbar;