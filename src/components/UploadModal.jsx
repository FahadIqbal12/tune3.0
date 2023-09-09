import React, { useState,useContext } from 'react';
import {Stack,Modal,Typography,TextField,Button} from '@mui/material';
import Loader from './Loader';
import { Context } from './context';
import { Web3Storage } from 'web3.storage';
import { contract_address,abi } from '../contract/interaction';
import { ethers } from 'ethers';
import { db } from '../config';
import { doc,setDoc } from 'firebase/firestore';

const UploadModal = (props) => {
  const c = useContext(Context)
  const [file,setFile] = useState('');
  const [loading,setLoading] = useState(false);
  const [songName,setSongName] = useState('');
  const [price,setPrice] = useState(0)
  const Provider = new ethers.providers.Web3Provider(window.ethereum);
  const Signer = Provider.getSigner();

  const submit =async (event)=>{
    setLoading(true)
    event.preventDefault();
    if (!file) {
      alert('please choose a file');
      setLoading(false);
    }else{
    if(songName != '' && price !== 0 ){
      const client = new Web3Storage({ token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDMwYzg3MUU5MDhCNUExNjkyNEE1NzY3ZjE5MTE1ZmQ1NUQwODFhNmEiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2ODg2NDc3MjIwNDQsIm5hbWUiOiJ0ZXN0In0.eoQjg2q3WOQH8oG1AahSm5j9h-ude7Sc6Uc9jDFFEC4' });
    const cid = await client.put([file]);
    const url = `https://dweb.link/ipfs/${cid}/${file.name}`;
    console.log(url);
      const contract = new ethers.Contract(contract_address, abi, Signer);
      const songId = Date.now();
      const p = ethers.utils.parseEther(price)
      await contract.addSong(songId,songName,url,p).then(async()=>{
        alert('The transaction will be confirmed in some time.');
        await setDoc(doc(db, "songs", songId.toString()), {
          artist_address:c.address,
          price:price,
          song_name:songName,
          song_url:url,
          song_id:songId,
        });
        setPrice(0);
        setSongName('');
        setFile('');

        setLoading(false)
      }).catch((error)=>{
        alert('Something went wrong');
        console.log(error)
        setLoading(false)
      })
    }else{
      alert('Some fields are missing.');
      setLoading(false)
    }

    }
  }

  return (
    <Modal open={props.open} >
    <Stack sx={{p:1,backgroundColor:'#fff',height:270,width:400,position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',borderRadius:3}}>
      <Loader open={loading} />
      <Typography sx={{color:'#000',fontSize:20,fontWeight:'bold'}}>Upload your own song:</Typography>
      <Stack>
        <TextField label='Song Name' sx={{m:0.5}} value={songName} onChange={(text)=>{setSongName(text.target.value)}} />
        <TextField label='Price in MATIC' sx={{m:0.5}} type='number' value={price} onChange={(text)=>{setPrice(text.target.value)}} />
        <Typography sx={{color:'#000',m:0.5}} >Select song file:</Typography>
        <Stack sx={{flexDirection:'row'}} >
        <input type='file' onChange={(event)=>{setFile(event.target.files[0]);console.log(event.target.files[0])}} style={{width:100}} />
        <Typography sx={{fontSize:12,color:'#000'}}>{file.name}</Typography>
        </Stack>
        
      </Stack>
      <Button variant='contained' sx={{mt:1}} onClick={(event)=>{submit(event)}} >Submit</Button>
     <Typography sx={{fontSize:15,color:'blue',textAlign:'center',cursor:'pointer'}} onClick={props.onClose} >Close</Typography>
    </Stack>
   </Modal>
  )
}

export default UploadModal;