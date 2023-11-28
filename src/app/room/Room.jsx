import { Button } from '@mui/material'
import React from 'react'
import { useLoaderData } from 'react-router-dom'
import LKRoom from '../../components/LKRoom/LKRoom'
import axios from 'axios'

const Room = () => {
    const { token } = useLoaderData();
  return (
    <>
    <Button variant='contained' onClick={() => navigate(-1)}>Back</Button>

    {token && <LKRoom token={token} />}
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
      await delay(5000)
      return { token: data };
    }
    else throw new Error("Invalid room name or user ID")
  }
  catch (error) {
    console.error(error);
    throw new Error("Error while generating token")
  }
}


const delay = (delayInms) => {
  return new Promise(resolve => setTimeout(resolve, delayInms));
};