import { Container, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { QuickRoomForm } from "../../components/QuickRoomForm/QuickRoomForm";
import { OPERATION_NAMES, callGraphqlServer } from '../../graphql/utils';
import { LOGGED_IN_USER_FRIENDS_QUERY } from "../../graphql/query/user";
import { useLoaderData } from "react-router-dom";


function Friends() {
  const { loggedInUserObj } = useLoaderData();

  useEffect(() => {
    if(loggedInUserObj)
      console.log(loggedInUserObj?.friends);
  }, [loggedInUserObj])
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

export const loader = async () => {
  try {
    const response = await callGraphqlServer(
      OPERATION_NAMES.loggedInUserFriends,
      LOGGED_IN_USER_FRIENDS_QUERY
    )

    const data = response.loggedInUser;
    if(data){
      return { loggedInUserObj: data }
    }
    else throw Error("No response from server.");
  } catch (e) {
    console.error(e);
  }
}
