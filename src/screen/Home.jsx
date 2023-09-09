import React, { useState,useContext, useEffect } from 'react';
import Navigator from '../components/Navigator';
import { Stack,Typography,Button } from '@mui/material';
import { Context } from '../components/context';
import { db } from '../config';
import Loader from '../components/Loader';
import { collection,query,orderBy,getDocs } from 'firebase/firestore';
import { music_img } from '../components/Usable';
import PurchaseModal from '../components/PurchaseModal';
import img from '../assets/img.png'

const Home = () => {
  const c = useContext(Context);
  const [loading,setLoading] = useState(false);
  const [songData,setSongData] = useState([]);
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

  const handleBuyButton=(items)=>{
    setProps({songName:items.song_name,price:items.price,artistAddress:items.artist_address,songId:items.song_id});
    setOpenModal(true)
  }

  useEffect(()=>{
    fetchSongsList()
  },[])

  return (
    <div>
      <Loader open={loading} />
        <Stack sx={{width:800}}>
          <img src={img} />
        <Typography sx={{fontWeight:'bold'}} >Recent Songs:</Typography>
        <Stack sx={{width:800,height:400,overflowY:'scroll'}}>
        <Stack sx={{flexDirection:'row',alignItems:'center',justifyContent:'space-evenly',flexWrap:'wrap'}} >
          {songData.map((items,index)=>{
            const rndInt = Math.floor(0 + Math.random()*(5- 1 + 1));
            return(
              <Stack key={index} sx={{width:200,backgroundColor:'#303f63',p:1,m:0.5,alignItems:'center',borderRadius:3}}>
                <PurchaseModal open={openModal} songName={props.songName} artistAddress={props.artistAddress} price={props.price} songId={props.songId} onClose={()=>{setProps({});setOpenModal(false)}} />
                <img src={music_img[rndInt]} style={{width:100}} />
                <Stack>
                <Typography sx={{fontSize:20,fontWeight:'bold'}} >{items.song_name}</Typography>
                <Typography>Price: {items.price} MATIC</Typography>
                </Stack>
                <Button variant='contained' sx={{width:'90%'}} onClick={()=>{handleBuyButton(items)}} >Buy</Button>
              </Stack>
            )
          })}
        </Stack>
        </Stack>
       </Stack>
       <Navigator screenName='home'/>
    </div>
    
  )
}

export default Home