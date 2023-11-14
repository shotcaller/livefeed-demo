import React, { useEffect, useState } from "react";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import { Restore, PeopleAlt, AccountCircle } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";

function Navigation() {
  const location = useLocation();
  const [tabIndex, setTabIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname == "/wall") setTabIndex(0);
    else if (location.pathname == "/friends") setTabIndex(1);
    else setTabIndex(0);
  }, [location.pathname]);

  /** Navigating to tab and route to appropriate page */
  const changeTab = (newIndex) => {
    setTabIndex(newIndex);
    switch (newIndex) {
      case 0:
        navigate("/wall");
        break;
      case 1:
        navigate("/friends");
        break;
      default:
        break;
    }
  };
  return (
    <Paper
      elevation={3}
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
    >
      <BottomNavigation
        showLabels
        value={tabIndex}
        onChange={(event, newValue) => changeTab(newValue)}
      >
        <BottomNavigationAction label="Wall" icon={<AccountCircle />} />
        <BottomNavigationAction label="Friends" icon={<PeopleAlt />} />
        <BottomNavigationAction label="History" icon={<Restore />} />
      </BottomNavigation>
    </Paper>
  );
}

export default Navigation;
