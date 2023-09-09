import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './screen/Home'
import Profile from './screen/Profile'
import Search from './screen/Search';
import Login from './screen/Login'
import { ethers } from 'ethers';
import { Context } from './components/context';
import Loader from './components/Loader'

function App() {

  const [isLoggedIn,setIsLoggedIn] = useState(false);
  const [loading,setLoading] = useState(false);
  const [address,setAddress] = useState('');

  const Provider = new ethers.providers.Web3Provider(window.ethereum);
  const Signer = Provider.getSigner()
  
  const connectWallet = async()=>{
      setLoading(true);
      await Provider.send("eth_requestAccounts", []).then(async()=>{
        const add = await Signer.getAddress();
        setAddress(add);
        console.log(add);
        setIsLoggedIn(true)
        setLoading(false);
       
      }).catch((error)=>{
        alert(error.message);
        setLoading(false);
      })
  
  }

  return (
    <>
    <Context.Provider value={{address:address,isLoggedIn:isLoggedIn}}>
    <Loader open={loading} />
    {isLoggedIn == true?
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/profile' element={<Profile/>} />
      <Route path='/search' element={<Search/>} />
    </Routes>
    :<Login onClick={()=>{connectWallet()}}/>
  }
  </Context.Provider>
</>
  )
}

export default App
