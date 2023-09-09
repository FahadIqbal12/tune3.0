import React, { useState } from 'react';
import { Button, Modal,Stack,Typography } from '@mui/material';
import { contract_address,abi } from '../contract/interaction';
import Loader from './Loader';
import { ethers } from 'ethers';

const PurchaseModal = (props) => {
  const [loading,setLoading] = useState(false)
  const Provider = new ethers.providers.Web3Provider(window.ethereum);
  const Signer = Provider.getSigner();

  const purchaseSong =async(songId)=>{
    const contract = new ethers.Contract(contract_address, abi, Signer);
    setLoading(true);
    let overrides = {
      value: ethers.utils.parseEther(props.price)
    }
    await contract.buySong(songId,overrides).then(()=>{
      alert('The transaction will be confirmed in some time');
      setLoading(false)
    }).catch((error)=>{
      alert(error.reason);
      console.log(error);
      setLoading(false);
    })
  }

  return (
   <Modal open={props.open} >
    <Stack sx={{p:1,backgroundColor:'#fff',height:320,width:400,position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',borderRadius:3}}>
      <Loader open={loading} />
      <Typography sx={{color:'#000',":hover":{cursor:'pointer'}}} onClick={props.onClose} >X</Typography>
      <Stack sx={{width:200,alignSelf:'center'}} >
      <img src='https://i.pinimg.com/originals/95/0c/c0/950cc0483ae9f4c373295a907ced186a.gif'  />
      </Stack>
      
      <Typography sx={{color:'#000',fontSize:13}}>Artist address: {props.artistAddress}</Typography>
      <Typography sx={{color:'#000',fontSize:13,fontWeight:'bold'}}>Song Name: {props.songName}</Typography>
      <Typography sx={{color:'#000',fontSize:30,fontWeight:'bold',color:'#3c72fc'}}>Price {props.price} MATIC</Typography>
      <Button variant='contained' onClick={()=>{purchaseSong(props.songId)}} >Buy</Button>
    </Stack>
   </Modal>
  )
}

export default PurchaseModal