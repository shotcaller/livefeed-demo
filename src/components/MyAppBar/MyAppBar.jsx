import { AppBar, Avatar, Box, IconButton, Toolbar, Tooltip, Typography } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { AppName } from "../../constants/constants";
import { Info } from "@mui/icons-material";
import Masthead from "../Masthead/Masthead";
import AccountMenu from "./AccountMenu";
import { NameToAvatar } from "../UserList/UserList";

function MyAppBar(props) {
  const { name, online } = useSelector((state) => state.user);
  const [openMasthead, setOpenMasthead] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const openMenu = Boolean(menuAnchor);

  const handleMyAccountClick = (e) => {
    setMenuAnchor(e.currentTarget);
  }

  const accountMenuProps = {
    anchorEl : menuAnchor,
    open: openMenu,
    handleClose: () => setMenuAnchor(null),
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            [ {AppName} ]
            <Typography variant="caption" component="div">
              your virtual hangout place
            </Typography>
          </Typography>
          {/* {online && (
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Welcome {name}!
            </Typography>
          )} */}
          
          {online && 
            <>
            <Tooltip title="My Account">
              <IconButton size="small" onClick={handleMyAccountClick}>
                <Avatar sx={{ width:32, height: 32, borderColor:'white', borderStyle:'solid', borderWidth:'3px', bgcolor:'purple'}}>
                  <NameToAvatar name={name} />
                </Avatar>
              </IconButton>
            </Tooltip>
            <AccountMenu {...accountMenuProps}/></>
          }
          
          <Tooltip title='About us'>
            <IconButton size="large" onClick={() => setOpenMasthead(true)}>
              <Info />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
      <Masthead
        open={openMasthead}
        handleClose={() => setOpenMasthead(false)}
      />
    </Box>
  );
}

export default MyAppBar;
