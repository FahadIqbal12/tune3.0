import React, { useEffect, useState } from 'react'
import Navigator from '../components/Navigator';
import { Stack,TextField,Typography,Button } from '@mui/material';
import { db } from '../config';
import Loader from '../components/Loader';
import { collection,query,orderBy,getDocs } from 'firebase/firestore';
import PurchaseModal from '../components/PurchaseModal';

const Search = () => {

  const [keyword,setKeyword] = useState('');
  const [loading,setLoading] = useState(false);
  const [songData,setSongData] = useState([]);
  const [result,setResult] = useState([]);
  const [openModal,setOpenModal] = useState(false);
  const [props,setProps] = useState({})

  const fetchSongsList =async ()=>{
    setLoading(true)
      const col = collection(db, 'songs');
      const q = query(col,orderBy('song_id','desc'))
      const snap = await getDocs(q); 
      const list = snap.docs.map(doc => doc.data());
      setSongData(list)
      console.log(list)   
      setLoading(false)
  }

  const search = ()=>{

    for (let index = 0; index < songData.length; index++) {
      console.log(songData[index].song_name);

      if(keyword == songData[index].song_name){
        setResult(songData[index]);
        
        break
      }
      continue
    }
  }

  const handleBuyButton=(items)=>{
    setProps({songName:items.song_name,price:items.price,artistAddress:items.artist_address,songId:items.song_id});
    setOpenModal(true)
  }

  useEffect(()=>{
    fetchSongsList()
  },[])

  return (
    <div>
      <Stack sx={{width:800}}>
        <Loader open={loading} />
        <TextField placeholder='search songs' onChange={(text)=>{setKeyword(text.target.value)}} value={keyword} variant='standard' sx={{backgroundColor:'#fff',p:1,borderRadius:1}} />
        <Button onClick={()=>{search()}} >Search</Button>
      </Stack>
      {result.length != 0 && keyword !=''
      ?
      <Stack sx={{flexDirection:'row',backgroundColor:'#384560',alignItems:'center',borderRadius:5}}>
        <PurchaseModal open={openModal} songName={props.songName} artistAddress={props.artistAddress} price={props.price} songId={props.songId} onClose={()=>{setProps({});setOpenModal(false)}} />
        <Stack>
        <img src='https://media2.giphy.com/media/LNOZoHMI16ydtQ8bGG/giphy.gif?cid=6c09b952junzlmbtkr1y8r2458yesdid7njyh8e7dpilg751&ep=v1_gifs_search&rid=giphy.gif&ct=s' style={{width:150}} />
        </Stack>
       <Stack>
       <Typography>Song Name: {result.song_name}</Typography>
       <Typography>Artist Address: {result.artist_address}</Typography>
       <Typography sx={{fontSize:20,fontWeight:'bold'}} >Price: {result.price} MATIC</Typography>
       <Button variant='contained' sx={{width:150}} onClick={()=>{handleBuyButton(result)}} >Buy</Button>
       </Stack>
      </Stack>
      :
      <Stack sx={{alignItems:'center',mt:5}}>
        <img src='https://cdn.dribbble.com/users/1208688/screenshots/4563859/no-found.gif' style={{width:200}} />
        <Typography sx={{fontSize:20,mt:1}} >Not Found</Typography>
      </Stack>}
        <Navigator screenName='search' />
    </div>
  )
}

export default Search