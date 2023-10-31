import { Button, Container, Typography } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login } from '../../slice/userSlice'

function Home() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const loginUser = () => {
    dispatch(login({ name: 'Ruturaj' }))
    navigate("wall")
  }
  return (
    <Container>
        <Typography color='whitesmoke' variant='h3'>This is Home</Typography>
        <Button variant='contained' color='primary' onClick={loginUser}>Log In</Button>
    </Container>
  )
}

export default Home