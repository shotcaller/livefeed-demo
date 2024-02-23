import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { OPERATION_NAMES, callGraphqlServer, getAllUsers } from '../../graphql/utils';
import { LOGGED_IN_USER_FRIENDS_QUERY } from "../../graphql/query/user";
import { useLoaderData } from "react-router-dom";
import UserList from "../../components/UserList/UserList";
import { useDispatch, useSelector } from "react-redux";
import { openAlert } from "../../slice/alertPopupSlice";
import { UNAUTHORIZED, addFriendList, friendList, friendsError, noFriendsDisplayText, noUsersDisplayText, unAuthError } from "../../constants/constants";
import ListDialog from "../../components/Dialog/ListDialog";


function Friends() {
  const { userid } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const { friends, error } = useLoaderData();
  if(friends===null && error) dispatch(openAlert({ message: error===UNAUTHORIZED?unAuthError:friendsError, type: 'error'}))
  
  const [openAddFriendDialog, setOpenAddFriendDialog] = useState(false);

  const [nonFriends, setNonFriends] = useState([])
  useEffect(() => {
    const getNonFriends = async () => {
      let users = await getAllUsers();
      //Filter out users who are already friends
      if(friends.length>0)
        users = users.filter(user => !friends.some(friend => friend.id === user.id));
      
      //Remove logged in user lol
      setNonFriends(users.filter(user => user.userid!==userid));
    }
    
    if(openAddFriendDialog)
      getNonFriends();
    
  },[openAddFriendDialog])

  const friendListProps = {
    users : friends,
    title : 'My Friends',
    height : 400,
    emptyListMessage: noFriendsDisplayText,
    additionalActionHandler: () => setOpenAddFriendDialog(true),
    additionalActionTitle: 'Add',
    listType: friendList
  }

  const addFriendListProps = {
    users : nonFriends,
    title : 'Add Friends',
    height : 400,
    emptyListMessage: noUsersDisplayText,
    listType: addFriendList
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
