import React,{useContext, useEffect, useState} from 'react';
import Navigator from '../components/Navigator';
import { Button, Stack,Typography } from '@mui/material';
import { Context } from '../components/context';
import UploadModal from '../components/UploadModal';
import { ethers } from 'ethers';
import { contract_address,abi } from '../contract/interaction';
import MusicPlayer from '../components/MusicPlayer';

const Profile = () => {
  const [openModal,setOpenModal] = useState(false);
  const [openMusicplayer,setOpenMusicPlayer] = useState(false)
  const c = useContext(Context);
  const address = c.address;
  const [src,setSrc] = useState('')
  const [PublishedSongsData,setPublishedSongsData] = useState([])
  const [PurchasedSongsData,setPurchasedSongsData] = useState([])

  const Provider = new ethers.providers.Web3Provider(window.ethereum);
  const Signer = Provider.getSigner();

  const fetchPublishedSongs =async ()=>{
    const contract = new ethers.Contract(contract_address,abi,Signer);
    await contract.getArtistSong().then((res)=>{
      console.log(res);
      setPublishedSongsData(res)
    }).catch((error)=>{
      console.log(error)
    })
  }

  const fetchPurchasedSongs =async ()=>{
    const contract = new ethers.Contract(contract_address,abi,Signer);
    await contract.getPurchases().then((res)=>{
      console.log(res);
      setPurchasedSongsData(res)
    }).catch((error)=>{
      console.log(error)
    })
  }

  useEffect(()=>{
    fetchPublishedSongs();
    fetchPurchasedSongs();
  },[])


  return (
    <div>
      <UploadModal open={openModal} onClose={()=>{setOpenModal(false)}} />
      <Stack sx={{flexDirection:'row',alignItems:'center',width:600}}>
        <img src='https://img.freepik.com/free-vector/hand-drawn-nft-style-ape-illustration_23-2149622021.jpg' style={{width:100,borderRadius:200}}/>
        <Stack sx={{ml:2,alignItems:'start'}}>
        <Typography>Your Address: {address.slice(0,5)}...{address.slice(-5)}</Typography>
        <Typography >Total songs published: {PublishedSongsData.length}</Typography>
        <Typography >Total songs purchased: {PurchasedSongsData.length}</Typography>
        </Stack>
      </Stack>
      <Button variant='contained' sx={{mt:2}} onClick={()=>{setOpenModal(true)}} >Publish your song</Button>
      <Stack sx={{width:800,flexDirection:"row",justifyContent:'space-between',mt:2}}>
        <Stack sx={{width:340,backgroundColor:'#3f517f',p:1,borderRadius:10,height:460}}> 
          <Stack sx={{mt:1}}>
          <Typography sx={{fontWeight:'bold'}}>List of Published song:</Typography>
          {PublishedSongsData.map((items,index)=>{
            return(
              <Stack>
              <Stack sx={{flexDirection:'row',alignItems:'center',":hover":{cursor:"pointer",backgroundColor:'#8694b7'},borderRadius:4}} key={index} >
                <img src='https://cdn.icon-icons.com/icons2/2846/PNG/512/music_musical_note_icon_181418.png' style={{width:40}} />
                <Typography onClick={()=>{setSrc({src:items.ipfs_url,songName:items.song_name,artistAddress:items.artist_address});setOpenMusicPlayer(true)}} >{items.song_name}</Typography>
              </Stack>
              
              </Stack>
            )
          })}
          </Stack>
        </Stack>
        <Stack sx={{width:340,backgroundColor:'#3f517f',p:1,borderRadius:10,height:460}}>
        <Stack sx={{mt:1}}>
          <Typography sx={{fontWeight:'bold'}}>List of Purchased songs:</Typography>
          {PurchasedSongsData.map((items,index)=>{
            return(
              <Stack>
              <Stack sx={{flexDirection:'row',alignItems:'center',":hover":{cursor:"pointer",backgroundColor:'#8694b7'},borderRadius:4}} key={index} >
                <img src='https://cdn.icon-icons.com/icons2/2846/PNG/512/music_musical_note_icon_181418.png' style={{width:40}} />
                <Typography onClick={()=>{setSrc({src:items.ipfs_url,songName:items.song_name,artistAddress:items.artist_address});setOpenMusicPlayer(true)}} >{items.song_name}</Typography>
              </Stack>
              
              </Stack>
            )
          })}
          </Stack>
        </Stack>
      </Stack>
        <MusicPlayer open={openMusicplayer} src={src.src} songName={src.songName} artistAddress={src.artistAddress} onClose={()=>{setOpenMusicPlayer(false)}}/> 
        <Navigator screenName='profile' />
    </div>
  )
}

export default Profile