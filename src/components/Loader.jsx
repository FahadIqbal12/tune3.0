import React from 'react';
import {Stack,Modal} from '@mui/material'

const Loader = (props) => {
  return (
    <Modal open={props.open}>
        <Stack sx={{width:50,position:'absolute',left:'50%',top:'50%',transform:'translate(-50%,-50%)'}}>
            <img src={'https://cdn.pixabay.com/animation/2023/05/02/04/29/04-29-06-428_512.gif'} />
        </Stack>
    </Modal>
  )
}

export default Loader