import { AppBar, Box, Button, IconButton, Toolbar, Tooltip, Typography } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { AppName } from "../../constants/constants";
import { Info } from "@mui/icons-material";
import Masthead from "../Masthead/Masthead";
import { useLogout } from "../../hooks/useLogout";

function MyAppBar(props) {
  const logout = useLogout();
  const { name, online } = useSelector((state) => state.user);
  const { showLogout } = props;
  const [openMasthead, setOpenMasthead] = useState(false);

  const logoutUser = () => {
    logout();
  };
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
          {online && (
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Welcome {name}!
            </Typography>
          )}

          {showLogout && (
            <Button variant="contained" color="error" onClick={logoutUser}>
              Logout
            </Button>
          )}
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
