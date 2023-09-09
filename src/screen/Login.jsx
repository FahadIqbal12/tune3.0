import React, { useState } from 'react';
import Navigator from '../components/Navigator';
import { Stack,Typography,Button } from '@mui/material';
import Home from './Home';


const Login = (props) => {
    

  return (
    <div>
        <Stack sx={{alignItems:'center'}}>
        <Stack>
          <Typography sx={{fontSize:100,fontWeight:'bold',fontFamily:'monospace',textAlign:'center'}}>Tune 3.0</Typography>
          <Typography sx={{fontSize:20,fontWeight:'bold',fontFamily:'monospace',textAlign:'center'}} >Decentralized music marketplace</Typography>
        </Stack>
        <Stack sx={{alignItems:'center',mt:5}}>
          <Button variant='contained' sx={{width:200}} onClick={props.onClick} >Connect Wallet</Button>
        </Stack>
        <img src='https://cdni.iconscout.com/illustration/premium/thumb/boy-wearing-headphones-listening-to-music-8859257-7270666.png' style={{width:400}} />
      </Stack>
        
    </div>
    
  )
}

export default Login