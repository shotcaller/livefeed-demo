import { Call, CheckCircle, PersonAdd } from '@mui/icons-material';
import { Avatar, Box, Button, CircularProgress, IconButton, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material'
import React, { useState } from 'react'
import { IDLE, LOADING, SUCCESS, addFriendErrorMsg, addFriendList, friendList } from '../../constants/constants';
import { useDispatch } from 'react-redux';
import { openAlert } from '../../slice/alertPopupSlice';
import { OPERATION_NAMES, callGraphqlServer } from '../../graphql/utils';
import { ADD_FRIEND_QUERY } from '../../graphql/query/user';

/** In props send a type property so can design a List Item based on that. For eg: User list type can be friends
 * so that in friend list can define particular list item.
 * 
 * If any additional task to be done, list heading has a button that can trigger a prop function additionalActionHandler
 */
const UserList = (props) => {
  const users = props.users??[];
  const height = props.height??400;
  const bgColor = props.bgColor??'background.paper'
  const listType = props.listType??friendList;
  const title = props.title??'User List';
  const emptyListMessage = props.emptyListMessage??'This list is empty.'
  const additionalActionHandler = props.additionalActionHandler??null;
  const additionalActionTitle = props.additionalActionTitle??'Press here?';

  const handleAdditionalAction = () => {
    if(additionalActionHandler){
      additionalActionHandler();
    }
  }

  const setStylePerListType = () => {
    switch(listType) {
      case friendList: 
        return {bgcolor: bgColor, height: height, p:2, m:2,display:'flex', flexDirection:'column'};
      
      case addFriendList:
        return {bgcolor: bgColor, height: height, display:'flex', flexDirection:'column'}
    }
  }
  return (
    <Box sx={setStylePerListType}>
      <Box sx={{display:"flex"}}>
        <Typography variant='h4'>{title}</Typography>
        {additionalActionHandler &&
          <Button onClick={handleAdditionalAction} size='small' variant='outlined' sx={{ml:'auto', mb:'auto'}}>{additionalActionTitle}</Button>}
      </Box>
      <Box sx={{overflowY:`auto`}}>
        {users.length===0 && <Typography variant='body2'>{emptyListMessage}</Typography>}
        <List sx={{width: '100%', maxHeight: '100%', bgcolor: bgColor}}>
          {users?.map(user => <CommonUserListItem listType={listType} user={user} key={user.id} /> )}
        </List>
      </Box>
    </Box>
  )
}

const CommonUserListItem = ({ listType, user }) => {
  switch (listType){
    case friendList:
      return <FriendListItem user={user} key={user.id}  />
      
    case addFriendList:
      return <AddFriendListItem user={user} key={user.id} />
  }

}

const FriendListItem = (props) => {
  const { user } = props;
  const name = user.name??'LiveFeed user';
  const userid = user.userid??'@userid'
  return (
    <ListItem secondaryAction={
      <IconButton sx={{bgcolor:'green'}}>
        <Call />
      </IconButton>
    }>
      <ListItemAvatar>
        <Avatar alt={name} sx={{bgcolor: stringToColor(name)}}>
          {name.split(' ')[0][0]}{name.split(' ')[1]?name.split(' ')[1][0]:''}
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={`@${userid}`} secondary={name} />
    </ListItem>
  )
}

const AddFriendListItem = (props) => {
  const { user } = props;
  const name = user.name??'LiveFeed user';
  const userid = user.userid??'@userid'
  const [actionState, setActionState] = useState(IDLE);
  const dispatch = useDispatch();

  const callAddFriend = async () => {
    setActionState(LOADING);
    try {
      const response = await callGraphqlServer(
        OPERATION_NAMES.addFriend,
        ADD_FRIEND_QUERY,
        { friendUserId: user.userid }
      );

      const data = response.addFriend;
      if(!data) throw new Error(addFriendErrorMsg);

      setActionState(SUCCESS);

    } catch(e) {
      console.error(e);
      dispatch(openAlert({ message: e.message, type: 'error'}));
      setActionState(IDLE);
    }
  }
  return (
    <ListItem secondaryAction={
      <Box>
      <IconButton color={actionState==SUCCESS?'success':'primary'} onClick={callAddFriend} disabled={actionState==LOADING}>
        {actionState==SUCCESS?<CheckCircle />:<PersonAdd />}
      </IconButton>
      {actionState==LOADING &&
      <CircularProgress size={50} sx={{position: 'absolute', top:-4, left:-4, zIndex:1}}/>
    }
    </Box>
    }>
      <ListItemAvatar>
        <Avatar alt={name} sx={{bgcolor: stringToColor(name)}}>
          {name.split(' ')[0][0]}{name.split(' ')[1]?name.split(' ')[1][0]:''}
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={`@${userid}`} secondary={name} />
    </ListItem>
  )
}

export default UserList


/**
 * Util Functions
 */
const stringToColor = (string) => {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}