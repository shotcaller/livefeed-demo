import { Call } from '@mui/icons-material';
import { Avatar, Box, IconButton, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material'
import React from 'react'

/** In props send a type property so can design a List Item based on that. For eg: User list type can be friends
 * so that in friend list can define particular list item.
 */
const UserList = (props) => {
  const users = props.users??[];
  const height = props.height??400;
  const bgColor = props.bgColor??'background.paper'
  const listType = props.listType??'friendList';
  const title = props.title??'User List';
  const emptyListMessage = props.emptyListMessage??'This list is empty.'
  return (
    <Box sx={{bgcolor: bgColor, height: height, p:2, m:2,display:'flex', flexDirection:'column'}}>
      <Box>
        <Typography variant='h4'>{title}</Typography>
      </Box>
      <Box sx={{overflowY:`auto`}}>
        {users.length===0 && <Typography variant='body2'>{emptyListMessage}</Typography>}
        <List sx={{width: '100%', maxHeight: '100%', bgcolor: bgColor}}>
          {users?.map(user => <FriendListItem user={user} key={user.id} /> )}
        </List>
      </Box>
    </Box>
  )
}

export const FriendListItem = (props) => {
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