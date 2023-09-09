import React, { useState } from 'react';
import { Button, Modal,Stack,Typography } from '@mui/material';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';

const MusicPlayer = (props) => {
    var x = document.getElementById("player"); 
    const [play,setPlay] = useState(true);

    const handlePlay = ()=>{
        setPlay(!play);
        if(play == true){
            x.pause()
        }else{
            x.play()
        }
    }

  return (
    <Modal open={props.open} >
    <Stack sx={{backgroundColor:'#000',height:350,width:400,position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',borderRadius:3}}>
       <Typography onClick={props.onClose} sx={{":hover":{cursor:'pointer'},width:20,ml:1}} >X</Typography>
        <audio src={props.src} id='player' autoPlay loop preload='metadata' style={{width:400}}>
        </audio>
        <Stack sx={{width:200,alignSelf:'center'}} >
        <img src='https://i.pinimg.com/originals/f3/7b/42/f37b420ba06b90c507de3b386b75febb.gif' />
        </Stack>
        <Stack sx={{alignItems:'center'}} >
        <Button variant='text' onClick={()=>{handlePlay()}} sx={{width:50}} >{play != true ?<PlayCircleIcon sx={{fontSize:50}} />:<PauseCircleIcon sx={{fontSize:50}} />}</Button>
        </Stack>
        <Stack sx={{ml:0.5}}>
        <Typography sx={{fontSize:20,fontWeight:'bold'}}>{props.songName}</Typography>
        <Typography sx={{fontSize:13}} >Artist : {props.artistAddress}</Typography>
        
        </Stack>
        
        
    </Stack>
    </Modal>
  )
}

export default MusicPlayer