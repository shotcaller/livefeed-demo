import { Call } from '@mui/icons-material';
import { Avatar, Box, IconButton, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material'
import React from 'react'

/** In props send a type property so can design a List Item based on that. For eg: User list type can be friends
 * so that in friend list can define particular list item.
 */
const UserList = (props) => {
  const users = props.users??[];
  const width = props.width??'100%';
  const height = props.height??400;
  const bgColor = props.bgColor??'background.paper'
  const listType = props.listType??'friendList';
  return (
    <Box sx={{bgcolor: bgColor, width: width, height: height}}>
      <List sx={{width: '100%', height: '100%', bgcolor: bgColor}}>
        {users?.map(user => <FriendListItem user={user} key={user.id} /> )}
      </List>
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