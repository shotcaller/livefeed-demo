import { Grid } from "@mui/material";
import React from "react";
import { OPERATION_NAMES, callGraphqlServer } from '../../graphql/utils';
import { LOGGED_IN_USER_FRIENDS_QUERY } from "../../graphql/query/user";
import { useLoaderData } from "react-router-dom";
import UserList from "../../components/UserList/UserList";
import { useDispatch } from "react-redux";
import { openAlert } from "../../slice/alertPopupSlice";


function Friends() {
  const dispatch = useDispatch();
  const { friends } = useLoaderData();
  if(friends===null) dispatch(openAlert({ message: 'Error while fetching friends. :( Please refresh.', type: 'error'}))
  
  return (
    <>
      <Grid container>
        <Grid item xs={0} md={2} lg={3}></Grid>
        <Grid item xs={12} md={8} lg={6}>
          <UserList users={friends} height={400} />
        </Grid>
        <Grid item xs={0} md={2} lg={3}></Grid>
      </Grid>
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
      return { friends: data?.friends??[] }
    }
    else throw Error("No response from server.");
  } catch (e) {
    console.error(e);
    return { friends: null };
  }
}
