import { Container, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { QuickRoomForm } from "../../components/QuickRoomForm/QuickRoomForm";

function Friends() {
  return (
    <>
      <Container maxWidth="xl">
        <QuickRoomForm />
      </Container>
      <Typography variant="h1">Friends</Typography>
    </>
  );
}

export default Friends;
