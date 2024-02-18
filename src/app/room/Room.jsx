import { Button } from '@mui/material'
import React from 'react'
import { useLoaderData, useNavigate } from 'react-router-dom'
import LKRoom from '../../components/LKRoom/LKRoom'
import axios from 'axios'
import { serverRoomTokenUrl } from '../../constants/constants'

const Room = () => {
    const { token } = useLoaderData();
    const navigate = useNavigate()
  return (
    <>
    <Button variant='contained' onClick={() => navigate('/friends')}>Exit</Button>

    {token && <LKRoom token={token} />}
    </>
  )
}

export default Room

export const loader = async ({ request }) => {
  const roomName = new URL(request.url).searchParams.get('roomname');
  const userid = new URL(request.url).searchParams.get('userid');

  try{
    if(roomName && userid){
      const res = await axios.get(serverRoomTokenUrl,{
        params: {
          roomName,
          userName: userid
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
  }
}


const delay = (delayInms) => {
  return new Promise(resolve => setTimeout(resolve, delayInms));
};