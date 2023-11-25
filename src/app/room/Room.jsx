import { Button, Typography } from '@mui/material'
import React from 'react'
import { useLoaderData, useNavigate, useNavigation } from 'react-router-dom'
import LKRoom from '../../components/LKRoom/LKRoom'
import axios from 'axios'

const Room = () => {
    const navigate = useNavigate();
    //For loading state
    const navigation = useNavigation();

    const { token } = useLoaderData();
  return (
    <>
    <Button variant='contained' onClick={() => navigate(-1)}>Back</Button>
    {navigation.state==='loading' && <Typography color='white'>Loading...</Typography>}

    {navigation.state==='idle' && token &&
    <LKRoom token={token} />
    }
    </>
  )
}

export default Room

export const loader = async ({ request }) => {
  const roomName = new URL(request.url).searchParams.get('roomname');
  const userName = new URL(request.url).searchParams.get('username');

  try{
    if(roomName && userName){
      const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/getRoomToken`,{
        params: {
          roomName,
          userName
        }
      })
      const data = res.data;
      return { token: data };
    }
    else throw new Error("Invalid room name or user ID")
  }
  catch (error) {
    console.error(error);
    throw new Error("Error while generating token")
  }
}
