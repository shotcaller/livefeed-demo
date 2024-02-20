import { Grid } from "@mui/material";
import React, { useState } from "react";
import { OPERATION_NAMES, callGraphqlServer } from '../../graphql/utils';
import { LOGGED_IN_USER_FRIENDS_QUERY } from "../../graphql/query/user";
import { useLoaderData } from "react-router-dom";
import UserList from "../../components/UserList/UserList";
import { useDispatch } from "react-redux";
import { openAlert } from "../../slice/alertPopupSlice";
import { UNAUTHORIZED, friendsError, noFriendsDisplayText, noUsersDisplayText, unAuthError } from "../../constants/constants";
import ListDialog from "../../components/Dialog/ListDialog";


function Friends() {
  const dispatch = useDispatch();
  const { friends, error } = useLoaderData();
  const [openAddFriendDialog, setOpenAddFriendDialog] = useState(false);
  if(friends===null && error) dispatch(openAlert({ message: error===UNAUTHORIZED?unAuthError:friendsError, type: 'error'}))

  const friendListProps = {
    users : friends,
    title : 'My Friends',
    height : 400,
    emptyListMessage: noFriendsDisplayText,
    additionalActionHandler: () => setOpenAddFriendDialog(true)
  }

  const addFriendListProps = {
    users : friends,
    title : 'Add Friends',
    height : 400,
    emptyListMessage: noUsersDisplayText,
  }
  
  return (
    <>
      <Grid container>
        <Grid item xs={0} md={2} lg={3}></Grid>
        <Grid item xs={12} md={8} lg={6}>
          <UserList {...friendListProps} />
        </Grid>
        <Grid item xs={0} md={2} lg={3}></Grid>
      </Grid>

      <ListDialog open={openAddFriendDialog} onClose={() => setOpenAddFriendDialog(false)} maxWidth={'sm'}>
        <UserList {...addFriendListProps} />
      </ListDialog>
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
    return { friends: null, error: e?.message };
  }
}
