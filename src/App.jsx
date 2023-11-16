import { Box } from "@mui/material";
import "./App.css";
import MyAppBar from "./components/MyAppBar/MyAppBar";
import { Outlet, useLocation } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

function App() {
  const location = useLocation()
  const { online } = useSelector((state) => state.user);
  const [showNavigation, setShowNavigation] = useState(false);
  
  useEffect(() => {
    if(online && location.pathname!=="/room")
      setShowNavigation(true)
    else
      setShowNavigation(false)
  },[online, location.pathname])

  return (
    <>
      <MyAppBar showLogout={showNavigation} />
      <Box sx={{ pb: showNavigation?7:0 }}>
        <Outlet />
        {showNavigation && <Navigation />}
      </Box>
    </>
  );
}

export default App;
